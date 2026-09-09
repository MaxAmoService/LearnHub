// Skill-Tree-Graph-Layout — reine, deterministische Berechnung.
//
// Designentscheidung: Die y-Position ist fest an die Etage (row) gekoppelt —
// damit bleibt "Basics unten, komplex oben" exakt ablesbar (wie in der
// Etagen-Ansicht). Nur die x-Position wird mit einer 1D-Force-Simulation
// (Abstoßung zwischen Knoten, Federkraft entlang der Kanten) organisch
// verteilt — Obsidian-artig, aber ohne die Levels zu verwischen.

import type { SkillTreeNode } from "./skillTree";

export interface GraphPosition {
  x: number;
  y: number;
}

export interface GraphLayoutOptions {
  /** Fester Seed — gleiche Eingabe ergibt immer das gleiche Layout. */
  seed?: number;
  iterations?: number;
  rowHeight?: number;
  nodeWidth?: number;
  minGapX?: number;
  /** Feder-Ruhelänge in px. */
  springLength?: number;
}

/** Deterministischer PRNG (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Berechnet Positionen für die Graph-Ansicht.
 * y = row * rowHeight (Etage), x = Force-Simulation in 1D.
 */
export function computeGraphPositions(
  nodes: SkillTreeNode[],
  options: GraphLayoutOptions = {},
): Map<string, GraphPosition> {
  const {
    seed = 42,
    iterations = 150,
    rowHeight = 110,
    nodeWidth = 200,
    minGapX = 40,
    springLength = 170,
  } = options;

  const map = new Map<string, GraphPosition>();
  if (nodes.length === 0) return map;

  const rng = mulberry32(seed);
  const ids = nodes.map((n) => n.id);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const rowOf = (id: string) => byId.get(id)?.row ?? 0;
  const colOf = (id: string) => byId.get(id)?.col ?? 0;

  // Nachbarn (Voraussetzungen + Kinder)
  const neighbors = new Map<string, string[]>();
  for (const n of nodes) {
    const ns: string[] = [];
    for (const p of n.prerequisites) if (byId.has(p)) ns.push(p);
    neighbors.set(n.id, ns);
  }
  const children = new Map<string, string[]>();
  for (const n of nodes) {
    for (const p of n.prerequisites) {
      if (!byId.has(p)) continue;
      children.set(p, [...(children.get(p) ?? []), n.id]);
    }
  }

  // Initiale x-Positionen: Spalte + Jitter
  const xs = new Map<string, number>();
  for (const n of nodes) {
    xs.set(n.id, colOf(n.id) * (nodeWidth + minGapX) + (rng() - 0.5) * 60);
  }

  const maxRows = new Map<number, number>();
  for (const n of nodes) {
    maxRows.set(rowOf(n.id), Math.max(maxRows.get(rowOf(n.id)) ?? 0, colOf(n.id)));
  }

  for (let iter = 0; iter < iterations; iter++) {
    const forces = new Map<string, number>(ids.map((id) => [id, 0]));

    // Abstoßung: alle Paare, stärker bei gleicher Etage (Nachbarn im gleichen Band)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = (xs.get(b.id) ?? 0) - (xs.get(a.id) ?? 0);
        if (Math.abs(dx) > 2000) continue;
        const rowDiff = rowOf(a.id) - rowOf(b.id);
        const verticalSep = Math.abs(rowDiff) * rowHeight;
        const dist2 = dx * dx + verticalSep * verticalSep + 1;
        const sameRow = rowDiff === 0 ? 2.5 : 1;
        const f = (sameRow * 9000) / dist2;
        const sign = dx === 0 ? (rng() - 0.5 > 0 ? 1 : -1) : Math.sign(dx);
        forces.set(a.id, (forces.get(a.id) ?? 0) - f * sign);
        forces.set(b.id, (forces.get(b.id) ?? 0) + f * sign);
      }
    }

    // Federkraft entlang der Kanten (nur x-Komponente, schwächer bei Etagenabstand)
    const spring = 0.02;
    for (const n of nodes) {
      for (const nb of [...(neighbors.get(n.id) ?? []), ...(children.get(n.id) ?? [])]) {
        const dx = (xs.get(nb) ?? 0) - (xs.get(n.id) ?? 0);
        const rowDiff = Math.abs(rowOf(n.id) - rowOf(nb));
        // Diagonale Federn ziehen weniger stark in x
        const w = rowDiff === 0 ? 1 : 0.35;
        const target = (colOf(nb) - colOf(n.id)) * (nodeWidth + minGapX);
        const f = (dx - target) * spring * w;
        forces.set(n.id, (forces.get(n.id) ?? 0) + f);
        forces.set(nb, (forces.get(nb) ?? 0) - f);
      }
    }

    // Zentrierung um den Spalten-Schwerpunkt der Etage
    const rowSum = new Map<number, { sum: number; count: number }>();
    for (const n of nodes) {
      const r = rowOf(n.id);
      const cur = rowSum.get(r) ?? { sum: 0, count: 0 };
      rowSum.set(r, { sum: cur.sum + (xs.get(n.id) ?? 0), count: cur.count + 1 });
    }
    for (const n of nodes) {
      const r = rowOf(n.id);
      const info = rowSum.get(r);
      if (!info || info.count === 0) continue;
      const center = info.sum / info.count;
      forces.set(n.id, (forces.get(n.id) ?? 0) + (center - (xs.get(n.id) ?? 0)) * 0.03);
    }

    // Anwenden (gedämpft)
    for (const id of ids) {
      const f = Math.max(-80, Math.min(80, forces.get(id) ?? 0));
      xs.set(id, (xs.get(id) ?? 0) + f * 0.5);
    }

    // Mindestabstand erzwingen (Gleicher-Etage-Paare)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (rowOf(a.id) !== rowOf(b.id)) continue;
        let dx = (xs.get(b.id) ?? 0) - (xs.get(a.id) ?? 0);
        if (Math.abs(dx) < nodeWidth + minGapX) {
          const push = (nodeWidth + minGapX - Math.abs(dx)) / 2;
          const sign = dx >= 0 ? 1 : -1;
          xs.set(a.id, (xs.get(a.id) ?? 0) - push * sign);
          xs.set(b.id, (xs.get(b.id) ?? 0) + push * sign);
        }
      }
    }
  }

  const maxRow = Math.max(...nodes.map((n) => n.row), 0);
  for (const n of nodes) {
    // Gespiegelt wie die Etagen-Ansicht: row 0 (Grundlagen) UNTEN, großes y oben klein
    map.set(n.id, { x: xs.get(n.id) ?? 0, y: (maxRow - rowOf(n.id)) * rowHeight });
  }
  return map;
}
