// ============================================================================
// Tagesquiz — Firestore-Persistenz (Client SDK)
// ============================================================================
//
// quizDays/{date} (users/{uid}/quizDays/{YYYY-MM-DD}) hält pro Tag den
// gezogenen Fragenbogen (Seed + Aufgabenliste) und das Ergebnis des ERSTEN
// Durchgangs. Ein zweiter Aufruf am selben Tag bekommt exakt dieselben Fragen
// (rebuildDailyQuizFromDay) — der freie Tag ist nur beim ersten Durchgang
// holbar, nicht über erneutes Würfeln. Ein Fehlversuch verbrennt nichts:
// Das Doc wird bereits beim Start angelegt (passed: null), gezählt wird erst
// das Ergebnis des ersten Durchgangs.
//
// Nicht bestanden hat keine negativen Folgen: Falsche Themen bekommen eine
// niedrige SM-2-Qualität (nur verschlechtern, nie verbessern), Streak und
// Activity bleiben unberührt — der Tag gilt weiter als offen. Bestehen
// stempelt lastStudyDate und schreibt den Streak fort (derselbe Weg wie beim
// Abschluss einer Übungssitzung, lib/plans.ts).

import { doc, getDoc, runTransaction } from "firebase/firestore";
import { dayOfMonth, monthKey, todayKey } from "./dates";
import { getDb } from "./firebase";
import { mergeRecentExerciseIds } from "./exercises/session";
import {
  loadActiveStudyDays,
  type ActivityDoc,
  type PlanItemDoc,
} from "./plans";
import {
  canClaimFreeDay,
  computeQuizTopicReviewPatch,
  serializeQuizTasks,
  type DailyQuiz,
  type QuizDayDocLike,
} from "./quiz";
import { updateStreak } from "./streak";

export interface DailyQuizFinishResult {
  /** Der freie Tag wurde für heute geholt (Streak/lastStudyDate geschrieben). */
  claimed: boolean;
  /** Dieser Durchgang war der erste des Tages (zählt für die Rückmeldung). */
  firstAttempt: boolean;
}

/** quizDays/{date}-Doc des Users — null, wenn heute noch kein Quiz läuft. */
export async function loadQuizDayDoc(
  uid: string,
  date: string
): Promise<QuizDayDocLike | null> {
  const db = getDb();
  const snap = await getDoc(doc(db, "users", uid, "quizDays", date));
  if (!snap.exists()) return null;
  return snap.data() as QuizDayDocLike;
}

/**
 * Legt den Fragenbogen des Tages an (passed: null) — ab jetzt bekommt jeder
 * Aufruf am selben Tag exakt diese Fragen. Rückgabe false: ein anderer Tab/
 * Reload war schneller, der Aufrufer muss dessen Bogen laden.
 */
export async function startDailyQuiz(
  uid: string,
  quiz: DailyQuiz,
  now: Date = new Date()
): Promise<boolean> {
  const db = getDb();
  const dayRef = doc(db, "users", uid, "quizDays", todayKey(now));
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(dayRef);
    if (snap.exists()) return false;
    tx.set(dayRef, {
      seed: quiz.seed,
      attemptedAt: now.toISOString(),
      passed: null,
      tasks: serializeQuizTasks(quiz),
      planIds: [...new Set(quiz.tasks.map((t) => t.planId))],
    });
    return true;
  });
}

/**
 * Schließt einen Durchgang ab — EINE Transaktion:
 *   1. Zuletzt verwendete Aufgaben jedes Themas fortschreiben
 *      (recentExerciseIds, gedeckelt auf 5) — Grundlage der
 *      Auswahl-Abstinenz des nächsten Bogens.
 *   2. Diagnose: NUR falsche Themen bekommen SM-2 Quality 1 (das Quiz darf
 *      nur verschlechtern, nie verbessern) — OHNE Streak/Activity/attempt.
 *      Richtig beantwortete Themen bleiben SM-2-seitig unangetastet.
 *   3. Ergebnis des ERSTEN Durchgangs schreiben; bei bestandenem ersten
 *      Durchgang lastStudyDate/Streak fortschreiben und den Tag als
 *      Lerneinheit in der Activity vermerken.
 */
