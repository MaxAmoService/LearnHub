import { type NextRequest, NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { mapLeaderboardDocs, type LeaderboardApiEntry } from "@/lib/leaderboard";
import { verifyBearerUser } from "@/lib/server/userAuth";

// Serverseitige Bestenliste: Der Client liest fremde Profile NICHT mehr
// direkt aus Firestore (bisher getLeaderboard mit getDocs auf users/* —
// jeder eingeloggte Nutzer bekam jedes fremde Profil komplett inkl. email
// und clicker*-Feldern). Hier läuft alles über das Admin SDK; die Antwort
// enthält nur die Positivliste aus lib/leaderboard.ts.
//
// Auth: eingeloggte Web-Nutzer via Firebase-ID-Token (Authorization: Bearer),
// wie die Key-Verwaltungsrouten — kein API-Key nötig.
//
// Cache: Die Liste ist für alle eingeloggten Nutzer identisch; kurze
// Revalidierung reicht (private + max-age statt no-store — die Antwort darf
// nicht über Shared Caches ohne Auth-Prüfung ausgeliefert werden, deshalb
// private und kein s-maxage).
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CACHE = { "Cache-Control": "private, max-age=60" };
const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(_request: NextRequest) {
  try {
    const user = await verifyBearerUser(_request);
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }

    const db = getAdminDb();
    // Nur opted-in User-Docs laden (spart Lesekosten gegenüber "alle Users").
    const snap = await db
      .collection("users")
      .where("leaderboardOptIn", "==", true)
      .get();

    const entries: LeaderboardApiEntry[] = mapLeaderboardDocs(
      snap.docs.map((d) => ({ id: d.id, data: d.data() as Record<string, unknown> }))
    );

    return NextResponse.json(entries, { headers: CACHE });
  } catch (err) {
    console.error("GET /api/v1/leaderboard failed:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500, headers: NO_STORE });
  }
}
