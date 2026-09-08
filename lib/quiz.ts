// ============================================================================
// Tagesquiz — Zusammenstellung, Replay & Auswertung (reine Funktionen,
// kein Firestore)
// ============================================================================
//
// Das Tagesquiz zieht bis zu 10 Aufgaben aus ALLEN bereits begonnenen Themen
// (attemptCount > 0 oder completedUnits > 0) — eine breite Stichprobe über den
// bisherigen Stoff, keine Tagesübung. Gewichtung beim Ziehen: überfällig >
// heute fällig > übriges Begonnenes; pro Thema höchstens 2 Aufgaben; die
// Reihenfolge ist über Themen hinweg gemischt. Nicht begonnene Themen und
// Themen ohne Übungsaufgaben kommen nicht dran. Aufgaben werden ZUFÄLLIG
// (seeded) aus dem Pool des Themas gezogen und bevorzugt gemieden, wenn sie
// beim letzten Durchlauf des Themas drankamen (recentExerciseIds am planItem,
// gedeckelt auf die letzten 5 — Übungsseite und Quiz schreiben sie fort).
//
// Der Fragenbogen wird pro Tag festgehalten (quizDays/{date}, siehe
// lib/quizClient.ts): Ein zweiter Durchlauf am selben Tag bekommt EXAKT
// dieselben Fragen (rebuildDailyQuizFromDay) — der freie Tag ist nur beim
// ersten Durchgang des Tages holbar (canClaimFreeDay), nicht über erneutes
// Würfeln.
//
// Auswertung: Bestanden nur bei 100 % — richtige Themen verändern SM-2 NICHT,
// falsche bekommen Quality 1 (computeQuizTopicReviewPatch) und rücken in der
// Wiederholung nach vorn. Tests: tests/quiz.test.ts.

import { todayKey } from "./dates";
import { mulberry32 } from "./exercises/procedural";
import {
  buildExerciseSession,
  hasExercisesForTopic,
  newExerciseSeed,
  type ExerciseSessionSource,
} from "./exercises/session";
import type { Exercise } from "./exercises/types";
import { newCardProgress, sm2, type FlashcardProgress } from "./spacing";

// ─── Typen ──────────────────────────────────────────────────────────────────

export const DAILY_QUIZ_SIZE = 10;
export const MAX_QUIZ_TASKS_PER_TOPIC = 2;

export interface QuizTopicLike {
  planId: string;
  itemId: string;
  title?: string;
  topicSlug?: string | null;
  nextDueAt?: string | null;
  attemptCount?: number;
  completedUnits?: number;
  /** Zuletzt verwendete Aufgaben-IDs (letzte 5) — werden beim Ziehen gemieden. */
  recentExerciseIds?: string[];
}

export interface QuizTask {
  planId: string;
  itemId: string;
  topicSlug: string;
  topicTitle: string;
  /** Seed der Themen-Session — nötig, um prozedurale Fragen exakt zu reproduzieren. */
  topicSeed: number;
  source: ExerciseSessionSource;
  exercise: Exercise;
}

export interface DailyQuiz {
  /** Basis-Seed der Ziehung (Herkunfts-Nachweis, Replay läuft über die Tasks). */
  seed: number;
  tasks: QuizTask[];
}

/** Gespeicherte Aufgabe im quizDays-Doc: planId + itemId + exercise-id + Seeds. */
export interface QuizDayTaskRecord {
  planId: string;
  itemId: string;
  topicSlug: string;
  topicTitle: string;
  topicSeed: number;
  exerciseId: string;
}

/** quizDays/{date} — defensiv gelesen (Firestore ist schemalos). */
export interface QuizDayDocLike {
  seed?: number;
  attemptedAt?: string;
  /** null = gestartet, kein Ergebnis; true/false = erster Durchgang beendet. */
  passed?: boolean | null;
  tasks?: QuizDayTaskRecord[];
}

// ─── Zusammenstellung ────────────────────────────────────────────────────────

type Bucket = "overdue" | "due" | "rest";

const BUCKET_WEIGHTS: Record<Bucket, number> = { overdue: 3, due: 2, rest: 1 };

function isStartedTopic(topic: QuizTopicLike): boolean {
  return (topic.attemptCount ?? 0) > 0 || (topic.completedUnits ?? 0) > 0;
}

function bucketOf(topic: QuizTopicLike, today: string): Bucket {
  const next = topic.nextDueAt ?? null;
  if (next !== null && next < today) return "overdue";
  if (next === today) return "due";
  return "rest";
}

interface Candidate {
  topic: QuizTopicLike;
  bucket: Bucket;
}

