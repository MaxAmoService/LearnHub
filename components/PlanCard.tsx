"use client";

// PlanCard — Übersichtskarte eines Plans auf /plans.
// Der Fortschrittsbalken zählt GEFESTIGTE Items über isConsolidated,
// nicht completedUnits: er zeigt, was sitzt, nicht was angefasst wurde.

import Link from "next/link";
import { Archive, CalendarDays, ChevronRight } from "lucide-react";
import { formatDateKey, todayKey } from "@/lib/dates";
import { ProgressBar } from "./ProgressBar";
import {
  computePace,
  computePhase,
  countStudyDays,
  isConsolidated,
  type Pace,
  type Phase,
  type PlanItemLike,
} from "@/lib/scheduling";
import type { PlanWithId } from "@/lib/plans";

export const PHASE_LABELS: Record<Phase, string> = {
  aufbau: "Aufbau",
  festigung: "Festigung",
  endspurt: "Endspurt",
};

export const PHASE_COLORS: Record<Phase, string> = {
  aufbau: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  festigung: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  endspurt: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

export const PACE_LABELS: Record<Pace, string> = {
  ahead: "Voraus",
  on_track: "Im Plan",
  behind: "Hinterm Plan",
  critical: "Kritisch",
};

export const PACE_COLORS: Record<Pace, string> = {
  ahead: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  on_track: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  behind: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
};

interface PlanCardProps {
  plan: PlanWithId;
  items: PlanItemLike[];
  today?: string;
}

export function PlanCard({ plan, items, today }: PlanCardProps) {
  const dayKey = today ?? todayKey();

  // Defensiv: Dokumente ohne Deadline (alte/unvollständige) nicht rechnen.
  if (!plan.deadline) {
    return (
      <div className="glass rounded-xl p-5 border border-slate-700/40">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-slate-200">{plan.title ?? "Unbenannter Plan"}</h3>
        </div>
        <p className="text-sm text-slate-500">Keine Deadline gesetzt.</p>
      </div>
    );
  }

  const total = items.length;
  const consolidated = items.filter(isConsolidated).length;
  const percent = total > 0 ? Math.round((consolidated / total) * 100) : 0;
  const phase = computePhase(plan, dayKey);
  const pace = computePace(plan, items, dayKey);
  const daysLeft = countStudyDays(
    dayKey,
    plan.deadline,
    plan.studyDays ?? undefined
  );

  return (
    <Link
      href={`/plans/${plan.id}`}
      className="glass rounded-xl p-5 border border-slate-700/40 hover:border-slate-600/60 transition-colors block group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
            {plan.title ?? "Unbenannter Plan"}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <CalendarDays className="w-3.5 h-3.5" />
            Deadline {formatDateKey(plan.deadline)}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 flex-shrink-0 transition-colors" />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${PHASE_COLORS[phase]}`}>
          {PHASE_LABELS[phase]}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${PACE_COLORS[pace]}`}>
          {PACE_LABELS[pace]}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full border bg-slate-700/40 text-slate-400 border-slate-600/40">
          {daysLeft} {daysLeft === 1 ? "Lerntag" : "Lerntage"} übrig
        </span>
        {plan.archivedAt != null && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border bg-slate-700/40 text-slate-400 border-slate-600/40">
            <Archive className="w-3 h-3" /> Archiviert
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span>
            {consolidated} von {total}{" "}
            {total === 1 ? "Thema" : "Themen"} gefestigt
          </span>
          <span className="font-bold text-emerald-400">{percent}%</span>
        </div>
        <ProgressBar value={percent} color="#10b981" size="sm" />
      </div>
    </Link>
  );
}
