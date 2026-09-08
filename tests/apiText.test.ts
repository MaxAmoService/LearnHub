import { describe, expect, it } from "vitest";
import {
  formatTodayText,
  MAX_PLAN_TITLE,
  MAX_TEXT_LINES,
  MAX_TEXT_WIDTH,
  toAscii,
  truncateWords,
} from "@/lib/apiText";
import type { TodayApiPlan, TodayApiResponse } from "@/lib/apiTypes";

function makePlan(overrides: Partial<TodayApiPlan> = {}): TodayApiPlan {
  return {
    id: "p1",
    label: "AP1",
    deadline: "2026-12-07",
    daysLeft: 90,
    phase: "aufbau",
    pace: "on_track",
    neu: null,
    wiederholung: [],
    ...overrides,
  };
}

function makeData(overrides: Partial<TodayApiResponse> = {}): TodayApiResponse {
  return {
    date: "2026-09-07",
    streak: { current: 5, best: 5, doneToday: 0, weekDone: 3, weekTarget: 7 },
    plans: [],
    ...overrides,
  };
}

const ASCII_RE = /^[\x20-\x7E]*$/;

describe("toAscii / truncateWords", () => {
  it("Umlaute transliterieren, Nicht-ASCII → ?", () => {
    expect(toAscii("Größen ändern")).toBe("Groessen aendern");
    expect(toAscii("Übung Äpfel")).toBe("Uebung Aepfel");
    expect(toAscii("Party 🎉")).toBe("Party ?");
  });

  it("truncateWords kürzt an der Wortgrenze und markiert mit \"...\"", () => {
    expect(truncateWords("abc", 10)).toBe("abc");
    expect(truncateWords("Aufgaben und Aufbau eines Betriebssystems", 28)).toBe(
      "Aufgaben und Aufbau eines..."
    );
    expect(truncateWords("Multitasking und Scheduling", 12)).toBe("Multitask...");
    expect(truncateWords("abcdef", 4)).toBe("a...");
    expect(truncateWords("abcdef", 2)).toBe("..");
  });
});

describe("formatTodayText", () => {
  it("ohne Pläne: Hinweis + Streak-Zeile", () => {
    const text = formatTodayText(makeData({ streak: { current: 0, best: 0, doneToday: 0, weekDone: 0, weekTarget: 7 } }));
    expect(text.split("\n")).toEqual(["Nichts zu tun.", "Streak 0/7"]);
  });

  it("Plan-Zeile: Label + Titel links, done/target rechtsbündig, 40 breit", () => {
    const text = formatTodayText(
      makeData({
        plans: [
          makePlan({
            label: "AP1",
            neu: {
              itemId: "i1",
              title: "Rechnersysteme",
              target: 10,
              done: 0,
              unit: "UE",
              url: "https://example.test/plans/p1",
            },
          }),
        ],
      })
    );

    const lines = text.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0].endsWith(" 0/10")).toBe(true);
    expect(lines[0].length).toBe(MAX_TEXT_WIDTH);
    expect(lines[1]).toBe("Streak 5/7");
  });

  it("maximal 5 Zeilen — Plan-Zeilen werden geopfert, Streak bleibt", () => {
    const plans = Array.from({ length: 8 }, (_, i) =>
      makePlan({
        id: `p${i}`,
        label: `Plan${i}`,
        neu: {
          itemId: `i${i}`,
          title: `Thema ${i}`,
          target: 10,
          done: 0,
          unit: "UE",
          url: "https://example.test/plans/p",
        },
      })
    );
    const lines = formatTodayText(makeData({ plans })).split("\n");
    expect(lines).toHaveLength(MAX_TEXT_LINES);
    expect(lines[lines.length - 1]).toBe("Streak 5/7");
  });

  it("Wdh-Zeile: mehrere fällige Titel werden dedupliziert und gezählt", () => {
    const review = (title: string) => ({
      itemId: "x",
      title,
      target: 5,
      done: 1,
      unit: "UE",
      url: "https://example.test/plans/p1",
      overdueSince: "2026-09-01",
    });
    const text = formatTodayText(
      makeData({
        plans: [
          makePlan({ wiederholung: [review("Subnetting"), review("Subnetting"), review("Zahlensysteme")] }),
        ],
      })
    );

    expect(text).toContain("Wdh: Subnetting +1");
  });

  it("Wdh-Zeile: erstes fälliges Thema + Anzahl weiterer", () => {
    const review = (title: string) => ({
      itemId: "x",
      title,
      target: 5,
      done: 1,
      unit: "UE",
      url: "https://example.test/plans/p1",
      overdueSince: "2026-09-01",
    });
    const text = formatTodayText(
      makeData({
        plans: [
          makePlan({
            wiederholung: [
              review("Betriebssysteme"),
              review("Subnetting"),
              review("Zahlensysteme"),
            ],
          }),
        ],
      })
    );

    expect(text).toContain("Wdh: Betriebssysteme +2");
  });

  it("Umlaute und Emojis kommen nicht durch — reines ASCII", () => {
    const text = formatTodayText(
      makeData({
        plans: [
          makePlan({
            label: "Mathe 1",
            neu: {
              itemId: "i1",
              title: "Größen üben 🚀",
              target: 10,
              done: 2,
              unit: "UE",
              url: "https://example.test/plans/p1",
            },
          }),
        ],
      })
    );

    for (const line of text.split("\n")) {
      expect(line).toMatch(ASCII_RE);
      expect(line.length).toBeLessThanOrEqual(MAX_TEXT_WIDTH);
    }
    expect(text).toContain("Groessen");
  });

  it("lange Titel enden an der Wortgrenze mit \"...\" — nie über 40 breit", () => {
    const review = (title: string) => ({
      itemId: "x",
      title,
      target: 5,
      done: 1,
      unit: "UE",
      url: "https://example.test/plans/p1",
      overdueSince: "2026-09-01",
    });
    const text = formatTodayText(
      makeData({
        plans: [
          makePlan({
            neu: {
              itemId: "i1",
              title: "Multitasking und Scheduling",
              target: 2,
              done: 0,
              unit: "UE",
              url: "https://example.test/plans/p1",
            },
            wiederholung: [review("Aufgaben und Aufbau eines Betriebssystems")],
          }),
        ],
      })
    );

    const lines = text.split("\n");
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(MAX_TEXT_WIDTH);
    }
    expect(lines[0]).toContain("Multitask...");
    expect(lines[1]).toBe("Wdh: Aufgaben und Aufbau eines...");
    expect(lines[2]).toBe("Streak 5/7");
  });

  it("Plantitel wird auf maximal 12 Zeichen gekürzt", () => {
    const text = formatTodayText(
      makeData({
        plans: [
          makePlan({
            neu: {
              itemId: "i1",
              title: "IT-Berufe: Multitasking und Scheduling",
              target: 2,
              done: 0,
              unit: "UE",
              url: "https://example.test/plans/p1",
            },
          }),
        ],
      })
    );

    expect(text.split("\n")[0]).toContain("IT-Berufe...");
    expect("IT-Berufe...".length).toBeLessThanOrEqual(MAX_PLAN_TITLE);
  });

  it("Plan ohne offene Themen: Hinweis statt leerer Zeilen", () => {
    const text = formatTodayText(
      makeData({
        plans: [makePlan(), makePlan({ id: "p2", label: "Mathe 1" })],
      })
    );

    expect(text.split("\n")).toEqual(["Nichts zu tun.", "Streak 5/7"]);
  });
});
