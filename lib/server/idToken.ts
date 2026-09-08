// ============================================================================
// Firebase-ID-Token-Verifikation — ohne firebase-admin/auth
// ============================================================================
//
// firebase-admin/auth zieht jwks-rsa → jose@6 (reines ESM) nach; jwks-rsa
// greift per require() auf jose zu und crasht damit auf Vercel
// (ERR_REQUIRE_ESM). Deshalb wird die ID-Token-Prüfung hier direkt mit jose
// gegen Googles öffentliche, rotierende JWKS gemacht — der offiziell
// dokumentierte Drittanbieter-Weg (firebase.google.com/docs/auth/admin/
// verify-id-tokens). firebase-admin/firestore bleibt unverändert im Einsatz
// (lädt die jwks-rsa-Kette nicht).
//
// Geprüft wird vollständig wie im Admin SDK: Signatur gegen Googles
// Schlüssel (RS256, kid-Auswahl + Rotation via JWKS-Caching), issuer,
// audience (= Project ID), exp (mit 300 s Clock-Tolerance wie
// clockSkewSeconds im Admin SDK) und sub (nicht leer, ≤ 128 Zeichen).
// firebase-admin/auth hier NICHT wieder hinzufügen.

import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";

const FIREBASE_JWKS_URI =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

export function getFirebaseIssuer(projectId: string): string {
  return `https://securetoken.google.com/${projectId}`;
}

export interface VerifyIdTokenOptions {
  projectId: string;
  /** Injektierbar für Tests; Standard: Googles JWKS mit Rotation/Caching. */
  getKey?: JWTVerifyGetKey;
}

export async function verifyFirebaseIdToken(
  token: string,
  { projectId, getKey }: VerifyIdTokenOptions
): Promise<{ uid: string } | null> {
  try {
    const keyFn = getKey ?? createRemoteJWKSet(new URL(FIREBASE_JWKS_URI));
    const { payload } = await jwtVerify(token, keyFn, {
      issuer: getFirebaseIssuer(projectId),
      audience: projectId,
      algorithms: ["RS256"],
      clockTolerance: 300,
    });
    if (
      typeof payload.sub !== "string" ||
      payload.sub.length === 0 ||
      payload.sub.length > 128
    ) {
      return null;
    }
    return { uid: payload.sub };
  } catch {
    return null;
  }
}
