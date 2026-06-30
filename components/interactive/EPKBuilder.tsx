"use client";

import { useState, useCallback, useMemo } from "react";

type EPKNodeType = "event" | "function" | "and" | "or" | "xor";

interface EPKNode {
  id: string;
  type: EPKNodeType;
  label: string;
  x: number;
  y: number;
}

interface EPKEdge {
  from: string;
  to: string;
  label?: string;
}

const bestellNodes: EPKNode[] = [
  { id: "e1", type: "event", label: "Bestellung\neingegangen", x: 200, y: 50 },
  { id: "f1", type: "function", label: "Bestellung\nprüfen", x: 200, y: 150 },
  { id: "e2", type: "event", label: "Bestellung\ngeprüft", x: 200, y: 250 },
  { id: "op1", type: "xor", label: "XOR", x: 200, y: 340 },
  { id: "f2a", type: "function", label: "Ware\nausliefern", x: 100, y: 430 },
  { id: "f2b", type: "function", label: "Kunde\nkontaktieren", x: 300, y: 430 },
  { id: "e3a", type: "event", label: "Ware\nbestätigt", x: 100, y: 530 },
  { id: "e3b", type: "event", label: "Kunde\ninformiert", x: 300, y: 530 },
  { id: "f3", type: "function", label: "Bestellung\nabschließen", x: 200, y: 630 },
  { id: "e4", type: "event", label: "Prozess\nbeendet", x: 200, y: 730 },
];

const bestellEdges: EPKEdge[] = [
  { from: "e1", to: "f1" },
  { from: "f1", to: "e2" },
  { from: "e2", to: "op1" },
  { from: "op1", to: "f2a", label: "Ja" },
  { from: "op1", to: "f2b", label: "Nein" },
  { from: "f2a", to: "e3a" },
  { from: "f2b", to: "e3b" },
  { from: "e3a", to: "f3" },
  { from: "e3b", to: "f3" },
  { from: "f3", to: "e4" },
];

const exploreSteps = [
  { nodeId: "e1", title: "Start-Ereignis", description: "Der Prozess beginnt mit dem Ereignis 'Bestellung eingegangen'. In einer EPK wechseln sich Ereignisse und Funktionen immer ab." },
  { nodeId: "f1", title: "Funktion: Prüfen", description: "Die Funktion 'Bestellung prüfen' wird ausgeführt. Funktionen beschreiben Tätigkeiten — dargestellt als abgerundete Rechtecke." },
  { nodeId: "e2", title: "Ergebnis-Ereignis", description: "Nach der Prüfung entsteht das Ereignis 'Bestellung geprüft'. Ereignisse beschreiben Zustände oder Ergebnisse." },
  { nodeId: "op1", title: "XOR-Operator", description: "Der XOR-Operator verzweigt den Prozess: Genau EIN Pfad wird gewählt — entweder 'Ja' (Ware ausliefern) oder 'Nein' (Kunde kontaktieren)." },
  { nodeId: "f2a", title: "Ja-Pfad", description: "Bei positiver Prüfung: Die Funktion 'Ware ausliefern' wird ausgeführt. Die Ware wird an den Kunden versendet." },
  { nodeId: "f2b", title: "Nein-Pfad", description: "Bei negativer Prüfung: Die Funktion 'Kunde kontaktieren' wird ausgeführt. Der Kunde wird über Probleme informiert." },
  { nodeId: "f3", title: "Zusammenführung", description: "Beide Pfade führen zur Funktion 'Bestellung abschließen'. Der Prozess wird unabhängig vom Pfad abgeschlossen." },
  { nodeId: "e4", title: "End-Ereignis", description: "Das End-Ereignis 'Prozess beendet' markiert das Ende der EPK. Der gesamte Bestellprozess ist abgeschlossen! ✅" },
];

function getNodeColor(type: EPKNodeType): string {
  switch (type) {
    case "event": return "#f59e0b";
    case "function": return "#3b82f6";
    case "and": return "#22c55e";
    case "or": return "#a855f7";
    case "xor": return "#ef4444";
  }
}

