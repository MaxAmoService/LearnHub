"use client";
import { useState } from "react";

type InputMode = "normal" | "polar";

function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}
function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function quadrantCorrectDeg(x: number, y: number): number {
  let deg = toDeg(Math.atan2(y, x));
  if (deg < 0) deg += 360;
  return deg;
}

export function ComplexFormConverter() {
  const [mode, setMode] = useState<InputMode>("normal");
  const [re, setRe] = useState("3");
  const [im, setIm] = useState("4");
  const [rInput, setRInput] = useState("5");
  const [phiDegInput, setPhiDegInput] = useState("53.13");

  const [result, setResult] = useState<null | {
    x: number;
    y: number;
    r: number;
    phiDeg: number;
  }>(null);

  const calculate = () => {
    let x: number, y: number, r: number, phiDeg: number;

    if (mode === "normal") {
      x = parseFloat(re) || 0;
      y = parseFloat(im) || 0;
      r = Math.sqrt(x * x + y * y);
      phiDeg = quadrantCorrectDeg(x, y);
    } else {
      r = parseFloat(rInput) || 0;
      phiDeg = parseFloat(phiDegInput) || 0;
      const phiRad = toRad(phiDeg);
      x = r * Math.cos(phiRad);
      y = r * Math.sin(phiRad);
    }

    setResult({ x, y, r, phiDeg });
  };

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode("normal")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "normal"
              ? "bg-purple-600 text-white"
              : "bg-slate-700/50 text-slate-400 hover:text-slate-200"
          }`}
        >
          Normalform eingeben
        </button>
        <button
          onClick={() => setMode("polar")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "polar"
              ? "bg-purple-600 text-white"
              : "bg-slate-700/50 text-slate-400 hover:text-slate-200"
          }`}
        >
          Polarform eingeben
        </button>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
        {mode === "normal" ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-300 font-mono text-lg">z =</span>
            <input
              type="number"
              value={re}
              onChange={(e) => setRe(e.target.value)}
              className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
              step="any"
            />
            <span className="text-slate-300 font-mono text-lg">+</span>
            <input
              type="number"
              value={im}
              onChange={(e) => setIm(e.target.value)}
              className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
              step="any"
            />
            <span className="text-slate-300 font-mono text-lg">j</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-300 font-mono text-lg">z =</span>
            <input
              type="number"
              value={rInput}
              onChange={(e) => setRInput(e.target.value)}
              className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
              step="any"
            />
            <span className="text-slate-300 font-mono text-lg">· e^(j ·</span>
            <input
              type="number"
              value={phiDegInput}
              onChange={(e) => setPhiDegInput(e.target.value)}
              className="w-20 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
              step="any"
            />
            <span className="text-slate-300 font-mono text-lg">°)</span>
          </div>
        )}
        <button
          onClick={calculate}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
        >
          Umrechnen →
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-700/30">
            <h4 className="text-blue-400 font-semibold text-sm mb-2">📐 Normalform</h4>
            <p className="text-white font-mono text-lg">
              z = {result.x.toFixed(4)} {result.y >= 0 ? "+" : "−"} {Math.abs(result.y).toFixed(4)}j
            </p>
            <p className="text-blue-300 text-xs mt-2">
              Re(z) = {result.x.toFixed(4)}, Im(z) = {result.y.toFixed(4)}
            </p>
          </div>
          <div className="p-4 bg-green-900/20 rounded-xl border border-green-700/30">
            <h4 className="text-green-400 font-semibold text-sm mb-2">📐 Trigonometrisch</h4>
            <p className="text-white font-mono text-lg">
              z = {result.r.toFixed(4)} · (cos {result.phiDeg.toFixed(2)}° + j sin {result.phiDeg.toFixed(2)}°)
            </p>
            <p className="text-green-300 text-xs mt-2">
              r = {result.r.toFixed(4)}, φ = {result.phiDeg.toFixed(2)}°
            </p>
          </div>
          <div className="p-4 bg-amber-900/20 rounded-xl border border-amber-700/30">
            <h4 className="text-amber-400 font-semibold text-sm mb-2">📐 Exponentialform</h4>
            <p className="text-white font-mono text-lg">
              z = {result.r.toFixed(4)} · e^(j·{result.phiDeg.toFixed(2)}°)
            </p>
            <p className="text-amber-300 text-xs mt-2">
              Betrag r = {result.r.toFixed(4)}, Winkel φ = {result.phiDeg.toFixed(2)}°
            </p>
          </div>
        </div>
      )}

      {/* Quick examples */}
      <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">⚡ Schnellbeispiele</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "3 + 4j", re: "3", im: "4" },
            { label: "1 + j", re: "1", im: "1" },
            { label: "-1 + √3 j", re: "-1", im: "1.732" },
            { label: "2e^(j60°)", r: "2", phi: "60" },
            { label: "5e^(j90°)", r: "5", phi: "90" },
          ].map((ex, i) => (
            <button
              key={i}
              onClick={() => {
                if ("re" in ex && ex.re !== undefined) {
                  setMode("normal");
                  setRe(ex.re);
                  setIm(ex.im!);
                } else {
                  setMode("polar");
                  setRInput(ex.r!);
                  setPhiDegInput(ex.phi!);
                }
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
