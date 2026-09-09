"use client";

// ChoiceExerciseView — Multiple Choice:
//   - Optionen werden bei JEDEM Aufruf gemischt (Positionen auswendig lernen
//     wäre sonst möglich).
//   - Zifferntasten 1–n wählen, Auswahl löst sofort auf (explanation zeigt
//     auch, warum die anderen falsch sind).
//   - Enter geht weiter.

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { InlineText } from "../InlineText";
import { shuffle } from "@/lib/exercises/scoring";
import type { ChoiceExercise } from "@/lib/exercises/types";
import type { ExerciseViewProps } from "./types";

type Phase = "answering" | "resolved";

export function ChoiceExerciseView({
  exercise,
  index,
  total,
  onComplete,
}: ExerciseViewProps & { exercise: ChoiceExercise }) {
  const [phase, setPhase] = useState<Phase>("answering");
  const [selected, setSelected] = useState<number | null>(null);
  // Einmal pro Mount gemischt — die richtige Option steht an wechselnder Stelle.
  const [options] = useState<string[]>(() => shuffle(exercise.options));
  const correctDisplayIndex = options.indexOf(exercise.options[exercise.correctIndex]);
  const doneRef = useRef(false);

  const select = useCallback(
    (i: number) => {
      if (phase !== "answering") return;
      setSelected(i);
      setPhase("resolved");
    },
    [phase]
  );

  const complete = useCallback(() => {
    if (doneRef.current || selected === null || phase !== "resolved") return;
    doneRef.current = true;
    onComplete({ exercise, score: selected === correctDisplayIndex ? 1 : 0 });
  }, [selected, correctDisplayIndex, phase, exercise, onComplete]);

  // Zifferntasten 1–n wählen die Optionen, Enter geht nach der Auflösung weiter.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      if (phase === "answering") {
        const digit = Number(event.key);
        if (Number.isInteger(digit) && digit >= 1 && digit <= options.length) {
          event.preventDefault();
          select(digit - 1);
        }
        return;
      }
      if (phase === "resolved" && event.key === "Enter") {
        if (target?.tagName === "BUTTON") return; // nativer Klick übernimmt
        event.preventDefault();
        complete();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, options.length, select, complete]);

  return (
    <div className="space-y-4">
      <p className="text-slate-200 leading-relaxed">
        <InlineText text={exercise.prompt} />
      </p>

      <div className="space-y-2">
        {options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrectOption = i === correctDisplayIndex;
          const stateClass =
            phase === "answering"
              ? "border-slate-700/60 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-700/40 cursor-pointer"
              : isCorrectOption
                ? "border-emerald-500/60 bg-emerald-500/10"
                : isSelected
                  ? "border-red-500/60 bg-red-500/10"
                  : "border-slate-700/40 bg-slate-800/40 opacity-60";
          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={phase !== "answering"}
              className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${stateClass}`}
            >
              <kbd className="w-6 h-6 flex-shrink-0 rounded-md bg-slate-700/60 text-slate-300 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </kbd>
              <span className="text-sm text-slate-200 flex-1">
                <InlineText text={option} />
              </span>
              {phase === "resolved" && isCorrectOption && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
              {phase === "resolved" && isSelected && !isCorrectOption && (
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {phase === "resolved" && (
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3">
            <p className="text-sm font-semibold text-slate-300 mb-1.5">
              {selected === correctDisplayIndex ? "Erklärung" : "Auflösung"}
            </p>
            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              <InlineText text={exercise.explanation} />
            </p>
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
