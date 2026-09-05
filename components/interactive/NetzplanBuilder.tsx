"use client";

import { useState, useCallback, useMemo } from "react";

interface NetzNode {
  id: string;
  name: string;
  duration: number;
  predecessors: string[];
  x: number;
  y: number;
}

interface CalculatedNode extends NetzNode {
  faz: number;
  fez: number;
  saz: number;
  sez: number;
  puffer: number;
  isCritical: boolean;
}

const projectNodes: NetzNode[] = [
  { id: "A", name: "Planung", duration: 3, predecessors: [], x: 60, y: 80 },
  { id: "B", name: "Design", duration: 4, predecessors: ["A"], x: 220, y: 40 },
  { id: "C", name: "Datenbank", duration: 2, predecessors: ["A"], x: 220, y: 160 },
  { id: "D", name: "Frontend", duration: 5, predecessors: ["B"], x: 380, y: 40 },
  { id: "E", name: "Backend", duration: 6, predecessors: ["B", "C"], x: 380, y: 160 },
  { id: "F", name: "Testen", duration: 3, predecessors: ["D", "E"], x: 540, y: 100 },
];

function calculateNetzplan(nodes: NetzNode[]): CalculatedNode[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const calculated = new Map<string, CalculatedNode>();

  // Forward pass (FAZ/FEZ)
  const sorted = topologicalSort(nodes);
  for (const node of sorted) {
    const preds = node.predecessors.map((p) => calculated.get(p)!).filter(Boolean);
    const faz = preds.length > 0 ? Math.max(...preds.map((p) => p.fez)) : 0;
    const fez = faz + node.duration;
    calculated.set(node.id, { ...node, faz, fez, saz: 0, sez: 0, puffer: 0, isCritical: false });
  }

  // Backward pass (SAZ/SEZ)
  const projectEnd = Math.max(...Array.from(calculated.values()).map((n) => n.fez));
  const reverseSorted = [...sorted].reverse();

  for (const node of reverseSorted) {
    const successors = Array.from(calculated.values()).filter((n) => n.predecessors.includes(node.id));
    const calc = calculated.get(node.id)!;
    if (successors.length === 0) {
      calc.sez = projectEnd;
    } else {
      calc.sez = Math.min(...successors.map((s) => s.saz));
    }
    calc.saz = calc.sez - node.duration;
    calc.puffer = calc.saz - calc.faz;
    calc.isCritical = calc.puffer === 0;
  }

  return Array.from(calculated.values());
}

