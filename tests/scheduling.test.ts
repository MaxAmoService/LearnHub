import { describe, expect, it } from "vitest";
import {
  computeDailyTarget,
  computeEndspurtStart,
  computePace,
  computePhase,
  countStudyDays,
  isConsolidated,
  type PlanItemLike,
  type PlanLike,
} from "@/lib/scheduling";

function makePlan(overrides: Partial<PlanLike> = {}): PlanLike {
  return {
    deadline: "2026-09-17",
    studyDays: [1, 2, 3, 4, 5, 6, 7],
    bufferDays: 0,
    createdAt: "2026-09-07T12:00:00.000Z",
    ...overrides,
  };
}

function makeItem(overrides: Partial<PlanItemLike> = {}): PlanItemLike {
  return {
    order: 0,
    weight: 1,
    estimatedUnits: 4,
    completedUnits: 0,
    sm2: null,
    nextDueAt: null,
    ...overrides,
  };
}

describe("isConsolidated", () => {
  it("null/fehlendes sm2 ist nicht gefestigt", () => {
    expect(isConsolidated(makeItem())).toBe(false);
    expect(isConsolidated(makeItem({ sm2: undefined }))).toBe(false);
  });

  it("braucht repetitions >= 2 UND interval >= 7", () => {
    expect(isConsolidated(makeItem({ sm2: { repetitions: 1, interval: 1 } }))).toBe(false);
    expect(isConsolidated(makeItem({ sm2: { repetitions: 2, interval: 6 } }))).toBe(false);
    expect(isConsolidated(makeItem({ sm2: { repetitions: 2, interval: 7 } }))).toBe(true);
    expect(isConsolidated(makeItem({ sm2: { repetitions: 5, interval: 15 } }))).toBe(true);
  });

  it("toleriert partielle sm2-Dokumente (schemalos)", () => {
    expect(isConsolidated(makeItem({ sm2: { repetitions: 3 } }))).toBe(false);
    expect(isConsolidated(makeItem({ sm2: { interval: 10 } }))).toBe(false);
  });
});

describe("countStudyDays", () => {
  it("zählt Mo–Fr über eine Woche", () => {
    // 2026-09-07 (Mo) bis 2026-09-13 (So)
    expect(countStudyDays("2026-09-07", "2026-09-13", [1, 2, 3, 4, 5])).toBe(5);
  });

  it("rechnet über den Monatswechsel", () => {
    // 2026-01-29 (Do) bis 2026-02-02 (Mo) → Do, Fr, Mo = 3
    expect(countStudyDays("2026-01-29", "2026-02-02", [1, 2, 3, 4, 5])).toBe(3);
  });

  it("ist über die Zeitumstellung hinweg korrekt", () => {
    // 2026-03-28 (Sa) bis 2026-03-30 (Mo) — 23h-Tag am 29.03. darf nichts kosten
    expect(countStudyDays("2026-03-28", "2026-03-30", [1, 2, 3, 4, 5, 6, 7])).toBe(3);
    expect(countStudyDays("2026-10-24", "2026-10-26", [1, 2, 3, 4, 5, 6, 7])).toBe(3);
  });

  it("from nach to ergibt 0; leere studyDays ergibt 0", () => {
    expect(countStudyDays("2026-09-17", "2026-09-07")).toBe(0);
    expect(countStudyDays("2026-09-07", "2026-09-13", [])).toBe(0);
  });

  it("Default: alle Tage sind Lerntage (kein studyDays-Feld im Dokument)", () => {
    expect(countStudyDays("2026-09-07", "2026-09-13")).toBe(7);
  });
});

