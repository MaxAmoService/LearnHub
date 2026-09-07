import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authenticateApiKey, WRITE_RATE_LIMIT } from "@/lib/apiKeys";
import { qualityFromRatio } from "@/lib/exercises/scoring";
import { applyPlanItemReviewAdmin } from "@/lib/server/planReviewAdmin";

// Ohne force-dynamic würde Next.js die Antwort statisch cachen.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

const idSchema = z.string().min(1).max(200).regex(/^[^/]+$/);

/**
 * Entweder Selbsteinschätzung (quality 0-5, wie checkOffPlanItem) oder
 * Trefferquote (correct/total, wie completePlanItemExercise — die SM-2-
 * Qualität kommt dann aus lib/exercises/scoring.ts).
 */
const bodySchema = z.union([
  z.object({
    planItemId: idSchema,
    planId: idSchema,
    quality: z.number().int().min(0).max(5),
  }),
  z.object({
    planItemId: idSchema,
    planId: idSchema,
    correct: z.number().int().min(0),
    total: z.number().int().min(1),
  }),
]);

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateApiKey(
      request.headers.get("x-api-key"),
      "write",
      WRITE_RATE_LIMIT
    );

    if (auth.status === "invalid") {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }
    if (auth.status === "forbidden") {
      return NextResponse.json({ error: "forbidden" }, { status: 403, headers: NO_STORE });
    }
    if (auth.status === "rate_limited") {
      return NextResponse.json(
        { error: "rate_limited" },
        {
          status: 429,
          headers: {
            ...NO_STORE,
            "Retry-After": String(Math.max(1, Math.ceil(auth.retryAfterMs / 1000))),
          },
        }
      );
    }

    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
    }

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
    }
    const body = parsed.data;

    const quality =
      "quality" in body
        ? body.quality
        : qualityFromRatio(body.correct, body.total);
    const attempt =
      "correct" in body
        ? {
            at: new Date().toISOString(),
            correct: Math.max(0, body.correct),
            total: body.total,
          }
        : null;

    const result = await applyPlanItemReviewAdmin(
      auth.uid,
      body.planId,
      body.planItemId,
      quality,
      attempt
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.reason },
        { status: result.reason === "forbidden" ? 403 : 404, headers: NO_STORE }
      );
    }

    return NextResponse.json({ ok: true, nextDueAt: result.nextDueAt }, { headers: NO_STORE });
  } catch (err) {
    console.error("POST /api/v1/log failed:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500, headers: NO_STORE });
  }
}
