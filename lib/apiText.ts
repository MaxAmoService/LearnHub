// ============================================================================
// Text-Formatter für dumme Clients (/api/v1/today?format=text)
// ============================================================================
//
// Reine Funktion — für ESP32/LCD ohne JSON-Parser:
//   - maximal 5 Zeilen
//   - jede Zeile höchstens 40 Zeichen breit
//   - reines ASCII (Umlaute transliteriert, keine Emojis)
//   - deterministische Reihenfolge: Plan-Zeilen → "Wdh:"-Zeile → Streak-Zeile
// Tests: tests/apiText.test.ts.

import type { TodayApiResponse } from "./apiTypes";

export const MAX_TEXT_LINES = 5;
export const MAX_TEXT_WIDTH = 40;

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

/** Hartes Abschneiden auf `max` Zeichen (kein "…" — nicht ASCII). */
export function truncate(s: string, max: number): string {
  if (max <= 0) return "";
  return s.length <= max ? s : s.slice(0, max);
}

function planLine(label: string, title: string, done: number, target: number): string {
  const ratio = `${done}/${target}`;
  const leftMax = MAX_TEXT_WIDTH - ratio.length - 1;
  if (leftMax < 8) return truncate(ratio, MAX_TEXT_WIDTH);
  const left = truncate(toAscii(`${label}  ${title}`), leftMax).padEnd(leftMax, " ");
  return `${left} ${ratio}`;
}

function wdhLine(titles: string[]): string {
  const unique = [...new Set(titles.map((t) => toAscii(t)))];
  return truncate(`Wdh: ${unique.join(", ")}`, MAX_TEXT_WIDTH);
}

function streakLine(data: TodayApiResponse): string {
  return `Streak ${data.streak.current}/${data.streak.weekTarget}`;
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
