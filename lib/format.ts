// Geteilte Formatierungs-Helfer — reine Funktionen, keine Firestore-/UI-Abhängigkeit.

/** Ganze Zahlen mit deutschen Tausendertrennzeichen. */
export function formatInt(n: number): string {
  return Math.floor(n).toLocaleString("de-DE");
}

/** Kompakte Darstellung großer Zahlen (K/M/B/T). */
export function formatCompact(n: number): string {
  if (n >= 1_000_000_000_000) return compactShort(n / 1_000_000_000_000) + "T";
  if (n >= 1_000_000_000) return compactShort(n / 1_000_000_000) + "B";
  if (n >= 1_000_000) return compactShort(n / 1_000_000) + "M";
  if (n >= 1_000) return compactShort(n / 1_000) + "K";
  return formatInt(n);
}

function compactShort(v: number): string {
  const r = v.toFixed(1);
  return r.endsWith(".0") ? Math.floor(v).toString() : r;
}

/** Zahl mit maximal zwei Nachkommastellen, deutsches Format. */
export function formatCount(n: number): string {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}
