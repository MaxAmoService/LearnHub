"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface TangentExplorerProps {
  className?: string;
  fnStr?: string;
}

/**
 * Interaktiver Ableitungs-Explorer
 * Punkt auf dem Graphen ziehen → Tangente + Steigung live
 */
export function TangentExplorer({ className = "" }: TangentExplorerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pointX, setPointX] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // f(x) = x³ - 3x + 1 — interessante Kurve mit Extrema
  const fn = (x: number) => x * x * x - 3 * x + 1;
  const fnDeriv = (x: number) => 3 * x * x - 3;
  const fnDeriv2 = (x: number) => 6 * x;

  const pointY = fn(pointX);
  const slope = fnDeriv(pointX);
  const curvature = fnDeriv2(pointX);

  // SVG Setup
  const W = 500, H = 380;
  const pad = 45;
  const plotW = W - 2 * pad;
  const plotH = H - 2 * pad;
  const xRange: [number, number] = [-3, 3];
  const yRange: [number, number] = [-5, 5];

  const scaleX = (x: number) => pad + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const scaleY = (y: number) => pad + plotH - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotH;
  const unscaleX = (sx: number) => xRange[0] + ((sx - pad) / plotW) * (xRange[1] - xRange[0]);

  // Drag handling
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const x = Math.max(xRange[0] + 0.1, Math.min(xRange[1] - 0.1, unscaleX(svgX)));
    setPointX(x);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  // Generate function path
  const generatePath = useCallback(() => {
    const steps = 200;
    const dx = (xRange[1] - xRange[0]) / steps;
    let path = "";
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const x = xRange[0] + i * dx;
      const y = fn(x);
      if (!isFinite(y) || Math.abs(y) > 50) { started = false; continue; }
      const sx = scaleX(x);
      const sy = scaleY(y);
      if (!started) { path += `M ${sx},${sy}`; started = true; }
      else path += ` L ${sx},${sy}`;
    }
    return path;
  }, []);

  // Tangent line
  const tangentLen = 1.5;
  const tx1 = pointX - tangentLen;
  const ty1 = pointY + slope * (-tangentLen);
  const tx2 = pointX + tangentLen;
  const ty2 = pointY + slope * tangentLen;

  // Extrema berechnen
  const criticalPoints: { x: number; y: number; type: string }[] = [];
  // f'(x) = 3x² - 3 = 0 → x = ±1
  const cp1x = -1, cp2x = 1;
  if (cp1x >= xRange[0] && cp1x <= xRange[1]) {
    criticalPoints.push({ x: cp1x, y: fn(cp1x), type: fnDeriv2(cp1x) > 0 ? "Minimum" : "Maximum" });
  }
  if (cp2x >= xRange[0] && cp2x <= xRange[1]) {
    criticalPoints.push({ x: cp2x, y: fn(cp2x), type: fnDeriv2(cp2x) > 0 ? "Minimum" : "Maximum" });
  }

  // Wendepunkt: f''(x) = 6x = 0 → x = 0
  const inflectionX = 0;
  const inflectionY = fn(inflectionX);

  // Steigungstext
  const slopeText = slope === 0 ? "0" : slope > 0 ? `+${slope.toFixed(2)}` : slope.toFixed(2);
  const slopeType = Math.abs(slope) < 0.1 ? "≈ waagerecht" : slope > 0 ? "steigend ↗" : "fallend ↘";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <span className="text-xl font-mono font-bold text-purple-400">f(x) = x³ − 3x + 1</span>
        <p className="text-sm text-slate-400 mt-1">Ziehe den Punkt entlang der Kurve</p>
      </div>

      {/* Graph */}
      <div className="bg-slate-900/50 rounded-xl p-2 border border-slate-700/50">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-grab active:cursor-grabbing"
          role="img"
          aria-label="Tangenten-Explorer"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Grid */}
          {[-3, -2, -1, 1, 2, 3].map(x => (
            <line key={`gx-${x}`} x1={scaleX(x)} y1={pad} x2={scaleX(x)} y2={pad + plotH} stroke="#1e293b" strokeWidth="1" />
          ))}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map(y => (
            <line key={`gy-${y}`} x1={pad} y1={scaleY(y)} x2={pad + plotW} y2={scaleY(y)} stroke="#1e293b" strokeWidth="1" />
          ))}

          {/* Achsen */}
          <line x1={pad} y1={scaleY(0)} x2={pad + plotW} y2={scaleY(0)} stroke="#475569" strokeWidth="1.5" />
          <line x1={scaleX(0)} y1={pad} x2={scaleX(0)} y2={pad + plotH} stroke="#475569" strokeWidth="1.5" />

          {/* Achsenbeschriftungen */}
          {[-2, -1, 1, 2].map(x => (
            <text key={`lx-${x}`} x={scaleX(x)} y={scaleY(0) + 16} fill="#64748b" fontSize="10" textAnchor="middle">{x}</text>
          ))}
          {[-4, -2, 2, 4].map(y => (
            <text key={`ly-${y}`} x={scaleX(0) - 10} y={scaleY(y) + 4} fill="#64748b" fontSize="10" textAnchor="end">{y}</text>
          ))}

          {/* Funktion */}
          <path d={generatePath()} fill="none" stroke="#818cf8" strokeWidth="2.5" />

          {/* Tangente */}
          <line
            x1={scaleX(tx1)} y1={scaleY(ty1)}
            x2={scaleX(tx2)} y2={scaleY(ty2)}
            stroke="#f59e0b" strokeWidth="2"
            opacity={0.9}
          />

          {/* Extrema */}
          {criticalPoints.map((cp, i) => (
            <g key={`cp-${i}`}>
              <circle cx={scaleX(cp.x)} cy={scaleY(cp.y)} r="4" fill="#34d399" />
              <text x={scaleX(cp.x)} y={scaleY(cp.y) - 12} fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                {cp.type} ({cp.x}, {cp.y.toFixed(1)})
              </text>
            </g>
          ))}

          {/* Wendepunkt */}
          <circle cx={scaleX(inflectionX)} cy={scaleY(inflectionY)} r="4" fill="#f472b6" />
          <text x={scaleX(inflectionX)} y={scaleY(inflectionY) - 12} fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">
            Wendepunkt
          </text>

          {/* Ziehpunkt */}
          <circle
            cx={scaleX(pointX)} cy={scaleY(pointY)}
            r={isDragging ? 10 : 7}
            fill="#f59e0b"
            stroke="#fff"
            strokeWidth="2"
            className="transition-all"
          />

          {/* Steigung Label */}
          <text x={scaleX(pointX) + 15} y={scaleY(pointY) - 15} fill="#f59e0b" fontSize="13" fontWeight="bold">
            f'({pointX.toFixed(1)}) = {slopeText}
          </text>
        </svg>
      </div>

      {/* Info-Panel */}
      <div className="grid grid-cols-3 gap-3">
        <InfoCard label="x-Wert" value={pointX.toFixed(2)} color="#818cf8" />
        <InfoCard label="f(x)" value={pointY.toFixed(2)} color="#818cf8" />
        <InfoCard label="f'(x)" value={slopeText} sub={slopeType} color="#f59e0b" />
      </div>

      {/* Erklärung */}
      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <p>🟡 <strong className="text-yellow-400">Tangente</strong> — zeigt die momentane Steigung am Punkt</p>
        <p>🟢 <strong className="text-green-400">Extrema</strong> — f&apos;(x) = 0 → hier ist die Tangente waagerecht</p>
        <p>🩷 <strong className="text-pink-400">Wendepunkt</strong> — f&apos;&apos;(x) = 0 → Krümmung ändert sich</p>
      </div>
    </div>
  );
}

function InfoCard({ label, value, sub, color }: {
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 text-center">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-mono font-bold" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}
