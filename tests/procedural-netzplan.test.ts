// Netzplantechnik: Vorwärts-/Rückwärtsrechnung unabhängig aus der
// Vorgangsliste im Prompt nachrechnen (eigene Graph-Logik, kein Generator-Code).

import { describe, expect, it } from "vitest";
import { generateNetzplanExercises } from "@/lib/exercises/procedural";
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

interface Node {
  duration: number;
  preds: number[];
}

function parseNetwork(prompt: string): Node[] {
  const lines = prompt.split("\n").filter((l) => /^V\d+:/.test(l));
  const nodes: Node[] = lines.map((line) => {
    const m = line.match(/^V(\d+): (\d+) Tage \(Vorgänger: (.+)\)$/)!;
    const predText = m[3];
    const preds =
      predText === "–"
        ? []
        : predText.split(", ").map((p) => Number(p.replace("V", "")) - 1);
    return { duration: Number(m[2]), preds };
  });
  return nodes;
}

function forwardBackward(nodes: Node[]): {
  duration: number;
  buffers: number[];
  critical: string[];
} {
  const n = nodes.length;
  const es = new Array<number>(n).fill(0);
  const ef = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++) {
    es[i] = nodes[i].preds.length === 0 ? 0 : Math.max(...nodes[i].preds.map((p) => ef[p]));
    ef[i] = es[i] + nodes[i].duration;
  }
  const duration = ef[n - 1];
  const ls = new Array<number>(n).fill(0);
  const lf = new Array<number>(n).fill(0);
  lf[n - 1] = duration;
  ls[n - 1] = duration - nodes[n - 1].duration;
  for (let i = n - 2; i >= 0; i--) {
    const succs = nodes.flatMap((node, j) => (node.preds.includes(i) ? [j] : []));
    lf[i] = Math.min(...succs.map((s) => ls[s]));
    ls[i] = lf[i] - nodes[i].duration;
  }
  const buffers = nodes.map((_, i) => ls[i] - es[i]);
  const critical = nodes
    .map((_, i) => (buffers[i] === 0 ? `V${i + 1}` : null))
    .filter((v): v is string => v !== null);
  return { duration, buffers, critical };
}

describe("procedural: Netzplan", () => {
  for (let seed = 0; seed < 100; seed++) {
    it(`seed ${seed}`, () => {
      const ex = generateNetzplanExercises(seed);
      expect(ex.length).toBe(4);
      const n1 = numeric(ex[0]);
      const n2 = numeric(ex[1]);
      const r4 = recall(ex[3]);

      const net = parseNetwork(n1.prompt);
      expect(net.length).toBeGreaterThanOrEqual(5);
      const ref = forwardBackward(net);

      // g1: Projektdauer
      expect(n1.answer).toBe(ref.duration);

      // g2: Puffer des angegebenen Vorgangs
      const m2 = n2.prompt.match(/Gesamtpuffer des Vorgangs (V\d+)\?/)!;
      const targetIdx = Number(m2[1].replace("V", "")) - 1;
      expect(n2.answer).toBe(ref.buffers[targetIdx]);

      // g3: kritische Wahl (choice) oder größter Puffer (numeric-Fallback)
      const g3 = ex[2];
      if (g3.type === "choice") {
        const c3 = choice(g3);
        expect(ref.critical).toContain(c3.options[c3.correctIndex]);
        c3.options.forEach((opt, i) => {
          if (i === c3.correctIndex) {
            expect(ref.buffers[Number(opt.replace("V", "")) - 1]).toBe(0);
          } else {
            expect(ref.buffers[Number(opt.replace("V", "")) - 1]).toBeGreaterThan(0);
          }
        });
      } else {
        expect(numeric(g3).answer).toBe(Math.max(...ref.buffers));
      }

      // g4: recall — kritischer Pfad in der Musterlösung muss zum Netz passen
      const pathInAnswer = r4.sampleAnswer.match(/Kritischer Pfad: (V\d+(?: → V\d+)*)/)![1]
        .split(" → ")
        .map((v) => Number(v.replace("V", "")) - 1);
      for (const idx of pathInAnswer) {
        expect(ref.buffers[idx]).toBe(0);
      }
      // Pfad muss an der Quelle beginnen, an der Senke enden und entlang
      // echter Kanten laufen
      expect(pathInAnswer[0]).toBe(0);
      expect(pathInAnswer[pathInAnswer.length - 1]).toBe(net.length - 1);
      for (let i = 1; i < pathInAnswer.length; i++) {
        expect(net[pathInAnswer[i]].preds).toContain(pathInAnswer[i - 1]);
      }
      // Summe der Dauern = Projektdauer
      const pathDuration = pathInAnswer.reduce((s, idx) => s + net[idx].duration, 0);
      expect(pathDuration).toBe(ref.duration);
      const durationInAnswer = r4.sampleAnswer.match(/Gesamtdauer von (\d+) Tagen/)!;
      expect(Number(durationInAnswer[1])).toBe(ref.duration);
    });
  }
});
