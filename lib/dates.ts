// ============================================================================
// Datums-Utilities — Europe/Berlin mit Tagesgrenze 04:00
// ============================================================================
//
// Alle Tagesgrenzen laufen über Keys im Format "YYYY-MM-DD". Die Tagesgrenze
// liegt bei 04:00 Berliner Zeit: Eine Session um 01:30 zählt zum Vortag.
//
// WICHTIG: Tagesarithmetik darf NICHT über `Date.now() ± n * 86400000`
// laufen — an den Tagen der Zeitumstellung (23h/25h) verschiebt sich sonst
// der UTC-Zeitpunkt und die Zuordnung zum Kalendertag wird falsch. Deshalb
// läuft alle Arithmetik hier auf den Keys (reine Kalenderrechnung über
// Date.UTC-Normalisierung).

const BERLIN_TZ = "Europe/Berlin";
const DAY_BOUNDARY_MS = 4 * 60 * 60 * 1000; // Tagesgrenze: 04:00
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// en-CA formatiert als "YYYY-MM-DD" — stabil über Locales hinweg.
const keyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BERLIN_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

interface KeyParts {
  year: number;
  month: number;
  day: number;
}

function parseKey(key: string): KeyParts {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

function formatKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Tages-Key ("YYYY-MM-DD") eines Zeitpunkts in Europe/Berlin.
 * Die Tagesgrenze liegt bei 04:00: Instants zwischen 00:00 und 03:59 Berliner
 * Zeit zählen zum Vortag.
 */
export function todayKey(now: Date = new Date()): string {
  return keyFormatter.format(new Date(now.getTime() - DAY_BOUNDARY_MS));
}

/** Kalenderarithmetik auf Keys — DST-sicher über Date.UTC-Normalisierung. */
export function addDays(key: string, days: number): string {
  const { year, month, day } = parseKey(key);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return formatKey(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

/** Kalendertage zwischen zwei Keys (toKey - fromKey), kann negativ sein. */
export function daysBetween(fromKey: string, toKey: string): number {
  const a = parseKey(fromKey);
  const b = parseKey(toKey);
  const msA = Date.UTC(a.year, a.month - 1, a.day);
  const msB = Date.UTC(b.year, b.month - 1, b.day);
  return Math.round((msB - msA) / MS_PER_DAY);
}

export function isSameDay(a: string, b: string): boolean {
  return a === b;
}

/** Wochentag eines Keys: 1 = Montag … 7 = Sonntag (passend zu plan.studyDays). */
export function dayOfWeek(key: string): number {
  const { year, month, day } = parseKey(key);
  const utcDay = new Date(Date.UTC(year, month - 1, day)).getUTCDay(); // 0=So..6=Sa
  return ((utcDay + 6) % 7) + 1;
}

/** Monats-Key "YYYY-MM" — Routing-Schlüssel für users/{uid}/activity/{YYYY-MM}. */
export function monthKey(key: string): string {
  return key.slice(0, 7);
}

/** Tag im Monat "01".."31" — Feldname im Activity-Doc (days."01"). */
export function dayOfMonth(key: string): string {
  return key.slice(8, 10);
}
