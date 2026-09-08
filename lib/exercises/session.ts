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
import { proceduralGenerators, mulberry32 } from "./procedural";
import { sanitizeExercises, shuffle } from "./scoring";
import type { Exercise } from "./types";

export type ExerciseSessionSource = "procedural" | "static";

export interface ExerciseSession {
  source: ExerciseSessionSource;
  exercises: Exercise[];
}

/** Höchstens so viele zuletzt verwendete Aufgaben-IDs werden pro Item gemerkt. */
export const MAX_RECENT_EXERCISE_IDS = 5;

/**
 * Zuletzt verwendete Aufgaben-IDs eines Items fortschreiben: neu verwendete
 * ans Ende, Duplikate bleiben einmalig, gekappt auf die letzten
 * MAX_RECENT_EXERCISE_IDS. Grundlage für die Auswahl-Abstinenz des Tagesquiz
 * (nicht zuletzt Verwendetes bevorzugen) — reine Funktion.
 */
export function mergeRecentExerciseIds(
  previous: string[] | null | undefined,
  used: readonly (string | null | undefined)[]
): string[] {
  const fresh = used.filter(
    (id): id is string => typeof id === "string" && id.length > 0
  );
  if (fresh.length === 0) {
    return Array.isArray(previous) ? previous.slice(-MAX_RECENT_EXERCISE_IDS) : [];
  }
  const prev = Array.isArray(previous)
    ? previous.filter((id) => !fresh.includes(id))
    : [];
  return [...prev, ...fresh].slice(-MAX_RECENT_EXERCISE_IDS);
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
 * in beiden Fällen um unvollständige Einträge bereinigt. Die Reihenfolge
 * wird zusätzlich mit dem Seed gemischt (deterministisch: gleicher Seed →
 * gleiche Reihenfolge, jeder Aufruf mit frischem Seed → andere Reihenfolge).
 * Bei Wiederholung desselben Themas lernt man sonst die Positionen mit
 * statt der Inhalte.
 */
export function buildExerciseSession(topicSlug: string, seed: number): ExerciseSession {
  const generator = proceduralGenerators[topicSlug];
  if (generator) {
    return {
      source: "procedural",
      exercises: shuffle(sanitizeExercises(generator.generate(seed)), mulberry32(seed)),
    };
  }
  return {
    source: "static",
    exercises: shuffle(sanitizeExercises(getExercisesForTopic(topicSlug)), mulberry32(seed)),
  };
}

/** Frischer Seed für eine Sitzung (PRNG ist deterministisch über den Seed). */
export function newExerciseSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}
