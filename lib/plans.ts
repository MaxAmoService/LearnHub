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
  orderBy,
  query,
  runTransaction,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "./firebase";
import { dayOfMonth, monthKey, todayKey } from "./dates";
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
  /** Exakt die Struktur aus FlashcardProgress (cardId = itemId). */
  sm2: FlashcardProgress | null;
  /** "YYYY-MM-DD" | null — abgeleitet aus sm2.nextReview über lib/dates.ts. */
  nextDueAt: string | null;
  /** Denormalisiert für Collection-Group-Query + Security-Rule. */
  uid: string;
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
      completedUnits: 0,
      sm2: null,
      nextDueAt: null,
      uid,
    });
  }

  await batch.commit();
  return planId;
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
): Promise<PlanItemDoc[]> {
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
  return snap.docs.map((d) => d.data() as PlanItemDoc);
}
