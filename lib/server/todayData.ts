// ============================================================================
// Today-Daten für die Widget-API (/api/v1/today) — Admin SDK
// ============================================================================
//
// Baut die Antwort aus denselben reinen Funktionen wie die Web-Ansicht
// (lib/today.ts, lib/scheduling.ts, lib/streak.ts) — nur die Firestore-Reads
// laufen hier über das Admin SDK. Reads: 1 User-Doc, 1 Pläne-Query,
// 1 Collection-Group-Query (planItems, Ein-Feld-Filter uid — kein
// Composite-Index nötig), 1-2 Activity-Docs. Kein N-Dokumente-Muster.

import { getAdminDb } from "../firebaseAdmin";
import {
  addDays,
  dayOfMonth,
  dayOfWeek,
  daysBetween,
  monthKey,
  todayKey,
} from "../dates";
import {
  buildToday,
  computeDayStatus,
  computeWeekProgress,
  type ActivityDocLike,
} from "../today";
import { computePace, computePhase, type PlanItemLike } from "../scheduling";
import { hasExercisesForTopic } from "../exercises/session";
import type {
  TodayApiItem,
  TodayApiPlan,
  TodayApiResponse,
  TodayApiReview,
} from "../apiTypes";

const UNIT_LABEL = "UE";

interface RawPlan {
  id: string;
  title?: string;
  deadline: string;
  studyDays?: number[];
  archivedAt?: string | null;
}

/** Absoluter Link auf die Übungsseite — Widget öffnet direkt dort. */
function itemUrl(baseUrl: string, planId: string, itemId: string, topicSlug: unknown): string {
  const exercisePath =
    typeof topicSlug === "string" && hasExercisesForTopic(topicSlug)
      ? `/plans/${planId}/uebung/${itemId}`
      : `/plans/${planId}`;
  return `${baseUrl}${exercisePath}`;
}

function toItem(baseUrl: string, planId: string, item: PlanItemLike): TodayApiItem {
  const itemId = (item as { id?: string }).id ?? "";
  return {
    itemId,
    title: item.title ?? "Unbenanntes Thema",
    target: item.estimatedUnits ?? 0,
    done: item.completedUnits ?? 0,
    unit: UNIT_LABEL,
    url: itemUrl(baseUrl, planId, itemId, (item as { topicSlug?: unknown }).topicSlug),
  };
}

function toReview(baseUrl: string, planId: string, item: PlanItemLike): TodayApiReview {
  return {
    ...toItem(baseUrl, planId, item),
    overdueSince: item.nextDueAt ?? null,
  };
}

