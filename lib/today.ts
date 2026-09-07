// ============================================================================
// Tagesplan-Builder — reine Funktion (kein Firestore)
// ============================================================================
//
// Baut aus Plänen, deren Items und dem Activity-Dokument des aktuellen Monats
// die Tagesansicht: pro Plan einen Neu-Block und einen Wiederholungs-Block,
// dazu eine über alle Themen gemischte Queue. Überfällige Wiederholungen haben
// Vorrang vor neuem Stoff — sonst wächst ein nie abgebauter Berg.

import { dayOfMonth, todayKey } from "./dates";
import { computePhase, isConsolidated, type PlanItemLike, type PlanLike } from "./scheduling";

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