interface PoolEntry {
  source: ExerciseSessionSource;
  exercises: Exercise[];
  /** Noch nicht in DIESEM Bogen verwendete Indizes (ohne Zurücklegen). */
  unused: number[];
  /** Zuletzt verwendete Aufgaben des Themas — beim Ziehen bevorzugt gemieden. */
  recentIds: Set<string>;
  used: number;
  topicSeed: number;
}

function pickWeighted(candidates: Candidate[], rng: () => number): Candidate {
  const total = candidates.reduce((sum, c) => sum + BUCKET_WEIGHTS[c.bucket], 0);
  let r = rng() * total;
  for (const candidate of candidates) {
    r -= BUCKET_WEIGHTS[candidate.bucket];
    if (r <= 0) return candidate;
  }
  return candidates[candidates.length - 1];
}

/**
 * Baut den Fragenbogen: bis zu `count` Aufgaben aus allen begonnenen Themen.
 * Themen-Pools werden lazy gebaut (prozedural mit frischem `topicSeed`); aus
 * jedem Pool wird ZUFÄLLIG (seeded) ohne Zurücklegen gezogen, wobei zuletzt
 * verwendete Aufgaben (recentExerciseIds) gemieden werden. Derselbe Seed +
 * dieselbe Themenmenge ergibt deterministisch denselben Bogen (Tests
 * verlassen sich darauf).
 */
export function buildDailyQuiz(
  topics: QuizTopicLike[],
  opts: { count?: number; today?: string; seed?: number; rng?: () => number } = {}
): DailyQuiz {
  const count = opts.count ?? DAILY_QUIZ_SIZE;
  const today = opts.today ?? todayKey();
  const seed = opts.seed ?? newExerciseSeed();
  const rng = opts.rng ?? mulberry32(seed);

  const eligible = topics.filter(
    (t) =>
      t.topicSlug != null &&
      hasExercisesForTopic(t.topicSlug) &&
      isStartedTopic(t)
  );

  const candidates: Candidate[] = eligible.map((topic) => ({
    topic,
    bucket: bucketOf(topic, today),
  }));

  const pools = new Map<string, PoolEntry>();
  const keyOf = (t: QuizTopicLike) => `${t.planId}/${t.itemId}`;

  const tasks: QuizTask[] = [];
  while (tasks.length < count) {
    const alive = candidates.filter((c) => {
      const pool = pools.get(keyOf(c.topic));
      return !pool || (pool.used < MAX_QUIZ_TASKS_PER_TOPIC && pool.unused.length > 0);
    });
    if (alive.length === 0) break;

    const chosen = pickWeighted(alive, rng);
    const key = keyOf(chosen.topic);

    let pool = pools.get(key);
    if (!pool) {
      const topicSeed = Math.floor(rng() * 2 ** 31);
      const session = buildExerciseSession(chosen.topic.topicSlug!, topicSeed);
      pool = {
        source: session.source,
        exercises: session.exercises,
        unused: session.exercises.map((_, i) => i),
        recentIds: new Set(
          Array.isArray(chosen.topic.recentExerciseIds)
            ? chosen.topic.recentExerciseIds
            : []
        ),
        used: 0,
        topicSeed,
      };
      pools.set(key, pool);
    }

    // Zufällig aus dem Pool ziehen (seeded) und Aufgaben bevorzugen, die beim
    // letzten Durchlauf dieses Themas NICHT drankamen. Erst wenn alle übrigen
    // gemieden wurden (Pool zu klein), fällt die Ziehung auf sie zurück.
    const fresh = pool.unused.filter((i) => !pool.recentIds.has(pool.exercises[i].id));
    const drawable = fresh.length > 0 ? fresh : pool.unused;
    const index = drawable[Math.floor(rng() * drawable.length)];
    pool.unused = pool.unused.filter((i) => i !== index);
    pool.used += 1;

    const exercise = pool.exercises[index];

    tasks.push({
      planId: chosen.topic.planId,
      itemId: chosen.topic.itemId,
      topicSlug: chosen.topic.topicSlug!,
      topicTitle: chosen.topic.title?.trim() || "Unbenanntes Thema",
      topicSeed: pool.topicSeed,
      source: pool.source,
      exercise,
    });
  }

  return { seed, tasks };
}

// ─── Replay: exakt dieselben Fragen am selben Tag ───────────────────────────

/** Aufgabenliste des Bogens für das quizDays-Doc serialisieren. */
export function serializeQuizTasks(quiz: DailyQuiz): QuizDayTaskRecord[] {
  return quiz.tasks.map((task) => ({
    planId: task.planId,
    itemId: task.itemId,
    topicSlug: task.topicSlug,
    topicTitle: task.topicTitle,
    topicSeed: task.topicSeed,
    exerciseId: task.exercise.id,
  }));
}

