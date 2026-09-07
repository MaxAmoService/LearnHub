// Subnetting-Generator: 100 zufällige Seeds, Lösung gegen eine UNABHÄNGIGE
// Neuberechnung prüfen (eigene IP-/Bitmasken-Logik, kein Generator-Code).

import { describe, expect, it } from "vitest";
import { generateSubnettingExercises } from "@/lib/exercises/procedural";
import type { ChoiceExercise, Exercise, NumericExercise } from "@/lib/exercises/types";

function numeric(ex: Exercise): NumericExercise {
  expect(ex.type).toBe("numeric");
  return ex as NumericExercise;
}

function choice(ex: Exercise): ChoiceExercise {
  expect(ex.type).toBe("choice");
  return ex as ChoiceExercise;
}

// ─── Unabhängige Referenzimplementierung ────────────────────────────────────

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, p) => ((acc << 8) | Number(p)) >>> 0, 0) >>> 0;
}

function intToIp(v: number): string {
  return [24, 16, 8, 0].map((s) => (v >>> s) & 0xff).join(".");
}

function prefixToMask(prefix: number): number {
  return (~0 << (32 - prefix)) >>> 0;
}

function computeHosts(prefix: number): number {
  return 2 ** (32 - prefix) - 2;
}

function smallestPrefixFor(hosts: number): number {
  let h = 1;
  while (2 ** h - 2 < hosts) h += 1;
  return 32 - h;
}

describe("procedural: Subnetting", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}: alle Lösungen stimmen (unabhängig nachgerechnet)`, () => {
      const exercises = generateSubnettingExercises(seed);
      expect(exercises.length).toBe(5);

      // g1: Host-Anzahl
      const g1 = numeric(exercises[0]);
      const m1 = g1.prompt.match(/Subnetz ([\d.]+)\/(\d+) \(Subnetzmaske ([\d.]+)\)/);
      expect(m1).not.toBeNull();
      const net1 = m1![1];
      const prefix1 = Number(m1![2]);
      const mask1 = m1![3];
      expect(prefixToMask(prefix1)).toBe(ipToInt(mask1));
      expect(g1.answer).toBe(computeHosts(prefix1));
      expect(g1.calculation).toBe(`2^${32 - prefix1} - 2`);

      // g2: Netzwerkadresse = IP AND Maske
      const g2 = numeric(exercises[1]);
      const m2 = g2.prompt.match(/Netzwerkadresse des Hosts ([\d.]+) mit Subnetzmaske ([\d.]+)/);
      expect(m2).not.toBeNull();
      const ip2 = ipToInt(m2![1]);
      const mask2 = ipToInt(m2![2]);
      expect(g2.answer).toBe(intToIp((ip2 & mask2) >>> 0));
      expect(intToIp((ip2 & mask2) >>> 0)).toBe(net1);

      // g3: Broadcast = Netz OR ~Maske
      const g3 = numeric(exercises[2]);
      const m3 = g3.prompt.match(/Subnetzes ([\d.]+)\/(\d+)/);
      expect(m3).not.toBeNull();
      const net3 = ipToInt(m3![1]);
      const prefix3 = Number(m3![2]);
      expect(g3.answer).toBe(intToIp((net3 | ~prefixToMask(prefix3)) >>> 0));

      // g4: Hosts → Präfixlänge
      const g4 = numeric(exercises[3]);
      const m4 = g4.prompt.match(/für (\d+) Hosts/);
      expect(m4).not.toBeNull();
      expect(g4.answer).toBe(smallestPrefixFor(Number(m4![1])));

      // g5: Choice — genau eine Option im Subnetzbereich
      const g5 = choice(exercises[4]);
      const m5 = g5.prompt.match(/im Subnetz ([\d.]+)\/(\d+)/);
      expect(m5).not.toBeNull();
      const net5 = ipToInt(m5![1]);
      const prefix5 = Number(m5![2]);
      const mask5 = prefixToMask(prefix5);
      const lo = net5;
      const hi = (net5 | ~mask5) >>> 0;
      const inRange = g5.options.map((o) => {
        const v = ipToInt(o);
        return v >= lo && v <= hi;
      });
      expect(inRange.filter(Boolean).length).toBe(1);
      expect(inRange[g5.correctIndex]).toBe(true);
    });
  }
});
