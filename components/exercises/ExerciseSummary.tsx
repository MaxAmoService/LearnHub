"use client";

// ExerciseSummary — Abschlussbildschirm eines Übungsdurchlaufs:
// Trefferquote, alle falsch beantworteten Aufgaben MIT Erklärung, wann das
// Thema wiederkommt, Link zurück zum Dashboard. Bei prozeduralen Themen
// zusätzlich „Nochmal, andere Zahlen" — bei Rechenthemen ist genau das die
// wirksame Übung.

import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, Info, RotateCcw } from "lucide-react";
import { qualityFromRatio } from "@/lib/exercises/scoring";
import {
  isChoiceExercise,
  isMatchExercise,
  isNumericExercise,
  isRecallExercise,
  type Exercise,
} from "@/lib/exercises/types";
import { formatDateKey } from "@/lib/dates";
import type { ExerciseResult } from "./types";
import { formatCount } from "./types";

const TYPE_LABELS: Record<Exercise["type"], string> = {
  recall: "Abruf",
  numeric: "Rechnen",
  choice: "Auswahl",
  match: "Zuordnung",
};

/**
 * Falsch beantwortete Aufgabe MIT Musterlösung/Erklärung — gemeinsam genutzt
 * von der Übungsseite (ExerciseSummary) und dem Tagesquiz (QuizSummary).
 */
export function WrongExerciseReview({
  exercise,
  score,
}: {
  exercise: Exercise;
  score: number;
}) {
  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3 space-y-2">
      <div className="flex items-start gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 flex-shrink-0">
          {TYPE_LABELS[exercise.type]}
        </span>
        <p className="text-sm text-slate-200 whitespace-pre-wrap">{exercise.prompt}</p>
      </div>
      {isRecallExercise(exercise) && (
        <>
          <p className="text-xs text-slate-500">
            {score === 0.5 ? "Bewertung: teilweise gewusst" : "Bewertung: nicht gewusst"}
          </p>
          <p className="text-sm text-slate-300">
            <span className="text-emerald-400 font-medium">Musterlösung: </span>
            {exercise.sampleAnswer}
          </p>
          {Array.isArray(exercise.keyPoints) && exercise.keyPoints.length > 0 && (
            <ul className="space-y-0.5">
              {exercise.keyPoints.map((point, i) => (
                <li key={i} className="text-xs text-slate-400">
                  · {point}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {isNumericExercise(exercise) && (
        <>
          <p className="text-xs text-slate-500">
            Richtige Antwort:{" "}
            <span className="text-slate-300 font-medium">
              {exercise.answer}
              {typeof exercise.unit === "string" && exercise.unit.length > 0
                ? ` ${exercise.unit}`
                : ""}
            </span>
          </p>
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {exercise.explanation}
          </p>
        </>
      )}
      {isChoiceExercise(exercise) && (
        <>
          <p className="text-xs text-slate-500">
            Richtige Antwort:{" "}
            <span className="text-slate-300 font-medium">
              {exercise.options[exercise.correctIndex]}
            </span>
          </p>
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {exercise.explanation}
          </p>
        </>
      )}
      {isMatchExercise(exercise) && (
        <ul className="space-y-0.5">
          {exercise.pairs.map((pair) => (
            <li key={pair.left} className="text-xs text-slate-400">
              {pair.left} <ArrowRight className="w-3 h-3 inline mx-1 text-slate-600" />
              <span className="text-slate-300">{pair.right}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Tagesstatus nach der Sitzung (computeDayStatus, lib/today.ts). */
export interface ExerciseDayStatus {
  dayDone: boolean;
  /** Mindestens ein Plan erledigt UND mindestens einer offen. */
  partial: boolean;
  /** Fällige Wiederholungen + offene Neu-Themen — „Noch offen: N". */
  openCount: number;
  /** Tagesquiz heute bestanden? (Zusatz der grünen Zeile). */
  quizPassedToday: boolean;
  /** Alle Pläne sind per Quiz erledigt. */
  allQuizDone: boolean;
  /** Titel der noch offenen Pläne (für die Teilweise-Zeile). */
  openPlanTitles: string[];
  /** Heute bearbeitete Einheiten über alle aktiven Pläne. */
  unitsToday: number;
  /** Summe der Tagesziele aller aktiven Pläne. */
  dailyTarget: number;
  /** Aktueller Streak nach der Sitzung. */
  streak: number;
}

export function ExerciseSummary({
  results,
  correct,
  total,
  nextDueAt,
  procedural,
  dayStatus,
  onRestart,
}: {
  results: ExerciseResult[];
  correct: number;
  total: number;
  nextDueAt: string | null;
  procedural: boolean;
  dayStatus?: ExerciseDayStatus | null;
  onRestart: () => void;
}) {
  const quality = qualityFromRatio(correct, total);
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrong = results.filter((r) => r.score < 1);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Durchlauf abgeschlossen
        </p>
        <p className={`text-4xl font-bold ${quality >= 4 ? "text-emerald-400" : quality >= 3 ? "text-amber-400" : "text-red-400"}`}>
          {percent} %
        </p>
        <p className="text-sm text-slate-400">
          {formatCount(correct)} von {total} richtig
        </p>
      </div>

      {nextDueAt != null && (
        <div className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/40 p-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-slate-300">
            Gespeichert — nächste Wiederholung am{" "}
            <span className="text-slate-100 font-medium">{formatDateKey(nextDueAt)}</span>.
          </p>
        </div>
      )}

      {dayStatus &&
        (dayStatus.dayDone ? (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-300">
                Tagesziel erreicht —{" "}
                {dayStatus.allQuizDone
                  ? "Tagesquiz bestanden"
                  : dayStatus.quizPassedToday
                    ? "alle Pläne erledigt"
                    : "Tagespensum erledigt"}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {dayStatus.quizPassedToday && !dayStatus.allQuizDone
                  ? `Streak auf ${dayStatus.streak} ${dayStatus.streak === 1 ? "Tag" : "Tage"}`
                  : `${dayStatus.unitsToday} von ${dayStatus.dailyTarget} Einheiten heute · Streak auf ${dayStatus.streak} ${dayStatus.streak === 1 ? "Tag" : "Tage"}`}
              </p>
            </div>
          </div>
        ) : dayStatus.partial ? (
          <div className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-300">
              Tagesziel teilweise erreicht — {dayStatus.openPlanTitles.join(", ")} offen
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/40 p-3">
            <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              Noch offen: {dayStatus.openCount}{" "}
              {dayStatus.openCount === 1 ? "Thema" : "Themen"}
            </p>
          </div>
        ))}

      {wrong.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300">
            Diese {wrong.length === 1 ? "Aufgabe war" : "Aufgaben waren"} noch nicht ganz richtig
          </h2>
          {wrong.map(({ exercise, score }) => (
            <WrongExerciseReview key={exercise.id} exercise={exercise} score={score} />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">Alles richtig — stark!</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-2">
        {procedural && (
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Nochmal, andere Zahlen
          </button>
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

/** Hinweis-Box bei fehlgeschlagenem Speichern. */
export function SaveErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      <p className="text-sm text-red-300 flex-1">{message}</p>
      <button
        onClick={onRetry}
        className="text-sm font-semibold text-red-300 hover:text-red-200 flex-shrink-0"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
