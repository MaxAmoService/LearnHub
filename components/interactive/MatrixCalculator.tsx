"use client";

import { useState } from "react";

interface MatrixCalculatorProps {
  className?: string;
}

type Op = "multiply" | "determinant" | "transpose" | "inverse";

export function MatrixCalculator({ className = "" }: MatrixCalculatorProps) {
  const [op, setOp] = useState<Op>("determinant");
  const [size, setSize] = useState<2 | 3>(2);
  const [matA, setMatA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matB, setMatB] = useState<number[][]>([[5, 6], [7, 8]]);

  const setCell = (mat: "A" | "B", r: number, c: number, val: number) => {
    const setter = mat === "A" ? setMatA : setMatB;
    setter(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = val;
      return next;
    });
  };

  const resize = (s: 2 | 3) => {
    setSize(s);
    const make = () => Array.from({ length: s }, (_, i) => Array.from({ length: s }, (_, j) => i * s + j + 1));
    setMatA(make());
    setMatB(make().map(r => r.map(v => v + 9)));
  };

  const det2 = (m: number[][]) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const det3 = (m: number[][]) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

  const determinant = (m: number[][]) => size === 2 ? det2(m) : det3(m);

  const transpose = (m: number[][]) => m[0].map((_, c) => m.map(row => row[c]));

  const multiply = (a: number[][], b: number[][]) => {
    const n = a.length;
    return Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) =>
        Array.from({ length: n }, (_, k) => a[i][k] * b[k][j]).reduce((s, v) => s + v, 0)
      )
    );
  };

  const inverse2 = (m: number[][]) => {
    const d = det2(m);
    if (d === 0) return null;
    return [[m[1][1] / d, -m[0][1] / d], [-m[1][0] / d, m[0][0] / d]];
  };

  const inverse3 = (m: number[][]) => {
    const d = det3(m);
    if (d === 0) return null;
    const cofactors = Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => {
        const minor = m.filter((_, ri) => ri !== i).map(row => row.filter((_, ci) => ci !== j));
        return ((i + j) % 2 === 0 ? 1 : -1) * det2(minor);
      })
    );
    const adj = transpose(cofactors);
    return adj.map(row => row.map(v => v / d));
  };

  const inverse = (m: number[][]) => size === 2 ? inverse2(m) : inverse3(m);

  const renderMatrix = (m: number[][], label: string, highlight?: boolean) => (
    <div className="text-center">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className={`inline-block border-l-2 border-r-2 ${highlight ? "border-indigo-400" : "border-slate-500"} px-2`}>
        {m.map((row, i) => (
          <div key={i} className="flex gap-3">
            {row.map((v, j) => (
              <span key={j} className="w-12 text-right font-mono text-sm text-slate-200">{Number.isInteger(v) ? v : v.toFixed(2)}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditableMatrix = (m: number[][], mat: "A" | "B") => (
    <div className={`inline-block border-l-2 border-r-2 ${mat === "A" ? "border-indigo-400" : "border-pink-400"} px-2`}>
      {m.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((v, j) => (
            <input key={j} type="number" value={v}
              onChange={e => setCell(mat, i, j, +e.target.value)}
              className="w-14 text-center font-mono text-sm bg-slate-700 text-white rounded px-1 py-1 border border-slate-600 focus:border-indigo-500 outline-none" />
          ))}
        </div>
      ))}
    </div>
  );

  let result: { label: string; matrix?: number[][]; value?: number; error?: string } | null = null;
  if (op === "determinant") {
    result = { label: `det(A) = ${determinant(matA)}`, value: determinant(matA) };
  } else if (op === "transpose") {
    result = { label: "Aᵀ", matrix: transpose(matA) };
  } else if (op === "multiply") {
    result = { label: "A × B", matrix: multiply(matA, matB) };
  } else if (op === "inverse") {
    const inv = inverse(matA);
    result = inv
      ? { label: "A⁻¹", matrix: inv }
      : { label: "A⁻¹ existiert nicht (det = 0)", error: "Die Matrix ist singulär — Determinante ist 0." };
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2 flex-wrap">
        {(["determinant", "transpose", "multiply", "inverse"] as const).map(o => (
          <button key={o} onClick={() => setOp(o)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              op === o ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            }`}>
            {o === "determinant" ? "Determinante" : o === "transpose" ? "Transponieren" : o === "multiply" ? "A × B" : "Inverse"}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => resize(2)}
          className={`px-3 py-1.5 rounded-lg text-sm border ${size === 2 ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/50 border-slate-700/50 text-slate-300"}`}>
          2×2
        </button>
        <button onClick={() => resize(3)}
          className={`px-3 py-1.5 rounded-lg text-sm border ${size === 3 ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/50 border-slate-700/50 text-slate-300"}`}>
          3×3
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 overflow-x-auto">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div>
            <div className="text-xs text-indigo-400 mb-2 text-center">Matrix A</div>
            {renderEditableMatrix(matA, "A")}
          </div>
          {op === "multiply" && (
            <>
              <span className="text-2xl text-slate-500">×</span>
              <div>
                <div className="text-xs text-pink-400 mb-2 text-center">Matrix B</div>
                {renderEditableMatrix(matB, "B")}
              </div>
            </>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-slate-800/30 rounded-lg p-4 text-sm">
          {result.error ? (
            <div className="text-red-400">{result.error}</div>
          ) : result.matrix ? (
            <div className="flex justify-center">
              {renderMatrix(result.matrix, result.label, true)}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-slate-400">{result.label.split("=")[0]}=</span>
              <span className="text-2xl font-bold text-white ml-2">{result.value}</span>
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <h4 className="font-semibold text-indigo-400 mb-2">Formeln</h4>
        {size === 2 ? (
          <>
            <p><strong>det(A)</strong> = a₁₁·a₂₂ - a₁₂·a₂₁</p>
            <p><strong>Transponiert:</strong> Zeilen werden zu Spalten</p>
            <p><strong>Inverse:</strong> A⁻¹ = (1/det) · adj(A)</p>
          </>
        ) : (
          <>
            <p><strong>det(A)</strong> = Entwicklung nach 1. Zeile (Sarrus)</p>
            <p><strong>Inverse:</strong> A⁻¹ = (1/det) · Kofaktorenᵀ</p>
          </>
        )}
        <p><strong>Multiplikation:</strong> (AB)ᵢⱼ = Σ aᵢₖ·bₖⱼ</p>
      </div>
    </div>
  );
}
