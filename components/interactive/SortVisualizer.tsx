"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type Algorithm = "bubble" | "selection" | "insertion";

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  description: string;
  comparisons: number;
  swaps: number;
}

function generateBubbleSortSteps(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    description: "Start: Unsortiertes Array",
    comparisons: 0,
    swaps: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        description: `Vergleiche arr[${j}]=${arr[j]} mit arr[${j + 1}]=${arr[j + 1]}`,
        comparisons,
        swaps,
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          description: `Tausche: ${arr[j + 1]} ↔ ${arr[j]}`,
          comparisons,
          swaps,
        });
      }
    }
    sorted.unshift(n - 1 - i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `Durchlauf ${i + 1} abgeschlossen. Element ${arr[n - 1 - i]} ist sortiert.`,
      comparisons,
      swaps,
    });
  }
  sorted.unshift(0);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    description: "Fertig! Array ist sortiert. ✅",
    comparisons,
    swaps,
  });

  return steps;
}

function generateSelectionSortSteps(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: "Start: Unsortiertes Array",
    comparisons: 0,
    swaps: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        description: `Suche Minimum: arr[${minIdx}]=${arr[minIdx]} vs arr[${j}]=${arr[j]}`,
        comparisons,
        swaps,
      });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        description: `Tausche Minimum ${arr[minIdx]} an Position ${i}`,
        comparisons,
        swaps,
      });
    }
    sorted.push(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `Position ${i} sortiert: ${arr[i]}`,
      comparisons,
      swaps,
    });
  }
  sorted.push(n - 1);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    description: "Fertig! Array ist sortiert. ✅",
    comparisons,
    swaps,
  });

  return steps;
}

function generateInsertionSortSteps(input: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [0],
    description: "Start: Erstes Element gilt als sortiert",
    comparisons: 0,
    swaps: 0,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Nehme arr[${i}]=${key} und füge es an der richtigen Stelle ein`,
      comparisons,
      swaps,
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      swaps++;
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Verschiebe arr[${j}]=${arr[j]} nach rechts`,
        comparisons,
        swaps,
      });
      j--;
    }
    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Setze ${key} an Position ${j + 1}`,
      comparisons,
      swaps,
    });
  }
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    description: "Fertig! Array ist sortiert. ✅",
    comparisons,
    swaps,
  });

  return steps;
}

const defaultArray = [64, 34, 25, 12, 22, 11, 90];

export function SortVisualizer() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [inputValue, setInputValue] = useState(defaultArray.join(", "));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = useCallback(() => {
    const arr = inputValue.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
    if (arr.length === 0) return generateBubbleSortSteps(defaultArray);
    switch (algorithm) {
      case "bubble": return generateBubbleSortSteps(arr);
      case "selection": return generateSelectionSortSteps(arr);
      case "insertion": return generateInsertionSortSteps(arr);
    }
  }, [algorithm, inputValue])();

  const maxSteps = steps.length;
  const state = steps[currentStep] || steps[0];
  const maxVal = Math.max(...state.array);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, maxSteps - 1));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((s) => {
          if (s >= maxSteps - 1) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, maxSteps]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, inputValue]);

  const algorithmLabels: Record<Algorithm, string> = {
    bubble: "🫧 Bubblesort",
    selection: "👆 Selectionsort",
    insertion: "📥 Insertionsort",
  };

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📊 Sortier-Visualizer</h4>
        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-medium">
          Schritt {currentStep + 1} / {maxSteps}
        </span>
      </div>

      {/* Algorithm Toggle */}
      <div className="flex gap-2 mb-4">
        {(["bubble", "selection", "insertion"] as Algorithm[]).map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              algorithm === algo
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {algorithmLabels[algo]}
          </button>
        ))}
      </div>

      {/* Array Input */}
      <div className="mb-4">
        <label className="text-xs text-slate-500 mb-1 block">Array (kommagetrennt)</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700/30 rounded-lg text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500/50"
          placeholder="64, 34, 25, 12, 22, 11, 90"
        />
      </div>

      {/* Balken-Visualisierung */}
      <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 mb-4">
        <div className="flex items-end justify-center gap-1" style={{ height: 200 }}>
          {state.array.map((val, i) => {
            const height = (val / maxVal) * 180;
            const isComparing = state.comparing.includes(i);
            const isSwapping = state.swapping.includes(i);
            const isSorted = state.sorted.includes(i);

            let bg = "bg-slate-600";
            if (isSwapping) bg = "bg-red-500";
            else if (isComparing) bg = "bg-amber-500";
            else if (isSorted) bg = "bg-emerald-500";

            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-slate-400 font-mono">{val}</span>
                <div
                  className={`${bg} rounded-t-md transition-all duration-200`}
                  style={{ height, width: Math.max(24, 360 / state.array.length - 4) }}
                />
                <span className="text-xs text-slate-600 font-mono">{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Beschreibung */}
      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/30 mb-4">
        <p className="text-sm text-slate-200 text-center">{state.description}</p>
      </div>

      {/* Statistiken */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 p-3 bg-slate-800/40 rounded-xl border border-slate-700/20 text-center">
          <p className="text-xs text-slate-500">Vergleiche</p>
          <p className="text-lg font-bold text-amber-400">{state.comparisons}</p>
        </div>
        <div className="flex-1 p-3 bg-slate-800/40 rounded-xl border border-slate-700/20 text-center">
          <p className="text-xs text-slate-500">Tausche</p>
          <p className="text-lg font-bold text-red-400">{state.swaps}</p>
        </div>
        <div className="flex-1 p-3 bg-slate-800/40 rounded-xl border border-slate-700/20 text-center">
          <p className="text-xs text-slate-500">Fortschritt</p>
          <p className="text-lg font-bold text-cyan-400">{Math.round(((currentStep + 1) / maxSteps) * 100)}%</p>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="mb-4">
        <label className="text-xs text-slate-500 mb-1 block">Geschwindigkeit: {speed}ms</label>
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
        >
          ← Zurück
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-5 py-2.5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 transition-all text-sm font-semibold shadow-lg shadow-cyan-500/20"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
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
          className="flex-1 px-4 py-2.5 bg-cyan-600 text-white rounded-xl disabled:opacity-20 hover:bg-cyan-500 transition-all text-sm font-semibold shadow-lg shadow-cyan-500/20"
        >
          Weiter →
        </button>
      </div>

      {/* Legende */}
      <div className="flex gap-4 mt-4 justify-center">
        {[
          { color: "bg-amber-500", label: "Vergleicht" },
          { color: "bg-red-500", label: "Tauscht" },
          { color: "bg-emerald-500", label: "Sortiert" },
          { color: "bg-slate-600", label: "Unsortiert" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${l.color}`} />
            <span className="text-xs text-slate-400">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
