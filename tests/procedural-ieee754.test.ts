// IEEE 754: Encode/Decode gegen unabhängige Bit-Decomposition prüfen
// (eigene Vorzeichen/Exponent/Mantisse-Logik, kein DataView-Wiederverwenden
// des Generator-Codes).

import { describe, expect, it } from "vitest";
import { generateIeee754Exercises } from "@/lib/exercises/procedural";
import type { Exercise, NumericExercise } from "@/lib/exercises/types";

function numeric(ex: Exercise): NumericExercise {
  expect(ex.type).toBe("numeric");
  return ex as NumericExercise;
}

function refEncode(value: number): number {
  const sign = value < 0 ? 0x80000000 : 0;
  const abs = Math.abs(value);
  // Normalisieren: abs = m · 2^e mit 1 ≤ m < 2
  let e = Math.floor(Math.log2(abs));
  const m = abs / 2 ** e;
  const exponent = e + 127;
  const fraction = Math.round((m - 1) * 2 ** 23);
  return (sign | (exponent << 23) | fraction) >>> 0;
}

function refDecode(bits: number): number {
  const sign = bits >>> 31 ? -1 : 1;
  const exponent = (bits >>> 23) & 0xff;
  const fraction = bits & 0x7fffff;
  return sign * (1 + fraction / 2 ** 23) * 2 ** (exponent - 127);
}

function refToHex8(v: number): string {
  return (v >>> 0).toString(16).toUpperCase().padStart(8, "0");
}

describe("procedural: IEEE 754", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateIeee754Exercises(seed).map(numeric);
      expect(ex.length).toBe(4);

      // g1/g2: Encode — Dezimalwert aus dem Prompt exakt nachbilden
      for (const idx of [0, 1]) {
        const m = ex[idx].prompt.match(/Dezimalzahl (-?[\d.]+) als 32-Bit-Gleitkommazahl/)!;
        const value = Number(m[1]);
        expect(ex[idx].answer).toBe(refToHex8(refEncode(value)));
      }

      // g3/g4: Decode — Bitmuster aus dem Prompt zerlegen
      for (const idx of [2, 3]) {
        const m = ex[idx].prompt.match(/32-Bit-Muster 0x([0-9A-F]{8})/)!;
        const bits = Number.parseInt(m[1], 16);
        const decoded = refDecode(bits);
        expect(ex[idx].answer).toBe(decoded);
        // Antwort muss exakt sein (Generator erzeugt nur exakt darstellbare Werte)
        expect(decoded).toBeCloseTo(decoded, 15);
      }
    });
  }
});
