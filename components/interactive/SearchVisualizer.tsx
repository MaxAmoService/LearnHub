"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type SearchAlgorithm = "linear" | "binary";

interface SearchStep {
  array: number[];
  current: number;
  found: number;
  left: number;
  right: number;
  mid: number;
  description: string;
  foundIndex: number;
}

function generateLinearSearchSteps(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  const sorted = [...arr].sort((a, b) => a - b);

  steps.push({
    array: [...arr],
    current: -1,
    found: -1,
    left: 0,
    right: arr.length - 1,
    mid: -1,
    description: `Starte lineare Suche nach ${target} in [${arr.join(", ")}]`,
    foundIndex: -1,
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      current: i,
      found: -1,
      left: 0,
      right: arr.length - 1,
      mid: -1,
      description: `Prüfe arr[${i}] = ${arr[i]} — ${arr[i] === target ? "✅ Gefunden!" : "❌ nicht gesucht"}`,
      foundIndex: arr[i] === target ? i : -1,
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        current: i,
        found: i,
        left: 0,
        right: arr.length - 1,
        mid: -1,
        description: `🎉 Ziel ${target} gefunden an Index ${i}!`,
        foundIndex: i,
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    current: -1,
    found: -1,
    left: 0,
    right: arr.length - 1,
    mid: -1,
    description: `❌ ${target} wurde in der Liste nicht gefunden.`,
    foundIndex: -1,
  });

  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number): SearchStep[] {
  const sorted = [...arr].sort((a, b) => a - b);
  const steps: SearchStep[] = [];

  steps.push({
    array: [...sorted],
    current: -1,
    found: -1,
    left: 0,
    right: sorted.length - 1,
    mid: -1,
    description: `Starte binäre Suche nach ${target} in sortierter Liste [${sorted.join(", ")}]`,
    foundIndex: -1,
  });

  let left = 0;
  let right = sorted.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...sorted],
      current: mid,
      found: -1,
      left,
      right,
      mid,
      description: `Mitte: (${left}+${right})/2 = ${mid} → arr[${mid}] = ${sorted[mid]}`,
      foundIndex: -1,
    });

    if (sorted[mid] === target) {
      steps.push({
        array: [...sorted],
        current: mid,
        found: mid,
        left,
        right,
        mid,
        description: `🎉 ${sorted[mid]} === ${target} → Gefunden an Index ${mid}!`,
        foundIndex: mid,
      });
      return steps;
    } else if (sorted[mid] < target) {
      steps.push({
        array: [...sorted],
        current: mid,
        found: -1,
        left,
        right,
        mid,
        description: `${sorted[mid]} < ${target} → Suche rechts (left = ${mid + 1})`,
        foundIndex: -1,
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...sorted],
        current: mid,
        found: -1,
        left,
        right,
        mid,
        description: `${sorted[mid]} > ${target} → Suche links (right = ${mid - 1})`,
        foundIndex: -1,
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...sorted],
    current: -1,
    found: -1,
    left,
    right,
    mid: -1,
    description: `❌ ${target} wurde in der Liste nicht gefunden.`,
    foundIndex: -1,
  });

  return steps;
}

const defaultArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

