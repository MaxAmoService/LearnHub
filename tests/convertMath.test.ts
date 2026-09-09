// Tests für die Mathe-Konvertierung (lib/exercises/convertMath.ts).

import { describe, expect, it } from "vitest";
import { convertMathExercise } from "@/lib/exercises/convertMath";
import type { LegacyMathExercise } from "@/lib/exercises/convertMath";

function base(overrides: Partial<LegacyMathExercise>): LegacyMathExercise {
  return {
    id: "t-1",
    difficulty: 1,
    type: "input",
    question: "Frage?",
    solution: "Rechenweg.",
    ...overrides,
  };
}

describe("convertMathExercise", () => {
  it("konvertiert multiple mit 3–6 Optionen nach choice", () => {
    const ex = convertMathExercise(
      base({
        type: "multiple",
        question: "Welche?",
        options: [
          { label: "a", value: "a" },
          { label: "b", value: "b" },
          { label: "c", value: "c" },
        ],
        correctOption: "b",
        solution: "Weil b.",
      }),
      "mathe1-test",
      0
    );
    expect(ex).toEqual({
      id: "mathe1-test-ex-01",
      type: "choice",
      difficulty: 1,
      prompt: "Welche?",
      options: ["a", "b", "c"],
      correctIndex: 1,
      explanation: "Weil b.",
    });
  });

  it("konvertiert multiple mit 2 Optionen nach recall", () => {
    const ex = convertMathExercise(
      base({
        type: "multiple",
        options: [
          { label: "Ja", value: "ja" },
          { label: "Nein", value: "nein" },
        ],
        correctOption: "ja",
        solution: "Ja, weil ...",
      }),
      "mathe1-test",
      1
    );
    expect(ex.type).toBe("recall");
    if (ex.type !== "recall") throw new Error("unreachable");
    expect(ex.sampleAnswer).toBe("Ja, weil ...");
    expect(ex.keyPoints).toContain("Ja");
  });

  it("konvertiert kurze Zahl nach numeric mit number-Answer", () => {
    const ex = convertMathExercise(
      base({ expectedAnswer: "12", solution: "3·4=12.", tolerance: 0.5 }),
      "mathe1-test",
      2
    );
    expect(ex).toMatchObject({
      id: "mathe1-test-ex-03",
      type: "numeric",
      answer: 12,
      tolerance: 0.5,
      explanation: "3·4=12.",
    });
  });

  it("konvertiert Dezimalzahlen nach numeric", () => {
    const ex = convertMathExercise(
      base({ expectedAnswer: "-3.5", solution: "x = -3,5." }),
      "mathe1-test",
      3
    );
    expect(ex).toMatchObject({ type: "numeric", answer: -3.5 });
  });

  it("konvertiert Bruch-Antworten nach recall (kein zu strenger Stringvergleich)", () => {
    const ex = convertMathExercise(
      base({ expectedAnswer: "3/4", solution: "0,75 als Bruch: 3/4." }),
      "mathe1-test",
      4
    );
    expect(ex.type).toBe("recall");
    if (ex.type !== "recall") throw new Error("unreachable");
    expect(ex.sampleAnswer).toBe("0,75 als Bruch: 3/4.");
    expect(ex.keyPoints).toContain("3/4");
  });

  it("konvertiert komplexe Ausdrücke nach recall", () => {
    const ex = convertMathExercise(
      base({
        expectedAnswer: "6-2i",
        solution: "Reelle Teile addieren: 6-2i.",
        hint: "Reelle und imaginäre Teile getrennt addieren.",
      }),
      "mathe1-test",
      5
    );
    expect(ex.type).toBe("recall");
    if (ex.type !== "recall") throw new Error("unreachable");
    expect(ex.keyPoints).toContain("Reelle und imaginäre Teile getrennt addieren.");
  });

  it("erzeugt nie leere keyPoints für recall", () => {
    const ex = convertMathExercise(
      base({ expectedAnswer: undefined, hint: undefined, solution: "Kurze Lösung ohne Punkt" }),
      "mathe1-test",
      6
    );
    expect(ex.type).toBe("recall");
    if (ex.type !== "recall") throw new Error("unreachable");
    expect(ex.keyPoints.length).toBeGreaterThan(0);
    expect(ex.keyPoints[0]).toBe("Kurze Lösung ohne Punkt");
  });
});
