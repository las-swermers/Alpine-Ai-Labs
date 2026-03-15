"use client";

import { useEffect, useRef, useState } from "react";

const C = {
  navy: "#0F172A",
  navyLight: "#1E293B",
  slate: "#64748B",
  slateMuted: "#94A3B8",
  slateLight: "#CBD5E1",
  mint: "#10B981",
  mintDark: "#059669",
  mintLight: "#D1FAE5",
  mintGlow: "rgba(16,185,129,0.12)",
  bg: "#F8FAFC",
  white: "#FFFFFF",
  border: "#E2E8F0"
};

const services = [
  { icon: "zap", tag: "Training", title: "Prompt Workshops", desc: "Hands-on sessions for better prompts by role and workflow." },
  { icon: "radio", tag: "Training", title: "Live Webinars", desc: "Practical sessions on AI tools, trends, and school implementation." },
  { icon: "building", tag: "Workshop", title: "In-Person Training", desc: "Half-day and full-day programs tailored to your school." },
  { icon: "search", tag: "Workshop", title: "AI Tool Walkthroughs", desc: "Deep dives into real use-cases from classroom to operations." },
  { icon: "wrench", tag: "Custom", title: "In-House App Builds", desc: "Custom workflows and internal apps designed around your context." },
  { icon: "layers", tag: "Strategy", title: "Roadmap & Strategy", desc: "A practical rollout plan with milestones and measurable outcomes." }
];

const whyItems = [
  { num: "01", title: "We work in schools", desc: "A counselor, teacher, and tech director team grounded in real school operations." },
  { num: "02", title: "Monday-morning ready", desc: "Every engagement ships practical templates and workflows your staff can use immediately." },
  { num: "03", title: "Privacy-first by design", desc: "School data safety and policy alignment are built into our recommendations." },
  { num: "04", title: "Role-specific delivery", desc: "Teachers, counselors, and administrators each get role-relevant AI pathways." }
];

const roleBlocks = [
  {
    icon: "bookOpen",
    role: "Teachers",
    headline: "Reclaim hours.\nTeach better.",
    desc: "Prompt systems for planning, differentiation, feedback, and repetitive tasks.",
    details: ["Subject-specific prompt templates", "Rubric drafting support", "Differentiation workflows", "Reporting automation"],
    color: C.mint
  },
  {
    icon: "heart",
    role: "Counselors",
    headline: "Support more students.\nBurn out less.",
    desc: "AI support for documentation, letters, resources, and follow-ups.",
    details: ["Recommendation drafts", "Student concern templates", "Resource curation", "Scheduling workflows"],
    color: "#3B82F6"
  },
  {
    icon: "settings",
    role: "Administrators",
    headline: "Lead the AI transition.\nConfidently.",
    desc: "Policy, implementation, and schoolwide enablement built for leadership teams.",
    details: ["Tool evaluation framework", "Policy templates", "Rollout plans", "Internal solution guidance"],
    color: "#8B5CF6"
  }
];

function Icon({ name, size = 20, color = C.slate, sw = 1.75 }: { name: string; size?: number; color?: string; sw?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const d: Record<string, JSX.Element> = {
    zap: <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    radio: <><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" /></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
    bookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    heart: <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.65L12 20.65l8.42-8.42a5.4 5.4 0 0 0 0-7.65z" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82" /></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /></>,
    coffee: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /></>
  };
  return <svg {...p}>{d[name]}</svg>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const duration = 1400;
    const loop = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, [end]);
  return <>{val.toLocaleString()}{suffix}</>;
}

