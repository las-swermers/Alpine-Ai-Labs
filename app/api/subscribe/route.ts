import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type KitErrorResponse = { error?: string; message?: string };

function normalizeEnvValue(value?: string) {
  const normalized = (value || "").trim();
  if (!normalized) {
    return "";
  }

  const lowered = normalized.toLowerCase();
  if (lowered === "undefined" || lowered === "null" || lowered === "none") {
    return "";
  }

  return normalized;
}

function getKitConfig() {
  const apiKey = normalizeEnvValue(process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY);
  const apiSecret = normalizeEnvValue(process.env.KIT_API_SECRET || process.env.CONVERTKIT_API_SECRET);
  const formId = normalizeEnvValue(process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID);
  const tagId = normalizeEnvValue(process.env.KIT_TAG_ID || process.env.CONVERTKIT_TAG_ID);

  return {
    apiKey,
    apiSecret,
    formId,
    tagId
  };
}

function getMissingKitVars(config: ReturnType<typeof getKitConfig>) {
  const missing: string[] = [];

  const hasFormOrTag = Boolean(config.formId || config.tagId);
  const canFallbackToSecret = Boolean(config.apiSecret);

  if (hasFormOrTag && !config.apiKey && !canFallbackToSecret) {
    missing.push("KIT_API_KEY");
  }

  if (!hasFormOrTag && !canFallbackToSecret) {
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
    webinarIdeas?: string;
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
  const webinarIdeas = body.webinarIdeas?.trim() || "";

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
    fields: {
      source,
      role,
      resource,
      prompt_type: promptType,
      ...(webinarIdeas ? { webinar_ideas: webinarIdeas } : {})
    }
  };

  const shouldUseFormOrTag = Boolean((formId || tagId) && apiKey);

  const target = shouldUseFormOrTag && formId
    ? `https://api.convertkit.com/v3/forms/${formId}/subscribe`
    : shouldUseFormOrTag && tagId
      ? `https://api.convertkit.com/v3/tags/${tagId}/subscribe`
      : "https://api.convertkit.com/v3/subscribers";

  if (shouldUseFormOrTag) {
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

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "Subscribe endpoint is available. Send a POST request with JSON payload to subscribe."
    },
    { status: 200 }
  );
}
