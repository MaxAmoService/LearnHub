// Antwort-Validierung für Freitext-Aufgaben — geteilte Logik für
// InteractiveExercise, Quiz und InlineExercise.
//
// Normalisierung: Kleinbuchstaben, alle Whitespaces entfernen,
// geschweifte Klammern entfernen, Leerzeichen vor Ziffern in Komma-
// Listen entfernen ("1, 5" → "1,5").

export function normalizeFreeTextAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[{}]/g, "")
    .replace(/,\s*(?=\d)/g, ",");
}

export interface CheckAnswerOptions {
  /** Weitere gültige Antworten (z. B. zweite Lösung einer quadratischen Gleichung). */
  acceptedAnswers?: string[];
  /** Numerische Toleranz — bei gesetzter Toleranz wird numerisch verglichen. */
  tolerance?: number;
  /** Auch * und · als austauschbare Mal-Zeichen akzeptieren (Tagesquiz). */
  allowDotStarSwap?: boolean;
}

/**
 * Prüft eine Freitext-Antwort gegen die Musterlösung plus alle weiteren
 * gültigen Antworten.
 */
export function checkFreeTextAnswer(
  rawUserAnswer: string,
  expectedAnswer: string,
  options: CheckAnswerOptions = {},
): boolean {
  const candidates = [expectedAnswer, ...(options.acceptedAnswers ?? [])];
  const normalizedUser = normalizeFreeTextAnswer(rawUserAnswer);

  for (const candidate of candidates) {
    const normalizedExpected = normalizeFreeTextAnswer(candidate);
    const variants = [normalizedExpected];
    if (options.allowDotStarSwap) {
      variants.push(
        normalizedExpected.replace(/\*/g, "·"),
        normalizedExpected.replace(/·/g, "*"),
      );
    }

    for (const variant of variants) {
      if (options.tolerance !== undefined) {
        const userNum = parseFloat(normalizedUser);
        const expectedNum = parseFloat(variant);
        if (!isNaN(userNum) && !isNaN(expectedNum)) {
          if (Math.abs(userNum - expectedNum) <= options.tolerance) {
            return true;
          }
          continue;
        }
      }

      if (normalizedUser === variant) {
        return true;
      }
    }
  }

  return false;
}

/** Alle gültigen Antworten einer Aufgabe (Musterlösung + Alternativen). */
export function allValidAnswers(
  expectedAnswer: string,
  acceptedAnswers?: string[],
): string[] {
  return [expectedAnswer, ...(acceptedAnswers ?? [])];
}
