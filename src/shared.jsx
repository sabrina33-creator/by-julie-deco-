import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── PALETTE & TOKENS ─────────────────────────────────────────────────────────
export const C = {
  cream:          '#F5F0E8',
  beige:          '#E8DFD0',
  terracotta:     '#B87333',
  terracottaDark: '#9A5E22',
  sage:           '#7A8B6F',
  sageDark:       '#5E6E54',
  brown:          '#2C2C2C',
  brownLight:     '#4A4035',
  sand:           '#C4B39A',
  sandLight:      '#DDD3C2',
  white:          '#FFFFFF',
};

export const font = {
  serif: "'Playfair Display', Georgia, serif",
  sans:  "'DM Sans', system-ui, sans-serif",
};

// ─── GOOGLE FONTS ─────────────────────────────────────────────────────────────
export function useFonts() {
  useEffect(() => {
    if (document.getElementById('essaloc-fonts')) return;
    const link = document.createElement('link');
    link.id   = 'essaloc-fonts';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap';
    link.rel  = 'stylesheet';
    document.head.appendChild(link);
  }, []);
}

// ─── SCROLL-REVEAL ────────────────────────────────────────────────────────────
export function useScrollReveal() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll('.scroll-reveal:not(.is-visible)');
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
        { threshold: 0.12 }
      );
      els.forEach((el) => observer.observe(el));
      return observer;
    };
    const observer = observe();
    return () => observer.disconnect();
  }, []);
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
export const Icon = {
  Phone: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.22 2 2 0 012.22.04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  ClipboardList: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0 }}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 24, height: 24 }}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  MapPin: ({ size = 16 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Mail: ({ size = 16 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Calendar: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Key: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <circle cx="8" cy="11" r="4" /><path d="M16 9l5 5-2 2-2-2-1 1-2-2" />
    </svg>
  ),
  Sparkles: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M5 18l.8 2.4L8 21l-2.2.6L5 24l-.8-2.4L2 21l2.2-.6z" />
      <path d="M19 3l.6 1.8L21 5l-1.4.2L19 7l-.6-1.8L17 5l1.4-.2z" />
    </svg>
  ),
  BarChart: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Star: ({ filled = false, size = 16 }) => (
    <svg viewBox="0 0 24 24" fill={filled ? C.terracotta : 'none'} stroke={C.terracotta} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  CheckCircle: ({ color = C.sage, size = 20 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Home: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Shield: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Layers: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Linen: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M3 6h18M3 12h18M3 18h18" />
      <rect x="2" y="3" width="20" height="18" rx="2" />
    </svg>
  ),
  TrendingUp: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  ArrowRight: ({ size = 16 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Users: ({ size = 28 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

// ─── BUTTONS ──────────────────────────────────────────────────────────────────
export function BtnPrimary({ children, href, onClick, icon, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 28px',
    background: `linear-gradient(135deg, ${C.terracotta}, ${C.terracottaDark})`,
    color: C.white,
    fontFamily: font.sans, fontWeight: 600, fontSize: '0.95rem',
    letterSpacing: '0.02em', borderRadius: 50, border: 'none',
    cursor: 'pointer', textDecoration: 'none',
    boxShadow: `0 4px 20px ${C.terracotta}40`,
    transition: 'all 0.3s ease', ...style,
  };
  return (
    <a href={href || '#contact'} onClick={onClick} style={base}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${C.terracotta}55`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px ${C.terracotta}40`; }}
    >
      {icon}{children}
    </a>
  );
}

export function BtnSage({ children, href, icon, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 28px',
    background: `linear-gradient(135deg, ${C.sage}, ${C.sageDark})`,
    color: C.white,
    fontFamily: font.sans, fontWeight: 600, fontSize: '0.95rem',
    letterSpacing: '0.02em', borderRadius: 50, border: 'none',
    cursor: 'pointer', textDecoration: 'none',
    boxShadow: `0 4px 20px ${C.sage}40`,
    transition: 'all 0.3s ease', ...style,
  };
  return (
    <a href={href || '#formulaire'} style={base}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${C.sage}55`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px ${C.sage}40`; }}
    >
      {icon}{children}
    </a>
  );
}

export function BtnOutline({ children, href, icon, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href || '#'} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '13px 28px',
      background: hovered ? C.terracotta : 'transparent',
      color: hovered ? C.white : C.terracotta,
      fontFamily: font.sans, fontWeight: 600, fontSize: '0.95rem',
      letterSpacing: '0.02em', borderRadius: 50,
      border: `2px solid ${C.terracotta}`,
      cursor: 'pointer', textDecoration: 'none',
      transform: hovered ? 'translateY(-2px)' : 'none',
      transition: 'all 0.3s ease', ...style,
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}{children}
    </a>
  );
}

// ─── SECTION TAG ──────────────────────────────────────────────────────────────
export function SectionTag({ children, color = C.terracotta }) {
  return (
    <div style={{
      display: 'inline-block',
      background: `${color}15`,
      color,
      fontFamily: font.sans,
      fontSize: '0.78rem', fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '6px 14px', borderRadius: 50,
      marginBottom: 16,
      border: `1px solid ${color}25`,
    }}>
      {children}
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const NAV = [
    { label: 'Accueil', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? `${C.cream}F0` : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.sand}40` : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}>
        <nav style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <Link to="/" style={{ textDecoration: 'none', lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 290 110" width="150" height="57" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
              <text x="2" y="18" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'11px',letterSpacing:'3px',fill:'#0A0A0A'}}>by</text>
              <text x="1" y="84" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'65px',letterSpacing:'7px',fill:'#0A0A0A'}}>JULIE</text>
              <line x1="0" y1="93" x2="290" y2="93" style={{stroke:'#C9A84C',strokeWidth:0.85}}/>
              <text x="289" y="108" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'10.5px',letterSpacing:'4px',fill:'#0A0A0A',textAnchor:'end'}}>déco</text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="h-desktop-nav">
            {NAV.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} style={{
                  fontFamily: font.sans, fontWeight: isActive(to) ? 600 : 500,
                  fontSize: '0.95rem',
                  color: isActive(to) ? C.terracotta : C.brownLight,
                  textDecoration: 'none', letterSpacing: '0.01em',
                  borderBottom: isActive(to) ? `2px solid ${C.terracotta}` : '2px solid transparent',
                  paddingBottom: 2, transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.terracotta; }}
                  onMouseLeave={(e) => { if (!isActive(to)) e.currentTarget.style.color = C.brownLight; }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="h-desktop-ctas">
            <BtnPrimary href="tel:+33600000000" icon={<Icon.Phone />} style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
              Appeler
            </BtnPrimary>
            <BtnSage href="#formulaire" icon={<Icon.ClipboardList />} style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
              Formulaire
            </BtnSage>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: C.brown, display: 'none', padding: 4,
          }} className="h-mobile-btn" aria-label="Menu">
            {menuOpen ? <Icon.X /> : <Icon.Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div style={{
        display: menuOpen ? 'flex' : 'none',
        position: 'fixed', inset: 0,
        background: C.cream,
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
        zIndex: 999,
      }}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', top: 24, right: 24,
          background: 'none', border: 'none', cursor: 'pointer', color: C.brown,
        }}>
          <Icon.X />
        </button>
        <Link to="/" style={{ textDecoration: 'none', lineHeight: 1 }}>
          <svg viewBox="0 0 290 110" width="174" height="66" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
            <text x="2" y="18" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'11px',letterSpacing:'3px',fill:'#0A0A0A'}}>by</text>
            <text x="1" y="84" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'65px',letterSpacing:'7px',fill:'#0A0A0A'}}>JULIE</text>
            <line x1="0" y1="93" x2="290" y2="93" style={{stroke:'#C9A84C',strokeWidth:0.85}}/>
            <text x="289" y="108" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'10.5px',letterSpacing:'4px',fill:'#0A0A0A',textAnchor:'end'}}>déco</text>
          </svg>
        </Link>
        {NAV.map(({ label, to }) => (
          <Link key={to} to={to} style={{
            fontFamily: font.sans, fontSize: '1.4rem', fontWeight: 500,
            color: isActive(to) ? C.terracotta : C.brown, textDecoration: 'none',
          }}>
            {label}
          </Link>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '80%', maxWidth: 280 }}>
          <BtnPrimary href="tel:+33600000000" icon={<Icon.Phone />} style={{ justifyContent: 'center' }}>
            Appeler maintenant
          </BtnPrimary>
          <BtnSage href="#formulaire" icon={<Icon.ClipboardList />} style={{ justifyContent: 'center' }}>
            Formulaire propriétaire
          </BtnSage>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .h-desktop-nav  { display: none !important; }
          .h-desktop-ctas { display: none !important; }
          .h-mobile-btn   { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export function Footer() {
  const linkStyle = {
    display: 'block', fontFamily: font.sans, fontSize: '0.9rem',
    color: C.sand, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s',
  };
  const hoverTerra = (e) => (e.currentTarget.style.color = C.terracotta);
  const unhoverTerra = (e) => (e.currentTarget.style.color = C.sand);

  return (
    <footer style={{ background: '#1E1B16', padding: '60px 24px 0', color: C.sand }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48,
        paddingBottom: 48, borderBottom: `1px solid #3A3028`,
      }} className="f-grid">
        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', lineHeight: 1, display: 'block', marginBottom: 16 }}>
            <svg viewBox="0 0 290 110" width="150" height="57" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
              <text x="2" y="18" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'11px',letterSpacing:'3px',fill:'#FFFFFF'}}>by</text>
              <text x="1" y="84" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'65px',letterSpacing:'7px',fill:'#FFFFFF'}}>JULIE</text>
              <line x1="0" y1="93" x2="290" y2="93" style={{stroke:'#C9A84C',strokeWidth:0.85}}/>
              <text x="289" y="108" style={{fontFamily:"'DM Sans',sans-serif",fontWeight:200,fontSize:'10.5px',letterSpacing:'4px',fill:'#FFFFFF',textAnchor:'end'}}>déco</text>
            </svg>
          </Link>
          <p style={{ fontFamily: font.sans, fontSize: '0.9rem', lineHeight: 1.7, color: C.sand, margin: '0 0 24px', fontWeight: 300 }}>
            Votre partenaire de confiance pour la gestion de locations courte durée à Bordeaux et en Gironde.
          </p>
          <a href="#" style={{
            width: 38, height: 38, borderRadius: '50%',
            border: `1px solid #3A3028`, display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center', color: C.sand,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.terracotta; e.currentTarget.style.color = C.terracotta; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#3A3028'; e.currentTarget.style.color = C.sand; }}
          >
            <Icon.Instagram />
          </a>
        </div>

        {/* Nav */}
        <div>
          <h4 style={{ fontFamily: font.sans, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.sandLight, marginBottom: 20, marginTop: 0 }}>
            Navigation
          </h4>
          {[['/', 'Accueil'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
            <Link key={to} to={to} style={linkStyle} onMouseEnter={hoverTerra} onMouseLeave={unhoverTerra}>{label}</Link>
          ))}
          <a href="#" style={linkStyle} onMouseEnter={hoverTerra} onMouseLeave={unhoverTerra}>Mentions légales</a>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: font.sans, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.sandLight, marginBottom: 20, marginTop: 0 }}>
            Services
          </h4>
          {['Sous-location professionnelle', 'Gestion des réservations', 'Check-in / Check-out', 'Ménage & linge', 'Suivi des revenus'].map((item) => (
            <Link key={item} to="/services" style={linkStyle} onMouseEnter={hoverTerra} onMouseLeave={unhoverTerra}>{item}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: font.sans, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.sandLight, marginBottom: 20, marginTop: 0 }}>
            Contact
          </h4>
          {[
            { icon: <Icon.Phone />, label: '+33 6 00 00 00 00', href: 'tel:+33600000000' },
            { icon: <Icon.Mail />, label: 'contact@essaloc.fr', href: 'mailto:contact@essaloc.fr' },
            { icon: <Icon.MapPin />, label: 'Bordeaux & Gironde (33)', href: '#' },
          ].map(({ icon, label, href }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: font.sans, fontSize: '0.88rem', color: C.sand, marginBottom: 12 }}>
              {icon}
              <a href={href} style={{ color: C.sand, textDecoration: 'none' }}>{label}</a>
            </div>
          ))}
          <BtnPrimary href="tel:+33600000000" icon={<Icon.Phone />} style={{ marginTop: 20, padding: '11px 22px', fontSize: '0.88rem' }}>
            Appeler maintenant
          </BtnPrimary>
        </div>
      </div>

      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '20px 0 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }} className="f-bottom">
        <span style={{ fontFamily: font.sans, fontSize: '0.82rem', color: '#5A5046' }}>© 2024 Essaloc — Tous droits réservés</span>
        <span style={{ fontFamily: font.sans, fontSize: '0.82rem', color: '#5A5046' }}>Fait avec ♡ à Bordeaux</span>
      </div>

      <style>{`
        @media (max-width: 900px) { .f-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) {
          .f-grid   { grid-template-columns: 1fr !important; }
          .f-bottom { justify-content: center !important; text-align: center; }
        }
      `}</style>
    </footer>
  );
}

