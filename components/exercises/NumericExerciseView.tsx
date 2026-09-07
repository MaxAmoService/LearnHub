"use client";

// NumericExerciseView — automatisch prüfbare Rechenaufgabe.
//   1. Eingabe (Enter = Prüfen). Komma/Punkt als Dezimaltrenner,
//      Tausenderpunkte und Leerzeichen ignoriert (lib/exercises/scoring.ts).
//      Die Einheit wird NUR angezeigt, nicht mit eingetippt.
//   2. Nach der Prüfung: richtig/falsch + Rechenweg (explanation).
//   3. Weiter (Enter).

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { checkNumericAnswer } from "@/lib/exercises/scoring";
import type { NumericExercise } from "@/lib/exercises/types";
import type { ExerciseViewProps } from "./types";

type Phase = "answering" | "resolved";

export function NumericExerciseView({
  exercise,
  index,
  total,
  onComplete,
}: ExerciseViewProps & { exercise: NumericExercise }) {
  const [phase, setPhase] = useState<Phase>("answering");
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const doneRef = useRef(false);

  const check = useCallback(() => {
    if (phase !== "answering") return;
    const value = input.trim();
    if (value.length === 0) return;
    setIsCorrect(checkNumericAnswer(value, exercise.answer, exercise.tolerance));
    setPhase("resolved");
  }, [phase, input, exercise.answer, exercise.tolerance]);

  const complete = useCallback(() => {
    if (doneRef.current || phase !== "resolved") return;
    doneRef.current = true;
    onComplete({ exercise, score: isCorrect ? 1 : 0 });
  }, [phase, isCorrect, exercise, onComplete]);

  // Enter geht nach der Auflösung weiter.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (phase !== "resolved" || event.key !== "Enter") return;
      if (target?.tagName === "BUTTON") return; // nativer Klick übernimmt
      event.preventDefault();
      complete();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, complete]);

  const isStringAnswer = typeof exercise.answer === "string";

  return (
    <div className="space-y-4">
      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{exercise.prompt}</p>

      <div className="flex items-center gap-2">
        <input
          autoFocus
          type="text"
          inputMode={isStringAnswer ? "text" : "decimal"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && phase === "answering") {
              e.preventDefault();
              e.stopPropagation();
              check();
            }
          }}
          disabled={phase !== "answering"}
          placeholder={isStringAnswer ? "z. B. 0011 0100" : "Deine Antwort"}
          className={`flex-1 px-3 py-2 rounded-lg bg-slate-900/60 border outline-none text-sm text-white placeholder:text-slate-600 disabled:opacity-60 ${
            phase === "resolved"
              ? isCorrect
                ? "border-emerald-500/60"
                : "border-red-500/60"
              : "border-slate-700 focus:border-blue-500"
          }`}
        />
        {typeof exercise.unit === "string" && exercise.unit.length > 0 && (
          <span className="text-sm text-slate-400 flex-shrink-0">{exercise.unit}</span>
        )}
        {phase === "answering" && (
          <button
            onClick={check}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all flex-shrink-0"
          >
            Prüfen
          </button>
        )}
      </div>

      {phase === "resolved" && (
        <div className="space-y-3">
          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              isCorrect ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Richtig!
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" /> Leider falsch.
              </>
            )}
          </div>

          <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3">
            <p className="text-sm font-semibold text-slate-300 mb-1.5">Rechenweg</p>
            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {exercise.explanation}
            </p>
            {isStringAnswer && (
              <p className="mt-2 text-xs text-slate-500">
                Richtige Antwort: <span className="text-slate-300 font-medium">{exercise.answer}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              {index + 1} von {total}
            </p>
            <button
              onClick={complete}
              autoFocus
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold text-white transition-colors"
            >
              Weiter <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
