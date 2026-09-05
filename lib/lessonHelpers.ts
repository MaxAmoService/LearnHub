// ============================================================================
// Lesson Helpers — Shared factory functions for common lesson patterns
// ============================================================================

import { Lesson } from "./types";

/**
 * Creates the standard 4 exercise lessons (leicht/mittel/schwer + Prüfung).
 * Eliminates ~200 lines of boilerplate across all data files.
 */
export function createExerciseLessons(
  moduleId: string,
  topic: string,
  descriptions: { easy: string; medium: string; hard: string }
): Lesson[] {
  return [
    {
      id: `${moduleId}-aufgaben-leicht`,
      title: "📝 Aufgaben (Leicht)",
      duration: "10 min",
      type: "exercises",
      exerciseDifficulty: 1,
      content: descriptions.easy,
    },
    {
      id: `${moduleId}-aufgaben-mittel`,
      title: "📝 Aufgaben (Mittel)",
      duration: "10 min",
      type: "exercises",
      exerciseDifficulty: 2,
      content: descriptions.medium,
    },
    {
      id: `${moduleId}-aufgaben-schwer`,
      title: "📝 Aufgaben (Schwer)",
      duration: "12 min",
      type: "exercises",
      exerciseDifficulty: 3,
      content: descriptions.hard,
    },
    {
      id: `${moduleId}-pruefung`,
      title: "📋 Prüfung",
      duration: "15 min",
      type: "exercises",
      examMode: true,
      content: `Abschlussprüfung: ${topic} — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
    },
  ];
}
