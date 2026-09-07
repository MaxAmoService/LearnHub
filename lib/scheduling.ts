// ============================================================================
// Lehrplan-Scheduling — reine Funktionen (kein Firestore)
// ============================================================================

import { addDays, dayOfWeek, daysBetween, todayKey } from "./dates";

// Strukturelle Minimaltypen statt der vollen Plan-Typen aus lib/plans.ts:
// Firestore ist schemalos, daher sind alle Felder optional und werden
// defensiv gelesen — Dokumente ohne die neuen Felder dürfen nicht knallen.

export interface ItemProgressLike {
  repetitions?: number;
  interval?: number;
}

export interface PlanItemLike {
  title?: string;
  order?: number;
  weight?: number;
  estimatedUnits?: number;
  completedUnits?: number;
  sm2?: ItemProgressLike | null;
  nextDueAt?: string | null;
}

export interface PlanLike {
  deadline: string; // "YYYY-MM-DD"
  studyDays?: number[]; // 1=Mo … 7=So; fehlt → jeder Tag ist Lerntag
  bufferDays?: number;
  createdAt?: string | null; // ISO — fehlt → Start = heute (defensiv)
}

export type Phase = "aufbau" | "festigung" | "endspurt";
export type Pace = "ahead" | "on_track" | "behind" | "critical";

const ALL_STUDY_DAYS = [1, 2, 3, 4, 5, 6, 7];
const MAX_ITERATIONS = 3660; // Guard gegen pathologische Eingaben (~10 Jahre)

/**
 * „Gefestigt" hängt am SM-2-Zustand, nicht am Abhaken:
 * mind. 2 korrekte Wiederholungen UND Intervall ≥ 7 Tage.
 * Nur so misst der Fortschritt Behalten statt Durcharbeiten.
 */
export function isConsolidated(item: PlanItemLike): boolean {
  const rep = item.sm2?.repetitions ?? 0;
  const interval = item.sm2?.interval ?? 0;
  return rep >= 2 && interval >= 7;
}

function planStartKey(plan: PlanLike, today: string): string {
  return plan.createdAt ? todayKey(new Date(plan.createdAt)) : today;
}

/** Dauer des Endspurts in Tagen — identische Formel wie in computePhase. */
function endspurtDaysFor(plan: PlanLike, today: string): number {
  const start = planStartKey(plan, today);
  const total = Math.max(daysBetween(start, plan.deadline), 0);
  return total < 30 ? Math.max(1, Math.round(total * 0.2)) : 14;
}

/** Anzahl Lerntage von `from` bis `to` (inklusive). */
export function countStudyDays(
  from: string,
  to: string,
  studyDays: number[] = ALL_STUDY_DAYS
): number {
  if (daysBetween(from, to) < 0) return 0;
  const set = new Set(studyDays);
  let count = 0;
  let cursor = from;
  let guard = 0;
  while (guard <= MAX_ITERATIONS) {
    if (set.has(dayOfWeek(cursor))) count += 1;
    if (cursor === to) break;
    cursor = addDays(cursor, 1);
    guard += 1;
  }
  return count;
}

/**
 * Tagesziel: offene gewichtete Einheiten / verbleibende Lerntage minus Puffer.
 * Bei Rückstand steigt der Wert automatisch, weil der Nenner schrumpft.
 */
export function computeDailyTarget(
  plan: PlanLike,
  items: PlanItemLike[],
  today: string
): number {
  if (items.length === 0) return 0;

  let openWeighted = 0;
  for (const item of items) {
    if (isConsolidated(item)) continue;
    const remaining = Math.max((item.estimatedUnits ?? 0) - (item.completedUnits ?? 0), 0);
    openWeighted += remaining * (item.weight ?? 1);
  }
  if (openWeighted <= 0) return 0;

  const buffer = plan.bufferDays ?? 0;
  const studyDaysLeft =
    countStudyDays(today, plan.deadline, plan.studyDays ?? ALL_STUDY_DAYS) - buffer;

  if (studyDaysLeft <= 0) return openWeighted; // Deadline erreicht/überschritten — alles fällig
  return Math.ceil(openWeighted / studyDaysLeft);
}

