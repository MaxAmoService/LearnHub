"use client";

import { useState, useCallback } from "react";

interface TruthTableExplorerProps {
  className?: string;
}

type Operator = "AND" | "OR" | "IMPLIES" | "EQUIV";

const operatorSymbols: Record<Operator, string> = {
  AND: "\\land",
  OR: "\\lor",
  IMPLIES: "\\rightarrow",
  EQUIV: "\\leftrightarrow",
};

const operatorLabels: Record<Operator, string> = {
  AND: "UND (∧)",
  OR: "ODER (∨)",
  IMPLIES: "Implikation (→)",
  EQUIV: "Äquivalenz (↔)",
};

function evaluate(p: boolean, q: boolean, op: Operator): boolean {
  switch (op) {
    case "AND": return p && q;
    case "OR": return p || q;
    case "IMPLIES": return !p || q;
    case "EQUIV": return p === q;
  }
}

export function TruthTableExplorer({ className = "" }: TruthTableExplorerProps) {
  const [op1, setOp1] = useState<Operator>("AND");
  const [op2, setOp2] = useState<Operator>("OR");
  const [negateP, setNegateP] = useState(false);
  const [negateQ, setNegateQ] = useState(false);
  const [showDeMorgan, setShowDeMorgan] = useState(false);

  const computeRow = useCallback((p: boolean, q: boolean) => {
    const np = negateP ? !p : p;
    const nq = negateQ ? !q : q;
    const first = evaluate(np, nq, op1);
    const second = evaluate(p, q, op2);
    return { p, q, np, nq, first, second, combined: evaluate(first, second, op2) };
  }, [op1, op2, negateP, negateQ]);

  const rows = [
    computeRow(true, true),
    computeRow(true, false),
    computeRow(false, true),
    computeRow(false, false),
  ];

  const deMorganLeft = rows.map(r => {
    const pq = evaluate(r.p, r.q, op1);
    return !pq;
  });
  const deMorganRight = rows.map(r => {
    const np = !r.p;
    const nq = !r.q;
    const op: Operator = op1 === "AND" ? "OR" : "AND";
    return evaluate(np, nq, op);
  });
  const deMorganEqual = deMorganLeft.every((v, i) => v === deMorganRight[i]);

  const fmt = (v: boolean) => v ? "W" : "F";

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">Operator 1</label>
          <select
            value={op1}
            onChange={e => setOp1(e.target.value as Operator)}
            className="w-full bg-slate-700 text-white rounded px-2 py-1.5 text-sm border border-slate-600"
          >
            {Object.entries(operatorLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">Operator 2</label>
          <select
            value={op2}
            onChange={e => setOp2(e.target.value as Operator)}
            className="w-full bg-slate-700 text-white rounded px-2 py-1.5 text-sm border border-slate-600"
          >
            {Object.entries(operatorLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={negateP} onChange={e => setNegateP(e.target.checked)} className="rounded" />
          ¬P (P negieren)
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={negateQ} onChange={e => setNegateQ(e.target.checked)} className="rounded" />
          ¬Q (Q negieren)
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={showDeMorgan} onChange={e => setShowDeMorgan(e.target.checked)} className="rounded" />
          De Morgan zeigen
        </label>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="text-indigo-400 border-b border-slate-700">
              <th className="px-3 py-2">P</th>
              <th className="px-3 py-2">Q</th>
              {negateP && <th className="px-3 py-2 text-pink-400">¬P</th>}
              {negateQ && <th className="px-3 py-2 text-pink-400">¬Q</th>}
              <th className="px-3 py-2 text-green-400">
                {negateP || negateQ ? `(${negateP ? "¬" : ""}P ${op1} ${negateQ ? "¬" : ""}Q)` : `P ${op1} Q`}
              </th>
              <th className="px-3 py-2 text-amber-400">P {op2} Q</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-800 text-slate-300">
                <td className={`px-3 py-2 font-mono ${r.p ? "text-green-400" : "text-red-400"}`}>{fmt(r.p)}</td>
                <td className={`px-3 py-2 font-mono ${r.q ? "text-green-400" : "text-red-400"}`}>{fmt(r.q)}</td>
                {negateP && <td className={`px-3 py-2 font-mono ${r.np ? "text-green-400" : "text-red-400"}`}>{fmt(r.np)}</td>}
                {negateQ && <td className={`px-3 py-2 font-mono ${r.nq ? "text-green-400" : "text-red-400"}`}>{fmt(r.nq)}</td>}
                <td className={`px-3 py-2 font-mono font-bold ${r.first ? "text-green-400" : "text-red-400"}`}>{fmt(r.first)}</td>
                <td className={`px-3 py-2 font-mono font-bold ${r.second ? "text-green-400" : "text-red-400"}`}>{fmt(r.second)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeMorgan && (
        <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-2">
          <h4 className="font-semibold text-amber-400">De Morgan&apos;s Gesetz</h4>
          <p>
            ¬(P {op1} Q) {deMorganEqual ? "≡" : "≢"} {op1 === "AND" ? "(¬P ∨ ¬Q)" : "(¬P ∧ ¬Q)"}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs mt-2">
            <div className="text-slate-500">P, Q</div>
            <div className="text-pink-400">¬(P {op1} Q)</div>
            <div className="text-green-400">{op1 === "AND" ? "¬P ∨ ¬Q" : "¬P ∧ ¬Q"}</div>
            {rows.map((r, i) => (
              <div key={i} className="contents">
                <span className="text-slate-400">{fmt(r.p)}, {fmt(r.q)}</span>
                <span className={deMorganLeft[i] ? "text-green-400" : "text-red-400"}>{fmt(deMorganLeft[i])}</span>
                <span className={deMorganRight[i] ? "text-green-400" : "text-red-400"}>{fmt(deMorganRight[i])}</span>
              </div>
            ))}
          </div>
          <p className={deMorganEqual ? "text-green-400" : "text-red-400"}>
            {deMorganEqual ? "Die Seiten sind gleich — De Morgan gilt!" : "Die Seiten sind nicht gleich — prüfe den Operator!"}
          </p>
        </div>
      )}

      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <h4 className="font-semibold text-indigo-400 mb-2">Erklärung</h4>
        <p><strong>∧ (UND):</strong> Nur wahr wenn BEIDE wahr sind</p>
        <p><strong>∨ (ODER):</strong> Wahr wenn MINDESTENS EINE wahr ist</p>
        <p><strong>→ (Implikation):</strong> Nur falsch wenn wahr → falsch</p>
        <p><strong>↔ (Äquivalenz):</strong> Wahr wenn beide gleich</p>
      </div>
    </div>
  );
}
