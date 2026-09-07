// Auswertungslogik der Übungsseite — reine Funktionen, keine Firebase-/UI-Tests.
//
// Abgedeckt: Trefferquote → SM-2-Qualität (Schwellen exakt), Normalisierung
// von numeric-Eingaben (Dezimaltrenner, Tausenderpunkte, Leerzeichen, Einheiten),
// String-Antworten (führende Nullen bleiben erhalten!), Teilpunkte bei match,
// defensives sanitizeExercises.

import { describe, expect, it } from "vitest";
import {
  checkNumericAnswer,
  normalizeStringAnswer,
  parseNumericInput,
  qualityFromRatio,
  sanitizeExercises,
  scoreMatchPairs,
  shuffle,
} from "@/lib/exercises/scoring";
import type { Exercise, MatchPair } from "@/lib/exercises/types";

describe("qualityFromRatio", () => {
  it("bildet die Schwellen exakt ab", () => {
    expect(qualityFromRatio(9, 10)).toBe(5); // 90 %
    expect(qualityFromRatio(7.5, 10)).toBe(4); // 75 %
    expect(qualityFromRatio(6, 10)).toBe(3); // 60 %
    expect(qualityFromRatio(4, 10)).toBe(2); // 40 %
    expect(qualityFromRatio(3.9, 10)).toBe(1); // darunter
  });

  it("zieht die Grenze knapp unter der Schwelle eine Stufe tiefer", () => {
    expect(qualityFromRatio(8.999, 10)).toBe(4); // 89,99 % → 4
    expect(qualityFromRatio(7.499, 10)).toBe(3);
    expect(qualityFromRatio(5.999, 10)).toBe(2);
    expect(qualityFromRatio(3.999, 10)).toBe(1);
  });

  it("verarbeitet gebrochene correct-Werte (recall/mix)", () => {
    expect(qualityFromRatio(4.5, 5)).toBe(5); // 90 %
    expect(qualityFromRatio(3.5, 5)).toBe(3); // 70 %
    expect(qualityFromRatio(0, 5)).toBe(1);
    expect(qualityFromRatio(5, 5)).toBe(5);
  });

  it("klemmt defensiv (total ≤ 0, negative, über 100 %)", () => {
    expect(qualityFromRatio(1, 0)).toBe(1);
    expect(qualityFromRatio(0, -3)).toBe(1);
    expect(qualityFromRatio(-2, 5)).toBe(1);
    expect(qualityFromRatio(12, 5)).toBe(5);
  });
});

describe("parseNumericInput", () => {
  it("akzeptiert Komma und Punkt als Dezimaltrenner", () => {
    expect(parseNumericInput("1,5")).toBe(1.5);
    expect(parseNumericInput("1.5")).toBe(1.5);
    expect(parseNumericInput("3,25")).toBe(3.25);
    expect(parseNumericInput("0,5")).toBe(0.5);
  });

  it("ignoriert Tausenderpunkte und Leerzeichen", () => {
    expect(parseNumericInput("1.500")).toBe(1500);
    expect(parseNumericInput("2 048")).toBe(2048);
    expect(parseNumericInput("1.234.567")).toBe(1234567);
    expect(parseNumericInput("12.000,5")).toBe(12000.5);
    expect(parseNumericInput("1.234,56")).toBe(1234.56);
  });

  it("behandelt ganze Zahlen unverändert", () => {
    expect(parseNumericInput("2046")).toBe(2046);
    expect(parseNumericInput("-128")).toBe(-128);
    expect(parseNumericInput("+5")).toBe(5);
  });

  it("lehnt Einheiten, Buchstaben und leere Eingaben ab", () => {
    expect(parseNumericInput("2046 Hosts")).toBeNull();
    expect(parseNumericInput("€ 500")).toBeNull();
    expect(parseNumericInput("abc")).toBeNull();
    expect(parseNumericInput("")).toBeNull();
    expect(parseNumericInput("   ")).toBeNull();
  });

  it("ignoriert geschützte und schmale Leerzeichen", () => {
    expect(parseNumericInput("2\u00a0048")).toBe(2048);
    expect(parseNumericInput("1\u202f500")).toBe(1500);
  });
});

describe("normalizeStringAnswer", () => {
  it("behält führende Nullen in Bitmustern bei", () => {
    expect(normalizeStringAnswer("0011")).toBe("0011");
    expect(normalizeStringAnswer("0011")).not.toBe(normalizeStringAnswer("11"));
    expect(normalizeStringAnswer("00001100")).toBe("00001100");
  });

  it("entfernt Whitespace und ignoriert Groß-/Kleinschreibung bei Hex", () => {
    expect(normalizeStringAnswer(" 119.155.144.0 ")).toBe("119.155.144.0");
    expect(normalizeStringAnswer("c0b00000")).toBe("C0B00000".toLowerCase());
    expect(normalizeStringAnswer("0011 0100")).toBe("00110100");
  });

  it("akzeptiert ein optionales 0x-Präfix bei Hex", () => {
    expect(normalizeStringAnswer("0x1A")).toBe(normalizeStringAnswer("1A"));
    expect(normalizeStringAnswer("0XE4")).toBe(normalizeStringAnswer("e4"));
  });
});

