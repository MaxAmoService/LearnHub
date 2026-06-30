"use client";

import { useState, useCallback } from "react";

interface FunctionExplorerProps {
  className?: string;
}

/**
 * Interaktiver Funktionen-Explorer mit Sliders
 * f(x) = ax² + bx + c — live anpassbar
 */
export function FunctionExplorer({ className = "" }: FunctionExplorerProps) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(1);

  const fn = (x: number) => a * x * x + b * x + c;
  const fnDeriv = (x: number) => 2 * a * x + b;

  // SVG Setup
  const W = 500, H = 360;
  const pad = 45;
  const plotW = W - 2 * pad;
  const plotH = H - 2 * pad;
  const xRange: [number, number] = [-5, 5];
  const yRange: [number, number] = [-6, 8];

  const scaleX = (x: number) => pad + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const scaleY = (y: number) => pad + plotH - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotH;

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
  }, [a, b, c]);

  // Grid lines
  const gridLines: JSX.Element[] = [];
  for (let x = Math.ceil(xRange[0]); x <= Math.floor(xRange[1]); x++) {
    gridLines.push(<line key={`gx-${x}`} x1={scaleX(x)} y1={pad} x2={scaleX(x)} y2={pad + plotH} stroke="#1e293b" strokeWidth="1" />);
    if (x !== 0) gridLines.push(<text key={`lx-${x}`} x={scaleX(x)} y={scaleY(0) + 16} fill="#64748b" fontSize="10" textAnchor="middle">{x}</text>);
  }
  for (let y = Math.ceil(yRange[0]); y <= Math.floor(yRange[1]); y++) {
    gridLines.push(<line key={`gy-${y}`} x1={pad} y1={scaleY(y)} x2={pad + plotW} y2={scaleY(y)} stroke="#1e293b" strokeWidth="1" />);
    if (y !== 0) gridLines.push(<text key={`ly-${y}`} x={scaleX(0) - 10} y={scaleY(y) + 4} fill="#64748b" fontSize="10" textAnchor="end">{y}</text>);
  }

  // Scheitelpunkt berechnen
  const vertexX = -b / (2 * a);
  const vertexY = fn(vertexX);
  const vertexLabel = `Scheitel (${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`;

  // Nullstellen berechnen
  const disc = b * b - 4 * a * c;
  const roots: { x: number; y: number }[] = [];
  if (disc >= 0) {
    const r1 = (-b + Math.sqrt(disc)) / (2 * a);
    const r2 = (-b - Math.sqrt(disc)) / (2 * a);
    roots.push({ x: r1, y: 0 });
    if (Math.abs(r1 - r2) > 0.01) roots.push({ x: r2, y: 0 });
  }

  // Gleichung formatieren
  const formatEq = () => {
    const parts: string[] = [];
    if (a !== 0) parts.push(a === 1 ? "x²" : a === -1 ? "-x²" : `${a}x²`);
    if (b !== 0) parts.push(b > 0 ? (b === 1 ? "+ x" : `+ ${b}x`) : (b === -1 ? "- x" : `${b}x`));
    if (c !== 0) parts.push(c > 0 ? `+ ${c}` : `${c}`);
    return `f(x) = ${parts.join(" ") || "0"}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Gleichung */}
      <div className="text-center">
        <span className="text-2xl font-mono font-bold text-indigo-400">{formatEq()}</span>
      </div>

      {/* Graph */}
      <div className="bg-slate-900/50 rounded-xl p-2 border border-slate-700/50">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Funktionen-Explorer">
          {/* Grid */}
          {gridLines}

          {/* Achsen */}
          <line x1={pad} y1={scaleY(0)} x2={pad + plotW} y2={scaleY(0)} stroke="#475569" strokeWidth="1.5" />
          <line x1={scaleX(0)} y1={pad} x2={scaleX(0)} y2={pad + plotH} stroke="#475569" strokeWidth="1.5" />

          {/* Pfeile */}
          <polygon points={`${pad + plotW},${scaleY(0)} ${pad + plotW - 7},${scaleY(0) - 3} ${pad + plotW - 7},${scaleY(0) + 3}`} fill="#475569" />
          <polygon points={`${scaleX(0)},${pad} ${scaleX(0) - 3},${pad + 7} ${scaleX(0) + 3},${pad + 7}`} fill="#475569" />

          {/* Achsenbeschriftungen */}
          <text x={pad + plotW - 5} y={scaleY(0) - 10} fill="#94a3b8" fontSize="13" fontWeight="bold">x</text>
          <text x={scaleX(0) + 10} y={pad + 12} fill="#94a3b8" fontSize="13" fontWeight="bold">y</text>

          {/* Funktion */}
          <path d={generatePath()} fill="none" stroke="#818cf8" strokeWidth="2.5" />

          {/* Nullstellen */}
          {roots.map((r, i) => (
            <g key={`root-${i}`}>
              <circle cx={scaleX(r.x)} cy={scaleY(0)} r="5" fill="#34d399" />
              <text x={scaleX(r.x)} y={scaleY(0) + 20} fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                {r.x.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Scheitelpunkt */}
          {Math.abs(a) > 0.01 && (
            <g>
              <circle cx={scaleX(vertexX)} cy={scaleY(vertexY)} r="5" fill="#f59e0b" />
              <text x={scaleX(vertexX)} y={scaleY(vertexY) - 12} fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                {vertexLabel}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Slider */}
      <div className="grid grid-cols-3 gap-4">
        <SliderControl label="a" value={a} onChange={setA} color="#818cf8" />
        <SliderControl label="b" value={b} onChange={setB} color="#f472b6" />
        <SliderControl label="c" value={c} onChange={setC} color="#34d399" />
      </div>

      {/* Erklärung */}
      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <p><strong className="text-indigo-400">a</strong> bestimmt die Öffnung: a &gt; 0 = nach oben, a &lt; 0 = nach unten</p>
        <p><strong className="text-pink-400">b</strong> verschiebt den Scheitelpunkt horizontal</p>
        <p><strong className="text-green-400">c</strong> verschiebt den Graphen nach oben/unten (y-Achsenabschnitt)</p>
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange, color }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono font-bold text-lg" style={{ color }}>{label}</span>
        <span className="text-slate-400 font-mono text-sm">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min="-5"
        max="5"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color}33, ${color})`,
          accentColor: color,
        }}
      />
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span>-5</span>
        <span>5</span>
      </div>
    </div>
  );
}
