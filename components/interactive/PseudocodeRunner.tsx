"use client";

import { useState, useCallback } from "react";

interface CodeLine {
  text: string;
  indent: number;
  isLoop?: boolean;
  isCondition?: boolean;
  isComment?: boolean;
}

interface Variable {
  name: string;
  value: string | number;
}

interface StepState {
  lineIndex: number;
  variables: Variable[];
  output: string[];
  description: string;
}

const pseudocodeLines: CodeLine[] = [
  { text: "function bubbleSort(liste, n):", indent: 0, isComment: false },
  { text: "for i = 0 to n-2:", indent: 1, isLoop: true },
  { text: "for j = 0 to n-2-i:", indent: 2, isLoop: true },
  { text: "if liste[j] > liste[j+1]:", indent: 3, isCondition: true },
  { text: "temp = liste[j]", indent: 4 },
  { text: "liste[j] = liste[j+1]", indent: 4 },
  { text: "liste[j+1] = temp", indent: 4 },
  { text: "# Ende der Funktion", indent: 1, isComment: true },
];

const initialArray = [5, 3, 8, 1, 2];

const steps: StepState[] = [
  {
    lineIndex: 0,
    variables: [],
    output: [],
    description: "Funktionsdefinition: bubbleSort wird mit der Liste [5, 3, 8, 1, 2] aufgerufen.",
  },
  {
    lineIndex: 1,
    variables: [{ name: "liste", value: "[5, 3, 8, 1, 2]" }, { name: "n", value: 5 }, { name: "i", value: 0 }],
    output: [],
    description: "Äußere Schleife: i = 0. Wir durchlaufen die Liste von links nach rechts.",
  },
  {
    lineIndex: 2,
    variables: [{ name: "liste", value: "[5, 3, 8, 1, 2]" }, { name: "n", value: 5 }, { name: "i", value: 0 }, { name: "j", value: 0 }],
    output: [],
    description: "Innere Schleife: j = 0. Vergleiche benachbarte Elemente.",
  },
  {
    lineIndex: 3,
    variables: [{ name: "liste", value: "[5, 3, 8, 1, 2]" }, { name: "n", value: 5 }, { name: "i", value: 0 }, { name: "j", value: 0 }],
    output: [],
    description: "Vergleich: liste[0]=5 > liste[1]=3? → JA! Wir müssen tauschen.",
  },
  {
    lineIndex: 4,
    variables: [{ name: "liste", value: "[5, 3, 8, 1, 2]" }, { name: "n", value: 5 }, { name: "i", value: 0 }, { name: "j", value: 0 }, { name: "temp", value: 5 }],
    output: [],
    description: "temp = liste[0] = 5. Wir speichern den Wert zum Tauschen.",
  },
  {
    lineIndex: 5,
    variables: [{ name: "liste", value: "[3, 3, 8, 1, 2]" }, { name: "n", value: 5 }, { name: "i", value: 0 }, { name: "j", value: 0 }, { name: "temp", value: 5 }],
    output: [],
    description: "liste[0] = liste[1] = 3. Die 3 wandert nach links.",
  },
  {
    lineIndex: 6,
    variables: [{ name: "liste", value: "[3, 5, 8, 1, 2]" }, { name: "n", value: 5 }, { name: "i", value: 0 }, { name: "j", value: 0 }, { name: "temp", value: 5 }],
    output: ["Tausch: 5 ↔ 3"],
    description: "liste[1] = temp = 5. Fertig! Die 5 steht jetzt rechts. Nächster Vergleich...",
  },
  {
    lineIndex: 7,
    variables: [{ name: "liste", value: "[3, 5, 1, 2, 8]" }, { name: "n", value: 5 }, { name: "i", value: 0 }],
    output: ["Tausch: 5 ↔ 3", "Tausch: 8 ↔ 1", "Tausch: 8 ↔ 2"],
    description: "Durchlauf 1 abgeschlossen. Das größte Element (8) ist jetzt am Ende! 🎉",
  },
];

