"use client";

import { useState, useCallback } from "react";

interface IntegralExplorerProps {
  className?: string;
}

/**
 * Interaktiver Integrations-Explorer
 * Rechtecke unter der Kurve — n anpassbar
 */
export function IntegralExplorer({ className = "" }: IntegralExplorerProps) {
  const [n, setN] = useState(4);
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);

  // f(x) = x²
  const fn = (x: number) => x * x;
  const antideriv = (x: number) => (x * x * x) / 3;
  const exactValue = antideriv(b) - antideriv(a);

  // SVG Setup
  const W = 500, H = 360;
  const pad = 45;
  const plotW = W - 2 * pad;
  const plotH = H - 2 * pad;
  const xRange: [number, number] = [-0.5, 3];
  const yRange: [number, number] = [-0.5, 5];

  const scaleX = (x: number) => pad + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const scaleY = (y: number) => pad + plotH - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotH;

  // Rechtecke berechnen (Mitte-Regel)
  const dx = (b - a) / n;
  let riemannSum = 0;
  const rects: { x: number; y: number; w: number; h: number; mid: number }[] = [];
  for (let i = 0; i < n; i++) {
    const xLeft = a + i * dx;
    const xMid = xLeft + dx / 2;
    const yMid = fn(xMid);
    riemannSum += yMid * dx;
    rects.push({
      x: xLeft,
      y: 0,
      w: dx,
      h: yMid,
      mid: xMid,
    });
  }

  const error = Math.abs(riemannSum - exactValue);
  const errorPct = exactValue > 0 ? (error / exactValue) * 100 : 0;

  // Generate function path
  const generatePath = useCallback(() => {
    const steps = 150;
    const dxPath = (xRange[1] - xRange[0]) / steps;
    let path = "";
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const x = xRange[0] + i * dxPath;
      const y = fn(x);
      if (!isFinite(y) || Math.abs(y) > 50) { started = false; continue; }
      const sx = scaleX(x);
      const sy = scaleY(y);
      if (!started) { path += `M ${sx},${sy}`; started = true; }
      else path += ` L ${sx},${sy}`;
    }
    return path;
  }, []);

  // Fill area path (exact)
  const generateFillPath = useCallback(() => {
    const steps = 80;
    const dxF = (b - a) / steps;
    let path = `M ${scaleX(a)},${scaleY(0)}`;
    for (let i = 0; i <= steps; i++) {
      const x = a + i * dxF;
      path += ` L ${scaleX(x)},${scaleY(fn(x))}`;
    }
    path += ` L ${scaleX(b)},${scaleY(0)} Z`;
    return path;
  }, [a, b]);

  // Grid
  const gridLines: JSX.Element[] = [];
  for (let x = 0; x <= 3; x++) {
    gridLines.push(<line key={`gx-${x}`} x1={scaleX(x)} y1={pad} x2={scaleX(x)} y2={pad + plotH} stroke="#1e293b" strokeWidth="1" />);
    if (x !== 0) gridLines.push(<text key={`lx-${x}`} x={scaleX(x)} y={scaleY(0) + 16} fill="#64748b" fontSize="10" textAnchor="middle">{x}</text>);
  }
  for (let y = 0; y <= 4; y++) {
    gridLines.push(<line key={`gy-${y}`} x1={pad} y1={scaleY(y)} x2={pad + plotW} y2={scaleY(y)} stroke="#1e293b" strokeWidth="1" />);
    if (y !== 0) gridLines.push(<text key={`ly-${y}`} x={scaleX(0) - 10} y={scaleY(y) + 4} fill="#64748b" fontSize="10" textAnchor="end">{y}</text>);
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <span className="text-xl font-mono font-bold text-amber-400">∫₀² x² dx</span>
        <p className="text-sm text-slate-400 mt-1">Wie nähern wir die Fläche mit Rechtecken an?</p>
      </div>

      {/* Graph */}
      <div className="bg-slate-900/50 rounded-xl p-2 border border-slate-700/50">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Integrations-Explorer">
          {/* Grid */}
          {gridLines}

          {/* Achsen */}
          <line x1={pad} y1={scaleY(0)} x2={pad + plotW} y2={scaleY(0)} stroke="#475569" strokeWidth="1.5" />
          <line x1={scaleX(0)} y1={pad} x2={scaleX(0)} y2={pad + plotH} stroke="#475569" strokeWidth="1.5" />

          {/* Exakte Fläche */}
          <path d={generateFillPath()} fill="rgba(129,140,248,0.15)" />

          {/* Rechtecke */}
          {rects.map((r, i) => (
            <rect
              key={`rect-${i}`}
              x={scaleX(r.x)}
              y={scaleY(r.h)}
              width={scaleX(r.x + r.w) - scaleX(r.x)}
              height={scaleY(0) - scaleY(r.h)}
              fill="rgba(245,158,11,0.25)"
              stroke="#f59e0b"
              strokeWidth="1"
            />
          ))}

          {/* Funktion */}
          <path d={generatePath()} fill="none" stroke="#818cf8" strokeWidth="2.5" />

          {/* Integrationsgrenzen */}
          <line x1={scaleX(a)} y1={scaleY(0)} x2={scaleX(a)} y2={scaleY(fn(a))} stroke="#34d399" strokeWidth="2" strokeDasharray="4,4" />
          <line x1={scaleX(b)} y1={scaleY(0)} x2={scaleX(b)} y2={scaleY(fn(b))} stroke="#34d399" strokeWidth="2" strokeDasharray="4,4" />
          <text x={scaleX(a)} y={scaleY(0) + 24} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">a={a}</text>
          <text x={scaleX(b)} y={scaleY(0) + 24} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">b={b}</text>

          {/* Beschriftung */}
          <text x={W / 2} y={pad + 16} fill="#94a3b8" fontSize="12" textAnchor="middle">
            f(x) = x²
          </text>
        </svg>
      </div>

      {/* n Slider */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Anzahl Rechtecke (n)</span>
          <span className="text-2xl font-mono font-bold text-amber-400">{n}</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: "linear-gradient(to right, #f59e0b33, #f59e0b)",
            accentColor: "#f59e0b",
          }}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>1</span>
          <span>10</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* Ergebnis */}
      <div className="grid grid-cols-3 gap-3">
        <ResultCard label="Rechtecke" value={riemannSum.toFixed(4)} color="#f59e0b" />
        <ResultCard label="Exakt" value={exactValue.toFixed(4)} color="#818cf8" />
        <ResultCard label="Fehler" value={`${errorPct.toFixed(1)}%`} color={errorPct < 1 ? "#34d399" : errorPct < 5 ? "#f59e0b" : "#ef4444"} />
      </div>

      {/* Erklärung */}
      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <p>📐 <strong className="text-amber-400">Riemann-Summe</strong> — n Rechtecke approximieren die Fläche</p>
        <p>🔮 <strong className="text-indigo-400">Grenzwert</strong> — je mehr Rechtecke, desto genauer → exaktes Integral</p>
        <p>💡 Bei n = 50 ist der Fehler unter 1%! Probiere mal n = 1 vs n = 50</p>
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
