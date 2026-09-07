// Übungsaufgaben — Datenmodell für content/exercises/<topicSlug>.json.
//
// Die Aufgaben liegen als statische Dateien im Repo (kein Firestore, kein
// Netz, kein API-Key) und sind für alle Nutzer gleich. Der Übungsfortschritt
// lebt dagegen am planItem (lastAttempt/attemptCount, siehe lib/plans.ts).
//
// Vier Aufgabentypen, bewusst unterschiedlich schwer:
//   recall  — freies Abrufen, Selbstvergleich mit Musterlösung (stärkste Form)
//   numeric — automatisch prüfbar, mit Rechenweg (explanation)
//   choice  — NUR wo Abgrenzung das Lernziel ist; Distraktoren müssen echte
//             Verwechslungskandidaten sein
//   match   — Zuordnen (Begriff↔Definition, Schicht↔Protokoll, Befehl↔Wirkung)

export type ExerciseSource = "generated" | "procedural" | "existing" | "manual";

export type ExerciseType = "recall" | "numeric" | "choice" | "match";

/** Schwierigkeit 1 (leicht) bis 3 (schwer). */
export type ExerciseDifficulty = 1 | 2 | 3;

export interface RecallExercise {
  id: string;
  type: "recall";
  difficulty: ExerciseDifficulty;
  prompt: string;
  sampleAnswer: string;
  /** Stichpunkte, die in der Antwort vorkommen sollten (ehrlicher Selbstvergleich). */
  keyPoints: string[];
}

export interface NumericExercise {
  id: string;
  type: "numeric";
  difficulty: ExerciseDifficulty;
  prompt: string;
  /**
   * Zahl oder Bitmuster (z. B. IEEE-754-Darstellung). Bei string:
   * Vergleich normalisiert über Leerzeichen/Präfixe erfolgt in der UI.
   */
  answer: string | number;
  /** Absoluter Toleranzbereich um answer (nur bei number-Answers). */
  tolerance?: number;
  /** Einheit, z. B. "Hosts", "Jahre", "€". */
  unit?: string;
  /**
   * Reine Arithmetik zur Lösung (z. B. "2^6 - 2"). Ermöglicht maschinelles
   * Nachrechnen beim Generieren — ohne calculation ist die Antwort nicht
   * verifizierbar.
   */
  calculation?: string;
  /** Rechenweg, nicht nur das Ergebnis. */
  explanation: string;
}

export interface ChoiceExercise {
  id: string;
  type: "choice";
  difficulty: ExerciseDifficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  /** Auch: warum die anderen falsch sind. */
  explanation: string;
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface MatchExercise {
  id: string;
  type: "match";
  difficulty: ExerciseDifficulty;
  prompt: string;
  pairs: MatchPair[];
}

export type Exercise = RecallExercise | NumericExercise | ChoiceExercise | MatchExercise;

export interface ExerciseFile {
  topicSlug: string;
  planTemplateSlug: string;
  itemTitle: string;
  source: ExerciseSource;
  /** Nur bei source "generated": Modell-ID, mit der erzeugt wurde. */
  generatedWith?: string;
  /**
   * Review-Vermerk (wer die generierten Aufgaben durchgesehen hat).
   * Wird nach dem Durchsehen per Hand eingetragen.
   */
  reviewedBy: string | null;
  /**
   * Themen ohne Modul (moduleSlug null): Die Musterlösungen müssen das Thema
   * aus sich heraus erklären — Definition, Zusammenhang, Rechenweg.
   */
  standalone?: boolean;
  exercises: Exercise[];
}
