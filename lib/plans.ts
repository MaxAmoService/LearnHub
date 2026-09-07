// ============================================================================
// Lehrpläne — Firestore-Persistenz (Client SDK)
// ============================================================================
//
// Pläne leben in Subcollections (users/{uid}/plans, …/planItems) und NICHT im
// User-Dokument — getLeaderboard lädt alle User-Docs, jedes zusätzliche Feld
// dort kostet Bandbreite. Plan-Items nutzen dieselbe SM-2-Engine wie die
// Karteikarten (lib/spacing.ts), persistieren aber in Firestore, weil ein
// Termin geräteübergreifend gelten muss.
//
// Absichtlich KEIN Import aus lib/auth.ts: auth.ts importiert diese Datei
// dynamisch (loadActiveStudyDays) — ein statischer Gegenimport würde einen
// Zirkelbezug erzeugen. User-Felder (lastStudyDate, streak) werden hier
// direkt per updateDoc geschrieben, lastActive bleibt Presence vorbehalten.

import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "./firebase";
import { dayOfMonth, monthKey, todayKey } from "./dates";
import { qualityFromRatio } from "./exercises/scoring";
import { newCardProgress, sm2, type FlashcardProgress } from "./spacing";
import { isConsolidated } from "./scheduling";
import { updateStreak } from "./streak";

// ─── Typen ──────────────────────────────────────────────────────────────────

export interface PlanTemplateItem {
  title: string;
  moduleSlug: string | null;
  order: number;
  weight: number; // 1-5
  estimatedUnits: number;
  /** Statischer Slug für Übungsaufgaben aus content/exercises/<slug>.json. */
  topicSlug: string | null;
}

export interface PlanTemplate {
  slug: string;
  title: string;
  description: string;
  examType: string;
  items: PlanTemplateItem[];
}

export interface PlanItemDoc {
  title: string;
  moduleSlug: string | null;
  order: number;
  weight: number;
  estimatedUnits: number;
  completedUnits: number;
  /**
   * Slug der zugehörigen Übungsaufgaben (content/exercises/<slug>.json).
   * Nur bei Template-Items gesetzt; Bestands-Docs vor dem Backfill: null.
   */
  topicSlug: string | null;
  /** Exakt die Struktur aus FlashcardProgress (cardId = itemId). */
  sm2: FlashcardProgress | null;
  /** "YYYY-MM-DD" | null — abgeleitet aus sm2.nextReview über lib/dates.ts. */
  nextDueAt: string | null;
  /** Denormalisiert für Collection-Group-Query + Security-Rule. */
  uid: string;
  /** Letzter Übungs-Durchlauf (Trefferquote). */
  lastAttempt: { at: string; correct: number; total: number } | null;
  /** Anzahl abgeschlossener Übungs-Durchläufe. */
  attemptCount: number;
}

export interface PlanDoc {
  title: string;
  deadline: string; // "YYYY-MM-DD"
  studyDays: number[]; // 1=Mo … 7=So
  bufferDays: number;
  templateId: string | null;
  createdAt: string; // ISO
  archivedAt: string | null;
  stats: { itemCount: number; masteredCount: number };
}

export interface ActivityDay {
  units: number;
  done: number;
  planIds: string[];
}

export interface ActivityDoc {
  days: Record<string, ActivityDay>;
}

/** Plan-Dokument inkl. Doc-ID (ID ist nicht Teil des Dokuments). */
export interface PlanWithId extends PlanDoc {
  id: string;
}

/** Plan-Item inkl. Doc-ID und zugehörigem Plan (beide nicht im Dokument). */
export interface PlanItemWithId extends PlanItemDoc {
  id: string;
  planId: string;
}

// ─── Pläne anlegen ──────────────────────────────────────────────────────────

