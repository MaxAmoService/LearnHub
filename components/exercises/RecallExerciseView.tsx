"use client";

// RecallExerciseView — freies Abrufen mit Selbstvergleich:
//   1. Eigener Versuch im Textfeld (Enter = „Lösung zeigen", Shift+Enter = Zeile).
//   2. Musterlösung + keyPoints erscheinen.
//   3. Selbsteinschätzung NACH dem Versuch (Zifferntasten 1/2/3) — das ist
//      der Unterschied zur früheren Einschätzung vor dem Tun.
//   4. Weiter (Enter).
//
// Bewertung: wusste ich = 1, teilweise = 0.5, nicht = 0.

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Circle, Lightbulb } from "lucide-react";
import { InlineText } from "../InlineText";
import type { RecallExercise } from "@/lib/exercises/types";
import type { ExerciseViewProps } from "./types";

const ASSESSMENTS = [
  { score: 1, key: "1", label: "Wusste ich" },
  { score: 0.5, key: "2", label: "Teilweise" },
  { score: 0, key: "3", label: "Nicht" },
] as const;

type Phase = "answering" | "revealed" | "assessed";

export function RecallExerciseView({
  exercise,
  index,
  total,
  onComplete,
}: ExerciseViewProps & { exercise: RecallExercise }) {
  const [phase, setPhase] = useState<Phase>("answering");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const doneRef = useRef(false);

  const reveal = useCallback(() => {
    setPhase((p) => (p === "answering" ? "revealed" : p));
  }, []);

  const assess = useCallback((value: number) => {
    setScore((current) => current ?? value);
    setPhase("assessed");
  }, []);

  const complete = useCallback(() => {
    if (doneRef.current || score === null) return;
    doneRef.current = true;
    onComplete({ exercise, score });
  }, [exercise, onComplete, score]);

  // Zifferntasten 1–3 für die Selbsteinschätzung, Enter für Weiter.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (phase === "revealed") {
        if (event.key >= "1" && event.key <= "3" && score === null) {
          event.preventDefault();
          assess(ASSESSMENTS[Number(event.key) - 1].score);
        }
        return;
      }
      if (phase === "assessed" && event.key === "Enter") {
        if (target?.tagName === "BUTTON") return; // nativer Klick übernimmt
        event.preventDefault();
        complete();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, score, assess, complete]);

  const chosen = ASSESSMENTS.find((a) => a.score === score);

  return (
    <div className="space-y-4">
      <p className="text-slate-200 leading-relaxed">
        <InlineText text={exercise.prompt} />
      </p>

      <textarea
        autoFocus
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && phase === "answering") {
            e.preventDefault();
            e.stopPropagation();
            reveal();
          }
        }}
        rows={4}
        placeholder="Deine Antwort aus dem Kopf — erst schreiben, dann vergleichen."
        className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white placeholder:text-slate-600 resize-y"
      />

      {phase === "answering" && (
        <button
          onClick={reveal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all"
        >
          <Lightbulb className="w-4 h-4" /> Lösung zeigen
        </button>
      )}

      {phase !== "answering" && (
        <div className="space-y-3">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
            <p className="text-sm font-semibold text-emerald-400 mb-1.5">Musterlösung</p>
            <p className="text-sm text-slate-200 whitespace-pre-wrap">
              <InlineText text={exercise.sampleAnswer} />
            </p>
            {Array.isArray(exercise.keyPoints) && exercise.keyPoints.length > 0 && (
              <ul className="mt-2 space-y-1">
                {exercise.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                    <InlineText text={point} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {phase === "revealed" && (
            <div>
              <p className="text-xs text-slate-400 mb-2">
                Ehrlich vergleichen — wie gut passt deine Antwort?
              </p>
              <div className="flex flex-wrap gap-2">
                {ASSESSMENTS.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => assess(a.score)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      a.score === 1
                        ? "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
                        : a.score === 0.5
                          ? "border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                          : "border-red-500/40 text-red-300 hover:bg-red-500/10"
                    }`}
                  >
                    <Circle className="w-3 h-3" />
                    {a.label}
                    <kbd className="ml-1 px-1.5 py-0.5 rounded bg-slate-700/60 text-[10px] text-slate-400">
                      {a.key}
                    </kbd>
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === "assessed" && chosen && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-400">
                Bewertet als <span className="text-slate-200 font-medium">{chosen.label}</span>{" "}
                ({index + 1} von {total})
              </p>
              <button
                onClick={complete}
                autoFocus
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold text-white transition-colors"
              >
                Weiter <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
