"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type FormState = "idle" | "loading" | "success" | "duplicate" | "error";
type InterestType = "next_webinar_input" | "in_person_workshops" | "ai_resource_toolkit" | "email_newsletter";
type PromptType =
  | "teachers_prompt_pack"
  | "counselors_prompt_kit"
  | "group_project_generator"
  | "iep_accommodation_assistant"
  | "admin_tech_starter_pack"
  | "student_facing_prompt_pack"
  | "alpine_ai_tools_guide";

const interestOptions: Array<{ id: InterestType; label: string; helper: string }> = [
  {
    id: "next_webinar_input",
    label: "Help shape our next webinar",
    helper: "Tell us what your team needs, then get first access to register."
  },
  {
    id: "in_person_workshops",
    label: "Only in-person workshop updates",
    helper: "Get alerts for onsite training dates and locations only."
  },
  {
    id: "ai_resource_toolkit",
    label: "Download AI resource toolkits",
    helper: "Pick role-specific prompt packs and download them instantly."
  },
  {
    id: "email_newsletter",
    label: "Weekly AI newsletter only",
    helper: "Receive practical school AI tips without event emails."
  }
];

const promptOptions: Array<{ id: PromptType; label: string; helper: string }> = [
  { id: "teachers_prompt_pack", label: "Teacher's AI Prompt Pack", helper: "Lesson planning and feedback prompts." },
  { id: "counselors_prompt_kit", label: "Counselor's AI Prompt Kit", helper: "Student support and documentation prompts." },
  { id: "group_project_generator", label: "Group Project Generator", helper: "Team activity scaffolds and rubrics." },
  {
    id: "iep_accommodation_assistant",
    label: "IEP and Accommodation Assistant",
    helper: "Support plans and differentiated instruction prompts."
  },
  {
    id: "admin_tech_starter_pack",
    label: "Admin and Tech Director Starter Pack",
    helper: "Policy, rollout, and implementation prompts."
  },
  {
    id: "student_facing_prompt_pack",
    label: "Student-Facing Prompt Pack",
    helper: "Age-appropriate prompts students can use directly."
  },
  { id: "alpine_ai_tools_guide", label: "Alpine AI Tools Guide", helper: "Quick tool overview for school workflows." }
];

const promptDownloads: Record<PromptType, Array<{ label: string; href: string }>> = {
  teachers_prompt_pack: [
    { label: "Teacher's AI Prompt Pack", href: "/ai-download-docs/teachers-ai-prompt-pack.txt" },
    { label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }
  ],
  counselors_prompt_kit: [
    { label: "Counselor's AI Prompt Kit", href: "/ai-download-docs/counselors-ai-prompt-kit.txt" },
    { label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }
  ],
  group_project_generator: [
    { label: "Group Project Generator", href: "/ai-download-docs/group-project-generator.txt" },
    { label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }
  ],
  iep_accommodation_assistant: [
    { label: "IEP and Accommodation Assistant", href: "/ai-download-docs/iep-and-accommodation-assistant.txt" },
    { label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }
  ],
  admin_tech_starter_pack: [
    { label: "Admin and Tech Director Starter Pack", href: "/ai-download-docs/admin-tech-director-starter-pack.txt" },
    { label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }
  ],
  student_facing_prompt_pack: [
    { label: "Student-Facing Prompt Pack", href: "/ai-download-docs/student-facing-prompt-pack.txt" },
    { label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }
  ],
  alpine_ai_tools_guide: [{ label: "Alpine AI Tools Guide", href: "/ai-download-docs/alpine-ai-tools-guide.txt" }]
};

export function NewsletterForm() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [interestType, setInterestType] = useState<InterestType | null>(null);
  const [promptType, setPromptType] = useState<PromptType>("teachers_prompt_pack");

  const downloads = useMemo(() => promptDownloads[promptType], [promptType]);

  const closeModal = () => {
    setOpen(false);
    setStep(1);
    setState("idle");
    setMessage("");
    if (window.location.hash === "#newsletter-signup") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#newsletter-signup") {
        setOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  const nextFromInterest = () => {
    if (!interestType) {
      return;
    }

    if (interestType === "ai_resource_toolkit") {
      setStep(2);
      return;
    }

    setStep(3);
  };


  const handleContinue = () => {
    if (step === 1) {
      nextFromInterest();
      return;
    }

    setStep(3);
  };
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
      resource: interestType ?? "email_newsletter",
      promptType,
      source: "landing_popup",
      company: String(formData.get("company") ?? ""),
      webinarIdeas: String(formData.get("webinarIdeas") ?? "").trim()
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
        setMessage(
          interestType === "ai_resource_toolkit"
            ? "You’re in. Your selected downloads are ready below."
            : "You’re in. Check your inbox for updates."
        );
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
    <>
      <div className="popup-trigger-wrap">
        <button
          type="button"
          className="btn btn-accent"
          onClick={() => {
            window.location.hash = "newsletter-signup";
            setOpen(true);
          }}
        >
          Get your free AI toolkit
        </button>
      </div>

      {open ? (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Newsletter and resources popup">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Alpine AI Labs</p>
                <h3>Choose the updates and resources you want</h3>
              </div>
              <button type="button" className="modal-close" onClick={closeModal} aria-label="Close popup">
                ×
              </button>
            </div>

            <p className="modal-step">Step {step} of 3 · Pick your best-fit option</p>

            {step === 1 ? (
              <div className="option-grid">
                {interestOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-card ${interestType === option.id ? "active" : ""}`}
                    onClick={() => setInterestType(option.id)}
                  >
                    <strong>{option.label}</strong>
                    <span>{option.helper}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="option-grid">
                {promptOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-card ${promptType === option.id ? "active" : ""}`}
                    onClick={() => setPromptType(option.id)}
                  >
                    <strong>{option.label}</strong>
                    <span>{option.helper}</span>
                  </button>
                ))}
                <div className="download-preview">
                  <p>Downloads included:</p>
                  <ul>
                    {downloads.map((item) => (
                      <li key={item.href}>{item.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <form className="newsletter" onSubmit={handleSubmit}>
                <div className="name-grid">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                    autoComplete="given-name"
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    autoComplete="family-name"
                  />
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

                {interestType === "next_webinar_input" ? (
                  <textarea
                    id="webinarIdeas"
                    name="webinarIdeas"
                    placeholder="What topics, challenges, or tools should we cover in the next webinar?"
                    rows={4}
                  />
                ) : null}

                <input type="hidden" name="resource" value={interestType ?? "email_newsletter"} />
                <input type="hidden" name="promptType" value={promptType} />
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

                <button type="submit" disabled={state === "loading"} className="btn btn-primary form-submit">
                  {state === "loading" ? "Submitting..." : "Get your selection"}
                </button>
                <p className="consent">No spam. Unsubscribe anytime. We respect your inbox.</p>
                {message ? <p className={`status ${state}`}>{message}</p> : null}

                {state === "success" && interestType === "ai_resource_toolkit" ? (
                  <div className="download-links">
                    {downloads.map((item) => (
                      <a key={item.href} href={item.href} download>
                        Download {item.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </form>
            ) : null}

            <div className="modal-actions">
              {step > 1 ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep((current) => (current === 3 && interestType !== "ai_resource_toolkit" ? 1 : (current - 1) as 1 | 2 | 3))}
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button type="button" className="btn btn-accent" onClick={handleContinue} disabled={step === 1 && !interestType}>
                  Continue
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
