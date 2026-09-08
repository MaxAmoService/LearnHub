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
// Ablehnungen werden serverseitig mit Grund geloggt (console.error, ohne
// Token-Inhalte). firebase-admin/auth hier NICHT wieder hinzufügen.

import { createRemoteJWKSet, errors, jwtVerify, type JWTVerifyGetKey } from "jose";

const FIREBASE_JWKS_URI =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

export function getFirebaseIssuer(projectId: string): string {
  return `https://securetoken.google.com/${projectId}`;
}

/**
 * Ablehnungsgrund serverseitig loggen — NUR Grund und erwartete vs.
 * erhaltene Projekt-ID/Issuer, niemals Token-Inhalte oder Secrets.
 */
function logRejection(err: unknown, projectId: string): void {
  if (err instanceof errors.JWTExpired) {
    console.error(`[idToken] Ablehnung: Token abgelaufen (exp) — Project-ID ${projectId}`);
    return;
  }
  if (err instanceof errors.JWTClaimValidationFailed) {
    const claim = err.claim;
    if (claim === "iss") {
      console.error(
        `[idToken] Ablehnung: falscher Issuer — erwartet ${getFirebaseIssuer(projectId)}, erhalten ${String(err.payload?.iss ?? "?")}`
      );
    } else if (claim === "aud") {
      console.error(
        `[idToken] Ablehnung: falsche Audience — erwartet Project-ID ${projectId}, erhalten ${String(err.payload?.aud ?? "?")}`
      );
    } else {
      console.error(`[idToken] Ablehnung: Claim "${claim}" ungültig — Project-ID ${projectId}`);
    }
    return;
  }
  if (err instanceof errors.JWSSignatureVerificationFailed) {
    console.error(`[idToken] Ablehnung: Signatur ungültig — Project-ID ${projectId}`);
    return;
  }
  if (err instanceof errors.JWKSNoMatchingKey || err instanceof errors.JWKSMultipleMatchingKeys) {
    console.error(
      `[idToken] Ablehnung: kein passender Schlüssel in Googles JWKS (kid/alg) — Project-ID ${projectId}`
    );
    return;
  }
  if (err instanceof errors.JWKSTimeout) {
    console.error(`[idToken] Ablehnung: JWKS-Abruf Timeout — Project-ID ${projectId}`);
    return;
  }
  if (err instanceof errors.JWSInvalid || err instanceof errors.JWTInvalid) {
    console.error(`[idToken] Ablehnung: Token nicht parsebar — Project-ID ${projectId}`);
    return;
  }
  if (err instanceof errors.JOSEError) {
    console.error(`[idToken] Ablehnung: ${err.message} — Project-ID ${projectId}`);
    return;
  }
  console.error(
    `[idToken] Ablehnung: ${err instanceof Error ? err.message : String(err)} — Project-ID ${projectId}`
  );
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
      console.error(
        `[idToken] Ablehnung: sub-Claim fehlt oder ungültig — Project-ID ${projectId}`
      );
      return null;
    }
    return { uid: payload.sub };
  } catch (err) {
    logRejection(err, projectId);
    return null;
  }
}
