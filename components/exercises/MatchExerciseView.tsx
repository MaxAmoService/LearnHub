"use client";

// MatchExerciseView — Zuordnung per Klick:
//   - Links die feste Seite, rechts die GEMISCHTE Seite.
//   - Links wählen (hervorgehoben), dann rechts zuordnen. Eine bestehende
//     Zuordnung lässt sich einzeln lösen: X neben der Zuordnung oder nochmal
//     auf das zugeordnete rechte Feld klicken — ohne die anderen zu verlieren.
//   - „Prüfen" (Enter) erst, wenn alles zugeordnet ist; Teilpunkte zählen
//     richtig zugeordnete Paare anteilig.
//   - Weiter (Enter).

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Eraser, X, XCircle } from "lucide-react";
import { InlineText } from "../InlineText";
import { scoreMatchPairs, shuffle } from "@/lib/exercises/scoring";
import type { MatchExercise } from "@/lib/exercises/types";
import type { ExerciseViewProps } from "./types";

type Phase = "answering" | "resolved";

export function MatchExerciseView({
  exercise,
  index,
  total,
  onComplete,
}: ExerciseViewProps & { exercise: MatchExercise }) {
  const [phase, setPhase] = useState<Phase>("answering");
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [rightOptions] = useState<string[]>(() => shuffle(exercise.pairs.map((p) => p.right)));
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const doneRef = useRef(false);

  const allAssigned = exercise.pairs.every((p) => selection[p.left] !== undefined);

  function handleRightClick(right: string) {
    if (phase !== "answering") return;
    if (selectedLeft !== null) {
      // Links ist gewählt → zuordnen (ggf. umziehen: vorherige Zuordnung auf
      // diesen rechten Wert wird dabei automatisch aufgelöst).
      setSelection((sel) => {
        const next = { ...sel };
        for (const [left, value] of Object.entries(next)) {
          if (value === right) delete next[left];
        }
        next[selectedLeft] = right;
        return next;
      });
      setSelectedLeft(null);
    } else {
      // Kein linkes Feld gewählt → nochmal klicken löst genau diese Zuordnung.
      setSelection((sel) => {
        const next = { ...sel };
        for (const [left, value] of Object.entries(next)) {
          if (value === right) delete next[left];
        }
        return next;
      });
    }
  }

  const check = useCallback(() => {
    if (phase !== "answering" || !exercise.pairs.every((p) => selection[p.left] !== undefined)) return;
    setResult(scoreMatchPairs(selection, exercise.pairs));
    setPhase("resolved");
  }, [phase, selection, exercise.pairs]);

  const complete = useCallback(() => {
    if (doneRef.current || result === null) return;
    doneRef.current = true;
    onComplete({ exercise, score: result.total > 0 ? result.correct / result.total : 0 });
  }, [result, exercise, onComplete]);

  // Enter: Prüfen (wenn alles zugeordnet), nach der Auflösung Weiter.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (event.key !== "Enter") return;
      if (target?.tagName === "BUTTON") return; // nativer Klick übernimmt
      event.preventDefault();
      if (phase === "answering") check();
      else if (phase === "resolved") complete();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, check, complete]);

  return (
    <div className="space-y-4">
      <p className="text-slate-200 leading-relaxed">
        <InlineText text={exercise.prompt} />
      </p>

      <div className="space-y-2">
        {exercise.pairs.map((pair) => {
          const assigned = selection[pair.left];
          const isCorrect = result !== null && assigned === pair.right;
          const isWrong = result !== null && assigned !== pair.right;
          return (
            <div
              key={pair.left}
              className={`rounded-lg border p-3 flex flex-wrap items-center gap-2 transition-colors ${
                phase === "resolved"
                  ? isCorrect
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-red-500/50 bg-red-500/5"
                  : selectedLeft === pair.left
                    ? "border-blue-500/60 bg-blue-500/10"
                    : "border-slate-700/50 bg-slate-800/40"
              }`}
            >
              <button
                onClick={() => setSelectedLeft((cur) => (cur === pair.left ? null : pair.left))}
                disabled={phase !== "answering"}
                className="flex-1 min-w-0 text-left text-sm text-slate-200 disabled:cursor-default"
              >
                <InlineText text={pair.left} />
              </button>

              {assigned ? (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                    phase === "resolved"
                      ? isCorrect
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-red-500/40 bg-red-500/10 text-red-300"
                      : "border-blue-500/40 bg-blue-500/10 text-blue-300"
                  }`}
                >
                  {phase === "resolved" &&
                    (isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    ))}
                  <InlineText text={assigned} />
                  {phase === "answering" && (
                    <button
                      onClick={() =>
                        setSelection((sel) => {
                          const next = { ...sel };
                          delete next[pair.left];
                          return next;
                        })
                      }
                      title="Zuordnung lösen"
                      className="p-0.5 rounded hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </span>
              ) : (
                <span className="px-2.5 py-1 text-xs text-slate-600">–</span>
              )}
            </div>
          );
        })}
      </div>

      {phase === "answering" && (
        <>
          <div className="flex flex-wrap gap-2">
            {rightOptions.map((right) => {
              const isAssigned = Object.values(selection).includes(right);
              return (
                <button
                  key={right}
                  onClick={() => handleRightClick(right)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    isAssigned
                      ? "border-blue-500/50 bg-blue-500/15 text-blue-300"
                      : "border-slate-600/60 text-slate-300 hover:border-slate-400 hover:bg-slate-700/40"
                  }`}
                  title={isAssigned ? "Nochmal klicken löst diese Zuordnung" : undefined}
                >
                  <InlineText text={right} />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-slate-500">
              <Eraser className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              Links anklicken, dann rechts zuordnen — X oder erneuter Klick löst einzeln.
            </p>
            <button
              onClick={check}
              disabled={!allAssigned}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              Prüfen ({exercise.pairs.filter((p) => selection[p.left] !== undefined).length}/
              {exercise.pairs.length} zugeordnet)
            </button>
          </div>
        </>
      )}

      {phase === "resolved" && result && (
        <div className="space-y-3">
          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              result.correct === result.total ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {result.correct} von {result.total} Paaren richtig
            {result.correct < result.total && " — falsch zugeordnete Paare sind rot markiert."}
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
