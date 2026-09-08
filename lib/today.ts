// ============================================================================
// Tagesplan-Builder — reine Funktion (kein Firestore)
// ============================================================================
//
// Baut aus Plänen, deren Items und dem Activity-Dokument des aktuellen Monats
// die Tagesansicht: pro Plan einen Neu-Block und einen Wiederholungs-Block,
// dazu eine über alle Themen gemischte Queue. Überfällige Wiederholungen haben
// Vorrang vor neuem Stoff — sonst wächst ein nie abgebauter Berg.

import { addDays, dayOfMonth, dayOfWeek, monthKey, todayKey } from "./dates";
import {
  computeDailyTarget,
  computePhase,
  isConsolidated,
  type PlanItemLike,
  type PlanLike,
} from "./scheduling";

export interface ActivityDayLike {
  units?: number;
  done?: number;
  planIds?: string[];
}

/**
 * Das Activity-Dokument des aktuellen Monats
 * (users/{uid}/activity/{monthKey(todayKey(now))}).
 */
export interface ActivityDocLike {
  days?: Record<string, ActivityDayLike | undefined>;
}

export interface PlanBlocks {
  planId: string;
  neu: PlanItemLike | null;
  wiederholung: PlanItemLike[];
}

export interface TodaySchedule {
  blocks: PlanBlocks[];
  /** Gemischte Reihenfolge über alle Pläne: erst Wiederholungen, dann Neues. */
  queue: PlanItemLike[];
}

export interface TodayPlanLike extends PlanLike {
  id: string;
  title?: string;
  archivedAt?: string | null;
}

const MAX_REVIEWS_PER_PLAN = 3;

