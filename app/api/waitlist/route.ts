import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/waitlist
 *
 * Collects product waitlist signups and forwards them to a Google Sheets
 * Apps Script web app. The Apps Script URL is stored in the environment
 * variable GOOGLE_SHEETS_WAITLIST_URL.
 *
 * To set up the Google Sheets side:
 * 1. Create a Google Sheet with columns: Timestamp, Email, Name, School, Role
 * 2. Go to Extensions > Apps Script
 * 3. Paste this script:
 *
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([
 *        new Date().toISOString(),
 *        data.email || "",
 *        data.name || "",
 *        data.school || "",
 *        data.role || ""
 *      ]);
 *      return ContentService
 *        .createTextOutput(JSON.stringify({ status: "ok" }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 4. Deploy > New deployment > Web app > Execute as "Me", access "Anyone"
 * 5. Copy the URL and set it as GOOGLE_SHEETS_WAITLIST_URL in your .env
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

  if (!sheetsUrl) {
    // If no Google Sheets URL is configured, log to console and still return success
    // so the UI works during development
    console.log("[waitlist] No GOOGLE_SHEETS_WAITLIST_URL configured. Signup:", {
      email,
      name,
      school,
      role,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  try {
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, school, role }),
    });

    if (response.ok) {
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    const text = await response.text();
    console.error("[waitlist] Google Sheets error:", text);
    return NextResponse.json(
      { status: "error", message: "Could not save your signup. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("[waitlist] Fetch error:", err);
    return NextResponse.json(
      { status: "error", message: "Connection issue. Please try again." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "Waitlist endpoint is available. POST to submit." },
    { status: 200 }
  );
}
