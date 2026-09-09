// Übungsauswertung — reine Funktionen (kein Firestore, keine UI).
//
// Drei Bausteine der Übungsseite (/plans/[planId]/uebung/[itemId]):
//   1. qualityFromRatio   — Trefferquote → SM-2-Qualität (1–5).
//                           Üben bewertet über das Ergebnis, nicht über
//                           Selbsteinschätzung (die gibt es nur noch beim
//                           recall NACH dem eigenen Versuch und im Fallback).
//   2. checkNumericAnswer — Eingabenormalisierung für numeric-Aufgaben:
//                           Komma UND Punkt als Dezimaltrenner, Tausenderpunkte
//                           und Leerzeichen ignorieren. Bei String-Antworten
//                           (IP, Hex, Bitmuster) werden KEINE führenden Nullen
//                           entfernt — "0011" ist nicht "11".
//   3. scoreMatchPairs     — Teilpunkte bei Zuordnungsaufgaben.
//
// Tests: tests/scoring.test.ts.

import type { Exercise, MatchPair } from "./types";

// ─── Trefferquote → SM-2-Qualität ────────────────────────────────────────────

/**
 * SM-2-Qualität (0–5) aus der Trefferquote eines Übungsdurchlaufs.
 *   ab 90 % → 5, ab 75 % → 4, ab 60 % → 3, ab 40 % → 2, darunter → 1.
 * `correct` darf gebrochen sein (recall „teilweise" = 0.5, match anteilig).
 * Defensiv: negative/überschießende Werte werden geklemmt, total ≤ 0 → 1.
 */
export function qualityFromRatio(correct: number, total: number): number {
  if (!Number.isFinite(total) || total <= 0) return 1;
  const ratio = Math.min(Math.max(correct / total, 0), 1);
  if (ratio >= 0.9) return 5;
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  return 1;
}

// ─── Numeric: Zahleneingabe ──────────────────────────────────────────────────

/** Entfernt alle Whitespace-Varianten (normale, geschützte, schmale). */
function stripWhitespace(s: string): string {
  return s.replace(/[\s\u00a0\u202f]/g, "");
}

/**
 * Parst eine Nutzereingabe als Zahl — oder null, wenn sie keine Zahl ist.
 *
 * Regeln:
 *   - Leerzeichen (auch geschützt/schmal) werden entfernt ("2 048" → 2048).
 *   - Komma ist Dezimaltrenner ("1,5" → 1.5).
 *   - Punkt ist Dezimaltrenner, wenn GENAU ein Punkt mit 1–2 Nachkommastellen
 *     folgt ("1.5" → 1.5); sonst Tausenderpunkt ("1.500" → 1500).
 *   - Beide zusammen: Komma dezimal, Punkte Tausender ("1.234,56" → 1234.56).
 *   - Einheiten/Buchstaben machen die Eingabe ungültig (unit wird in der UI
 *     nur angezeigt, nicht mit eingetippt).
 */
export function parseNumericInput(raw: string): number | null {
  let s = raw.trim();
  if (s.length === 0) return null;
  s = stripWhitespace(s);
  if (!/^[-+]?[\d.,]+$/.test(s)) return null;

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");

  let normalized: string;
  if (hasComma && hasDot) {
    normalized = s.replace(/\./g, "").replace(",", ".");
  } else if (hasComma) {
    normalized = s.replace(/,/g, ".");
  } else if (hasDot) {
    const parts = s.split(".");
    if (parts.length === 2 && /^\d{1,2}$/.test(parts[1])) {
      normalized = s;
    } else {
      normalized = s.replace(/\./g, "");
    }
  } else {
    normalized = s;
  }

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

/**
 * Normalisiert eine String-Antwort (IP, Hex, Bitmuster) für den Vergleich:
 * trim, lowercase, optionales "0x"-Präfix entfernen, Whitespace entfernen.
 * Führende Nullen bleiben bewusst erhalten — "0011" ≠ "11", "370" ≠ "3700".
 */
export function normalizeStringAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^0x(?=[0-9a-f])/, "")
    .replace(/[\s\u00a0\u202f]/g, "");
}

