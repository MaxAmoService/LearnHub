// ============================================================================
// Text-Formatter für dumme Clients (/api/v1/today?format=text)
// ============================================================================
//
// Reine Funktion — für ESP32/LCD ohne JSON-Parser:
//   - maximal 5 Zeilen
//   - jede Zeile höchstens 40 Zeichen breit; Kürzung an der Wortgrenze
//     mit "..." (kein hartes Abschneiden mitten im Wort)
//   - Plantitel max. 12 Zeichen (MAX_PLAN_TITLE), damit das done/target
//     rechts Platz behält
//   - "Wdh:"-Zeile: ein fälliges Thema → dessen Titel; mehrere → erster
//     Titel + "+N" für die übrigen
//   - reines ASCII (Umlaute transliteriert, keine Emojis)
//   - deterministische Reihenfolge: Plan-Zeilen → "Wdh:"-Zeile → Streak-Zeile
// Tests: tests/apiText.test.ts.

import type { TodayApiResponse } from "./apiTypes";

export const MAX_TEXT_LINES = 5;
export const MAX_TEXT_WIDTH = 40;
export const MAX_PLAN_TITLE = 12;

const TRANSLITERATION: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
  Ä: "Ae",
  Ö: "Oe",
  Ü: "Ue",
};

/** Umlaute transliterieren, übrige Nicht-ASCII-Zeichen durch "?" ersetzen. */
export function toAscii(s: string): string {
  let out = "";
  for (const ch of s) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 128) {
      out += ch;
    } else if (TRANSLITERATION[ch]) {
      out += TRANSLITERATION[ch];
    } else {
      out += "?";
    }
  }
  return out;
}

/**
 * Auf `max` Zeichen kürzen — an der letzten Wortgrenze, mit "..." am Ende,
 * damit erkennbar ist, dass gekürzt wurde. Unverändert, wenn `s` passt.
 */
export function truncateWords(s: string, max: number): string {
  if (s.length <= max) return s;
  const suffix = "...";
  if (max <= suffix.length) return suffix.slice(0, max);
  const limit = max - suffix.length;
  const cut = s.slice(0, limit);
  if (cut[limit - 1] === " " || s[limit] === " ") {
    return cut.trimEnd() + suffix;
  }
  const idx = cut.lastIndexOf(" ");
  const base = (idx > 0 ? cut.slice(0, idx) : cut).trimEnd();
  return base + suffix;
}

function planLine(label: string, title: string, done: number, target: number): string {
  const ratio = `${done}/${target}`;
  const leftMax = MAX_TEXT_WIDTH - ratio.length - 1;
  if (leftMax < 8) return truncateWords(ratio, MAX_TEXT_WIDTH);
  const shortTitle = truncateWords(toAscii(title), MAX_PLAN_TITLE);
  const left = truncateWords(toAscii(`${label}  ${shortTitle}`), leftMax).padEnd(leftMax, " ");
  return `${left} ${ratio}`;
}

function wdhLine(titles: string[]): string {
  const unique = [...new Set(titles.map((t) => toAscii(t)))];
  const first = unique[0] ?? "";
  if (unique.length > 1) {
    const extra = ` +${unique.length - 1}`;
    const budget = MAX_TEXT_WIDTH - "Wdh: ".length - extra.length;
    return `Wdh: ${truncateWords(first, budget)}${extra}`;
  }
  return truncateWords(`Wdh: ${first}`, MAX_TEXT_WIDTH);
}

function streakLine(data: TodayApiResponse): string {
  return truncateWords(
    `Streak ${data.streak.current}/${data.streak.weekTarget}`,
    MAX_TEXT_WIDTH
  );
}

export function formatTodayText(data: TodayApiResponse): string {
  const planLines = data.plans
    .filter((plan) => plan.neu !== null)
    .map((plan) =>
      planLine(plan.label, plan.neu?.title ?? "", plan.neu?.done ?? 0, plan.neu?.target ?? 0)
    );

  const dueTitles = data.plans.flatMap((plan) =>
    plan.wiederholung.map((item) => item.title)
  );
  const wdh = dueTitles.length > 0 ? wdhLine(dueTitles) : null;
  const streak = streakLine(data);

  // Budget: Wdh- und Streak-Zeile werden nie geopfert — bei Platzmangel
  // fliegen Plan-Zeilen vom Ende der Liste zuerst.
  const budget = MAX_TEXT_LINES - (wdh ? 1 : 0) - 1;
  const keptPlans = planLines.slice(0, Math.max(budget, 0));

  const lines = [...keptPlans, ...(wdh ? [wdh] : []), streak];
  if (lines.length === 1 && planLines.length === 0) {
    // Kein einziger Plan-Eintrag und nichts fällig: das auch sagen.
    lines.unshift("Nichts zu tun.");
  }

  return lines.join("\n");
}
