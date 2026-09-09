// Antwort-Bewertung der Modul-Übungen — reine Funktion, geteilt mit der UI.
//
// choice:  Index-Vergleich mit correctIndex
// numeric: normalisierter Freitext-Vergleich (lib/answerCheck) inkl.
//          acceptedAnswers (Lösungsmengen) und Toleranz
// recall/match: kommen in den Modul-Pools nicht vor (Konverter-Garantie)
//          und werden defensiv als falsch gewertet.

import type { Exercise } from "./types";
import { isChoiceExercise, isNumericExercise } from "./types";
import { checkFreeTextAnswer } from "../answerCheck";

export interface ExerciseAnswerInput {
  userAnswer: string;
  selectedOption: number | null;
}

export function gradeExerciseAnswer(ex: Exercise, input: ExerciseAnswerInput): boolean {
  if (isChoiceExercise(ex)) {
    return input.selectedOption === ex.correctIndex;
  }
  if (isNumericExercise(ex)) {
    return checkFreeTextAnswer(input.userAnswer, String(ex.answer), {
      acceptedAnswers: ex.acceptedAnswers,
      tolerance: ex.tolerance,
    });
  }
  return false;
}
