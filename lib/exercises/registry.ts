// Übungsaufgaben-Registry — analog zu lib/data.ts.
//
// content/exercises/<topicSlug>.json wird hier explizit importiert (statisch,
// ohne Netz, ohne API-Key) und über den Themen-Slug auffindbar gemacht. Der
// topicSlug steht am Plan-Template-Item und am planItem (lib/plans.ts).
//
// Neue Datei anlegen → hier eintragen, sonst ist sie unsichtbar.

import type { Exercise, ExerciseFile } from "./types";

// Quelle B — prozedural erzeugt (scripts/materialize-procedural.ts)
import subnetting from "../../content/exercises/netzwerktechnik-subnetting.json";
import umrechnung from "../../content/exercises/zahlensysteme-umrechnung.json";
import binaerarithmetik from "../../content/exercises/zahlensysteme-binaerarithmetik.json";
import zweierkomplement from "../../content/exercises/zahlensysteme-zweierkomplement.json";
import ieee754 from "../../content/exercises/zahlensysteme-ieee754.json";
import fehlererkennung from "../../content/exercises/zahlensysteme-fehlererkennung.json";
import codes from "../../content/exercises/zahlensysteme-codes.json";
import amortisation from "../../content/exercises/wirtschaft-amortisation-roi.json";
import nutzwertanalyse from "../../content/exercises/wirtschaft-angebotsvergleich-nutzwertanalyse.json";
import netzplan from "../../content/exercises/diagramme-netzplan-kritischer-pfad.json";

// JSON-Imports liefern string statt Literal-Union (source-Feld) — deshalb
// der explizite Cast. Die Struktur ist über die Generatoren/Tests abgesichert.
const files: ExerciseFile[] = [
  subnetting as ExerciseFile,
  umrechnung as ExerciseFile,
  binaerarithmetik as ExerciseFile,
  zweierkomplement as ExerciseFile,
  ieee754 as ExerciseFile,
  fehlererkennung as ExerciseFile,
  codes as ExerciseFile,
  amortisation as ExerciseFile,
  nutzwertanalyse as ExerciseFile,
  netzplan as ExerciseFile,
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