export async function createPlanFromTemplate(
  uid: string,
  templateId: string,
  opts: { deadline: string; studyDays: number[]; bufferDays: number; title?: string }
): Promise<string> {
  const db = getDb();
  const templateSnap = await getDoc(doc(db, "planTemplates", templateId));
  if (!templateSnap.exists()) throw new Error("Vorlage nicht gefunden");
  const template = templateSnap.data() as PlanTemplate;

  const items = [...(template.items ?? [])].sort((a, b) => a.order - b.order);
  const planRef = doc(collection(db, "users", uid, "plans"));
  const planId = planRef.id;

  const batch = writeBatch(db);
  batch.set(planRef, {
    title: opts.title ?? template.title,
    deadline: opts.deadline,
    studyDays: opts.studyDays,
    bufferDays: opts.bufferDays,
    templateId,
    createdAt: new Date().toISOString(),
    archivedAt: null,
    stats: { itemCount: items.length, masteredCount: 0 },
  });

  for (const item of items) {
    const itemRef = doc(collection(db, "users", uid, "plans", planId, "planItems"));
    batch.set(itemRef, {
      title: item.title,
      moduleSlug: item.moduleSlug ?? null,
      order: item.order,
      weight: item.weight,
      estimatedUnits: item.estimatedUnits,
      topicSlug: item.topicSlug ?? null,
      completedUnits: 0,
      sm2: null,
      nextDueAt: null,
      lastAttempt: null,
      attemptCount: 0,
      uid,
    });
  }

  await batch.commit();
  return planId;
}

/**
 * Legt einen leeren Plan an (Wizard ohne Vorlage). Gleiche Struktur wie
 * createPlanFromTemplate, aber ohne Template und ohne Items.
 */
export async function createEmptyPlan(
  uid: string,
  opts: { title: string; deadline: string; studyDays: number[]; bufferDays: number }
): Promise<string> {
  const db = getDb();
  const planRef = doc(collection(db, "users", uid, "plans"));

  await setDoc(planRef, {
    title: opts.title,
    deadline: opts.deadline,
    studyDays: opts.studyDays,
    bufferDays: opts.bufferDays,
    templateId: null,
    createdAt: new Date().toISOString(),
    archivedAt: null,
    stats: { itemCount: 0, masteredCount: 0 },
  });

  return planRef.id;
}

// ─── Abhaken (Review) ───────────────────────────────────────────────────────

/**
 * Hakt ein Plan-Item ab (SM-2-Review) in einer Transaktion über
 * Item + Plan + Activity-Monats-Doc + User. Vergibt KEIN XP — XP kommt
 * ausschließlich aus abgeschlossenen Lektionen/Quizzes (saveUserProgress).
 * Setzt aber lastStudyDate und aktualisiert den Streak (echter Lernfortschritt).
 */
export async function checkOffPlanItem(
  uid: string,
  planId: string,
  itemId: string,
  quality: number
): Promise<{ plan: PlanDoc; item: PlanItemDoc } | null> {
  return applyPlanItemReview(uid, planId, itemId, quality, null);
}

/**
 * Schließt einen Übungs-Durchlauf ab (Übungsseite /plans/[planId]/uebung/[itemId]).
 * Die SM-2-Qualität kommt aus der Trefferquote (lib/exercises/scoring.ts),
 * NICHT aus einer Selbsteinschätzung. Zusätzlich zum SM-2-Review schreibt
 * dieselbe Transaktion den letzten Versuch (lastAttempt) und zählt ihn hoch —
 * atomar, damit Quote und Review-Zeitpunkt nie auseinanderlaufen.
 */
export async function completePlanItemExercise(
  uid: string,
  planId: string,
  itemId: string,
  correct: number,
  total: number
): Promise<{ plan: PlanDoc; item: PlanItemDoc } | null> {
  if (!Number.isFinite(total) || total <= 0) return null;
  const quality = qualityFromRatio(correct, total);
  return applyPlanItemReview(uid, planId, itemId, quality, {
    at: new Date().toISOString(),
    correct: Math.max(0, correct),
    total,
  });
}

/**
 * Gemeinsame SM-2-Review-Transaktion für checkOffPlanItem (Selbsteinschätzung,
 * Fallback) und completePlanItemExercise (Trefferquote). `attempt` ≠ null
 * schreibt lastAttempt + attemptCount zusätzlich zum Review.
 */
