"use client";

import { useState } from "react";
import { CheckCircle2, Eye, ChevronRight, RotateCcw, Trophy } from "lucide-react";
import { InlineText } from "./InlineText";

interface Exercise {
  question: string;
  answer: string;
}

interface PracticeExercisesProps {
  title?: string;
  exercises: Exercise[];
}

/**
 * Interaktive Übungen — Frage anzeigen, über Antwort nachdenken, dann aufdecken.
 */
export function PracticeExercises({ title = "Übung", exercises }: PracticeExercisesProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [current, setCurrent] = useState(0);

  const toggleReveal = (index: number) => {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allRevealed = revealed.size === exercises.length;

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-purple-500/5">
      {/* Header */}
      <div className="px-5 py-3 bg-violet-500/10 border-b border-violet-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-violet-300 uppercase tracking-wider">🎯 {title}</h4>
            <p className="text-violet-400/70 text-xs">{revealed.size} von {exercises.length} aufgedeckt</p>
          </div>
        </div>
        {allRevealed && (
          <button
            onClick={() => { setRevealed(new Set()); setCurrent(0); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Zurücksetzen
          </button>
        )}
      </div>

      {/* Exercises */}
      <div className="p-4 space-y-3">
        {exercises.map((ex, i) => {
          const isRevealed = revealed.has(i);
          const isActive = i === current;

          return (
            <div
              key={i}
              className={`rounded-lg border transition-all duration-200 ${
                isRevealed
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : isActive
                    ? "border-violet-500/40 bg-violet-500/10"
                    : "border-slate-700/40 bg-slate-800/30"
              }`}
            >
              {/* Question */}
              <div className="px-4 py-3 flex items-start gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  isRevealed
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-violet-500/20 text-violet-400"
                }`}>
                  {isRevealed ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm leading-relaxed"><InlineText text={ex.question} /></p>
                </div>
                {!isRevealed && (
                  <button
                    onClick={() => { toggleReveal(i); if (i === current && i < exercises.length - 1) setCurrent(i + 1); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Eye className="w-3 h-3" /> Lösung
                  </button>
                )}
              </div>

              {/* Answer (revealed) */}
              {isRevealed && (
                <div className="px-4 pb-3 pt-0">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-emerald-300 text-sm"><InlineText text={ex.answer} /></p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress */}
      {allRevealed && (
        <div className="px-5 pb-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <p className="text-emerald-300 text-sm font-medium">Alle {exercises.length} Übungen durchgearbeitet! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}