function topologicalSort(nodes: NetzNode[]): NetzNode[] {
  const visited = new Set<string>();
  const result: NetzNode[] = [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  function visit(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const node = nodeMap.get(id)!;
    for (const pred of node.predecessors) {
      visit(pred);
    }
    result.push(node);
  }

  for (const node of nodes) {
    visit(node.id);
  }
  return result;
}

function renderNode(node: CalculatedNode, isActive: boolean, isPulsing: boolean, phase: "forward" | "backward" | "done" | "start") {
  const w = 120;
  const h = 100;
  const x = node.x;
  const y = node.y;

  const color = node.isCritical ? "#ef4444" : "#3b82f6";
  const bgOpacity = isActive ? "40" : "20";
  const strokeW = isPulsing ? 3 : 2;

  const showForward = phase === "forward" || phase === "done";
  const showBackward = phase === "backward" || phase === "done";

  return (
    <g key={node.id} style={{ transition: "all 0.5s ease" }}>
      {/* Outer box */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={color + bgOpacity}
        stroke={isPulsing ? color : color + "60"}
        strokeWidth={strokeW}
        style={{ transition: "all 0.3s ease" }}
      />

      {/* Divider lines */}
      <line x1={x} y1={y + 25} x2={x + w} y2={y + 25} stroke={color + "40"} strokeWidth={1} />
      <line x1={x + w / 2} y1={y + 25} x2={x + w / 2} y2={y + h} stroke={color + "40"} strokeWidth={1} />

      {/* Name */}
      <text x={x + w / 2} y={y + 16} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">
        {node.id}: {node.name}
      </text>

      {/* FAZ / FEZ (top row) */}
      <text x={x + w / 4} y={y + 42} textAnchor="middle" fill={showForward ? "#60a5fa" : "#334155"} fontSize={10} fontWeight="bold">
        {showForward ? node.faz : "-"}
      </text>
      <text x={x + (3 * w) / 4} y={y + 42} textAnchor="middle" fill={showForward ? "#60a5fa" : "#334155"} fontSize={10} fontWeight="bold">
        {showForward ? node.fez : "-"}
      </text>

      {/* Dauer (center) */}
      <text x={x + w / 2} y={y + 60} textAnchor="middle" fill="#f59e0b" fontSize={16} fontWeight="bold">
        {node.duration}
      </text>

      {/* SAZ / SEZ (bottom row) */}
      <text x={x + w / 4} y={y + 80} textAnchor="middle" fill={showBackward ? "#f87171" : "#334155"} fontSize={10} fontWeight="bold">
        {showBackward ? node.saz : "-"}
      </text>
      <text x={x + (3 * w) / 4} y={y + 80} textAnchor="middle" fill={showBackward ? "#f87171" : "#334155"} fontSize={10} fontWeight="bold">
        {showBackward ? node.sez : "-"}
      </text>

      {/* Labels */}
      <text x={x + w / 4} y={y + 25 - 3} textAnchor="middle" fill="#64748b" fontSize={7}>
        FAZ
      </text>
      <text x={x + (3 * w) / 4} y={y + 25 - 3} textAnchor="middle" fill="#64748b" fontSize={7}>
        FEZ
      </text>
      <text x={x + w / 4} y={y + h - 3} textAnchor="middle" fill="#64748b" fontSize={7}>
        SAZ
      </text>
      <text x={x + (3 * w) / 4} y={y + h - 3} textAnchor="middle" fill="#64748b" fontSize={7}>
        SEZ
      </text>

      {/* Puffer */}
      {showBackward && (
        <text x={x + w + 8} y={y + h / 2} fill={node.isCritical ? "#ef4444" : "#64748b"} fontSize={9} fontWeight="bold">
          P={node.puffer}
        </text>
      )}

      {/* Critical path indicator */}
      {node.isCritical && phase === "done" && (
        <rect
          x={x - 3}
          y={y - 3}
          width={w + 6}
          height={h + 6}
          rx={8}
          fill="none"
          stroke="#ef4444"
          strokeWidth={2.5}
          strokeDasharray="6 3"
        />
      )}
    </g>
  );
}

function renderEdges(nodes: CalculatedNode[], highlightUpTo: number) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  let edgeIdx = 0;

  return nodes.flatMap((node) =>
    node.predecessors.map((predId) => {
      const pred = nodeMap.get(predId)!;
      const isHighlighted = edgeIdx < highlightUpTo;
      edgeIdx++;

      const x1 = pred.x + 120;
      const y1 = pred.y + 50;
      const x2 = node.x;
      const y2 = node.y + 50;

      const isCriticalEdge = node.isCritical && pred.isCritical;

      return (
        <g key={`${predId}-${node.id}`} style={{ transition: "all 0.3s ease" }}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isCriticalEdge && isHighlighted ? "#ef4444" : isHighlighted ? "#64748b" : "#1e293b"}
            strokeWidth={isCriticalEdge ? 2.5 : 1.5}
            markerEnd="url(#netz-arrow)"
            style={{ transition: "all 0.3s ease" }}
          />
        </g>
      );
    })
  );
}

const exploreSteps = [
  { phase: "start" as const, nodeIdx: -1, title: "Start", description: "Willkommen zum Netzplan! Wir berechnen zuerst die frühesten Zeitpunkte (Vorwärtsrechnung), dann die spätesten (Rückwärtsrechnung)." },
  { phase: "forward" as const, nodeIdx: 0, title: "A: Planung (Dauer 3)", description: "FAZ=0 (kein Vorgänger), FEZ=0+3=3. Die Planung startet sofort und dauert 3 Tage." },
  { phase: "forward" as const, nodeIdx: 1, title: "B: Design (Dauer 4)", description: "FAZ=FEZ(A)=3, FEZ=3+4=7. Das Design beginnt nach der Planung." },
  { phase: "forward" as const, nodeIdx: 2, title: "C: Datenbank (Dauer 2)", description: "FAZ=FEZ(A)=3, FEZ=3+2=5. Die Datenbankarbeit beginnt ebenfalls nach der Planung." },
  { phase: "forward" as const, nodeIdx: 3, title: "D: Frontend (Dauer 5)", description: "FAZ=FEZ(B)=7, FEZ=7+5=12. Frontend startet nach dem Design." },
  { phase: "forward" as const, nodeIdx: 4, title: "E: Backend (Dauer 6)", description: "FAZ=max(FEZ(B),FEZ(C))=max(7,5)=7, FEZ=7+6=13. Backend braucht Design UND Datenbank." },
  { phase: "forward" as const, nodeIdx: 5, title: "F: Testen (Dauer 3)", description: "FAZ=max(FEZ(D),FEZ(E))=max(12,13)=13, FEZ=13+3=16. Testen startet, wenn Frontend UND Backend fertig sind." },
  { phase: "backward" as const, nodeIdx: 5, title: "Rückwärts: F", description: "SEZ=16 (Projektende), SAZ=16-3=13. Puffer=13-13=0 → KRITISCH!" },
  { phase: "backward" as const, nodeIdx: 4, title: "Rückwärts: E", description: "SEZ=SAZ(F)=13, SAZ=13-6=7. Puffer=7-7=0 → KRITISCH!" },
  { phase: "backward" as const, nodeIdx: 3, title: "Rückwärts: D", description: "SEZ=SAZ(F)=13, SAZ=13-5=8. Puffer=8-7=1 → 1 Tag Puffer." },
  { phase: "backward" as const, nodeIdx: 2, title: "Rückwärts: C", description: "SEZ=SAZ(E)=7, SAZ=7-2=5. Puffer=5-3=2 → 2 Tage Puffer." },
  { phase: "backward" as const, nodeIdx: 1, title: "Rückwärts: B", description: "SEZ=min(SAZ(D),SAZ(E))=min(8,7)=7, SAZ=7-4=3. Puffer=3-3=0 → KRITISCH!" },
  { phase: "backward" as const, nodeIdx: 0, title: "Rückwärts: A", description: "SEZ=min(SAZ(B),SAZ(C))=min(3,5)=3, SAZ=3-3=0. Puffer=0-0=0 → KRITISCH!" },
  { phase: "done" as const, nodeIdx: -1, title: "Fertig! 🎉", description: "Kritischer Pfad: A → B → E → F (Dauer 16). Jede Verzögerung auf diesem Pfad verzögert das gesamte Projekt!" },
];

