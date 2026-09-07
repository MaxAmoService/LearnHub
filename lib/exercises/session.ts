// Übungssitzung — baut die Aufgabenliste für ein Thema zusammen.
//
// Zentrale Zuordnung (NICHT in UI-Komponenten): Hat ein Thema einen
// prozeduralen Generator (lib/exercises/procedural.ts), kommen die Aufgaben
// bei jedem Aufruf mit frischem Seed aus dem Generator — bei Rechenthemen
// ist „Nochmal, andere Zahlen" genau die wirksame Übung. Sonst kommen die
// Aufgaben aus der statischen Registry (content/exercises/<topicSlug>.json).
//
// Kein Firestore, keine UI. Tests: tests/scoring.test.ts (sanitize),
// tests/exercises-registry.test.ts (Registry).

import { getExercisesForTopic } from "./registry";
import { proceduralGenerators } from "./procedural";
import { sanitizeExercises } from "./scoring";
import type { Exercise } from "./types";

export type ExerciseSessionSource = "procedural" | "static";

export interface ExerciseSession {
  source: ExerciseSessionSource;
  exercises: Exercise[];
}

/**
 * Gibt es zu diesem Thema Übungsaufgaben? Ohne Aufgaben bleibt die
 * Selbsteinschätzung (Schwer/Okay/Leicht) als Rückfallebene — kein Thema
 * darf unbenutzbar werden.
 */
export function hasExercisesForTopic(topicSlug: string | null | undefined): boolean {
  if (!topicSlug) return false;
  if (proceduralGenerators[topicSlug] !== undefined) return true;
  return getExercisesForTopic(topicSlug).length > 0;
}

/**
 * Aufgabenliste für eine Sitzung — prozedural (neuer Seed) oder statisch,
 * in beiden Fällen um unvollständige Einträge bereinigt.
 */
export function buildExerciseSession(topicSlug: string, seed: number): ExerciseSession {
  const generator = proceduralGenerators[topicSlug];
  if (generator) {
    return {
      source: "procedural",
      exercises: sanitizeExercises(generator.generate(seed)),
    };
  }
  return {
    source: "static",
    exercises: sanitizeExercises(getExercisesForTopic(topicSlug)),
  };
}

/** Frischer Seed für eine Sitzung (PRNG ist deterministisch über den Seed). */
export function newExerciseSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}
