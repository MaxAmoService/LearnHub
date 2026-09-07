// Fehlererkennung (Parität, Prüfsumme) und Codes (Gray, Hamming) — Lösung
// gegen unabhängige Bit-Logik prüfen.

import { describe, expect, it } from "vitest";
import {
  generateFehlererkennungExercises,
  generateCodesExercises,
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

function recall(ex: Exercise): RecallExercise {
  expect(ex.type).toBe("recall");
  return ex as RecallExercise;
}

function choice(ex: Exercise): ChoiceExercise {
  expect(ex.type).toBe("choice");
  return ex as ChoiceExercise;
}

function refPopcount(bits: number): number {
  return (bits >>> 0).toString(2).split("1").length - 1;
}

function refGrayEncode(bin: number): number {
  return (bin ^ (bin >> 1)) & 0xff;
}

function refGrayDecode(gray: number): number {
  let b = gray;
  for (let shift = 1; shift < 8; shift *= 2) b ^= gray >> shift;
  return b & 0xff;
}

describe("procedural: Fehlererkennung", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateFehlererkennungExercises(seed);
      expect(ex.length).toBe(4);
      const n1 = numeric(ex[0]);
      const n2 = numeric(ex[1]);
      const r3 = recall(ex[2]);
      const n4 = numeric(ex[3]);


      const m1 = n1.prompt.match(/gerade Parität\) für das 7-Bit-Datenwort ([01]{7})/)!;
      const ones1 = refPopcount(Number.parseInt(m1[1], 2));
      expect(n1.answer).toBe(ones1 % 2);

      const m2 = n2.prompt.match(/ungerade Parität\) für das 7-Bit-Datenwort ([01]{7})/)!;
      const ones2 = refPopcount(Number.parseInt(m2[1], 2));
      expect(n2.answer).toBe(1 - (ones2 % 2));

      // g3 recall: Aussage „Fehler erkannt" muss zur Parität passen
      const m3 = r3.prompt.match(/prüft das Byte ([01]{8}) mit gerader Parität/)!;
      const errorDetected = refPopcount(Number.parseInt(m3[1], 2)) % 2 !== 0;
      
      if (errorDetected) {
        expect(r3.sampleAnswer.startsWith("Ja.")).toBe(true);
      } else {
        expect(r3.sampleAnswer.startsWith("Nein.")).toBe(true);
      }

      const m4 = n4.prompt.match(/Datenbytes (0x[0-9A-F]{2}), (0x[0-9A-F]{2}), (0x[0-9A-F]{2}), (0x[0-9A-F]{2})/)!;
      const bytes = m4.slice(1).map((h) => Number.parseInt(h, 16));
      expect(n4.answer).toBe(bytes.reduce((a, b) => a + b, 0) % 256);
    });
  }
});

describe("procedural: Codes (Gray, Hamming)", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateCodesExercises(seed);
      expect(ex.length).toBe(4);
      const n1 = numeric(ex[0]);
      const n2 = numeric(ex[1]);
      const n3 = numeric(ex[2]);
      const c4 = choice(ex[3]);

      const m1 = n1.prompt.match(/Binärzahl ([01]{8}) in einen Gray-Code/)!;
      expect(n1.answer).toBe(refGrayEncode(Number.parseInt(m1[1], 2)).toString(2).padStart(8, "0"));

      const m2 = n2.prompt.match(/Gray-Code ([01]{8}) zurück in eine Binärzahl/)!;
      expect(n2.answer).toBe(refGrayDecode(Number.parseInt(m2[1], 2)).toString(2).padStart(8, "0"));

      const m3 = n3.prompt.match(/Hamming-Abstand zwischen ([01]{8}) und ([01]{8})/)!;
      const xor = Number.parseInt(m3[1], 2) ^ Number.parseInt(m3[2], 2);
      expect(n3.answer).toBe(refPopcount(xor));

      // g4: statische MC — richtige Antwort ist Option 0
      expect(c4.correctIndex).toBe(0);
      expect(c4.options[0]).toContain("nur ein Bit");
    });
  }
});
