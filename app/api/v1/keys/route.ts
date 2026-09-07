import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createApiKey, listApiKeys, maskApiKey } from "@/lib/apiKeys";
import { verifyBearerUser } from "@/lib/server/userAuth";

// Key-Verwaltung für die Profileinstellungen. Auth über den Firebase-
// ID-Token des eingeloggten Users (Authorization: Bearer <idToken>), NICHTS
// hier läuft über firestore.rules — die apiKeys-Collection ist für Clients
// komplett gesperrt, aller Zugriff passiert über das Admin SDK.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

const createSchema = z.object({
  label: z.string().trim().min(1).max(40),
  scopes: z.array(z.enum(["read", "write"])).min(1).max(2),
});

/** Alle Keys des Users — maskiert, der Klartext wird nie wieder angezeigt. */
export async function GET(request: NextRequest) {
  try {
    const user = await verifyBearerUser(request);
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }

    const keys = await listApiKeys(user.uid);
    return NextResponse.json(
      keys.map((k) => ({
        keyHash: k.keyHash,
        label: k.label,
        scopes: k.scopes,
        createdAt: k.createdAt,
        lastUsedAt: k.lastUsedAt,
        masked: maskApiKey(k.keyHash),
      })),
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("GET /api/v1/keys failed:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500, headers: NO_STORE });
  }
}

/** Neuen Key anlegen — der Klartext kommt EINMAL in der Antwort zurück. */
export async function POST(request: NextRequest) {
  try {
    const user = await verifyBearerUser(request);
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }

    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
    }

    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
    }

    const scopes = [...new Set(parsed.data.scopes)];
    let created;
    try {
      created = await createApiKey(user.uid, parsed.data.label, scopes);
    } catch {
      return NextResponse.json({ error: "key_limit_reached" }, { status: 400, headers: NO_STORE });
    }

    return NextResponse.json(
      {
        key: created.key,
        keyHash: created.keyHash,
        label: created.doc.label,
        scopes: created.doc.scopes,
        createdAt: created.doc.createdAt,
        lastUsedAt: created.doc.lastUsedAt,
      },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("POST /api/v1/keys failed:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500, headers: NO_STORE });
  }
}
