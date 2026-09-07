// ============================================================================
// SM-2 Spaced Repetition — reine Engine
// ============================================================================
//
// Keine Persistenz, kein Firestore: Die Engine rechnet nur. Verwendet von
//  - lib/flashcards.ts (localStorage-Deck-Persistenz, re-exportiert hieraus)
//  - lib/plans.ts    (Lehrplan-Items, Persistenz in Firestore)
//
// `now` ist als optionaler Parameter injizierbar, damit Tests deterministisch
// laufen; der Default `Date.now()` erhält das Bestandsverhalten.

export interface FlashcardProgress {
  cardId: string;
  interval: number;      // Tage bis zur nächsten Wiederholung
  easeFactor: number;    // SM-2 Ease Factor (Start 2.5)
  repetitions: number;   // Wie oft richtig beantwortet
  nextReview: number;    // Timestamp (ms) der nächsten Wiederholung
  lastReview: number;    // Timestamp (ms) der letzten Wiederholung
}

// SM-2 Algorithmus
export function sm2(
  quality: number, // 0-5 (0=total falsch, 5=perfekt)
  progress: FlashcardProgress,
  now: number = Date.now()
): FlashcardProgress {
  let { interval, easeFactor, repetitions } = progress;

  if (quality >= 3) {
    // Richtig beantwortet
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Falsch beantwortet — Reset
    repetitions = 0;
    interval = 1;
  }

  // Ease Factor anpassen
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  return {
    cardId: progress.cardId,
    interval,
    easeFactor: Math.round(easeFactor * 100) / 100,
    repetitions,
    nextReview: now + interval * 24 * 60 * 60 * 1000,
    lastReview: now,
  };
}

// Erstelle neuen Fortschritt für eine Karte
export function newCardProgress(cardId: string): FlashcardProgress {
  return {
    cardId,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    nextReview: 0,
    lastReview: 0,
  };
}

// Hole Karten die heute wiederholt werden müssen
export function getDueCards<T extends { id: string }>(
  cards: T[],
  progress: Record<string, FlashcardProgress>,
  now: number = Date.now()
): T[] {
  return cards.filter((card) => {
    const p = progress[card.id];
    if (!p) return true; // Neue Karte — noch nie gelernt
    return p.nextReview <= now;
  });
}

// Statistiken berechnen
export function getDeckStats<T extends { id: string }>(
  cards: T[],
  progress: Record<string, FlashcardProgress>,
  now: number = Date.now()
) {
  const total = cards.length;
  const studied = Object.keys(progress).length;
  const due = getDueCards(cards, progress, now).length;
  const mastered = cards.filter((c) => {
    const p = progress[c.id];
    return p && p.repetitions >= 3 && p.easeFactor >= 2.0;
  }).length;

  return { total, studied, due, mastered };
}
