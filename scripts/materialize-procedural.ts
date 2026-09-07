/**
 * materialize-procedural.ts — prozedurale Übungen (Quelle B) materialisieren.
 *
 * Die Generatoren in lib/exercises/procedural.ts sind reine Funktionen; dieses
 * Skript friert pro Thema EINEN festen Seed als content/exercises/<slug>.json
 * ein (source: "procedural"). Damit laufen alle Themen über denselben
 * Datenpfad wie Quelle A/C: statische Datei + Registry.
 *
 * Die Lösungen sind durch tests/procedural-*.test.ts abgesichert (100 Seeds,
 * unabhängige Neuberechnung). Seeds sind fest verdrahtet — gleicher Seed,
 * gleiche Datei; erneutes Ausführen ist idempotent.
 *
 * Usage: npm run materialize:procedural
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { proceduralGenerators } from "../lib/exercises/procedural";
import type { ExerciseFile } from "../lib/exercises/types";

const PLAN_TEMPLATE_SLUG = "ap1-it-berufe";

// Feste Seeds je Thema (deterministisch, idempotent).
const SEEDS: Record<string, number> = {
  "netzwerktechnik-subnetting": 11,
  "zahlensysteme-umrechnung": 21,
  "zahlensysteme-binaerarithmetik": 22,
  "zahlensysteme-zweierkomplement": 23,
  "zahlensysteme-ieee754": 24,
  "zahlensysteme-fehlererkennung": 25,
  "zahlensysteme-codes": 26,
  "wirtschaft-amortisation-roi": 31,
  "wirtschaft-angebotsvergleich-nutzwertanalyse": 32,
  "diagramme-netzplan-kritischer-pfad": 41,
};

function main(): void {
  const dir = join(process.cwd(), "content", "exercises");
  mkdirSync(dir, { recursive: true });

  let written = 0;
  for (const [slug, seed] of Object.entries(SEEDS)) {
    const generator = proceduralGenerators[slug];
    if (!generator) {
      console.error(`Kein Generator für "${slug}" registriert — übersprungen.`);
      continue;
    }

    const exercises = generator.generate(seed).map((ex, i) => ({
      ...ex,
      id: `${slug}-${String(i + 1).padStart(2, "0")}`,
    }));

    const file: ExerciseFile = {
      topicSlug: slug,
      planTemplateSlug: PLAN_TEMPLATE_SLUG,
      itemTitle: generator.itemTitle,
      source: "procedural",
      ...(generator.standalone ? { standalone: true } : {}),
      reviewedBy: null,
      exercises,
    };

    const outPath = join(dir, `${slug}.json`);
    writeFileSync(outPath, JSON.stringify(file, null, 2) + "\n");
    console.log(
      `Geschrieben: content/exercises/${slug}.json (seed ${seed}, ${exercises.length} Aufgaben: ` +
        `${exercises.map((e) => e.type).filter((t, i, a) => a.indexOf(t) === i).join(", ")})`
    );
    written += 1;
  }

  console.log(`\nFertig: ${written} Datei(en). Anschließend die Imports in lib/exercises/registry.ts ergänzen.`);
}

main();
