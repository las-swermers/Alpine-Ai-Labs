"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "duplicate" | "error";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      name: String(formData.get("name") ?? ""),
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
        setMessage("You’re in. Check your inbox for the welcome email.");
        event.currentTarget.reset();
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
      <div className="field-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Alex Rivera" autoComplete="name" />
      </div>
      <div className="field-row">
        <label htmlFor="email">School email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@district.edu"
          required
          autoComplete="email"
        />
      </div>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

      <button type="submit" disabled={state === "loading"} className="btn btn-primary">
        {state === "loading" ? "Submitting..." : "Get practical AI playbooks"}
      </button>
      <p className="consent">
        By submitting, you agree to receive updates from Alpine AI Labs. Unsubscribe anytime.
      </p>
      {message ? <p className={`status ${state}`}>{message}</p> : null}
    </form>
  );
}
