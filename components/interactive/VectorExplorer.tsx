"use client";

import { useState, useRef, useCallback } from "react";

interface VectorExplorerProps {
  className?: string;
}

/**
 * Interaktiver Vektor-Explorer — Vektoren per Drag, Skalarprodukt live
 */
export function VectorExplorer({ className = "" }: VectorExplorerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vecA, setVecA] = useState({ x: 3, y: 2 });
  const [vecB, setVecB] = useState({ x: 1, y: 4 });
  const [dragging, setDragging] = useState<"a" | "b" | null>(null);

  const W = 420, H = 420;
  const pad = 40;
  const plotW = W - 2 * pad;
  const plotH = H - 2 * pad;
  const xRange: [number, number] = [-5, 5];
  const yRange: [number, number] = [-5, 5];

  const scaleX = (x: number) => pad + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const scaleY = (y: number) => pad + plotH - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotH;
  const unscaleX = (sx: number) => xRange[0] + ((sx - pad) / plotW) * (xRange[1] - xRange[0]);
  const unscaleY = (sy: number) => yRange[0] + ((pad + plotH - sy) / plotH) * (yRange[1] - yRange[0]);

  // Berechnungen
  const dotProduct = vecA.x * vecB.x + vecA.y * vecB.y;
  const magA = Math.sqrt(vecA.x * vecA.x + vecA.y * vecA.y);
  const magB = Math.sqrt(vecB.x * vecB.x + vecB.y * vecB.y);
  const cosAngle = magA > 0 && magB > 0 ? dotProduct / (magA * magB) : 0;
  const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
  const crossProduct2D = vecA.x * vecB.y - vecA.y * vecB.x; // z-Komponente

  const handlePointerDown = useCallback((e: React.PointerEvent, which: "a" | "b") => {
    setDragging(which);
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const svgY = ((e.clientY - rect.top) / rect.height) * H;
    const x = Math.round(unscaleX(svgX) * 2) / 2; // Snap to 0.5
    const y = Math.round(unscaleY(svgY) * 2) / 2;
    const clampedX = Math.max(-5, Math.min(5, x));
    const clampedY = Math.max(-5, Math.min(5, y));
    if (dragging === "a") setVecA({ x: clampedX, y: clampedY });
    else setVecB({ x: clampedX, y: clampedY });
  }, [dragging]);

  const handlePointerUp = useCallback(() => setDragging(null), []);

  // Grid
  const gridLines: JSX.Element[] = [];
  for (let x = Math.ceil(xRange[0]); x <= Math.floor(xRange[1]); x++) {
    gridLines.push(<line key={`gx-${x}`} x1={scaleX(x)} y1={pad} x2={scaleX(x)} y2={pad + plotH} stroke="#1e293b" strokeWidth="1" />);
    if (x !== 0) gridLines.push(<text key={`lx-${x}`} x={scaleX(x)} y={scaleY(0) + 16} fill="#64748b" fontSize="10" textAnchor="middle">{x}</text>);
  }
  for (let y = Math.ceil(yRange[0]); y <= Math.floor(yRange[1]); y++) {
    gridLines.push(<line key={`gy-${y}`} x1={pad} y1={scaleY(y)} x2={pad + plotW} y2={scaleY(y)} stroke="#1e293b" strokeWidth="1" />);
    if (y !== 0) gridLines.push(<text key={`ly-${y}`} x={scaleX(0) - 10} y={scaleY(y) + 4} fill="#64748b" fontSize="10" textAnchor="end">{y}</text>);
  }

  const originX = scaleX(0);
  const originY = scaleY(0);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <span className="text-xl font-bold text-cyan-400">↔️ Vektor-Explorer — Interaktiv</span>
        <p className="text-sm text-slate-400 mt-1">Ziehe die Vektor-Pfeile</p>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-2 border border-slate-700/50">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-grab active:cursor-grabbing"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Grid */}
          {gridLines}

          {/* Achsen */}
          <line x1={pad} y1={originY} x2={pad + plotW} y2={originY} stroke="#475569" strokeWidth="1.5" />
          <line x1={originX} y1={pad} x2={originX} y2={pad + plotH} stroke="#475569" strokeWidth="1.5" />

          {/* Vektor A */}
          <g onPointerDown={(e) => handlePointerDown(e, "a")}>
            {/* Komponenten (gestrichelt) */}
            <line x1={originX} y1={originY} x2={scaleX(vecA.x)} y2={originY} stroke="#818cf8" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <line x1={scaleX(vecA.x)} y1={originY} x2={scaleX(vecA.x)} y2={scaleY(vecA.y)} stroke="#818cf8" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            {/* Pfeil */}
            <line x1={originX} y1={originY} x2={scaleX(vecA.x)} y2={scaleY(vecA.y)} stroke="#818cf8" strokeWidth="3" />
            <circle cx={scaleX(vecA.x)} cy={scaleY(vecA.y)} r={dragging === "a" ? 12 : 8} fill="#818cf8" stroke="#fff" strokeWidth="2" />
            <text x={scaleX(vecA.x) + 12} y={scaleY(vecA.y) - 8} fill="#818cf8" fontSize="14" fontWeight="bold">
              a⃗ ({vecA.x}, {vecA.y})
            </text>
          </g>

          {/* Vektor B */}
          <g onPointerDown={(e) => handlePointerDown(e, "b")}>
            <line x1={originX} y1={originY} x2={scaleX(vecB.x)} y2={originY} stroke="#f472b6" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <line x1={scaleX(vecB.x)} y1={originY} x2={scaleX(vecB.x)} y2={scaleY(vecB.y)} stroke="#f472b6" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <line x1={originX} y1={originY} x2={scaleX(vecB.x)} y2={scaleY(vecB.y)} stroke="#f472b6" strokeWidth="3" />
            <circle cx={scaleX(vecB.x)} cy={scaleY(vecB.y)} r={dragging === "b" ? 12 : 8} fill="#f472b6" stroke="#fff" strokeWidth="2" />
            <text x={scaleX(vecB.x) + 12} y={scaleY(vecB.y) - 8} fill="#f472b6" fontSize="14" fontWeight="bold">
              b⃗ ({vecB.x}, {vecB.y})
            </text>
          </g>

          {/* Winkel zwischen Vektoren */}
          {magA > 0.5 && magB > 0.5 && (
            <text x={originX + 20} y={originY - 10} fill="#f59e0b" fontSize="12" fontWeight="bold">
              α = {angleDeg.toFixed(1)}°
            </text>
          )}
        </svg>
      </div>

      {/* Ergebnisse */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ResultCard label="a⃗ · b⃗" value={dotProduct.toFixed(1)} color="#f59e0b" />
        <ResultCard label="|a⃗|" value={magA.toFixed(2)} color="#818cf8" />
        <ResultCard label="|b⃗|" value={magB.toFixed(2)} color="#f472b6" />
        <ResultCard label="Winkel α" value={`${angleDeg.toFixed(1)}°`} color="#34d399" />
      </div>

      {/* Orthogonal-Check */}
      <div className={`rounded-lg p-3 text-center text-sm font-medium ${Math.abs(dotProduct) < 0.1 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-slate-800/30 text-slate-400"}`}>
        {Math.abs(dotProduct) < 0.1
          ? "✅ a⃗ und b⃗ sind orthogonal! (Skalarprodukt ≈ 0)"
          : `Skalarprodukt = ${dotProduct.toFixed(1)} — nicht orthogonal`}
      </div>

      {/* Erklärung */}
      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <p>🔵 <strong className="text-indigo-400">Skalarprodukt</strong> — a⃗ · b⃗ = a₁b₁ + a₂b₂</p>
        <p>📏 <strong className="text-green-400">Betrag</strong> — |a⃗| = √(a₁² + a₂²)</p>
        <p>💡 Wenn das Skalarprodukt = 0 → die Vektoren stehen senkrecht aufeinander!</p>
      </div>
    </div>
  );
}

function ResultCard({ label, value, color }: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 text-center">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-mono font-bold" style={{ color }}>{value}</div>
    </div>
  );
}
