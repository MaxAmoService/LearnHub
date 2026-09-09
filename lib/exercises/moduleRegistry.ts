// GENERIERT von scripts/convert-module-exercises.ts — nicht von Hand pflegen.
// Modul-Aufgabenpools (ehemals lib/mathExercises.ts) als JSON im Repo.

import type { Exercise, ExerciseSource } from "./types";

interface ModuleExerciseFile {
  moduleSlug: string;
  source: ExerciseSource;
  reviewedBy: string | null;
  practice: Exercise[];
  exam: Exercise[];
}

import moduleihkcomputersysteme from "../../content/exercises/modules/ihk-computersysteme.json";
import moduleihkitsicherheit from "../../content/exercises/modules/ihk-it-sicherheit.json";
import modulemanageo from "../../content/exercises/modules/m-anageo.json";
import modulembruchrechnen from "../../content/exercises/modules/m-bruchrechnen.json";
import modulemdreisatz from "../../content/exercises/modules/m-dreisatz.json";
import modulemexponential from "../../content/exercises/modules/m-exponential.json";
import modulemfolgen from "../../content/exercises/modules/m-folgen.json";
import modulemfourier from "../../content/exercises/modules/m-fourier.json";
import modulemganzezahlen from "../../content/exercises/modules/m-ganze-zahlen.json";
import modulemgeometrieflaechen from "../../content/exercises/modules/m-geometrie-flaechen.json";
import modulemgleichungen from "../../content/exercises/modules/m-gleichungen.json";
import modulemgrundlagenfunktionen from "../../content/exercises/modules/m-grundlagen-funktionen.json";
import modulemgrundlagenmengen from "../../content/exercises/modules/m-grundlagen-mengen.json";
import modulemgrundrechnen from "../../content/exercises/modules/m-grundrechnen.json";
import modulemkoerper from "../../content/exercises/modules/m-koerper.json";
import modulemkombinatorik from "../../content/exercises/modules/m-kombinatorik.json";
import modulemkomplexe from "../../content/exercises/modules/m-komplexe.json";
import modulemkurvendiskussion from "../../content/exercises/modules/m-kurvendiskussion.json";
import modulemlgs from "../../content/exercises/modules/m-lgs.json";
import modulemlogarithmus from "../../content/exercises/modules/m-logarithmus.json";
import modulemlogik from "../../content/exercises/modules/m-logik.json";
import modulemmatrizen from "../../content/exercises/modules/m-matrizen.json";
import modulemnumerikgrundlagen from "../../content/exercises/modules/m-numerik-grundlagen.json";
import modulempotenzenlog from "../../content/exercises/modules/m-potenzen-log.json";
import modulemprozent from "../../content/exercises/modules/m-prozent.json";
import modulemquadratischegleichungen from "../../content/exercises/modules/m-quadratische-gleichungen.json";
import modulemstatistik from "../../content/exercises/modules/m-statistik.json";
import modulemstochastikgrundlagen from "../../content/exercises/modules/m-stochastik-grundlagen.json";
import modulemtaylor from "../../content/exercises/modules/m-taylor.json";
import modulemtermumformung from "../../content/exercises/modules/m-termumformung.json";
import modulemtrigonometrie from "../../content/exercises/modules/m-trigonometrie.json";
import modulemungleichungen from "../../content/exercises/modules/m-ungleichungen.json";
import modulemverteilungen from "../../content/exercises/modules/m-verteilungen.json";
import modulemwachstumsprozesse from "../../content/exercises/modules/m-wachstumsprozesse.json";
import modulem1ableitungen from "../../content/exercises/modules/m1-ableitungen.json";
import modulem1grenzwerte from "../../content/exercises/modules/m1-grenzwerte.json";
import modulem1integration from "../../content/exercises/modules/m1-integration.json";
import modulem1reihen from "../../content/exercises/modules/m1-reihen.json";
import modulem2dgl from "../../content/exercises/modules/m2-dgl.json";
import modulem2vektoren from "../../content/exercises/modules/m2-vektoren.json";

