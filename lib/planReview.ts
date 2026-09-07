// ============================================================================
// Plan-Item-Review — reine Berechnung (kein Firestore)
// ============================================================================
//
// Die gemeinsame Review-Berechnung für das Abhaken von Lehrplan-Items. Sie
// war ursprünglich Teil der Client-Transaktion (lib/plans.ts) und wird seit
// Einführung der API-Routen (app/api/v1/log) auch vom Admin SDK genutzt.
// Damit Web und API niemals auseinanderlaufen, liegt die Berechnung hier in
// EINER reinen Funktion — beide Seiten schreiben nur noch die Rückgabewerte
// in ihre Transaktion.
//
// `nowMs` ist injizierbar, damit Tests deterministisch laufen; der Default
// entspricht dem bisherigen Verhalten (Date.now()).

import { todayKey } from "./dates";
import { isConsolidated, type PlanItemLike, type PlanLike } from "./scheduling";
import { newCardProgress, sm2, type FlashcardProgress } from "./spacing";
import { updateStreak } from "./streak";

export interface PlanReviewActivityDay {
  units?: number;
  done?: number;
  planIds?: string[];
}

export interface PlanReviewStreakState {
  streak?: number;
  streakFreeze?: boolean;
  lastStudyDate?: string;
  lastActive?: string;
}

/** Item mit attemptCount — Firestore-Docs haben das Feld, PlanItemLike nicht. */
export interface PlanReviewItem extends Omit<PlanItemLike, "sm2"> {
  sm2?: FlashcardProgress | null;
  attemptCount?: number;
}

/** Plan mit stats — Firestore-Docs haben das Feld, PlanLike nicht. */
export interface PlanReviewPlan extends PlanLike {
  stats?: { itemCount?: number; masteredCount?: number };
}

export interface PlanReviewResult {
  /** Felder, die auf das Item-Dokument geschrieben werden. */
  itemPatch: {
    sm2: FlashcardProgress;
    completedUnits: number;
    nextDueAt: string;
    lastAttempt?: { at: string; correct: number; total: number };
    attemptCount?: number;
  };
  /** Neuer stats-Wert des Plan-Dokuments. */
  planStats: { itemCount: number; masteredCount: number };
  /** Neuer Tageseintrag im Activity-Monats-Doc. */
  activityDay: { units: number; done: number; planIds: string[] };
  /** Felder für das User-Dokument (Streak-Pflege). */
  streak: { lastStudyDate: string; streak: number; streakFreeze: boolean };
  becameConsolidated: boolean;
}

/**
 * Berechnet das Ergebnis EINES SM-2-Reviews eines Plan-Items.
 *
 * `attempt` ≠ null bedeutet: Der Review kommt aus einem Übungs-Durchlauf
 * (Trefferquote), nicht aus der Selbsteinschätzung — dann werden zusätzlich
 * lastAttempt und attemptCount fortgeschrieben (wie completePlanItemExercise).
 */
export function computePlanReview(input: {
  itemId: string;
  planId: string;
  item: PlanReviewItem;
  plan: PlanReviewPlan;
  streakState: PlanReviewStreakState;
  /** Heutiger Tageseintrag aus dem Activity-Monats-Doc — darf fehlen. */
  activityDay: PlanReviewActivityDay | undefined;
  quality: number;
  attempt: { at: string; correct: number; total: number } | null;
  /** Union der Lerntage aller aktiven Pläne (1=Mo … 7=So); null = strikt. */
  studyDays: number[] | null;
  nowMs: number;
}): PlanReviewResult {
  const { itemId, planId, item, plan, attempt, studyDays, nowMs } = input;

  const q = Math.min(Math.max(input.quality, 0), 5);
  const newSm2 = sm2(q, item.sm2 ?? newCardProgress(itemId), nowMs);

  const estimatedUnits = Math.max(item.estimatedUnits ?? 0, 1);
  const completedUnits = Math.min((item.completedUnits ?? 0) + 1, estimatedUnits);

  // „Gefestigt" hängt am SM-2-Zustand (repetitions >= 2, interval >= 7),
  // nicht am Abhaken — der Fortschritt misst Behalten, nicht Durcharbeiten.
  const wasConsolidated = isConsolidated(item);
  const becameConsolidated = !wasConsolidated && isConsolidated({ sm2: newSm2 });

  const itemPatch: PlanReviewResult["itemPatch"] = {
    sm2: newSm2,
    completedUnits,
    nextDueAt: todayKey(new Date(newSm2.nextReview)),
    ...(attempt ? { lastAttempt: attempt, attemptCount: (item.attemptCount ?? 0) + 1 } : {}),
  };

  const itemCount = plan.stats?.itemCount ?? 0;
  const masteredBefore = plan.stats?.masteredCount ?? 0;
  const masteredAfter = becameConsolidated
    ? itemCount > 0
      ? Math.min(masteredBefore + 1, itemCount)
      : masteredBefore + 1
    : masteredBefore;

  // Activity: EIN Dokument pro Monat (nicht pro Tag).
  const dayEntry = input.activityDay ?? { units: 0, done: 0, planIds: [] };
  const activityDay = {
    units: (dayEntry.units ?? 0) + 1,
    done: (dayEntry.done ?? 0) + (becameConsolidated ? 1 : 0),
    planIds: (dayEntry.planIds ?? []).includes(planId)
      ? [...(dayEntry.planIds ?? [])]
      : [...(dayEntry.planIds ?? []), planId],
  };

  const streakUpdate = updateStreak(
    {
      streak: input.streakState.streak ?? 0,
      streakFreeze: input.streakState.streakFreeze ?? false,
      lastStudyDate: input.streakState.lastStudyDate,
      lastActive: input.streakState.lastActive,
    },
    { now: new Date(nowMs), studyDays }
  );

  return {
    itemPatch,
    planStats: { itemCount, masteredCount: masteredAfter },
    activityDay,
    streak: {
      lastStudyDate: todayKey(new Date(nowMs)),
      streak: streakUpdate.streak,
      streakFreeze: streakUpdate.streakFreeze,
    },
    becameConsolidated,
  };
}
