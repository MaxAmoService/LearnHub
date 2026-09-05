"use client";

import { useState, useRef, useCallback } from "react";
import { RotateCcw, Lightbulb, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Point {
  id: "quality" | "budget" | "time";
  label: string;
  emoji: string;
  color: string;
  value: number; // 0-100
  x: number; // normalized 0-1
  y: number;
}

interface Scenario {
  title: string;
  description: string;
  changes: Partial<Record<Point["id"], number>>;
  explanation: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCENARIOS: Scenario[] = [
  {
    title: "Budget gestrichen",
    description: "Der Auftraggeber kürzt das Budget um 30%.",
    changes: { budget: 30 },
    explanation:
      "Weniger Budget bedeutent: Entweder Qualität senken (schlechtere Materialien, weniger Tests) oder Zeit verlängern (weniger externe Entwickler).",
  },
  {
    title: "Deadline vorgezogen",
    description: "Das Release muss 4 Wochen früher fertig sein.",
    changes: { time: 35 },
    explanation:
      "Kürzere Zeit = mehr Budget für Überstunden/Externe ODER Features streichen (Qualität).",
  },
  {
    title: "Qualität muss steigen",
    description: "Sicherheitsaudit fordert höhere Code-Qualität.",
    changes: { quality: 85 },
    explanation:
      "Höhere Qualität = mehr Zeit für Reviews/Tests ODER mehr Budget für Experten.",
  },
  {
    title: "Mitarbeiter fällt aus",
    description: "Lead-Entwickler ist 3 Wochen krank.",
    changes: { budget: 50, time: 40 },
    explanation:
      "Weniger Ressourcen = Budget für Ersatz ODER Zeit verlängern. Qualität leidet sonst.",
  },
];

const TRIANGLE_POINTS = {
  quality: { x: 0.5, y: 0.08 },
  budget: { x: 0.08, y: 0.92 },
  time: { x: 0.92, y: 0.92 },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MagicTriangle() {
  const [points, setPoints] = useState<Point[]>([
    { id: "quality", label: "Qualität", emoji: "✅", color: "#3b82f6", value: 70, ...TRIANGLE_POINTS.quality },
    { id: "budget", label: "Budget", emoji: "💰", color: "#f59e0b", value: 70, ...TRIANGLE_POINTS.budget },
    { id: "time", label: "Zeit", emoji: "⏰", color: "#10b981", value: 70, ...TRIANGLE_POINTS.time },
  ]);

  const [dragging, setDragging] = useState<Point["id"] | null>(null);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const getPoint = (id: Point["id"]) => points.find((p) => p.id === id)!;

  const updateValue = useCallback((id: Point["id"], newValue: number) => {
    setPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: Math.max(10, Math.min(100, newValue)) } : p))
    );
  }, []);

  const handlePointerDown = useCallback((id: Point["id"]) => {
    setDragging(id);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const value = Math.round(y * 100);
      updateValue(dragging, value);
    },
    [dragging, updateValue]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const applyScenario = (scenario: Scenario, index: number) => {
    setActiveScenario(index);
    setShowExplanation(false);
    setPoints((prev) =>
      prev.map((p) => {
        const target = scenario.changes[p.id];
        if (target !== undefined) return { ...p, value: target };
        return p;
      })
    );
    setTimeout(() => setShowExplanation(true), 500);
  };

  const reset = () => {
    setPoints((prev) => prev.map((p) => ({ ...p, value: 70 })));
    setActiveScenario(null);
    setShowExplanation(false);
  };

  // SVG coordinate helpers
  const svgSize = 400;
  const padding = 60;
  const toSvg = (nx: number, ny: number) => ({
    cx: padding + nx * (svgSize - 2 * padding),
    cy: padding + (1 - ny) * (svgSize - 2 * padding),
  });

  const qualityPos = toSvg(0.5, points[0].value / 100);
  const budgetPos = toSvg(0.08, points[1].value / 100);
  const timePos = toSvg(0.92, points[2].value / 100);

  return (
    <div className="space-y-6">
      {/* SVG Triangle */}
      <div className="flex justify-center">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="w-full max-w-md select-none touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Background triangle */}
          <polygon
            points={`${qualityPos.cx},${qualityPos.cy} ${budgetPos.cx},${budgetPos.cy} ${timePos.cx},${timePos.cy}`}
            fill="url(#triangleGrad)"
            stroke="#475569"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Connection lines to center */}
          {points.map((p) => {
            const pos = toSvg(TRIANGLE_POINTS[p.id].x, p.value / 100);
            return (
              <line
                key={`line-${p.id}`}
                x1={svgSize / 2}
                y1={svgSize / 2}
                x2={pos.cx}
                y2={pos.cy}
                stroke={p.color}
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.4"
              />
            );
          })}

          {/* Center label */}
          <text x={svgSize / 2} y={svgSize / 2 - 8} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
            Spannungs-
          </text>
          <text x={svgSize / 2} y={svgSize / 2 + 8} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
            feld
          </text>

          {/* Draggable points */}
          {points.map((p) => {
            const pos = toSvg(TRIANGLE_POINTS[p.id].x, p.value / 100);
            return (
              <g
                key={p.id}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handlePointerDown(p.id);
                }}
                style={{ cursor: "grab" }}
              >
                <circle cx={pos.cx} cy={pos.cy} r="32" fill="#1e293b" stroke={p.color} strokeWidth="2.5" />
                <text x={pos.cx} y={pos.cy - 6} textAnchor="middle" fill={p.color} fontSize="16">
                  {p.emoji}
                </text>
                <text x={pos.cx} y={pos.cy + 12} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                  {p.value}%
                </text>
              </g>
            );
          })}

          {/* Labels outside */}
          <text x={qualityPos.cx} y={qualityPos.cy - 42} textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">
            Qualität
          </text>
          <text x={budgetPos.cx - 10} y={budgetPos.cy + 48} textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="bold">
            Budget
          </text>
          <text x={timePos.cx + 10} y={timePos.cy + 48} textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">
            Zeit
          </text>
        </svg>
      </div>

      {/* Value sliders */}
      <div className="grid grid-cols-3 gap-3">
        {points.map((p) => (
          <div key={p.id} className="glass rounded-lg p-3 text-center">
            <div className="text-sm font-medium mb-1" style={{ color: p.color }}>
              {p.emoji} {p.label}
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={p.value}
              onChange={(e) => updateValue(p.id, parseInt(e.target.value))}
              className="w-full accent-blue-500"
              style={{ accentColor: p.color }}
            />
            <div className="text-lg font-bold text-white mt-1">{p.value}%</div>
          </div>
        ))}
      </div>

      {/* Scenarios */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Szenarien ausprobieren</h3>
        <div className="grid grid-cols-2 gap-2">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => applyScenario(s, i)}
              className={`text-left p-3 rounded-lg border transition-all text-sm ${
                activeScenario === i
                  ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                  : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600"
              }`}
            >
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && activeScenario !== null && (
        <div className="glass rounded-lg p-4 border border-blue-500/30 bg-blue-500/5 animate-fade-in">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-300 font-medium mb-1">Lösungsansatz</p>
              <p className="text-sm text-slate-300">{SCENARIOS[activeScenario].explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Reset */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Zurücksetzen
        </button>
      </div>

      {/* IHK Tip */}
      <div className="glass rounded-lg p-4 border border-purple-500/30 bg-purple-500/5">
        <p className="text-sm text-purple-300">
          <strong>IHK-Tipp:</strong> Das Magische Dreieck kommt oft in Prüfungen! Erkläre immer: Wenn sich ein Eckpunkt
          ändern, muss mindestens ein anderer kompensieren. Nenne konkrete Beispiele.
        </p>
      </div>
    </div>
  );
}
