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
import { applyQuizTopicReview, loadActiveStudyDays, type ActivityDoc } from "./plans";
import { canClaimFreeDay, serializeQuizTasks, type DailyQuiz, type QuizDayDocLike } from "./quiz";
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
    });
    return true;
  });
}

/**
 * Schließt einen Durchgang ab:
 *   1. Diagnose — falsche Themen: SM-2 Quality 1, OHNE Streak/Activity/attempt.
 *   2. Claim in einer Transaktion: Ergebnis des ERSTEN Durchgangs schreiben;
 *      bei bestandenem ersten Durchgang lastStudyDate/Streak fortschreiben
 *      und den Tag als Lerneinheit in der Activity vermerken.
 */
export async function finishDailyQuiz(
  uid: string,
  quiz: DailyQuiz,
  passed: boolean,
  wrongItemKeys: { planId: string; itemId: string }[],
  now: Date = new Date()
): Promise<DailyQuizFinishResult> {
  for (const key of wrongItemKeys) {
    try {
      await applyQuizTopicReview(uid, key.planId, key.itemId, now);
    } catch (err) {
      // Ein einzelner Review-Fehler darf den Abschluss nicht blockieren —
      // die Diagnose verliert dann nur diese eine Korrektur.
      console.error("applyQuizTopicReview error:", err);
    }
  }

  const db = getDb();
  const today = todayKey(now);
  const dayRef = doc(db, "users", uid, "quizDays", today);
  const userRef = doc(db, "users", uid);
  const activityRef = doc(db, "users", uid, "activity", monthKey(today));
  const day = dayOfMonth(today);
  const studyDays = await loadActiveStudyDays(uid);

  return runTransaction(db, async (tx) => {
    const [daySnap, userSnap, activitySnap] = await Promise.all([
      tx.get(dayRef),
      tx.get(userRef),
      tx.get(activityRef),
    ]);

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