async function applyPlanItemReview(
  uid: string,
  planId: string,
  itemId: string,
  quality: number,
  attempt: { at: string; correct: number; total: number } | null
): Promise<{ plan: PlanDoc; item: PlanItemDoc } | null> {
  const db = getDb();
  const itemRef = doc(db, "users", uid, "plans", planId, "planItems", itemId);
  const planRef = doc(db, "users", uid, "plans", planId);
  const userRef = doc(db, "users", uid);

  const today = todayKey();
  const activityRef = doc(db, "users", uid, "activity", monthKey(today));
  const day = dayOfMonth(today);

  // studyDays-Union aller aktiven Pläne vorab (wenige Docs) — für die
  // Freie-Tage-Toleranz des Streaks.
  const studyDays = await loadActiveStudyDays(uid);

  return runTransaction(db, async (tx) => {
    const [itemSnap, planSnap, userSnap, activitySnap] = await Promise.all([
      tx.get(itemRef),
      tx.get(planRef),
      tx.get(userRef),
      tx.get(activityRef),
    ]);
    if (!itemSnap.exists() || !planSnap.exists()) return null;

    const item = itemSnap.data() as PlanItemDoc;
    const plan = planSnap.data() as PlanDoc;

    const q = Math.min(Math.max(quality, 0), 5);
    const newSm2 = sm2(q, item.sm2 ?? newCardProgress(itemId));

    const estimatedUnits = Math.max(item.estimatedUnits ?? 0, 1);
    const completedUnits = Math.min((item.completedUnits ?? 0) + 1, estimatedUnits);

    // „Gefestigt" hängt am SM-2-Zustand (repetitions >= 2, interval >= 7),
    // nicht am Abhaken — der Fortschritt misst Behalten, nicht Durcharbeiten.
    const wasConsolidated = isConsolidated(item);
    const becameConsolidated = !wasConsolidated && isConsolidated({ sm2: newSm2 });

    const updatedItem: PlanItemDoc = {
      ...item,
      completedUnits,
      sm2: newSm2,
      nextDueAt: todayKey(new Date(newSm2.nextReview)),
      ...(attempt
        ? { lastAttempt: attempt, attemptCount: (item.attemptCount ?? 0) + 1 }
        : {}),
    };

    const itemCount = plan.stats?.itemCount ?? 0;
    const masteredBefore = plan.stats?.masteredCount ?? 0;
    const masteredAfter = becameConsolidated
      ? itemCount > 0
        ? Math.min(masteredBefore + 1, itemCount)
        : masteredBefore + 1
      : masteredBefore;
    const updatedPlan: PlanDoc = {
      ...plan,
      stats: { itemCount, masteredCount: masteredAfter },
    };

    tx.update(itemRef, {
      sm2: newSm2,
      completedUnits,
      nextDueAt: updatedItem.nextDueAt,
      ...(attempt
        ? { lastAttempt: attempt, attemptCount: (item.attemptCount ?? 0) + 1 }
        : {}),
    });
    tx.update(planRef, { stats: updatedPlan.stats });

    // Activity: EIN Dokument pro Monat (nicht pro Tag) — ein Streak über zwei
    // Monate kostet 2 Reads statt 60.
    const activity = activitySnap.exists()
      ? (activitySnap.data() as ActivityDoc)
      : { days: {} };
    const dayEntry = activity.days?.[day] ?? { units: 0, done: 0, planIds: [] };
    const planIds = dayEntry.planIds?.includes(planId)
      ? dayEntry.planIds
      : [...(dayEntry.planIds ?? []), planId];
    tx.set(
      activityRef,
      {
        days: {
          ...(activity.days ?? {}),
          [day]: {
            units: (dayEntry.units ?? 0) + 1,
            done: (dayEntry.done ?? 0) + (becameConsolidated ? 1 : 0),
            planIds,
          },
        },
      },
      { merge: true }
    );

    // Streak: lastStudyDate stempeln (echter Lernfortschritt), lastActive
    // bleibt Presence vorbehalten.
    if (userSnap.exists()) {
      const user = userSnap.data() as {
        streak?: number;
        streakFreeze?: boolean;
        lastStudyDate?: string;
        lastActive?: string;
      };
      const streakUpdate = updateStreak(
        {
          streak: user.streak ?? 0,
          streakFreeze: user.streakFreeze ?? false,
          lastStudyDate: user.lastStudyDate,
          lastActive: user.lastActive,
        },
        { studyDays }
      );
      tx.update(userRef, {
        lastStudyDate: today,
        streak: streakUpdate.streak,
        streakFreeze: streakUpdate.streakFreeze,
      });
    }

    return { plan: updatedPlan, item: updatedItem };
  });
}