export function SearchVisualizer() {
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>("linear");
  const [target, setTarget] = useState(23);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [inputValue, setInputValue] = useState(defaultArray.join(", "));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = useCallback(() => {
    const arr = inputValue
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (arr.length === 0) return generateLinearSearchSteps(defaultArray, target);
    return algorithm === "linear"
      ? generateLinearSearchSteps(arr, target)
      : generateBinarySearchSteps(arr, target);
  }, [algorithm, inputValue, target])();

  const maxSteps = steps.length;
  const state = steps[currentStep] || steps[0];
  const maxVal = Math.max(...state.array, 1);

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
  }, [algorithm, inputValue, target]);

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">🔍 Such-Visualizer</h4>
        <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs rounded-full font-medium">
          Schritt {currentStep + 1} / {maxSteps}
        </span>
      </div>

      {/* Algorithm Toggle */}
      <div className="flex gap-2 mb-4">
        {([
          { key: "linear" as const, label: "📏 Lineare Suche", desc: "O(n)" },
          { key: "binary" as const, label: "🔀 Binäre Suche", desc: "O(log n)" },
        ]).map((a) => (
          <button
            key={a.key}
            onClick={() => setAlgorithm(a.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              algorithm === a.key
                ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30"
                : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {a.label} <span className="text-xs opacity-60">({a.desc})</span>
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="text-xs text-slate-500 mb-1 block">Array</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700/30 rounded-lg text-sm text-slate-200 font-mono focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <div className="w-24">
          <label className="text-xs text-slate-500 mb-1 block">Ziel</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700/30 rounded-lg text-sm text-slate-200 font-mono focus:outline-none focus:border-teal-500/50"
          />
        </div>
      </div>

      {/* Balken-Visualisierung */}
      <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 mb-4">
        <div className="flex items-end justify-center gap-1" style={{ height: 200 }}>
          {state.array.map((val, i) => {
            const height = (val / maxVal) * 180;
            const isCurrent = state.current === i;
            const isFound = state.foundIndex === i;
            const isInRange = algorithm === "binary" && i >= state.left && i <= state.right;
            const isMid = algorithm === "binary" && i === state.mid;

            let bg = "bg-slate-600";
            if (isFound) bg = "bg-emerald-500";
            else if (isMid) bg = "bg-amber-500";
            else if (isCurrent) bg = "bg-cyan-500";
            else if (isInRange) bg = "bg-slate-500";

            let border = "";
            if (isFound) border = "ring-2 ring-emerald-400";
            else if (isCurrent) border = "ring-2 ring-cyan-400";

            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className={`text-xs font-mono ${isFound ? "text-emerald-400 font-bold" : isCurrent ? "text-cyan-400" : "text-slate-400"}`}>
                  {val}
                </span>
                <div
                  className={`${bg} ${border} rounded-t-md transition-all duration-200`}
                  style={{ height, width: Math.max(24, 360 / state.array.length - 4) }}
                />
                <span className="text-xs text-slate-600 font-mono">{i}</span>
              </div>
            );
          })}
        </div>
        {/* Bereichsmarkierung für binäre Suche */}
        {algorithm === "binary" && state.left <= state.right && (
          <div className="mt-3 flex justify-center">
            <div className="flex items-center gap-3 text-xs">
              <span className="text-blue-400">left={state.left}</span>
              <span className="text-amber-400">mid={state.mid}</span>
              <span className="text-purple-400">right={state.right}</span>
            </div>
          </div>
        )}
      </div>

      {/* Beschreibung */}
      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/30 mb-4">
        <p className="text-sm text-slate-200 text-center">{state.description}</p>
      </div>

      {/* Speed Slider */}
      <div className="mb-4">
        <label className="text-xs text-slate-500 mb-1 block">Geschwindigkeit: {speed}ms</label>
        <input
          type="range"
          min={100}
          max={2000}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-full accent-teal-500"
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
          className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-500 transition-all text-sm font-semibold shadow-lg shadow-teal-500/20"
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
          className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-xl disabled:opacity-20 hover:bg-teal-500 transition-all text-sm font-semibold shadow-lg shadow-teal-500/20"
        >
          Weiter →
        </button>
      </div>

      {/* Legende */}
      <div className="flex gap-4 mt-4 justify-center flex-wrap">
        {[
          { color: "bg-cyan-500", label: "Aktuell prüfen" },
          { color: "bg-amber-500", label: "Mitte (binär)" },
          { color: "bg-emerald-500", label: "Gefunden!" },
          { color: "bg-slate-500", label: "Suchbereich" },
          { color: "bg-slate-600", label: "Außerhalb" },
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