describe("computeDailyTarget", () => {
  it("offene gewichtete Einheiten / verbleibende Lerntage", () => {
    const plan = makePlan(); // 2026-09-07 → 2026-09-17, alle Tage, kein Puffer
    const items = [makeItem({ weight: 2, estimatedUnits: 10 })];
    // 11 Lerntage inklusive, 20 offene Einheiten → ceil(20/11) = 2
    expect(computeDailyTarget(plan, items, "2026-09-07")).toBe(2);
  });

  it("zieht bufferDays ab", () => {
    const plan = makePlan({ bufferDays: 3 });
    const items = [makeItem({ weight: 2, estimatedUnits: 10 })];
    // 11 - 3 = 8 → ceil(20/8) = 3
    expect(computeDailyTarget(plan, items, "2026-09-07")).toBe(3);
  });

  it("Deadline in der Vergangenheit: alles Offene ist fällig", () => {
    const plan = makePlan({ deadline: "2026-09-06" });
    const items = [makeItem({ weight: 2, estimatedUnits: 10 })];
    expect(computeDailyTarget(plan, items, "2026-09-07")).toBe(20);
  });

  it("Plan ohne Items ergibt 0", () => {
    expect(computeDailyTarget(makePlan(), [], "2026-09-07")).toBe(0);
  });

  it("Rückstand: der Wert steigt, weil der Nenner schrumpft", () => {
    const plan = makePlan();
    const items = [makeItem({ weight: 2, estimatedUnits: 10 })];
    const early = computeDailyTarget(plan, items, "2026-09-07"); // 11 Tage
    const late = computeDailyTarget(plan, items, "2026-09-10"); // 8 Tage
    expect(late).toBeGreaterThan(early);
    expect(early).toBe(2);
    expect(late).toBe(3);
  });

  it("gekonsolidierte Items zählen nicht mehr in den Zielwert", () => {
    const plan = makePlan();
    const items = [makeItem({ sm2: { repetitions: 2, interval: 7 } })];
    expect(computeDailyTarget(plan, items, "2026-09-07")).toBe(0);
  });

  it("Dokumente ohne neue Felder (completedUnits/weight fehlen)", () => {
    const plan = makePlan();
    const items = [makeItem({ weight: undefined, completedUnits: undefined, estimatedUnits: 10 })];
    expect(computeDailyTarget(plan, items, "2026-09-07")).toBe(1); // ceil(10/11)
  });
});

describe("computePhase", () => {
  it("langer Plan (60 Tage): aufbau → festigung → endspurt", () => {
    const plan = makePlan({
      createdAt: "2026-07-09T12:00:00.000Z",
      deadline: "2026-09-07",
    }); // 60 Tage Laufzeit
    // remaining 40 → aufbau; remaining 15 → festigung (>14, <=25% von 60); remaining 14 → endspurt
    expect(computePhase(plan, "2026-07-29")).toBe("aufbau");
    expect(computePhase(plan, "2026-08-23")).toBe("festigung");
    expect(computePhase(plan, "2026-08-24")).toBe("endspurt");
  });

  it("kurzer Plan (10 Tage): Endspurt skaliert auf 20 % = 2 Tage", () => {
    const plan = makePlan({
      createdAt: "2026-09-01T12:00:00.000Z",
      deadline: "2026-09-11",
    });
    // Tag 9 (2 Tage Rest) → endspurt; Tag 8 (3 Tage Rest) → aufbau — kein Dauer-Endspurt
    expect(computePhase(plan, "2026-09-09")).toBe("endspurt");
    expect(computePhase(plan, "2026-09-08")).toBe("aufbau");
    expect(computePhase(plan, "2026-09-01")).toBe("aufbau");
  });

  it("sehr kurzer Plan: Endspurt mindestens 1 Tag", () => {
    const plan = makePlan({
      createdAt: "2026-09-05T12:00:00.000Z",
      deadline: "2026-09-07",
    }); // 2 Tage Laufzeit → Endspurt = max(1, round(0.4)) = 1
    expect(computePhase(plan, "2026-09-07")).toBe("endspurt");
    expect(computePhase(plan, "2026-09-05")).toBe("aufbau");
  });

  it("Deadline überschritten → endspurt", () => {
    const plan = makePlan({ deadline: "2026-09-06" });
    expect(computePhase(plan, "2026-09-10")).toBe("endspurt");
  });

  it("ohne createdAt (altes Dokument) defensiv: aufbau bei Zukunft", () => {
    const plan = makePlan({ createdAt: undefined, deadline: "2027-09-07" });
    expect(computePhase(plan, "2026-09-07")).toBe("aufbau");
  });
});

