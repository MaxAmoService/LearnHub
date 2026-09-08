"use client";

// TodayCard — Dashboard-Karte "Heute".
// Lädt selbst: Pläne (1 Read), alle Items (1 Collection-Group-Read),
// fällige Items (1 Collection-Group-Read über loadDuePlanItems) und die
// Activity-Monats-Docs. Struktur über buildToday (lib/today.ts),
// Abhaken über checkOffPlanItem (lib/plans.ts).

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  BookOpen,
  Brain,
  CheckCircle2,
  Dumbbell,
  Flame,
  Loader2,
  Plus,
  XCircle,
  Zap,
} from "lucide-react";
import {
  addDays,
  dayOfWeek,
  formatDateKey,
  monthKey,
  todayKey,
} from "@/lib/dates";
import {
  checkOffPlanItem,
  loadActivityMonth,
  loadAllPlanItems,
  loadDuePlanItems,
  loadPlans,
  type PlanItemWithId,
  type PlanWithId,
} from "@/lib/plans";
import { hasExercisesForTopic } from "@/lib/exercises/session";
import { computePhase, computeEndspurtStart, type Phase } from "@/lib/scheduling";
import { effectiveDailyLessons } from "@/lib/streak";
import { buildToday, computeWeekProgress, type ActivityDocLike } from "@/lib/today";
import { PHASE_COLORS, PHASE_LABELS } from "./PlanCard";

