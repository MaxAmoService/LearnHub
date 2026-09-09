// dump-mathdata.ts — gibt die mathData-Lektionen als JSON aus (für Refactor-Abgleiche).
// Nutzung: npx tsx scripts/dump-mathdata.ts > /tmp/opencode/mathdata-before.json

import { allModules } from "../lib/data";

const out = allModules
  .filter((m) => m.id.startsWith("m-"))
  .map((m) => ({
    moduleId: m.id,
    slug: m.slug,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      duration: l.duration,
      type: l.type,
      exerciseDifficulty: l.exerciseDifficulty ?? null,
      examMode: l.examMode ?? null,
      content: l.content,
    })),
  }));

console.log(JSON.stringify(out, null, 2));