function HoverServiceCard({ item }: { item: (typeof services)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: C.white, border: `1px solid ${hover ? `${C.mint}55` : C.border}`, borderRadius: 16, padding: "26px 22px", transition: "all .25s ease", transform: hover ? "translateY(-4px)" : "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <Icon name={item.icon} color={hover ? C.mintDark : C.slate} />
        <span style={{ fontSize: 11, color: C.mint, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>{item.tag}</span>
      </div>
      <h3 style={{ fontSize: 20, marginBottom: 8 }}>{item.title}</h3>
      <p style={{ color: C.slate, lineHeight: 1.6, fontSize: 14 }}>{item.desc}</p>
    </article>
  );
}

function WhyCard({ item }: { item: (typeof whyItems)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ borderTop: `3px solid ${hover ? C.mint : C.border}`, paddingTop: 22, transition: "all .25s ease" }}>
      <div style={{ fontSize: 40, fontWeight: 800, color: C.mint, opacity: hover ? 0.8 : 0.25 }}>{item.num}</div>
      <h3 style={{ margin: "8px 0", fontSize: 18 }}>{item.title}</h3>
      <p style={{ color: C.slate, fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
    </div>
  );
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ background: C.bg, color: C.navy, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`html { scroll-behavior:smooth; } @media (max-width:768px){ .grid3 { grid-template-columns:1fr !important; } .split{ flex-direction:column !important; } }`}</style>

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", background: scrolled ? "rgba(248,250,252,.9)" : "transparent", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, backdropFilter: scrolled ? "blur(10px)" : "none" }}>
        <strong>Alpine AI Labs</strong>
        <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <a href="#services" style={{ color: C.slate, textDecoration: "none", fontSize: 14 }}>Services</a>
          <a href="#approach" style={{ color: C.slate, textDecoration: "none", fontSize: 14 }}>Approach</a>
          <a href="#newsletter" style={{ background: C.navy, color: C.white, padding: "8px 14px", borderRadius: 18, textDecoration: "none", fontSize: 13 }}>Get Started</a>
        </nav>
      </header>

      <section style={{ minHeight: "90vh", padding: "120px 24px 72px", textAlign: "center", display: "grid", placeItems: "center" }}>
        <div style={{ maxWidth: 780 }}>
          <Reveal>
            <p style={{ marginBottom: 14, color: C.mintDark, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontSize: 12 }}>Built by educators, for educators</p>
            <h1 style={{ fontSize: 58, lineHeight: 1.08, letterSpacing: -2, margin: 0 }}>AI training for schools<br /><span style={{ color: C.mintDark }}>without the overwhelm.</span></h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontSize: 19, color: C.slate, lineHeight: 1.65, maxWidth: 620, margin: "24px auto" }}>Practical workshops, webinars, and custom support created by school practitioners.</p>
            <a href="#newsletter" style={{ display: "inline-block", background: C.navy, color: C.white, padding: "14px 24px", borderRadius: 28, textDecoration: "none", marginRight: 10 }}>Get your free AI toolkit</a>
            <a href="#services" style={{ display: "inline-block", border: `1px solid ${C.border}`, padding: "14px 24px", borderRadius: 28, color: C.slate, textDecoration: "none" }}>Explore services</a>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "48px 24px", background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", textAlign: "center" }}>
          {[{ n: <Counter end={50} suffix="+" />, l: "Schools trained" }, { n: <Counter end={1200} suffix="+" />, l: "Educators upskilled" }, { n: <Counter end={6} />, l: "Countries" }, { n: "4.9", l: "Avg. rating" }].map((item) => (
            <div key={item.l} style={{ flex: 1, minWidth: 160 }}><div style={{ fontSize: 38, fontWeight: 800 }}>{item.n}</div><div style={{ color: C.slate, fontSize: 13 }}>{item.l}</div></div>
          ))}
        </div>
      </section>

      <section id="services" style={{ padding: "92px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 40, marginBottom: 24 }}>Practical services for real school teams.</h2>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>{services.map((item) => <HoverServiceCard key={item.title} item={item} />)}</div>
        </div>
      </section>

      <section id="approach" style={{ background: C.white, padding: "90px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 40, marginBottom: 16, textAlign: "center" }}>AI skills for every role in your school.</h2>
          <p style={{ textAlign: "center", color: C.slate, maxWidth: 620, margin: "0 auto 44px" }}>Whether you&apos;re in the classroom, counseling office, or admin team, we adapt training to context.</p>
          {roleBlocks.map((role, i) => (
            <Reveal key={role.role} delay={i * 0.08}>
              <div className="split" style={{ display: "flex", gap: 34, flexDirection: i % 2 ? "row-reverse" : "row", alignItems: "center", padding: "24px 0", borderTop: i ? `1px solid ${C.border}` : "none" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 32, whiteSpace: "pre-line", marginBottom: 12 }}>{role.headline}</h3>
                  <p style={{ color: C.slate, lineHeight: 1.65 }}>{role.desc}</p>
                </div>
                <div style={{ flex: 1, background: `${role.color}10`, border: `1px solid ${role.color}25`, borderRadius: 14, padding: 18 }}>
                  {role.details.map((d) => <div key={d} style={{ display: "flex", gap: 8, alignItems: "center", background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}><Icon name="checkCircle" color={role.color} size={16} /><span style={{ fontSize: 13 }}>{d}</span></div>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "90px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 40, marginBottom: 24 }}>Why Alpine</h2>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>{whyItems.map((item) => <WhyCard key={item.num} item={item} />)}</div>
        </div>
      </section>

      <section id="newsletter" style={{ padding: "96px 24px", background: C.white }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 42, marginBottom: 12 }}>Ready to bring AI into your school?</h2>
          <p style={{ color: C.slate, marginBottom: 22 }}>Join our newsletter for practical tips, free tools, and workshop updates.</p>
          {subscribed ? (
            <div style={{ background: C.mintLight, color: C.mintDark, borderRadius: 14, padding: 18, fontWeight: 600 }}>You&apos;re in! Check your inbox for your starter toolkit.</div>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your school email" style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }} />
              <button onClick={() => email.includes("@") && setSubscribed(true)} style={{ background: C.navy, color: C.white, border: "none", borderRadius: 12, padding: "14px 20px" }}>Start free</button>
            </div>
          )}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ color: C.slate }}>Alpine AI Labs · Switzerland</span>
        <a href="mailto:hello@alpineailabs.com" style={{ color: C.slate, textDecoration: "none" }}>hello@alpineailabs.com</a>
      </footer>
    </main>
  );
}
