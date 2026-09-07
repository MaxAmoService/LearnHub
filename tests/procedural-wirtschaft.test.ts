// Wirtschaft: Amortisation/ROI und Nutzwertanalyse — Lösungen gegen
// unabhängige Neuberechnung aus den Prompt-Parametern prüfen.

import { describe, expect, it } from "vitest";
import {
  generateAmortisationExercises,
  generateNutzwertanalyseExercises,
} from "@/lib/exercises/procedural";
import type {
  ChoiceExercise,
  Exercise,
  NumericExercise,
  RecallExercise,
} from "@/lib/exercises/types";

function numeric(ex: Exercise): NumericExercise {
  expect(ex.type).toBe("numeric");
  return ex as NumericExercise;
}

function choice(ex: Exercise): ChoiceExercise {
  expect(ex.type).toBe("choice");
  return ex as ChoiceExercise;
}

function recall(ex: Exercise): RecallExercise {
  expect(ex.type).toBe("recall");
  return ex as RecallExercise;
}

describe("procedural: Amortisation & ROI", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateAmortisationExercises(seed).map(numeric);
      expect(ex.length).toBe(3);

      const m1 = ex[0].prompt.match(/investiert (\d+) € in neue Software\. Die jährliche Einsparung beträgt (\d+) €/)!;
      const invest = Number(m1[1]);
      const saving = Number(m1[2]);
      expect(ex[0].answer).toBe(Math.ceil(invest / saving));

      const m2 = ex[1].prompt.match(/Investition (\d+) €, jährliche Einsparung (\d+) €\. Wie hoch ist der kumulierte Gewinn nach (\d+) Jahren/)!;
      const invest2 = Number(m2[1]);
      const saving2 = Number(m2[2]);
      const horizon = Number(m2[3]);
      expect(ex[1].answer).toBe(horizon * saving2 - invest2);

      const m3 = ex[2].prompt.match(/Investition (\d+) €, jährliche Einsparung (\d+) €\. Berechnen Sie den ROI .* nach (\d+) Jahren/)!;
      const invest3 = Number(m3[1]);
      const saving3 = Number(m3[2]);
      const horizon3 = Number(m3[3]);
      const roi = Math.round(((horizon3 * saving3 - invest3) / invest3) * 1000) / 10;
      expect(ex[2].answer).toBe(roi);
    });
  }
});

describe("procedural: Nutzwertanalyse", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateNutzwertanalyseExercises(seed);
      expect(ex.length).toBe(4);
      const n1 = numeric(ex[0]);
      const c2 = choice(ex[1]);
      const n3 = numeric(ex[2]);
      const r4 = recall(ex[3]);

      // g1: gewichtete Summe des zweitplatzierten Angebots
      const m1 = n1.prompt.match(
        /Kriterien ([A-Za-zäöüÄÖÜ]+) \((\d+) %\), ([A-Za-zäöüÄÖÜ]+) \((\d+) %\), ([A-Za-zäöüÄÖÜ]+) \((\d+) %\), ([A-Za-zäöüÄÖÜ]+) \((\d+) %\)\.\n(Angebot [ABC]) erzielt die Bewertungen: ([A-Za-zäöüÄÖÜ]+) = (\d+), ([A-Za-zäöüÄÖÜ]+) = (\d+), ([A-Za-zäöüÄÖÜ]+) = (\d+), ([A-Za-zäöüÄÖÜ]+) = (\d+)/
      )!;
      const weights = [Number(m1[2]), Number(m1[4]), Number(m1[6]), Number(m1[8])];
      const scores = [Number(m1[11]), Number(m1[13]), Number(m1[15]), Number(m1[17])];
      const total = scores.reduce((s, v, i) => s + v * weights[i], 0);
      expect(n1.answer).toBe(total);

      // g2: beste Angebot = höchste Punktzahl aus dem Prompt
      const m2 = c2.prompt.match(/Angebot A (\d+) Punkte, Angebot B (\d+) Punkte, Angebot C (\d+) Punkte/)!;
      const totals = [Number(m2[1]), Number(m2[2]), Number(m2[3])];
      const bestIndex = totals.indexOf(Math.max(...totals));
      expect(c2.correctIndex).toBe(bestIndex);
      expect(c2.options[bestIndex]).toBe(`Angebot ${["A", "B", "C"][bestIndex]}`);

      // g3: Differenz Bestes − Zweitbestes
      const sorted = [...totals].sort((a, b) => b - a);
      expect(sorted[0]).not.toBe(sorted[1]);
      expect(n3.answer).toBe(sorted[0] - sorted[1]);

      // g4: recall
      expect(r4.keyPoints.length).toBeGreaterThan(0);
    });
  }
});
