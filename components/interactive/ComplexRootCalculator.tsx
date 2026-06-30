"use client";
import { useState } from "react";

function fmt(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  return r % 1 === 0 ? r.toString() : r.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

interface Root {
  k: number;
  re: number;
  im: number;
  angleDeg: number;
}

const SCALE = 60;
const SVG_SIZE = 180;

export function ComplexRootCalculator() {
  const [reInput, setReInput] = useState("0");
  const [imInput, setImInput] = useState("8");
  const [nInput, setNInput] = useState("3");
  const [roots, setRoots] = useState<Root[]>([]);
  const [steps, setSteps] = useState<{ label: string; value: string }[]>([]);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setRoots([]);
    setSteps([]);

    const x = parseFloat(reInput) || 0;
    const y = parseFloat(imInput) || 0;
    const n = parseInt(nInput);

    if (isNaN(n) || n < 2) {
      setError("n muss mindestens 2 sein.");
      return;
    }

    const r = Math.sqrt(x * x + y * y);
    let phiDeg = (Math.atan2(y, x) * 180) / Math.PI;
    if (phiDeg < 0) phiDeg += 360;
    const phiRad = (phiDeg * Math.PI) / 180;

    const rNthRoot = Math.pow(r, 1 / n);
    const newSteps = [
      { label: "z", value: `${fmt(x)} ${y >= 0 ? "+" : "−"} ${fmt(Math.abs(y))}j` },
      { label: "r = |z|", value: fmt(r) },
      { label: "φ", value: `${phiDeg.toFixed(2)}°` },
      { label: "n", value: n.toString() },
      { label: "─────", value: "─────────────────" },
      { label: "r^(1/n)", value: fmt(rNthRoot) },
      { label: "Formel", value: "w_k = r^(1/n) · e^(j·(φ + 2kπ)/n)" },
    ];

    const newRoots: Root[] = [];
    for (let k = 0; k < n; k++) {
      const angleRad = (phiRad + 2 * Math.PI * k) / n;
      const angleDeg = (angleRad * 180) / Math.PI;
      const re = rNthRoot * Math.cos(angleRad);
      const im = rNthRoot * Math.sin(angleRad);
      newRoots.push({ k, re, im, angleDeg });

      newSteps.push({
        label: `w_${k}`,
        value: `${fmt(rNthRoot)} · e^(j·${angleDeg.toFixed(1)}°) = ${fmt(re)} ${im >= 0 ? "+" : "−"} ${fmt(Math.abs(im))}j`,
      });
    }

    setSteps(newSteps);
    setRoots(newRoots);
  };

  // Find bounding box for SVG
  const maxR = roots.length > 0 ? Math.max(...roots.map((r) => Math.sqrt(r.re * r.re + r.im * r.im)), 1) : 1;
  const viewScale = (SVG_SIZE * 0.85) / maxR;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-300 font-mono text-lg">z =</span>
          <input
            type="number"
            value={reInput}
            onChange={(e) => setReInput(e.target.value)}
            className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
            step="any"
          />
          <span className="text-slate-300 font-mono text-lg">+</span>
          <input
            type="number"
            value={imInput}
            onChange={(e) => setImInput(e.target.value)}
            className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
            step="any"
          />
          <span className="text-slate-300 font-mono text-lg">j</span>
          <span className="text-slate-400 mx-1">,</span>
          <span className="text-slate-300 font-mono text-lg">n =</span>
          <input
            type="number"
            value={nInput}
            onChange={(e) => setNInput(e.target.value)}
            className="w-16 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
            min={2}
            step={1}
          />
        </div>
        <button
          onClick={calculate}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
        >
          n-te Wurzeln berechnen
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-xl text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {roots.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SVG Visualization */}
          <div className="flex-shrink-0">
            <svg
              viewBox={`${-SVG_SIZE} ${-SVG_SIZE} ${SVG_SIZE * 2} ${SVG_SIZE * 2}`}
              width={SVG_SIZE * 2}
              height={SVG_SIZE * 2}
              className="w-full max-w-[360px] aspect-square bg-slate-900/50 rounded-xl border border-slate-700/50"
            >
              {/* Grid circles */}
              {[0.25, 0.5, 0.75, 1].map((f) => {
                const cr = Math.min(maxR * f, maxR) * viewScale;
                return (
                  <circle
                    key={f}
                    cx={0}
                    cy={0}
                    r={cr}
                    fill="none"
                    stroke="#334155"
                    strokeWidth={0.5}
                    strokeDasharray={f < 1 ? "3 3" : undefined}
                  />
                );
              })}

              {/* Axes */}
              <line x1={-SVG_SIZE} y1={0} x2={SVG_SIZE} y2={0} stroke="#475569" strokeWidth={1} />
              <line x1={0} y1={-SVG_SIZE} x2={0} y2={SVG_SIZE} stroke="#475569" strokeWidth={1} />

              {/* Axis labels */}
              <text x={SVG_SIZE - 15} y={-8} fill="#94a3b8" fontSize={11} fontWeight="bold">
                Re
              </text>
              <text x={8} y={-SVG_SIZE + 15} fill="#94a3b8" fontSize={11} fontWeight="bold">
                Im
              </text>

              {/* Root circle */}
              {roots.length > 1 && (
                <circle
                  cx={0}
                  cy={0}
                  r={Math.pow(Math.sqrt(parseFloat(reInput || "0") ** 2 + parseFloat(imInput || "0") ** 2), 1 / parseInt(nInput || "2")) * viewScale}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              )}

              {/* Lines from origin to roots */}
              {roots.map((root) => {
                const sx = root.re * viewScale;
                const sy = -root.im * viewScale;
                const colors = ["#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#a78bfa", "#fb923c", "#f87171", "#2dd4bf"];
                const color = colors[root.k % colors.length];
                return (
                  <line
                    key={`line-${root.k}`}
                    x1={0}
                    y1={0}
                    x2={sx}
                    y2={sy}
                    stroke={color}
                    strokeWidth={1.5}
                    opacity={0.5}
                  />
                );
              })}

              {/* Root points */}
              {roots.map((root) => {
                const sx = root.re * viewScale;
                const sy = -root.im * viewScale;
                const colors = ["#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#a78bfa", "#fb923c", "#f87171", "#2dd4bf"];
                const color = colors[root.k % colors.length];
                return (
                  <g key={`root-${root.k}`}>
                    <circle cx={sx} cy={sy} r={7} fill={color} opacity={0.9} />
                    <text
                      x={sx + 10}
                      y={sy - 10}
                      fill={color}
                      fontSize={11}
                      fontWeight="bold"
                    >
                      w_{root.k}
                    </text>
                  </g>
                );
              })}

              {/* Polygon connecting roots */}
              {roots.length > 2 && (
                <polygon
                  points={roots.map((r) => `${r.re * viewScale},${-r.im * viewScale}`).join(" ")}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth={1}
                  opacity={0.3}
                />
              )}
            </svg>
          </div>

          {/* Steps + Root list */}
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
              <h4 className="text-sm font-semibold text-green-400 mb-3">📝 Rechenschritte</h4>
              <div className="space-y-1.5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-slate-500 font-mono text-xs w-16 flex-shrink-0 text-right pt-0.5">
                      {step.label}
                    </span>
                    <span className="text-slate-200 font-mono text-xs">{step.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
              <h4 className="text-sm font-semibold text-purple-400 mb-3">🌀 Alle Wurzeln</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roots.map((root) => {
                  const colors = ["#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#a78bfa", "#fb923c", "#f87171", "#2dd4bf"];
                  const color = colors[root.k % colors.length];
                  return (
                    <div
                      key={root.k}
                      className="p-3 rounded-lg border border-slate-700/50 bg-slate-900/30"
                      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
                    >
                      <p className="text-xs text-slate-400">k = {root.k}</p>
                      <p className="font-mono text-sm font-bold" style={{ color }}>
                        {fmt(root.re)} {root.im >= 0 ? "+" : "−"} {fmt(Math.abs(root.im))}j
                      </p>
                      <p className="text-xs text-slate-500">
                        |w| = {fmt(Math.sqrt(root.re * root.re + root.im * root.im))}, arg = {root.angleDeg.toFixed(1)}°
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick examples */}
      <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">⚡ Beispiele</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "³√8", re: "8", im: "0", n: "3" },
            { label: "²√j", re: "0", im: "1", n: "2" },
            { label: "⁴√16", re: "16", im: "0", n: "4" },
            { label: "³√8i", re: "0", im: "8", n: "3" },
            { label: "⁵√-1", re: "-1", im: "0", n: "5" },
          ].map((ex, i) => (
            <button
              key={i}
              onClick={() => {
                setReInput(ex.re);
                setImInput(ex.im);
                setNInput(ex.n);
              }}
              className="px-3 py-1.5 text-xs bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition font-mono"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
