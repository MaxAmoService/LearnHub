// Übungsaufgaben-Registry — analog zu lib/data.ts.
//
// content/exercises/<topicSlug>.json wird hier explizit importiert (statisch,
// ohne Netz, ohne API-Key) und über den Themen-Slug auffindbar gemacht. Der
// topicSlug steht am Plan-Template-Item und am planItem (lib/plans.ts).
//
// Neue Datei anlegen → hier eintragen, sonst ist sie unsichtbar.

import type { Exercise, ExerciseFile } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const files: ExerciseFile[] = [
  // import subnetting from "../content/exercises/netzwerktechnik-subnetting.json";
  // subnetting,
];

const bySlug: Map<string, ExerciseFile> = new Map(files.map((f) => [f.topicSlug, f]));

/** Alle registrierten Übungsdateien. */
export function getExerciseFiles(): ExerciseFile[] {
  return files;
}

/** Übungsdatei zu einem Themen-Slug — undefined, wenn (noch) keine existiert. */
export function getExerciseFile(topicSlug: string): ExerciseFile | undefined {
  return bySlug.get(topicSlug);
}

/** Aufgaben zu einem Themen-Slug — leeres Array, wenn keine Datei existiert. */
export function getExercisesForTopic(topicSlug: string): Exercise[] {
  return bySlug.get(topicSlug)?.exercises ?? [];
}
