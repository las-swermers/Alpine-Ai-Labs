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
 * Google Sheets setup:
 * 1. Create a sheet with columns: Timestamp, Email, Name, Role, Resource, Prompt Type, Source
 * 2. Extensions > Apps Script, paste:
 *
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([
 *        new Date().toISOString(),
 *        data.email || "",
 *        data.name || "",
 *        data.role || "",
 *        data.resource || "",
 *        data.promptType || "",
 *        data.source || ""
 *      ]);
 *      return ContentService
 *        .createTextOutput(JSON.stringify({ status: "ok" }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 3. Deploy > New deployment > Web app > Execute as "Me", access "Anyone"
 * 4. Copy the URL and set it as GOOGLE_SHEETS_SUBSCRIBE_URL in Vercel
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

  if (!sheetsUrl) {
    console.log("[subscribe] No GOOGLE_SHEETS_SUBSCRIBE_URL configured. Signup:", {
      email, name, role, resource, promptType, source,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  try {
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, role, resource, promptType, source }),
      redirect: "follow",
    });

    if (response.ok || response.status === 302) {
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    const text = await response.text();
    console.error("[subscribe] Google Sheets error:", response.status, text.slice(0, 500));

    if (response.status >= 300 && response.status < 400) {
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    return NextResponse.json(
      { status: "error", message: "Could not save your signup. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("[subscribe] Fetch error:", err);
    return NextResponse.json(
      { status: "error", message: "Connection issue. Please try again." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "Subscribe endpoint is available. POST to submit." },
    { status: 200 }
  );
}
