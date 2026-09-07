"use client";

// ExerciseRunner — zeigt genau EINE Aufgabe pro Bildschirm und leitet das
// Ergebnis nach oben weiter. Kein Zurückspringen: Die Seite hält den Index,
// hier wird nur gerendert. Fortschritt „3 von 5" + dünne Leiste.

import {
  isChoiceExercise,
  isMatchExercise,
  isNumericExercise,
  isRecallExercise,
} from "@/lib/exercises/types";
import { ChoiceExerciseView } from "./ChoiceExerciseView";
import { MatchExerciseView } from "./MatchExerciseView";
import { NumericExerciseView } from "./NumericExerciseView";
import { RecallExerciseView } from "./RecallExerciseView";
import type { ExerciseViewProps } from "./types";

export function ExerciseRunner(props: ExerciseViewProps) {
  const { exercise, index, total } = props;

  return (
    <div className="glass rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Aufgabe {index + 1} von {total}
        </p>
        <p className="text-xs text-slate-500">
          {Math.round(((index + 1) / Math.max(total, 1)) * 100)} %
        </p>
      </div>
      <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / Math.max(total, 1)) * 100}%` }}
        />
      </div>

      {isRecallExercise(exercise) && <RecallExerciseView {...props} exercise={exercise} />}
      {isNumericExercise(exercise) && <NumericExerciseView {...props} exercise={exercise} />}
      {isChoiceExercise(exercise) && <ChoiceExerciseView {...props} exercise={exercise} />}
      {isMatchExercise(exercise) && <MatchExerciseView {...props} exercise={exercise} />}
    </div>
  );
}
