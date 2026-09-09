// Konvertierung der Legacy-Mathe-Aufgaben (lib/mathExercises.ts) ins
// Topic-JSON-Schema (content/exercises/<topicSlug>.json) — reine Funktionen.
//
// Mapping-Regeln:
//   - multiple mit 3–6 Optionen → choice (Distraktoren sind vorhanden)
//   - multiple mit 2 Optionen (Ja/Nein) → recall (Registry-Guard verlangt
//     mind. 3 Optionen für choice; Selbstvergleich ist hier ohnehin ehrlicher)
//   - input mit rein numerischer Antwort ("12", "-3.5") → numeric (number)
//   - alles andere → recall. Bewusst KEIN numeric-Stringvergleich für Brüche
//     wie "3/4": der exakte Vergleich würde eine mathematisch richtige,
//     als Dezimalzahl geschriebene Antwort ("0.75") als falsch werten —
//     im Zweifel recall statt zu strengem numeric-Vergleich.
//
// IDs: "<slug>-ex-NN" fortlaufend (Muster der AP1-Übernahme).
//
// Tests: tests/convertMath.test.ts.

import type { Exercise } from "./types";

/** Struktur der Legacy-Aufgaben aus lib/mathExercises.ts (nur benötigte Felder). */
export interface LegacyMathExercise {
  id: string;
  difficulty: 1 | 2 | 3;
  type: "input" | "multiple";
  question: string;
  hint?: string;
  expectedAnswer?: string;
  tolerance?: number;
  options?: { label: string; value: string }[];
  correctOption?: string;
  solution: string;
}

const NUMBER_RE = /^-?\d+(?:\.\d+)?$/;

/** Lösungstext mit optionalem Tipp — Muster der AP1-Übernahme. */
function explanationWithHint(solution: string, hint?: string): string {
  return solution + (hint ? `\nTipp: ${hint}` : "");
}

/**
 * keyPoints für recall: hint falls vorhanden, sonst die (kurze) erwartete
 * Antwort, sonst grob aus der Lösung. Niemals leer (Registry-Guard).
 */
function buildKeyPoints(ex: LegacyMathExercise): string[] {
  const points: string[] = [];
  const hint = ex.hint?.trim();
  if (hint) points.push(hint);
  const expected = ex.expectedAnswer?.trim();
  if (expected && !points.includes(expected)) points.push(expected);
  if (points.length === 0) {
    const firstSentence = ex.solution.split(/[.!?]\s/, 1)[0]?.trim();
    if (firstSentence) {
      points.push(firstSentence.length > 120 ? `${firstSentence.slice(0, 117)}…` : firstSentence);
    }
  }
  return points;
}

/** Eine Legacy-Aufgabe ins Topic-JSON-Schema konvertieren. */
export function convertMathExercise(
  ex: LegacyMathExercise,
  slug: string,
  index: number
): Exercise {
  const id = `${slug}-ex-${String(index + 1).padStart(2, "0")}`;

  if (ex.type === "multiple") {
    const optionCount = ex.options?.length ?? 0;
    if (optionCount >= 3 && optionCount <= 6 && ex.correctOption && ex.options) {
      const correctIndex = ex.options.findIndex((o) => o.value === ex.correctOption);
      if (correctIndex === -1) {
        throw new Error(`Aufgabe ${ex.id}: correctOption "${ex.correctOption}" nicht in options.`);
      }
      return {
        id,
        type: "choice",
        difficulty: ex.difficulty,
        prompt: ex.question,
        options: ex.options.map((o) => o.label),
        correctIndex,
        explanation: explanationWithHint(ex.solution, ex.hint),
      };
    }
    const correctLabel = ex.options?.find((o) => o.value === ex.correctOption)?.label;
    const keyPoints = [
      ...(correctLabel ? [correctLabel] : []),
      ...(ex.hint ? [ex.hint] : []),
    ];
    return {
      id,
      type: "recall",
      difficulty: ex.difficulty,
      prompt: ex.question,
      sampleAnswer: ex.solution,
      keyPoints: keyPoints.length > 0 ? keyPoints : buildKeyPoints(ex),
    };
  }

  const expected = (ex.expectedAnswer ?? "").trim();
  if (NUMBER_RE.test(expected)) {
    return {
      id,
      type: "numeric",
      difficulty: ex.difficulty,
      prompt: ex.question,
      answer: Number(expected),
      ...(ex.tolerance !== undefined ? { tolerance: ex.tolerance } : {}),
      explanation: explanationWithHint(ex.solution, ex.hint),
    };
  }

  return {
    id,
    type: "recall",
    difficulty: ex.difficulty,
    prompt: ex.question,
    sampleAnswer: ex.solution,
    keyPoints: buildKeyPoints(ex),
  };
}
