// Skill-Tree-Graph-Layout — reine, deterministische Funktionen.

import { describe, expect, it } from "vitest";
import { computeGraphPositions } from "@/lib/skillTreeLayout";
import type { SkillTreeNode } from "@/lib/skillTree";

const nodes: SkillTreeNode[] = [
  { id: "a", label: "A", icon: "x", category: "mathe", col: 0, row: 0, prerequisites: [] },
  { id: "b", label: "B", icon: "x", category: "mathe", col: 1, row: 0, prerequisites: [] },
  { id: "c", label: "C", icon: "x", category: "mathe", col: 0, row: 1, prerequisites: ["a"] },
  { id: "d", label: "D", icon: "x", category: "mathe", col: 1, row: 1, prerequisites: ["a", "b"] },
  { id: "e", label: "E", icon: "x", category: "mathe", col: 0, row: 2, prerequisites: ["c", "d"] },
];

describe("computeGraphPositions", () => {
  it("liefert für jeden Knoten eine Position", () => {
    const pos = computeGraphPositions(nodes);
    expect(pos.size).toBe(nodes.length);
    for (const n of nodes) expect(pos.has(n.id)).toBe(true);
  });

  it("ist deterministisch (gleicher Seed, gleiche Positionen)", () => {
    const p1 = computeGraphPositions(nodes, { seed: 7 });
    const p2 = computeGraphPositions(nodes, { seed: 7 });
    for (const n of nodes) {
      expect(p1.get(n.id)).toEqual(p2.get(n.id));
    }
  });

  it("koppelt die y-Position exakt an die Etage (row * rowHeight, gespiegelt)", () => {
    const pos = computeGraphPositions(nodes, { rowHeight: 110 });
    // maxRow = 2 → Grundlagen (row 0) unten, Fortgeschritten (row 2) oben
    expect(pos.get("a")?.y).toBe(220);
    expect(pos.get("c")?.y).toBe(110);
    expect(pos.get("e")?.y).toBe(0);
  });

  it("hält gleiche Etagen x-seitig getrennt (kein Überlappen)", () => {
    const pos = computeGraphPositions(nodes, { seed: 3, nodeWidth: 200, minGapX: 40 });
    const pairs: [string, string][] = [["a", "b"], ["c", "d"]];
    for (const [x, y] of pairs) {
      const px = pos.get(x)!.x;
      const py = pos.get(y)!.x;
      expect(Math.abs(px - py)).toBeGreaterThanOrEqual(240);
    }
  });

  it("handhabt leere Eingaben", () => {
    expect(computeGraphPositions([]).size).toBe(0);
  });
});