// ─── Queries ────────────────────────────────────────────────────────────────

/**
 * Union der geplanten Lerntage (1=Mo … 7=So) aller aktiven Pläne.
 * `null` → keine aktiven Pläne (Streak verhält sich strikt wie bisher).
 */
export async function loadActiveStudyDays(uid: string): Promise<number[] | null> {
  const db = getDb();
  const snap = await getDocs(query(collection(db, "users", uid, "plans")));
  if (snap.empty) return null;

  const union = new Set<number>();
  let hasActivePlan = false;
  snap.forEach((d) => {
    const plan = d.data() as PlanDoc;
    if (plan.archivedAt != null) return;
    hasActivePlan = true;
    for (const day of Array.isArray(plan.studyDays) ? plan.studyDays : []) {
      if (typeof day === "number" && day >= 1 && day <= 7) union.add(day);
    }
  });
  return hasActivePlan ? [...union] : null;
}

/**
 * Alle heute (oder früher) fälligen Plan-Items über alle Pläne des Users —
 * eine Collection-Group-Query statt N Pläne-Queries. Benötigt den
 * Composite-Index (uid, nextDueAt) aus firestore.indexes.json.
 * Die Begrenzung auf max. 3 pro Plan macht buildToday (lib/today.ts).
 */
export async function loadDuePlanItems(
  uid: string,
  now: Date = new Date()
): Promise<PlanItemWithId[]> {
  const db = getDb();
  const today = todayKey(now);
  const snap = await getDocs(
    query(
      collectionGroup(db, "planItems"),
      where("uid", "==", uid),
      where("nextDueAt", "!=", null),
      where("nextDueAt", "<=", today),
      orderBy("nextDueAt")
    )
  );
  return snap.docs.map((d) => {
    const planId = d.ref.parent.parent?.id ?? "";
    return { ...(d.data() as PlanItemDoc), id: d.id, planId };
  });
}

// ─── Planverwaltung (UI) ────────────────────────────────────────────────────

/** Alle Lehrplan-Vorlagen — öffentlich lesbar (firestore.rules). */
export async function loadPlanTemplates(): Promise<PlanTemplate[]> {
  const db = getDb();
  const snap = await getDocs(query(collection(db, "planTemplates")));
  return snap.docs
    .map((d) => ({ ...(d.data() as PlanTemplate) }))
    .sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
}

/** Alle Pläne des Users (inkl. archivierte) — EIN Read für die Subcollection. */
export async function loadPlans(uid: string): Promise<PlanWithId[]> {
  const db = getDb();
  const snap = await getDocs(query(collection(db, "users", uid, "plans")));
  return snap.docs.map((d) => ({ ...(d.data() as PlanDoc), id: d.id }));
}

export async function loadPlan(
  uid: string,
  planId: string
): Promise<PlanWithId | null> {
  const db = getDb();
  const snap = await getDoc(doc(db, "users", uid, "plans", planId));
  if (!snap.exists()) return null;
  return { ...(snap.data() as PlanDoc), id: snap.id };
}

