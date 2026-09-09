// Geteilte Array-Helfer — kleine, reine Funktionen ohne Firestore-/UI-Bezug.

/** Fisher-Yates-Shuffle (neues Array, Eingabe bleibt unverändert). */
export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
