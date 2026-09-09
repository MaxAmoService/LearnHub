// Bestenliste — reine Mapping-/Sortier-Logik (kein Firestore, keine UI).
//
// Die Bestenliste wird serverseitig aus den User-Dokumenten gebaut
// (GET /api/v1/leaderboard, Admin SDK) — der Client liest fremde Profile
// nicht mehr direkt aus Firestore. Diese Datei definiert die Positivliste:
// die API liefert NUR die hier abgebildeten Felder (nie email, settings,
// clicker*-Felder oder sonstiges) und sortiert serverseitig.
//
// Tests: tests/leaderboard.test.ts.

export const LEADERBOARD_LIMIT = 50;

/** Schwellwert für "online" — identisch zu components/OnlineStatus.tsx. */
export const ONLINE_THRESHOLD_MS = 60_000;

/** Antwort-Eintrag der API — Positivliste, kein Ausschlussfilter. */
export interface LeaderboardApiEntry {
  uid: string;
  username: string;
  avatar: string;
  equippedFrame: string;
  totalXP: number;
  streak: number;
  /** Anzahl abgeschlossener Module (nur die Zahl, nie die Liste). */
  completedModules: number;
  /** Server-seitig aus status.state/lastChanged berechnet (Ersatz für den
   * früheren client-seitigen onSnapshot auf fremde User-Docs). */
  online: boolean;
}

export interface RawUserDoc {
  id: string;
  data: Record<string, unknown>;
}

/**
 * Aus status.state/lastChanged ableiten, ob der User gerade online ist —
 * dieselbe Logik wie bisher clientseitig in useOnlineStatus. statusHidden
 * beeinflusst die heutige Anzeige nicht (weder der alte Client-Code noch
 * die Presence-Schreibpfade prüfen es) und wird daher nicht gefiltert.
 */
export function computeOnline(
  status: { state?: unknown; lastChanged?: unknown } | null | undefined,
  now: number
): boolean {
  if (!status || status.state !== "online") return false;
  if (typeof status.lastChanged !== "string") return false;
  const lastChanged = Date.parse(status.lastChanged);
  if (Number.isNaN(lastChanged)) return false;
  return now - lastChanged < ONLINE_THRESHOLD_MS;
}

/**
 * User-Docs (roh, Admin SDK) auf die Positivliste abbilden, sortieren
 * (totalXP absteigend, bei Gleichstand username aufsteigend) und auf
 * LEADERBOARD_LIMIT kürzen. Nutzer ohne leaderboardOptIn === true oder
 * ohne username entfallen — dieselbe Logik wie bisher clientseitig.
 */
export function mapLeaderboardDocs(
  docs: RawUserDoc[],
  now: number = Date.now()
): LeaderboardApiEntry[] {
  const entries: LeaderboardApiEntry[] = [];
  for (const doc of docs) {
    const data = doc.data;
    if (data.leaderboardOptIn !== true) continue;
    const username = typeof data.username === "string" ? data.username : "";
    if (!username) continue;
    const status = data.status as { state?: unknown; lastChanged?: unknown } | undefined;
    entries.push({
      uid: doc.id,
      username,
      avatar: typeof data.avatar === "string" ? data.avatar : "🎓",
      equippedFrame:
        typeof data.equippedFrame === "string" ? data.equippedFrame : "none",
      totalXP: typeof data.totalXP === "number" ? data.totalXP : 0,
      streak: typeof data.streak === "number" ? data.streak : 0,
      completedModules: Array.isArray(data.completedModules)
        ? data.completedModules.length
        : 0,
      online: computeOnline(status, now),
    });
  }
  entries.sort(
    (a, b) => b.totalXP - a.totalXP || a.username.localeCompare(b.username)
  );
  return entries.slice(0, LEADERBOARD_LIMIT);
}

/** Öffentliches Fremd-Profil fürs Leaderboard-Modal — ebenfalls Positivliste. */
export interface PublicUserProfile {
  uid: string;
  username: string;
  bio: string;
  createdAt: string | null;
}

function normalizeCreatedAt(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "toDate" in value) {
    const date = (value as { toDate: () => unknown }).toDate();
    if (date instanceof Date) return date.toISOString();
  }
  return null;
}

export function mapPublicUserProfile(uid: string, data: Record<string, unknown>): PublicUserProfile {
  return {
    uid,
    username: typeof data.username === "string" ? data.username : "",
    bio: typeof data.bio === "string" ? data.bio.trim() : "",
    createdAt: normalizeCreatedAt(data.createdAt),
  };
}
