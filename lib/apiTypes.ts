// ============================================================================
// API-Typen — geteilte Strukturen der /api/v1-Routen (reine Typen, keine
// Importe mit Nebenwirkungen). Verwendet von den Route-Handler-Datenbuildern
// (lib/server/) und dem Text-Formatter (lib/apiText.ts).
// ============================================================================

export interface TodayApiItem {
  itemId: string;
  title: string;
  /** Soll-Einheiten des Items (estimatedUnits). */
  target: number;
  /** Erledigte Einheiten des Items (completedUnits). */
  done: number;
  /** Anzeige-Einheit der Einheiten (fester String, z. B. "UE"). */
  unit: string;
  /** Absoluter Link auf die Übungsseite — Widget öffnet direkt dort. */
  url: string;
}

export interface TodayApiReview extends TodayApiItem {
  /** "YYYY-MM-DD" — seit wann das Item fällig ist (nextDueAt). */
  overdueSince: string | null;
}

export interface TodayApiPlan {
  id: string;
  /** Kurzer Anzeigename des Plans (plan.title). */
  label: string;
  /** Deadline "YYYY-MM-DD". */
  deadline: string;
  /** Verbleibende Kalendertage bis zur Deadline (kann negativ sein). */
  daysLeft: number;
  phase: "aufbau" | "festigung" | "endspurt";
  pace: "ahead" | "on_track" | "behind" | "critical";
  /** Nächstes neues Thema — null in Festigung/Endspurt oder wenn alles offen ist. */
  neu: TodayApiItem | null;
  /** Fällige Wiederholungen (max. 3 pro Plan, wie in lib/today.ts). */
  wiederholung: TodayApiReview[];
  /** Heute an DIESEM Plan bearbeitete gewichtete Einheiten. */
  todayDone: number;
  /** Tagesziel des Plans (computeDailyTarget, gewichtete Einheiten). */
  todayTarget: number;
  /** Einheiten ÜBER dem Tagesziel (0, wenn das Pensum noch nicht erfüllt ist). */
  aheadUnits: number;
  /** Vorsprung in Tagen (konservativ abgerundet, mindestens 0). */
  aheadDays: number;
  /** Plan heute erledigt? (per bestandenem Tagesquiz ODER per Tagespensum). */
  done: boolean;
}

export interface TodayApiStreak {
  current: number;
  /** Historisches Maximum wird (noch) nicht persistiert — == current. */
  best: number;
  /** Heutige erledigte Einheiten (Activity-Units des heutigen Tages). */
  doneToday: number;
  weekDone: number;
  weekTarget: number;
}

export interface TodayApiResponse {
  /** "YYYY-MM-DD" — Tages-Key nach lib/dates.ts (Europe/Berlin, 04:00-Grenze). */
  date: string;
  streak: TodayApiStreak;
  plans: TodayApiPlan[];
  /** Absoluter Link auf das Tagesquiz — Widget verlinkt direkt dorthin. */
  quizUrl: string;
  /**
   * Ob der heutige Tag bereits als geschafft gilt: JEDER aktive Plan ist
   * erledigt — per bestandenem Tagesquiz (nur Pläne, aus denen Fragen kamen)
   * ODER per Tagespensum (lib/today.ts computeDayStatus). Solange ein Plan
   * offen ist, bleibt dayDone false.
   */
  dayDone: boolean;
  /**
   * Anzahl aller heute anstehenden Themen über alle aktiven Pläne: fällige
   * Wiederholungen (ungedeckelt, anders als die 3-pro-Plan-Anzeige) plus
   * offene Neu-Themen (done < target).
   */
  totalDue: number;
}