/**
 * Lernphase:
 *  - 'aufbau'    neuer Stoff + Wiederholung (bis 25 % Restzeit)
 *  - 'festigung' letzte 25 % ohne Endspurt: kein neuer Stoff mehr
 *  - 'endspurt'  nur Wiederholung.
 * Bei Gesamtlaufzeit < 30 Tagen skaliert der Endspurt proportional
 * (20 % der Laufzeit, mindestens 1 Tag), damit kurze Pläne abarbeitbar bleiben.
 */
export function computePhase(plan: PlanLike, today: string): Phase {
  const remaining = daysBetween(today, plan.deadline);
  if (remaining < 0) return "endspurt"; // Deadline überschritten

  const start = planStartKey(plan, today);
  const total = Math.max(daysBetween(start, plan.deadline), 0);
  const endspurtDays = endspurtDaysFor(plan, today);

  if (remaining <= endspurtDays) return "endspurt";
  if (remaining <= total * 0.25) return "festigung";
  return "aufbau";
}

/**
 * Erster Tag der Endspurt-Phase ("YYYY-MM-DD") — für die Wizard-Vorschau
 * ("Endspurt ab <Datum>"). Nutzt exakt dieselbe Endspurt-Dauer wie
 * computePhase, damit Vorschau und Laufzeitverhalten nie auseinanderlaufen.
 */
export function computeEndspurtStart(plan: PlanLike, today: string): string {
  return addDays(plan.deadline, -endspurtDaysFor(plan, today));
}

/**
 * Tempo: gewichteter Ist-Fortschritt vs. erwarteter Soll-Fortschritt
 * (linear über die Laufzeit). „Gefestigt" zählt als 100 % des Items.
 * Am Erstellungstag ist noch kein Soll aufgelaufen — Soll = 0 — und der
 * Plan gilt als 'on_track' statt 'critical': der Erstellungstag selbst
 * zählt nicht als verstrichener Lerntag.
 */
export function computePace(
  plan: PlanLike,
  items: PlanItemLike[],
  today: string
): Pace {
  if (items.length === 0) return "on_track";

  let totalWeighted = 0;
  let actualWeighted = 0;
  for (const item of items) {
    const weight = item.weight ?? 1;
    totalWeighted += weight;
    if (isConsolidated(item)) {
      actualWeighted += weight;
      continue;
    }
    const estimated = Math.max(item.estimatedUnits ?? 1, 1);
    const fraction = Math.min(Math.max(item.completedUnits ?? 0, 0) / estimated, 1);
    actualWeighted += weight * fraction;
  }
  if (totalWeighted <= 0) return "on_track";

  const start = planStartKey(plan, today);
  const total = daysBetween(start, plan.deadline);
  const remaining = daysBetween(today, plan.deadline);

  if (remaining < 0) {
    // Deadline überschritten: reiner Ist/offen-Vergleich
    const done = actualWeighted / totalWeighted;
    if (done >= 1) return "ahead";
    if (done >= 0.85) return "on_track";
    if (done >= 0.5) return "behind";
    return "critical";
  }

  // Verstrichene Lerntage exklusive des Erstellungstags: Am Erstellungstag
  // ist elapsed = 0 → Soll = 0 → on_track/ahead, nie critical.
  const elapsed = Math.max(daysBetween(start, today), 0);
  const expectedFraction = total <= 0 ? 1 : Math.min(Math.max(elapsed / total, 0), 1);
  const expected = totalWeighted * expectedFraction;
  const ratio = expected <= 0 ? (actualWeighted > 0 ? 2 : 1) : actualWeighted / expected;

  if (ratio >= 1.1) return "ahead";
  if (ratio >= 0.85) return "on_track";
  if (ratio >= 0.5) return "behind";
  return "critical";
}
