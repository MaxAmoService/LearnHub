"use client";

// /tagesquiz — Quiz über den gesamten bisherigen Lernstand.
//
// Zusammenstellung (lib/quiz.ts): bis zu 10 Aufgaben aus ALLEN begonnenen
// Themen, gewichtet überfällig > heute fällig > übrig, max. 2 pro Thema,
// gemischt über Themen und Aufgabentypen. Die vier Aufgabentyp-Views kommen
// unverändert aus components/exercises/ (ExerciseRunner) — keine zweite
// Implementierung der Übungsseite.
//
// Ablauf: Der Fragenbogen des Tages wird beim ersten Start festgehalten
// (quizDays/{date}, lib/quizClient.ts). Ein erneuter Aufruf am selben Tag
// bekommt EXAKT dieselben Fragen — der freie Tag ist nur beim ersten
// Durchgang des Tages holbar, ein Fehlversuch verbrennt nichts.
//
// Bestanden (100 %, erster Durchgang): lastStudyDate + Streak wie bei einer
// Übungssitzung — der Tag gilt als geschafft. Nicht bestanden: keine negativen
// Folgen, falsche Themen rücken per SM-2-Quality-1 nach vorn, der Tag bleibt
// über die Übungen offen.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LoginModal } from "@/components/LoginModal";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";
import { SaveErrorBox } from "@/components/exercises/ExerciseSummary";
import {
  QuizSummary,
  type QuizWrongAnswer,
} from "@/components/exercises/QuizSummary";
import type { ExerciseResult } from "@/components/exercises/types";
import { todayKey } from "@/lib/dates";
import {
  buildDailyQuiz,
  evaluateDailyQuiz,
  rebuildDailyQuizFromDay,
  serializeQuizTasks,
  type DailyQuiz,
  type QuizDayDocLike,
  type QuizTopicLike,
} from "@/lib/quiz";
import { finishDailyQuiz, loadQuizDayDoc, startDailyQuiz } from "@/lib/quizClient";
import { loadAllPlanItems, type PlanItemWithId } from "@/lib/plans";

function toTopics(itemsByPlan: Record<string, PlanItemWithId[]>): QuizTopicLike[] {
  const topics: QuizTopicLike[] = [];
  for (const [planId, items] of Object.entries(itemsByPlan)) {
    for (const item of items) {
      topics.push({
        planId,
        itemId: item.id,
        title: item.title,
        topicSlug: item.topicSlug,
        nextDueAt: item.nextDueAt,
        attemptCount: item.attemptCount,
        completedUnits: item.completedUnits,
      });
    }
  }
  return topics;
}

interface FinishedState {
  correct: number;
  total: number;
  passed: boolean;
  claimed: boolean;
  firstAttempt: boolean;
}

