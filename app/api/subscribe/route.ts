import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/subscribe
 *
 * Collects consulting page signups (newsletter + resource downloads) and
 * forwards them to a Google Sheets Apps Script web app.
 *
 * Environment variable: GOOGLE_SHEETS_SUBSCRIBE_URL
 *
 * The request to Google Sheets is fire-and-forget — we return success
 * immediately after validation so the user gets instant feedback and
 * downloads. The Google Sheets write happens in the background.
 */
export async function POST(request: NextRequest) {
  let body: {
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    resource?: string;
    source?: string;
    company?: string;
    promptType?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Honeypot check
  if (body.company) {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { status: "error", message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const fallbackName = body.name?.trim() ?? "";
  const name = `${firstName} ${lastName}`.trim() || fallbackName;
  const role = body.role?.trim() || "";
  const resource = body.resource?.trim() || "";
  const promptType = body.promptType?.trim() || "";
  const source = body.source?.trim() || "website";

  const sheetsUrl = (process.env.GOOGLE_SHEETS_SUBSCRIBE_URL || "").trim();

  if (sheetsUrl) {
    // Fire and forget — don't await the response
    fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, role, resource, promptType, source }),
      redirect: "follow",
    }).catch((err) => {
      console.error("[subscribe] Google Sheets write failed:", err);
    });
  } else {
    console.log("[subscribe] No GOOGLE_SHEETS_SUBSCRIBE_URL configured. Signup:", {
      email, name, role, resource, promptType, source,
      timestamp: new Date().toISOString(),
    });
  }

  // Return success immediately — data write happens in background
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "Subscribe endpoint is available. POST to submit." },
    { status: 200 }
  );
}
