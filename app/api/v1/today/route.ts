import { type NextRequest, NextResponse } from "next/server";

import { authenticateApiKey, READ_RATE_LIMIT } from "@/lib/apiKeys";
import { formatTodayText } from "@/lib/apiText";
import { buildTodayApiData } from "@/lib/server/todayData";

// Ohne force-dynamic würde Next.js die Antwort statisch cachen — das Widget
// sähe tagelang dieselben Daten. Zusätzlich no-store im Header.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

function baseUrlFromRequest(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  if (!host) return "http://localhost:3000";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const proto =
    forwardedProto === "https"
      ? "https"
      : new URL(request.url).protocol.replace(":", "");
  return `${proto}://${host}`;
}

export async function GET(request: NextRequest) {
  const wantText = request.nextUrl.searchParams.get("format") === "text";

  // Dumme Clients bekommen auch Fehler als reinen Text — nie JSON, nie
  // einen Stacktrace.
  const fail = (status: number, message = "ERR") =>
    wantText
      ? new NextResponse(message, {
          status,
          headers: { ...NO_STORE, "Content-Type": "text/plain; charset=us-ascii" },
        })
      : NextResponse.json({ error: "server_error" }, { status, headers: NO_STORE });

  try {
    const auth = await authenticateApiKey(
      request.headers.get("x-api-key"),
      "read",
      READ_RATE_LIMIT
    );

    if (auth.status === "invalid") {
      return wantText
        ? fail(401, "ERR")
        : NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }
    if (auth.status === "forbidden") {
      return wantText
        ? fail(403, "ERR")
        : NextResponse.json({ error: "forbidden" }, { status: 403, headers: NO_STORE });
    }
    if (auth.status === "rate_limited") {
      return wantText
        ? fail(429, "ERR")
        : NextResponse.json(
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

    const data = await buildTodayApiData(auth.uid, {
      baseUrl: baseUrlFromRequest(request),
    });

    if (wantText) {
      // Dumme Clients ohne JSON-Parser: reiner Text, max. 5 Zeilen à 40 Zeichen.
      return new NextResponse(formatTodayText(data), {
        status: 200,
        headers: { ...NO_STORE, "Content-Type": "text/plain; charset=us-ascii" },
      });
    }

    return NextResponse.json(data, { headers: NO_STORE });
  } catch (err) {
    // Der Text-Endpoint darf NIEMALS einen Stacktrace ausliefern.
    console.error("GET /api/v1/today failed:", err);
    return fail(500);
  }
}
