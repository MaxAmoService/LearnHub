import { describe, expect, it } from "vitest";
import { computePlanReview } from "@/lib/planReview";
import type { FlashcardProgress } from "@/lib/spacing";

// 2026-09-07 12:00 UTC = Montag 14:00 Berliner Zeit → Tages-Key "2026-09-07".
const NOW_MS = Date.UTC(2026, 8, 7, 12, 0, 0);
const TODAY = "2026-09-07";

function makeInput(overrides: Partial<Parameters<typeof computePlanReview>[0]> = {}) {
  return {
    itemId: "item1",
    planId: "plan1",
    item: {
      order: 0,
      weight: 1,
      estimatedUnits: 3,
      completedUnits: 0,
      sm2: null,
      nextDueAt: null,
    },
    plan: {
      deadline: "2026-12-07",
      stats: { itemCount: 5, masteredCount: 0 },
    },
    streakState: {
      streak: 2,
      streakFreeze: false,
      lastStudyDate: "2026-09-06",
    },
    activityDay: undefined,
    quality: 4,
    attempt: null,
    studyDays: null,
    nowMs: NOW_MS,
    ...overrides,
  };
}

describe("computePlanReview", () => {
  it("erster Review: completedUnits +1, SM-2-Intervall 1 Tag, kein Mastery", () => {
    const result = computePlanReview(makeInput());

    expect(result.itemPatch.completedUnits).toBe(1);
    expect(result.itemPatch.sm2.repetitions).toBe(1);
    expect(result.itemPatch.sm2.interval).toBe(1);
    expect(result.itemPatch.nextDueAt).toBe("2026-09-08");
    expect(result.itemPatch.lastAttempt).toBeUndefined();

    expect(result.planStats).toEqual({ itemCount: 5, masteredCount: 0 });
    expect(result.becameConsolidated).toBe(false);
    expect(result.activityDay).toEqual({ units: 1, done: 0, planIds: ["plan1"] });
  });

  it("Activity-Tageseintrag wird fortgeschrieben, planIds ohne Duplikat", () => {
    const result = computePlanReview(
      makeInput({
        activityDay: { units: 2, done: 1, planIds: ["plan1"] },
      })
    );

    expect(result.activityDay.units).toBe(3);
    expect(result.activityDay.planIds).toEqual(["plan1"]);
  });

  it("Konsolidierung: repetitions >= 2 und interval >= 7 → masteredCount +1, done +1", () => {
    // repetitions 2 → SM-2 nimmt die echte Intervall-Fortschreibung
    // round(interval * easeFactor): round(4 * 2.5) = 10 Tage.
    const progress: FlashcardProgress = {
      cardId: "item1",
      interval: 4,
      easeFactor: 2.5,
      repetitions: 2,
      nextReview: 0,
      lastReview: 0,
    };
    const result = computePlanReview(
      makeInput({ item: { ...makeInput().item, sm2: progress }, quality: 4 })
    );

    expect(result.itemPatch.sm2.repetitions).toBe(3);
    expect(result.itemPatch.sm2.interval).toBeGreaterThanOrEqual(7);
    expect(result.becameConsolidated).toBe(true);
    expect(result.planStats.masteredCount).toBe(1);
    expect(result.activityDay.done).toBe(1);
  });

  it("attempt-Variante: lastAttempt und attemptCount werden gesetzt", () => {
    const result = computePlanReview(
      makeInput({
        attempt: { at: "2026-09-07T12:05:00.000Z", correct: 9, total: 10 },
      })
    );

    expect(result.itemPatch.lastAttempt).toEqual({
      at: "2026-09-07T12:05:00.000Z",
      correct: 9,
      total: 10,
    });
    expect(result.itemPatch.attemptCount).toBe(1);
  });

  it("Quality wird auf 0-5 geklemmt", () => {
    const result = computePlanReview(makeInput({ quality: 99 }));

    // quality 99 → 5 geklemmt: wie ein perfekter Review (Ease +0.1).
    expect(result.itemPatch.sm2.repetitions).toBe(1);
    expect(result.itemPatch.sm2.easeFactor).toBe(2.6);

    const bad = computePlanReview(makeInput({ quality: -3 }));
    expect(bad.itemPatch.sm2.repetitions).toBe(0);
  });

  it("Streak: gestern gelernt → +1, lastStudyDate = heute", () => {
    const result = computePlanReview(makeInput());

    expect(result.streak.lastStudyDate).toBe(TODAY);
    expect(result.streak.streak).toBe(3);
    expect(result.streak.streakFreeze).toBe(false);
  });

  it("Streak: heute schon gelernt → unverändert", () => {
    const result = computePlanReview(
      makeInput({ streakState: { streak: 7, streakFreeze: false, lastStudyDate: TODAY } })
    );

    expect(result.streak.streak).toBe(7);
  });
});
