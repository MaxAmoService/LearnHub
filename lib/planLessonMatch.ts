// Plan-Item → Lektions-Zuordnung — reine Funktionen (kein Firestore, keine UI).
//
// Die Zuordnung vergleicht den Plan-Item-Titel mit den Lektionstiteln des
// verlinkten Moduls. Nur bei EINDEUTIGER Übereinstimmung (exakt oder eine
// einzelne Lektion mit deutlich höchster Ähnlichkeit) wird eine lessonId
// vergeben — mehrdeutige oder schwache Treffer bleiben null, damit der
// Link auf die Modulübersicht zeigt statt zu raten.
//
// Tests: tests/planLessonMatch.test.ts.

export interface LessonRef {
  id: string;
  title: string;
}

/** Mindest-Ähnlichkeit des besten Kandidaten. */
export const MIN_SCORE = 0.6;
/** Mindest-Abstand zwischen bestem und zweitbestem Kandidaten. */
export const MIN_MARGIN = 0.3;

const STOPWORDS = new Set([
  "der", "die", "das", "und", "oder", "im", "in", "mit", "von", "zu",
  "des", "den", "dem", "ein", "eine", "einer", "auf", "an", "fuer", "für",
  "bei", "am", "zum", "zur", "ist", "sind", "wie", "was", "aus", "über",
]);

/** Kleinbuchstaben, Diakritika raus (ä→a, ß→ss), nur Wortzeichen. */
function normalize(title: string): Set<string> {
  const normalized = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/);
  return new Set(normalized.filter((w) => w.length > 2 && !STOPWORDS.has(w)));
}

/** Jaccard-Ähnlichkeit zweier Wortmengen (0–1). */
function jaccard(a: Set<string>, b: Set<string>): number {
  const union = new Set([...a, ...b]);
  if (union.size === 0) return 0;
  let overlap = 0;
  for (const word of a) if (b.has(word)) overlap += 1;
  return overlap / union.size;
}

export interface ScoredLesson extends LessonRef {
  score: number;
}

/** Alle Lektionen nach Ähnlichkeit zum Item-Titel, absteigend sortiert. */
export function scoreAgainstLessons(
  itemTitle: string,
  lessons: LessonRef[]
): ScoredLesson[] {
  const target = normalize(itemTitle);
  return lessons
    .map((lesson) => ({ ...lesson, score: jaccard(target, normalize(lesson.title)) }))
    .sort((a, b) => b.score - a.score);
}

/**
 * lessonId bei eindeutigem Treffer, sonst null.
 * Eindeutig = bester Score ≥ MIN_SCORE UND deutlich über dem Zweitplatzierten.
 */
export function matchPlanItemToLesson(
  itemTitle: string,
  lessons: LessonRef[]
): string | null {
  const scored = scoreAgainstLessons(itemTitle, lessons);
  if (scored.length === 0) return null;
  const best = scored[0];
  const second = scored.length > 1 ? scored[1].score : 0;
  if (best.score < MIN_SCORE) return null;
  if (best.score - second < MIN_MARGIN) return null;
  return best.id;
}
