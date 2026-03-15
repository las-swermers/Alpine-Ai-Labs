"use client";
import { useState, useEffect, useRef } from "react";
const C = {
  navy: "#0F172A", navyLight: "#1E293B", slate: "#64748B", slateMuted: "#94A3B8", slateLight: "#CBD5E1",
  mint: "#10B981", mintDark: "#059669", mintLight: "#D1FAE5", mintGlow: "rgba(16,185,129,0.12)",
  bg: "#F8FAFC", white: "#FFFFFF", border: "#E2E8F0",
};
const Icon = ({ name, size = 22, color = C.slate, sw = 1.75 }: { name: string; size?: number; color?: string; sw?: number }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, style: { display: "block" as const, flexShrink: 0 } };
  const d: Record<string, React.ReactNode> = {
    zap: <><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    radio: <><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 19.07a10 10 0 0 1 0-14.14" /></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" /><path d="M9 22v-4h6v4" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
    bookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    heart: <><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.65L12 20.65l8.42-8.42a5.4 5.4 0 0 0 0-7.65z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    coffee: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></>,
  };
  return <svg {...p}>{d[name]}</svg>;
};
function Reveal({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(248,250,252,0.88)" : "transparent", backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: C.mint }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: C.navy, letterSpacing: -0.3 }}>Alpine AI Labs</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {[{ l: "Services", href: "#services" }, { l: "Approach", href: "#approach" }, { l: "Product", href: "/product" }].map(({ l, href }) => (
          <a key={l} href={href} style={{ color: C.slate, fontSize: 14, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.navy)} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.slate)}>{l}</a>
        ))}
        <a href="#newsletter" style={{ background: C.navy, color: C.white, borderRadius: 24, padding: "8px 20px", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.25s ease", display: "inline-block" }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mint; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.navy; }}>Get Started</a>
      </div>
    </nav>
  );
}
// ─── Extracted components to avoid hooks-in-map ───
function ServiceCard({ svc, delay }: { svc: { icon: string; tag: string; title: string; desc: string }; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
        background: C.white, border: `1px solid ${hov ? C.mint + "55" : C.border}`, borderRadius: 16, padding: "30px 26px", height: "100%",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 48px ${C.mintGlow}, 0 0 0 1px ${C.mint}22` : "0 1px 4px rgba(0,0,0,0.03)", cursor: "default",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: hov ? C.mintLight : C.bg, border: `1px solid ${hov ? C.mint + "33" : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }}>
            <Icon name={svc.icon} size={20} color={hov ? C.mintDark : C.slate} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.mint, background: C.mintLight, padding: "3px 10px", borderRadius: 16 }}>{svc.tag}</span>
        </div>
        <h3 style={{ fontSize: 19, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.25 }}>{svc.title}</h3>
        <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.65 }}>{svc.desc}</p>
      </div>
    </Reveal>
  );
}
function WhyCard({ item, delay }: { item: { num: string; title: string; desc: string }; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex: 1, minWidth: 220 }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ borderTop: `3px solid ${hov ? C.mint : C.border}`, paddingTop: 28, height: "100%", transition: "border-color 0.4s ease", cursor: "default" }}>
        <span style={{ fontSize: 44, fontWeight: 800, color: C.mint, opacity: hov ? 0.8 : 0.25, transition: "opacity 0.4s", display: "block", marginBottom: 14, letterSpacing: -2, lineHeight: 1 }}>{item.num}</span>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.65 }}>{item.desc}</p>
      </div>
    </Reveal>
  );
}
export default function AlpineConsulting() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = () => { if (email.includes("@")) setSubscribed(true); };
  return (
    <div style={{ background: C.bg, color: C.navy, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { background:${C.bg}; }
        ::selection { background:${C.mint}30; color:${C.navy}; }
        @keyframes meshFloat { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(25px,-20px) scale(1.05); } }
        @keyframes meshFloat2 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-15px,20px) scale(1.03); } }
        @keyframes ticker { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        input:focus { outline:none; border-color:${C.mint} !important; box-shadow:0 0 0 4px ${C.mintGlow} !important; }
        @media (max-width:768px) { .hero-t { font-size:38px !important; } .fw { flex-wrap:wrap !important; } .sp { padding:64px 20px !important; } .grid-s { grid-template-columns:1fr !important; } }
      `}</style>
      <Nav />
      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 100px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "55%", height: "55%", borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}15, transparent 70%)`, filter: "blur(80px)", animation: "meshFloat 14s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: "45%", height: "50%", borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}0c, transparent 70%)`, filter: "blur(60px)", animation: "meshFloat2 18s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.white, border: `1px solid ${C.border}`, borderRadius: 28, padding: "6px 18px 6px 7px", marginBottom: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.white, background: C.mint, padding: "3px 10px", borderRadius: 16 }}>New</span>
              <span style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>Built by educators, for educators</span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="hero-t" style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2.5, color: C.navy }}>
              AI training for schools<br />
              <span style={{ background: `linear-gradient(135deg, ${C.mint}, ${C.mintDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>without the overwhelm.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <p style={{ fontSize: 20, color: C.slate, lineHeight: 1.65, maxWidth: 560, margin: "28px auto 0" }}>
              Practical workshops, webinars, and custom tools — built by a counselor, a teacher, and a tech director who work in schools every day.
            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
              <a href="#newsletter" style={{ background: C.navy, color: C.white, borderRadius: 28, padding: "16px 34px", fontSize: 16, fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 4px 16px rgba(15,23,42,0.15)", display: "inline-block" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mint; (e.target as HTMLElement).style.boxShadow = `0 4px 24px ${C.mintGlow}`; (e.target as HTMLElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.navy; (e.target as HTMLElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.15)"; (e.target as HTMLElement).style.transform = "scale(1)"; }}
              >Get your free AI toolkit</a>
              <a href="#services" style={{ background: "transparent", color: C.slate, border: `1.5px solid ${C.border}`, borderRadius: 28, padding: "15px 30px", fontSize: 16, fontWeight: 500, textDecoration: "none", transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: 6 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.navy; e.currentTarget.style.color = C.navy; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.slate; }}
              >Explore services <Icon name="arrowRight" size={16} color="currentColor" /></a>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
              {[{ icon: "shield", label: "Privacy-first" }, { icon: "users", label: "Role-specific" }, { icon: "coffee", label: "Practical, not theoretical" }].map((b) => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 7, background: C.white, border: `1px solid ${C.border}`, borderRadius: 22, padding: "7px 16px 7px 10px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <Icon name={b.icon} size={15} color={C.mint} sw={2} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* ═══ SCHOOL TYPE TICKER ═══ */}
      <section style={{ padding: "48px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.white, overflow: "hidden" }}>
        <div style={{ display: "flex", width: "max-content", animation: "ticker 40s linear infinite" }}>
          {[...Array(2)].flatMap((_, j) => ["International schools", "Charter networks", "K-12 private schools", "Public districts", "IB world schools", "Boarding schools", "Montessori programs", "Language academies"].map((t, i) => (
            <div key={`${j}-${i}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 32px", whiteSpace: "nowrap" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: C.mint, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: C.navy, letterSpacing: -0.2 }}>{t}</span>
            </div>
          )))}
        </div>
      </section>
      {/* ═══ WHO WE WORK WITH ═══ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Who we work with</span>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: C.navy, letterSpacing: -1.5, lineHeight: 1.15 }}>Training designed for<br />every type of school.</h2>
            </div>
          </Reveal>
          <div className="grid-s" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { icon: "globe", label: "International Schools" },
              { icon: "bookOpen", label: "IB World Schools" },
              { icon: "building", label: "K-12 Private Schools" },
              { icon: "users", label: "Charter Networks" },
              { icon: "layers", label: "Boarding Schools" },
              { icon: "shield", label: "Public Districts" },
              { icon: "heart", label: "Montessori Programs" },
              { icon: "radio", label: "Language Academies" },
            ].map((school, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 18px",
                  display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10,
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", cursor: "default",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.mint + "44"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${C.mint}12`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C.mint}10`, border: `1px solid ${C.mint}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={school.icon} size={22} color={C.mint} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.navy, lineHeight: 1.3 }}>{school.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* ═══ SERVICES ═══ */}
      <section id="services" className="sp" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 14 }}>What we offer</span>
            <h2 style={{ fontSize: 46, fontWeight: 800, color: C.navy, letterSpacing: -1.8, lineHeight: 1.1, maxWidth: 500 }}>Practical services for real school teams.</h2>
          </Reveal>
          <div className="grid-s" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 56 }}>
            {[
              { icon: "zap", tag: "Training", title: "Prompt Workshops", desc: "Hands-on sessions covering how to write effective prompts for your specific role. Leave with templates you can use tomorrow." },
              { icon: "radio", tag: "Training", title: "Live Webinars", desc: "Regular online sessions on AI tools, trends, and practical integration strategies tailored to school workflows." },
              { icon: "building", tag: "Workshop", title: "In-Person Training", desc: "Full-day and half-day sessions at your school, customized to your team\u2019s goals and tech comfort level." },
              { icon: "search", tag: "Workshop", title: "AI Tool Walkthroughs", desc: "Deep dives into specific platforms for real school use cases \u2014 from lesson planning to admin workflows." },
              { icon: "wrench", tag: "Custom", title: "In-House App Builds", desc: "Custom AI-powered tools specific to your school\u2019s workflows, privacy standards, and student needs." },
              { icon: "layers", tag: "Strategy", title: "AI Roadmap & Strategy", desc: "A structured plan for rolling out AI across your school \u2014 with timelines, training phases, and success metrics." },
            ].map((svc, i) => (
              <ServiceCard key={i} svc={svc} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>
      {/* ═══ ROLES — Apple side-by-side sections ═══ */}
      <section id="approach" style={{ background: C.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 14 }}>Who we help</span>
              <h2 style={{ fontSize: 46, fontWeight: 800, color: C.navy, letterSpacing: -1.8, lineHeight: 1.1 }}>AI skills for every role<br />in your school.</h2>
              <p style={{ fontSize: 18, color: C.slate, maxWidth: 520, margin: "18px auto 0", lineHeight: 1.6 }}>Whether you&apos;re in the classroom, the counseling office, or the server room — we have training that fits your context.</p>
            </div>
          </Reveal>
          {[
            { icon: "bookOpen", role: "Teachers", headline: "Reclaim hours.\nTeach better.", desc: "Prompt techniques for lesson planning, differentiation, grading feedback, and automating the admin tasks that eat into your evenings.", details: ["Custom prompt templates for your subject", "AI-assisted rubric generation", "Differentiation strategies powered by AI", "Time-saving report card workflows"], color: C.mint },
            { icon: "heart", role: "Counselors", headline: "Support more students.\nBurn out less.", desc: "AI tools for documentation, recommendation drafts, resource curation, and supporting students without doubling your workload.", details: ["AI-assisted recommendation letters", "Student concern documentation templates", "Resource curation workflows", "Scheduling and follow-up automation"], color: C.mint },
            { icon: "settings", role: "Administrators", headline: "Lead the AI transition.\nConfidently.", desc: "Build in-house tools, evaluate platforms, create policies, and lead a school-wide AI rollout that respects privacy and builds trust.", details: ["AI tool evaluation frameworks", "Policy and acceptable use templates", "Staff training rollout planning", "Custom internal tool development"], color: C.mint },
          ].map((role, i) => (
            <Reveal key={i} delay={0.1}>
              <div className="fw" style={{ display: "flex", gap: 48, alignItems: "center", padding: "56px 0", flexDirection: i % 2 === 1 ? "row-reverse" : "row", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ background: `linear-gradient(135deg, ${role.color}08, ${role.color}04)`, border: `1px solid ${role.color}18`, borderRadius: 20, padding: "40px 32px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `${role.color}08`, filter: "blur(40px)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, position: "relative" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${role.color}12`, border: `1px solid ${role.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={role.icon} size={24} color={role.color} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: role.color }}>{role.role}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
                      {role.details.map((d, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, color: C.navy, fontWeight: 500 }}>
                          <Icon name="checkCircle" size={16} color={role.color} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h3 style={{ fontSize: 34, fontWeight: 800, color: C.navy, letterSpacing: -1.2, lineHeight: 1.15, marginBottom: 16, whiteSpace: "pre-line" }}>{role.headline}</h3>
                  <p style={{ fontSize: 16, color: C.slate, lineHeight: 1.7 }}>{role.desc}</p>
                  <a href="#newsletter" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 14, fontWeight: 600, color: role.color, textDecoration: "none", transition: "gap 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
                  >Get started <Icon name="arrowRight" size={16} color={role.color} /></a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* ═══ WHY ALPINE ═══ */}
      <section id="team" className="sp" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 14 }}>Why Alpine</span>
              <h2 style={{ fontSize: 46, fontWeight: 800, color: C.navy, letterSpacing: -1.8, lineHeight: 1.1 }}>We don&apos;t just teach AI.<br /><span style={{ background: `linear-gradient(135deg, ${C.mint}, ${C.mintDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>We use it every day.</span></h2>
            </div>
          </Reveal>
          <div className="fw" style={{ display: "flex", gap: 20 }}>
            {[
              { num: "01", title: "We work in schools", desc: "Not consultants parachuting in. A counselor, teacher, and tech director who understand your daily reality because we live it." },
              { num: "02", title: "Monday-morning ready", desc: "Every workshop produces prompts, templates, and tools you can use the next school day. No slide decks you\u2019ll never open again." },
              { num: "03", title: "Privacy is non-negotiable", desc: "We understand FERPA, GDPR, and school data policies. Every tool and training we deliver respects student privacy." },
              { num: "04", title: "Role-specific, always", desc: "A counselor\u2019s AI needs aren\u2019t a teacher\u2019s. We tailor every session to the people in the room and the work they do." },
            ].map((item, i) => (
              <WhyCard key={i} item={item} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
      {/* ═══ TESTIMONIAL ═══ */}
      <section style={{ padding: "80px 24px", background: C.navy, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50%", height: "80%", borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}10, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ fontSize: 56, color: C.mint, opacity: 0.3, fontWeight: 800, lineHeight: 1, marginBottom: 20 }}>&ldquo;</div>
            <p style={{ fontSize: 22, fontWeight: 500, color: "#E2E8F0", lineHeight: 1.65, letterSpacing: -0.3 }}>The most practical AI training we&apos;ve experienced. Our teachers were using what they learned the very next day — not the very next quarter.</p>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: C.navyLight, border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="users" size={18} color={C.mint} /></div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>Head of Innovation</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>International School, Switzerland</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ═══ NEWSLETTER ═══ */}
      <section id="newsletter" className="sp" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: 46, fontWeight: 800, color: C.navy, letterSpacing: -1.8, lineHeight: 1.1, marginBottom: 16 }}>Ready to bring AI<br />into your school?</h2>
            <p style={{ fontSize: 17, color: C.slate, marginBottom: 40, lineHeight: 1.6 }}>Join our newsletter for practical tips, free tools, and workshop announcements. No fluff, no spam — just things you can use.</p>
          </Reveal>
          <Reveal delay={0.15}>
            {subscribed ? (
              <div style={{ background: C.mintLight, borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <Icon name="checkCircle" size={24} color={C.mintDark} />
                <span style={{ fontSize: 16, fontWeight: 600, color: C.mintDark }}>You&apos;re in! Check your inbox for your free AI toolkit.</span>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto" }}>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your school email" style={{ flex: 1, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "16px 20px", color: C.navy, fontSize: 15, transition: "all 0.3s ease" }} />
                  <button onClick={handleSubscribe} style={{ background: C.navy, color: C.white, border: "none", borderRadius: 14, padding: "16px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mint; (e.target as HTMLElement).style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.navy; (e.target as HTMLElement).style.transform = "scale(1)"; }}
                  >Start free</button>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 22, marginTop: 18 }}>
                  {["Free forever", "No spam", "Unsubscribe anytime"].map((t) => (
                    <span key={t} style={{ fontSize: 12, color: C.slateMuted, display: "flex", alignItems: "center", gap: 5 }}>
                      <Icon name="checkCircle" size={13} color={C.mint} /> {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </Reveal>
        </div>
      </section>
      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "36px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "0 auto", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 11, height: 11, borderRadius: 3, background: C.mint }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>Alpine AI Labs</span>
          <span style={{ fontSize: 12, color: C.slateMuted }}>&middot; Switzerland</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <a href="mailto:hello@alpineailabs.com" style={{ fontSize: 13, color: C.slate, textDecoration: "none" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.mint)} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.slate)}>hello@alpineailabs.com</a>
          <span style={{ fontSize: 11, color: C.slateLight }}>&copy; 2026 Alpine AI Labs</span>
        </div>
      </footer>
    </div>
  );
}
