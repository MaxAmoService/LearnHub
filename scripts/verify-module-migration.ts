// verify-module-migration.ts — vergleicht die Legacy-Pools (lib/mathExercises.ts)
// mit den migrierten JSON-Pools (lib/exercises/moduleRegistry.ts).
//
// Prüft für JEDES Modul: Anzahl pro Schwierigkeit, Fragetext, Optionen +
// korrekte Option (choice), Antwort + acceptedAnswers + tolerance (numeric).
//
// Nutzung: npx tsx scripts/verify-module-migration.ts

import { allExercises, examExercises } from "../lib/mathExercises";
import {
  getModulePracticeExercises,
  getModuleExamExercises,
} from "../lib/exercises/moduleRegistry";
import {
  isChoiceExercise,
  isNumericExercise,
  type Exercise,
} from "../lib/exercises/types";

interface LegacyShape {
  id: string;
  question: string;
  difficulty: number;
  kind: "choice" | "numeric";
  options?: string[];
  correctLabel?: string;
  answer?: string;
  acceptedAnswers?: string[];
  tolerance?: number;
}

function legacyShape(list: (typeof allExercises)[number][]): LegacyShape[] {
  return list.map((e) => {
    const isChoiceShaped =
      e.type === "multiple" ||
      (e.options && e.options.length > 0 && e.correctOption !== undefined && e.expectedAnswer === undefined);
    if (isChoiceShaped) {
      const correct = e.options?.find((o) => o.value === e.correctOption);
      return {
        id: e.id,
        question: e.question,
        difficulty: e.difficulty,
        kind: "choice",
        options: e.options?.map((o) => o.label),
        correctLabel: correct?.label ?? `MISSING:${e.correctOption}`,
      };
    }
    return {
      id: e.id,
      question: e.question,
      difficulty: e.difficulty,
      kind: "numeric",
      answer: e.expectedAnswer,
      acceptedAnswers: e.acceptedAnswers,
      tolerance: e.tolerance,
    };
  });
}

function newShape(list: Exercise[]): LegacyShape[] {
  return list.map((e) => {
    if (isChoiceExercise(e)) {
      return {
        id: e.id,
        question: e.prompt,
        difficulty: e.difficulty,
        kind: "choice",
        options: e.options,
        correctLabel: e.options[e.correctIndex] ?? `MISSING:${e.correctIndex}`,
      };
    }
    if (isNumericExercise(e)) {
      return {
        id: e.id,
        question: e.prompt,
        difficulty: e.difficulty,
        kind: "numeric",
        answer: String(e.answer),
        acceptedAnswers: e.acceptedAnswers,
        tolerance: e.tolerance,
      };
    }
    return {
      id: e.id,
      question: e.prompt,
      difficulty: e.difficulty,
      kind: "choice" as const,
      options: [],
      correctLabel: `UNEXPECTED-TYPE:${e.type}`,
    };
  });
}

const moduleSlugs = new Set<string>([
  ...allExercises.map((e) => e.lessonId),
  ...Object.keys(examExercises),
]);

let errors = 0;
const report: string[] = [];

for (const slug of [...moduleSlugs].sort()) {
  const legacyPractice = legacyShape(allExercises.filter((e) => e.lessonId === slug));
  const legacyExam = legacyShape(examExercises[slug] ?? []);
  const newPractice = newShape(getModulePracticeExercises(slug));
  const newExam = newShape(getModuleExamExercises(slug));

  for (const [label, a, b] of [
    ["Übung", legacyPractice, newPractice],
    ["Prüfung", legacyExam, newExam],
  ] as const) {
    if (a.length !== b.length) {
      report.push(`❌ ${slug} (${label}): Anzahl ${a.length} → ${b.length}`);
      errors++;
      continue;
    }
    for (let i = 0; i < a.length; i++) {
      const la = a[i];
      const nb = b[i];
      if (la.question !== nb.question || la.difficulty !== nb.difficulty) {
        report.push(`❌ ${slug} (${label}) #${i}: Fragetext/Difficulty weicht ab (${la.id})`);
        errors++;
      } else if (la.kind !== nb.kind) {
        report.push(`❌ ${slug} (${label}) #${i}: Typ ${la.kind} → ${nb.kind} (${la.id})`);
        errors++;
      } else if (la.kind === "choice") {
        const sameOptions =
          JSON.stringify(la.options) === JSON.stringify(nb.options) &&
          la.correctLabel === nb.correctLabel;
        if (!sameOptions) {
          report.push(`❌ ${slug} (${label}) #${i}: Optionen/korrekte Option weichen ab (${la.id})`);
          errors++;
        }
      } else {
        const norm = (s?: string) => (s ?? "").trim();
        const laNum = parseFloat(norm(la.answer));
        const nbNum = parseFloat(norm(nb.answer));
        const numericEqual =
          !isNaN(laNum) && !isNaN(nbNum) ? laNum === nbNum : norm(la.answer) === norm(nb.answer);
        const sameAnswer =
          numericEqual &&
          JSON.stringify(la.acceptedAnswers ?? []) === JSON.stringify(nb.acceptedAnswers ?? []) &&
          (la.tolerance ?? undefined) === (nb.tolerance ?? undefined);
        if (!sameAnswer) {
          report.push(
            `❌ ${slug} (${label}) #${i}: Antwort weicht ab (${la.id}): "${norm(la.answer)}" vs "${norm(nb.answer)}"`,
          );
          errors++;
        }
      }
    }
  }
  const total = legacyPractice.length + legacyExam.length;
  if (total > 0 && !report.some((r) => r.startsWith(`❌ ${slug}`))) {
    report.push(`✅ ${slug}: ${legacyPractice.length} Übung + ${legacyExam.length} Prüfung identisch`);
  }
}

console.log(report.join("\n"));
console.log(`\n${errors === 0 ? "✅ Migration vollständig verifiziert." : `❌ ${errors} Abweichungen.`}`);
process.exit(errors === 0 ? 0 : 1);
