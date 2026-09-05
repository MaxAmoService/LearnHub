"use client";
import { useState } from "react";

function fmt(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  return r % 1 === 0 ? r.toString() : r.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

export function ComplexPowerCalculator() {
  const [reInput, setReInput] = useState("1");
  const [imInput, setImInput] = useState("1");
  const [nInput, setNInput] = useState("3");
  const [steps, setSteps] = useState<{ label: string; value: string }[]>([]);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setSteps([]);
    setResult("");

    const x = parseFloat(reInput) || 0;
    const y = parseFloat(imInput) || 0;
    const n = parseInt(nInput);

    if (isNaN(n) || n < 1) {
      setError("n muss eine positive ganze Zahl sein.");
      return;
    }

    const r = Math.sqrt(x * x + y * y);
    let phiDeg = (Math.atan2(y, x) * 180) / Math.PI;
    if (phiDeg < 0) phiDeg += 360;

    const newSteps = [
      { label: "z", value: `${fmt(x)} ${y >= 0 ? "+" : "−"} ${fmt(Math.abs(y))}j` },
      { label: "n", value: n.toString() },
      { label: "r = |z|", value: `${fmt(r)}` },
      { label: "φ = arg(z)", value: `${phiDeg.toFixed(2)}°` },
      { label: "─────", value: "─────────────────" },
      { label: "r^n", value: `${fmt(Math.pow(r, n))}` },
      { label: "n·φ", value: `${(n * phiDeg).toFixed(2)}°` },
    ];

    const rnPhi = n * phiDeg;
    const resultRe = Math.pow(r, n) * Math.cos((rnPhi * Math.PI) / 180);
    const resultIm = Math.pow(r, n) * Math.sin((rnPhi * Math.PI) / 180);

    // Normalized angle
    let normPhi = rnPhi % 360;
    if (normPhi < 0) normPhi += 360;

    newSteps.push({ label: "─────", value: "─────────────────" });
    newSteps.push({
      label: "z^n (Polar)",
      value: `${fmt(Math.pow(r, n))} · e^(j·${normPhi.toFixed(2)}°)`,
    });
    newSteps.push({
      label: "z^n (Normal)",
      value: `${fmt(resultRe)} ${resultIm >= 0 ? "+" : "−"} ${fmt(Math.abs(resultIm))}j`,
    });

    setSteps(newSteps);
    setResult(`${fmt(resultRe)} ${resultIm >= 0 ? "+" : "−"} ${fmt(Math.abs(resultIm))}j`);
  };

  // j-Power cycle
  const [jPow, setJPow] = useState(7);
  const jResult = (() => {
    const mod = ((jPow % 4) + 4) % 4;
    return mod === 0 ? "1" : mod === 1 ? "j" : mod === 2 ? "−1" : "−j";
  })();

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
            min={1}
            step={1}
          />
        </div>
        <button
          onClick={calculate}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
        >
          z^n berechnen
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-xl text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {steps.length > 0 && (
        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
          <h4 className="text-sm font-semibold text-green-400 mb-3">📝 Rechenschritte (De Moivre)</h4>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-slate-500 font-mono text-xs w-24 flex-shrink-0 text-right pt-0.5">
                  {step.label}
                </span>
                <span className="text-slate-200 font-mono text-sm">{step.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="p-4 bg-green-900/20 rounded-xl border border-green-700/30 text-center">
          <p className="text-green-400 text-sm mb-1">z^n =</p>
          <p className="text-white font-mono text-2xl font-bold">{result}</p>
        </div>
      )}

      {/* j-Power Cycle */}
      <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
        <h4 className="text-sm font-semibold text-amber-400 mb-3">🔄 Potenzen von j</h4>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-slate-300 font-mono">j^</span>
          <input
            type="number"
            value={jPow}
            onChange={(e) => setJPow(parseInt(e.target.value) || 0)}
            className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
          />
          <span className="text-slate-300 font-mono">=</span>
          <span className="text-white font-mono text-xl font-bold">{jResult}</span>
          <span className="text-slate-500 text-xs">(= j^{jPow} mod 4 = j^{(((jPow % 4) + 4) % 4)})</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[0, 1, 2, 3].map((m) => (
            <div
              key={m}
              className={`px-3 py-1.5 rounded-lg text-sm font-mono ${
                ((jPow % 4) + 4) % 4 === m
                  ? "bg-amber-600/30 text-amber-300 border border-amber-500/50"
                  : "bg-slate-700/30 text-slate-500"
              }`}
            >
              j^{m} = {m === 0 ? "1" : m === 1 ? "j" : m === 2 ? "−1" : "−j"}
            </div>
          ))}
        </div>
      </div>

      {/* Quick examples */}
      <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">⚡ Beispiele</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "(1+j)²", re: "1", im: "1", n: "2" },
            { label: "(2e^{j30°})³ → 2∠30, n=3", re: "1.732", im: "1", n: "3" },
            { label: "j^100", re: "0", im: "1", n: "100" },
            { label: "(1+j)^6", re: "1", im: "1", n: "6" },
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
