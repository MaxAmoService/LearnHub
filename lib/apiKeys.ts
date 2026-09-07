// ============================================================================
// API-Keys — Server-seitige Verwaltung (ausschließlich Admin SDK)
// ============================================================================
//
// Keys liegen in apiKeys/{keyHash} (SHA-256-Hex des Klartext-Keys). Die
// Collection ist für Clients KOMPLETT gesperrt (firestore.rules) — Lese- und
// Schreibzugriff laufen ausschließlich über diese Funktionen mit dem Admin
// SDK, das die Rules umgeht. Jede Route muss deshalb selbst prüfen, wessen
// Daten sie ausliefert.
//
// Der Klartext-Key wird nur bei der Erstellung EINMAL angezeigt; in der DB
// liegt ausschließlich der Hash.
//
// Rate-Limit: bewusst NICHT in-memory — auf Vercel (Serverless) trifft jede
// Anfrage potenziell eine frische Instanz, ein In-Memory-Zähler griffe also
// praktisch nie. Stattdessen liegt das Zeitfenster (Start + Zähler, getrennt
// nach read/write) AM apiKeys-Dokument und wird in derselben Transaktion wie
// lastUsedAt fortgeschrieben. Kosten: 1 Write pro authentifiziertem Request
// (~290 Writes/Tag bei 5-Minuten-Poll) — bewusst in Kauf genommen, bei mehr
// Geräten einfach die Limits anpassen.

import { createHash, randomBytes } from "node:crypto";
import { getAdminDb } from "./firebaseAdmin";

export type ApiKeyScope = "read" | "write";

export interface ApiKeyDoc {
  uid: string;
  label: string;
  scopes: ApiKeyScope[];
  /** ISO-String (UTC) — Konvention wie überall in Firestore. */
  createdAt: string;
  /** ISO-String (UTC) oder null. Wird höchstens einmal pro Stunde geschrieben. */
  lastUsedAt: string | null;
  /** Fixed-Window-Zähler für read-Scope-Routen (epoch ms + Anzahl). */
  rateReadWindowStart: number;
  rateReadCount: number;
  /** Fixed-Window-Zähler für write-Scope-Routen (epoch ms + Anzahl). */
  rateWriteWindowStart: number;
  rateWriteCount: number;
}

export interface RateLimitWindow {
  limit: number;
  windowMs: number;
}

/** GET-Routen (5-Minuten-Poll eines Widgets = 12 Requests/min) — großzügig. */
export const READ_RATE_LIMIT: RateLimitWindow = { limit: 60, windowMs: 60_000 };
/** POST-Routen (Abhaken) — selten, aber ein Fehler-Loop darf nicht ballern. */
export const WRITE_RATE_LIMIT: RateLimitWindow = { limit: 20, windowMs: 60_000 };

/** lastUsedAt wird höchstens einmal pro Stunde geschrieben (Poll-Schonung). */
const LAST_USED_MIN_INTERVAL_MS = 60 * 60 * 1000;

const MAX_KEYS_PER_USER = 10;

export type KeyAuthResult =
  | { status: "ok"; uid: string; keyHash: string }
  | { status: "invalid" }
  | { status: "forbidden" }
  | { status: "rate_limited"; retryAfterMs: number };

type TxResult =
  | { kind: "invalid" }
  | { kind: "forbidden" }
  | { kind: "limited"; retryAfterMs: number }
  | { kind: "ok"; uid: string; keyHash: string };

/** Neuer Klartext-Key: "sk_" + 48 Hex-Zeichen (192 Bit Zufall). */
export function generateApiKey(): string {
  return `sk_${randomBytes(24).toString("hex")}`;
}

/** SHA-256-Hex — gleichzeitig die Dokument-ID in apiKeys. */
export function hashApiKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

/** Maskierte Anzeige: nur die letzten 4 Zeichen des Hashes. */
export function maskApiKey(keyHash: string): string {
  return `sk-...${keyHash.slice(-4)}`;
}

/**
 * Authentifiziert einen X-API-Key-Request: Hash-Lookup, Scope-Check und
 * Rate-Limit in EINER Transaktion am Key-Dokument. Schreibt dabei den
 * Fensterzähler fort und — höchstens einmal pro Stunde — lastUsedAt.
 *
 * `status === "invalid"` deckt fehlenden UND unbekannten Key ab: Ein Angreifer
 * soll nicht unterscheiden können, welcher Fall vorliegt.
 */
