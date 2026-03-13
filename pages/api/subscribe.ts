import type { NextApiRequest, NextApiResponse } from "next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type KitErrorResponse = { error?: string; message?: string };

function getKitConfig() {
  const apiKey = (process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY || "").trim();
  const apiSecret = (process.env.KIT_API_SECRET || process.env.CONVERTKIT_API_SECRET || "").trim();
  const formId = (process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID || "").trim();
  const tagId = (process.env.KIT_TAG_ID || process.env.CONVERTKIT_TAG_ID || "").trim();

  return { apiKey, apiSecret, formId, tagId };
}

function getMissingKitVars(config: ReturnType<typeof getKitConfig>) {
  const missing: string[] = [];

  if (!config.apiKey) {
    missing.push("KIT_API_KEY");
  }

  if (!config.formId && !config.tagId) {
    missing.push("KIT_FORM_ID|KIT_TAG_ID");
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: "error", message: "Method not allowed." });
  }

  const body = (req.body || {}) as {
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
    return res.status(200).json({ status: "ok" });
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
    return res.status(400).json({ status: "error", message: "Invalid email address." });
  }

  const { apiKey, apiSecret, formId, tagId } = getKitConfig();
  const missingVars = getMissingKitVars({ apiKey, apiSecret, formId, tagId });

  if (missingVars.length > 0) {
    return res
      .status(500)
      .json({ status: "error", message: `Missing Kit server configuration: ${missingVars.join(", ")}.` });
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
      return res.status(200).json({ status: "ok" });
    }

    const errorMessage = (await parseKitError(response)).toLowerCase();
    if (response.status === 422 && errorMessage.includes("already")) {
      return res.status(409).json({ status: "duplicate" });
    }

    return res.status(response.status).json({ status: "error", message: errorMessage || "Kit request failed." });
  } catch {
    return res.status(502).json({ status: "error", message: "Could not reach Kit API." });
  }
}
