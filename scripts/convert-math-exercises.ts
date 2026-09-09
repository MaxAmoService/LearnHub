/**
 * convert-math-exercises.ts — Mathematik-1-Bestand nach content/exercises/ konvertieren.
 *
 * Einmaliges Autorenwerkzeug (idempotent): Liest die Übungs-/Prüfungsarrays
 * der 6 Mathematik-1-Themen aus lib/mathExercises.ts und schreibt sie im
 * Topic-JSON-Schema nach content/exercises/<topicSlug>.json
 * (source "existing"). Anschließend trägt das Skript die topicSlugs in
 * content/plan-templates/mathematik-1.json ein, damit die Plan-Items den
 * „Üben"-Button bekommen.
 *
 * Themen-Zuordnung (fachlich zusammengelegt):
 *   komplexePractice+Exam                    → mathe1-komplexe-zahlen
 *   folgenPractice+Exam + reihenPractice+Exam → mathe1-folgen-reihen
 *   ableitungenPractice+Exam                 → mathe1-differentialrechnung
 *   integrationPractice+Exam                 → mathe1-integralrechnung
 *   vektorenPractice+Exam + lgsPractice+Exam  → mathe1-lineare-algebra
 *   matrizenPractice+Exam                    → mathe1-matrizen
 *
 * Bestehende Dateien werden komplett überschrieben (deterministische
 * `<slug>-ex-NN`-IDs) — erneutes Ausführen ist idempotent. Die
 * Quelldateien (lib/mathExercises.ts, components/Quiz.tsx) bleiben
 * unangetastet — die Modul-Quiz-Funktion nutzt sie weiter.
 *
 * Usage: npm run convert:math-exercises
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  ableitungenPractice,
  ableitungenExam,
  folgenPractice,
  folgenExam,
  integrationPractice,
  integrationExam,
  komplexePractice,
  komplexeExam,
  lgsPractice,
  lgsExam,
  matrizenPractice,
  matrizenExam,
  reihenPractice,
  reihenExam,
  vektorenPractice,
  vektorenExam,
  type Exercise as LegacyExercise,
} from "../lib/mathExercises";
import { convertMathExercise } from "../lib/exercises/convertMath";
import type { Exercise, ExerciseFile } from "../lib/exercises/types";

const PLAN_TEMPLATE_SLUG = "mathematik-1";

interface TopicDef {
  slug: string;
  arrays: LegacyExercise[][];
}

// Reihenfolge entspricht der Item-Reihenfolge in mathematik-1.json.
const TOPICS: TopicDef[] = [
  { slug: "mathe1-komplexe-zahlen", arrays: [komplexePractice, komplexeExam] },
  {
    slug: "mathe1-folgen-reihen",
    arrays: [folgenPractice, folgenExam, reihenPractice, reihenExam],
  },
  { slug: "mathe1-differentialrechnung", arrays: [ableitungenPractice, ableitungenExam] },
  { slug: "mathe1-integralrechnung", arrays: [integrationPractice, integrationExam] },
  {
    slug: "mathe1-lineare-algebra",
    arrays: [vektorenPractice, vektorenExam, lgsPractice, lgsExam],
  },
  { slug: "mathe1-matrizen", arrays: [matrizenPractice, matrizenExam] },
];

interface TemplateFile {
  items: { title: string; topicSlug?: string | null }[];
}

function main(): void {
  const dir = join(process.cwd(), "content", "exercises");
  mkdirSync(dir, { recursive: true });

  const templatePath = join(process.cwd(), "content", "plan-templates", `${PLAN_TEMPLATE_SLUG}.json`);
  const template = JSON.parse(readFileSync(templatePath, "utf8")) as TemplateFile;
  if (template.items.length !== TOPICS.length) {
    throw new Error(
      `Template ${PLAN_TEMPLATE_SLUG} hat ${template.items.length} Items, erwartet ${TOPICS.length}.`
    );
  }

  let templateChanged = 0;

  for (let i = 0; i < TOPICS.length; i++) {
    const topic = TOPICS[i];
    const item = template.items[i];

    const exercises: Exercise[] = [];
    for (const array of topic.arrays) {
      for (const ex of array) {
        exercises.push(convertMathExercise(ex, topic.slug, exercises.length));
      }
    }

    const file: ExerciseFile = {
      topicSlug: topic.slug,
      planTemplateSlug: PLAN_TEMPLATE_SLUG,
      itemTitle: item.title,
      source: "existing",
      reviewedBy: null,
      exercises,
    };
    const outPath = join(dir, `${topic.slug}.json`);
    writeFileSync(outPath, JSON.stringify(file, null, 2) + "\n");

    if (item.topicSlug !== topic.slug) {
      item.topicSlug = topic.slug;
      templateChanged += 1;
    }

    const counts = { choice: 0, numeric: 0, recall: 0, match: 0 };
    for (const ex of exercises) counts[ex.type] += 1;
    console.log(
      `Geschrieben: ${topic.slug} (${exercises.length} Aufgaben — ` +
        `${counts.choice} choice, ${counts.numeric} numeric, ${counts.recall} recall)`
    );
  }

  if (templateChanged > 0) {
    writeFileSync(templatePath, JSON.stringify(template, null, 2) + "\n");
    console.log(`\n${templateChanged} topicSlug(s) in ${PLAN_TEMPLATE_SLUG}.json ergänzt.`);
  } else {
    console.log(`\nAlle topicSlugs in ${PLAN_TEMPLATE_SLUG}.json waren bereits gesetzt.`);
  }
  console.log("REVIEW-PFLICHT: Dateien vor dem Commit durchsehen und reviewedBy eintragen.");
}

main();
