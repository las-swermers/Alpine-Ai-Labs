"use client";
import { useState, useEffect, useRef } from "react";
// ═══════════════════════════════════════════════════
// ALPINE AI LABS — PRODUCT LANDING PAGE
// School Decision Intelligence Platform
// ═══════════════════════════════════════════════════
const C = {
  navy: "#0F172A", navyLight: "#1E293B", slate: "#64748B",
  mint: "#10B981", mintDark: "#059669", mintLight: "#d1fae5", mintGlow: "#10B98133",
  bg: "#030712", surface: "#0F172A", card: "#1E293B",
  border: "#334155", borderLight: "#475569",
  text: "#E2E8F0", textMuted: "#94A3B8", textDim: "#64748B", white: "#FFFFFF",
};
// ─── Icons ───
const Icon = ({ name, size = 22, color = C.textMuted, sw = 1.75 }: { name: string; size?: number; color?: string; sw?: number }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, style: { display: "block" as const, flexShrink: 0 } };
  const d: Record<string, React.ReactNode> = {
    barChart: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
    gem: <><polygon points="6 3 18 3 22 9 12 22 2 9" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="12" y1="22" x2="9" y2="9" /><line x1="12" y1="22" x2="15" y2="9" /></>,
    wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    heart: <><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.65L12 20.65l8.42-8.42a5.4 5.4 0 0 0 0-7.65z" /></>,
    dollarSign: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    bookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    clipboardList: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><line x1="10" y1="12" x2="16" y2="12" /><line x1="10" y1="16" x2="14" y2="16" /><circle cx="7.5" cy="12" r=".5" fill={color} /><circle cx="7.5" cy="16" r=".5" fill={color} /></>,
    alertTriangle: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  };
  return <svg {...p}>{d[name]}</svg>;
};
// ─── Reveal ───
function Reveal({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}
// ─── Counter ───
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0); const ref = useRef<HTMLSpanElement>(null); const started = useRef(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started.current) { started.current = true; const t0 = performance.now(); const step = (now: number) => { const p = Math.min((now - t0) / duration, 1); setVal(Math.floor(p * end)); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); } }, { threshold: 0.3 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}
// ─── Sparkline ───
function Spark({ data, color = C.mint, w = 100, h = 30 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
// ─── Bar Chart ───
function Bars({ data, colors, labels, h = 120 }: { data: number[]; colors: string[]; labels: string[]; h?: number }) {
  const max = Math.max(...data);
  return <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: h }}>{data.map((v, i) => (
    <div key={i} style={{ flex: 1, textAlign: "center" }}>
      <div style={{ height: `${(v / max) * (h - 20)}px`, background: `linear-gradient(180deg, ${colors[i]}cc, ${colors[i]}33)`, borderRadius: "3px 3px 0 0", minHeight: 3 }} />
      <div style={{ fontSize: 9, color: C.textDim, marginTop: 3 }}>{labels[i]}</div>
    </div>
  ))}</div>;
}
// ─── Donut ───
function Donut({ segments, size = 110 }: { segments: { value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((s, x) => s + x.value, 0); let cum = 0; const r = 40, circ = 2 * Math.PI * r;
  return <svg width={size} height={size} viewBox="0 0 110 110">{segments.map((seg, i) => { const pct = seg.value / total, offset = circ * (1 - pct), rot = (cum / total) * 360 - 90; cum += seg.value; return <circle key={i} cx="55" cy="55" r={r} fill="none" stroke={seg.color} strokeWidth="9" strokeDasharray={`${circ}`} strokeDashoffset={offset} transform={`rotate(${rot} 55 55)`} />; })}
    <text x="55" y="52" textAnchor="middle" fill={C.text} fontSize="18" fontWeight="700" fontFamily="Inter,sans-serif">{total}</text>
    <text x="55" y="66" textAnchor="middle" fill={C.textDim} fontSize="9" fontFamily="Inter,sans-serif">total</text>
  </svg>;
}
// ─── Chat Bubble (compact) ───
function Chat({ role, text, delay = 0 }: { role: string; text: string; delay?: number }) {
  const isUser = role === "user"; const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 8, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease" }}>
    <div style={{ background: isUser ? C.mint : C.card, border: isUser ? "none" : `1px solid ${C.border}`, borderRadius: isUser ? "12px 12px 3px 12px" : "12px 12px 12px 3px", padding: "8px 12px", maxWidth: "85%", fontSize: 12, color: isUser ? C.white : C.text, lineHeight: 1.5 }}>{text}</div>
  </div>;
}
// ─── Integration Ticker ───
function IntegrationTicker() {
  const row1 = [
    { name: "PowerSchool", cat: "SIS" }, { name: "Canvas", cat: "LMS" }, { name: "OpenApply", cat: "Admissions" },
    { name: "Orah", cat: "Wellbeing" }, { name: "Google Classroom", cat: "LMS" }, { name: "Infinite Campus", cat: "SIS" },
    { name: "Reach", cat: "Boarding" }, { name: "Ravenna", cat: "Admissions" }, { name: "Schoology", cat: "LMS" },
    { name: "Skyward", cat: "SIS" }, { name: "Finalsite", cat: "CRM" }, { name: "SchoolAdmin", cat: "Admissions" },
    { name: "Veracross", cat: "SIS" }, { name: "Blackbaud", cat: "SIS" },
  ];
  const row2 = [
    { name: "Moodle", cat: "LMS" }, { name: "ISAMS", cat: "SIS" }, { name: "Boardingware", cat: "Boarding" },
    { name: "Seesaw", cat: "LMS" }, { name: "SchoolPass", cat: "Safety" }, { name: "Gradelink", cat: "SIS" },
    { name: "Alma", cat: "SIS" }, { name: "ManageBac", cat: "LMS" }, { name: "Salesforce Edu", cat: "CRM" },
    { name: "School Pathways", cat: "SIS" }, { name: "Slate", cat: "Admissions" }, { name: "EdGenuity", cat: "LMS" },
    { name: "Verkada", cat: "Security" }, { name: "ParentSquare", cat: "Comms" },
  ];
  const Pill = ({ item }: { item: { name: string; cat: string } }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 18px", marginRight: 12, whiteSpace: "nowrap", flexShrink: 0 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.mint}10`, border: `1px solid ${C.mint}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: C.mint }}>{item.name.charAt(0)}</div>
      <div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div><div style={{ fontSize: 9, fontWeight: 600, color: C.mint, letterSpacing: 0.5, textTransform: "uppercase" }}>{item.cat}</div></div>
    </div>
  );
  return <>
    <style>{`@keyframes tickL { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } } @keyframes tickR { 0% { transform:translateX(-50%); } 100% { transform:translateX(0); } }`}</style>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(90deg, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(270deg, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{ overflow: "hidden", marginBottom: 12 }}><div style={{ display: "flex", width: "max-content", animation: "tickL 50s linear infinite" }}>{[...row1, ...row1].map((item, i) => <Pill key={`a-${i}`} item={item} />)}</div></div>
      <div style={{ overflow: "hidden" }}><div style={{ display: "flex", width: "max-content", animation: "tickR 55s linear infinite" }}>{[...row2, ...row2].map((item, i) => <Pill key={`b-${i}`} item={item} />)}</div></div>
    </div>
  </>;
}
// ─── Nav ───
function Nav({ onJoin }: { onJoin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(3,7,18,0.88)" : "transparent", backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.35s ease" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: C.navyLight, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 12, height: 12, borderRadius: 3, background: C.mint }} /></div><span style={{ fontWeight: 700, fontSize: 15, color: C.text, letterSpacing: -0.3 }}>Alpine AI Labs</span></div>
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {[{ l: "Consulting", href: "/" }, { l: "Platform", href: "#platform" }, { l: "Features", href: "#features" }, { l: "Early Access", href: "#early-access" }].map(({ l, href }) => <a key={l} href={href} style={{ color: C.textMuted, fontSize: 13, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.text)} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.textMuted)}>{l}</a>)}
      <button onClick={onJoin} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 20, padding: "7px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mintDark; (e.target as HTMLElement).style.transform = "scale(1.04)"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.mint; (e.target as HTMLElement).style.transform = "scale(1)"; }}>Join Waitlist</button>
    </div>
  </nav>;
}
// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function AlpineProduct() {
  const [email, setEmail] = useState(""); const [showModal, setShowModal] = useState(false); const [joined, setJoined] = useState(false); const [modalEmail, setModalEmail] = useState("");
  const handleJoin = () => setShowModal(true);
  const submitWaitlist = () => { if (modalEmail.includes("@")) { setJoined(true); setTimeout(() => setShowModal(false), 2000); } };
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; } html { scroll-behavior:smooth; } body { background:${C.bg}; }
        ::selection { background:${C.mint}30; }
        @keyframes meshDrift { 0%,100% { transform:translate(0,0); } 50% { transform:translate(15px,-15px); } }
        @keyframes meshDrift2 { 0%,100% { transform:translate(0,0); } 50% { transform:translate(-12px,18px); } }
        input:focus { outline:none; border-color:${C.mint} !important; box-shadow:0 0 0 3px ${C.mint}18 !important; }
        @media (max-width:768px) { .hero-t { font-size:36px !important; } .fw { flex-wrap:wrap !important; } .sp { padding:60px 20px !important; } .grid-f { grid-template-columns:1fr !important; } }
      `}</style>
      <Nav onJoin={handleJoin} />
      {/* ═══ HERO — Pain-led messaging ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}10, transparent 70%)`, filter: "blur(80px)", animation: "meshDrift 14s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}08, transparent 70%)`, filter: "blur(60px)", animation: "meshDrift2 18s ease-in-out infinite", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 28, padding: "6px 16px 6px 7px", marginBottom: 28 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.white, background: C.mint, padding: "3px 10px", borderRadius: 16 }}>Coming Soon</span>
            <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>Decision intelligence for schools</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="hero-t" style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2.5, maxWidth: 780 }}>
            Your school runs on<br />12 different apps.<br />
            <span style={{ color: C.mint }}>Decisions shouldn&apos;t.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: 18, color: C.textMuted, maxWidth: 560, marginTop: 24, lineHeight: 1.65 }}>
            Alpine connects every platform your school uses — SIS, LMS, admissions, wellbeing, finance — into one intelligent hub where data becomes decisions.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={handleJoin} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 28, padding: "14px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", boxShadow: `0 0 30px ${C.mintGlow}` }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mintDark; (e.target as HTMLElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.mint; (e.target as HTMLElement).style.transform = "scale(1)"; }}
            >Join the Waitlist</button>
            <a href="#platform" style={{ background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 28, padding: "13px 26px", fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: 6 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.textMuted; e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
            >See how it works <Icon name="arrowRight" size={14} color="currentColor" /></a>
          </div>
        </Reveal>
        {/* ─── Pain-point visual: scattered apps → unified ─── */}
        <Reveal delay={0.5}>
          <div style={{ marginTop: 56, maxWidth: 800, width: "100%", display: "flex", alignItems: "center", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {/* Scattered apps */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600, marginBottom: 4 }}>Before Alpine</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 280 }}>
                {["SIS", "LMS", "CRM", "Sheets", "Finance", "HR", "Email", "Forms", "Reports", "Docs"].map((app) => (
                  <div key={app} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 11, color: C.textDim, fontWeight: 500 }}>{app}</div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: C.textDim, marginTop: 4, fontWeight: 600 }}>10+ tools, no shared view</div>
            </div>
            {/* Arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${C.border}, ${C.mint})`, borderRadius: 1 }} />
              <Icon name="arrowRight" size={18} color={C.mint} />
            </div>
            {/* Alpine unified */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600, marginBottom: 4 }}>With Alpine</div>
              <div style={{ background: `${C.mint}0a`, border: `1px solid ${C.mint}25`, borderRadius: 14, padding: "18px 28px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${C.mint}18`, border: `1px solid ${C.mint}33`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 14, height: 14, borderRadius: 3, background: C.mint }} /></div>
                <div><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Alpine AI</div><div style={{ fontSize: 10, color: C.mint, fontWeight: 600 }}>One decision hub</div></div>
              </div>
              <div style={{ fontSize: 10, color: C.mint, marginTop: 4, fontWeight: 600 }}>All data, all insights, one place</div>
            </div>
          </div>
        </Reveal>
      </section>
      {/* ═══ SCHOOL-WIDE DASHBOARD ═══ */}
      <section id="platform" className="sp" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Unified Dashboard</span>
              <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.12 }}>
                Every department. Every metric.<br /><span style={{ color: C.mint }}>One screen.</span>
              </h2>
              <p style={{ fontSize: 16, color: C.textMuted, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.6 }}>Stop toggling between PowerSchool, spreadsheets, and email. Alpine brings everything into a single view built for school leaders.</p>
            </div>
          </Reveal>
          {/* Dashboard mockup — 4 domain tabs */}
          <Reveal delay={0.15}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, boxShadow: `0 40px 80px rgba(0,0,0,0.4), 0 0 40px ${C.mint}06` }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
                <div style={{ width: 10, height: 10, borderRadius: 10, background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: 10, background: "#ffbd2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: 10, background: "#28c840" }} />
                <span style={{ marginLeft: 10, fontSize: 11, color: C.textDim }}>Alpine AI — School Dashboard</span>
              </div>
              {/* Domain tabs */}
              <div style={{ display: "flex", gap: 4, marginBottom: 18, flexWrap: "wrap" }}>
                {[
                  { l: "Overview", active: true },
                  { l: "Academics", active: false }, { l: "Admissions", active: false }, { l: "Wellbeing", active: false }, { l: "Staff", active: false }, { l: "Finance", active: false },
                ].map((tab) => (
                  <div key={tab.l} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, color: tab.active ? C.white : C.textDim, background: tab.active ? C.mint : C.card, border: `1px solid ${tab.active ? C.mint : C.border}`, cursor: "default" }}>{tab.l}</div>
                ))}
              </div>
              {/* Top metrics row — school-wide */}
              <div className="fw" style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Total Students", value: "2,847", change: 3.2, spark: [200, 220, 195, 240, 280, 310, 295, 340, 380, 420], color: C.mint, icon: "users" },
                  { label: "Avg. GPA", value: "3.42", change: 1.8, spark: [3.2, 3.25, 3.3, 3.28, 3.35, 3.38, 3.4, 3.42], color: C.mint, icon: "bookOpen" },
                  { label: "Wellbeing Score", value: "78%", change: -2.1, spark: [82, 80, 81, 79, 78, 77, 78, 78], color: C.mint, icon: "heart" },
                  { label: "Staff Retention", value: "94%", change: 5.4, spark: [88, 89, 90, 91, 92, 93, 93, 94], color: C.mint, icon: "users" },
                ].map((m, i) => (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, flex: 1, minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <Icon name={m.icon} size={13} color={m.color} />
                      <span style={{ fontSize: 10, color: C.textDim, textTransform: "uppercase", letterSpacing: 0.8 }}>{m.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ fontSize: 24, fontWeight: 700 }}>{m.value}</div>
                      <Spark data={m.spark} color={m.color} w={60} h={22} />
                    </div>
                    <div style={{ fontSize: 10, color: m.change >= 0 ? C.mint : C.textDim, marginTop: 4 }}>{m.change >= 0 ? "\u2191" : "\u2193"} {Math.abs(m.change)}% vs last term</div>
                  </div>
                ))}
              </div>
              {/* Bottom row: charts */}
              <div className="fw" style={{ display: "flex", gap: 12 }}>
                {/* Academics bar */}
                <div style={{ flex: 2, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 10 }}>Grade Distribution by Department</div>
                  <Bars data={[85, 78, 92, 71, 88, 76]} colors={["#10B981", "#34D399", "#10B981", "#6EE7B7", "#34D399", "#10B981"]} labels={["Math", "English", "Science", "Arts", "Lang.", "Social"]} h={100} />
                </div>
                {/* Admissions funnel mini */}
                <div style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 10 }}>Admissions Funnel</div>
                  {[
                    { s: "Inquiries", v: 1240, pct: 100, c: C.mint },
                    { s: "Applied", v: 384, pct: 31, c: C.mint },
                    { s: "Accepted", v: 248, pct: 20, c: C.mint },
                    { s: "Enrolled", v: 198, pct: 16, c: C.mint },
                  ].map((f) => (
                    <div key={f.s} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textMuted, marginBottom: 2 }}><span>{f.s}</span><span>{f.v}</span></div>
                      <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${f.pct}%`, height: "100%", background: f.c, borderRadius: 2 }} /></div>
                    </div>
                  ))}
                </div>
                {/* Budget donut */}
                <div style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8 }}>Budget Allocation</div>
                  <Donut segments={[{ value: 42, color: "#10B981" }, { value: 28, color: "#34D399" }, { value: 18, color: "#6EE7B7" }, { value: 12, color: "#A7F3D0" }]} size={90} />
                  <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
                    {[{ l: "Staff", c: "#10B981" }, { l: "Programs", c: "#34D399" }, { l: "Facilities", c: "#6EE7B7" }, { l: "Tech", c: "#A7F3D0" }].map((x) => (
                      <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8, color: C.textDim }}><div style={{ width: 5, height: 5, borderRadius: 3, background: x.c }} /> {x.l}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ═══ 5 DOMAIN DEEP DIVES ═══ */}
      <section id="features" className="sp" style={{ padding: "100px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Five Domains, One Platform</span>
              <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5 }}>Every decision your school makes,<br /><span style={{ color: C.mint }}>backed by data</span>.</h2>
            </div>
          </Reveal>
          {[
            { icon: "bookOpen", color: C.mint, title: "Academic Performance", sub: "Grades, assessments, curriculum effectiveness, and learning outcomes \u2014 all in one view.",
              details: ["Grade trends by department, cohort, and teacher", "Assessment performance vs. learning objectives", "At-risk student identification based on academic patterns", "Curriculum effectiveness scoring and gap analysis"] },
            { icon: "clipboardList", color: C.mint, title: "Admissions & Enrollment", sub: "Full-funnel visibility from first inquiry to enrolled student, with conversion insights at every stage.",
              details: ["Inquiry-to-enrollment conversion tracking", "Application pipeline with automated stage alerts", "Yield prediction using historical patterns", "Source attribution \u2014 see which channels drive enrollment"] },
            { icon: "heart", color: C.mint, title: "Student Wellbeing", sub: "Behavioral patterns, attendance signals, counselor caseloads, and early-warning indicators.",
              details: ["Wellbeing score tracking across student populations", "Attendance pattern analysis and alert triggers", "Counselor caseload management and workload balance", "Behavioral incident trends and intervention tracking"] },
            { icon: "users", color: C.mint, title: "Staff & HR", sub: "Retention rates, professional development tracking, workload distribution, and satisfaction metrics.",
              details: ["Retention and turnover analytics by department", "Professional development hours and completion rates", "Workload and class-size distribution analysis", "Staff satisfaction survey trends over time"] },
            { icon: "dollarSign", color: C.mint, title: "Financial Overview", sub: "Budget vs. actuals, tuition collection, departmental spending, and cost-per-student analysis.",
              details: ["Real-time budget vs. actual spending dashboards", "Tuition and fee collection tracking", "Departmental cost analysis and forecasting", "Financial aid allocation and impact reporting"] },
          ].map((domain, i) => (
            <Reveal key={i} delay={0.08}>
              <div className="fw" style={{ display: "flex", gap: 40, alignItems: "center", padding: "48px 0", flexDirection: i % 2 === 1 ? "row-reverse" : "row", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${domain.color}12`, border: `1px solid ${domain.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={domain.icon} size={20} color={domain.color} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: domain.color }}>{domain.title}</span>
                  </div>
                  <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, lineHeight: 1.2, marginBottom: 12 }}>{domain.title}</h3>
                  <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.65, marginBottom: 20 }}>{domain.sub}</p>
                  <a href="#early-access" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: domain.color, textDecoration: "none", transition: "gap 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
                  >Explore this domain <Icon name="arrowRight" size={14} color={domain.color} /></a>
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ background: `${domain.color}06`, border: `1px solid ${domain.color}15`, borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {domain.details.map((d, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12, color: C.text, fontWeight: 500 }}>
                        <Icon name="checkCircle" size={15} color={domain.color} /> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* ═══ ASK ALPINE (compact) ═══ */}
      <section className="sp" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Built-in AI Assistant</span>
              <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.2 }}>Ask Alpine anything about <span style={{ color: C.mint }}>your school</span>.</h2>
              <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 480, margin: "12px auto 0", lineHeight: 1.6 }}>Skip the spreadsheets. Ask a question in plain language and get answers from across every connected system.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, maxWidth: 600, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 7, height: 7, borderRadius: 4, background: C.mint }} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>Alpine AI</span>
                <span style={{ fontSize: 10, color: C.textDim, marginLeft: "auto" }}>Online</span>
              </div>
              <Chat role="user" text="What's our 9th grade retention risk looking like compared to last year?" delay={200} />
              <Chat role="ai" text="9th grade retention risk is at 6.2% — down from 8.1% last year. Three students flagged: two with attendance drops >15% and one with a GPA decline from 3.4 to 2.1. I can pull up individual profiles or generate an intervention summary." delay={800} />
              <Chat role="user" text="Show me the budget impact if we add a part-time counselor for that cohort." delay={1600} />
              <Chat role="ai" text="Adding a 0.5 FTE counselor would cost ~$32K annually. Based on retention data, preventing even 2 withdrawals saves $48K in tuition revenue. Net positive ROI of $16K — plus the wellbeing impact. Want me to draft this as a board proposal?" delay={2200} />
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
                <input placeholder="Ask about academics, finance, staffing..." style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", color: C.text, fontSize: 12 }} />
                <button style={{ background: C.mint, border: "none", borderRadius: 10, width: 36, cursor: "pointer", color: C.white, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{"\u2191"}</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ═══ INTEGRATIONS ═══ */}
      <section className="sp" style={{ padding: "100px 24px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Seamless Integrations</span>
              <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.5, marginBottom: 14 }}>Connects to the platforms<br /><span style={{ color: C.mint }}>your school already uses</span>.</h2>
              <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>No migration, no disruption. Alpine pulls data from every major education platform into one unified view.</p>
            </div>
          </Reveal>
          <IntegrationTicker />
        </div>
      </section>
      {/* ═══ STATS ═══ */}
      <section style={{ padding: "80px 24px", background: C.surface }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.2, marginBottom: 44 }}>Built for the full picture.</h2>
          </Reveal>
          <div className="fw" style={{ display: "flex", gap: 18, justifyContent: "center" }}>
            {[
              { n: <Counter end={28} />, l: "Platform Integrations", sub: "SIS, LMS, CRM & more", c: C.mint },
              { n: <Counter end={5} />, l: "Decision Domains", sub: "Academics to finance", c: C.mint },
              { n: <><Counter end={100} />%</>, l: "Data Unified", sub: "Zero spreadsheets needed", c: C.mint },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ flex: 1, minWidth: 190, background: `${stat.c}08`, border: `1px solid ${stat.c}20`, borderRadius: 14, padding: "28px 22px" }}>
                  <div style={{ fontSize: 44, fontWeight: 800, color: stat.c }}>{stat.n}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{stat.l}</div>
                  <div style={{ fontSize: 12, color: C.textDim, marginTop: 3 }}>{stat.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* ═══ EARLY ACCESS ═══ */}
      <section id="early-access" className="sp" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}0a, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Early Access</span>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, marginBottom: 14 }}>Get in early.<br /><span style={{ color: C.textMuted }}>Shape what we build.</span></h2>
              <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>We&apos;re opening Alpine to a select group of founding schools. Join the waitlist to lock in priority access.</p>
            </div>
          </Reveal>
          <div className="fw" style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 40 }}>
            {[
              { icon: "rocket", title: "Priority Access", desc: "Be first to use Alpine when we launch." },
              { icon: "gem", title: "Founding Pricing", desc: "Lock in exclusive rates \u2014 permanently." },
              { icon: "wrench", title: "Shape the Product", desc: "Direct input on features and workflows." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ flex: 1, minWidth: 200, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 20px", textAlign: "center", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.mint}44`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}><Icon name={p.icon} size={26} color={C.mint} /></div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <div style={{ background: `${C.mint}08`, border: `1px solid ${C.mint}20`, borderRadius: 18, padding: "36px 28px", textAlign: "center" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Reserve your spot today</h3>
              <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 22 }}>No commitment. No credit card. Just early access.</p>
              <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your school email" style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "13px 16px", color: C.text, fontSize: 14 }} />
                <button onClick={handleJoin} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.3s ease", boxShadow: `0 0 20px ${C.mintGlow}` }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mintDark; (e.target as HTMLElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.mint; (e.target as HTMLElement).style.transform = "scale(1)"; }}
                >Join Waitlist</button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
                {["Free to join", "No spam", "Unsubscribe anytime"].map((t) => (
                  <span key={t} style={{ fontSize: 10, color: C.textDim, display: "flex", alignItems: "center", gap: 3 }}><Icon name="checkCircle" size={11} color={C.mint} /> {t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ═══ CLOSING ═══ */}
      <section style={{ padding: "60px 24px", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: 17, fontWeight: 600, color: C.textMuted }}>Stop managing data. Start making decisions.</p>
          <button onClick={handleJoin} style={{ marginTop: 20, background: "transparent", color: C.mint, border: `1px solid ${C.mint}44`, borderRadius: 22, padding: "11px 26px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.mint; (e.target as HTMLElement).style.color = C.white; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = C.mint; }}
          >Join the Waitlist</button>
        </Reveal>
      </section>
      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: C.navyLight, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 9, height: 9, borderRadius: 2, background: C.mint }} /></div>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Alpine AI Labs</span>
        </div>
        <div style={{ fontSize: 11, color: C.textDim }}>Switzerland &middot; <a href="mailto:hello@alpineailabs.com" style={{ color: C.textMuted, textDecoration: "none" }}>hello@alpineailabs.com</a></div>
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 8 }}>&copy; 2026 Alpine AI Labs</div>
      </footer>
      {/* ═══ MODAL ═══ */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }} onClick={() => setShowModal(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 32, maxWidth: 400, width: "90%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            {joined ? (
              <><div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}><Icon name="checkCircle" size={44} color={C.mint} /></div><h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>You&apos;re on the list!</h3><p style={{ fontSize: 13, color: C.textMuted }}>We&apos;ll be in touch with early access details.</p></>
            ) : (
              <><h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Join the Waitlist</h3><p style={{ fontSize: 13, color: C.textMuted, marginBottom: 22 }}>Get early access and founding-member pricing.</p>
                <input value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} placeholder="Your school email" style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", color: C.text, fontSize: 14, marginBottom: 12 }} />
                <button onClick={submitWaitlist} style={{ width: "100%", background: C.mint, color: C.white, border: "none", borderRadius: 10, padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Reserve My Spot</button></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
