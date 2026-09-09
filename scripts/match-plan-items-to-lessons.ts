/**
 * match-plan-items-to-lessons.ts — lessonId in Plan-Vorlagen eintragen.
 *
 * Einmaliges Autorenwerkzeug (idempotent): Für jedes Template-Item mit
 * gesetztem moduleSlug werden die Lektionstitel des Moduls (nur text/video/
 * interactive — keine quiz/exercises-Lektionen) gegen den Item-Titel
 * verglichen. Nur bei eindeutiger Übereinstimmung (exakt oder eine einzelne
 * Lektion mit deutlich höchster Ähnlichkeit, siehe lib/planLessonMatch.ts)
 * wird lessonId in die Vorlagen-JSON geschrieben.
 *
 * Mehrdeutige oder schwache Treffer bleiben null — kein erzwungenes Raten.
 * Bereits von Hand gesetzte lessonIds werden NUR bei einem sicheren Treffer
 * überschrieben, sonst erhalten. Am Ende werden alle gesetzten und alle
 * offen gebliebenen Zuordnungen geloggt.
 *
 * Usage: tsx scripts/match-plan-items-to-lessons.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getModule } from "../lib/data";
import { matchPlanItemToLesson, scoreAgainstLessons } from "../lib/planLessonMatch";
import type { Lesson } from "../lib/types";

const TEMPLATES = ["ap1-it-berufe", "mathematik-1"];

/** Lektionstypen, die als Deep-Link-Ziel in Frage kommen. */
const MATCHABLE_TYPES = new Set(["text", "video", "interactive"]);

interface TemplateFile {
  slug: string;
  items: { title: string; moduleSlug: string | null; lessonId?: string | null }[];
}

function main(): void {
  for (const templateSlug of TEMPLATES) {
    const path = join(process.cwd(), "content", "plan-templates", `${templateSlug}.json`);
    const template = JSON.parse(readFileSync(path, "utf8")) as TemplateFile;

    const matched: { title: string; lessonId: string; score: number }[] = [];
    const open: { title: string; reason: string; bestScore: number | null }[] = [];
    let changed = 0;

    for (const item of template.items) {
      if (!item.moduleSlug) continue;

      const module = getModule(item.moduleSlug);
      if (!module) {
        open.push({ title: item.title, reason: `Modul "${item.moduleSlug}" nicht gefunden`, bestScore: null });
        continue;
      }

      const lessons: Lesson[] = module.lessons.filter((l) => MATCHABLE_TYPES.has(l.type));
      const scored = scoreAgainstLessons(
        item.title,
        lessons.map((l) => ({ id: l.id, title: l.title }))
      );
      const lessonId = matchPlanItemToLesson(item.title, scored);

      if (lessonId) {
        if (item.lessonId !== lessonId) {
          item.lessonId = lessonId;
          changed += 1;
        }
        matched.push({ title: item.title, lessonId, score: scored[0]?.score ?? 0 });
      } else {
        const best = scored[0];
        open.push({
          title: item.title,
          reason: best
            ? `schwacher/mehrdeutiger Treffer (bester Kandidat "${best.title}" mit ${best.score.toFixed(2)})`
            : "keine passende Lektion im Modul",
          bestScore: best?.score ?? null,
        });
      }
    }

    if (changed > 0) {
      writeFileSync(path, JSON.stringify(template, null, 2) + "\n");
    }

    console.log(`\n═══ ${templateSlug} (${changed} lessonId(s) gesetzt) ═══`);
    console.log(`\n✅ Gesetzt (${matched.length}):`);
    for (const m of matched) {
      console.log(`   ${m.title}  →  ${m.lessonId}  (Score ${m.score.toFixed(2)})`);
    }
    console.log(`\n⚠️  Offen geblieben (${open.length}) — bei Bedarf von Hand ergänzen:`);
    for (const o of open) {
      console.log(`   ${o.title}  —  ${o.reason}`);
    }
  }
}

main();
