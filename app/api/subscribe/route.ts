import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type KitErrorResponse = { error?: string; message?: string };

function getKitConfig() {
  const apiKey = (process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY || "").trim();
  const apiSecret = (process.env.KIT_API_SECRET || process.env.CONVERTKIT_API_SECRET || "").trim();
  const formId = process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID || "";
  const tagId = process.env.KIT_TAG_ID || process.env.CONVERTKIT_TAG_ID || "";

  return {
    apiKey,
    apiSecret,
    formId: formId.trim(),
    tagId: tagId.trim()
  };
}

function getMissingKitVars(config: ReturnType<typeof getKitConfig>) {
  const missing: string[] = [];

  const hasFormOrTag = Boolean(config.formId || config.tagId);
  if (hasFormOrTag && !config.apiKey) {
    missing.push("KIT_API_KEY");
  }

  if (!hasFormOrTag && !config.apiSecret) {
    missing.push("KIT_FORM_ID|KIT_TAG_ID|KIT_API_SECRET");
  }

  return missing;
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

  if (body.company) {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const fallbackName = body.name?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || fallbackName;
  const source = body.source?.trim() || "website";
  const role = body.role?.trim() || "unknown";
  const resource = body.resource?.trim() || "none_selected";
  const promptType = body.promptType?.trim() || "none_selected";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ status: "error", message: "Invalid email address." }, { status: 400 });
  }

  const { apiKey, apiSecret, formId, tagId } = getKitConfig();
  const missingVars = getMissingKitVars({ apiKey, apiSecret, formId, tagId });

  if (missingVars.length > 0) {
    return NextResponse.json(
      {
        status: "error",
        message: `Missing Kit server configuration: ${missingVars.join(", ")}.`
      },
      { status: 500 }
    );
  }

  const payload: Record<string, unknown> = {
    email,
    first_name: firstName || fullName,
    ...(lastName ? { last_name: lastName } : {}),
    fields: { source, role, resource, prompt_type: promptType }
  };

  const target = formId
    ? `https://api.convertkit.com/v3/forms/${formId}/subscribe`
    : tagId
      ? `https://api.convertkit.com/v3/tags/${tagId}/subscribe`
      : "https://api.convertkit.com/v3/subscribers";

  if (formId || tagId) {
    payload.api_key = apiKey;
  }

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
