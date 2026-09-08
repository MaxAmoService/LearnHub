// ============================================================================
// User-Auth für Route Handler — Firebase-ID-Token (Key-Verwaltungsrouten)
// ============================================================================
//
// Die App authentifiziert sich clientseitig über das Firebase Client SDK
// (keine Session-Cookies). Server-Routen, die den eingeloggten User brauchen
// (apiKeys-Verwaltung), bekommen daher den Firebase-ID-Token per
// `Authorization: Bearer <idToken>`. Die Verifikation läuft über jose gegen
// Googles JWKS (lib/server/idToken.ts) — NICHT über firebase-admin/auth,
// das auf Vercel mit ERR_REQUIRE_ESM crasht (jwks-rsa → jose@6).

import type { NextRequest } from "next/server";
import { getAdminProjectId } from "../firebaseAdmin";
import { verifyFirebaseIdToken } from "./idToken";

export async function verifyBearerUser(
  request: NextRequest
): Promise<{ uid: string } | null> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  if (!token) return null;
  const projectId = getAdminProjectId();
  if (!projectId) {
    console.error(
      "[idToken] Ablehnung: Projekt-ID nicht ermittelbar — Service-Account ohne project_id und kein GOOGLE_CLOUD_PROJECT/GCLOUD_PROJECT gesetzt."
    );
    throw new Error(
      "Projekt-ID für die ID-Token-Verifikation nicht ermittelbar (Service-Account-JSON ohne project_id)."
    );
  }
  return verifyFirebaseIdToken(token, { projectId });
}
