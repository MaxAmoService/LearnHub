"use client";

import { useState, useCallback } from "react";

interface SeriesVisualizerProps {
  className?: string;
}

type SeriesType = "geometric" | "harmonic" | "p-series" | "alternating" | "custom";

const seriesDefs: Record<SeriesType, { label: string; fn: (n: number, p: number) => number; defaultP: number; paramLabel: string }> = {
  geometric: { label: "Geometrisch: Σrⁿ", fn: (n, r) => r ** n, defaultP: 0.5, paramLabel: "r =" },
  harmonic: { label: "Harmonisch: Σ1/n", fn: (n) => 1 / n, defaultP: 1, paramLabel: "" },
  "p-series": { label: "p-Reihe: Σ1/nᵖ", fn: (n, p) => 1 / n ** p, defaultP: 2, paramLabel: "p =" },
  alternating: { label: "Alternierend: Σ(-1)ⁿ/n", fn: (n) => ((-1) ** (n + 1)) / n, defaultP: 1, paramLabel: "" },
  custom: { label: "Benutzerdefiniert: Σn^p", fn: (n, p) => n ** p, defaultP: -2, paramLabel: "p =" },
};

export function SeriesVisualizer({ className = "" }: SeriesVisualizerProps) {
  const [type, setType] = useState<SeriesType>("p-series");
  const [param, setParam] = useState(2);
  const [terms, setTerms] = useState(20);

  const def = seriesDefs[type];

  const partialSums: number[] = [];
  const termsArr: number[] = [];
  let sum = 0;
  for (let n = 1; n <= terms; n++) {
    const term = def.fn(n, param);
    termsArr.push(term);
    sum += term;
    partialSums.push(sum);
  }

  const knownConverges = type === "geometric" ? Math.abs(param) < 1
    : type === "p-series" ? param > 1
    : type === "harmonic" ? false
    : type === "alternating" ? true
    : param < -1;

  const W = 500, H = 300, pad = 50;
  const maxSum = Math.max(...partialSums.map(Math.abs), 1);
  const scaleY = (v: number) => H / 2 - (v / maxSum) * (H / 2 - pad);
  const scaleX = (i: number) => pad + (i / (terms - 1)) * (W - 2 * pad);

  const path = partialSums.map((s, i) => `${i === 0 ? "M" : "L"} ${scaleX(i)} ${scaleY(s)}`).join(" ");

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(seriesDefs) as SeriesType[]).map(t => (
          <button key={t} onClick={() => { setType(t); setParam(seriesDefs[t].defaultP); }}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              type === t ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            }`}>
            {seriesDefs[t].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {def.paramLabel && (
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <label className="text-xs text-slate-400 mb-1 block">{def.paramLabel} {param}</label>
            <input type="range" min={-3} max={5} step={0.1} value={param}
              onChange={e => setParam(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
        )}
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">Terme: {terms}</label>
          <input type="range" min={5} max={100} value={terms}
            onChange={e => setTerms(+e.target.value)} className="w-full accent-indigo-500" />
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex justify-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg">
          <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke="#334155" strokeWidth="1" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#334155" strokeWidth="1" />

          {type === "geometric" && Math.abs(param) < 1 && (
            <line x1={pad} y1={scaleY(1 / (1 - param))} x2={W - pad} y2={scaleY(1 / (1 - param))}
              stroke="#4ade80" strokeWidth="1" strokeDasharray="6 4" />
          )}

          <path d={path} fill="none" stroke="#818cf8" strokeWidth="2" />

          {partialSums.map((s, i) => (
            <circle key={i} cx={scaleX(i)} cy={scaleY(s)} r={i === partialSums.length - 1 ? 5 : 2}
              fill={i === partialSums.length - 1 ? "#f59e0b" : "#818cf8"} />
          ))}

          <text x={pad - 5} y={pad + 5} fill="#64748b" fontSize="10" textAnchor="end">{maxSum.toFixed(1)}</text>
          <text x={pad - 5} y={H - pad + 5} fill="#64748b" fontSize="10" textAnchor="end">{(-maxSum).toFixed(1)}</text>
          <text x={W - pad} y={H / 2 + 15} fill="#64748b" fontSize="10" textAnchor="end">n={terms}</text>
          <text x={pad} y={H / 2 + 15} fill="#64748b" fontSize="10" textAnchor="start">1</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800/30 rounded-lg p-3 text-sm text-center">
          <div className="text-slate-400">Partialsumme S₍{terms}₎</div>
          <div className="text-xl font-bold text-white">{sum.toFixed(4)}</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-3 text-sm text-center">
          <div className="text-slate-400">Letzter Term a₍{terms}₎</div>
          <div className="text-xl font-bold text-indigo-400">{termsArr[termsArr.length - 1]?.toFixed(4)}</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-3 text-sm text-center">
          <div className="text-slate-400">Konvergenz</div>
          <div className={`text-xl font-bold ${knownConverges ? "text-green-400" : "text-red-400"}`}>
            {knownConverges ? "Ja" : "Nein"}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <h4 className="font-semibold text-indigo-400 mb-2">Konvergenzkriterien</h4>
        <p><strong>Geometrisch:</strong> Konvergiert wenn |r| &lt; 1, Summe = 1/(1-r)</p>
        <p><strong>p-Reihe:</strong> Konvergiert wenn p &gt; 1</p>
        <p><strong>Harmonisch:</strong> Divergiert (p=1 Spezialfall der p-Reihe)</p>
        <p><strong>Alternierend:</strong> Konvergiert nach Leibniz wenn |aₙ| monoton fallend → 0</p>
      </div>
    </div>
  );
}