export default function DailyQuizPage() {
  const { user, isLoading, refreshUser } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dayDoc, setDayDoc] = useState<QuizDayDocLike | null>(null);
  const [quiz, setQuiz] = useState<DailyQuiz | null>(null);

  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<QuizWrongAnswer[]>([]);
  const [finished, setFinished] = useState<FinishedState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const today = todayKey();
      const dayRes = await loadQuizDayDoc(user.uid, today);

      if (dayRes && Array.isArray(dayRes.tasks) && dayRes.tasks.length > 0) {
        // Zweiter Aufruf am selben Tag: EXAKT dieselben Fragen.
        setDayDoc(dayRes);
        setQuiz(rebuildDailyQuizFromDay(dayRes));
      } else {
        const itemsRes = await loadAllPlanItems(user.uid);
        const fresh = buildDailyQuiz(toTopics(itemsRes), { today });
        setQuiz(fresh);
        if (fresh.tasks.length > 0) {
          const started = await startDailyQuiz(user.uid, fresh);
          if (started) {
            setDayDoc({
              seed: fresh.seed,
              attemptedAt: new Date().toISOString(),
              passed: null,
              tasks: serializeQuizTasks(fresh),
            });
          } else {
            // Anderer Tab war schneller — dessen Bogen übernehmen.
            const other = await loadQuizDayDoc(user.uid, today);
            setDayDoc(other);
            if (other && Array.isArray(other.tasks) && other.tasks.length > 0) {
              setQuiz(rebuildDailyQuizFromDay(other));
            }
          }
        }
      }
    } catch (err) {
      console.error("DailyQuizPage load error:", err);
      setError("Das Tagesquiz konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) load();
    else setLoading(false);
  }, [user, load]);

  const finish = useCallback(
    async (finalScores: number[]) => {
      if (!user || !quiz) return;
      const outcome = evaluateDailyQuiz(quiz.tasks, finalScores);
      setWrongAnswers(
        quiz.tasks
          .map((task, i) => ({ task, score: finalScores[i] ?? 0 }))
          .filter((entry) => entry.score < 1)
      );
      setSaving(true);
      setSaveError(false);
      try {
        const res = await finishDailyQuiz(
          user.uid,
          quiz,
          outcome.passed,
          outcome.wrongItemKeys
        );
        setDayDoc((prev) => (prev ? { ...prev, passed: outcome.passed } : prev));
        setFinished({
          correct: outcome.correct,
          total: quiz.tasks.length,
          passed: outcome.passed,
          claimed: res.claimed,
          firstAttempt: res.firstAttempt,
        });
        if (res.claimed) await refreshUser();
      } catch (err) {
        console.error("finishDailyQuiz error:", err);
        setSaveError(true);
      } finally {
        setSaving(false);
      }
    },
    [user, quiz]
  );

  function handleComplete(result: ExerciseResult) {
    if (!quiz) return;
    const finalScores = [...scores, result.score];
    setScores(finalScores);
    if (index + 1 < quiz.tasks.length) {
      setIndex(index + 1);
    } else {
      finish(finalScores);
    }
  }

  function handleRestart() {
    if (!dayDoc) return;
    setQuiz(rebuildDailyQuizFromDay(dayDoc));
    setIndex(0);
    setScores([]);
    setWrongAnswers([]);
    setFinished(null);
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
          <Zap className="w-10 h-10 text-violet-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            Melde dich an, um das Tagesquiz zu machen
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

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 flex-1">
            {error ?? "Das Tagesquiz konnte nicht geladen werden."}
          </p>
          <button
            onClick={load}
            className="text-sm font-semibold text-red-300 hover:text-red-200"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (quiz.tasks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center py-16 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            Noch nichts zu quizzen
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Das Tagesquiz fragt Themen ab, die du bereits begonnen hast. Sobald
            du in einem Lernplan die ersten Themen bearbeitet hast, füllt sich
            dein Quiz von allein — und wächst mit deinem Stoff mit.
          </p>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-medium text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Zu den Lernplänen
          </Link>
        </div>
      </div>
    );
  }

  const topicCount = new Set(quiz.tasks.map((t) => t.topicSlug)).size;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          title="Quiz abbrechen (der Fragenbogen des Tages bleibt gespeichert)"
        >
          <ArrowLeft className="w-4 h-4" /> Abbrechen
        </Link>
        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-violet-400" /> Tagesquiz
        </h1>
      </div>

      {finished === null && (
        <div className="glass rounded-xl p-4 mb-4 space-y-2">
          {dayDoc?.passed === true ? (
            <p className="text-sm text-emerald-300">
              Heute schon geschafft — dieser Durchlauf zählt als reine Übung.
              Du bekommst dieselben Fragen wie zuvor.
            </p>
          ) : dayDoc?.passed === false ? (
            <p className="text-sm text-amber-300">
              Du hast heute schon ein Tagesquiz abgeschlossen — hier sind
              dieselben Fragen. Dieser Durchlauf zählt als Übung: Den freien
              Tag gibt es nur beim ersten Durchgang.
            </p>
          ) : dayDoc != null ? (
            <p className="text-sm text-slate-300">
              Du hast heute schon ein Tagesquiz gestartet — hier sind dieselben
              Fragen. Bestehst du jetzt, zählt das als dein erster Durchgang
              und der Tag gilt.
            </p>
          ) : (
            <>
              <p className="text-sm text-slate-300">
                <span className="text-slate-100 font-medium">
                  {quiz.tasks.length} {quiz.tasks.length === 1 ? "Frage" : "Fragen"}
                </span>{" "}
                aus {topicCount} {topicCount === 1 ? "Thema" : "Themen"}, die du
                bereits begonnen hast — quer über deinen ganzen Stoff.
              </p>
              <p className="text-xs text-slate-400">
                Alles richtig beim ersten Durchgang → der Tag gilt als
                geschafft. Falls nicht: kein Problem, die Übungen warten wie
                gewohnt. Nicht begonnene Themen kommen nicht dran.
              </p>
            </>
          )}
        </div>
      )}

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
                onRetry={() => finish(scores)}
              />
            </div>
          )}
          <QuizSummary
            correct={finished.correct}
            total={finished.total}
            passed={finished.passed}
            claimed={finished.claimed}
            firstAttempt={finished.firstAttempt}
            wrongAnswers={wrongAnswers}
            onRestart={handleRestart}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Thema:{" "}
            <span className="text-slate-300 font-medium">
              {quiz.tasks[index].topicTitle || "Unbenanntes Thema"}
            </span>
          </p>
          <ExerciseRunner
            key={`${index}-${quiz.tasks[index].exercise.id}-${quiz.seed}`}
            exercise={quiz.tasks[index].exercise}
            index={index}
            total={quiz.tasks.length}
            onComplete={handleComplete}
          />
        </div>
      )}
    </div>
  );
}
