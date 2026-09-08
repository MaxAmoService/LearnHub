"use client";

// /plans/[planId]/uebung/[itemId] — Übungsseite für ein Plan-Thema.
//
// Ablauf: Aufgaben laden (prozedural mit frischem Seed ODER statisch aus der
// Registry, lib/exercises/session.ts) → EINE Aufgabe pro Bildschirm → keine
// Rücksprünge (sonst korrigiert man sich selbst und die Trefferquote wird
// unehrlich) → Abschluss mit Auswertung.
//
// Die SM-2-Qualität kommt aus der Trefferquote (lib/exercises/scoring.ts)
// und wird über completePlanItemExercise zusammen mit lastAttempt/attemptCount
// in EINER Transaktion geschrieben (lib/plans.ts). Üben vergibt kein XP.

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LoginModal } from "@/components/LoginModal";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";
import {
  ExerciseSummary,
  SaveErrorBox,
  type ExerciseDayStatus,
} from "@/components/exercises/ExerciseSummary";
import type { ExerciseResult } from "@/components/exercises/types";
import {
  buildExerciseSession,
  newExerciseSeed,
} from "@/lib/exercises/session";
import {
  completePlanItemExercise,
  loadAllPlanItems,
  loadPlanItem,
  loadPlans,
  type PlanItemWithId,
} from "@/lib/plans";
import { loadQuizDayDoc } from "@/lib/quizClient";
import { computeDayStatus } from "@/lib/today";
import { todayKey } from "@/lib/dates";

export default function ExercisePage() {
  const params = useParams<{ planId: string; itemId: string }>();
  const { planId, itemId } = params;
  const { user, isLoading, refreshUser } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [item, setItem] = useState<PlanItemWithId | null>(null);

  const [seed, setSeed] = useState<number>(() => newExerciseSeed());
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [finished, setFinished] = useState<{ correct: number; total: number } | null>(null);
  const [nextDueAt, setNextDueAt] = useState<string | null>(null);
  const [dayStatus, setDayStatus] = useState<Omit<ExerciseDayStatus, "streak"> | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const session = useMemo(
    () => (item?.topicSlug ? buildExerciseSession(item.topicSlug, seed) : null),
    [item, seed]
  );
  const exercises = session?.exercises ?? [];
  const procedural = session?.source === "procedural";

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const itemRes = await loadPlanItem(user.uid, planId, itemId);
      if (!itemRes) {
        setNotFound(true);
        return;
      }
      setItem(itemRes);
    } catch (err) {
      console.error("ExercisePage load error:", err);
      setError("Das Thema konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [user, planId, itemId]);

  useEffect(() => {
    if (user) load();
    else setLoading(false);
  }, [user, load]);

  const finish = useCallback(
    async (finalResults: ExerciseResult[], total: number) => {
      if (!user || !item) return;
      const correct = finalResults.reduce((sum, r) => sum + r.score, 0);
      setFinished({ correct, total });
      setSaving(true);
      setSaveError(false);
      try {
        const res = await completePlanItemExercise(
          user.uid,
          planId,
          itemId,
          correct,
          total,
          exercises.map((e) => e.id)
        );
        setNextDueAt(res?.item.nextDueAt ?? null);

        // Tagesstatus NACH der Sitzung (der Review ist schon geschrieben):
        // dieselbe reine Funktion wie Heute-Karte und Widget-API.
        const [plansRes, itemsRes, quizDayRes] = await Promise.all([
          loadPlans(user.uid),
          loadAllPlanItems(user.uid),
          loadQuizDayDoc(user.uid, todayKey()),
        ]);
        const quizPassedToday = quizDayRes?.passed === true;
        const status = computeDayStatus({
          plans: plansRes,
          itemsByPlan: itemsRes,
          quizPassedToday,
        });
        await refreshUser();
        setDayStatus({
          dayDone: status.dayDone,
          openCount: status.openCount,
          quizPassedToday,
          unitsToday: status.unitsToday,
          dailyTarget: status.dailyTarget,
        });
      } catch (err) {
        console.error("completePlanItemExercise error:", err);
        setSaveError(true);
      } finally {
        setSaving(false);
      }
    },
    [user, item, planId, itemId, exercises]
  );

  function handleComplete(result: ExerciseResult) {
    const finalResults = [...results, result];
    setResults(finalResults);
    if (index + 1 < exercises.length) {
      setIndex(index + 1);
    } else {
      finish(finalResults, exercises.length);
    }
  }

  function handleRestart() {
    setSeed(newExerciseSeed());
    setIndex(0);
    setResults([]);
    setFinished(null);
    setNextDueAt(null);
    setDayStatus(null);
    setSaveError(false);
  }

  if (isLoading || (user && loading)) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="mt-8 text-center py-12 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            Melde dich an, um zu üben
          </h3>
          <button
            onClick={() => setShowLogin(true)}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all"
          >
            Anmelden
          </button>
        </div>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center py-16 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <h3 className="text-xl font-semibold text-slate-400 mb-2">Thema nicht gefunden</h3>
          <p className="text-slate-500 text-sm mb-6">
            Dieses Thema existiert nicht oder gehört einem anderen Konto.
          </p>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zu den Plänen
          </Link>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 flex-1">{error ?? "Das Thema konnte nicht geladen werden."}</p>
          <button onClick={load} className="text-sm font-semibold text-red-300 hover:text-red-200">
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  // Fallback-Fall: Themen ohne Aufgaben bleiben über die Selbsteinschätzung
  // auf dem Dashboard/der Planseite benutzbar — hier gibt es nichts zu üben.
  if (exercises.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center py-16 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            Keine Übungsaufgaben vorhanden
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Für „{item.title ?? "dieses Thema"}" gibt es noch keine Aufgaben.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zum Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          href={`/plans/${planId}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          title="Übung abbrechen (ohne zu speichern)"
        >
          <ArrowLeft className="w-4 h-4" /> Abbrechen
        </Link>
        <p className="text-sm text-slate-400 truncate">
          {item.title ?? "Unbenanntes Thema"}
        </p>
      </div>

      {saving ? (
        <div className="flex items-center justify-center gap-3 py-20">
          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
          <p className="text-sm text-slate-400">Ergebnis wird gespeichert …</p>
        </div>
      ) : finished ? (
        <div className="glass rounded-xl p-5">
          {saveError && (
            <div className="mb-4">
              <SaveErrorBox
                message="Das Ergebnis konnte nicht gespeichert werden."
                onRetry={() => finish(results, finished.total)}
              />
            </div>
          )}
          <ExerciseSummary
            results={results}
            correct={finished.correct}
            total={finished.total}
            nextDueAt={nextDueAt}
            procedural={procedural}
            dayStatus={
              dayStatus && user
                ? { ...dayStatus, streak: user.streak }
                : null
            }
            onRestart={handleRestart}
          />
        </div>
      ) : (
        <ExerciseRunner
          key={`${index}-${exercises[index].id}-${seed}`}
          exercise={exercises[index]}
          index={index}
          total={exercises.length}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