export async function finishDailyQuiz(
  uid: string,
  quiz: DailyQuiz,
  passed: boolean,
  wrongItemKeys: { planId: string; itemId: string }[],
  now: Date = new Date()
): Promise<DailyQuizFinishResult> {
  const db = getDb();
  const today = todayKey(now);
  const nowMs = now.getTime();
  const dayRef = doc(db, "users", uid, "quizDays", today);
  const userRef = doc(db, "users", uid);
  const activityRef = doc(db, "users", uid, "activity", monthKey(today));
  const day = dayOfMonth(today);
  const studyDays = await loadActiveStudyDays(uid);

  // Verwendete Aufgaben je Item (für recentExerciseIds) + falsche Themen.
  const wrongSet = new Set(wrongItemKeys.map((k) => `${k.planId}/${k.itemId}`));
  const byItem = new Map<
    string,
    { planId: string; itemId: string; exerciseIds: string[] }
  >();
  for (const task of quiz.tasks) {
    const key = `${task.planId}/${task.itemId}`;
    const entry = byItem.get(key) ?? {
      planId: task.planId,
      itemId: task.itemId,
      exerciseIds: [],
    };
    entry.exerciseIds.push(task.exercise.id);
    byItem.set(key, entry);
  }
  const itemEntries = [...byItem.values()];

  return runTransaction(db, async (tx) => {
    const [daySnap, userSnap, activitySnap, ...itemSnaps] = await Promise.all([
      tx.get(dayRef),
      tx.get(userRef),
      tx.get(activityRef),
      ...itemEntries.map((entry) =>
        tx.get(
          doc(db, "users", uid, "plans", entry.planId, "planItems", entry.itemId)
        )
      ),
    ]);

    itemEntries.forEach((entry, i) => {
      const snap = itemSnaps[i];
      if (!snap.exists()) return;
      const item = snap.data() as PlanItemDoc;
      const patch: Partial<PlanItemDoc> = {
        recentExerciseIds: mergeRecentExerciseIds(
          item.recentExerciseIds,
          entry.exerciseIds
        ),
      };
      if (wrongSet.has(`${entry.planId}/${entry.itemId}`)) {
        Object.assign(patch, computeQuizTopicReviewPatch(entry.itemId, item, nowMs));
      }
      tx.update(snap.ref, patch);
    });

    const dayData = daySnap.exists() ? (daySnap.data() as QuizDayDocLike) : null;
    const firstAttempt = dayData === null || dayData.passed == null;
    const claimed = canClaimFreeDay(dayData, passed);

    if (dayData === null) {
      // Defensiv: Start-Doc fehlt (z. B. gelöscht) — hier anlegen.
      tx.set(dayRef, {
        seed: quiz.seed,
        attemptedAt: now.toISOString(),
        passed,
        tasks: serializeQuizTasks(quiz),
        planIds: [...new Set(quiz.tasks.map((t) => t.planId))],
      });
    } else if (dayData.passed == null) {
      tx.update(dayRef, { passed });
    }

    if (claimed && userSnap.exists()) {
      const data = userSnap.data() as Record<string, unknown>;
      const streakUpdate = updateStreak(
        {
          streak: typeof data.streak === "number" ? data.streak : 0,
          streakFreeze: data.streakFreeze === true,
          lastStudyDate:
            typeof data.lastStudyDate === "string" ? data.lastStudyDate : undefined,
        },
        { now, studyDays }
      );
      tx.update(userRef, {
        lastStudyDate: today,
        streak: streakUpdate.streak,
        streakFreeze: streakUpdate.streakFreeze,
      });

      // Activity: +1 Einheit, damit Woche/Tag den Quiz-Tag als Lerntag zählen.
      const activity = activitySnap.exists()
        ? (activitySnap.data() as ActivityDoc)
        : { days: {} };
      const entry = activity.days?.[day];
      tx.set(
        activityRef,
        {
          days: {
            ...(activity.days ?? {}),
            [day]: {
              units: (entry?.units ?? 0) + 1,
              done: entry?.done ?? 0,
              planIds: entry?.planIds ?? [],
            },
          },
        },
        { merge: true }
      );
    }

    return { claimed, firstAttempt };
  });
}
