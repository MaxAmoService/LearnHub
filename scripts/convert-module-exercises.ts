// convert-module-exercises.ts — migriert die Modul-Aufgabenpools aus
// lib/mathExercises.ts (Legacy-Schema input|multiple) ins JSON-Registry-
// System (content/exercises/modules/<moduleSlug>.json).
//
// Ausgabe:
//   - content/exercises/modules/*.json (practice + exam pro Modul)
//   - lib/exercises/moduleRegistry.ts (generierte Registry mit statischen
//     Imports — wird von der App genutzt, nicht von Hand gepflegt)
//
// Nutzung: npx tsx scripts/convert-module-exercises.ts

import * as fs from "fs";
import * as path from "path";
import { allExercises, examExercises, type Exercise as LegacyExercise } from "../lib/mathExercises";
import { convertModuleExercise, type LegacyMathExercise } from "../lib/exercises/convertMath";
import type { Exercise } from "../lib/exercises/types";

const OUT_DIR = path.join(__dirname, "..", "content", "exercises", "modules");
const REGISTRY_PATH = path.join(__dirname, "..", "lib", "exercises", "moduleRegistry.ts");

interface ModuleFile {
  moduleSlug: string;
  source: "manual";
  reviewedBy: null;
  practice: Exercise[];
  exam: Exercise[];
}

function toLegacy(e: LegacyExercise): LegacyMathExercise {
  // Datenfehler-Korrektur: manche Einträge sind "input" mit options +
  // correctOption, aber ohne expectedAnswer (z. B. is-14) — die alte UI
  // konnte solche Aufgaben nie als richtig werten. Als multiple behandeln.
  const isChoiceShaped =
    e.type === "multiple" ||
    (e.options && e.options.length > 0 && e.correctOption !== undefined && e.expectedAnswer === undefined);
  return {
    id: e.id,
    difficulty: e.difficulty,
    type: isChoiceShaped ? "multiple" : e.type,
    question: e.question,
    hint: e.hint,
    expectedAnswer: e.expectedAnswer,
    acceptedAnswers: e.acceptedAnswers,
    tolerance: e.tolerance,
    format: e.format,
    options: e.options,
    correctOption: e.correctOption,
    solution: e.solution,
  };
}

const practiceByModule = new Map<string, LegacyExercise[]>();
for (const e of allExercises) {
  const list = practiceByModule.get(e.lessonId) ?? [];
  list.push(e);
  practiceByModule.set(e.lessonId, list);
}

const moduleSlugs = new Set<string>([
  ...practiceByModule.keys(),
  ...Object.keys(examExercises),
]);

const files: { slug: string; rel: string }[] = [];
let totalPractice = 0;
let totalExam = 0;

for (const slug of [...moduleSlugs].sort()) {
  const practice = (practiceByModule.get(slug) ?? []).map(toLegacy);
  const exam = (examExercises[slug] ?? []).map(toLegacy);

  const file: ModuleFile = {
    moduleSlug: slug,
    source: "manual",
    reviewedBy: null,
    practice: practice.map((e, i) => convertModuleExercise(e, slug, i)),
    exam: exam.map((e, i) => convertModuleExercise(e, slug, i)),
  };

  const rel = `${slug}.json`;
  files.push({ slug, rel });
  fs.writeFileSync(path.join(OUT_DIR, rel), JSON.stringify(file, null, 2) + "\n");
  totalPractice += file.practice.length;
  totalExam += file.exam.length;
}

// Registry generieren
const imports = files
  .map((f) => {
    const name = "module" + f.slug.replace(/[^a-zA-Z0-9]/g, "");
    return `import ${name} from "../../content/exercises/modules/${f.slug}.json";`;
  })
  .join("\n");

const entries = files
  .map((f) => {
    const name = "module" + f.slug.replace(/[^a-zA-Z0-9]/g, "");
    return `  "${f.slug}": ${name} as ModuleExerciseFile,`;
  })
  .join("\n");

const registry = `// GENERIERT von scripts/convert-module-exercises.ts — nicht von Hand pflegen.
// Modul-Aufgabenpools (ehemals lib/mathExercises.ts) als JSON im Repo.

import type { Exercise, ExerciseSource } from "./types";

interface ModuleExerciseFile {
  moduleSlug: string;
  source: ExerciseSource;
  reviewedBy: string | null;
  practice: Exercise[];
  exam: Exercise[];
}

${imports}

// JSON-Imports liefern string statt Literal-Union (source-Feld) — deshalb
// der explizite Cast (Muster von lib/exercises/registry.ts).
const byModule: Record<string, ModuleExerciseFile> = {
${entries}
};

/** Übungsaufgaben eines Moduls (alle Schwierigkeitsgrade). */
export function getModulePracticeExercises(moduleSlug: string): Exercise[] {
  return byModule[moduleSlug]?.practice ?? [];
}

/** Prüfungsaufgaben eines Moduls. */
export function getModuleExamExercises(moduleSlug: string): Exercise[] {
  return byModule[moduleSlug]?.exam ?? [];
}
`;

fs.writeFileSync(REGISTRY_PATH, registry);

console.log(`\n✔ ${files.length} Module geschrieben (${totalPractice} Übungs-, ${totalExam} Prüfungsaufgaben).`);
console.log(`  JSON: ${OUT_DIR}`);
console.log(`  Registry: ${REGISTRY_PATH}`);