// JSON-Imports liefern string statt Literal-Union (source-Feld) — deshalb
// der explizite Cast (Muster von lib/exercises/registry.ts).
const byModule: Record<string, ModuleExerciseFile> = {
  "ihk-computersysteme": moduleihkcomputersysteme as ModuleExerciseFile,
  "ihk-it-sicherheit": moduleihkitsicherheit as ModuleExerciseFile,
  "m-anageo": modulemanageo as ModuleExerciseFile,
  "m-bruchrechnen": modulembruchrechnen as ModuleExerciseFile,
  "m-dreisatz": modulemdreisatz as ModuleExerciseFile,
  "m-exponential": modulemexponential as ModuleExerciseFile,
  "m-folgen": modulemfolgen as ModuleExerciseFile,
  "m-fourier": modulemfourier as ModuleExerciseFile,
  "m-ganze-zahlen": modulemganzezahlen as ModuleExerciseFile,
  "m-geometrie-flaechen": modulemgeometrieflaechen as ModuleExerciseFile,
  "m-gleichungen": modulemgleichungen as ModuleExerciseFile,
  "m-grundlagen-funktionen": modulemgrundlagenfunktionen as ModuleExerciseFile,
  "m-grundlagen-mengen": modulemgrundlagenmengen as ModuleExerciseFile,
  "m-grundrechnen": modulemgrundrechnen as ModuleExerciseFile,
  "m-koerper": modulemkoerper as ModuleExerciseFile,
  "m-kombinatorik": modulemkombinatorik as ModuleExerciseFile,
  "m-komplexe": modulemkomplexe as ModuleExerciseFile,
  "m-kurvendiskussion": modulemkurvendiskussion as ModuleExerciseFile,
  "m-lgs": modulemlgs as ModuleExerciseFile,
  "m-logarithmus": modulemlogarithmus as ModuleExerciseFile,
  "m-logik": modulemlogik as ModuleExerciseFile,
  "m-matrizen": modulemmatrizen as ModuleExerciseFile,
  "m-numerik-grundlagen": modulemnumerikgrundlagen as ModuleExerciseFile,
  "m-potenzen-log": modulempotenzenlog as ModuleExerciseFile,
  "m-prozent": modulemprozent as ModuleExerciseFile,
  "m-quadratische-gleichungen": modulemquadratischegleichungen as ModuleExerciseFile,
  "m-statistik": modulemstatistik as ModuleExerciseFile,
  "m-stochastik-grundlagen": modulemstochastikgrundlagen as ModuleExerciseFile,
  "m-taylor": modulemtaylor as ModuleExerciseFile,
  "m-termumformung": modulemtermumformung as ModuleExerciseFile,
  "m-trigonometrie": modulemtrigonometrie as ModuleExerciseFile,
  "m-ungleichungen": modulemungleichungen as ModuleExerciseFile,
  "m-verteilungen": modulemverteilungen as ModuleExerciseFile,
  "m-wachstumsprozesse": modulemwachstumsprozesse as ModuleExerciseFile,
  "m1-ableitungen": modulem1ableitungen as ModuleExerciseFile,
  "m1-grenzwerte": modulem1grenzwerte as ModuleExerciseFile,
  "m1-integration": modulem1integration as ModuleExerciseFile,
  "m1-reihen": modulem1reihen as ModuleExerciseFile,
  "m2-dgl": modulem2dgl as ModuleExerciseFile,
  "m2-vektoren": modulem2vektoren as ModuleExerciseFile,
};

/** Übungsaufgaben eines Moduls (alle Schwierigkeitsgrade). */
export function getModulePracticeExercises(moduleSlug: string): Exercise[] {
  return byModule[moduleSlug]?.practice ?? [];
}

/** Prüfungsaufgaben eines Moduls. */
export function getModuleExamExercises(moduleSlug: string): Exercise[] {
  return byModule[moduleSlug]?.exam ?? [];
}
