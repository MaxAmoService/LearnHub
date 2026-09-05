"use client";
import { useState } from "react";

type Op = "add" | "sub" | "mul" | "div";

interface Step {
  label: string;
  value: string;
}

function parseComplex(s: string): { re: number; im: number } | null {
  // Try to parse "a+bj" or "a-bj" or "a" or "bj"
  const cleaned = s.replace(/\s+/g, "").replace(/i/g, "j");
  const m = cleaned.match(/^([+-]?[\d.]+)?([+-][\d.]*)?j?$/);
  if (!m) return null;
  const re = m[1] ? parseFloat(m[1]) : 0;
  const imRaw = m[2];
  let im = 0;
  if (imRaw !== undefined) {
    if (imRaw === "+" || imRaw === "-") {
      im = imRaw === "-" ? -1 : 1;
    } else {
      im = parseFloat(imRaw);
    }
  }
  if (!cleaned.includes("j")) return { re, im: 0 };
  return { re, im };
}

function fmt(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  return r % 1 === 0 ? r.toString() : r.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

function fmtC(re: number, im: number): string {
  if (im === 0) return fmt(re);
  if (re === 0) return `${fmt(im)}j`;
  return `${fmt(re)} ${im >= 0 ? "+" : "−"} ${fmt(Math.abs(im))}j`;
}

export function ComplexOperationsCalculator() {
  const [z1Input, setZ1Input] = useState("2+3j");
  const [z2Input, setZ2Input] = useState("1-4j");
  const [op, setOp] = useState<Op>("mul");
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setSteps([]);
    setResult("");

    const a = parseComplex(z1Input);
    const b = parseComplex(z2Input);
    if (!a || !b) {
      setError("Ungültige Eingabe. Format: a+bj (z.B. 3+2j, -1-j, 4, 2j)");
      return;
    }

    const newSteps: Step[] = [];
    let re: number, im: number;

    newSteps.push({
      label: "z₁",
      value: `${fmtC(a.re, a.im)} (Re=${fmt(a.re)}, Im=${fmt(a.im)})`,
    });
    newSteps.push({
      label: "z₂",
      value: `${fmtC(b.re, b.im)} (Re=${fmt(b.re)}, Im=${fmt(b.im)})`,
    });

    switch (op) {
      case "add":
        re = a.re + b.re;
        im = a.im + b.im;
        newSteps.push({ label: "Re(z₁+z₂)", value: `${fmt(a.re)} + ${fmt(b.re)} = ${fmt(re)}` });
        newSteps.push({ label: "Im(z₁+z₂)", value: `${fmt(a.im)} + ${fmt(b.im)} = ${fmt(im)}` });
        break;
      case "sub":
        re = a.re - b.re;
        im = a.im - b.im;
        newSteps.push({ label: "Re(z₁−z₂)", value: `${fmt(a.re)} − ${fmt(b.re)} = ${fmt(re)}` });
        newSteps.push({ label: "Im(z₁−z₂)", value: `${fmt(a.im)} − ${fmt(b.im)} = ${fmt(im)}` });
        break;
      case "mul":
        re = a.re * b.re - a.im * b.im;
        im = a.re * b.im + a.im * b.re;
        newSteps.push({
          label: "Re(z₁·z₂)",
          value: `${fmt(a.re)}·${fmt(b.re)} − ${fmt(a.im)}·${fmt(b.im)} = ${fmt(a.re * b.re)} − ${fmt(a.im * b.im)} = ${fmt(re)}`,
        });
        newSteps.push({
          label: "Im(z₁·z₂)",
          value: `${fmt(a.re)}·${fmt(b.im)} + ${fmt(a.im)}·${fmt(b.re)} = ${fmt(a.re * b.im)} + ${fmt(a.im * b.re)} = ${fmt(im)}`,
        });
        break;
      case "div": {
        const denom = b.re * b.re + b.im * b.im;
        if (denom === 0) {
          setError("Division durch 0 nicht erlaubt!");
          return;
        }
        const conjRe = b.re;
        const conjIm = -b.im;
        newSteps.push({ label: "Konjugiertes z̄₂", value: fmtC(conjRe, conjIm) });
        newSteps.push({ label: "z₂·z̄₂ = |z₂|²", value: `${fmt(denom)}` });

        const numRe = a.re * conjRe - a.im * conjIm;
        const numIm = a.re * conjIm + a.im * conjRe;
        newSteps.push({
          label: "z₁·z̄₂",
          value: `${fmtC(numRe, numIm)}`,
        });

        re = numRe / denom;
        im = numIm / denom;
        newSteps.push({
          label: "Ergebnis",
          value: `${fmtC(numRe, numIm)} / ${fmt(denom)}`,
        });
        break;
      }
    }

    newSteps.push({ label: "═══", value: "══════════════" });
    newSteps.push({ label: "z₁ ○ z₂", value: fmtC(re, im) });

    // Also show polar form
    const r = Math.sqrt(re * re + im * im);
    let phi = (Math.atan2(im, re) * 180) / Math.PI;
    if (phi < 0) phi += 360;
    newSteps.push({ label: "Polarform", value: `${fmt(r)} · e^(j·${phi.toFixed(1)}°)` });

    setSteps(newSteps);
    setResult(fmtC(re, im));
  };

  const opLabels: Record<Op, string> = {
    add: "z₁ + z₂",
    sub: "z₁ − z₂",
    mul: "z₁ · z₂",
    div: "z₁ / z₂",
  };

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-300 font-mono text-lg">z₁ =</span>
          <input
            type="text"
            value={z1Input}
            onChange={(e) => setZ1Input(e.target.value)}
            className="w-32 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
            placeholder="2+3j"
          />
          <div className="flex gap-1">
            {(["add", "sub", "mul", "div"] as Op[]).map((o) => (
              <button
                key={o}
                onClick={() => setOp(o)}
                className={`w-10 h-10 rounded-lg font-mono text-lg font-bold transition ${
                  op === o
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700/50 text-slate-400 hover:text-slate-200"
                }`}
              >
                {o === "add" ? "+" : o === "sub" ? "−" : o === "mul" ? "·" : "÷"}
              </button>
            ))}
          </div>
          <span className="text-slate-300 font-mono text-lg">z₂ =</span>
          <input
            type="text"
            value={z2Input}
            onChange={(e) => setZ2Input(e.target.value)}
            className="w-32 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center font-mono"
            placeholder="1-4j"
          />
        </div>
        <button
          onClick={calculate}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition"
        >
          {opLabels[op]} berechnen
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-xl text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Steps */}
      {steps.length > 0 && (
        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
          <h4 className="text-sm font-semibold text-green-400 mb-3">📝 Rechenschritte</h4>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-slate-500 font-mono text-xs w-20 flex-shrink-0 text-right pt-0.5">
                  {step.label}
                </span>
                <span className="text-slate-200 font-mono text-sm">{step.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="p-4 bg-green-900/20 rounded-xl border border-green-700/30 text-center">
          <p className="text-green-400 text-sm mb-1">Ergebnis</p>
          <p className="text-white font-mono text-2xl font-bold">{result}</p>
        </div>
      )}

      {/* Examples */}
      <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">⚡ Beispiele</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { z1: "3+2j", z2: "1+4j", op: "mul" as Op, label: "(3+2j)·(1+4j)" },
            { z1: "4+2j", z2: "1-j", op: "div" as Op, label: "(4+2j)/(1-j)" },
            { z1: "2+3j", z2: "1-2j", op: "add" as Op, label: "(2+3j)+(1-2j)" },
            { z1: "5+j", z2: "3+4j", op: "sub" as Op, label: "(5+j)−(3+4j)" },
          ].map((ex, i) => (
            <button
              key={i}
              onClick={() => {
                setZ1Input(ex.z1);
                setZ2Input(ex.z2);
                setOp(ex.op);
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