/**
 * Baut den gespeicherten Bogen nach: pro Aufgabe die Session mit demselben
 * `topicSeed` erzeugen und die Aufgabe per ID suchen. Nicht reproduzierbare
 * Einträge (Aufgabe inzwischen entfernt) werden defensiv übersprungen.
 */
export function rebuildDailyQuizFromDay(doc: QuizDayDocLike): DailyQuiz {
  const tasks: QuizTask[] = [];
  for (const record of Array.isArray(doc.tasks) ? doc.tasks : []) {
    if (
      !record ||
      typeof record.topicSlug !== "string" ||
      typeof record.exerciseId !== "string" ||
      typeof record.planId !== "string" ||
      typeof record.itemId !== "string"
    ) {
      continue;
    }
    const session = buildExerciseSession(record.topicSlug, record.topicSeed ?? 0);
    const exercise = session.exercises.find((e) => e.id === record.exerciseId);
    if (!exercise) continue;
    tasks.push({
      planId: record.planId,
      itemId: record.itemId,
      topicSlug: record.topicSlug,
      topicTitle: typeof record.topicTitle === "string" ? record.topicTitle : "",
      topicSeed: record.topicSeed ?? 0,
      source: session.source,
      exercise,
    });
  }
  return { seed: doc.seed ?? 0, tasks };
}

// ─── Auswertung ──────────────────────────────────────────────────────────────

export interface DailyQuizOutcome {
  /** Summe der Teilpunkte (recall 0.5, match anteilig — kann gebrochen sein). */
  correct: number;
  /** Nur bei 100 % im ERSTEN Versuch — Nachbessern gibt es nicht. */
  passed: boolean;
  wrongTasks: QuizTask[];
  /** Eindeutige Themen-Keys der falsch beantworteten Aufgaben (für SM-2-Reviews). */
  wrongItemKeys: { planId: string; itemId: string }[];
}

/** `scores` parallel zu `tasks` (0..1 pro Aufgabe). */
export function evaluateDailyQuiz(tasks: QuizTask[], scores: number[]): DailyQuizOutcome {
  const wrongTasks = tasks.filter((_, i) => (scores[i] ?? 0) < 1);
  const correct = scores.reduce(
    (sum, s) => sum + (Number.isFinite(s) ? s : 0),
    0
  );

  const seen = new Set<string>();
  const wrongItemKeys = wrongTasks
    .filter((task) => {
      const key = `${task.planId}/${task.itemId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((task) => ({ planId: task.planId, itemId: task.itemId }));

  return {
    correct,
    passed: tasks.length > 0 && scores.length === tasks.length && wrongTasks.length === 0,
    wrongTasks,
    wrongItemKeys,
  };
}

/**
 * Der freie Tag ist nur beim ERSTEN Durchgang des Tages holbar:
 * `existing` ist das quizDays-Doc des Tages (null = noch keins angelegt,
 * passed == null = gestartet, aber noch kein Ergebnis).
 */
export function canClaimFreeDay(
  existing: { passed?: boolean | null } | null,
  passed: boolean
): boolean {
  if (!passed) return false;
  return existing === null || existing.passed == null;
}

// ─── SM-2: das Quiz darf nur verschlechtern, nie verbessern ─────────────────

/**
 * Review-Patch für falsch beantwortete Quiz-Themen: Quality 1 (niedrigste
 * Stufe) über dieselbe SM-2-Engine wie Übungen — das Thema rückt in der
 * Wiederholung nach vorn. Richtig beantwortete Themen bekommen KEINEN Patch
 * (eine einzelne richtige Frage ist kein Nachweis, dass ein Thema sitzt).
 *
 * `lastReview` bleibt dabei bewusst UNANGETASTET: Das Tagespensum
 * (computePlanUnitsToday in lib/today.ts) misst den Tag über sm2.lastReview —
 * ein Quiz-Review darf dort nicht als bearbeitete Einheit zählen, sonst
 * könnte ein Fehlversuch den Tag doch noch freischalten.
 */
export function computeQuizTopicReviewPatch(
  itemId: string,
  item: { sm2?: FlashcardProgress | null; completedUnits?: number; estimatedUnits?: number },
  nowMs: number
): { sm2: FlashcardProgress; completedUnits: number; nextDueAt: string } {
  const prev = item.sm2 ?? null;
  const newSm2 = sm2(1, prev ?? newCardProgress(itemId), nowMs);
  newSm2.lastReview = prev ? prev.lastReview : 0;
  const estimatedUnits = Math.max(item.estimatedUnits ?? 0, 1);
  const completedUnits = Math.min((item.completedUnits ?? 0) + 1, estimatedUnits);
  return {
    sm2: newSm2,
    completedUnits,
    nextDueAt: todayKey(new Date(newSm2.nextReview)),
  };
}
