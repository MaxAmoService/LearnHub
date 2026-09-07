// ============================================================================
// Plan-Item-Review über das Admin SDK (Route Handler /api/v1/log)
// ============================================================================
//
// Gegenstück zu lib/plans.ts für den Server: gleiche reine Berechnung
// (lib/planReview.ts), aber die Firestore-Zugriffe laufen über das Admin SDK,
// das die Security Rules umgeht. Deshalb prüft diese Funktion SELBST, wessen
// Daten sie anfasst: Das Item muss im Pfad users/{uid}/... liegen (ergibt
// sich aus den Refs) UND sein denormalisiertes uid-Feld muss zum Key-Besitzer
// passen — sonst könnte ein Key mit write-Scope fremde Items abhaken.

import { getAdminDb } from "../firebaseAdmin";
import { dayOfMonth, monthKey, todayKey } from "../dates";
import {
  computePlanReview,
  type PlanReviewItem,
  type PlanReviewPlan,
} from "../planReview";

export type AdminReviewResult =
  | { ok: true; nextDueAt: string }
  | { ok: false; reason: "not_found" | "forbidden" };

/** Union der Lerntage aller aktiven Pläne (Admin-SDK-Variante). */
async function loadActiveStudyDaysAdmin(uid: string): Promise<number[] | null> {
  const db = getAdminDb();
  const snap = await db.collection("users").doc(uid).collection("plans").get();
  if (snap.empty) return null;

  const union = new Set<number>();
  let hasActivePlan = false;
  for (const d of snap.docs) {
    const plan = d.data() as { archivedAt?: string | null; studyDays?: unknown };
    if (plan.archivedAt != null) continue;
    hasActivePlan = true;
    for (const day of Array.isArray(plan.studyDays) ? plan.studyDays : []) {
      if (typeof day === "number" && day >= 1 && day <= 7) union.add(day);
    }
  }
  return hasActivePlan ? [...union] : null;
}

/**
 * Hakt ein Plan-Item über das Admin SDK ab. Selbe Transaktions-Struktur wie
 * applyPlanItemReview in lib/plans.ts (Item + Plan + Activity + User).
 */
export async function applyPlanItemReviewAdmin(
  uid: string,
  planId: string,
  itemId: string,
  quality: number,
  attempt: { at: string; correct: number; total: number } | null
): Promise<AdminReviewResult> {
  const db = getAdminDb();
  const itemRef = db.collection("users").doc(uid).collection("plans").doc(planId).collection("planItems").doc(itemId);
  const planRef = db.collection("users").doc(uid).collection("plans").doc(planId);
  const userRef = db.collection("users").doc(uid);

  const nowMs = Date.now();
  const today = todayKey(new Date(nowMs));
  const activityRef = db.collection("users").doc(uid).collection("activity").doc(monthKey(today));
  const day = dayOfMonth(today);

  const studyDays = await loadActiveStudyDaysAdmin(uid);

  return db.runTransaction(async (tx) => {
    const [itemSnap, planSnap, userSnap, activitySnap] = await Promise.all([
      tx.get(itemRef),
      tx.get(planRef),
      tx.get(userRef),
      tx.get(activityRef),
    ]);

    if (!itemSnap.exists || !planSnap.exists) {
      return { ok: false, reason: "not_found" } as const;
    }

    const itemData = itemSnap.data() as Record<string, unknown>;
    // Admin SDK umgeht die Rules: Eigentum selbst prüfen.
    if (itemData.uid !== uid) {
      return { ok: false, reason: "forbidden" } as const;
    }

    const planData = planSnap.data() as Record<string, unknown>;
    const activityData = activitySnap.exists
      ? (activitySnap.data() as { days?: Record<string, unknown> })
      : { days: {} };
    const dayEntry = (activityData.days?.[day] as
      | { units?: number; done?: number; planIds?: string[] }
      | undefined);

    const result = computePlanReview({
      itemId,
      planId,
      item: itemData as unknown as PlanReviewItem,
      plan: planData as unknown as PlanReviewPlan,
      streakState: userSnap.exists
        ? (userSnap.data() as {
            streak?: number;
            streakFreeze?: boolean;
            lastStudyDate?: string;
            lastActive?: string;
          })
        : {},
      activityDay: dayEntry,
      quality,
      attempt,
      studyDays,
      nowMs,
    });

    tx.update(itemRef, result.itemPatch);
    tx.update(planRef, { stats: result.planStats });
    tx.set(
      activityRef,
      { days: { ...(activityData.days ?? {}), [day]: result.activityDay } },
      { merge: true }
    );
    if (userSnap.exists) {
      tx.update(userRef, {
        lastStudyDate: result.streak.lastStudyDate,
        streak: result.streak.streak,
        streakFreeze: result.streak.streakFreeze,
      });
    }

    return { ok: true, nextDueAt: result.itemPatch.nextDueAt } as const;
  });
}
