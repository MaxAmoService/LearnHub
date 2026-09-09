import { type NextRequest, NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { mapPublicUserProfile } from "@/lib/leaderboard";
import { verifyBearerUser } from "@/lib/server/userAuth";

// Öffentliches Minimal-Profil fürs Leaderboard-Modal. Das Modal brauchte
// bisher bio + createdAt und lud dafür das KOMPLETTE fremde User-Dokument
// clientseitig (getUserProfile). Mit der verschärften users-Regel (nur
// eigene UID lesbar) geht das nicht mehr — diese Route liefert über das
// Admin SDK nur die Positivliste aus mapPublicUserProfile (kein email,
// keine settings, keine clicker*-Felder).
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CACHE = { "Cache-Control": "private, max-age=60" };
const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(
  _request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const user = await verifyBearerUser(_request);
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }

    const uid = params.uid;
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid)) {
      return NextResponse.json({ error: "invalid_uid" }, { status: 400, headers: NO_STORE });
    }

    const db = getAdminDb();
    const snap = await db.collection("users").doc(uid).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
    }

    return NextResponse.json(
      mapPublicUserProfile(snap.id, snap.data() as Record<string, unknown>),
      { headers: CACHE }
    );
  } catch (err) {
    console.error("GET /api/v1/users/[uid]/public failed:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500, headers: NO_STORE });
  }
}
