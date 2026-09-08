"use client";

// QuizSummary — Abschlussbildschirm des Tagesquiz. Bewusst ANDERS als die
// Übungsauswertung: Bestanden nur bei 100 % im ERSTEN Durchgang des Tages.
// Nicht bestanden hat keine negativen Folgen — der Ton ist diagnostisch
// ("welche Themen wackeln, genau dort geht's lang"), nie "durchgefallen".
// Ein zweiter Durchlauf bekommt dieselben Fragen und zählt als Übung —
// das wird offen gesagt.

import Link from "next/link";
import { ArrowRight, CheckCircle2, Dumbbell, RotateCcw, Sparkles } from "lucide-react";
import type { QuizTask } from "@/lib/quiz";
import { WrongExerciseReview } from "./ExerciseSummary";
import { formatCount } from "./types";

export interface QuizWrongAnswer {
  task: QuizTask;
  score: number;
}

export function QuizSummary({
  correct,
  total,
  passed,
  claimed,
  firstAttempt,
  wrongAnswers,
  onRestart,
}: {
  correct: number;
  total: number;
  passed: boolean;
  /** Der freie Tag wurde geholt (nur erster Durchgang UND 100 %). */
  claimed: boolean;
  /** Dieser Durchgang war der erste des Tages. */
  firstAttempt: boolean;
  wrongAnswers: QuizWrongAnswer[];
  onRestart: () => void;
}) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Tagesquiz abgeschlossen
        </p>
        <p className={`text-4xl font-bold ${passed ? "text-emerald-400" : "text-slate-200"}`}>
          {percent} %
        </p>
        <p className="text-sm text-slate-400">
          {formatCount(correct)} von {total} richtig
        </p>
      </div>

      {claimed ? (
        <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-emerald-300">
              Tag geschafft — alles richtig!
            </p>
            <p className="text-sm text-slate-300">
              Der heutige Tag gilt als geschafft und dein Streak ist
              fortgeschrieben. Die Übungen kannst du trotzdem noch machen,
              wenn du willst.
            </p>
          </div>
        </div>
      ) : passed ? (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-amber-300">
              Alles richtig — starker Durchlauf!
            </p>
            <p className="text-sm text-slate-300">
              Als freien Tag zählt aber nur der erste Durchgang des Tages: Du
              hattest diese Fragen schon gesehen, und der freie Tag geht nur
              beim ersten Versuch. Der Tag bleibt über die Übungen offen.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-800/40 p-3">
          <Dumbbell className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-200">
              {firstAttempt ? "Nicht ganz fehlerfrei — kein Problem." : "Zweiter Durchlauf — der zählt als Übung."}
            </p>
            <p className="text-sm text-slate-300">
              {firstAttempt
                ? "Der Tag ist damit einfach noch offen: Mach deine Übungen wie sonst auch. Den freien Tag gibt es heute nicht mehr über das Quiz — dafür kennst du jetzt genau die Themen, die wackeln."
                : "Der Tag bleibt über die Übungen offen. Schau dir unten an, wo es noch hakt."}
            </p>
          </div>
        </div>
      )}

      {wrongAnswers.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300">
            Diese {wrongAnswers.length === 1 ? "Thema wackelt" : "Themen wackeln"} noch
          </h2>
          {wrongAnswers.map(({ task, score }) => (
            <div key={`${task.planId}/${task.itemId}/${task.exercise.id}`} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {task.topicTitle || "Unbenanntes Thema"}
                </p>
                <Link
                  href={`/plans/${task.planId}/uebung/${task.itemId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all flex-shrink-0"
                >
                  <Dumbbell className="w-3.5 h-3.5" /> Üben
                </Link>
              </div>
              <WrongExerciseReview exercise={task.exercise} score={score} />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all"
          title="Gleiche Fragen wie heute — zählt als Übung"
        >
          <RotateCcw className="w-4 h-4" /> Nochmal üben (gleiche Fragen)
        </button>
        {!passed && (
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors text-sm font-medium"
          >
            Zu den Plänen <ArrowRight className="w-4 h-4" />
          </Link>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors text-sm font-medium"
        >
          Zurück zum Dashboard
        </Link>
      </div>
    </div>
  );
}
