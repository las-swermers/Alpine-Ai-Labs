"use client";

import { useEffect, useRef, useState } from "react";

const C = {
  bg: "#030712",
  surface: "#0F172A",
  card: "#1E293B",
  border: "#334155",
  text: "#E2E8F0",
  textMuted: "#94A3B8",
  textDim: "#64748B",
  mint: "#10B981",
  mintDark: "#059669",
  blue: "#3B82F6",
  purple: "#A855F7",
  cyan: "#06B6D4",
  amber: "#F59E0B",
  red: "#EF4444",
  white: "#FFFFFF"
};

const domains = [
  { title: "Academic Performance", color: C.blue, points: ["Department trends", "At-risk identification", "Curriculum effectiveness"] },
  { title: "Admissions & Enrollment", color: C.mint, points: ["Pipeline visibility", "Yield prediction", "Source attribution"] },
  { title: "Student Wellbeing", color: C.amber, points: ["Attendance patterns", "Caseload balancing", "Intervention tracking"] },
  { title: "Staff & HR", color: C.purple, points: ["Retention analytics", "PD tracking", "Workload distribution"] },
  { title: "Financial Overview", color: C.cyan, points: ["Budget vs. actual", "Collection visibility", "Forecast insights"] }
];

function Icon({ name, color = C.textMuted, size = 18 }: { name: string; color?: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const d: Record<string, JSX.Element> = {
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
    bar: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>
  };
  return <svg {...p}>{d[name]}</svg>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)", transition: `all .65s ease ${delay}s` }}>{children}</div>;
}

function DomainCard({ domain }: { domain: (typeof domains)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ border: `1px solid ${hover ? `${domain.color}55` : C.border}`, background: C.card, borderRadius: 14, padding: 18, transition: "all .2s ease" }}>
      <h3 style={{ margin: "0 0 10px", color: domain.color, fontSize: 16 }}>{domain.title}</h3>
      {domain.points.map((p) => (
        <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: C.text, fontSize: 13 }}>
          <Icon name="check" color={domain.color} size={14} />
          <span>{p}</span>
        </div>
      ))}
    </article>
  );
}

export default function ProductPage() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [joined, setJoined] = useState(false);
  const [modalEmail, setModalEmail] = useState("");

  return (
    <main style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`html { scroll-behavior:smooth; } @media (max-width:768px){ .grid3{ grid-template-columns:1fr !important; } .split{ flex-direction:column !important; } }`}</style>

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 20, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: `1px solid ${C.border}`, background: "rgba(3,7,18,.8)", backdropFilter: "blur(8px)" }}>
        <strong>Alpine AI Labs</strong>
        <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/" style={{ color: C.textMuted, textDecoration: "none", fontSize: 14 }}>Consulting</a>
          <a href="#features" style={{ color: C.textMuted, textDecoration: "none", fontSize: 14 }}>Features</a>
          <button onClick={() => setShowModal(true)} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 18, padding: "8px 14px" }}>Join Waitlist</button>
        </nav>
      </header>

      <section style={{ padding: "120px 24px 80px", minHeight: "88vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div style={{ maxWidth: 840 }}>
          <Reveal>
            <p style={{ color: C.mint, textTransform: "uppercase", letterSpacing: 1.2, fontSize: 12, fontWeight: 700 }}>Coming soon</p>
            <h1 style={{ fontSize: 58, lineHeight: 1.08, margin: "8px 0" }}>Your school runs on 12 apps.<br /><span style={{ color: C.mint }}>Decisions shouldn&apos;t.</span></h1>
            <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.6, maxWidth: 620, margin: "18px auto 0" }}>Alpine unifies SIS, LMS, admissions, wellbeing, and operations data into one decision layer for school leaders.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => setShowModal(true)} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 22, padding: "12px 20px", fontWeight: 600 }}>Join the waitlist</button>
              <a href="#features" style={{ border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 22, textDecoration: "none", padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 6 }}>See features <Icon name="arrowRight" size={14} color={C.textMuted} /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="features" style={{ padding: "92px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: 40, marginBottom: 10 }}>Five domains. One platform.</h2>
            <p style={{ color: C.textMuted, maxWidth: 620, marginBottom: 28 }}>From academics to finance, Alpine helps your team make confident decisions with shared context and trustworthy metrics.</p>
          </Reveal>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {domains.map((domain, i) => <Reveal key={domain.title} delay={i * 0.05}><DomainCard domain={domain} /></Reveal>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px" }}>
        <div className="split" style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 18 }}>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Icon name="bar" color={C.mint} /><span style={{ color: C.textMuted, fontSize: 12 }}>Unified dashboard</span></div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>Track retention risk, academic performance, admissions funnel, staffing trends, and budget signals in a single executive view.</p>
          </div>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Icon name="users" color={C.blue} /><span style={{ color: C.textMuted, fontSize: 12 }}>AI assistant</span></div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>Ask plain-language questions like, &ldquo;Where are we seeing retention risk this term?&rdquo; and get actionable insights instantly.</p>
          </div>
        </div>
      </section>

      <section id="early-access" style={{ padding: "90px 24px", background: C.surface }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 38, marginBottom: 12 }}>Get early access</h2>
          <p style={{ color: C.textMuted, marginBottom: 20 }}>Join our founding cohort and help shape what we build next.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your school email" style={{ flex: 1, border: `1px solid ${C.border}`, background: C.bg, color: C.text, borderRadius: 10, padding: "13px 14px" }} />
            <button onClick={() => setShowModal(true)} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 10, padding: "13px 18px" }}>Join Waitlist</button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px", textAlign: "center", color: C.textDim }}>
        Switzerland · <a href="mailto:hello@alpineailabs.com" style={{ color: C.textMuted, textDecoration: "none" }}>hello@alpineailabs.com</a> · © 2026 Alpine AI Labs
      </footer>

      {showModal ? (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "grid", placeItems: "center", zIndex: 60 }} onClick={() => setShowModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "90%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
            {joined ? (
              <>
                <h3 style={{ marginTop: 0 }}>You&apos;re on the list!</h3>
                <p style={{ color: C.textMuted }}>Thanks. We&apos;ll send early-access updates soon.</p>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: 0 }}>Join the waitlist</h3>
                <p style={{ color: C.textMuted, fontSize: 14 }}>Get priority access and founding pricing details.</p>
                <input value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} placeholder="Your school email" style={{ width: "100%", marginBottom: 10, border: `1px solid ${C.border}`, background: C.bg, color: C.text, borderRadius: 10, padding: "12px 14px" }} />
                <button
                  onClick={() => {
                    if (modalEmail.includes("@")) {
                      setJoined(true);
                      setTimeout(() => setShowModal(false), 1200);
                    }
                  }}
                  style={{ width: "100%", background: C.mint, color: C.white, border: "none", borderRadius: 10, padding: "12px 0" }}
                >
                  Reserve my spot
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
