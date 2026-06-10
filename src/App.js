import React, { useState, useEffect, useRef } from "react";
import logoSvg from "./logo.svg";
import bxPhoto from "./bx.jpg";
import chateau from "./chateau.jpg" ;
import interieur from "./interieur.jpg" ;
import merignac from "./merignac.jpg"
import talence from "./talence.png"
import chambre from "./chambre.jpg"
/* ═══════════════════════════════════════
   LOYA — Site Complet
   Conciergerie & Sous-location · Bordeaux
   ═══════════════════════════════════════ */

const C = {
  cream: "#F5F0E8", warmWhite: "#FAFAF5", beige: "#E8DFD0", sand: "#C4B39A",
  terra: "#B87333", sage: "#7A8B6F", sageDark: "#5C6B52",
  dark: "#2C2C2C", darkSoft: "#4A4A45", white: "#FFFFFF",
};

const PHONE = "tel:+33783376293";
const PHONE_DISPLAY = "+33 7 83 37 62 93";
const EMAIL = "loya.conciergerie@gmail.com";
const WHATSAPP = "https://wa.me/33783376293?text=Bonjour%2C%20je%20suis%20propri%C3%A9taire%20%C3%A0%20Bordeaux%20et%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.";
const track = (event, params) => { if (window.gtag) window.gtag('event', event, params); };

const IMG = {
  hero: interieur,
  salon: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  chambre: merignac,
  salon2: talence,
  sdb: chambre,
 bordeaux: bxPhoto,
bordeaux2: chateau,
cozy: chambre,
};

