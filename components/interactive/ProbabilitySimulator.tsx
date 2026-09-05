"use client";

import { useState, useCallback } from "react";

interface ProbabilitySimulatorProps {
  className?: string;
}

type SimType = "dice" | "coin" | "cards";

export function ProbabilitySimulator({ className = "" }: ProbabilitySimulatorProps) {
  const [simType, setSimType] = useState<SimType>("dice");
  const [trials, setTrials] = useState(100);
  const [results, setResults] = useState<number[]>([]);
  const [target, setTarget] = useState(6);
  const [running, setRunning] = useState(false);

  const maxDice = simType === "dice" ? 6 : simType === "coin" ? 2 : 4;

  const runSimulation = useCallback(() => {
    setRunning(true);
    const counts: number[] = new Array(maxDice + 1).fill(0);

    for (let i = 0; i < trials; i++) {
      let result: number;
      switch (simType) {
        case "dice":
          result = Math.floor(Math.random() * 6) + 1;
          break;
        case "coin":
          result = Math.random() < 0.5 ? 1 : 2;
          break;
        case "cards":
          result = Math.floor(Math.random() * 4) + 1;
          break;
      }
      counts[result]++;
    }

    setResults(counts);
    setRunning(false);
  }, [simType, trials, maxDice]);

  const labels = simType === "dice"
    ? ["", "⚀ 1", "⚁ 2", "⚂ 3", "⚃ 4", "⚄ 5", "⚅ 6"]
    : simType === "coin"
    ? ["", "Kopf", "Zahl"]
    : ["", "♥ Herz", "♦ Karo", "♣ Kreuz", "♠ Pik"];

  const theoretical = simType === "dice" ? 1 / 6 : simType === "coin" ? 1 / 2 : 1 / 4;
  const empirical = results.length > 0 && target <= maxDice ? results[target] / (results.reduce((a, b) => a + b, 0) || 1) : 0;

  const maxCount = Math.max(...results.slice(1), 1);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-3 gap-2">
        {(["dice", "coin", "cards"] as const).map(t => (
          <button key={t} onClick={() => { setSimType(t); setResults([]); setTarget(t === "dice" ? 6 : 1); }}
            className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
              simType === t
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            }`}>
            {t === "dice" ? "🎲 Würfel" : t === "coin" ? "🪙 Münze" : "🃏 Karten"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">Versuche: {trials}</label>
          <input type="range" min={10} max={10000} step={10} value={trials}
            onChange={e => setTrials(+e.target.value)} className="w-full accent-indigo-500" />
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">Ziel-Ergebnis</label>
          <select value={target} onChange={e => setTarget(+e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-2 py-1.5 text-sm border border-slate-600">
            {Array.from({ length: maxDice }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{labels[n]}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={runSimulation} disabled={running}
        className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors">
        {running ? "Läuft..." : `${trials}× simulieren`}
      </button>

      {results.length > 0 && (
        <>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-end gap-1 h-40">
              {results.slice(1).map((count, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end">
                  <span className="text-xs text-slate-400 mb-1">{count}</span>
                  <div
                    className={`w-full rounded-t transition-all ${i + 1 === target ? "bg-indigo-500" : "bg-slate-600"}`}
                    style={{ height: `${(count / maxCount) * 120}px`, minHeight: count > 0 ? "4px" : "0" }}
                  />
                  <span className="text-xs text-slate-500 mt-1">{labels[i + 1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/30 rounded-lg p-3 text-sm">
              <div className="text-slate-400">Theoretisch</div>
              <div className="text-xl font-bold text-indigo-400">{(theoretical * 100).toFixed(2)}%</div>
              <div className="text-xs text-slate-500">P({labels[target]}) = 1/{simType === "dice" ? 6 : simType === "coin" ? 2 : 4}</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3 text-sm">
              <div className="text-slate-400">Empirisch ({trials} Versuche)</div>
              <div className="text-xl font-bold text-green-400">{(empirical * 100).toFixed(2)}%</div>
              <div className="text-xs text-slate-500">{results[target]} von {results.reduce((a, b) => a + b, 0)}</div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-3 text-sm text-slate-300">
            <strong>Differenz:</strong> {Math.abs(empirical - theoretical) < 0.02
              ? <span className="text-green-400">Sehr nah am theoretischen Wert! ({(Math.abs(empirical - theoretical) * 100).toFixed(2)}%)</span>
              : <span className="text-amber-400">Abweichung: {(Math.abs(empirical - theoretical) * 100).toFixed(2)}% — mehr Versuche nähern sich dem theoretischen Wert</span>
            }
          </div>
        </>
      )}
    </div>
  );
}