export async function authenticateApiKey(
  rawKey: string | null | undefined,
  scope: ApiKeyScope,
  limit: RateLimitWindow
): Promise<KeyAuthResult> {
  if (!rawKey || typeof rawKey !== "string" || rawKey.length < 8) {
    return { status: "invalid" };
  }

  const keyHash = hashApiKey(rawKey);
  const db = getAdminDb();
  const ref = db.collection("apiKeys").doc(keyHash);
  const nowMs = Date.now();

  const result = await db.runTransaction(async (tx): Promise<TxResult> => {
    const snap = await tx.get(ref);
    if (!snap.exists) return { kind: "invalid" };
    const data = snap.data() as Partial<ApiKeyDoc>;

    if (!Array.isArray(data.scopes) || !data.scopes.includes(scope)) {
      return { kind: "forbidden" };
    }

    const isRead = scope === "read";
    // Defensiv: Bestands-Docs ohne Zähler-Felder starten bei 0.
    const windowStart = isRead ? data.rateReadWindowStart ?? 0 : data.rateWriteWindowStart ?? 0;
    const count = isRead ? data.rateReadCount ?? 0 : data.rateWriteCount ?? 0;
    const windowExpired = nowMs - windowStart >= limit.windowMs;

    if (!windowExpired && count >= limit.limit) {
      return { kind: "limited", retryAfterMs: windowStart + limit.windowMs - nowMs };
    }

    const patch: Record<string, unknown> = {};
    if (isRead) {
      patch.rateReadWindowStart = windowExpired ? nowMs : windowStart;
      patch.rateReadCount = windowExpired ? 1 : count + 1;
    } else {
      patch.rateWriteWindowStart = windowExpired ? nowMs : windowStart;
      patch.rateWriteCount = windowExpired ? 1 : count + 1;
    }
    if (!data.lastUsedAt || nowMs - new Date(data.lastUsedAt).getTime() >= LAST_USED_MIN_INTERVAL_MS) {
      patch.lastUsedAt = new Date(nowMs).toISOString();
    }
    await tx.update(ref, patch);

    return { kind: "ok", uid: data.uid ?? "", keyHash };
  });

  switch (result.kind) {
    case "invalid":
      return { status: "invalid" };
    case "forbidden":
      return { status: "forbidden" };
    case "limited":
      return { status: "rate_limited", retryAfterMs: result.retryAfterMs };
    case "ok":
      return { status: "ok", uid: result.uid, keyHash: result.keyHash };
  }
}

/** Legt einen neuen Key an (Klartext wird NUR hier zurückgegeben). */
export async function createApiKey(
  uid: string,
  label: string,
  scopes: ApiKeyScope[]
): Promise<{ key: string; keyHash: string; doc: ApiKeyDoc }> {
  const db = getAdminDb();

  const existing = await db
    .collection("apiKeys")
    .where("uid", "==", uid)
    .count()
    .get();
  if (existing.data().count >= MAX_KEYS_PER_USER) {
    throw new Error(`Maximal ${MAX_KEYS_PER_USER} Keys pro Nutzer`);
  }

  const key = generateApiKey();
  const keyHash = hashApiKey(key);
  const now = new Date().toISOString();

  const doc: ApiKeyDoc = {
    uid,
    label,
    scopes,
    createdAt: now,
    lastUsedAt: null,
    rateReadWindowStart: 0,
    rateReadCount: 0,
    rateWriteWindowStart: 0,
    rateWriteCount: 0,
  };
  await db.collection("apiKeys").doc(keyHash).set(doc);

  return { key, keyHash, doc };
}

/** Alle Keys eines Users, neueste zuerst. */
export async function listApiKeys(
  uid: string
): Promise<Array<ApiKeyDoc & { keyHash: string }>> {
  const db = getAdminDb();
  const snap = await db.collection("apiKeys").where("uid", "==", uid).get();
  return snap.docs
    .map((d) => ({ ...(d.data() as ApiKeyDoc), keyHash: d.id }))
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
}

/** Widerruft einen Key — nur wenn er dem User gehört. `false` = fremd/fehlt. */
export async function revokeApiKey(uid: string, keyHash: string): Promise<boolean> {
  const db = getAdminDb();
  const ref = db.collection("apiKeys").doc(keyHash);
  const snap = await ref.get();
  if (!snap.exists) return false;
  if ((snap.data() as Partial<ApiKeyDoc>).uid !== uid) return false;
  await ref.delete();
  return true;
}
