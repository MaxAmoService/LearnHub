import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { revokeApiKey } from "@/lib/apiKeys";
import { verifyBearerUser } from "@/lib/server/userAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

const paramsSchema = z.object({
  keyHash: z.string().regex(/^[a-f0-9]{64}$/),
});

/** Key widerrufen — nur der Besitzer; fremde/fehlende Keys → 404. */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { keyHash: string } }
) {
  try {
    const user = await verifyBearerUser(request);
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }

    const parsed = paramsSchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
    }

    const revoked = await revokeApiKey(user.uid, parsed.data.keyHash);
    if (!revoked) {
      return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
    }

    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (err) {
    console.error("DELETE /api/v1/keys/[keyHash] failed:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500, headers: NO_STORE });
  }
}
