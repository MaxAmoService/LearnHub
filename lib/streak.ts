// ============================================================================
// Streak-Logik — reine Funktionen (kein Firestore)
// ============================================================================
//
// Der Streak misst Lerntage, nicht App-Nutzung: Er hängt an lastStudyDate
// ("YYYY-MM-DD"), das NUR bei echtem Lernfortschritt gesetzt wird.
// lastActive (Presence-Heartbeat) spielt nur noch eine Rolle als
// Migrations-Fallback, solange lastStudyDate in alten Dokumenten fehlt.

import { addDays, dayOfWeek, daysBetween, todayKey } from "./dates";

export interface StreakState {
  streak: number;
  streakFreeze: boolean;
  /** "YYYY-MM-DD" — vorheriger echter Lerntag. */
  lastStudyDate?: string;
  /** ISO-Timestamp — Fallback nur solange lastStudyDate fehlt (Backfill-Übergang). */
  lastActive?: string;
}

export interface StreakUpdate {
  streak: number;
  streakFreeze: boolean;
}

/**
 * Berechnet den neuen Streak auf Basis von lastStudyDate.
 *
 * - Heute oder gestern gelernt → +0 bzw. +1.
 * - Größere Lücke: Nur freie (nicht geplante) Tage dazwischen → Streak
 *   überlebt, ohne den Freeze anzufassen.
 * - Genau EIN verpasster Lerntag + Freeze → überlebt, Freeze verbraucht.
 * - Sonst → Streak bricht auf 1.
 *
 * @param studyDays geplante Lerntage (1=Mo … 7=So) als Union aller aktiven
 *                  Pläne. `null`/`undefined` → jedes Kalenderdatum ist ein
 *                  Lerntag (bisheriges Verhalten ohne Plan-Info).
 */
export function updateStreak(
  profile: StreakState,
  options?: { now?: Date; studyDays?: number[] | null }
): StreakUpdate {
  const today = todayKey(options?.now);
  const studyDays = options?.studyDays ?? null;

  const last = profile.lastStudyDate
    ?? (profile.lastActive ? todayKey(new Date(profile.lastActive)) : null);

  if (last === null) {
    // Noch nie gelernt — nichts anfassen.
    return { streak: profile.streak, streakFreeze: profile.streakFreeze };
  }
  if (last === today) {
    return { streak: profile.streak, streakFreeze: profile.streakFreeze };
  }
  if (last === addDays(today, -1)) {
    return { streak: profile.streak + 1, streakFreeze: profile.streakFreeze };
  }

  // Lücke > 1 Tag: zähle verpasste Lerntage zwischen last und today.
  const gapDays = Math.max(daysBetween(last, today) - 1, 0);
  let missed = 0;
  if (studyDays) {
    const set = new Set(studyDays);
    for (let i = 1; i <= gapDays; i++) {
      if (set.has(dayOfWeek(addDays(last, i)))) missed += 1;
    }
  } else {
    missed = gapDays;
  }

  if (missed === 0) {
    // Nur freie Tage dazwischen — Streak überlebt, Freeze bleibt unangetastet.
    return { streak: profile.streak, streakFreeze: profile.streakFreeze };
  }
  if (missed === 1 && profile.streakFreeze) {
    return { streak: profile.streak, streakFreeze: false };
  }
  return { streak: 1, streakFreeze: profile.streakFreeze };
}

export interface DailyLessonsState {
  dailyLessonsToday?: number;
  dailyLessonsDate?: string;
}

/**
 * Lazy Daily-Reset: Der Zähler gilt nur, wenn dailyLessonsDate dem heutigen
 * Tages-Key entspricht — sonst zählt er als 0 (kein Login-Reset nötig,
 * Firebase-Sessions leben oft wochenlang).
 */
export function effectiveDailyLessons(
  profile: DailyLessonsState,
  now: Date = new Date()
): number {
  if (profile.dailyLessonsDate !== todayKey(now)) return 0;
  return profile.dailyLessonsToday ?? 0;
}
