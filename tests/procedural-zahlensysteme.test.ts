// Zahlensysteme: Umrechnung, Binärarithmetik, Zweierkomplement — Lösung je
// Seed gegen unabhängige Referenz (eigene Radix-/Komplement-Logik).

import { describe, expect, it } from "vitest";
import {
  generateUmrechnungExercises,
  generateBinaerArithmetikExercises,
  generateZweierkomplementExercises,
} from "@/lib/exercises/procedural";
import type { Exercise, NumericExercise } from "@/lib/exercises/types";

function numeric(ex: Exercise): NumericExercise {
  expect(ex.type).toBe("numeric");
  return ex as NumericExercise;
}

function refToBin8(v: number): string {
  return (v & 0xff).toString(2).padStart(8, "0");
}

function refToHex2(v: number): string {
  return v.toString(16).toUpperCase().padStart(2, "0");
}

function refToOct(v: number): string {
  return v.toString(8);
}

function refTwosComplement(value: number): string {
  return refToBin8(value & 0xff);
}

function refSigned8(bits: number): number {
  return bits < 128 ? bits : bits - 256;
}

describe("procedural: Umrechnung", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateUmrechnungExercises(seed).map(numeric);
      expect(ex.length).toBe(6);

      const g1 = ex[0];
      const d1 = Number(g1.prompt.match(/Dezimalzahl (\d+) in eine 8-Bit-Binärzahl/)![1]);
      expect(g1.answer).toBe(refToBin8(d1));

      const g2 = ex[1];
      const b2 = g2.prompt.match(/Binärzahl ([01]{8}) in eine Dezimalzahl/)![1];
      expect(g2.answer).toBe(Number.parseInt(b2, 2));

      const g3 = ex[2];
      const d3 = Number(g3.prompt.match(/Dezimalzahl (\d+) in eine zweistellige Hexadezimalzahl/)![1]);
      expect(g3.answer).toBe(refToHex2(d3));

      const g4 = ex[3];
      const h4 = g4.prompt.match(/Hexadezimalzahl 0x([0-9A-F]{2})/)![1];
      expect(g4.answer).toBe(Number.parseInt(h4, 16));

      const g5 = ex[4];
      const d5 = Number(g5.prompt.match(/Dezimalzahl (\d+) in eine Oktalzahl/)![1]);
      expect(g5.answer).toBe(refToOct(d5));

      const g6 = ex[5];
      const b6 = g6.prompt.match(/Binärzahl ([01]{8}) in eine Hexadezimalzahl/)![1];
      expect(g6.answer).toBe(refToHex2(Number.parseInt(b6, 2)));
    });
  }
});

describe("procedural: Binärarithmetik", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateBinaerArithmetikExercises(seed).map(numeric);
      expect(ex.length).toBe(4);

      const m1 = ex[0].prompt.match(/Addieren Sie binär \(8 Bit\): ([01]{8}) \+ ([01]{8})/)!;
      expect(ex[0].answer).toBe(refToBin8(Number.parseInt(m1[1], 2) + Number.parseInt(m1[2], 2)));

      const m2 = ex[1].prompt.match(/Subtrahieren Sie binär \(8 Bit\): ([01]{8}) − ([01]{8})/)!;
      expect(ex[1].answer).toBe(refToBin8(Number.parseInt(m2[1], 2) - Number.parseInt(m2[2], 2)));

      const m3 = ex[2].prompt.match(/Multiplizieren Sie binär \(Ergebnis 8 Bit\): ([01]{8}) × ([01]{8})/)!;
      expect(ex[2].answer).toBe(refToBin8(Number.parseInt(m3[1], 2) * Number.parseInt(m3[2], 2)));

      const m4 = ex[3].prompt.match(/Binärzahl ([01]{8}) um zwei Stellen nach links/)!;
      expect(ex[3].answer).toBe(refToBin8(Number.parseInt(m4[1], 2) << 2));
    });
  }
});

describe("procedural: Zweierkomplement", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateZweierkomplementExercises(seed).map(numeric);
      expect(ex.length).toBe(4);

      const m1 = ex[0].prompt.match(/Dezimalzahl (-?\d+) im Zweierkomplement mit 8 Bit/)!;
      expect(ex[0].answer).toBe(refTwosComplement(Number(m1[1])));

      const m2 = ex[1].prompt.match(/8-Bit-Zweierkomplement-Zahl ([01]{8}) dar/)!;
      expect(ex[1].answer).toBe(refSigned8(Number.parseInt(m2[1], 2)));

      const m3 = ex[2].prompt.match(/Zweierkomplement von (\d+) \(8 Bit\)/)!;
      expect(ex[2].answer).toBe(refTwosComplement(-Number(m3[1])));

      const m4 = ex[3].prompt.match(/Addieren Sie im Zweierkomplement \(8 Bit\): (-?\d+) \+ \((-?\d+)\)/)!;
      const sum = Number(m4[1]) + Number(m4[2]);
      expect(ex[3].answer).toBe(refToBin8(sum));
    });
  }
});
