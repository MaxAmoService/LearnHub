"use client";

// PlanPreview — Live-Vorschau der Plan-Eckdaten über lib/scheduling.ts.
// Gemeinsam genutzt vom Wizard (/plans/new, Schritt 4) und vom
// Einstellungsbereich der Detailseite (/plans/[id]). Immer sichtbar,
// nie hinter einem Aufklappen — hier merkt man VOR dem Speichern,
// dass ein Plan nicht aufgeht.

import { AlertTriangle, CalendarDays, Gauge, Layers } from "lucide-react";
import { formatDateKey, todayKey } from "@/lib/dates";
import {
  computeDailyTarget,
  computeEndspurtStart,
  countStudyDays,
  type PlanItemLike,
  type PlanLike,
} from "@/lib/scheduling";

/** Ab hier wird ein Tagesziel unrealistisch hoch. */
export const TOO_MANY_UNITS_PER_DAY = 15;

interface PlanPreviewProps {
  plan: PlanLike;
  items: PlanItemLike[];
  today?: string;
}

export function PlanPreview({ plan, items, today }: PlanPreviewProps) {
  const dayKey = today ?? todayKey();

  // Defensiv: alte/unvollständige Dokumente ohne Deadline dürfen nicht knallen.
  if (!plan.deadline) {
    return (
      <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-4 text-sm text-slate-400">
        Keine Deadline gesetzt — die Vorschau kann erst nach Wahl einer
        Deadline berechnet werden.
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-4 text-sm text-slate-400">
        Noch keine Themen — der Plan hat bisher keinen Lernstoff. Themen
        kannst du nach dem Erstellen auf der Planseite hinzufügen.
      </div>
    );
  }

  const unitsPerDay = computeDailyTarget(plan, items, dayKey);
  const studyDaysLeft = Math.max(
    countStudyDays(dayKey, plan.deadline, plan.studyDays ?? undefined) -
      (plan.bufferDays ?? 0),
    0
  );
  const endspurtStart = computeEndspurtStart(plan, dayKey);
  const tooMany = unitsPerDay > TOO_MANY_UNITS_PER_DAY;
  const allConsolidated = unitsPerDay === 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Gauge className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Einheiten pro Lerntag</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-white">
            {allConsolidated ? "0" : unitsPerDay}
          </p>
          <p className="text-xs text-slate-400">
            {allConsolidated
              ? "Alle Themen sind gefestigt — nichts mehr offen."
              : "gewichtet über die offenen Themen"}
          </p>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
          <div className="flex items-center gap-2 text-violet-400">
            <CalendarDays className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Lerntage übrig</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-white">{studyDaysLeft}</p>
          <p className="text-xs text-slate-400">
            bis {formatDateKey(plan.deadline)}
            {(plan.bufferDays ?? 0) > 0 ? ` (inkl. ${plan.bufferDays} Puffertag${plan.bufferDays === 1 ? "" : "e"})` : ""}
          </p>
        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
          <div className="flex items-center gap-2 text-orange-400">
            <Layers className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Endspurt</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-white">
            {formatDateKey(endspurtStart)}
          </p>
          <p className="text-xs text-slate-400">ab dann nur noch Wiederholung</p>
        </div>
      </div>

      {tooMany && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">
              {unitsPerDay} Einheiten pro Lerntag sind kaum realistisch.
            </p>
            <p className="mt-1 text-sm text-amber-200/80">
              Mit diesem Tempo wird der Plan in der Zeit sehr wahrscheinlich
              nicht aufgehen. Verschiebe die Deadline nach hinten oder nimm
              Themen aus dem Plan, bis das Tagesziel unter ~
              {TOO_MANY_UNITS_PER_DAY} Einheiten liegt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