describe("checkNumericAnswer", () => {
  it("vergleicht Zahlen mit Normalisierung", () => {
    expect(checkNumericAnswer("2046", 2046)).toBe(true);
    expect(checkNumericAnswer("2.046", 2046)).toBe(true);
    expect(checkNumericAnswer("2046", 2047)).toBe(false);
    expect(checkNumericAnswer("2046 Hosts", 2046)).toBe(false);
  });

  it("wendet die Toleranz nur bei number-Answers an", () => {
    expect(checkNumericAnswer("1024", 1024, 1)).toBe(true);
    expect(checkNumericAnswer("1025", 1024, 1)).toBe(true);
    expect(checkNumericAnswer("1026", 1024, 1)).toBe(false);
    expect(checkNumericAnswer("1025", 1024)).toBe(false); // Default 0
  });

  it("vergleicht Dezimalzahlen über Komma-Eingaben", () => {
    expect(checkNumericAnswer("37,5", 37.5)).toBe(true);
    expect(checkNumericAnswer("37.5", 37.5)).toBe(true);
    expect(checkNumericAnswer("37,6", 37.5)).toBe(false);
  });

  it("vergleicht String-Antworten (IP, Bitmuster, Hex)", () => {
    expect(checkNumericAnswer("119.155.144.0", "119.155.144.0")).toBe(true);
    expect(checkNumericAnswer(" 119.155.144.0 ", "119.155.144.0")).toBe(true);
    expect(checkNumericAnswer("0011 0100", "00110100")).toBe(true);
    expect(checkNumericAnswer("11", "0011")).toBe(false); // führende Nullen zählen!
    expect(checkNumericAnswer("0xE4", "E4")).toBe(true);
  });
});

describe("scoreMatchPairs", () => {
  const pairs: MatchPair[] = [
    { left: "A", right: "1" },
    { left: "B", right: "2" },
    { left: "C", right: "3" },
    { left: "D", right: "4" },
    { left: "E", right: "5" },
  ];

  it("zählt richtig zugeordnete Paare anteilig", () => {
    expect(scoreMatchPairs({ A: "1", B: "2", C: "x", D: "y", E: "z" }, pairs)).toEqual({
      correct: 2,
      total: 5,
    });
    expect(scoreMatchPairs({ A: "1", B: "2", C: "3", D: "4", E: "5" }, pairs)).toEqual({
      correct: 5,
      total: 5,
    });
    expect(scoreMatchPairs({}, pairs)).toEqual({ correct: 0, total: 5 });
  });

  it("bewertet nicht zugeordnete Paare als falsch", () => {
    expect(scoreMatchPairs({ A: "1" }, pairs).correct).toBe(1);
    const partial: Record<string, string | null> = { A: "1", B: null, C: "3", D: null, E: null };
    expect(scoreMatchPairs(partial, pairs).correct).toBe(2);
  });
});

describe("sanitizeExercises", () => {
  it("verwirft unvollständige Einträge und doppelte IDs", () => {
    const input: Exercise[] = [
      { id: "a", type: "choice", difficulty: 1, prompt: "?", options: ["x", "y"], correctIndex: 0, explanation: "weil" },
      { id: "a", type: "choice", difficulty: 1, prompt: "doppelt", options: ["x", "y"], correctIndex: 0, explanation: "weil" },
      { id: "b", type: "choice", difficulty: 1, prompt: "?", options: ["x"], correctIndex: 0, explanation: "weil" },
      { id: "c", type: "choice", difficulty: 1, prompt: "?", options: ["x", "y"], correctIndex: 5, explanation: "weil" },
      { id: "d", type: "recall", difficulty: 1, prompt: "?", sampleAnswer: "", keyPoints: [] },
      { id: "e", type: "numeric", difficulty: 1, prompt: "?", answer: 4, explanation: "" },
      { id: "f", type: "match", difficulty: 1, prompt: "?", pairs: [{ left: "l", right: "r" }] },
      { id: "g", type: "numeric", difficulty: 1, prompt: "?", answer: 4, explanation: "ok" },
    ];
    const out = sanitizeExercises(input);
    expect(out.map((e) => e.id)).toEqual(["a", "g"]);
  });

  it("lässt gültige Aufgaben aller Typen durch", () => {
    const input: Exercise[] = [
      { id: "r", type: "recall", difficulty: 1, prompt: "p", sampleAnswer: "a", keyPoints: ["k"] },
      { id: "n", type: "numeric", difficulty: 1, prompt: "p", answer: "0011", explanation: "e" },
      { id: "c", type: "choice", difficulty: 1, prompt: "p", options: ["a", "b", "c"], correctIndex: 1, explanation: "e" },
      { id: "m", type: "match", difficulty: 1, prompt: "p", pairs: [{ left: "l1", right: "r1" }, { left: "l2", right: "r2" }] },
    ];
    expect(sanitizeExercises(input)).toHaveLength(4);
  });
});

describe("shuffle", () => {
  it("mischt deterministisch mit injiziertem rng und behält alle Elemente", () => {
    const rng = (() => {
      let i = 0;
      const seq = [0.9, 0.5, 0.1, 0.7];
      return () => seq[i++ % seq.length];
    })();
    const input = [1, 2, 3, 4];
    const a = shuffle(input, rng);
    expect([...a].sort((x, y) => x - y)).toEqual([1, 2, 3, 4]);
    expect(a).not.toEqual(input);
  });
});