function renderEPKNode(node: EPKNode, isActive: boolean, isPulsing: boolean) {
  const color = getNodeColor(node.type);
  const opacity = isActive ? 1 : 0.35;
  const filter = isPulsing ? `drop-shadow(0 0 10px ${color}80)` : undefined;
  const lines = node.label.split("\n");
  const lineHeight = 13;
  const startY = node.y - (lines.length - 1) * lineHeight / 2;

  const common = { opacity, filter, style: { transition: "all 0.5s ease" } };

  switch (node.type) {
    case "event":
      // Sechseck
      return (
        <g key={node.id} {...common}>
          <polygon
            points={`${node.x - 45},${node.y - 20} ${node.x - 25},${node.y - 28} ${node.x + 25},${node.y - 28} ${node.x + 45},${node.y - 20} ${node.x + 25},${node.y + 28} ${node.x - 25},${node.y + 28}`}
            fill={color + "30"}
            stroke={color}
            strokeWidth={isPulsing ? 3 : 2}
          />
          {lines.map((l, i) => (
            <text key={i} x={node.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize={11} fontWeight={isPulsing ? "bold" : "normal"}>
              {l}
            </text>
          ))}
        </g>
      );

    case "function":
      return (
        <g key={node.id} {...common}>
          <rect
            x={node.x - 50}
            y={node.y - 22}
            width={100}
            height={44}
            rx={10}
            fill={color + "30"}
            stroke={color}
            strokeWidth={isPulsing ? 3 : 2}
          />
          {lines.map((l, i) => (
            <text key={i} x={node.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize={11} fontWeight={isPulsing ? "bold" : "normal"}>
              {l}
            </text>
          ))}
        </g>
      );

    case "and":
    case "or":
    case "xor":
      return (
        <g key={node.id} {...common}>
          <circle cx={node.x} cy={node.y} r={18} fill={color + "40"} stroke={color} strokeWidth={isPulsing ? 3 : 2} />
          <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={10} fontWeight="bold">
            {node.type.toUpperCase()}
          </text>
        </g>
      );
  }
}

function renderEPKEdges(nodes: EPKNode[], edges: EPKEdge[], highlightUpTo: number) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return edges.map((edge, i) => {
    const from = nodeMap[edge.from];
    const to = nodeMap[edge.to];
    if (!from || !to) return null;

    const isHighlighted = i < highlightUpTo;
    const color = isHighlighted ? "#94a3b8" : "#334155";
    const opacity = isHighlighted ? 1 : 0.15;

    // Calculate connection points
    let x1 = from.x, y1 = from.y, x2 = to.x, y2 = to.y;

    // Adjust start/end points based on node type
    if (from.type === "event") y1 += 28;
    else if (from.type === "function") y1 += 22;
    else if (from.type === "and" || from.type === "or" || from.type === "xor") y1 += 18;

    if (to.type === "event") y2 -= 28;
    else if (to.type === "function") y2 -= 22;
    else if (to.type === "and" || to.type === "or" || to.type === "xor") y2 -= 18;

    // For horizontal connections (XOR branches)
    if (from.type === "xor" && to.type === "function") {
      if (to.x !== from.x) {
        x1 = from.x + (to.x > from.x ? 18 : -18);
        y1 = from.y;
        x2 = to.x;
        y2 = to.y - 22;
      }
    }

    return (
      <g key={i} opacity={opacity} style={{ transition: "opacity 0.5s ease" }}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} markerEnd="url(#epk-arrow)" />
        {edge.label && (
          <text
            x={(x1 + x2) / 2 + (x2 > x1 ? 10 : -10)}
            y={(y1 + y2) / 2}
            textAnchor="middle"
            fill={isHighlighted ? "#cbd5e1" : "#475569"}
            fontSize={11}
            fontWeight="bold"
          >
            {edge.label}
          </text>
        )}
      </g>
    );
  });
}