// ─── STICKY MOBILE BAR ────────────────────────────────────────────────────────
export function StickyMobileBar() {
  const btnBase = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: 4, padding: '10px 8px', borderRadius: 12,
    textDecoration: 'none', fontFamily: font.sans,
    fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.02em',
    transition: 'all 0.2s', border: 'none', cursor: 'pointer',
  };
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: C.white, borderTop: `1px solid ${C.sand}40`,
      padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
      zIndex: 900, boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
    }} className="mob-bar">
      <a href="tel:+33600000000" style={{ ...btnBase, background: `linear-gradient(135deg, ${C.terracotta}, ${C.terracottaDark})`, color: C.white, boxShadow: `0 4px 14px ${C.terracotta}40` }}>
        <Icon.Phone size={18} />Appeler
      </a>
      <a href="#formulaire" style={{ ...btnBase, background: `linear-gradient(135deg, ${C.sage}, ${C.sageDark})`, color: C.white, boxShadow: `0 4px 14px ${C.sage}40` }}>
        <Icon.ClipboardList size={18} />Formulaire
      </a>
      <a href="#reserver" style={{ ...btnBase, background: C.cream, color: C.terracotta, border: `2px solid ${C.terracotta}` }}>
        <Icon.Calendar size={18} />Réserver
      </a>
      <style>{`@media (min-width: 769px) { .mob-bar { display: none !important; } }`}</style>
    </div>
  );
}
