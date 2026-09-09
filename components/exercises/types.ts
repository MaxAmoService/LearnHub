// Gemeinsame Typen der Übungsseiten-Views (components/exercises/*).
// Die Views sind reine UI: Bewertung/Normalisierung liegt in lib/exercises/scoring.ts.

import type { Exercise } from "@/lib/exercises/types";

export interface ExerciseResult {
  exercise: Exercise;
  /** 0..1 — recall: 1/0.5/0, match: richtige Paare anteilig, sonst 0/1. */
  score: number;
}

export interface ExerciseViewProps {
  exercise: Exercise;
  /** 0-basiert — für „Aufgabe X von Y". */
  index: number;
  total: number;
  /** Wird GENAU EINMAL aufgerufen, wenn der Nutzer zur nächsten Aufgabe geht. */
  onComplete: (result: ExerciseResult) => void;
}

export { formatCount } from "@/lib/format";
