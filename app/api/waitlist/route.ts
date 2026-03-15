import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/waitlist
 *
 * Collects Beacon product waitlist signups and forwards them to a
 * Google Sheets Apps Script web app. Fire-and-forget pattern —
 * returns success immediately after validation.
 *
 * Environment variable: GOOGLE_SHEETS_WAITLIST_URL
 */
export async function POST(request: NextRequest) {
  let body: {
    email?: string;
    name?: string;
    school?: string;
    role?: string;
    company?: string; // honeypot
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

  const name = body.name?.trim() ?? "";
  const school = body.school?.trim() ?? "";
  const role = body.role?.trim() ?? "";

  const sheetsUrl = (process.env.GOOGLE_SHEETS_WAITLIST_URL || "").trim();

  if (sheetsUrl) {
    // Fire and forget — don't await the response
    fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, school, role }),
      redirect: "follow",
    }).catch((err) => {
      console.error("[waitlist] Google Sheets write failed:", err);
    });
  } else {
    console.log("[waitlist] No GOOGLE_SHEETS_WAITLIST_URL configured. Signup:", {
      email, name, school, role,
      timestamp: new Date().toISOString(),
    });
  }

  // Return success immediately — data write happens in background
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "Waitlist endpoint is available. POST to submit." },
    { status: 200 }
  );
}
