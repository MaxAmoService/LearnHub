// Client-Zugriff auf die serverseitige Bestenliste (GET /api/v1/leaderboard)
// und das öffentliche Minimal-Profil (GET /api/v1/users/[uid]/public).
//
// Seit der Verschärfung von firestore.rules (users/{userId} nur für die
// eigene UID lesbar) läuft jeder Zugriff auf fremde Profile über diese
// Route Handler — der Client liest keine fremden User-Docs mehr direkt aus
// Firestore.

import { getAuthInstance } from "./firebase";
import { getUserLevel } from "./auth";
import type { LeaderboardApiEntry, PublicUserProfile } from "./leaderboard";

/** Client-seitiger Anzeige-Typ: API-Eintrag + abgeleitete Level-/Rang-Infos. */
export interface LeaderboardEntry extends LeaderboardApiEntry {
  level: number;
  levelTitle: string;
  rank: number;
}

async function getToken(): Promise<string> {
  const fbUser = getAuthInstance().currentUser;
  if (!fbUser) throw new Error("Nicht eingeloggt");
  return fbUser.getIdToken();
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch("/api/v1/leaderboard", {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  if (!res.ok) throw new Error(`Leaderboard-Fehler: HTTP ${res.status}`);
  const entries = (await res.json()) as LeaderboardApiEntry[];
  return entries.map((entry, index) => {
    const levelInfo = getUserLevel(entry.totalXP);
    return {
      ...entry,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      rank: index + 1,
    };
  });
}

export async function fetchPublicUserProfile(uid: string): Promise<PublicUserProfile> {
  const res = await fetch(`/api/v1/users/${encodeURIComponent(uid)}/public`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  if (!res.ok) throw new Error(`Profil-Fehler: HTTP ${res.status}`);
  return (await res.json()) as PublicUserProfile;
}
