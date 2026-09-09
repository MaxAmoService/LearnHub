// Tests für die Mathe-Konvertierung (lib/exercises/convertMath.ts).

import { describe, expect, it } from "vitest";
import { convertMathExercise, convertModuleExercise } from "@/lib/exercises/convertMath";
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

// ─── Modul-Variante (convertModuleExercise) ─────────────────────────────────

describe("convertModuleExercise", () => {
  it("mappt multiple → choice auch mit 2 Optionen", () => {
    const ex = convertModuleExercise(
      {
        id: "q-1",
        difficulty: 2,
        type: "multiple",
        question: "Ja oder Nein?",
        options: [
          { label: "Ja", value: "a" },
          { label: "Nein", value: "b" },
        ],
        correctOption: "b",
        solution: "Weil Nein.",
      },
      "m-test",
      0
    );
    expect(ex.type).toBe("choice");
    if (ex.type !== "choice") throw new Error("unreachable");
    expect(ex.options).toEqual(["Ja", "Nein"]);
    expect(ex.correctIndex).toBe(1);
    expect(ex.explanation).toBe("Weil Nein.");
  });

  it("mappt numerische input → numeric number mit acceptedAnswers + tolerance", () => {
    const ex = convertModuleExercise(
      {
        id: "q-2",
        difficulty: 2,
        type: "input",
        question: "x²-2x-8=0, kleinere Lösung?",
        expectedAnswer: "-2",
        acceptedAnswers: ["4"],
        tolerance: 0.01,
        hint: "Faktorisieren.",
        format: "Ganze Zahl",
        solution: "(x-4)(x+2)=0.",
      },
      "m-test",
      1
    );
    expect(ex.type).toBe("numeric");
    if (ex.type !== "numeric") throw new Error("unreachable");
    expect(ex.answer).toBe(-2);
    expect(ex.acceptedAnswers).toEqual(["4"]);
    expect(ex.tolerance).toBe(0.01);
    expect(ex.hint).toBe("Faktorisieren.");
    expect(ex.format).toBe("Ganze Zahl");
    expect(ex.explanation).toBe("(x-4)(x+2)=0.");
  });

  it("mappt nicht-numerische input → numeric mit String-Antwort (exakter Vergleich wie bisher)", () => {
    const ex = convertModuleExercise(
      {
        id: "q-3",
        difficulty: 1,
        type: "input",
        question: "Bruch?",
        expectedAnswer: "3/4",
        solution: "Gekürzt.",
      },
      "m-test",
      2
    );
    expect(ex.type).toBe("numeric");
    if (ex.type !== "numeric") throw new Error("unreachable");
    expect(ex.answer).toBe("3/4");
  });

  it("wirft bei input ohne expectedAnswer", () => {
    expect(() =>
      convertModuleExercise(
        { id: "q-4", difficulty: 1, type: "input", question: "?", solution: "x." },
        "m-test",
        3
      )
    ).toThrow(/ohne expectedAnswer/);
  });

  it("vergibt fortlaufende IDs pro Modul", () => {
    const a = convertModuleExercise(
      { id: "q-5", difficulty: 1, type: "input", question: "?", expectedAnswer: "1", solution: "x." },
      "m-test",
      7
    );
    expect(a.id).toBe("m-test-ex-08");
  });
});
