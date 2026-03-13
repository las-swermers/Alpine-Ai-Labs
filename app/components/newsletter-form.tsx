"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "duplicate" | "error";
type Resource = "prompt_template_pack" | "mini_webinar" | "early_workshop_access" | "ai_tools_list";

const resources: Array<{ id: Resource; label: string; icon: string }> = [
  { id: "prompt_template_pack", label: "Prompt template pack", icon: "✎" },
  { id: "mini_webinar", label: "Free mini webinar", icon: "▶" },
  { id: "early_workshop_access", label: "Early workshop access", icon: "★" },
  { id: "ai_tools_list", label: "AI tools resource list", icon: "◆" }
];

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource>("prompt_template_pack");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();

    const payload = {
      email: String(formData.get("email") ?? ""),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      role: String(formData.get("role") ?? ""),
      resource: selectedResource,
      source: "landing_hero",
      company: String(formData.get("company") ?? "")
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as { status?: string; message?: string };

      if (response.ok && data.status === "ok") {
        setState("success");
        setMessage("You’re in. Check your inbox for your free resource.");
        event.currentTarget.reset();
        setSelectedResource("prompt_template_pack");
        return;
      }

      if (response.status === 409) {
        setState("duplicate");
        setMessage("You’re already subscribed with that email.");
        return;
      }

      setState("error");
      setMessage(data.message ?? "Something went wrong. Please try again.");
    } catch {
      setState("error");
      setMessage("Connection issue. Please try again in a moment.");
    }
  };

  return (
    <form className="newsletter" onSubmit={handleSubmit}>
      <div className="name-grid">
        <input id="firstName" name="firstName" type="text" placeholder="First name" required autoComplete="given-name" />
        <input id="lastName" name="lastName" type="text" placeholder="Last name" required autoComplete="family-name" />
      </div>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Work email address"
        required
        autoComplete="email"
      />

      <select id="role" name="role" required defaultValue="">
        <option value="" disabled>
          Your role...
        </option>
        <option value="teacher">Teacher</option>
        <option value="counselor">Counselor</option>
        <option value="tech_director">Tech director</option>
        <option value="administrator">Administrator</option>
      </select>

      <div>
        <p className="resource-label">Choose your free resource:</p>
        <div className="resource-grid">
          {resources.map((resource) => (
            <button
              key={resource.id}
              type="button"
              className={`resource-card ${selectedResource === resource.id ? "active" : ""}`}
              onClick={() => setSelectedResource(resource.id)}
            >
              <span className="resource-icon">{resource.icon}</span>
              <span>{resource.label}</span>
            </button>
          ))}
        </div>
      </div>

      <input type="hidden" name="resource" value={selectedResource} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

      <button type="submit" disabled={state === "loading"} className="btn btn-primary form-submit">
        {state === "loading" ? "Submitting..." : "Get free resource + join newsletter"}
      </button>
      <p className="consent">No spam. Unsubscribe anytime. We respect your inbox.</p>
      {message ? <p className={`status ${state}`}>{message}</p> : null}
    </form>
  );
}
