"use client";

import { useState, useCallback } from "react";

interface BoxplotBuilderProps {
  className?: string;
}

export function BoxplotBuilder({ className = "" }: BoxplotBuilderProps) {
  const [input, setInput] = useState("2, 3, 5, 7, 8, 10, 12, 15, 18");

  const parseData = useCallback((): number[] => {
    return input
      .split(/[,;\s]+/)
      .map(s => parseFloat(s.replace(",", ".")))
      .filter(n => !isNaN(n))
      .sort((a, b) => a - b);
  }, [input]);

  const data = parseData();

  const quantile = (sorted: number[], q: number): number => {
    const pos = (sorted.length - 1) * q;
    const lo = Math.floor(pos);
    const hi = Math.ceil(pos);
    if (lo === hi) return sorted[lo];
    return sorted[lo] * (hi - pos) + sorted[hi] * (pos - lo);
  };

  const n = data.length;
  if (n < 4) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">Daten eingeben (kommagetrennt)</label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm border border-slate-600 focus:border-indigo-500 outline-none"
            placeholder="2, 3, 5, 7, 8, 10, 12" />
        </div>
        <div className="text-amber-400 text-sm">Mindestens 4 Werte nötig für einen Boxplot.</div>
      </div>
    );
  }

  const min = data[0];
  const max = data[n - 1];
  const q1 = quantile(data, 0.25);
  const median = quantile(data, 0.5);
  const q3 = quantile(data, 0.75);
  const iqr = q3 - q1;
  const whiskerLo = Math.max(min, q1 - 1.5 * iqr);
  const whiskerHi = Math.min(max, q3 + 1.5 * iqr);
  const outliers = data.filter(v => v < whiskerLo || v > whiskerHi);

  const actualWhiskerLo = data.find(v => v >= whiskerLo) ?? min;
  const actualWhiskerHi = [...data].reverse().find(v => v <= whiskerHi) ?? max;

  const mean = data.reduce((s, v) => s + v, 0) / n;
  const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const stddev = Math.sqrt(variance);

  const W = 500, H = 120, pad = 40;
  const range = max - min || 1;
  const scaleX = (v: number) => pad + ((v - min) / range) * (W - 2 * pad);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
        <label className="text-xs text-slate-400 mb-1 block">Daten eingeben (kommagetrennt)</label>
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          className="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm border border-slate-600 focus:border-indigo-500 outline-none"
          placeholder="2, 3, 5, 7, 8, 10, 12" />
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex justify-center">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full max-w-lg">
          <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke="#475569" strokeWidth="1" />

          <line x1={scaleX(actualWhiskerLo)} y1={H / 2 - 15} x2={scaleX(actualWhiskerLo)} y2={H / 2 + 15} stroke="#94a3b8" strokeWidth="2" />
          <line x1={scaleX(actualWhiskerHi)} y1={H / 2 - 15} x2={scaleX(actualWhiskerHi)} y2={H / 2 + 15} stroke="#94a3b8" strokeWidth="2" />
          <line x1={scaleX(actualWhiskerLo)} y1={H / 2} x2={scaleX(q1)} y2={H / 2} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
          <line x1={scaleX(q3)} y1={H / 2} x2={scaleX(actualWhiskerHi)} y2={H / 2} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />

          <rect x={scaleX(q1)} y={H / 2 - 25} width={scaleX(q3) - scaleX(q1)} height={50}
            fill="rgba(99,102,241,0.3)" stroke="#818cf8" strokeWidth="2" rx="4" />
          <line x1={scaleX(median)} y1={H / 2 - 25} x2={scaleX(median)} y2={H / 2 + 25}
            stroke="#f59e0b" strokeWidth="3" />

          {outliers.map((v, i) => (
            <circle key={i} cx={scaleX(v)} cy={H / 2} r="4" fill="#ef4444" stroke="#f87171" strokeWidth="1" />
          ))}

          <text x={scaleX(actualWhiskerLo)} y={H + 15} fill="#94a3b8" fontSize="11" textAnchor="middle">{actualWhiskerLo}</text>
          <text x={scaleX(q1)} y={H + 15} fill="#818cf8" fontSize="11" textAnchor="middle">Q1={q1.toFixed(1)}</text>
          <text x={scaleX(median)} y={H + 15} fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">Med={median.toFixed(1)}</text>
          <text x={scaleX(q3)} y={H + 15} fill="#818cf8" fontSize="11" textAnchor="middle">Q3={q3.toFixed(1)}</text>
          <text x={scaleX(actualWhiskerHi)} y={H + 15} fill="#94a3b8" fontSize="11" textAnchor="middle">{actualWhiskerHi}</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/30 rounded-lg p-3 text-sm space-y-1">
          <h4 className="font-semibold text-indigo-400">Lagemaße</h4>
          <div className="flex justify-between text-slate-300"><span>Minimum</span><span className="font-mono">{min}</span></div>
          <div className="flex justify-between text-slate-300"><span>Q1 (25%)</span><span className="font-mono">{q1.toFixed(2)}</span></div>
          <div className="flex justify-between text-amber-400"><span>Median (50%)</span><span className="font-mono font-bold">{median.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-300"><span>Q3 (75%)</span><span className="font-mono">{q3.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-300"><span>Maximum</span><span className="font-mono">{max}</span></div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-3 text-sm space-y-1">
          <h4 className="font-semibold text-green-400">Streuung</h4>
          <div className="flex justify-between text-slate-300"><span>IQR</span><span className="font-mono">{iqr.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-300"><span>Spannweite</span><span className="font-mono">{(max - min).toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-300"><span>Mittelwert</span><span className="font-mono">{mean.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-300"><span>Std.abw.</span><span className="font-mono">{stddev.toFixed(2)}</span></div>
          {outliers.length > 0 && (
            <div className="flex justify-between text-red-400"><span>Ausreißer</span><span className="font-mono">{outliers.join(", ")}</span></div>
          )}
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-3 text-sm text-slate-300">
        <strong>Sortierte Daten:</strong> {data.join(", ")}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <h4 className="font-semibold text-indigo-400 mb-2">Boxplot lesen</h4>
        <p><strong>Box:</strong> Von Q1 bis Q3 — enthält die mittleren 50% der Daten</p>
        <p><strong>Linie in der Box:</strong> Der Median (Q2)</p>
        <p><strong>Whisker:</strong> Reichen bis zu 1.5×IQR von der Box entfernt</p>
        <p><strong>Rote Punkte:</strong> Ausreißer (außerhalb der Whisker)</p>
      </div>
    </div>
  );
}
