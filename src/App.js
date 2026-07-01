import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { trackEvent } from './analytics';
import JDDecoHome     from './JDDecoHome';
import JDDecoServices from './JDDecoServices';
import imgContactBanner from './Chambre lumiere.jpg';

import { C, F } from './tokens';

const ease = [0.22, 1, 0.36, 1];

const WHATSAPP = "https://wa.me/33600000000?text=Bonjour%20By%20Julie%20D%C3%A9co%2C%20je%20souhaite%20en%20savoir%20plus.";
const EMAIL    = "contact@by-julie-deco.fr";

const NAV = [
  { path: '/',           label: 'Accueil'      },
  { path: '/prestations', label: 'Prestations' },
  { path: '/contact',    label: 'Contact'      },
];

// ─── GLOBAL STYLES + FONTS ────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById('by-julie-deco-fonts')) return;
    const link  = document.createElement('link');
    link.id     = 'by-julie-deco-fonts';
    link.rel    = 'stylesheet';
    link.href   = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,200;9..40,300&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'Jost', sans-serif;
        background: #fafaf8;
        color: #0a0a0a;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      a { text-decoration: none; color: inherit; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #fafaf8; }
      ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }
      @media (max-width: 700px) {
        .jd-nav-desktop { display: none !important; }
        .jd-hamburger   { display: flex  !important; }
      }
    `}</style>
  );
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [v, setV] = useState(reduced);
  const ref = useRef();
  useEffect(() => {
    if (reduced) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(22px)',
      transition: reduced ? 'none' : `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 16, color = C.black }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function MailIcon({ size = 18, color = C.black }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function ArrowIcon({ color = C.gold }) {
  return (
    <svg viewBox="0 0 16 8" width="16" height="8" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 4h12M9 1l3 3-3 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();
  const hasHero = ['/', '/prestations', '/contact'].includes(location.pathname);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Ferme le menu mobile à chaque changement de route
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const solid = !hasHero || scrolled;
  const fg    = solid ? C.black : C.white;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68,
        background: solid ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: solid ? 'blur(14px)' : 'none',
        borderBottom: solid ? '1px solid rgba(10,10,10,0.07)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 48px)',
          height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 290 110" width="168" height="64" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
              <text x="2" y="18" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'11px',letterSpacing:'3px',fill:fg,transition:'fill 0.4s'}}>by</text>
              <text x="1" y="84" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'65px',letterSpacing:'7px',fill:fg,transition:'fill 0.4s'}}>JULIE</text>
              <line x1="0" y1="93" x2="290" y2="93" style={{stroke:'#C9A84C',strokeWidth:0.85}}/>
              <text x="289" y="108" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'10.5px',letterSpacing:'4px',fill:fg,transition:'fill 0.4s',textAnchor:'end'}}>déco</text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="jd-nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 3vw, 44px)' }}>
            {NAV.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link key={path} to={path} style={{
                  fontFamily: F.sans, fontSize: '0.75rem', fontWeight: 400,
                  letterSpacing: '0.07em',
                  color: active ? C.gold : fg,
                  borderBottom: active ? `1px solid ${C.gold}` : '1px solid transparent',
                  paddingBottom: 2,
                  transition: 'color 0.3s, border-color 0.3s',
                }}>
                  {label}
                </Link>
              );
            })}

            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'header' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 20px', minHeight: 44,
                background: C.gold, color: C.black,
                fontFamily: F.sans, fontSize: '0.68rem', fontWeight: 600,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>
              <WhatsAppIcon size={13} />
              WhatsApp
            </a>
          </nav>

          {/* Hamburger mobile */}
          <button
            className="jd-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
              color: fg,
            }}
          >
            {menuOpen
              ? <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
            }
          </button>
        </div>
      </header>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 999,
          background: C.white,
          borderBottom: '1px solid rgba(10,10,10,0.07)',
          padding: '28px clamp(20px, 5vw, 48px) 36px',
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          {NAV.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              fontFamily: F.sans, fontSize: '1rem', fontWeight: 300,
              color: location.pathname === path ? C.gold : C.black,
              letterSpacing: '0.04em',
            }}>
              {label}
            </Link>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'mobile_menu' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
              padding: '13px 26px', background: C.gold, color: C.black,
              fontFamily: F.sans, fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
            <WhatsAppIcon size={14} />
            Écrire sur WhatsApp
          </a>
        </div>
      )}
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: C.black,
      padding: 'clamp(48px, 7vw, 80px) clamp(28px, 8vw, 120px) clamp(28px, 4vw, 40px)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 40%, rgba(201,168,76,0.35) 60%, transparent)`,
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40,
          marginBottom: 40, paddingBottom: 36,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>

          {/* Marque */}
          <div>
            <svg viewBox="0 0 290 110" width="140" height="53" xmlns="http://www.w3.org/2000/svg" style={{display:'block',marginBottom:8}}>
              <text x="2" y="18" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'11px',letterSpacing:'3px',fill:'#FFFFFF'}}>by</text>
              <text x="1" y="84" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'65px',letterSpacing:'7px',fill:'#FFFFFF'}}>JULIE</text>
              <line x1="0" y1="93" x2="290" y2="93" style={{stroke:'#C9A84C',strokeWidth:0.85}}/>
              <text x="289" y="108" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'10.5px',letterSpacing:'4px',fill:'#FFFFFF',textAnchor:'end'}}>déco</text>
            </svg>
            <p style={{ fontFamily: F.sans, fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, letterSpacing: '0.06em' }}>
              Conseil déco 100% en ligne
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NAV.map(({ path, label }) => (
              <Link key={path} to={path} style={{
                fontFamily: F.sans, fontSize: '0.78rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em',
              }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: F.sans, fontSize: '0.78rem', fontWeight: 400, color: C.gold,
              }}>
              <WhatsAppIcon size={14} color={C.gold} />
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`}
              onClick={() => trackEvent('email_click', { location: 'footer' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: F.sans, fontSize: '0.78rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.38)',
              }}>
              <MailIcon size={14} color="rgba(255,255,255,0.38)" />
              {EMAIL}
            </a>
          </div>
        </div>

        <p style={{ fontFamily: F.sans, fontSize: '0.62rem', color: 'rgba(255,255,255,0.15)', textAlign: 'center', letterSpacing: '0.05em' }}>
          © 2026 By Julie Déco · Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE CONTACT ─────────────────────────────────────────────────────────────
const schemaContact = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://by-julie-deco.fr' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://by-julie-deco.fr/contact' },
  ],
};

function PageContact() {
  return (
    <div style={{ background: C.white }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContact) }} />

      {/* Hero plein écran */}
      {(() => {
        const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const words = ['Parlons', 'de', 'votre', 'projet'];
        return (
          <section style={{
            position: 'relative',
            height: '100svh',
            minHeight: 640,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <motion.div
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 6, ease: 'linear' }}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("${imgContactBanner}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(170deg, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.52) 55%, rgba(10,10,10,0.82) 100%)',
            }} />

            <div style={{
              position: 'relative', flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              padding: 'clamp(48px, 8vw, 100px)',
            }}>
              <h1 style={{
                fontFamily: F.serif,
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: C.white,
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                margin: 0,
              }}>
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 0.5 + i * 0.2, ease }}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 1.8, ease }}
                style={{
                  height: 1,
                  background: C.gold,
                  transformOrigin: 'center',
                  width: 200,
                  marginTop: 28,
                }}
              />
            </div>
          </section>
        );
      })()}

      {/* Cartes */}
      <section style={{
        padding: 'clamp(60px, 9vw, 120px) clamp(28px, 8vw, 120px)',
        background: C.cream,
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 28px)',
          }}>

            {/* WhatsApp */}
            <FadeIn delay={0.1}>
              <a
                href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'contact_page' })}
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: 'clamp(36px, 5vw, 52px) clamp(28px, 4vw, 44px)',
                  background: C.gold, textDecoration: 'none',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(201,168,76,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <WhatsAppIcon size={28} color={C.black} />
                <h2 style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 300, color: C.black, margin: '20px 0 10px' }}>
                  WhatsApp
                </h2>
                <p style={{ fontFamily: F.sans, fontSize: '0.8rem', color: 'rgba(10,10,10,0.55)', fontWeight: 300, lineHeight: 1.75, margin: 0, flex: 1, paddingBottom: 32 }}>
                  Je réponds en général sous 1h.<br />C'est le moyen le plus rapide.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.sans, fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.black }}>
                  Écrire un message <ArrowIcon color={C.black} />
                </div>
              </a>
            </FadeIn>

            {/* E-mail */}
            <FadeIn delay={0.18}>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => trackEvent('email_click', { location: 'contact_page' })}
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: 'clamp(36px, 5vw, 52px) clamp(28px, 4vw, 44px)',
                  background: C.white, border: '1px solid rgba(10,10,10,0.09)',
                  textDecoration: 'none',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(10,10,10,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <MailIcon size={28} color={C.black} />
                <h2 style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 300, color: C.black, margin: '20px 0 10px' }}>
                  E-mail
                </h2>
                <p style={{ fontFamily: F.sans, fontSize: '0.8rem', color: C.muted, fontWeight: 300, lineHeight: 1.75, margin: 0, flex: 1, paddingBottom: 32 }}>
                  Pour une demande plus détaillée.<br />Réponse sous 24h.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.sans, fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold }}>
                  {EMAIL} <ArrowIcon />
                </div>
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} style={{ marginTop: 40, textAlign: 'center' }}>
            <p style={{ fontFamily: F.sans, fontSize: '0.78rem', color: C.muted, fontStyle: 'italic', fontWeight: 300 }}>
              Premier échange gratuit et sans engagement.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const PAGE_TITLES = {
  '/':            'By Julie Déco — L\'œil déco qu\'il vous manquait',
  '/prestations': 'Prestations — By Julie Déco',
  '/contact':     'Contact — By Julie Déco',
};

function AppContent() {
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || 'By Julie Déco';
    document.title = title;
    trackEvent('page_view', {
      page_title: title,
      page_location: window.location.href,
    });
  }, [location.pathname]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <Routes>
          <Route path="/"             element={<JDDecoHome />}     />
          <Route path="/prestations"  element={<JDDecoServices />} />
          <Route path="/contact"      element={<PageContact />}    />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );

}