export function EPKBuilder() {
  const [mode, setMode] = useState<"explore" | "build">("explore");
  const [step, setStep] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  const maxSteps = exploreSteps.length;

  const nextStep = useCallback(() => {
    const newStep = Math.min(step + 1, maxSteps);
    setStep(newStep);
    if (newStep > 0 && newStep <= maxSteps) {
      setActiveId(exploreSteps[newStep - 1].nodeId);
    }
  }, [step, maxSteps]);

  const prevStep = useCallback(() => {
    const newStep = Math.max(step - 1, 0);
    setStep(newStep);
    if (newStep > 0) {
      setActiveId(exploreSteps[newStep - 1].nodeId);
    } else {
      setActiveId(null);
    }
  }, [step]);

  const reset = useCallback(() => {
    setStep(0);
    setActiveId(null);
  }, []);

  // Find connected edges for current step
  const visibleEdgeCount = useMemo(() => {
    if (step === 0) return 0;
    const currentNodeId = exploreSteps[step - 1].nodeId;
    // Show all edges up to and including edges that lead TO this node
    let count = 0;
    for (let i = 0; i < bestellEdges.length; i++) {
      const edge = bestellEdges[i];
      count++;
      if (edge.to === currentNodeId) break;
    }
    return count;
  }, [step]);

  const svgWidth = 400;
  const svgHeight = 800;
  const currentExplore = step > 0 ? exploreSteps[step - 1] : null;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">🔗 EPK Builder</h4>
        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full font-medium">
          Ereignisgesteuerte Prozesskette
        </span>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "explore" as const, label: "🔍 Erkunden", color: "blue" },
          { key: "build" as const, label: "🔨 Info", color: "emerald" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === m.key
                ? m.key === "explore"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "explore" && (
        <>
          <p className="text-sm text-slate-400 mb-4">
            Erkunde den Bestellprozess Schritt für Schritt als EPK.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 overflow-auto">
              <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
                <defs>
                  <marker id="epk-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                </defs>
                {renderEPKEdges(bestellNodes, bestellEdges, visibleEdgeCount)}
                {bestellNodes.map((node) => {
                  const isActive = activeId === node.id;
                  const isPulsing = currentExplore?.nodeId === node.id;
                  return renderEPKNode(node, isActive || step === 0, isPulsing || false);
                })}
              </svg>
            </div>

            <div className="lg:w-2/5 flex flex-col gap-4">
              {/* Info */}
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">
                  {step > 0 ? `Schritt ${step} / ${maxSteps}` : "Bereit?"}
                </p>
                {currentExplore ? (
                  <div>
                    <p className="text-white font-bold text-lg mb-2">{currentExplore.title}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{currentExplore.description}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Klicke auf &quot;Weiter&quot; um den Bestellprozess Schritt für Schritt zu erkunden.</p>
                )}
              </div>

              {/* EPK-Regeln */}
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">EPK-Regeln</p>
                <div className="space-y-2 text-xs text-slate-400">
                  <p>🔶 <strong className="text-amber-400">Ereignis</strong> → was passiert (Sechseck)</p>
                  <p>🟦 <strong className="text-blue-400">Funktion</strong> → was getan wird (Rechteck)</p>
                  <p>⭕ <strong className="text-red-400">XOR</strong> → genau ein Pfad</p>
                  <p>⭕ <strong className="text-green-400">AND</strong> → alle Pfade parallel</p>
                  <p>⭕ <strong className="text-purple-400">OR</strong> → mindestens ein Pfad</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 mt-auto">
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
                  disabled={step >= maxSteps}
                  className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl disabled:opacity-20 hover:bg-orange-500 transition-all text-sm font-semibold shadow-lg shadow-orange-500/20"
                >
                  Weiter →
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === "build" && (
        <div className="max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { type: "event", icon: "🔶", name: "Ereignis", desc: "Beschreibt einen Zustand oder ein Ergebnis (z.B. 'Bestellung eingegangen'). Sechseck-Form.", color: "amber" },
              { type: "function", icon: "🟦", name: "Funktion", desc: "Eine Tätigkeit oder Aktion (z.B. 'Bestellung prüfen'). Abgerundetes Rechteck.", color: "blue" },
              { type: "xor", icon: "⭕", name: "XOR", desc: "Exklusiver Operator: Genau EIN Pfad wird gewählt.", color: "red" },
              { type: "and", icon: "⭕", name: "AND", desc: "UND-Operator: Alle Pfade werden parallel ausgeführt.", color: "green" },
              { type: "or", icon: "⭕", name: "OR", desc: "ODER-Operator: Mindestens ein Pfad wird gewählt.", color: "purple" },
            ].map((item) => (
              <div key={item.type} className={`p-4 bg-slate-800/40 rounded-xl border border-slate-700/20`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white font-bold">{item.name}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-amber-900/20 rounded-xl border border-amber-500/20">
            <p className="text-sm text-amber-300 font-medium">⚡ Grundregel:</p>
            <p className="text-sm text-slate-300 mt-1">
              <strong>Ereignis → Funktion → Ereignis → Funktion → ...</strong>
              <br />
              Ereignisse und Funktionen wechseln sich IMMER ab. Nie zwei Funktionen oder zwei Ereignisse direkt hintereinander!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
