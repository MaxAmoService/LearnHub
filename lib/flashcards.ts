// ============================================================================
// Flashcard System — Deck-Persistenz (localStorage) + Anki-Export
// ============================================================================
//
// Die SM-2-Engine (sm2, newCardProgress, getDueCards, getDeckStats) liegt in
// lib/spacing.ts und wird hier nur für Bestandscode re-exportiert. Die
// localStorage-Persistenz bleibt bewusst unverändert in dieser Datei.

import {
  sm2,
  newCardProgress,
  getDueCards,
  getDeckStats,
  type FlashcardProgress,
} from "./spacing";

export { sm2, newCardProgress, getDueCards, getDeckStats };
export type { FlashcardProgress };

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

export interface DeckProgress {
  moduleId: string;
  cards: Record<string, FlashcardProgress>;
  lastStudy: number;
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