/** Ein einzelnes Plan-Item (Übungsseite) — EIN Read statt der ganzen Liste. */
export async function loadPlanItem(
  uid: string,
  planId: string,
  itemId: string
): Promise<PlanItemWithId | null> {
  const db = getDb();
  const snap = await getDoc(doc(db, "users", uid, "plans", planId, "planItems", itemId));
  if (!snap.exists()) return null;
  return { ...(snap.data() as PlanItemDoc), id: snap.id, planId };
}

/**
 * Alle Items eines Plans, nach order sortiert. Der where("uid")-Filter ist
 * Pflicht: Die planItems-Regel prüft resource.data.uid — ohne den Filter
 * kann Firestore nicht garantieren, dass die Query nur erlaubte Dokumente
 * trifft, und lehnt sie ab ("insufficient permissions").
 */
export async function loadPlanItems(
  uid: string,
  planId: string
): Promise<PlanItemWithId[]> {
  const db = getDb();
  const snap = await getDocs(
    query(
      collection(db, "users", uid, "plans", planId, "planItems"),
      where("uid", "==", uid)
    )
  );
  return snap.docs
    .map((d) => ({ ...(d.data() as PlanItemDoc), id: d.id, planId }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Alle Plan-Items des Users über alle Pläne — EINE Collection-Group-Query
 * (kein N-pläne-Muster). Clientseitig nach planId gruppiert und nach order
 * sortiert. Ein-Feld-Filter (uid), kein zusätzlicher Index nötig.
 */
export async function loadAllPlanItems(
  uid: string
): Promise<Record<string, PlanItemWithId[]>> {
  const db = getDb();
  const snap = await getDocs(
    query(collectionGroup(db, "planItems"), where("uid", "==", uid))
  );

  const grouped: Record<string, PlanItemWithId[]> = {};
  for (const d of snap.docs) {
    const planId = d.ref.parent.parent?.id;
    if (!planId) continue; // defensiv: Item ohne lesbaren Plan-Pfad überspringen
    const item = { ...(d.data() as PlanItemDoc), id: d.id, planId };
    (grouped[planId] ??= []).push(item);
  }
  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return grouped;
}

/** Activity-Monats-Doc (users/{uid}/activity/{month}) — darf fehlen. */
export async function loadActivityMonth(
  uid: string,
  month: string
): Promise<ActivityDoc | null> {
  const db = getDb();
  const snap = await getDoc(doc(db, "users", uid, "activity", month));
  if (!snap.exists()) return null;
  return snap.data() as ActivityDoc;
}

/** Deadline, Lerntage und Puffer eines Plans nachträglich ändern. */
export async function updatePlan(
  uid: string,
  planId: string,
  updates: Partial<
    Pick<PlanDoc, "title" | "deadline" | "studyDays" | "bufferDays">
  >
): Promise<void> {
  const db = getDb();
  await updateDoc(doc(db, "users", uid, "plans", planId), updates);
}

/** Plan archivieren — bleibt lesbar, taucht nicht mehr im Heute-Plan auf. */
export async function archivePlan(uid: string, planId: string): Promise<void> {
  const db = getDb();
  await updateDoc(doc(db, "users", uid, "plans", planId), {
    archivedAt: new Date().toISOString(),
  });
}

/**
 * Plan ENDGÜLTIG löschen — inklusive aller planItems. Das Client SDK
 * kaskadiert Subcollections nicht: Ohne explizites Löschen der Items
 * blieben verwaiste Dokumente liegen. Batches werden in Chunks unter
 * dem Firestore-Limit (500) committet, falls ein Plan sehr viele Items hat.
 */
export async function deletePlan(uid: string, planId: string): Promise<void> {
  const db = getDb();
  const planRef = doc(db, "users", uid, "plans", planId);

  // where("uid") ist Pflicht — sonst lehnt die Regel die List-Query ab.
  const itemsSnap = await getDocs(
    query(
      collection(db, "users", uid, "plans", planId, "planItems"),
      where("uid", "==", uid)
    )
  );

  const CHUNK_SIZE = 450; // unter dem Batch-Limit von 500
  const batches = [writeBatch(db)];
  let count = 0;

  itemsSnap.forEach((d) => {
    if (count >= CHUNK_SIZE) {
      batches.push(writeBatch(db));
      count = 0;
    }
    batches[batches.length - 1].delete(d.ref);
    count += 1;
  });

  batches[batches.length - 1].delete(planRef);

  for (const batch of batches) {
    await batch.commit();
  }
}

/** Neues Item ans Ende des Plans (order = Maximum + 1). */
export async function addPlanItem(
  uid: string,
  planId: string,
  data: {
    title: string;
    moduleSlug: string | null;
    weight: number;
    estimatedUnits: number;
  }
): Promise<string> {
  const db = getDb();
  const planRef = doc(db, "users", uid, "plans", planId);

  const [planSnap, existingSnap] = await Promise.all([
    getDoc(planRef),
    getDocs(
      query(
        collection(db, "users", uid, "plans", planId, "planItems"),
        where("uid", "==", uid) // Pflicht für die Regel (List-Query)
      )
    ),
  ]);
  if (!planSnap.exists()) throw new Error("Plan nicht gefunden");

  let maxOrder = -1;
  existingSnap.forEach((d) => {
    const order = (d.data() as PlanItemDoc).order ?? 0;
    if (order > maxOrder) maxOrder = order;
  });

  const itemRef = doc(collection(db, "users", uid, "plans", planId, "planItems"));
  const batch = writeBatch(db);
  batch.set(itemRef, {
    title: data.title,
    moduleSlug: data.moduleSlug,
    order: maxOrder + 1,
    weight: data.weight,
    estimatedUnits: data.estimatedUnits,
    completedUnits: 0,
    sm2: null,
    nextDueAt: null,
    uid,
  });
  batch.update(planRef, { "stats.itemCount": increment(1) });
  await batch.commit();
  return itemRef.id;
}

/** Item-Metadaten ändern (kein SM-2-Fortschritt). */
export async function updatePlanItem(
  uid: string,
  planId: string,
  itemId: string,
  changes: Partial<
    Pick<PlanItemDoc, "title" | "moduleSlug" | "weight" | "estimatedUnits">
  >
): Promise<void> {
  const db = getDb();
  await updateDoc(
    doc(db, "users", uid, "plans", planId, "planItems", itemId),
    changes
  );
}

/**
 * Item löschen. Hält plan.stats konsistent (itemCount, masteredCount),
 * damit checkOffPlanItem sein Clamping nicht verliert. Fehlende stats
 * werden defensiv als 0 gelesen.
 */
export async function deletePlanItem(
  uid: string,
  planId: string,
  itemId: string
): Promise<void> {
  const db = getDb();
  const itemRef = doc(db, "users", uid, "plans", planId, "planItems", itemId);
  const planRef = doc(db, "users", uid, "plans", planId);

  const [itemSnap, planSnap] = await Promise.all([
    getDoc(itemRef),
    getDoc(planRef),
  ]);
  if (!itemSnap.exists()) return;

  const item = itemSnap.data() as PlanItemDoc;
  const stats = planSnap.exists()
    ? (planSnap.data() as PlanDoc).stats ?? { itemCount: 0, masteredCount: 0 }
    : { itemCount: 0, masteredCount: 0 };

  const batch = writeBatch(db);
  batch.delete(itemRef);
  batch.update(planRef, {
    "stats.itemCount": Math.max((stats.itemCount ?? 0) - 1, 0),
    "stats.masteredCount": Math.max(
      (stats.masteredCount ?? 0) - (isConsolidated(item) ? 1 : 0),
      0
    ),
  });
  await batch.commit();
}

/** Reihenfolge speichern (order-Feld pro Item, dense 0..n-1). */
export async function reorderPlanItems(
  uid: string,
  planId: string,
  orderedIds: string[]
): Promise<void> {
  const db = getDb();
  const batch = writeBatch(db);
  orderedIds.forEach((itemId, index) => {
    batch.update(doc(db, "users", uid, "plans", planId, "planItems", itemId), {
      order: index,
    });
  });
  await batch.commit();
}
