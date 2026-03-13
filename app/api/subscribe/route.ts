import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type KitErrorResponse = { error?: string; message?: string };

function getKitConfig() {
  const apiKey = process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY || "";
  const apiSecret = process.env.KIT_API_SECRET || process.env.CONVERTKIT_API_SECRET || "";
  const formId = process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID || "";
  const tagId = process.env.KIT_TAG_ID || process.env.CONVERTKIT_TAG_ID || "";

  return {
    apiKey,
    apiSecret,
    formId: formId.trim(),
    tagId: tagId.trim()
  };
}

async function parseKitError(response: Response) {
  const text = await response.text();
  if (!text) {
    return "Kit request failed.";
  }

  try {
    const parsed = JSON.parse(text) as KitErrorResponse;
    return parsed.message || parsed.error || text;
  } catch {
    return text;
  }
}

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
    promptType?: string;
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
  const promptType = body.promptType?.trim() || "none_selected";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ status: "error", message: "Invalid email address." }, { status: 400 });
  }

  const { apiKey, apiSecret, formId, tagId } = getKitConfig();

  if (!apiKey || (!formId && !tagId)) {
    return NextResponse.json(
      { status: "error", message: "Missing Kit server configuration." },
      { status: 500 }
    );
  }

  const payload: Record<string, unknown> = {
    api_key: apiKey,
    email,
    first_name: name,
    fields: { source, role, resource, prompt_type: promptType }
  };

  const target = formId
    ? `https://api.convertkit.com/v3/forms/${formId}/subscribe`
    : `https://api.convertkit.com/v3/tags/${tagId}/subscribe`;

  if (apiSecret) {
    payload.api_secret = apiSecret;
  }

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }

    const errorMessage = (await parseKitError(response)).toLowerCase();
    if (response.status === 422 && errorMessage.includes("already")) {
      return NextResponse.json({ status: "duplicate" }, { status: 409 });
    }

    return NextResponse.json(
      { status: "error", message: errorMessage || "Kit request failed." },
      { status: response.status }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Could not reach Kit API." },
      { status: 502 }
    );
  }
}