function sortByOrder(items: PlanItemLike[]): PlanItemLike[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function hasActivityToday(
  activity: ActivityDocLike | null | undefined,
  today: string,
  planId: string
): boolean {
  const dayEntry = activity?.days?.[dayOfMonth(today)];
  return Array.isArray(dayEntry?.planIds) && dayEntry.planIds.includes(planId);
}

/**
 * @param plans  aktive + archivierte Pläne; archivierte (archivedAt gesetzt)
 *               werden übersprungen.
 * @param items  Items je Plan, Schlüssel = planId.
 * @param activity Monats-Doc für den Monat von todayKey(now); darf fehlen.
 */
export function buildToday(
  plans: TodayPlanLike[],
  items: Record<string, PlanItemLike[] | undefined>,
  activity: ActivityDocLike | null | undefined,
  now: Date = new Date()
): TodaySchedule {
  const today = todayKey(now);
  const active = plans.filter((p) => p.archivedAt == null);

  const blocks: PlanBlocks[] = active.map((plan) => {
    const planItems = sortByOrder(items[plan.id] ?? []);
    const phase = computePhase(plan, today);

    // Neu = nächstes offenes (nicht gefestigtes) Item nach order, das heute
    // NICHT fällig ist — fällige Items laufen über den Wiederholungs-Block,
    // sonst würde dasselbe Item doppelt vorgeschlagen.
    let neu: PlanItemLike | null = null;
    if (phase === "aufbau") {
      neu =
        planItems.find(
          (item) =>
            !isConsolidated(item) && (item.nextDueAt == null || item.nextDueAt > today)
        ) ?? null;
    }

    const wiederholung = planItems
      .filter((item) => item.nextDueAt != null && item.nextDueAt <= today)
      .sort(
        (a, b) =>
          (a.nextDueAt ?? "").localeCompare(b.nextDueAt ?? "") ||
          (a.order ?? 0) - (b.order ?? 0)
      )
      .slice(0, MAX_REVIEWS_PER_PLAN);

    return { planId: plan.id, neu, wiederholung };
  });

  // Queue: 1) alle fälligen Wiederholungen über Pläne hinweg nach Fälligkeit,
  //        2) dann Neu-Items im Round-Robin über Pläne.
  const queue: PlanItemLike[] = [];

  blocks
    .flatMap((block, planIndex) =>
      block.wiederholung.map((item, itemIndex) => ({ item, planIndex, itemIndex }))
    )
    .sort(
      (a, b) =>
        (a.item.nextDueAt ?? "").localeCompare(b.item.nextDueAt ?? "") ||
        a.planIndex - b.planIndex ||
        a.itemIndex - b.itemIndex
    )
    .forEach(({ item }) => queue.push(item));

  // Neu-Items: Pläne, die heute schon Aktivität haben, kommen nach hinten.
  // Jeder Plan liefert höchstens ein Neu-Item — gemischt über Pläne statt
  // blockweise.
  const planOrder = active
    .map((plan, index) => ({ index, hasActivity: hasActivityToday(activity, today, plan.id) }))
    .sort((a, b) => Number(a.hasActivity) - Number(b.hasActivity) || a.index - b.index);

  for (const { index } of planOrder) {
    const neu = blocks[index].neu;
    if (neu !== null) queue.push(neu);
  }

  return { blocks, queue };
}

export interface WeekProgress {
  /** Gelernte Tage (Activity mit units > 0) in der aktuellen Woche (Mo–So). */
  studied: number;
  /** Geplante Lerntage in der aktuellen Woche (aus der studyDays-Union). */
  planned: number;
}

// ─── Tag geschafft (dayDone der Widget-API) ─────────────────────────────────
//
// doneToday aus dem Activity-Doc ist nutzerweit und NICHT plan-bezogen —
// Einheiten eines am selben Tag gelöschten Plans würden damit fälschlich dem
// Pensum anderer Pläne zugerechnet. Deshalb zählt das Pensum pro Plan über
// die heute an DIESEM Plan bearbeiteten Items (sm2.lastReview, Berliner Tag).
// Quiz-Reviews zählen bewusst NICHT als Pensum: computeQuizTopicReviewPatch
// (lib/quiz.ts) erhält das bisherige lastReview — ein Fehlversuch darf den
// Tag nicht freischalten.

/** sm2 mit lastReview — Firestore-Items tragen es, PlanItemLike nicht. */
interface ReviewProgressLike {
  repetitions?: number;
  interval?: number;
  lastReview?: number;
}

/**
 * Heute an diesem Plan bearbeitete Einheiten — gemessen über die Items des
 * Plans, deren letzter ECHTER Review auf den heutigen Berliner Tag fällt
 * (sm2.lastReview). Gewichtet wie computeDailyTarget (weight ?? 1).
 */
export function computePlanUnitsToday(
  items: readonly PlanItemLike[],
  today: string
): number {
  let units = 0;
  for (const item of items) {
    const sm2 = item.sm2 as ReviewProgressLike | null | undefined;
    if (!sm2 || typeof sm2.lastReview !== "number" || sm2.lastReview <= 0) continue;
    if (todayKey(new Date(sm2.lastReview)) === today) {
      units += item.weight ?? 1;
    }
  }
  return units;
}

/**
 * Vorsprung in Tagen: wie viele Lerntage das künftige Tagespensum durch
 * `aheadUnits` (Einheiten ÜBER dem heutigen Pensum) kürzer wird — der
 * Unterschied zwischen den Lerntagen, die ohne den Vorsprung nötig wären,
 * und denen, die bei aktuellem Stand nötig sind.
 *
 * Ehrlich und konservativ: aheadUnits / dailyTarget, ABGERUNDET auf ganze
 * Tage — ein halber Tag Vorsprung bleibt unsichtbar (0). Geschönte
 * Motivationszahlen gibt es nicht.
 */
export function computeAheadDays(aheadUnits: number, dailyTarget: number): number {
  if (!Number.isFinite(dailyTarget) || dailyTarget <= 0) return 0;
  if (!Number.isFinite(aheadUnits) || aheadUnits <= 0) return 0;
  return Math.floor(aheadUnits / dailyTarget);
}

export interface PlanDayProgress {
  /** Heute an diesem Plan bearbeitete gewichtete Einheiten (echte Reviews). */
  unitsToday: number;
  /** Tagesziel des Plans (computeDailyTarget) — gewichtete Einheiten. */
  dailyTarget: number;
}

export interface DayDoneInput {
  /** Tagesquiz heute bestanden — schlägt die Invariante (das ist die Abkürzung). */
  quizPassedToday: boolean;
  /** Mindestens ein aktiver Plan vorhanden? */
  hasActivePlans: boolean;
  /** Offene fällige Wiederholungen (nextDueAt <= heute) über alle aktiven Pläne. */
  dueCount: number;
  /** Offenes Neu-Thema (done < target) irgendwo? */
  hasOpenNeu: boolean;
  /** Pro aktivem Plan: heutige Einheiten + Tagesziel. */
  planProgress: PlanDayProgress[];
}

/**
 * Ob der heutige Tag als geschafft gilt (Widget-API `dayDone`).
 *
 * - Quiz heute bestanden → IMMER geschafft (Abkürzung, gewollt).
 * - Sonst Plausibilitäts-Invariante: dayDone ist nie true, solange fällige
 *   Wiederholungen offen sind oder ein Neu-Thema done < target hat — die
 *   Antwort darf sich nicht selbst widersprechen.
 * - Und das Tagespensum jedes aktiven Plans muss erreicht sein (heute an
 *   DIESEM Plan bearbeitete Einheiten >= Tagesziel des Plans).
 */
export function computeDayDone(input: DayDoneInput): boolean {
  if (input.quizPassedToday) return true;
  if (!input.hasActivePlans) return false;
  if (input.dueCount > 0 || input.hasOpenNeu) return false;
  if (input.planProgress.length === 0) return false;
  return input.planProgress.every((p) => p.unitsToday >= p.dailyTarget);
}

export interface PlanDayStatus {
  planId: string;
  title: string;
  /** Heute an diesem Plan bearbeitete gewichtete Einheiten. */
  todayDone: number;
  /** Tagesziel des Plans (computeDailyTarget). */
  todayTarget: number;
  /** Einheiten ÜBER dem Tagesziel (0, wenn das Pensum nicht erfüllt ist). */
  aheadUnits: number;
  /** Vorsprung in Tagen (konservativ abgerundet, mindestens 0). */
  aheadDays: number;
  /** Offene fällige Wiederholungen DIESES Plans (ungedeckelt). */
  dueCount: number;
  /** Offenes Neu-Thema (done < target) in diesem Plan? */
  hasOpenNeu: boolean;
  /** Bestandenes Tagesquiz hat Fragen aus diesem Plan gezogen. */
  quizDone: boolean;
  /** Der Plan gilt heute als erledigt (per Quiz oder per Pensum). */
  done: boolean;
}

export interface DayStatusResult {
  /** Tag geschafft: JEDER aktive Plan ist erledigt (per Quiz oder Pensum). */
  dayDone: boolean;
  /** Mindestens ein Plan erledigt UND mindestens einer offen. */
  partial: boolean;
  /** Alle Pläne sind per Quiz erledigt (für die Zusatz-Zeile). */
  allQuizDone: boolean;
  /**
   * Was noch offen ist: fällige Wiederholungen über alle aktiven Pläne
   * (ungedeckelt) + offene Neu-Themen (done < target) — dasselbe Maß wie
   * `totalDue` der Widget-API.
   */
  openCount: number;
  /** Heute bearbeitete Einheiten über alle aktiven Pläne (gewichtet). */
  unitsToday: number;
  /** Summe der Tagesziele (computeDailyTarget) aller aktiven Pläne. */
  dailyTarget: number;
  /** Titel der noch offenen aktiven Pläne (für „… offen" in der Statuszeile). */
  openPlanTitles: string[];
  /** Status PRO aktivem Plan. */
  plans: PlanDayStatus[];
}

/**
 * Tagesstatus aus Plänen + Items + Quiz-Ergebnis — die EINE Quelle für die
 * Statuszeile (Heute-Karte, Übungs-Abschluss, Widget-API).
 *
 * Plan-bezogen: Ein bestandenes Quiz erledigt nur die Pläne, aus denen
 * mindestens eine Frage stammte (quizPlanIds). Jeder übrige aktive Plan
 * muss sein Pensum erreichen (computeDayDone mit derselben Invariante:
 * keine offenen fälligen Wiederholungen, kein offenes Neu-Thema). Der
 * Gesamttag ist erst erledigt, wenn JEDER aktive Plan erledigt ist —
 * sonst meldet `partial` den Zwischenstand. Kein Firestore-Zugriff.
 */
export function computeDayStatus(input: {
  /** Aktive Pläne (archivierte werden intern übersprungen). */
  plans: TodayPlanLike[];
  itemsByPlan: Record<string, PlanItemLike[] | undefined>;
  quizPassedToday: boolean;
  /** Pläne, aus denen das bestandene Tagesquiz Fragen gezogen hat. */
  quizPlanIds?: readonly string[];
  now?: Date;
}): DayStatusResult {
  const now = input.now ?? new Date();
  const today = todayKey(now);
  const active = input.plans.filter((p) => p.archivedAt == null);
  const quizSet = new Set(input.quizPlanIds ?? []);

  // Activity ist für die Block-Struktur irrelevant (nur für die Queue-
  // Reihenfolge) — null reicht hier.
  const schedule = buildToday(active, input.itemsByPlan, null, now);

  const plans: PlanDayStatus[] = active.map((plan) => {
    const items = input.itemsByPlan[plan.id] ?? [];
    const block = schedule.blocks.find((b) => b.planId === plan.id);

    const todayDone = computePlanUnitsToday(items, today);
    const todayTarget = computeDailyTarget(plan, items, today);
    const aheadUnits = Math.max(todayDone - todayTarget, 0);

    const dueCount = items.filter(
      (item) => item.nextDueAt != null && item.nextDueAt <= today
    ).length;
    const hasOpenNeu =
      block?.neu != null &&
      (block.neu.completedUnits ?? 0) < Math.max(block.neu.estimatedUnits ?? 1, 1);

    const quizDone = input.quizPassedToday && quizSet.has(plan.id);
    const pensumDone = computeDayDone({
      quizPassedToday: false,
      hasActivePlans: true,
      dueCount,
      hasOpenNeu,
      planProgress: [{ unitsToday: todayDone, dailyTarget: todayTarget }],
    });

    return {
      planId: plan.id,
      title: plan.title && plan.title.length > 0 ? plan.title : "Plan",
      todayDone,
      todayTarget,
      aheadUnits,
      aheadDays: computeAheadDays(aheadUnits, todayTarget),
      dueCount,
      hasOpenNeu,
      quizDone,
      done: quizDone || pensumDone,
    };
  });

  const openPlans = plans.filter((p) => !p.done);
  const donePlansCount = plans.length - openPlans.length;

  return {
    dayDone: active.length > 0 ? openPlans.length === 0 : input.quizPassedToday,
    partial: active.length > 0 && donePlansCount > 0 && openPlans.length > 0,
    allQuizDone: active.length > 0 && plans.every((p) => p.quizDone),
    openCount: plans.reduce((sum, p) => sum + p.dueCount + (p.hasOpenNeu ? 1 : 0), 0),
    unitsToday: plans.reduce((sum, p) => sum + p.todayDone, 0),
    dailyTarget: plans.reduce((sum, p) => sum + p.todayTarget, 0),
    openPlanTitles: openPlans.map((p) => p.title),
    plans,
  };
}

/**
 * Wochenfortschritt der laufenden Woche (Montag bis Sonntag).
 *
 * @param activityByMonth Activity-Docs je Monats-Key ("YYYY-MM" → Doc).
 *   Für Wochen über einen Monatswechsel reicht der Aufrufer zwei Docs
 *   (aktueller + vorheriger Monat) — die Zuordnung läuft hier über den
 *   Monats-Key jedes Wochentags.
 * @param studyDays Union der geplanten Lerntage (1=Mo … 7=So). `null`/
 *   `undefined` → jeder Tag ist ein Lerntag (Konvention wie in scheduling).
 */
export function computeWeekProgress(
  today: string,
  activityByMonth: Record<string, ActivityDocLike | null | undefined>,
  studyDays?: number[] | null
): WeekProgress {
  const monday = addDays(today, -(dayOfWeek(today) - 1));
  const plannedSet = studyDays ? new Set(studyDays) : null;

  let studied = 0;
  let planned = 0;

  for (let i = 0; i < 7; i++) {
    const date = addDays(monday, i);
    if (plannedSet === null || plannedSet.has(dayOfWeek(date))) planned += 1;

    const doc = activityByMonth[monthKey(date)];
    const entry = doc?.days?.[dayOfMonth(date)];
    if (entry && (entry.units ?? 0) > 0) studied += 1;
  }

  return { studied, planned };
}
