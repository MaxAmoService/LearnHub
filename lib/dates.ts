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
const DAY_BOUNDARY_HOUR = 4; // Tagesgrenze: 04:00 Berliner Zeit
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Liefert die Berliner Lokalbestandteile (Jahr/Monat/Tag/Stunde) eines
// Instants. hourCycle "h23" garantiert Stunden 00-23 (kein "24" um Mitternacht).
const berlinPartsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BERLIN_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
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
 *
 * DST-sicher: Erst werden die Berliner Lokalbestandteile direkt über Intl
 * ermittelt (die kennt die Umstellungen), dann wird der Tag rein kalendarisch
 * über Date.UTC-Normalisierung um eins zurückgesetzt. Ein Zeitversatz in
 * Millisekunden darf hier NICHT verwendet werden — der verschiebt den Instant
 * an den Umstellungstagen über die Offset-Änderung hinweg in den falschen
 * Kalendertag (z. B. 04:30 CEST am Frühlings-Umstellungstag).
 */
export function todayKey(now: Date = new Date()): string {
  let year = 0;
  let month = 0;
  let day = 0;
  let hour = 0;
  for (const part of berlinPartsFormatter.formatToParts(now)) {
    if (part.type === "year") year = Number(part.value);
    else if (part.type === "month") month = Number(part.value);
    else if (part.type === "day") day = Number(part.value);
    else if (part.type === "hour") hour = Number(part.value);
  }
  const date = new Date(
    Date.UTC(year, month - 1, hour < DAY_BOUNDARY_HOUR ? day - 1 : day)
  );
  return formatKey(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
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

/**
 * "YYYY-MM-DD" → "TT.MM.JJJJ" (deutsche Anzeige). Reine Kalenderrechnung,
 * keine Zeitzone im Spiel — der Key bleibt unverändert.
 */
export function formatDateKey(key: string): string {
  const { year, month, day } = parseKey(key);
  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}
