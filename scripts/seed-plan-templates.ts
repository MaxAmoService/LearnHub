/**
 * seed-plan-templates.ts
 *
 * Schreibt die Lehrplan-Vorlagen aus content/plan-templates/*.json nach
 * Firestore (Collection `planTemplates`, Doc-ID = slug). Idempotent:
 * Vorlagen werden per `set()` überschrieben — mehrfaches Ausführen erzeugt
 * keine Duplikate, sondern synchronisiert den Inhalt. Vorlagen sind
 * clientseitig öffentlich lesbar und nicht schreibbar (firestore.rules);
 * das Schreiben läuft ausschließlich hier über das Admin SDK.
 *
 * Voraussetzung: Service-Account-Credentials über
 * GOOGLE_APPLICATION_CREDENTIALS (oder gcloud ADC für learnhub-eca26).
 *
 * Usage: npm run seed:plan-templates [-- --dry-run]
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const dryRun = process.argv.includes("--dry-run");

if (getApps().length === 0) {
  initializeApp({ credential: applicationDefault() });
}

const db = getFirestore();
const TEMPLATES_DIR = join(process.cwd(), "content", "plan-templates");

interface TemplateItem {
  title: unknown;
  moduleSlug: unknown;
  order: unknown;
  weight: unknown;
  estimatedUnits: unknown;
  topicSlug: unknown;
  lessonId: unknown;
}

interface Template {
  slug: string;
  title: string;
  description: string;
  examType: string;
  items: TemplateItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTemplateItem(value: unknown): value is TemplateItem {
  if (!isRecord(value)) return false;
  return (
    typeof value.title === "string" &&
    value.title.length > 0 &&
    (typeof value.moduleSlug === "string" || value.moduleSlug === null) &&
    typeof value.order === "number" &&
    typeof value.weight === "number" &&
    value.weight >= 1 &&
    value.weight <= 5 &&
    typeof value.estimatedUnits === "number" &&
    value.estimatedUnits > 0 &&
    (typeof value.topicSlug === "string" ||
      value.topicSlug === null ||
      value.topicSlug === undefined) &&
    (typeof value.lessonId === "string" ||
      value.lessonId === null ||
      value.lessonId === undefined)
  );
}

function isTemplate(value: unknown): value is Template {
  if (!isRecord(value)) return false;
  return (
    typeof value.slug === "string" &&
    value.slug.length > 0 &&
    typeof value.title === "string" &&
    value.title.length > 0 &&
    typeof value.description === "string" &&
    typeof value.examType === "string" &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    value.items.every(isTemplateItem)
  );
}

async function main(): Promise<void> {
  const files = readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  let written = 0;
  const failures: string[] = [];

  for (const file of files) {
    const path = join(TEMPLATES_DIR, file);
    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(path, "utf8"));
    } catch (err) {
      failures.push(`${file}: kein gültiges JSON (${err instanceof Error ? err.message : err})`);
      continue;
    }

    if (!isTemplate(parsed)) {
      failures.push(`${file}: Struktur entspricht nicht der PlanTemplate-Form`);
      continue;
    }

    // order fortlaufend normalisieren, damit Templates handgepflegt werden können
    const items = parsed.items
      .map((item, index) => ({
        title: item.title,
        moduleSlug: item.moduleSlug ?? null,
        order: index,
        weight: item.weight,
        estimatedUnits: item.estimatedUnits,
        topicSlug: item.topicSlug ?? null,
        lessonId: item.lessonId ?? null,
      }))
      .sort((a, b) => a.order - b.order);

    const template = {
      slug: parsed.slug,
      title: parsed.title,
      description: parsed.description,
      examType: parsed.examType,
      items,
    };

    if (dryRun) {
      console.log(`[dry-run] Würde "${parsed.slug}" schreiben (${items.length} Items)`);
    } else {
      await db.collection("planTemplates").doc(parsed.slug).set(template);
      console.log(`Geschrieben: "${parsed.slug}" (${items.length} Items)`);
    }
    written += 1;
  }

  if (failures.length > 0) {
    console.error("Fehlerhafte Templates:");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Fertig${dryRun ? " (dry-run)" : ""}: ${written} Vorlage(n) verarbeitet.`);
}

main().catch((err) => {
  console.error("Seed fehlgeschlagen:", err);
  process.exitCode = 1;
});