export function PseudocodeRunner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<"step" | "auto">("step");

  const maxSteps = steps.length;
  const state = steps[currentStep] || steps[0];

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, maxSteps - 1));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">🐢 Pseudocode Runner</h4>
        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">
          Schritt {currentStep + 1} / {maxSteps}
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-5">
        Klicke auf &quot;Nächster Schritt&quot; und beobachte, wie der Pseudocode Zeile für Zeile ausgeführt wird.
      </p>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Code-Bereich */}
        <div className="w-full lg:w-3/5">
          <div className="bg-slate-900/60 rounded-xl border border-slate-700/30 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-slate-400 font-mono ml-2">bubbleSort.pseudo</span>
            </div>
            <div className="p-4 font-mono text-sm">
              {pseudocodeLines.map((line, i) => {
                const isActive = state.lineIndex === i;
                return (
                  <div
                    key={i}
                    className={`py-1 px-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600/30 border-l-4 border-blue-400 text-white"
                        : "text-slate-400 border-l-4 border-transparent"
                    }`}
                    style={{ paddingLeft: `${line.indent * 20 + 12}px` }}
                  >
                    <span className="text-slate-600 mr-3 select-none text-xs">{i + 1}</span>
                    <span
                      className={
                        line.isComment
                          ? "text-slate-600 italic"
                          : line.isLoop
                          ? "text-amber-400"
                          : line.isCondition
                          ? "text-purple-400"
                          : "text-slate-200"
                      }
                    >
                      {line.text}
                    </span>
                    {isActive && (
                      <span className="ml-2 text-blue-400 animate-pulse">◀</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
            >
              ← Zurück
            </button>
            <button
              onClick={reset}
              className="px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-700 transition-all text-sm font-semibold"
            >
              ↺ Reset
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep >= maxSteps - 1}
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl disabled:opacity-20 hover:bg-purple-500 transition-all text-sm font-semibold shadow-lg shadow-purple-500/20"
            >
              Nächster Schritt →
            </button>
          </div>
        </div>

        {/* Info-Panel */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          {/* Beschreibung */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
            <p className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-2">Aktueller Schritt</p>
            <p className="text-sm text-slate-200 leading-relaxed">{state.description}</p>
          </div>

          {/* Variablen */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-3">Variablen</p>
            <div className="space-y-1.5">
              {state.variables.map((v) => (
                <div key={v.name} className="flex items-center justify-between px-3 py-1.5 bg-slate-900/40 rounded-lg">
                  <span className="text-xs font-mono text-amber-400">{v.name}</span>
                  <span className="text-xs font-mono text-slate-300">{String(v.value)}</span>
                </div>
              ))}
              {state.variables.length === 0 && (
                <p className="text-xs text-slate-600 italic">Keine Variablen</p>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30 flex-1">
            <p className="text-xs text-green-400 font-bold uppercase tracking-wider mb-3">Output</p>
            <div className="space-y-1">
              {state.output.map((o, i) => (
                <div key={i} className="text-xs font-mono text-green-300 bg-green-900/20 px-3 py-1 rounded">
                  {o}
                </div>
              ))}
              {state.output.length === 0 && (
                <p className="text-xs text-slate-600 italic">Kein Output</p>
              )}
            </div>
          </div>

          {/* Array-Visualisierung */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">Array</p>
            <div className="flex gap-1.5 justify-center">
              {initialArray.map((val, i) => {
                const currentVal = state.variables.find((v) => v.name === "liste");
                let displayVal = val;
                if (currentVal && typeof currentVal.value === "string") {
                  try {
                    const arr = JSON.parse(currentVal.value);
                    if (arr[i] !== undefined) displayVal = arr[i];
                  } catch {
                    // ignore
                  }
                }
                return (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-slate-700/60 border border-slate-600/40 flex items-center justify-center text-sm font-bold text-white"
                  >
                    {displayVal}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
