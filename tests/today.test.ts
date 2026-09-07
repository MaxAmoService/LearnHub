import { describe, expect, it } from "vitest";
import { buildToday } from "@/lib/today";
import type { PlanItemLike, PlanLike } from "@/lib/scheduling";

const NOW = new Date("2026-09-07T12:00:00Z"); // Montag

function makePlan(overrides: Partial<PlanLike> = {}): PlanLike {
  return {
    deadline: "2026-12-07",
    studyDays: [1, 2, 3, 4, 5, 6, 7],
    bufferDays: 0,
    createdAt: "2026-09-01T12:00:00.000Z",
    ...overrides,
  };
}

function makeItem(overrides: Partial<PlanItemLike> = {}): PlanItemLike {
  return {
    order: 0,
    weight: 1,
    estimatedUnits: 3,
    completedUnits: 0,
    sm2: null,
    nextDueAt: null,
    ...overrides,
  };
}

describe("buildToday", () => {
  it("Plan ohne Items: leere Blöcke, leere Queue", () => {
    const plans = [{ ...makePlan(), id: "p1" }];
    const result = buildToday(plans, { p1: [] }, null, NOW);
    expect(result.blocks).toEqual([{ planId: "p1", neu: null, wiederholung: [] }]);
    expect(result.queue).toEqual([]);
  });

  it("neu = nächstes offenes Item nach order", () => {
    const plans = [{ ...makePlan(), id: "p1" }];
    const items = {
      p1: [
        makeItem({ order: 2, title: "C" }),
        makeItem({ order: 0, title: "A" }),
        makeItem({ order: 1, title: "B", sm2: { repetitions: 2, interval: 7 } }),
      ],
    };
    const result = buildToday(plans, items, null, NOW);
    // Item B ist gefestigt, A (order 0) ist das nächste offene
    expect(result.blocks[0].neu).toBeDefined();
    expect(result.blocks[0].neu?.order).toBe(0);
  });

  it("wiederholung: nur fällige Items, nach Fälligkeit, max. 3 pro Plan", () => {
    const plans = [{ ...makePlan(), id: "p1" }];
    const items = {
      p1: [
        makeItem({ order: 1, nextDueAt: "2026-09-06" }),
        makeItem({ order: 0, nextDueAt: "2026-09-05" }),
        makeItem({ order: 2, nextDueAt: "2026-09-04" }),
        makeItem({ order: 3, nextDueAt: "2026-09-03" }),
        makeItem({ order: 4, nextDueAt: "2026-09-10" }), // nicht fällig
      ],
    };
    const block = buildToday(plans, items, null, NOW).blocks[0];
    expect(block.wiederholung.map((i) => i.nextDueAt)).toEqual([
      "2026-09-03",
      "2026-09-04",
      "2026-09-05",
    ]);
  });

  it("Items ohne neue Felder: kein nextDueAt → nicht fällig; kein sm2 → offen", () => {
    const plans = [{ ...makePlan(), id: "p1" }];
    const items = {
      p1: [
        makeItem({ order: 1, nextDueAt: undefined }),
        makeItem({ order: 0, sm2: undefined }),
      ],
    };
    const block = buildToday(plans, items, null, NOW).blocks[0];
    expect(block.wiederholung).toEqual([]);
    expect(block.neu?.order).toBe(0);
  });

  it("Queue: Überfällige Wiederholungen zuerst, dann Neues, gemischt über Pläne", () => {
    const plans = [
      { ...makePlan(), id: "p1" },
      { ...makePlan(), id: "p2" },
    ];
    const items = {
      p1: [
        makeItem({ order: 0, nextDueAt: "2026-09-04" }),
        makeItem({ order: 1, nextDueAt: "2026-09-07" }),
      ],
      p2: [
        makeItem({ order: 0, nextDueAt: "2026-09-05" }),
        makeItem({ order: 1, nextDueAt: null }),
      ],
    };
    const result = buildToday(plans, items, null, NOW);
    // Reihenfolge nach Fälligkeit über Pläne hinweg — nicht blockweise.
    // p1 hat nur fällige Items (09-04, 09-07) → kein Neu-Block; p2 order 1 ist offen und nicht fällig → neu.
    expect(result.queue.map((i) => i.nextDueAt)).toEqual([
      "2026-09-04",
      "2026-09-05",
      "2026-09-07",
      null,
    ]);
    expect(result.blocks[0].neu).toBeNull();
    expect(result.blocks[1].neu?.nextDueAt).toBeNull();
  });

  it("festigung/endspurt: kein Neu-Block, nur Wiederholung", () => {
    const plans = [
      {
        ...makePlan(),
        id: "p1",
        createdAt: "2026-07-09T12:00:00.000Z",
        deadline: "2026-09-07", // 60 Tage; heute = Deadline → endspurt
      },
    ];
    const items = {
      p1: [
        makeItem({ order: 0 }),
        makeItem({ order: 1, nextDueAt: "2026-09-06" }),
      ],
    };
    const block = buildToday(plans, items, null, NOW).blocks[0];
    expect(block.neu).toBeNull();
    expect(block.wiederholung.length).toBe(1);
  });

  it("archivierte Pläne werden übersprungen", () => {
    const plans = [
      { ...makePlan(), id: "p1", archivedAt: "2026-09-01T10:00:00.000Z" },
      { ...makePlan(), id: "p2" },
    ];
    const result = buildToday(plans, { p2: [makeItem({ order: 0 })] }, null, NOW);
    expect(result.blocks.map((b) => b.planId)).toEqual(["p2"]);
  });

  it("Pläne mit heutiger Aktivität kommen bei den Neu-Items nach hinten", () => {
    const plans = [
      { ...makePlan(), id: "p1" },
      { ...makePlan(), id: "p2" },
    ];
    const items = {
      p1: [makeItem({ order: 0, title: "p1-neu" })],
      p2: [makeItem({ order: 0, title: "p2-neu" })],
    };
    const activity = { days: { "07": { units: 2, done: 0, planIds: ["p1"] } } };
    const queue = buildToday(plans, items, activity, NOW).queue;
    expect(queue.map((i) => i.title)).toEqual(["p2-neu", "p1-neu"]);
  });

  it("ohne Activity-Dokument funktioniert alles", () => {
    const plans = [{ ...makePlan(), id: "p1" }];
    const result = buildToday(plans, { p1: [makeItem({ order: 0 })] }, null, NOW);
    expect(result.queue.length).toBe(1);
  });
});