export async function buildTodayApiData(
  uid: string,
  opts: { now?: Date; baseUrl: string }
): Promise<TodayApiResponse> {
  const db = getAdminDb();
  const now = opts.now ?? new Date();
  const today = todayKey(now);
  const monday = addDays(today, -(dayOfWeek(today) - 1));
  const months = [...new Set([monthKey(today), monthKey(monday)])];

  const userSnap = db.collection("users").doc(uid).get();
  const plansSnap = db.collection("users").doc(uid).collection("plans").get();
  const itemsSnap = db
    .collectionGroup("planItems")
    .where("uid", "==", uid)
    .get();
  const activitySnaps = months.map((m) =>
    db.collection("users").doc(uid).collection("activity").doc(m).get()
  );
  const quizDaySnap = db
    .collection("users")
    .doc(uid)
    .collection("quizDays")
    .doc(today)
    .get();

  const [userDoc, plansDoc, itemsDoc, quizDayDoc, ...activityDocs] =
    await Promise.all([userSnap, plansSnap, itemsSnap, quizDaySnap, ...activitySnaps]);

  // ── Defensiv lesen: schemalos, alte Docs haben neue Felder nicht ─────────

  const activePlans: RawPlan[] = [];
  for (const d of plansDoc.docs) {
    const data = d.data() as Record<string, unknown>;
    if (data.archivedAt != null) continue;
    // Ohne gültige Deadline ist kein Scheduling möglich — Plan überspringen,
    // statt die Route platzen zu lassen.
    if (typeof data.deadline !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.deadline)) continue;
    activePlans.push({
      id: d.id,
      title: typeof data.title === "string" ? data.title : undefined,
      deadline: data.deadline,
      studyDays: Array.isArray(data.studyDays)
        ? data.studyDays.filter(
            (day): day is number => typeof day === "number" && day >= 1 && day <= 7
          )
        : undefined,
    });
  }

  const itemsByPlan: Record<string, PlanItemLike[]> = {};
  for (const d of itemsDoc.docs) {
    const planId = d.ref.parent.parent?.id;
    if (!planId) continue; // defensiv: Item ohne lesbaren Plan-Pfad
    // Doc-ID ist nicht Teil des Dokuments — für itemId/url mitnehmen.
    (itemsByPlan[planId] ??= []).push({
      ...(d.data() as PlanItemLike),
      id: d.id,
    } as PlanItemLike);
  }
  for (const key of Object.keys(itemsByPlan)) {
    itemsByPlan[key].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  const activityByMonth: Record<string, ActivityDocLike | null | undefined> = {};
  activityDocs.forEach((snap, i) => {
    activityByMonth[months[i]] = snap.exists ? (snap.data() as ActivityDocLike) : undefined;
  });

  const mergedDays: Record<string, NonNullable<ActivityDocLike["days"]>[string]> = {};
  for (const doc of Object.values(activityByMonth)) {
    Object.assign(mergedDays, doc?.days ?? {});
  }
  const mergedActivity: ActivityDocLike = { days: mergedDays };

  // ── Reine Funktionen: identisch zur TodayCard der Web-App ─────────────────

  const schedule = buildToday(activePlans, itemsByPlan, mergedActivity, now);

  const studyDaysUnion = (() => {
    if (activePlans.length === 0) return null;
    const union = new Set<number>();
    for (const plan of activePlans) {
      for (const day of Array.isArray(plan.studyDays) ? plan.studyDays : []) {
        if (typeof day === "number" && day >= 1 && day <= 7) union.add(day);
      }
    }
    return union.size > 0 ? [...union] : null;
  })();

  const week = computeWeekProgress(today, activityByMonth, studyDaysUnion);

  const userData = userDoc.exists ? (userDoc.data() ?? {}) : {};
  const doneToday = mergedActivity.days?.[dayOfMonth(today)]?.units ?? 0;

  const plans: TodayApiPlan[] = activePlans.map((plan) => {
    const block = schedule.blocks.find((b) => b.planId === plan.id);
    const planItems = itemsByPlan[plan.id] ?? [];
    const deadline = plan.deadline;

    return {
      id: plan.id,
      label: plan.title && plan.title.length > 0 ? plan.title : "Plan",
      deadline,
      daysLeft: daysBetween(today, deadline),
      phase: computePhase(plan, today),
      pace: computePace(plan, planItems, today),
      neu: block?.neu ? toItem(opts.baseUrl, plan.id, block.neu) : null,
      wiederholung: (block?.wiederholung ?? []).map((item) =>
        toReview(opts.baseUrl, plan.id, item)
      ),
    };
  });

  // ── Tagesquiz-Status ──────────────────────────────────────────────────────
  // quizDays/{today}.passed === true → freier Tag über das Quiz geholt
  // (das Quiz stempelt dabei lastStudyDate, siehe lib/quizClient.ts).
  const quizDayData = quizDayDoc.exists ? (quizDayDoc.data() ?? {}) : {};
  const quizPassedToday = quizDayData.passed === true;

  // dayDone + openCount (= totalDue) kommen aus derselben reinen Funktion
  // wie Heute-Karte und Übungs-Abschluss (computeDayStatus).
  const dayStatus = computeDayStatus({
    plans: activePlans,
    itemsByPlan,
    quizPassedToday,
    now,
  });

  return {
    date: today,
    streak: {
      current: typeof userData.streak === "number" ? userData.streak : 0,
      best: typeof userData.streak === "number" ? userData.streak : 0,
      doneToday,
      weekDone: week.studied,
      weekTarget: week.planned,
    },
    plans,
    quizUrl: `${opts.baseUrl}/tagesquiz`,
    dayDone: dayStatus.dayDone,
    totalDue: dayStatus.openCount,
  };
}