export function NetzplanBuilder() {
  const [step, setStep] = useState(0);

  const calculatedNodes = useMemo(() => calculateNetzplan(projectNodes), []);
  const maxSteps = exploreSteps.length;
  const currentExplore = exploreSteps[step] || exploreSteps[0];

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, maxSteps - 1));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setStep(0);
  }, []);

  // Calculate visible edges
  const visibleEdgeCount = useMemo(() => {
    if (step === 0) return 0;
    const currentPhase = currentExplore.phase;
    const currentNodeIdx = currentExplore.nodeIdx;

    if (currentPhase === "start") return 0;

    // Count edges that should be visible
    let count = 0;
    for (const node of calculatedNodes) {
      const nodeIdx = calculatedNodes.indexOf(node);
      if (currentPhase === "forward") {
        if (nodeIdx <= currentNodeIdx) count += node.predecessors.length;
      } else {
        count += node.predecessors.length;
      }
    }
    return count;
  }, [step, currentExplore, calculatedNodes]);

  const svgWidth = 680;
  const svgHeight = 250;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📊 Netzplantechnik</h4>
        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-xs rounded-full font-medium">
          Schritt {step + 1} / {maxSteps}
        </span>
      </div>

      <p className="text-sm text-slate-400 mb-4">
        Erkunde die Vorwärts- und Rückwärtsberechnung eines Projekts mit 6 Vorgängen.
      </p>

      {/* SVG */}
      <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 mb-4 overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          <defs>
            <marker id="netz-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>

          {/* Edges */}
          {renderEdges(calculatedNodes, visibleEdgeCount)}

          {/* Nodes */}
          {calculatedNodes.map((node, i) => {
            const isActive = currentExplore.nodeIdx === i;
            const isPulsing = currentExplore.nodeIdx === i;
            const phase = currentExplore.phase === "start" ? "start" : currentExplore.phase;
            return renderNode(node, isActive || step === maxSteps - 1, isPulsing, phase as "forward" | "backward" | "done" | "start");
          })}
        </svg>
      </div>

      {/* Info-Panel */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-2/3">
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
            <p className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-2">
              {currentExplore.title}
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">{currentExplore.description}</p>
          </div>
        </div>

        <div className="lg:w-1/3">
          {/* Legende */}
          <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Legende</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-mono w-10">FAZ</span>
                <span>Frühester Anfang</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-mono w-10">FEZ</span>
                <span>Frühester Ende</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-mono w-10">SAZ</span>
                <span>Spätester Anfang</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-mono w-10">SEZ</span>
                <span>Spätester Ende</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-mono w-10">D</span>
                <span>Dauer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-mono w-10">P</span>
                <span>Pufferzeit</span>
              </div>
            </div>
          </div>

          {/* Kritischer Pfad */}
          {step >= maxSteps - 1 && (
            <div className="mt-3 p-4 bg-red-900/20 rounded-xl border border-red-500/20">
              <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">Kritischer Pfad</p>
              <p className="text-sm text-red-300 font-mono">A → B → E → F</p>
              <p className="text-xs text-slate-400 mt-1">Gesamtdauer: 16 Tage</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
        >
          ← Zurück
        </button>
        <button
          onClick={reset}
          className="px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-700 transition-all text-sm font-semibold"
        >
          ↺ Reset
        </button>
        <button
          onClick={nextStep}
          disabled={step >= maxSteps - 1}
          className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-xl disabled:opacity-20 hover:bg-rose-500 transition-all text-sm font-semibold shadow-lg shadow-rose-500/20"
        >
          Weiter →
        </button>
      </div>
    </div>
  );
}
