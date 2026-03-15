"use client";
/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck

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
  red: "#EF4444", amber: "#F59E0B", blue: "#3B82F6", purple: "#A855F7", cyan: "#06B6D4",
};

// ─── Icons ───
const Icon = ({ name, size = 22, color = C.textMuted, sw = 1.75 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", style: { display: "block", flexShrink: 0 } };
  const d = {
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

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}

function Counter({ end, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0); const ref = useRef(null); const started = useRef(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started.current) { started.current = true; const t0 = performance.now(); const step = (now) => { const p = Math.min((now - t0) / duration, 1); setVal(Math.floor(p * end)); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); } }, { threshold: 0.3 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Spark({ data, color = C.mint, w = 100, h = 30 }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Bars({ data, colors, labels, h = 120 }) {
  const max = Math.max(...data);
  return <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: h }}>{data.map((v, i) => (
    <div key={i} style={{ flex: 1, textAlign: "center" }}>
      <div style={{ height: `${(v / max) * (h - 20)}px`, background: `linear-gradient(180deg, ${colors[i]}cc, ${colors[i]}33)`, borderRadius: "3px 3px 0 0", minHeight: 3 }} />
      <div style={{ fontSize: 9, color: C.textDim, marginTop: 3 }}>{labels[i]}</div>
    </div>
  ))}</div>;
}

function Donut({ segments, size = 110 }) {
  const total = segments.reduce((s, x) => s + x.value, 0); let cum = 0; const r = 40, circ = 2 * Math.PI * r;
  return <svg width={size} height={size} viewBox="0 0 110 110">{segments.map((seg, i) => { const pct = seg.value / total, offset = circ * (1 - pct), rot = (cum / total) * 360 - 90; cum += seg.value; return <circle key={i} cx="55" cy="55" r={r} fill="none" stroke={seg.color} strokeWidth="9" strokeDasharray={circ} strokeDashoffset={offset} transform={`rotate(${rot} 55 55)`} />; })}
    <text x="55" y="52" textAnchor="middle" fill={C.text} fontSize="18" fontWeight="700" fontFamily="Inter,sans-serif">{total}</text>
    <text x="55" y="66" textAnchor="middle" fill={C.textDim} fontSize="9" fontFamily="Inter,sans-serif">total</text>
  </svg>;
}

function Chat({ role, text, delay = 0 }) {
  const isUser = role === "user"; const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 8, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease" }}>
    <div style={{ background: isUser ? C.mint : C.card, border: isUser ? "none" : `1px solid ${C.border}`, borderRadius: isUser ? "12px 12px 3px 12px" : "12px 12px 12px 3px", padding: "8px 12px", maxWidth: "85%", fontSize: 12, color: isUser ? C.white : C.text, lineHeight: 1.5 }}>{text}</div>
  </div>;
}

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
  const catColor = (cat) => ({ SIS: C.mint, LMS: C.purple, Admissions: C.blue, Boarding: C.cyan, Wellbeing: C.amber, CRM: C.amber, Safety: C.red, Security: C.red, Comms: C.blue }[cat] || C.textDim);
  const Pill = ({ item }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 18px", marginRight: 12, whiteSpace: "nowrap", flexShrink: 0 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${catColor(item.cat)}10`, border: `1px solid ${catColor(item.cat)}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: catColor(item.cat) }}>{item.name.charAt(0)}</div>
      <div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</div><div style={{ fontSize: 9, fontWeight: 600, color: catColor(item.cat), letterSpacing: 0.5, textTransform: "uppercase" }}>{item.cat}</div></div>
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

function Nav({ onJoin }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(3,7,18,0.88)" : "transparent", backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.35s ease" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: C.navyLight, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 12, height: 12, borderRadius: 3, background: C.mint }} /></div><span style={{ fontWeight: 700, fontSize: 15, color: C.text, letterSpacing: -0.3 }}>Alpine AI</span></div>
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {["Platform", "Features", "Early Access"].map((l) => <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ color: C.textMuted, fontSize: 13, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => (e.target.style.color = C.text)} onMouseLeave={(e) => (e.target.style.color = C.textMuted)}>{l}</a>)}
      <button onClick={onJoin} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 20, padding: "7px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s ease" }} onMouseEnter={(e) => { e.target.style.background = C.mintDark; e.target.style.transform = "scale(1.04)"; }} onMouseLeave={(e) => { e.target.style.background = C.mint; e.target.style.transform = "scale(1)"; }}>Join Waitlist</button>
    </div>
  </nav>;
}

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
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}10, transparent 70%)`, filter: "blur(80px)", animation: "meshDrift 14s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}08, transparent 70%)`, filter: "blur(60px)", animation: "meshDrift2 18s ease-in-out infinite", pointerEvents: "none" }} />

        <Reveal><div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 28, padding: "6px 16px 6px 7px", marginBottom: 28 }}><span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.white, background: C.mint, padding: "3px 10px", borderRadius: 16 }}>Coming Soon</span><span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>Decision intelligence for schools</span></div></Reveal>
        <Reveal delay={0.1}><h1 className="hero-t" style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2.5, maxWidth: 780 }}>Your school runs on<br />12 different apps.<br /><span style={{ color: C.mint }}>Decisions shouldn't.</span></h1></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: 18, color: C.textMuted, maxWidth: 560, marginTop: 24, lineHeight: 1.65 }}>Alpine connects every platform your school uses — SIS, LMS, admissions, wellbeing, finance — into one intelligent hub where data becomes decisions.</p></Reveal>
        <Reveal delay={0.3}><div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center" }}><button onClick={handleJoin} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 28, padding: "14px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", boxShadow: `0 0 30px ${C.mintGlow}` }} onMouseEnter={(e) => { e.target.style.background = C.mintDark; e.target.style.transform = "scale(1.04)"; }} onMouseLeave={(e) => { e.target.style.background = C.mint; e.target.style.transform = "scale(1)"; }}>Join the Waitlist</button><a href="#platform" style={{ background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 28, padding: "13px 26px", fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "all 0.3s ease", display: "inline-flex", alignItems: "center", gap: 6 }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.textMuted; e.currentTarget.style.color = C.text; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}>See how it works <Icon name="arrowRight" size={14} color="currentColor" /></a></div></Reveal>
      </section>

      <section id="platform" className="sp" style={{ padding: "100px 24px" }}><div style={{ maxWidth: 1060, margin: "0 auto" }}><Reveal><div style={{ textAlign: "center", marginBottom: 56 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Unified Dashboard</span><h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.12 }}>Every department. Every metric.<br /><span style={{ color: C.mint }}>One screen.</span></h2></div></Reveal>
      <Reveal delay={0.15}><div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}><div style={{ display: "flex", gap: 12 }}>{[{ label: "Total Students", value: "2,847", change: 3.2, spark: [200,220,195,240,280,310], color: C.mint, icon: "users" },{ label: "Avg. GPA", value: "3.42", change: 1.8, spark: [3.2,3.25,3.3,3.35,3.4], color: C.blue, icon: "bookOpen" }].map((m,i)=>(<div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><Icon name={m.icon} size={13} color={m.color} /><span style={{ fontSize: 10, color: C.textDim }}>{m.label}</span></div><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ fontSize: 24, fontWeight: 700 }}>{m.value}</div><Spark data={m.spark} color={m.color} w={60} h={22} /></div></div>))}</div>
      <div className="fw" style={{ display: "flex", gap: 12, marginTop: 12 }}><div style={{ flex: 2, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}><div style={{ fontSize: 11, color: C.textDim, marginBottom: 10 }}>Grade Distribution by Department</div><Bars data={[85,78,92,71,88,76]} colors={[C.mint,C.blue,C.mint,C.amber,C.blue,C.purple]} labels={["Math","English","Science","Arts","Lang.","Social"]} h={100} /></div><div style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}><Donut segments={[{ value: 42, color: C.mint }, { value: 28, color: C.blue }, { value: 18, color: C.purple }, { value: 12, color: C.amber }]} size={90} /></div></div></div></Reveal></div></section>

      <section id="features" className="sp" style={{ padding: "100px 24px", background: C.surface }}><div style={{ maxWidth: 1060, margin: "0 auto" }}><Reveal><div style={{ textAlign: "center", marginBottom: 56 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Five Domains, One Platform</span><h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5 }}>Every decision your school makes,<br /><span style={{ color: C.mint }}>backed by data</span>.</h2></div></Reveal></div></section>

      <section className="sp" style={{ padding: "100px 24px" }}><div style={{ maxWidth: 900, margin: "0 auto" }}><Reveal><div style={{ textAlign: "center", marginBottom: 48 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Built-in AI Assistant</span><h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.2 }}>Ask Alpine anything about <span style={{ color: C.mint }}>your school</span>.</h2></div></Reveal><Reveal delay={0.1}><div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, maxWidth: 600, margin: "0 auto" }}><Chat role="user" text="What's our 9th grade retention risk looking like compared to last year?" delay={200} /><Chat role="ai" text="9th grade retention risk is at 6.2% — down from 8.1% last year." delay={800} /></div></Reveal></div></section>

      <section className="sp" style={{ padding: "100px 24px", overflow: "hidden" }}><div style={{ maxWidth: 1060, margin: "0 auto" }}><Reveal><div style={{ textAlign: "center", marginBottom: 48 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Seamless Integrations</span><h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.5, marginBottom: 14 }}>Connects to the platforms<br /><span style={{ color: C.mint }}>your school already uses</span>.</h2></div></Reveal><IntegrationTicker /></div></section>

      <section style={{ padding: "80px 24px", background: C.surface }}><div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}><Reveal><h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.2, marginBottom: 44 }}>Built for the full picture.</h2></Reveal><div className="fw" style={{ display: "flex", gap: 18, justifyContent: "center" }}>{[{ n: <Counter end={28} />, l: "Platform Integrations", c: C.mint },{ n: <Counter end={5} />, l: "Decision Domains", c: C.blue },{ n: <><Counter end={100} />%</>, l: "Data Unified", c: C.purple }].map((stat,i)=>(<Reveal key={i} delay={i*0.1}><div style={{ flex: 1, minWidth: 190, background: `${stat.c}08`, border: `1px solid ${stat.c}20`, borderRadius: 14, padding: "28px 22px" }}><div style={{ fontSize: 44, fontWeight: 800, color: stat.c }}>{stat.n}</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{stat.l}</div></div></Reveal>))}</div></div></section>

      <section id="early-access" className="sp" style={{ padding: "100px 24px" }}><div style={{ maxWidth: 780, margin: "0 auto", position: "relative" }}><Reveal><div style={{ textAlign: "center", marginBottom: 48 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.mint, display: "block", marginBottom: 12 }}>Early Access</span><h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, marginBottom: 14 }}>Get in early.<br /><span style={{ color: C.textMuted }}>Shape what we build.</span></h2></div></Reveal><Reveal delay={0.25}><div style={{ background: `${C.mint}08`, border: `1px solid ${C.mint}20`, borderRadius: 18, padding: "36px 28px", textAlign: "center" }}><h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Reserve your spot today</h3><div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your school email" style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "13px 16px", color: C.text, fontSize: 14 }} /><button onClick={handleJoin} style={{ background: C.mint, color: C.white, border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Join Waitlist</button></div></div></Reveal></div></section>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "32px 24px", textAlign: "center" }}><div style={{ fontSize: 11, color: C.textDim }}>Switzerland · <a href="mailto:hello@alpineailabs.com" style={{ color: C.textMuted, textDecoration: "none" }}>hello@alpineailabs.com</a></div><div style={{ fontSize: 10, color: C.textDim, marginTop: 8 }}>© 2026 Alpine AI Labs</div></footer>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }} onClick={() => setShowModal(false)}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 32, maxWidth: 400, width: "90%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            {joined ? (
              <><div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}><Icon name="checkCircle" size={44} color={C.mint} /></div><h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>You're on the list!</h3><p style={{ fontSize: 13, color: C.textMuted }}>We'll be in touch with early access details.</p></>
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
