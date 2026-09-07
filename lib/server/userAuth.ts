// ============================================================================
// User-Auth für Route Handler — Firebase-ID-Token (Key-Verwaltungsrouten)
// ============================================================================
//
// Die App authentifiziert sich clientseitig über das Firebase Client SDK
// (keine Session-Cookies). Server-Routen, die den eingeloggten User brauchen
// (apiKeys-Verwaltung), bekommen daher den Firebase-ID-Token per
// `Authorization: Bearer <idToken>` und verifizieren ihn hier gegen das
// Admin SDK.

import type { NextRequest } from "next/server";
import { getAdminAuth } from "../firebaseAdmin";

export async function verifyBearerUser(
  request: NextRequest
): Promise<{ uid: string } | null> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  if (!token) return null;
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return null;
  }
}
