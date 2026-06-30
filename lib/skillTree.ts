// ============================================================================
// Skill Tree — Etagen-basiert (von oben nach unten)
//
// IDs müssen mit den Modul-Slugs in data.ts übereinstimmen!
// Modules ohne Content werden als "Bald verfügbar" markiert.
// ============================================================================

export type NodeStatus = "completed" | "in-progress" | "not-started";

export interface SkillTreeNode {
  id: string;             // MUSS mit Modul-Slug übereinstimmen
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk" | "advanced";
  col: number;
  row: number;
  prerequisites: string[];
}

export interface NodePosition { x: number; y: number }

// ─── Layout ─────────────────────────────────────────────────────────────────

const COL_W = 200;
const ROW_H = 110;

export const skillTreeNodes: SkillTreeNode[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATIK — Kompletter Abhängigkeitsbaum
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Etage 0: absolute Grundlagen ──
  { id: "mathe-logik",         label: "Logik",              icon: "🧠", category: "mathe", col: 0, row: 0, prerequisites: [] },
  { id: "mathe-mengenlehre",   label: "Mengenlehre",        icon: "🧮", category: "mathe", col: 1, row: 0, prerequisites: [] },
  { id: "mathe-grundrechnen",  label: "Grundrechnen",       icon: "➕", category: "mathe", col: 2, row: 0, prerequisites: [] },

  // ── Etage 1 ──
  { id: "mathe-bruchrechnen",  label: "Bruchrechnen",       icon: "🔢", category: "mathe", col: 0, row: 1, prerequisites: ["mathe-grundrechnen"] },
  { id: "mathe-termumformung", label: "Termumformung",      icon: "📝", category: "mathe", col: 1, row: 1, prerequisites: ["mathe-grundrechnen"] },
  { id: "mathe-dreisatz",      label: "Dreisatz",           icon: "📐", category: "mathe", col: 2, row: 1, prerequisites: ["mathe-bruchrechnen"] },
  { id: "mathe-prozent-zinsen",label: "Prozent & Zinsen",   icon: "💰", category: "mathe", col: 3, row: 1, prerequisites: ["mathe-bruchrechnen"] },

  // ── Etage 2 ──
  { id: "mathe-gleichungen",   label: "Gleichungen",        icon: "⚖️", category: "mathe", col: 0, row: 2, prerequisites: ["mathe-bruchrechnen", "mathe-termumformung"] },
  { id: "mathe-potenzen",      label: "Potenzen & Wurzeln", icon: "📈", category: "mathe", col: 1, row: 2, prerequisites: ["mathe-termumformung"] },
  { id: "mathe-ganze-zahlen",  label: "Ganze Zahlen",       icon: "🔣", category: "mathe", col: 2, row: 2, prerequisites: ["mathe-grundrechnen"] },
  { id: "mathe-koerper",       label: "Körper & Strukturen",icon: "🏗️", category: "mathe", col: 3, row: 2, prerequisites: ["mathe-mengenlehre"] },

  // ── Etage 3 ──
  { id: "mathe-ungleichungen", label: "Ungleichungen",      icon: "≠",  category: "mathe", col: 0, row: 3, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-quadratische-gleichungen", label: "Quadrat. Gleichungen", icon: "²", category: "mathe", col: 1, row: 3, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-logarithmus",   label: "Logarithmen",        icon: "📉", category: "mathe", col: 2, row: 3, prerequisites: ["mathe-potenzen"] },
  { id: "mathe-exponential",   label: "Exponentialfkt.",    icon: "📈", category: "mathe", col: 3, row: 3, prerequisites: ["mathe-potenzen"] },

  // ── Etage 4 ──
  { id: "mathe-funktionen",    label: "Funktionen",         icon: "📉", category: "mathe", col: 0, row: 4, prerequisites: ["mathe-quadratische-gleichungen", "mathe-exponential"] },
  { id: "mathe-geometrie",     label: "Geometrie",          icon: "📐", category: "mathe", col: 1, row: 4, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-stochastik",    label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", col: 2, row: 4, prerequisites: ["mathe-mengenlehre", "mathe-prozent-zinsen"] },
  { id: "mathe-gleichungssysteme", label: "LGS",            icon: "⊞",  category: "mathe", col: 3, row: 4, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-wachstumsprozesse", label: "Wachstumsprozesse", icon: "🌱", category: "mathe", col: 4, row: 4, prerequisites: ["mathe-exponential", "mathe-logarithmus"] },

  // ── Etage 5 ──
  { id: "mathe1-grenzwerte",   label: "Grenzwerte",         icon: "🎯", category: "mathe", col: 0, row: 5, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-trigonometrie", label: "Trigonometrie",      icon: "📏", category: "mathe", col: 1, row: 5, prerequisites: ["mathe-geometrie", "mathe-funktionen"] },
  { id: "mathe-statistik",     label: "Statistik",          icon: "📊", category: "mathe", col: 2, row: 5, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-kombinatorik",  label: "Kombinatorik",       icon: "🔀", category: "mathe", col: 3, row: 5, prerequisites: ["mathe-stochastik"] },
  { id: "mathe2-vektoren",     label: "Vektoren",           icon: "➡️", category: "mathe", col: 4, row: 5, prerequisites: ["mathe-gleichungssysteme"] },

  // ── Etage 6 ──
  { id: "mathe1-ableitungen",  label: "Ableitungen",        icon: "∂",  category: "mathe", col: 0, row: 6, prerequisites: ["mathe1-grenzwerte"] },
  { id: "mathe1-integration",  label: "Integration",        icon: "∫",  category: "mathe", col: 1, row: 6, prerequisites: ["mathe1-grenzwerte", "mathe1-ableitungen"] },
  { id: "mathe-wahrscheinlichkeitsverteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", col: 2, row: 6, prerequisites: ["mathe-statistik"] },
  { id: "mathe-matrizen",      label: "Matrizen",           icon: "▦",  category: "mathe", col: 3, row: 6, prerequisites: ["mathe2-vektoren"] },
  { id: "mathe-komplexe-zahlen", label: "Komplexe Zahlen",  icon: "ℂ",  category: "mathe", col: 4, row: 6, prerequisites: ["mathe-quadratische-gleichungen"] },

  // ── Etage 7 ──
  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion",icon: "📊", category: "mathe", col: 0, row: 7, prerequisites: ["mathe1-ableitungen"] },
  { id: "mathe1-reihen",       label: "Reihen",             icon: "Σ",  category: "mathe", col: 1, row: 7, prerequisites: ["mathe1-integration"] },
  { id: "mathe2-dgl",          label: "Differentialgl.",    icon: "ƒ'", category: "mathe", col: 2, row: 7, prerequisites: ["mathe1-ableitungen", "mathe1-integration"] },
  { id: "mathe-analytische-geometrie", label: "Analyt. Geometrie", icon: "📐", category: "mathe", col: 3, row: 7, prerequisites: ["mathe-matrizen"] },
  { id: "mathe-numerik",       label: "Numerik",            icon: "🖥️", category: "mathe", col: 4, row: 7, prerequisites: ["mathe1-ableitungen"] },

  // ── Etage 8 ──
  { id: "mathe-taylorreihen",  label: "Taylorreihen",       icon: "∞",  category: "mathe", col: 0, row: 8, prerequisites: ["mathe1-reihen", "mathe1-ableitungen"] },
  { id: "mathe-folgen-reihen", label: "Folgen",             icon: "→",  category: "mathe", col: 1, row: 8, prerequisites: ["mathe1-reihen"] },
  { id: "mathe-fourier",       label: "Fourieranalyse",     icon: "🌊", category: "mathe", col: 2, row: 8, prerequisites: ["mathe1-reihen", "mathe-trigonometrie"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROGRAMMIERUNG
  // ═══════════════════════════════════════════════════════════════════════════

  { id: "html-css",        label: "HTML & CSS",     icon: "🎨", category: "programmierung", col: 0, row: 0, prerequisites: [] },
  { id: "javascript",      label: "JavaScript",     icon: "⚡", category: "programmierung", col: 1, row: 0, prerequisites: [] },
  { id: "python",          label: "Python",         icon: "🐍", category: "programmierung", col: 2, row: 0, prerequisites: [] },

  { id: "react-grundlagen",label: "React",          icon: "⚛️", category: "programmierung", col: 0, row: 1, prerequisites: ["javascript", "html-css"] },
  { id: "typescript-basics",label: "TypeScript",    icon: "📘", category: "programmierung", col: 1, row: 1, prerequisites: ["javascript"] },
  { id: "datenstrukturen", label: "Datenstrukturen",icon: "🏗️", category: "programmierung", col: 2, row: 1, prerequisites: ["python"] },

  { id: "nextjs",          label: "Next.js",        icon: "▲",  category: "programmierung", col: 0, row: 2, prerequisites: ["react-grundlagen", "typescript-basics"] },
  { id: "algorithmen",     label: "Algorithmen",    icon: "⚙️", category: "programmierung", col: 2, row: 2, prerequisites: ["datenstrukturen"] },
  { id: "nodejs",          label: "Node.js",        icon: "🟢", category: "programmierung", col: 1, row: 2, prerequisites: ["typescript-basics"] },

  { id: "api-design",      label: "API Design",     icon: "🔌", category: "programmierung", col: 1, row: 3, prerequisites: ["nodejs"] },
  { id: "testing",         label: "Testing",        icon: "🧪", category: "programmierung", col: 2, row: 3, prerequisites: ["algorithmen"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // IHK
  // ═══════════════════════════════════════════════════════════════════════════

  // Etage 0: Grundlagen
  { id: "ihk-diagramme",       label: "Diagramme",          icon: "📊", category: "ihk", col: 0, row: 0, prerequisites: [] },
  { id: "ihk-netzwerk",        label: "Netzwerktechnik",    icon: "🌐", category: "ihk", col: 1, row: 0, prerequisites: [] },
  { id: "ihk-datenbanken",     label: "Datenbanken",        icon: "🗄️", category: "ihk", col: 2, row: 0, prerequisites: [] },
  { id: "ihk-computersysteme", label: "Computersysteme",    icon: "🖥️", category: "ihk", col: 3, row: 0, prerequisites: [] },

  // Etage 1
  { id: "ihk-it-sicherheit",   label: "IT-Sicherheit",      icon: "🔒", category: "ihk", col: 0, row: 1, prerequisites: ["ihk-netzwerk"] },
  { id: "ihk-git",             label: "Git",                icon: "🔀", category: "ihk", col: 1, row: 1, prerequisites: [] },
  { id: "ihk-ux",              label: "UX Design",          icon: "🎨", category: "ihk", col: 2, row: 1, prerequisites: [] },
  { id: "ihk-docker",          label: "Docker",             icon: "🐳", category: "ihk", col: 3, row: 1, prerequisites: ["ihk-computersysteme"] },

  // Etage 2
  { id: "ihk-projektmanagement", label: "Projektmanagement",icon: "📋", category: "ihk", col: 0, row: 2, prerequisites: ["ihk-git"] },
  { id: "ihk-qualitaet",       label: "Qualitätsstandards", icon: "✅", category: "ihk", col: 1, row: 2, prerequisites: ["ihk-git"] },

  // Etage 3
  { id: "ihk-erw-prog",        label: "Erw. Programmierung",icon: "🔧", category: "ihk", col: 0, row: 3, prerequisites: ["ihk-qualitaet"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // ERWEITERT — nur sichtbar nach Easter-Egg Passwort
  // ═══════════════════════════════════════════════════════════════════════════

  // Semester 1-2: Grundlagen
  { id: "adv-mathe1",       label: "Mathematik 1",       icon: "📐", category: "advanced", col: 0, row: 0, prerequisites: [] },
  { id: "adv-mathe2",       label: "Mathematik 2",       icon: "📈", category: "advanced", col: 1, row: 0, prerequisites: ["adv-mathe1"] },
  { id: "adv-mathe3",       label: "Mathematik 3",       icon: "🔢", category: "advanced", col: 2, row: 0, prerequisites: ["adv-mathe2"] },
  { id: "adv-englisch",     label: "Englisch",           icon: "🇬🇧", category: "advanced", col: 3, row: 0, prerequisites: [] },

  // Semester 3: Theorie
  { id: "adv-ad",           label: "Algorithmen & Daten",icon: "🔀", category: "advanced", col: 0, row: 1, prerequisites: ["adv-mathe1"] },
  { id: "adv-db",           label: "Datenbanken",        icon: "🗄️", category: "advanced", col: 1, row: 1, prerequisites: [] },
  { id: "adv-ki",           label: "Künstliche Intelligenz", icon: "🤖", category: "advanced", col: 2, row: 1, prerequisites: ["adv-mathe1"] },
  { id: "adv-ml",           label: "Machine Learning",   icon: "📈", category: "advanced", col: 3, row: 1, prerequisites: ["adv-ki"] },

  // Semester 3-4: Praxis
  { id: "adv-kb",           label: "Kommunikationstechnik", icon: "🔌", category: "advanced", col: 0, row: 2, prerequisites: [] },
  { id: "adv-rn",           label: "Rechnernetze",       icon: "🌐", category: "advanced", col: 1, row: 2, prerequisites: ["adv-kb"] },
  { id: "adv-nm2",          label: "Nachrichtentechnik 2",icon: "📡", category: "advanced", col: 2, row: 2, prerequisites: ["adv-kb"] },
  { id: "adv-ps2",          label: "Prozesssteuerung 2",  icon: "⚙️", category: "advanced", col: 3, row: 2, prerequisites: [] },

  // Semester 5: Spezial
  { id: "adv-vs",           label: "Verteilte Systeme",  icon: "🖥️", category: "advanced", col: 0, row: 3, prerequisites: ["adv-rn"] },
  { id: "adv-kub",          label: "Kommunikationstechnik", icon: "📡", category: "advanced", col: 1, row: 3, prerequisites: ["adv-nm2"] },
  { id: "adv-wv",           label: "Weitverkehrsnetze",  icon: "🌍", category: "advanced", col: 2, row: 3, prerequisites: ["adv-rn"] },
  { id: "adv-sys",          label: "Signale & Systeme",  icon: "📊", category: "advanced", col: 3, row: 3, prerequisites: ["adv-mathe3"] },
];

// ─── Status ─────────────────────────────────────────────────────────────────

export function getNodeStatus(
  node: SkillTreeNode,
  completedModules: string[],
  completedLessons: Record<string, string[]>
): NodeStatus {
  if (completedModules.includes(node.id)) return "completed";
  const l = completedLessons[node.id];
  if (l && l.length > 0) return "in-progress";
  return "not-started";
}

// ─── Kanten ─────────────────────────────────────────────────────────────────

export interface SkillTreeEdge {
  from: string;
  to: string;
}

export function getEdges(nodes: SkillTreeNode[]): SkillTreeEdge[] {
  const edges: SkillTreeEdge[] = [];
  for (const n of nodes) {
    for (const prereq of n.prerequisites) {
      edges.push({ from: prereq, to: n.id });
    }
  }
  return edges;
}

// ─── Positionen ─────────────────────────────────────────────────────────────

/**
 * Automatische Baum-Layout-Berechnung (Bottom-Up).
 *
 * 1. Layer = längster Pfad von einem Root (Topological Sort)
 * 2. Barycenter-Heuristik minimiert Kantenkreuzungen pro Layer
 * 3. Eltern werden über ihren Kindern zentriert
 */
export function computeTreePositions(nodes: SkillTreeNode[]): Map<string, NodePosition> {
  const map = new Map<string, NodePosition>();
  if (nodes.length === 0) return map;

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // ── 1. Layer berechnen (längster Pfad von Root) ──
  const layerCache = new Map<string, number>();

  function getLayer(id: string, visited = new Set<string>()): number {
    if (layerCache.has(id)) return layerCache.get(id)!;
    if (visited.has(id)) return 0; // Zyklus-Schutz
    visited.add(id);

    const node = nodeMap.get(id);
    if (!node || node.prerequisites.length === 0) {
      layerCache.set(id, 0);
      return 0;
    }

    let maxParent = 0;
    for (const p of node.prerequisites) {
      if (nodeMap.has(p)) {
        maxParent = Math.max(maxParent, getLayer(p, visited) + 1);
      }
    }
    layerCache.set(id, maxParent);
    return maxParent;
  }

  nodes.forEach(n => getLayer(n.id));

  // ── 2. Nodes nach Layer gruppieren ──
  const layers = new Map<number, SkillTreeNode[]>();
  for (const n of nodes) {
    const l = layerCache.get(n.id)!;
    if (!layers.has(l)) layers.set(l, []);
    layers.get(l)!.push(n);
  }

  const maxLayer = Math.max(...layers.keys(), 0);

  // ── 3. Barycenter-Sortierung (minimiert Kantenkreuzungen) ──
  const order = new Map<string, number>();

  // Unteres Layer: nach Original-col sortieren
  const layer0 = layers.get(0) || [];
  layer0.sort((a, b) => a.col - b.col);
  layer0.forEach((n, i) => order.set(n.id, i));

  // Obere Layers: Barycenter der Eltern
  for (let l = 1; l <= maxLayer; l++) {
    const layer = layers.get(l) || [];
    const bary = new Map<string, number>();

    for (const n of layer) {
      const parentPositions = n.prerequisites
        .filter(p => order.has(p))
        .map(p => order.get(p)!);
      bary.set(
        n.id,
        parentPositions.length > 0
          ? parentPositions.reduce((a, b) => a + b, 0) / parentPositions.length
          : n.col // Fallback
      );
    }

    layer.sort((a, b) => (bary.get(a.id) || 0) - (bary.get(b.id) || 0));
    layer.forEach((n, i) => order.set(n.id, i));
  }

  // ── 4. Positionen berechnen ──
  // Nodes innerhalb jeder Layer gleichmäßig verteilen, zentriert um 0
  // Y-Achse gespiegelt: Layer 0 = UNTEN (Grundlagen), maxLayer = OBEN (Fortgeschritten)
  for (let l = 0; l <= maxLayer; l++) {
    const layer = layers.get(l) || [];
    const layerW = (layer.length - 1) * COL_W;
    const startX = -layerW / 2; // zentriert um 0

    for (let i = 0; i < layer.length; i++) {
      map.set(layer[i].id, {
        x: startX + i * COL_W,
        y: (maxLayer - l) * ROW_H, // gespiegelt: Layer 0 = unten
      });
    }
  }

  return map;
}

export const NODE_W = 160;
export const NODE_H = 60;
export { COL_W, ROW_H };
