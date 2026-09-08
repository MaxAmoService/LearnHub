// ============================================================================
// Firebase Admin SDK — Server-Runtime-Singleton (Route Handler & Skripte)
// ============================================================================
//
// Wird AUSSCHLIESSLICH in Route Handlern (app/api/...) und Skripten verwendet —
// NIE in Client-Komponenten importieren: firebase-admin ist server-only und
// darf nicht ins Client-Bundle.
//
// Credentials: eine einzelne Env-Variable FIREBASE_SERVICE_ACCOUNT mit dem
// base64-kodierten Service-Account-JSON. NIEMALS mit NEXT_PUBLIC_-Prefix —
// alles mit dem Prefix landet im ausgelieferten Client-JavaScript!
// Fehlt die Variable, fällt auf GOOGLE_APPLICATION_CREDENTIALS / gcloud ADC
// zurück (lokale Skripte).
//
// Singleton über globalThis: Next.js-Hot-Reload würde bei Modul-Level-Init
// mehrere App-Instanzen erzeugen.

// Achtung: firebase-admin/auth hier NICHT importieren — es zieht jwks-rsa →
// jose@6 nach und crasht auf Vercel (ERR_REQUIRE_ESM). ID-Token-Verifikation
// läuft stattdessen über lib/server/idToken.ts (jose direkt, gebündelt).
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const globalForAdmin = globalThis as unknown as {
  adminApp?: App;
};

function buildApp(): App {
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (encoded) {
    const json = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
    return initializeApp({ credential: cert(json) });
  }
  // ADC: GOOGLE_APPLICATION_CREDENTIALS bzw. gcloud-Login (Skripte/CI).
  return initializeApp();
}

function getAdminApp(): App {
  if (!globalForAdmin.adminApp) {
    globalForAdmin.adminApp = getApps().length === 0 ? buildApp() : getApps()[0];
  }
  return globalForAdmin.adminApp;
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminProjectId(): string | undefined {
  return (
    getAdminApp().options.projectId ??
    process.env.GOOGLE_CLOUD_PROJECT ??
    process.env.GCLOUD_PROJECT
  );
}
