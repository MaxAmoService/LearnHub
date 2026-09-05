// ============================================================================
// Flashcard System — SM-2 Spaced Repetition Algorithm
// ============================================================================

export interface Flashcard {
  id: string;
  moduleId: string;
  front: string;  // Frage
  back: string;   // Antwort
  hint?: string;
  category?: string;
  frontImage?: string;  // SVG-String oder Bild-URL für die Vorderseite
  backImage?: string;   // SVG-String oder Bild-URL für die Rückseite
}

export interface FlashcardProgress {
  cardId: string;
  interval: number;      // Tage bis zur nächsten Wiederholung
  easeFactor: number;    // SM-2 Ease Factor (起步 2.5)
  repetitions: number;   // Wie oft richtig beantwortet
  nextReview: number;    // Timestamp (ms) der nächsten Wiederholung
  lastReview: number;    // Timestamp (ms) der letzten Wiederholung
}

export interface DeckProgress {
  moduleId: string;
  cards: Record<string, FlashcardProgress>;
  lastStudy: number;
  streak: number;
}

// SM-2 Algorithmus
export function sm2(
  quality: number, // 0-5 (0=total falsch, 5=perfekt)
  progress: FlashcardProgress
): FlashcardProgress {
  const now = Date.now();
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
export function getDueCards(
  cards: Flashcard[],
  progress: Record<string, FlashcardProgress>
): Flashcard[] {
  const now = Date.now();
  return cards.filter((card) => {
    const p = progress[card.id];
    if (!p) return true; // Neue Karte — noch nie gelernt
    return p.nextReview <= now;
  });
}

// Statistiken berechnen
export function getDeckStats(
  cards: Flashcard[],
  progress: Record<string, FlashcardProgress>
) {
  const now = Date.now();
  const total = cards.length;
  const studied = Object.keys(progress).length;
  const due = getDueCards(cards, progress).length;
  const mastered = cards.filter((c) => {
    const p = progress[c.id];
    return p && p.repetitions >= 3 && p.easeFactor >= 2.0;
  }).length;

  return { total, studied, due, mastered };
}

// localStorage Speicherung (offline cache)
const STORAGE_KEY = "learnhub-flashcard-progress";

export function loadProgress(): Record<string, DeckProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(data: Record<string, DeckProgress>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full — ignore
  }
}

export function getDeckProgress(moduleId: string): DeckProgress {
  const all = loadProgress();
  return (
    all[moduleId] || {
      moduleId,
      cards: {},
      lastStudy: 0,
      streak: 0,
    }
  );
}

export function saveDeckProgress(moduleId: string, deck: DeckProgress) {
  const all = loadProgress();
  all[moduleId] = deck;
  saveProgress(all);
}

// ─── Anki Export ─────────────────────────────────────────────────────────

/**
 * Exportiert Karteikarten im Anki-kompatiblen TSV-Format.
 * Format: Front\tBack\tTags
 * Import in Anki: Datei → Importieren → TSV-Datei wählen
 */
export function exportToAnki(cards: Flashcard[], moduleName: string): string {
  const header = "#separator:tab\n#html:false\n#tags column:3\n";
  const rows = cards.map((card) => {
    const front = card.front.replace(/\t/g, " ").replace(/\n/g, "<br>");
    const back = card.back.replace(/\t/g, " ").replace(/\n/g, "<br>");
    const tags = `LearnHub::${moduleName.replace(/\s+/g, "_")}`;
    return `${front}\t${back}\t${tags}`;
  });
  return header + rows.join("\n");
}

/**
 * Downloadet die Karteikarten als .txt-Datei für Anki.
 */
export function downloadAnkiDeck(cards: Flashcard[], moduleName: string) {
  const content = exportToAnki(cards, moduleName);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `LearnHub_${moduleName.replace(/\s+/g, "_")}_Anki.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
