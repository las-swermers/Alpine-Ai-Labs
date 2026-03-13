import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    resource?: string;
    source?: string;
    company?: string;
  };

  if (body.company) {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const fallbackName = body.name?.trim() ?? "";
  const name = `${firstName} ${lastName}`.trim() || fallbackName;
  const source = body.source?.trim() || "website";
  const role = body.role?.trim() || "unknown";
  const resource = body.resource?.trim() || "none_selected";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ status: "error", message: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.KIT_API_KEY;
  const apiSecret = process.env.KIT_API_SECRET;
  const formId = process.env.KIT_FORM_ID;
  const tagId = process.env.KIT_TAG_ID;

  if (!apiKey || !apiSecret || (!formId && !tagId)) {
    return NextResponse.json(
      { status: "error", message: "Missing Kit server configuration." },
      { status: 500 }
    );
  }

  const endpoint = "https://api.convertkit.com/v3/subscribers";
  const payload: Record<string, unknown> = {
    api_key: apiKey,
    api_secret: apiSecret,
    email,
    first_name: name,
    tags: tagId ? [Number(tagId)] : undefined,
    form_id: formId ? Number(formId) : undefined,
    fields: { source, role, resource }
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { message?: string };
    if (response.ok) {
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    if (response.status === 422 && data.message?.toLowerCase().includes("already")) {
      return NextResponse.json({ status: "duplicate" }, { status: 409 });
    }

    return NextResponse.json(
      { status: "error", message: data.message ?? "Kit request failed." },
      { status: response.status }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Could not reach Kit API." },
      { status: 502 }
    );
  }
}