// ── Styles globaux ──
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      body { overflow-x: hidden; font-family: 'Figtree', system-ui, sans-serif; font-size: 16px; line-height: 1.65; }
      h1, h2, h3 { font-family: 'Josefin Sans', sans-serif; text-wrap: balance; letter-spacing: -0.02em; }
      p { text-wrap: pretty; max-width: 72ch; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }
      @media (max-width: 640px) {
        section { padding-top: 64px !important; padding-bottom: 64px !important; }
        .steps-grid { grid-template-columns: 1fr !important; }
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #F5F0E8; }
      ::-webkit-scrollbar-thumb { background: #C4B39A; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #B87333; }

      /* Barre de progression */
      .loya-progress {
        position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
        background: linear-gradient(90deg, #B87333, #D4956B, #7A8B6F);
        transform-origin: left; transition: width 0.1s linear;
        box-shadow: 0 0 8px rgba(184,115,51,0.5);
      }

      /* Grain hero */
      .loya-grain { position: relative; }
      .loya-grain::after {
        content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none;
        opacity: 0.045; mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      /* Lift cards */
      .loya-card {
        transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease !important;
      }
      .loya-card:hover {
        transform: translateY(-7px) !important;
        box-shadow: 0 24px 56px rgba(0,0,0,0.09) !important;
      }

      /* Contact card hover */
      .loya-cta-card {
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease !important;
      }
      .loya-cta-card:hover {
        transform: translateY(-8px) scale(1.02) !important;
        box-shadow: 0 24px 64px rgba(0,0,0,0.14) !important;
      }

      /* FAQ item hover */
      .loya-faq {
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
      }
      .loya-faq:hover {
        transform: translateX(5px) !important;
      }

      /* Zoom image */
      .loya-imgz { overflow: hidden !important; }
      .loya-imgz img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
      .loya-imgz:hover img { transform: scale(1.06) !important; }

      /* Boutons */
      a[href][style], div[onClick][style] {
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      }

      /* Chiffre fantôme derrière les étapes */
      .loya-ghost-num {
        font-family: 'Josefin Sans', sans-serif;
        font-size: clamp(90px, 14vw, 150px);
        font-weight: 700;
        line-height: 1;
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(44,44,44,0.055);
        position: absolute;
        top: -10px; left: 50%; transform: translateX(-50%);
        pointer-events: none; user-select: none; white-space: nowrap;
        letter-spacing: -3px;
      }

      /* Ligne accent titre */
      .loya-accent {
        display: block; width: 36px; height: 2px; margin: 14px auto 0;
        background: linear-gradient(90deg, #B87333, transparent);
        border-radius: 2px;
      }

      /* Step circle hover */
      .loya-step-circle {
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease !important;
      }
      .loya-step-circle:hover {
        transform: scale(1.08) !important;
      }

      /* Hover nav header */
      .loya-nav-link { transition: color 0.25s, border-color 0.25s !important; }
      .loya-nav-link:hover { color: #D4956B !important; }

      /* Focus visible — brand ring */
      button:focus-visible, a:focus-visible {
        outline: 2px solid #B87333;
        outline-offset: 3px;
        border-radius: 4px;
      }
    `}</style>
  );
}

// ── Barre de progression au scroll ──
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setPct(height > 0 ? (top / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="loya-progress" style={{ width: `${pct}%` }}/>;
}

// ── Animation scroll ──
function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (<div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>);
}

// ── Icônes ──
const Ico = {
  Phone: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Pin: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Menu: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Home: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Key: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  Sparkle: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>,
  Chart: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Shield: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  TrendUp: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Clock: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Users: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Whatsapp: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
  Heart: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  AlertCircle: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Sun: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Eye: ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ── Bouton CTA ──
function Btn({ href, onClick, children, bg, color = C.white, border, style = {} }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, fontFamily: "'Figtree',sans-serif", cursor: "pointer", transition: "transform 0.2s", background: bg || C.sage, color, border: border || "none", boxShadow: `0 2px 12px ${bg || C.sage}30`, textDecoration: "none", ...style };
  if (href) return <a href={href} onClick={onClick} style={base}>{children}</a>;
  return <button type="button" onClick={onClick} style={base}>{children}</button>;
}

// ══════════ HEADER ══════════
function Header({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  const links = [{ id: "accueil", label: "Accueil" }, { id: "services", label: "Services" }, { id: "contact", label: "Contact" }];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(245,240,232,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${C.beige}` : "1px solid transparent", transition: "all 0.4s" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <button type="button" onClick={() => goTo("accueil")} aria-label="Accueil Loya" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 13, background: "transparent", border: "none", padding: 0 }}>
          <img src={logoSvg} alt="" aria-hidden="true" style={{ height: 42, width: 42, flexShrink: 0, borderRadius: 10, display: "block" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 22, fontWeight: 800, color: scrolled ? C.dark : C.white, letterSpacing: "-0.2px", lineHeight: 1.1, textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.4)" }}>Loya</span>
            <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 9.5, fontWeight: 600, color: scrolled ? C.sageDark : "rgba(255,255,255,0.75)", letterSpacing: "2.8px", textTransform: "uppercase", lineHeight: 1, marginTop: 4, textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)" }}>Conciergerie · Bordeaux</span>
          </div>
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {links.map(n => (<button key={n.id} type="button" onClick={() => goTo(n.id)} className="loya-nav-link" style={{ fontSize: 13, fontWeight: 500, cursor: "pointer", color: page === n.id ? C.terra : scrolled ? C.darkSoft : C.white, border: "none", borderBottom: page === n.id ? `2px solid ${C.terra}` : "2px solid transparent", padding: "14px 8px 12px", background: "transparent", transition: "color 0.3s, border-color 0.3s", whiteSpace: "nowrap", textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.4)" }}>{n.label}</button>))}
          <Btn href={PHONE} onClick={() => track('generate_lead', {method:'phone',location:'header'})} bg={C.sage} style={{ padding: "9px 16px", fontSize: 13 }}><Ico.Phone s={14}/> <span className="btn-label">Appeler</span></Btn>
          <Btn href={WHATSAPP} onClick={() => track('generate_lead', {method:'whatsapp',location:'header'})} bg="#25D366" style={{ padding: "9px 16px", fontSize: 13 }}><Ico.Whatsapp s={14}/> <span className="btn-label">WhatsApp</span></Btn>
        </nav>
      </div>
      <style>{`@media(max-width:480px){.btn-label{display:none}}`}</style>
    </header>
  );
}

// ══════════ STICKY CTA MOBILE ══════════
function StickyCTA({ setPage }) {
  return (
    <div>
      <div className="sticky-cta" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(245,240,232,0.97)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.beige}`, paddingTop: "10px", paddingLeft: "16px", paddingRight: "16px", paddingBottom: "max(10px, env(safe-area-inset-bottom))", display: "none", gap: 10 }}>
        <Btn href={PHONE} onClick={() => track('generate_lead', {method:'phone',location:'sticky_cta'})} bg={C.sage} style={{ flex: 1, justifyContent: "center", padding: "13px 6px", fontSize: 14, borderRadius: 10 }}><Ico.Phone s={15}/> Appeler</Btn>
        <Btn href={WHATSAPP} onClick={() => track('generate_lead', {method:'whatsapp',location:'sticky_cta'})} bg="#25D366" style={{ flex: 1, justifyContent: "center", padding: "13px 6px", fontSize: 14, borderRadius: 10 }}><Ico.Whatsapp s={15}/> WhatsApp</Btn>
      </div>
      <style>{`@media(max-width:768px){.sticky-cta{display:flex!important}}`}</style>
    </div>
  );
}

// ══════════ FOOTER ══════════
function Footer({ setPage }) {
  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer style={{ background: C.dark, padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, marginBottom: 48 }}>
          <div style={{ flex: "1 1 280px" }}>
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 24, fontWeight: 700, color: C.cream }}>Loya</span>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.sand, maxWidth: 300, marginTop: 16 }}>Conciergerie Bordeaux & sous-location professionnelle. Gestion locative courte durée pour propriétaires bordelais.</p>
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: C.cream, letterSpacing: 1.5, marginBottom: 18, textTransform: "uppercase" }}>Navigation</h4>
            {["accueil","services","contact"].map(p => (<button key={p} type="button" onClick={() => goTo(p)} style={{ fontSize: 14, color: C.sand, cursor: "pointer", marginBottom: 12, background: "transparent", border: "none", padding: 0, display: "block", textAlign: "left", fontFamily: "'Figtree',sans-serif" }}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>))}
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: C.cream, letterSpacing: 1.5, marginBottom: 18, textTransform: "uppercase" }}>Contact</h4>
            <p style={{ fontSize: 14, color: C.sand, lineHeight: 2 }}>Bordeaux & alentours<br/>{PHONE_DISPLAY}<br/>{EMAIL}</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(196,179,154,0.15)", paddingTop: 24, textAlign: "center", fontSize: 12, color: "rgba(196,179,154,0.4)" }}>© 2026 Loya · Tous droits réservés</div>
      </div>
    </footer>
  );
}

// ── FAQ accordéon ──
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="loya-faq" style={{ background: C.white, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: `1px solid ${open ? C.terra+"40" : "transparent"}`, overflow: "hidden" }}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 24px", cursor: "pointer", background: "transparent", border: "none", textAlign: "left", minHeight: 44 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: C.dark, fontFamily: "'Figtree',sans-serif" }}>{q}</span>
        <div style={{ minWidth: 20, color: C.terra, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </button>
      {open && <p style={{ fontSize: 14, color: C.darkSoft, lineHeight: 1.75, margin: "0 24px 20px", paddingTop: 14, borderTop: `1px solid ${C.beige}` }}>{a}</p>}
    </div>
  );
}

// ══════════ PAGE ACCUEIL ══════════
function PageAccueil({ setPage }) {
  const problemes = [
    { icon: <Ico.Clock s={24}/>, title: "Gestion chronophage", desc: "Annonces, check-ins, ménage, messages à toute heure... Gérer un Airbnb à Bordeaux, c'est un second emploi non rémunéré." },
    { icon: <Ico.AlertCircle s={24}/>, title: "Vacance locative", desc: "Chaque nuit vide, c'est un loyer perdu. Sans bonne visibilité, votre calendrier reste trop souvent au rouge." },
    { icon: <Ico.Chart s={24}/>, title: "Revenus en dessous du potentiel", desc: "Sans tarification dynamique, vous laissez des centaines d'euros sur la table chaque mois sans le savoir." },
    { icon: <Ico.Heart s={24}/>, title: "Charge mentale", desc: "Voyageur mécontent à 23h, fuite un dimanche matin... À distance, chaque imprévu devient une crise." },
  ];

  const valeurs = [
    { icon: <Ico.Shield s={28}/>, title: "Sérénité totale", desc: "Fini les appels à minuit et les urgences du dimanche. Vous déléguez, on prend en charge le reste." },
    { icon: <Ico.TrendUp s={28}/>, title: "Revenus optimisés", desc: "Tarifs ajustés en temps réel, annonces soignées, calendrier plein. Votre bien rapporte plus, sans effort de votre part." },
    { icon: <Ico.Eye s={28}/>, title: "Transparence", desc: "Pas de frais cachés, pas de mauvaises surprises. On vous dit exactement ce qu'on fait, et pourquoi." },
    { icon: <Ico.Users s={28}/>, title: "Fiabilité", desc: "On s'occupe de chaque logement comme si c'était le nôtre. Réactifs et soigneux. Toujours." },
  ];

  return (<div>
    {/* ── HERO ── */}
    <section className="loya-grain" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={IMG.hero} alt="Intérieur chaleureux" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(44,44,44,0.75) 0%, rgba(44,44,44,0.4) 60%, rgba(44,44,44,0.15) 100%)" }}/>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", padding: "8px 20px", borderRadius: 50, marginBottom: 28, border: "1px solid rgba(255,255,255,0.2)" }}>
            <Ico.Pin s={14}/><span style={{ fontSize: 12, color: C.white, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Bordeaux & alentours</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <h1 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(40px,6.5vw,62px)", fontWeight: 700, color: C.white, lineHeight: 1.1, marginBottom: 20 }}>
            Jusqu'à +40% de revenus locatifs<br/>à <span style={{ color: "#D4956B", fontStyle: "italic" }}>Bordeaux</span>. Sans rien gérer.
          </h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, maxWidth: 500, marginBottom: 36 }}>
            On s'occupe de tout en 7 jours. Votre seule tâche : encaisser.
          </p>
        </FadeIn>
        <FadeIn delay={0.45}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Btn href={PHONE} onClick={() => track('generate_lead', {method:'phone',location:'hero'})} bg={C.sage} style={{ boxShadow: "0 4px 20px rgba(122,139,111,0.4)" }}><Ico.Phone/> Appeler</Btn>
            <Btn href={WHATSAPP} onClick={() => track('generate_lead', {method:'whatsapp',location:'hero'})} bg="#25D366" style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}><Ico.Whatsapp/> WhatsApp</Btn>
            <Btn onClick={() => { track('generate_lead', {method:'contact_page',location:'hero'}); setPage("contact"); window.scrollTo({ top: 0 }); }} bg={C.terra} style={{ boxShadow: "0 4px 20px rgba(184,115,51,0.4)" }}><Ico.Mail/> Estimation gratuite</Btn>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── SECTION PROBLÈMES ── */}
    <section style={{ padding: "100px 24px", background: "#1A1A1A" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: C.cream, marginTop: 0 }}>Ça vous <span style={{ color: C.terra, fontStyle: "italic" }}>parle ?</span></h2>
        </div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20 }}>
          {problemes.map((p,i) => (
            <FadeIn key={i} delay={i*0.1}><div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "32px 24px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ color: C.terra, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 18, fontWeight: 600, color: C.cream, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.65 }}>{p.desc}</p>
            </div></FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── SECTION BORDEAUX ── */}
    <section style={{ padding: "100px 24px", background: C.cream }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
        <FadeIn style={{ flex: "1 1 420px" }}>
          <div className="loya-imgz" style={{ borderRadius: 20, overflow: "hidden", position: "relative" }}>
            <img src={IMG.bordeaux} alt="Bordeaux, Place de la Bourse" loading="lazy" style={{ width: "100%", height: 400, objectFit: "cover", display: "block" }}/>
          </div>
        </FadeIn>
        <FadeIn delay={0.2} style={{ flex: "1 1 360px" }}>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(26px,4vw,34px)", fontWeight: 700, color: C.dark, lineHeight: 1.25, marginTop: 0, marginBottom: 16 }}>
            Une ville qui <span style={{ color: C.terra, fontStyle: "italic" }}>attire</span>
          </h2>
          <p style={{ fontSize: 16, color: C.darkSoft, lineHeight: 1.8, marginBottom: 16 }}>
            Patrimoine UNESCO, gastronomie, vignobles : Bordeaux est l'une des villes les plus demandées en location Airbnb en France. Le marché de la gestion locative courte durée Bordeaux est en pleine croissance.
          </p>
          <p style={{ fontSize: 16, color: C.darkSoft, lineHeight: 1.8 }}>
            Appartement en centre-ville ou maison en périphérie, votre bien a un potentiel qu'on sait optimiser.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* ── SECTION 2 SERVICES ── */}
    <section style={{ padding: "100px 24px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn><div style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: C.dark, marginTop: 0, marginBottom: 12 }}>Deux offres, <span style={{ color: C.terra, fontStyle: "italic" }}>un même objectif</span></h2>
          <p style={{ fontSize: 16, color: C.darkSoft, margin: 0 }}>Gagnez plus, gérez moins. Choisissez ce qui vous correspond.</p>
        </div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
          {/* Sous-location */}
          <FadeIn delay={0.1}>
            <div className="loya-card" style={{ background: C.white, borderRadius: 14, padding: "40px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)", height: "100%", borderTop: `4px solid ${C.terra}` }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.terra}12`, display: "flex", alignItems: "center", justifyContent: "center", color: C.terra, marginBottom: 20 }}><Ico.Home s={28}/></div>
              <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Sous-location professionnelle Bordeaux</h3>
              <p style={{ fontSize: 15, color: C.darkSoft, lineHeight: 1.7, marginBottom: 20 }}>Un contrat, un virement fixe chaque mois. Peu importe le taux d'occupation. Votre seule responsabilité : encaisser.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Loyer garanti mensuel", "Zéro vacance locative", "Gestion complète prise en charge", "Contrat professionnel sécurisé", "Stabilité financière", "Mise en valeur du logement"].map((t,i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}><Ico.Check/><span style={{ fontSize: 14, color: C.dark }}>{t}</span></div>
                ))}
              </div>
            </div>
          </FadeIn>
          {/* Conciergerie */}
          <FadeIn delay={0.2}>
            <div className="loya-card" style={{ background: C.white, borderRadius: 14, padding: "40px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)", height: "100%", borderTop: `4px solid ${C.sage}` }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.sage}15`, display: "flex", alignItems: "center", justifyContent: "center", color: C.sage, marginBottom: 20 }}><Ico.Key s={28}/></div>
              <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Conciergerie Bordeaux</h3>
              <p style={{ fontSize: 15, color: C.darkSoft, lineHeight: 1.7, marginBottom: 20 }}>Vous gardez la main sur votre calendrier. On gère tout le reste. Résultat : votre Airbnb rapporte plus, sans vous coûter du temps.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Check-in / check-out voyageurs", "Ménage & linge de qualité", "Optimisation des revenus", "Gestion Airbnb complète", "Communication voyageurs", "Amélioration de la rentabilité"].map((t,i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}><Ico.Check/><span style={{ fontSize: 14, color: C.dark }}>{t}</span></div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── SECTION COMMENT ÇA MARCHE ── */}
    <section style={{ padding: "100px 24px", background: C.cream }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: C.dark, marginTop: 0 }}>Comment ça <span style={{ color: C.terra, fontStyle: "italic" }}>marche ?</span></h2>
          <p style={{ fontSize: 16, color: C.darkSoft, marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>Trois étapes. Pas une de plus.</p>
        </div></FadeIn>
        <div style={{ position: "relative" }}>
          {/* Ligne de connexion desktop */}
          <div style={{ position: "absolute", top: 40, left: "16.66%", right: "16.66%", height: 2, background: `linear-gradient(to right, ${C.terra}40, ${C.sage}40)`, zIndex: 0 }} className="steps-line"/>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, position: "relative", zIndex: 1 }}>
            {[
              { num: "01", icon: <Ico.Phone s={26}/>, title: "On échange", desc: "Un appel ou un message. On visite votre bien et vous recevez une estimation gratuite sous 24h." },
              { num: "02", icon: <Ico.Key s={26}/>, title: "On s'organise", desc: "On choisit la formule faite pour vous, on signe, on met en route. En moins d'une semaine, c'est parti." },
              { num: "03", icon: <Ico.TrendUp s={26}/>, title: "Vous encaissez", desc: "On gère, vous encaissez. Chaque mois, votre virement arrive. Vous n'avez rien eu à faire." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 12px", position: "relative" }}>
                  <span className="loya-ghost-num">{s.num}</span>
                  <div className="loya-step-circle" style={{ width: 80, height: 80, borderRadius: "50%", background: i === 2 ? `linear-gradient(135deg, ${C.sageDark}, ${C.sage})` : `linear-gradient(135deg, ${C.terra}, #D4956B)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, marginBottom: 20, boxShadow: `0 8px 24px ${i === 2 ? C.sage : C.terra}40`, position: "relative", zIndex: 1 }}>
                    {s.icon}
                    <div style={{ position: "absolute", top: -8, right: -8, width: 26, height: 26, borderRadius: "50%", background: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: i === 2 ? C.sageDark : C.terra, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{s.num}</div>
                  </div>
                  <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: C.darkSoft, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <FadeIn delay={0.5}><div style={{ textAlign: "center", marginTop: 48 }}>
          <Btn href={PHONE} onClick={() => track('generate_lead', {method:'phone',location:'cta_accueil'})} bg={C.terra} style={{ boxShadow: `0 4px 20px ${C.terra}40` }}><Ico.Phone/> Démarrer maintenant, c'est gratuit</Btn>
        </div></FadeIn>
      </div>
      <style>{`@media(max-width:640px){.steps-line{display:none!important}.steps-grid{grid-template-columns:1fr!important}}`}</style>
    </section>

    {/* ── SECTION VALEURS ── */}
    <section style={{ padding: "100px 24px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: C.dark, marginBottom: 56 }}>
            Pourquoi les propriétaires nous <span style={{ color: C.terra, fontStyle: "italic" }}>font confiance</span>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: "40px 64px" }}>
          {valeurs.map((v,i) => (
            <FadeIn key={i} delay={i*0.1}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ color: C.sage, flexShrink: 0, paddingTop: 3 }}>{v.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: C.darkSoft, lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── IMAGE BIEN ── */}
    <section style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        <FadeIn><div className="loya-imgz" style={{ borderRadius: 20, overflow: "hidden", height: 260 }}><img src={IMG.salon2} alt="Salon cosy" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div></FadeIn>
        <FadeIn delay={0.1}><div className="loya-imgz" style={{ borderRadius: 20, overflow: "hidden", height: 260 }}><img src={IMG.chambre} alt="Chambre lumineuse" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div></FadeIn>
        <FadeIn delay={0.2}><div className="loya-imgz" style={{ borderRadius: 20, overflow: "hidden", height: 260 }}><img src={IMG.cozy} alt="Espace détente" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div></FadeIn>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section style={{ padding: "100px 24px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: C.dark, marginTop: 0, marginBottom: 48 }}>Questions <span style={{ color: C.terra, fontStyle: "italic" }}>fréquentes</span></h2>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { q: "Combien ça coûte ?", a: "Pour la sous-location, aucun frais : nous vous versons un loyer fixe garanti chaque mois. Pour la conciergerie, nous prenons une commission sur les revenus générés. Tout est transparent, sans frais cachés. Contactez-nous pour une estimation personnalisée et gratuite." },
            { q: "Quelle est la différence entre sous-location et conciergerie ?", a: "Avec la sous-location, vous nous confiez votre bien via un bail professionnel : vous recevez un loyer fixe garanti chaque mois, quelle que soit l'occupation. Avec la conciergerie, vous restez propriétaire-loueur et nous gérons tout à votre place (annonces, voyageurs, ménage) en échange d'une commission. La sous-location offre plus de stabilité ; la conciergerie, plus de revenus potentiels." },
            { q: "Puis-je récupérer mon logement quand je veux ?", a: "Oui. Le contrat prévoit des conditions de sortie claires et raisonnables. Nous travaillons sur des engagements adaptés à votre situation, sans vous piéger dans un bail contraignant. On en discute ensemble lors du premier échange gratuit." },
            { q: "Que se passe-t-il si un voyageur cause des dégâts ?", a: "Airbnb propose une protection hôte jusqu'à 3 millions d'euros. En complément, nous sélectionnons soigneusement les voyageurs et effectuons un état des lieux à chaque départ. Les incidents restent rares, et nous les gérons directement, sans vous solliciter." },
            { q: "Est-ce légal de sous-louer son logement à Bordeaux ?", a: "Oui, sous conditions. Pour un bien dont vous êtes propriétaire, c'est tout à fait légal. Nous opérons dans le strict respect de la réglementation bordelaise et vous accompagnons dans le cadre juridique adapté à votre situation." },
            { q: "Combien de temps avant de démarrer ?", a: "En général, 7 à 14 jours suffisent : visite du bien, photos professionnelles, création ou optimisation des annonces. Dès que le contrat est signé, on s'occupe de tout. Vous n'avez plus rien à faire." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}><FaqItem q={item.q} a={item.a}/></FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA FINAL ── */}
    <section style={{ padding: "80px 24px", textAlign: "center", background: `linear-gradient(135deg, ${C.sageDark} 0%, ${C.sage} 100%)`, marginTop: 80 }}>
      <FadeIn>
        <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, color: C.white, marginBottom: 16 }}>Votre bien mérite mieux que la gestion en solo.</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 460, margin: "0 auto 32px" }}>Sous-location ou conciergerie, on vous aide à choisir en 15 minutes. Premier échange gratuit, sans engagement.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
          <Btn href={PHONE} onClick={() => track('generate_lead', {method:'phone',location:'cta_services'})} bg={C.white} color={C.sageDark}><Ico.Phone/> Appeler maintenant</Btn>
          <Btn onClick={() => { track('generate_lead', {method:'contact_page',location:'services'}); setPage("contact"); window.scrollTo({ top: 0 }); }} bg="transparent" color={C.white} border="2px solid rgba(255,255,255,0.5)" style={{ boxShadow: "none" }}><Ico.Mail/> Nous contacter</Btn>
        </div>
      </FadeIn>
    </section>
  </div>);
}

// ══════════ PAGE SERVICES ══════════
function PageServices({ setPage }) {
  const avSubloc = [
    "Loyer garanti chaque mois",
    "Aucun frais de gestion ou de saisonnalité",
    "Revenus stables et sécurisés",
    "Gestion complète du logement prise en charge",
    "Mise en valeur de votre bien",
    "Contrat professionnel encadré",
    "Zéro stress locatif",
  ];
  const avConciergerie = [
    "Check-in / check-out des voyageurs",
    "Gestion des ménages et du linge",
    "Communication avec les voyageurs",
    "Optimisation des prix et des revenus",
    "Meilleure rentabilité du logement",
    "Gestion complète et sans stress",
  ];

  return (<div>
    {/* HERO */}
    <section style={{ padding: "140px 24px 80px", background: `linear-gradient(170deg, ${C.cream} 0%, ${C.beige} 100%)`, textAlign: "center" }}>
      <FadeIn>
        <h1 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: C.dark, marginTop: 0, marginBottom: 20 }}>
          Sous-location & conciergerie<br/><span style={{ color: C.terra, fontStyle: "italic" }}>à Bordeaux</span>
        </h1>
        <p style={{ fontSize: 17, color: C.darkSoft, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>Deux services pensés pour les propriétaires bordelais. Simples, professionnels, adaptés à votre situation.</p>
      </FadeIn>
    </section>

    {/* ── SOUS-LOCATION PRO ── */}
    <section style={{ padding: "100px 24px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", marginBottom: 48 }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.terra}10`, padding: "8px 18px", borderRadius: 50, marginBottom: 20 }}>
                <Ico.Home s={16}/><span style={{ fontSize: 12, color: C.terra, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Service 1</span>
              </div>
              <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,36px)", fontWeight: 700, color: C.dark, lineHeight: 1.25, marginBottom: 16 }}>
                Sous-location professionnelle <span style={{ color: C.terra, fontStyle: "italic" }}>Bordeaux</span>
              </h2>
              <p style={{ fontSize: 16, color: C.darkSoft, lineHeight: 1.8, marginBottom: 8 }}>
                Vous nous confiez votre logement via un bail professionnel. Nous assurons la gestion locative courte durée Bordeaux à votre place : annonces, voyageurs, ménage. Vous percevez un loyer fixe chaque mois, garanti.
              </p>
              <p style={{ fontSize: 16, color: C.darkSoft, lineHeight: 1.8 }}>
                Pas de vacance locative. Pas de gestion. Juste des revenus réguliers et un bien entretenu avec soin.
              </p>
            </div>
            <div style={{ flex: "1 1 360px", borderRadius: 20, overflow: "hidden" }}>
              <img src={IMG.salon} alt="Salon lumineux et soigné" loading="lazy" style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }}/>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ background: C.white, borderRadius: 14, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)", borderTop: `4px solid ${C.terra}` }}>
            <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 24 }}>Vos avantages</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
              {avSubloc.map((a,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
                  <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: `${C.terra}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.Check/></div>
                  <span style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── CONCIERGERIE ── */}
    <section style={{ padding: "100px 24px", background: C.cream }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", marginBottom: 48, flexDirection: "row-reverse" }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.sage}12`, padding: "8px 18px", borderRadius: 50, marginBottom: 20 }}>
                <Ico.Key s={16}/><span style={{ fontSize: 12, color: C.sageDark, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Service 2</span>
              </div>
              <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(28px,4vw,36px)", fontWeight: 700, color: C.dark, lineHeight: 1.25, marginBottom: 16 }}>
                Conciergerie <span style={{ color: C.sageDark, fontStyle: "italic" }}>Bordeaux</span>
              </h2>
              <p style={{ fontSize: 16, color: C.darkSoft, lineHeight: 1.8, marginBottom: 8 }}>
                Vous restez maître de votre calendrier. Nous prenons en charge l'intégralité de la gestion locative courte durée Bordeaux : annonces, accueil voyageurs, ménage, linge, communication.
              </p>
              <p style={{ fontSize: 16, color: C.darkSoft, lineHeight: 1.8 }}>
                Résultat : une location Airbnb Bordeaux qui tourne sans effort de votre part, avec des revenus optimisés.
              </p>
            </div>
            <div style={{ flex: "1 1 360px", borderRadius: 20, overflow: "hidden" }}>
              <img src={IMG.chambre} alt="Chambre confortable et soignée" loading="lazy" style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }}/>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ background: C.white, borderRadius: 14, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)", borderTop: `4px solid ${C.sage}` }}>
            <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 24 }}>Vos avantages</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
              {avConciergerie.map((a,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
                  <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: `${C.sage}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.Check/></div>
                  <span style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: "80px 24px", textAlign: "center", background: `linear-gradient(135deg, ${C.sageDark} 0%, ${C.sage} 100%)` }}>
      <FadeIn>
        <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(26px,4vw,34px)", fontWeight: 700, color: C.white, marginBottom: 16 }}>Propriétaire à Bordeaux ? Parlons de votre projet.</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 460, margin: "0 auto 32px" }}>Sous-location professionnelle ou conciergerie Bordeaux : on vous guide vers la meilleure option. Premier échange gratuit.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
          <Btn href={PHONE} onClick={() => track('generate_lead', {method:'phone',location:'cta_services'})} bg={C.white} color={C.sageDark}><Ico.Phone/> Appeler maintenant</Btn>
          <Btn onClick={() => { track('generate_lead', {method:'contact_page',location:'services'}); setPage("contact"); window.scrollTo({ top: 0 }); }} bg="transparent" color={C.white} border="2px solid rgba(255,255,255,0.5)" style={{ boxShadow: "none" }}><Ico.Mail/> Nous contacter</Btn>
        </div>
      </FadeIn>
    </section>
  </div>);
}

// ══════════ PAGE CONTACT ══════════
function PageContact() {
  const contacts = [
    {
      icon: <Ico.Phone s={28}/>,
      label: "Appeler",
      sub: "Réponse immédiate",
      value: PHONE_DISPLAY,
      href: PHONE,
      method: "phone",
      bg: C.sage,
      color: C.white,
      shadow: C.sage,
    },
    {
      icon: <Ico.Whatsapp s={28}/>,
      label: "WhatsApp",
      sub: "Réponse sous 1h",
      value: "Envoyer un message",
      href: WHATSAPP,
      method: "whatsapp",
      bg: "#25D366",
      color: C.white,
      shadow: "#25D366",
    },
    {
      icon: <Ico.Mail s={28}/>,
      label: "Email",
      sub: "Réponse sous 24h",
      value: EMAIL,
      href: "mailto:"+EMAIL,
      method: "email",
      bg: C.white,
      color: C.dark,
      shadow: "rgba(0,0,0,0.08)",
    },
  ];

  return (<div>
    {/* HERO CONTACT */}
    <section style={{ position: "relative", padding: "140px 24px 80px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={IMG.bordeaux} alt="Bordeaux" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(44,44,44,0.7) 0%, rgba(44,44,44,0.5) 100%)" }}/>
      </div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <FadeIn>
          <h1 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: C.white, marginTop: 0, marginBottom: 16 }}>
            Parlons de <span style={{ fontStyle: "italic" }}>votre logement</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", maxWidth: 480, margin: "0 auto" }}>Premier échange gratuit, sans engagement. On vous répond vite.</p>
        </FadeIn>
      </div>
    </section>

    {/* CONTACT CARDS */}
    <section style={{ padding: "80px 24px 100px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: "clamp(24px,3vw,32px)", fontWeight: 700, color: C.dark }}>Choisissez votre <span style={{ color: C.terra, fontStyle: "italic" }}>canal préféré</span></h2>
          <p style={{ fontSize: 15, color: C.darkSoft, marginTop: 10 }}>Trois façons de nous joindre, toutes sans engagement.</p>
        </div></FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginBottom: 56 }}>
          {contacts.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a href={c.href} onClick={() => track('generate_lead', {method:c.method,location:'contact'})} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="loya-cta-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "36px 24px", background: c.bg, borderRadius: 14, boxShadow: c.bg === C.white ? "none" : `0 8px 24px ${c.shadow}30`, textDecoration: "none", border: c.bg === C.white ? `1px solid ${C.beige}` : "none" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.bg === C.white ? `${C.terra}10` : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: c.bg === C.white ? C.terra : C.white, marginBottom: 18 }}>{c.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: c.bg === C.white ? C.sand : "rgba(255,255,255,0.7)", marginBottom: 6 }}>{c.sub}</div>
                <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 22, fontWeight: 700, color: c.color, marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: c.bg === C.white ? C.darkSoft : "rgba(255,255,255,0.85)" }}>{c.value}</div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Infos pratiques */}
        <FadeIn delay={0.3}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {[
              { icon: <Ico.Pin s={18}/>, label: "Zone", value: "Bordeaux & alentours" },
              { icon: <Ico.Clock s={18}/>, label: "Disponibilité", value: "Lun – Sam" },
              { icon: <Ico.Check/>, label: "Premier échange", value: "Gratuit & sans engagement" },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: C.white, borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div style={{ color: C.sage }}>{info.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: C.sand, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{info.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 2 }}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Image */}
        <FadeIn delay={0.4}>
          <div style={{ borderRadius: 20, overflow: "hidden", marginTop: 40 }}>
            <img src={IMG.bordeaux2} alt="Bordeaux" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}/>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>);
}

// ══════════ APP PRINCIPAL ══════════
function App() {
  const [page, setPage] = useState("accueil");
  useEffect(() => {
    track('page_view', { page_title: page, page_location: window.location.href });
  }, [page]);

  return (
    <div style={{ paddingBottom: 70 }}>
      <GlobalStyles/>
      <ScrollProgress/>
      <Header page={page} setPage={setPage}/>
      <main id="main-content">
        {page === "accueil" && <PageAccueil setPage={setPage}/>}
        {page === "services" && <PageServices setPage={setPage}/>}
        {page === "contact" && <PageContact/>}
      </main>
      <Footer setPage={setPage}/>
      <StickyCTA setPage={setPage}/>
    </div>
  );
}

export default App;
