"use client";
import { useState, useRef, useCallback } from "react";

interface ComplexPoint {
  x: number;
  y: number;
  label: string;
  color?: string;
}

const EXAMPLES: ComplexPoint[] = [
  { x: 3, y: 2, label: "3 + 2j", color: "#818cf8" },
  { x: -2, y: 4, label: "-2 + 4j", color: "#f472b6" },
  { x: -3, y: -1, label: "-3 - j", color: "#34d399" },
  { x: 4, y: -3, label: "4 - 3j", color: "#fbbf24" },
  { x: 5, y: 0, label: "5", color: "#f87171" },
  { x: 0, y: -4, label: "-4j", color: "#a78bfa" },
  { x: 1, y: 1, label: "1 + j", color: "#2dd4bf" },
  { x: -2, y: 2, label: "-2 + 2j", color: "#fb923c" },
];

const SCALE = 40; // pixels per unit
const SIZE = 320; // half-size of the SVG

export function ComplexPlaneViewer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [clickedPoint, setClickedPoint] = useState<{ x: number; y: number } | null>(null);
  const [showExamples, setShowExamples] = useState(true);
  const [hiddenExamples, setHiddenExamples] = useState<Set<number>>(new Set());

  const toSvg = useCallback((cx: number, cy: number) => ({
    sx: SIZE + cx * SCALE,
    sy: SIZE - cy * SCALE,
  }), []);

  const fromSvg = useCallback((sx: number, sy: number) => ({
    x: (sx - SIZE) / SCALE,
    y: -(sy - SIZE) / SCALE,
  }), []);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * (SIZE * 2);
    const sy = ((e.clientY - rect.top) / rect.height) * (SIZE * 2);
    const { x, y } = fromSvg(sx, sy);
    setClickedPoint({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  }, [fromSvg]);

  const toggleExample = (i: number) => {
    setHiddenExamples((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const betrag = (x: number, y: number) => Math.sqrt(x * x + y * y);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SVG Plane */}
        <div className="flex-shrink-0">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SIZE * 2} ${SIZE * 2}`}
            width={SIZE * 2}
            height={SIZE * 2}
            className="w-full max-w-[640px] aspect-square bg-slate-900/50 rounded-xl border border-slate-700/50 cursor-crosshair"
            onClick={handleClick}
          >
            {/* Grid lines */}
            {Array.from({ length: 17 }, (_, i) => i - 8).map((v) => (
              <g key={`grid-${v}`}>
                <line
                  x1={toSvg(v, 0).sx}
                  y1={0}
                  x2={toSvg(v, 0).sx}
                  y2={SIZE * 2}
                  stroke="#334155"
                  strokeWidth={v === 0 ? 2 : 0.5}
                />
                <line
                  x1={0}
                  y1={toSvg(0, v).sy}
                  x2={SIZE * 2}
                  y2={toSvg(0, v).sy}
                  stroke="#334155"
                  strokeWidth={v === 0 ? 2 : 0.5}
                />
                {/* Axis labels */}
                {v !== 0 && (
                  <>
                    <text
                      x={toSvg(v, 0).sx}
                      y={toSvg(0, 0).sy + 16}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize={11}
                    >
                      {v}
                    </text>
                    <text
                      x={toSvg(0, 0).sx - 12}
                      y={toSvg(0, v).sy + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize={11}
                    >
                      {v}j
                    </text>
                  </>
                )}
              </g>
            ))}

            {/* Axis labels */}
            <text x={SIZE * 2 - 20} y={SIZE - 8} fill="#cbd5e1" fontSize={13} fontWeight="bold">
              Re
            </text>
            <text x={SIZE + 8} y={20} fill="#cbd5e1" fontSize={13} fontWeight="bold">
              Im
            </text>

            {/* Example points */}
            {showExamples &&
              EXAMPLES.map((pt, i) => {
                if (hiddenExamples.has(i)) return null;
                const { sx, sy } = toSvg(pt.x, pt.y);
                return (
                  <g key={i}>
                    <line
                      x1={SIZE}
                      y1={SIZE}
                      x2={sx}
                      y2={sy}
                      stroke={pt.color}
                      strokeWidth={1.5}
                      strokeDasharray="4 3"
                      opacity={0.5}
                    />
                    <circle cx={sx} cy={sy} r={6} fill={pt.color} opacity={0.9} />
                    <text
                      x={sx + 10}
                      y={sy - 10}
                      fill={pt.color}
                      fontSize={13}
                      fontWeight="bold"
                    >
                      {pt.label}
                    </text>
                    {/* Betrag label */}
                    <text
                      x={(SIZE + sx) / 2 + 8}
                      y={(SIZE + sy) / 2 - 6}
                      fill={pt.color}
                      fontSize={10}
                      opacity={0.7}
                    >
                      |z|={betrag(pt.x, pt.y).toFixed(1)}
                    </text>
                  </g>
                );
              })}

            {/* Clicked point */}
            {clickedPoint && (() => {
              const { sx, sy } = toSvg(clickedPoint.x, clickedPoint.y);
              return (
                <g>
                  <line
                    x1={SIZE}
                    y1={SIZE}
                    x2={sx}
                    y2={sy}
                    stroke="#22d3ee"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                  />
                  <circle cx={sx} cy={sy} r={8} fill="none" stroke="#22d3ee" strokeWidth={2} />
                  <circle cx={sx} cy={sy} r={3} fill="#22d3ee" />
                  <text x={sx + 12} y={sy - 12} fill="#22d3ee" fontSize={14} fontWeight="bold">
                    {clickedPoint.x} {clickedPoint.y >= 0 ? "+" : ""} {clickedPoint.y}j
                  </text>
                  <text x={sx + 12} y={sy + 6} fill="#22d3ee" fontSize={11} opacity={0.8}>
                    |z| = {betrag(clickedPoint.x, clickedPoint.y).toFixed(2)}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="flex-1 space-y-3 min-w-[220px]">
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">🎯 Klick auf die Ebene</h4>
            <p className="text-xs text-slate-400">
              Klicke auf die Gaußsche Zahlenebene, um die komplexe Zahl abzulesen.
            </p>
          </div>

          {clickedPoint && (
            <div className="p-4 bg-cyan-900/20 rounded-xl border border-cyan-700/30">
              <p className="text-cyan-300 font-mono text-lg font-bold">
                z = {clickedPoint.x} {clickedPoint.y >= 0 ? "+" : ""} {clickedPoint.y}j
              </p>
              <p className="text-cyan-400 text-sm mt-1">
                Re(z) = {clickedPoint.x}, Im(z) = {clickedPoint.y}
              </p>
              <p className="text-cyan-400 text-sm">
                |z| = {betrag(clickedPoint.x, clickedPoint.y).toFixed(3)}
              </p>
            </div>
          )}

          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-300">📋 Beispiele</h4>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400 hover:text-slate-200 transition"
              >
                {showExamples ? "Verbergen" : "Anzeigen"}
              </button>
            </div>
            <div className="space-y-1">
              {EXAMPLES.map((pt, i) => (
                <button
                  key={i}
                  onClick={() => toggleExample(i)}
                  className={`flex items-center gap-2 w-full text-left text-xs px-2 py-1 rounded transition ${
                    hiddenExamples.has(i)
                      ? "text-slate-500 line-through"
                      : "text-slate-300 hover:bg-slate-700/30"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: pt.color, opacity: hiddenExamples.has(i) ? 0.3 : 1 }}
                  />
                  {pt.label} → ({pt.x}, {pt.y}) → |z| = {betrag(pt.x, pt.y).toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