describe("computeEndspurtStart", () => {
  it("langer Plan (60 Tage): Endspurt beginnt 14 Tage vor der Deadline", () => {
    const plan = makePlan({
      createdAt: "2026-07-09T12:00:00.000Z",
      deadline: "2026-09-07",
    });
    expect(computeEndspurtStart(plan, "2026-07-29")).toBe("2026-08-24");
    // Am Starttag ist Endspurt, am Tag davor noch Festigung
    expect(computePhase(plan, "2026-08-24")).toBe("endspurt");
    expect(computePhase(plan, "2026-08-23")).toBe("festigung");
  });

  it("kurzer Plan (10 Tage): Endspurt = 20 % der Laufzeit (2 Tage)", () => {
    const plan = makePlan({
      createdAt: "2026-09-01T12:00:00.000Z",
      deadline: "2026-09-11",
    });
    expect(computeEndspurtStart(plan, "2026-09-01")).toBe("2026-09-09");
    expect(computePhase(plan, "2026-09-09")).toBe("endspurt");
    expect(computePhase(plan, "2026-09-08")).toBe("aufbau");
  });

  it("sehr kurzer Plan: Endspurt mindestens 1 Tag", () => {
    const plan = makePlan({
      createdAt: "2026-09-05T12:00:00.000Z",
      deadline: "2026-09-07",
    });
    expect(computeEndspurtStart(plan, "2026-09-05")).toBe("2026-09-06");
    expect(computePhase(plan, "2026-09-06")).toBe("endspurt");
  });

  it("ohne createdAt (altes Dokument): defensiv ab heute rechnen", () => {
    const plan = makePlan({ createdAt: undefined, deadline: "2026-09-17" });
    // 10 Tage ab heute → Endspurt = 2 Tage → 17.09. minus 2
    expect(computeEndspurtStart(plan, "2026-09-07")).toBe("2026-09-15");
  });
});

describe("computePace", () => {
  const plan = makePlan({
    createdAt: "2026-09-01T12:00:00.000Z",
    deadline: "2026-09-11",
  }); // 10 Tage Laufzeit

  it("Plan ohne Items → on_track", () => {
    expect(computePace(plan, [], "2026-09-04")).toBe("on_track");
  });

  it("ahead: Ist-Fortschritt über Soll", () => {
    // elapsed 3 von 10 → Soll 0.3; beide Items zur Hälfte → Ist 0.5 → ratio 1.67
    const items = [
      makeItem({ completedUnits: 2, estimatedUnits: 4 }),
      makeItem({ completedUnits: 2, estimatedUnits: 4 }),
    ];
    expect(computePace(plan, items, "2026-09-04")).toBe("ahead");
  });

  it("on_track: Ist ≈ Soll", () => {
    // elapsed 5 → Soll 0.5; ein Item fertig abgehakt (aber nicht gefestigt: 0.5) → Ist 0.5
    const items = [
      makeItem({ completedUnits: 4, estimatedUnits: 4 }),
      makeItem({ completedUnits: 0, estimatedUnits: 4 }),
    ];
    expect(computePace(plan, items, "2026-09-06")).toBe("on_track");
  });

  it("behind: Ist deutlich unter Soll", () => {
    // elapsed 6 → Soll 0.6; Ist 0.5 → ratio 0.83
    const items = [
      makeItem({ completedUnits: 2, estimatedUnits: 4 }),
      makeItem({ completedUnits: 2, estimatedUnits: 4 }),
    ];
    expect(computePace(plan, items, "2026-09-07")).toBe("behind");
  });

  it("critical: kaum Fortschritt", () => {
    const items = [makeItem({ completedUnits: 0 }), makeItem({ completedUnits: 0 })];
    expect(computePace(plan, items, "2026-09-06")).toBe("critical");
  });

  it("Gefestigte Items zählen als 100 %", () => {
    const items = [
      makeItem({ sm2: { repetitions: 2, interval: 7 } }),
      makeItem({ completedUnits: 0 }),
    ];
    expect(computePace(plan, items, "2026-09-06")).toBe("on_track");
  });

  it("frisch erstellter Plan ohne Fortschritt: on_track statt critical", () => {
    const fresh = makePlan({
      createdAt: "2026-09-07T12:00:00.000Z",
      deadline: "2027-01-05", // 120 Tage Laufzeit
    });
    const items = [makeItem({ completedUnits: 0 })];
    // Erstellungstag: noch kein Soll aufgelaufen → kein Rückstand
    expect(computePace(fresh, items, "2026-09-07")).toBe("on_track");
    // Am Erstellungstag direkt etwas geschafft → voraus
    expect(
      computePace(fresh, [makeItem({ completedUnits: 1 })], "2026-09-07")
    ).toBe("ahead");
  });

  it("Deadline überschritten: alles gefestigt → ahead, sonst Abstufung", () => {
    const allDone = [makeItem({ sm2: { repetitions: 2, interval: 7 } })];
    expect(computePace(plan, allDone, "2026-09-15")).toBe("ahead");
    const halfDone = [makeItem({ completedUnits: 2, estimatedUnits: 4 })];
    expect(computePace(plan, halfDone, "2026-09-15")).toBe("behind");
  });
});
