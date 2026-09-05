"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, RotateCcw, ArrowRight, Lightbulb } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ConflictLine {
  type: "ours" | "theirs" | "separator" | "conflict-start" | "conflict-end" | "normal";
  content: string;
}

interface Exercise {
  title: string;
  description: string;
  filename: string;
  conflictLines: ConflictLine[];
  correctResolution: string;
  explanation: string;
}

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

const EXERCISES: Exercise[] = [
  {
    title: "Einfacher Merge-Konflikt",
    description: "Zwei Entwickler haben die gleiche Zeile in der README.md geändert.",
    filename: "README.md",
    conflictLines: [
      { type: "normal", content: "# Mein Projekt" },
      { type: "normal", content: "" },
      { type: "conflict-start", content: "<<<<<<< HEAD" },
      { type: "ours", content: "Dies ist ein tolles Projekt." },
      { type: "separator", content: "=======" },
      { type: "theirs", content: "Dies ist ein großartiges Projekt!" },
      { type: "conflict-end", content: ">>>>>>> feature/bessere-beschreibung" },
      { type: "normal", content: "" },
      { type: "normal", content: "## Installation" },
      { type: "normal", content: "npm install" },
    ],
    correctResolution: "Dies ist ein großartiges Projekt!",
    explanation: "Die Feature-Branch-Version ist ausdrucksstärker. Im Zweifel die neuere/verbesserte Version übernehmen.",
  },
  {
    title: "Code-Konflikt",
    description: "Beide haben die Berechnung in calculator.js geändert — einmal mit Bonus, einmal ohne.",
    filename: "calculator.js",
    conflictLines: [
      { type: "normal", content: "function berechnePreis(menge, preis) {" },
      { type: "conflict-start", content: "<<<<<<< HEAD" },
      { type: "ours", content: "  return menge * preis;" },
      { type: "separator", content: "=======" },
      { type: "theirs", content: "  const rabatt = menge > 10 ? 0.9 : 1;" },
      { type: "theirs", content: "  return menge * preis * rabatt;" },
      { type: "conflict-end", content: ">>>>>>> feature/volumenrabatt" },
      { type: "normal", content: "}" },
    ],
    correctResolution: "const rabatt = menge > 10 ? 0.9 : 1;\n  return menge * preis * rabatt;",
    explanation: "Die Feature-Branch-Version enthält den neuen Rabatt-Feature. Diese übernehmen, da sie die alte Funktionalität einschließt.",
  },
  {
    title: "Import-Konflikt",
    description: "Zwei Branches haben verschiedene Imports hinzugefügt.",
    filename: "app.js",
    conflictLines: [
      { type: "conflict-start", content: "<<<<<<< HEAD" },
      { type: "ours", content: "import { Logger } from './utils/logger';" },
      { type: "separator", content: "=======" },
      { type: "theirs", content: "import { Cache } from './utils/cache';" },
      { type: "conflict-end", content: ">>>>>>> feature/caching" },
      { type: "normal", content: "" },
      { type: "normal", content: "const app = new App();" },
    ],
    correctResolution: "import { Logger } from './utils/logger';\nimport { Cache } from './utils/cache';",
    explanation: "Beide Imports werden benötigt — beide behalten! Bei Merge-Konflikten bei Imports oft die Lösung.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MergeConflictResolver() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [userResolution, setUserResolution] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const exercise = EXERCISES[exerciseIndex];

  const checkResolution = () => {
    const normalized = userResolution.trim().replace(/\s+/g, " ");
    const correct = exercise.correctResolution.trim().replace(/\s+/g, " ");
    setIsCorrect(normalized === correct);
    setShowResult(true);
  };

  const nextExercise = () => {
    const next = (exerciseIndex + 1) % EXERCISES.length;
    setExerciseIndex(next);
    setUserResolution("");
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const reset = () => {
    setUserResolution("");
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const loadExample = () => {
    setUserResolution(exercise.correctResolution);
  };

  return (
    <div className="space-y-6">
      {/* Exercise selector */}
      <div className="flex gap-2">
        {EXERCISES.map((ex, i) => (
          <button
            key={i}
            onClick={() => {
              setExerciseIndex(i);
              reset();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              i === exerciseIndex
                ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                : "bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-300"
            }`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="glass rounded-lg p-3 border border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-300 font-medium">{exercise.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{exercise.description}</p>
          </div>
        </div>
      </div>

      {/* Conflict view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Conflict with markers */}
        <div>
          <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
            📄 {exercise.filename} (mit Konflikt-Markern)
          </div>
          <div className="bg-[#0d1117] rounded-lg border border-slate-700/50 font-mono text-xs overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 border-b border-slate-700/50">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-500 text-xs">{exercise.filename}</span>
            </div>
            <div className="p-3 space-y-0.5">
              {exercise.conflictLines.map((line, i) => (
                <div
                  key={i}
                  className={`px-2 py-0.5 rounded ${
                    line.type === "ours"
                      ? "bg-blue-500/15 text-blue-300"
                      : line.type === "theirs"
                      ? "bg-green-500/15 text-green-300"
                      : line.type === "separator"
                      ? "bg-slate-700/30 text-slate-500"
                      : line.type === "conflict-start" || line.type === "conflict-end"
                      ? "bg-red-500/10 text-red-400 font-bold"
                      : "text-slate-300"
                  }`}
                >
                  <span className="text-slate-600 select-none mr-2 w-5 inline-block text-right">{i + 1}</span>
                  {line.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: User resolution */}
        <div>
          <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
            ✏️ Deine Lösung (Konflikt-Marker entfernen)
          </div>
          <textarea
            value={userResolution}
            onChange={(e) => {
              setUserResolution(e.target.value);
              setShowResult(false);
            }}
            className="w-full h-64 bg-[#0d1117] border border-slate-700/50 rounded-lg p-3 font-mono text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            placeholder="Schreibe hier die bereinigte Version des Konflikts..."
            spellCheck={false}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={loadExample}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-400 transition-colors"
            >
              Beispiel laden
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-400 transition-colors flex items-center gap-1"
            >
              <Lightbulb className="w-3 h-3" />
              Tipp
            </button>
          </div>
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="glass rounded-lg p-3 border border-blue-500/30 bg-blue-500/5 animate-fade-in">
          <p className="text-sm text-blue-300">
            <strong>Tipp:</strong> Entferne die Marker (&lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt;) und
            behalte die richtige Version. Oft müssen beide Seiten kombiniert werden!
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={checkResolution}
          disabled={!userResolution.trim()}
          className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Prüfen
        </button>
        <button
          onClick={nextExercise}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors flex items-center gap-2"
        >
          Nächstes
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Result */}
      {showResult && (
        <div
          className={`glass rounded-lg p-4 border animate-fade-in ${
            isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
          }`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`font-medium text-sm ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                {isCorrect ? "Richtig! Konflikt korrekt gelöst." : "Noch nicht ganz richtig."}
              </p>
              <p className="text-xs text-slate-400 mt-1">{exercise.explanation}</p>
              {!isCorrect && (
                <button
                  onClick={loadExample}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Richtige Lösung anzeigen
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/40" />
          <span>Unsere Version (HEAD)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40" />
          <span>Deren Version (Feature-Branch)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-500/10 border border-red-500/30" />
          <span>Konflikt-Marker</span>
        </div>
      </div>
    </div>
  );
}