const QUALITY_BUTTONS = [
  { quality: 1, label: "Schwer", icon: XCircle, className: "bg-red-500/20 text-red-400 hover:bg-red-500/30" },
  { quality: 3, label: "Okay", icon: Brain, className: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" },
  { quality: 5, label: "Leicht", icon: CheckCircle2, className: "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" },
] as const;

const PHASE_HINTS: Record<Exclude<Phase, "aufbau">, string> = {
  festigung: "Festigungsphase: Es kommt kein neuer Stoff mehr — bis zur Deadline wird nur wiederholt.",
  endspurt: "Endspurt: Die letzten Tage sind für Wiederholungen reserviert, kein neuer Stoff.",
};

interface TodayCardProps {
  uid: string;
  profile: {
    streak: number;
    dailyLessonsToday?: number;
    dailyLessonsDate?: string;
  };
  /** Nach einem Abhaken — der Streak im Auth-State kann sich geändert haben. */
  onProgress?: () => void;
}

export function TodayCard({ uid, profile, onProgress }: TodayCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanWithId[]>([]);
  const [itemsByPlan, setItemsByPlan] = useState<
    Record<string, PlanItemWithId[]>
  >({});
  const [dueItems, setDueItems] = useState<PlanItemWithId[]>([]);
  const [activityByMonth, setActivityByMonth] = useState<
    Record<string, ActivityDocLike | undefined>
  >({});
  const [working, setWorking] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const today = todayKey();
      const monday = addDays(today, -(dayOfWeek(today) - 1));
      const months = [...new Set([monthKey(today), monthKey(monday)])];

      const [plansRes, itemsRes, dueRes, ...activityRes] = await Promise.all([
        loadPlans(uid),
        loadAllPlanItems(uid),
        loadDuePlanItems(uid),
        ...months.map((m) => loadActivityMonth(uid, m)),
      ]);

      setPlans(plansRes);
      setItemsByPlan(itemsRes);
      setDueItems(dueRes);

      const activity: Record<string, ActivityDocLike | undefined> = {};
      months.forEach((m, i) => {
        activity[m] = activityRes[i] ?? undefined;
      });
      setActivityByMonth(activity);
    } catch (err) {
      console.error("TodayCard load error:", err);
      setError("Der Tagesplan konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    load();
  }, [load]);

  const now = new Date();
  const today = todayKey(now);
  const activePlans = plans.filter((p) => p.archivedAt == null);
  const planById = new Map(plans.map((p) => [p.id, p]));

  const mergedDays: Record<string, NonNullable<ActivityDocLike["days"]>[string]> = {};
  for (const doc of Object.values(activityByMonth)) {
    Object.assign(mergedDays, doc?.days ?? {});
  }
  const mergedActivity: ActivityDocLike = { days: mergedDays };

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

  const week =
    activePlans.length > 0
      ? computeWeekProgress(today, activityByMonth, studyDaysUnion)
      : null;

  const lessonsToday = effectiveDailyLessons(profile);

  async function handleCheckOff(planId: string, itemId: string, quality: number) {
    setWorking(`${planId}/${itemId}`);
    try {
      await checkOffPlanItem(uid, planId, itemId, quality);
      onProgress?.();
      await load();
    } catch (err) {
      console.error("checkOffPlanItem error:", err);
    } finally {
      setWorking(null);
    }
  }

  function renderCheckOffButtons(planId: string, itemId: string) {
    const busy = working === `${planId}/${itemId}`;
    return (
      <div className="flex items-center gap-1">
        {QUALITY_BUTTONS.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.quality}
              onClick={() => handleCheckOff(planId, itemId, btn.quality)}
              disabled={working !== null}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${btn.className}`}
              title={`Qualität ${btn.quality}`}
            >
              {busy ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Icon className="w-3 h-3" />
              )}
              {btn.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Grundprinzip: erst TUN, dann bewerten. Themen mit Übungsaufgaben führen
  // direkt in die Übung (Trefferquote bestimmt die SM-2-Qualität), die
  // Selbsteinschätzung bleibt nur als Rückfallebene für Themen ohne Aufgaben.
  function renderItemActions(planId: string, item: PlanItemWithId) {
    if (hasExercisesForTopic(item.topicSlug)) {
      return (
        <div className="flex items-center gap-3">
          {item.moduleSlug && (
            <Link
              href={`/modules/${item.moduleSlug}`}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors"
              title="Erst lesen, dann üben"
            >
              <BookOpen className="w-3 h-3" /> Modul öffnen
            </Link>
          )}
          <Link
            href={`/plans/${planId}/uebung/${item.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all"
          >
            <Dumbbell className="w-3.5 h-3.5" /> Üben
          </Link>
        </div>
      );
    }
    return renderCheckOffButtons(planId, item.id);
  }

  return (
    <section className="glass rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="font-semibold text-slate-200">Heute</h2>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <Link
            href="/tagesquiz"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all"
            title="Quiz über deinen gesamten bisherigen Stoff — bestehst du beim ersten Versuch, gilt der Tag als geschafft"
          >
            <Zap className="w-3.5 h-3.5" /> Tagesquiz
          </Link>
          {profile.streak > 0 && (
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              {profile.streak} {profile.streak === 1 ? "Tag" : "Tage"} Streak
            </span>
          )}
          {week && (
            <span>
              Woche: {week.studied} von {week.planned}{" "}
              {week.planned === 1 ? "Lerntag" : "Lerntagen"}
            </span>
          )}
          <span>{lessonsToday} {lessonsToday === 1 ? "Lektion" : "Lektionen"} heute</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 flex-1">{error}</p>
          <button
            onClick={load}
            className="text-sm font-semibold text-red-300 hover:text-red-200"
          >
            Erneut versuchen
          </button>
        </div>
      ) : activePlans.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-slate-400 text-sm">
            Noch kein Lernplan. Mit einem Plan weißt du jeden Tag, was als
            Nächstes dran ist.
          </p>
          <Link
            href="/plans/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all"
          >
            <Plus className="w-4 h-4" /> Lernplan erstellen
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Neu */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Neu</h3>
            <div className="space-y-2">
              {schedule.blocks.flatMap((block) => {
                const plan = planById.get(block.planId);
                if (!plan) return [];

                if (block.neu != null) {
                  const item = block.neu as PlanItemWithId;
                  return [
                    <div
                      key={block.planId}
                      className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">{item.title ?? "Unbenanntes Thema"}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{plan.title ?? "Unbenannter Plan"}</p>
                      </div>
                      {renderItemActions(block.planId, item)}
                    </div>,
                  ];
                }

                const phase = computePhase(plan, today);
                if (phase === "aufbau") return [];
                return [
                  <div
                    key={block.planId}
                    className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${PHASE_COLORS[phase]}`}>
                        {PHASE_LABELS[phase]}
                      </span>
                      <span className="text-sm font-medium text-slate-300">
                        {plan.title ?? "Unbenannter Plan"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {phase === "festigung"
                        ? PHASE_HINTS.festigung
                        : `${PHASE_HINTS.endspurt} (seit ${formatDateKey(computeEndspurtStart(plan, today))})`}
                    </p>
                  </div>,
                ];
              })}
              {schedule.blocks.every((block) => {
                const plan = planById.get(block.planId);
                if (!plan) return true;
                return block.neu == null && computePhase(plan, today) === "aufbau";
              }) && (
                <p className="text-xs text-slate-500">Heute steht nichts Neues an.</p>
              )}
            </div>
          </div>

          {/* Wiederholung */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Wiederholung</h3>
            {dueItems.length === 0 ? (
              <p className="text-xs text-slate-500">Keine fälligen Wiederholungen.</p>
            ) : (
              <div className="space-y-2">
                {dueItems.map((item) => {
                  const plan = planById.get(item.planId);
                  const overdue = item.nextDueAt != null && item.nextDueAt < today;
                  return (
                    <div
                      key={`${item.planId}/${item.id}`}
                      className={`rounded-lg border p-3 flex flex-wrap items-center justify-between gap-2 ${
                        overdue
                          ? "border-red-500/30 bg-red-500/5"
                          : "border-slate-700/40 bg-slate-800/40"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                          {item.title ?? "Unbenanntes Thema"}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {plan?.title ?? "Unbenannter Plan"}
                          {item.nextDueAt != null && (
                            <>
                              {" · "}
                              <span className={overdue ? "text-red-400 font-medium" : ""}>
                                {overdue
                                  ? `überfällig seit ${formatDateKey(item.nextDueAt)}`
                                  : `fällig seit ${formatDateKey(item.nextDueAt)}`}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      {renderItemActions(item.planId, item)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