/** ULPschutz: schluckt nur Rundungsfehler in der letzten Stelle. */
const EPSILON = 8 * Number.EPSILON * 10;

/**
 * Prüft eine numeric-Antwort:
 *   - answer ist Zahl: Eingabe parsen, |diff| ≤ tolerance (Default 0) + Epsilon.
 *   - answer ist String: normalisierter Stringvergleich (siehe oben).
 */
export function checkNumericAnswer(
  raw: string,
  answer: string | number,
  tolerance?: number
): boolean {
  if (typeof answer === "number") {
    const value = parseNumericInput(raw);
    if (value === null) return false;
    const allowed = (tolerance ?? 0) + EPSILON * Math.max(1, Math.abs(answer));
    return Math.abs(value - answer) <= allowed;
  }
  return normalizeStringAnswer(raw) === normalizeStringAnswer(String(answer));
}

// ─── Match: Teilpunkte ───────────────────────────────────────────────────────

/**
 * Zählt richtig zugeordnete Paare. `selection` bildet die linke Seite auf die
 * gewählte rechte Seite ab; nicht zugeordnete Paare zählen als falsch.
 */
export function scoreMatchPairs(
  selection: Record<string, string | null | undefined>,
  pairs: MatchPair[]
): { correct: number; total: number } {
  const total = pairs.length;
  let correct = 0;
  for (const pair of pairs) {
    if (selection[pair.left] === pair.right) correct += 1;
  }
  return { correct, total };
}

// ─── Defensiv: unvollständige Aufgaben-JSONs ─────────────────────────────────

/**
 * Verwift Einträge, die die UI zum Absturz brächten oder unbewertbar sind
 * (fehlende Felder, kaputte Indizes, doppelte IDs). Die JSON-Dateien sind
 * generiert/konvertiert — hier wird zur Laufzeit nur das Nötigste geprüft.
 */
export function sanitizeExercises(exercises: Exercise[]): Exercise[] {
  const out: Exercise[] = [];
  const seenIds = new Set<string>();

  for (const e of exercises) {
    if (!e || typeof e !== "object") continue;
    const id = typeof e.id === "string" && e.id.length > 0 ? e.id : "";
    if (!id || seenIds.has(id)) continue;
    if (typeof e.prompt !== "string" || e.prompt.trim().length === 0) continue;

    const valid =
      e.type === "recall"
        ? typeof e.sampleAnswer === "string" && e.sampleAnswer.length > 0
        : e.type === "numeric"
          ? (typeof e.answer === "number" ||
              (typeof e.answer === "string" && e.answer.length > 0)) &&
            typeof e.explanation === "string" &&
            e.explanation.length > 0
          : e.type === "choice"
            ? Array.isArray(e.options) &&
              e.options.length >= 2 &&
              new Set(e.options).size === e.options.length &&
              Number.isInteger(e.correctIndex) &&
              e.correctIndex >= 0 &&
              e.correctIndex < e.options.length &&
              typeof e.explanation === "string" &&
              e.explanation.length > 0
            : e.type === "match"
              ? Array.isArray(e.pairs) &&
                e.pairs.length >= 2 &&
                new Set(e.pairs.map((p) => p?.left)).size === e.pairs.length &&
                new Set(e.pairs.map((p) => p?.right)).size === e.pairs.length
              : false;

    if (!valid) continue;
    seenIds.add(id);
    out.push(e);
  }
  return out;
}

// ─── Mischen ─────────────────────────────────────────────────────────────────

/**
 * Fisher-Yates mit injizierbarem Zufall (Tests nutzen einen festen rng).
 * Verhindert das Auswendiglernen von Positionen statt Inhalten.
 */
export { shuffle } from "@/lib/array";
