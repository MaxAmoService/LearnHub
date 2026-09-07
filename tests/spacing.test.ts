import { describe, expect, it } from "vitest";
import { getDeckStats, getDueCards, newCardProgress, sm2 } from "@/lib/spacing";

const NOW = 1_700_000_000_000;
const DAY_MS = 24 * 60 * 60 * 1000;

describe("sm2", () => {
  it("erste richtige Antwort: Intervall 1 Tag, repetitions 1", () => {
    const result = sm2(5, newCardProgress("card1"), NOW);
    expect(result.interval).toBe(1);
    expect(result.repetitions).toBe(1);
    expect(result.nextReview).toBe(NOW + DAY_MS);
    expect(result.lastReview).toBe(NOW);
  });

  it("zweite richtige Antwort: Intervall 6 Tage", () => {
    const first = sm2(5, newCardProgress("card1"), NOW);
    const second = sm2(3, first, NOW);
    expect(second.repetitions).toBe(2);
    expect(second.interval).toBe(6);
    expect(second.nextReview).toBe(NOW + 6 * DAY_MS);
  });

  it("dritte richtige Antwort: Intervall = round(interval * ease)", () => {
    const first = sm2(5, newCardProgress("card1"), NOW);
    const second = sm2(5, first, NOW);
    const third = sm2(5, second, NOW);
    expect(third.repetitions).toBe(3);
    expect(third.interval).toBe(Math.round(6 * second.easeFactor));
  });

  it("falsche Antwort setzt repetitions auf 0 und Intervall auf 1", () => {
    const first = sm2(5, newCardProgress("card1"), NOW);
    const second = sm2(5, first, NOW);
    const failed = sm2(1, second, NOW);
    expect(failed.repetitions).toBe(0);
    expect(failed.interval).toBe(1);
  });

  it("Ease-Factor fällt nie unter 1.3", () => {
    let p = newCardProgress("card1");
    for (let i = 0; i < 20; i++) {
      p = sm2(0, p, NOW);
    }
    expect(p.easeFactor).toBe(1.3);
  });

  it("Ease-Factor steigt bei perfekten Antworten", () => {
    const first = sm2(5, newCardProgress("card1"), NOW);
    expect(first.easeFactor).toBeGreaterThan(2.5);
  });
});

describe("newCardProgress", () => {
  it("liefert neutrale Startwerte", () => {
    const p = newCardProgress("abc");
    expect(p).toEqual({
      cardId: "abc",
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      nextReview: 0,
      lastReview: 0,
    });
  });
});

describe("getDueCards", () => {
  const cards = [
    { id: "a", front: "A" },
    { id: "b", front: "B" },
    { id: "c", front: "C" },
  ];

  it("neue Karten ohne Fortschritt sind fällig", () => {
    const due = getDueCards(cards, {}, NOW);
    expect(due.map((c) => c.id)).toEqual(["a", "b", "c"]);
  });

  it("Karten mit zukünftigem nextReview sind nicht fällig", () => {
    const progress = {
      a: { ...newCardProgress("a"), nextReview: NOW + DAY_MS },
      b: { ...newCardProgress("b"), nextReview: NOW - 1 },
    };
    const due = getDueCards(cards, progress, NOW);
    expect(due.map((c) => c.id)).toEqual(["b", "c"]);
  });

  it("erhält den Kartentyp (generisch)", () => {
    const due = getDueCards(cards, {}, NOW);
    expect(due[0]?.front).toBe("A");
  });
});

describe("getDeckStats", () => {
  it("zählt total, studied, due, mastered", () => {
    const cards = [{ id: "a" }, { id: "b" }, { id: "c" }];
    const mastered = { ...newCardProgress("a"), repetitions: 3, easeFactor: 2.2, nextReview: NOW + DAY_MS };
    const learning = { ...newCardProgress("b"), repetitions: 1, easeFactor: 2.5, nextReview: NOW + DAY_MS };
    const progress = { a: mastered, b: learning };
    const stats = getDeckStats(cards, progress, NOW);
    expect(stats.total).toBe(3);
    expect(stats.studied).toBe(2);
    expect(stats.due).toBe(1); // nur "c" ist fällig
    expect(stats.mastered).toBe(1);
  });
});
