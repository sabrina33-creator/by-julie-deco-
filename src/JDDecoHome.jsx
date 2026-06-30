import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from './analytics';
import imgSurMesure    from './salon canape design.jpg';
import imgBudget       from './Cuisine blanchebeige.jpg';
import imgDurable      from './Salon beige.jpg';
import imgAvant        from './Avant.jpeg';
import imgApres        from './Apres.jpeg';
import imgCuisineAv    from './cuisine avant.png';
import imgCuisineAp    from './cuisine apres.png';
import imgCuisine2Av   from './cuisine derriere avant.jpeg';
import imgCuisine2Ap   from './Cuisine derriere apres.jpeg';
import imgSdbAv        from './SDB avant.png';
import imgSdbAp        from './SDB apres.png';

import { C, F } from './tokens';

const ease = [0.22, 1, 0.36, 1];

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, style }) {
  const ref     = useRef(null);
  const seen    = useInView(ref, { once: true, amount: 0.15 });
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : y }}
      animate={seen || reduced ? { opacity: 1, y: 0 } : {}}
      transition={reduced ? { duration: 0 } : { duration: 1, delay, ease }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── LABEL ────────────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: F.sans,
      fontSize: '0.62rem',
      fontWeight: 400,
      letterSpacing: '0.38em',
      textTransform: 'uppercase',
      color: C.gold,
      marginBottom: 18,
    }}>
      {children}
    </span>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <section style={{
      position: 'relative',
      height: '100svh',
      minHeight: 640,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Background image — slow Ken Burns */}
      <motion.div
        initial={{ scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
        }}
      />

      {/* Gradient veil */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(
            170deg,
            rgba(10,10,10,0.18) 0%,
            rgba(10,10,10,0.52) 55%,
            rgba(10,10,10,0.82) 100%
          )
        `,
      }} />


      {/* Bottom-left editorial layout */}
      <div style={{
        position: 'relative',
        marginTop: 'auto',
        padding: 'clamp(48px, 8vw, 100px)',
        paddingBottom: 'clamp(56px, 9vw, 112px)',
        maxWidth: 1200,
        width: '100%',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
        >
          <Label>Décoration intérieure · 100% en ligne</Label>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          style={{
            fontFamily: F.serif,
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.white,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(20px, 3vw, 32px)',
            maxWidth: '16ch',
          }}
        >
          L'œil déco qu'il vous manquait.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'clamp(20px, 4vw, 48px)',
          }}
        >
          <p style={{
            fontFamily: F.sans,
            fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.62)',
            margin: 0,
            lineHeight: 1.65,
            letterSpacing: '0.01em',
          }}>
            Vous avez des envies mais pas l'œil pour les assembler.<br />
            Je m'en charge, à distance, dans votre budget.
          </p>

          <motion.a
            href="#prestations"
            onClick={() => trackEvent('cta_clicked', { location: 'hero', button_text: 'Découvrir les prestations' })}
            whileHover={{ backgroundColor: C.gold, color: C.black }}
            transition={{ duration: 0.22 }}
            style={{
              display: 'inline-block',
              padding: '14px 38px',
              border: `1px solid ${C.gold}`,
              color: C.gold,
              background: 'transparent',
              fontFamily: F.sans,
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            Découvrir les prestations
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 'clamp(60px, 7vw, 96px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 32,
        }}
      >
        <span style={{
          fontFamily: F.sans,
          fontSize: '0.55rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          writingMode: 'vertical-rl',
        }}>
          Scroll
        </span>
        <motion.div
          animate={reduced ? {} : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 44,
            background: `linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)`,
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    </section>
  );
}

// ─── WHY SECTION ──────────────────────────────────────────────────────────────
const PILLARS = [
  {
    n: '01',
    title: 'Sur-mesure',
    body: "Chaque projet part d'une conversation. Vos envies, votre mode de vie, vos contraintes : je pars de tout ça pour créer un espace qui n'appartient qu'à vous.",
    img: imgSurMesure,
  },
  {
    n: '02',
    title: 'Budget maîtrisé',
    body: "Je travaille dans votre enveloppe, avec des choix réfléchis et des références sélectionnées pour leur rapport qualité-prix. Pas de surprise.",
    img: imgBudget,
  },
  {
    n: '03',
    title: 'Durable dans le temps',
    body: "Des matières et des couleurs qui tiennent dans le temps. Un intérieur qu'on n'a pas envie de refaire dans deux ans.",
    img: imgDurable,
  },
];

function WhySection() {
  return (
    <section id="pourquoi" style={{
      padding: 'clamp(88px, 13vw, 168px) clamp(28px, 8vw, 120px)',
      background: C.white,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header row */}
        <Reveal>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            paddingBottom: 48,
            marginBottom: 72,
            borderBottom: `1px solid rgba(10,10,10,0.1)`,
          }}>
            <div>
              <h2 style={{
                fontFamily: F.serif,
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: C.black,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                margin: 0,
              }}>
                Fini le doute avant d'acheter.
              </h2>
            </div>
            <p style={{
              fontFamily: F.sans,
              fontSize: '0.88rem',
              color: C.muted,
              maxWidth: 280,
              lineHeight: 1.8,
              fontWeight: 300,
              margin: 0,
            }}>
              Un regard extérieur, de vrais choix à votre place, zéro erreur coûteuse.
            </p>
          </div>
        </Reveal>

        {/* Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: 'clamp(48px, 6vw, 80px)',
        }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.13}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease }}
                style={{ paddingTop: 36, borderTop: `1px solid rgba(10,10,10,0.08)` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <span style={{
                    fontFamily: F.sans,
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    color: C.gold,
                    fontWeight: 400,
                    flexShrink: 0,
                  }}>
                    {p.n}
                  </span>
                  <div style={{
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to right, ${C.gold}55, transparent)`,
                  }} />
                </div>

                <h3 style={{
                  fontFamily: F.serif,
                  fontSize: 'clamp(1.55rem, 2.6vw, 2.2rem)',
                  fontWeight: 400,
                  color: C.black,
                  margin: '0 0 18px',
                  lineHeight: 1.18,
                  letterSpacing: '-0.008em',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: F.sans,
                  fontSize: '0.88rem',
                  color: C.muted,
                  lineHeight: 1.9,
                  fontWeight: 300,
                  margin: '0 0 28px',
                }}>
                  {p.body}
                </p>
                <div style={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  aspectRatio: '16 / 10',
                }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BEFORE / AFTER ───────────────────────────────────────────────────────────
function BeforeAfterSection() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging     = useRef(false);

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx   = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100)));
    };
    const up = () => { dragging.current = false; };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, []);

  const start = (e) => {
    dragging.current = true;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx   = e.touches ? e.touches[0].clientX : e.clientX;
    setPos(Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100)));
  };

  return (
    <section style={{
      padding: 'clamp(88px, 13vw, 168px) clamp(28px, 8vw, 120px)',
      background: C.cream,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <Reveal style={{ marginBottom: 'clamp(44px, 5vw, 64px)' }}>
          <h2 style={{
            fontFamily: F.serif,
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.black,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            margin: 0,
          }}>
            Avant / Après
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          {/* Slider */}
          <div
            ref={containerRef}
            onMouseDown={start}
            onTouchStart={start}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3 / 2',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none',
              background: C.black,
            }}
          >
            {/* ── APRÈS (right, always visible) ── */}
            <img
              src={imgApres}
              alt="Après rénovation"
              loading="lazy"
              draggable={false}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

            {/* ── AVANT (left, clipped by drag position) ── */}
            <img
              src={imgAvant}
              alt="Avant rénovation"
              loading="lazy"
              draggable={false}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

            {/* Divider */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${pos}%`,
              width: 1,
              background: 'rgba(255,255,255,0.9)',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}>
              {/* Handle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: C.white,
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg viewBox="0 0 22 14" width="22" height="14" fill="none">
                  <path d="M1 7l4.5-5M1 7l4.5 5" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 7l-4.5-5M21 7l-4.5 5" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="1" y1="7" x2="21" y2="7" stroke={C.gold} strokeWidth="1" strokeOpacity="0.3"/>
                </svg>
              </div>
            </div>

            {/* Corner labels */}
            {[
              { text: 'Avant', side: 'left', x: 20 },
              { text: 'Après', side: 'right', x: 'auto' },
            ].map(({ text, x }) => (
              <div key={text} style={{
                position: 'absolute',
                bottom: 20,
                left:  text === 'Avant' ? 20 : 'auto',
                right: text === 'Après' ? 20 : 'auto',
                fontFamily: F.sans,
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: C.white,
                background: 'rgba(10,10,10,0.45)',
                padding: '4px 11px',
                backdropFilter: 'blur(4px)',
              }}>
                {text}
              </div>
            ))}
          </div>

          {/* Caption */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <p style={{
              fontFamily: F.sans,
              fontSize: '0.8rem',
              color: C.muted,
              fontWeight: 300,
              fontStyle: 'italic',
              margin: 0,
            }}>
              Transformation intérieure — Projet réel
            </p>
            <p style={{
              fontFamily: F.sans,
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.gold,
              margin: 0,
            }}>
              ← Glissez pour comparer →
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── RÉALISATIONS ─────────────────────────────────────────────────────────────
const REALISATIONS = [
  { label: 'Cuisine',       avant: imgCuisineAv,  apres: imgCuisineAp  },
  { label: 'Cuisine II',    avant: imgCuisine2Av, apres: imgCuisine2Ap },
  { label: 'Salle de bain', avant: imgSdbAv,      apres: imgSdbAp      },
];

function RealisationsSection() {
  return (
    <section style={{
      padding: 'clamp(88px, 13vw, 168px) clamp(28px, 8vw, 120px)',
      background: C.white,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <Reveal>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingBottom: 48,
            marginBottom: 72,
            borderBottom: '1px solid rgba(10,10,10,0.1)',
          }}>
            <div>
              <span style={{
                fontFamily: F.sans,
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: C.gold,
                display: 'block',
                marginBottom: 14,
                fontWeight: 400,
              }}>
                Avant / Après
              </span>
              <h2 style={{
                fontFamily: F.serif,
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: C.black,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                margin: 0,
              }}>
                Mes réalisations.
              </h2>
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 8vw, 96px)' }}>
          {REALISATIONS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.09}>
              <div>
                <p style={{
                  fontFamily: F.sans,
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: C.muted,
                  margin: '0 0 16px',
                  fontWeight: 400,
                }}>
                  {r.label}
                </p>

                <div
                  className="real-pair"
                  style={{
                    display: 'flex',
                    gap: 1,
                    background: `rgba(201,168,76,0.22)`,
                  }}
                >
                  <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
                    <img
                      src={r.avant}
                      alt={`${r.label} — avant`}
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 14,
                      fontFamily: F.sans,
                      fontSize: '0.55rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: C.gold,
                      background: 'rgba(255,255,255,0.93)',
                      padding: '4px 10px',
                      fontWeight: 400,
                    }}>
                      Avant
                    </span>
                  </div>

                  <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
                    <img
                      src={r.apres}
                      alt={`${r.label} — après`}
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: 14,
                      right: 14,
                      fontFamily: F.sans,
                      fontSize: '0.55rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: C.gold,
                      background: 'rgba(255,255,255,0.93)',
                      padding: '4px 10px',
                      fontWeight: 400,
                    }}>
                      Après
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .real-pair { flex-direction: column !important; gap: 2px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Comment fonctionne le conseil déco en ligne ?',
    a: "Vous envoyez des photos de votre espace et quelques notes sur vos envies. Julie analyse ça, crée votre moodboard et planifie un échange visio pour vous le présenter. Pas de déplacement, tout se passe à distance.",
  },
  {
    q: 'Combien coûtent les prestations ?',
    a: "Les formules démarrent à 150€ pour un conseil déco avec moodboard. La sélection mobilier est à 250€, et l'accompagnement complet à 490€. Vous payez à la réservation.",
  },
  {
    q: 'Dois-je habiter dans une ville précise ?',
    a: "Non, le service fonctionne partout en France. Que vous soyez en ville ou à la campagne, c'est pareil : tout se passe à distance.",
  },
  {
    q: 'En combien de temps reçois-je mon moodboard ?',
    a: "En général sous 5 à 7 jours ouvrés. Julie planifie ensuite un échange visio pour vous le présenter et ajuster si besoin.",
  },
  {
    q: "Qu'est-ce qu'un moodboard déco personnalisé ?",
    a: "C'est une planche visuelle qui résume l'ambiance de votre futur intérieur : couleurs, matières, type de mobilier. Vous vous en servez comme référence pour tous vos achats, pour ne pas vous disperser.",
  },
];

function FAQSection() {
  return (
    <section style={{
      padding: 'clamp(88px, 13vw, 168px) clamp(28px, 8vw, 120px)',
      background: C.white,
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{
            fontFamily: F.serif,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.black,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(48px, 6vw, 72px)',
          }}>
            Questions fréquentes
          </h2>
        </Reveal>

        <div>
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{
                padding: 'clamp(24px, 3vw, 36px) 0',
                borderTop: `1px solid rgba(10,10,10,0.08)`,
              }}>
                <p style={{
                  fontFamily: F.serif,
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: C.black,
                  lineHeight: 1.3,
                  margin: '0 0 12px',
                }}>
                  {item.q}
                </p>
                <p style={{
                  fontFamily: F.sans,
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  color: C.muted,
                  lineHeight: 1.9,
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
          <div style={{ height: 1, background: 'rgba(10,10,10,0.08)' }} />
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{
      padding: 'clamp(100px, 14vw, 180px) clamp(28px, 8vw, 120px)',
      background: C.black,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gold top edge */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${C.gold}45 35%, ${C.gold}45 65%, transparent 100%)`,
      }} />

      {/* Ghost lettering */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: F.serif,
        fontSize: 'clamp(6rem, 18vw, 22rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.028)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        By Julie Déco
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <Reveal>
          <h2 style={{
            fontFamily: F.serif,
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.white,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            margin: '0 0 24px',
          }}>
            Et si on commençait&nbsp;?
          </h2>

          <p style={{
            fontFamily: F.sans,
            fontSize: '0.92rem',
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.9,
            fontWeight: 300,
            margin: '0 0 52px',
          }}>
            Un premier échange de 20 minutes pour cadrer votre projet.<br />
            Sans engagement. Sans prise de tête.
          </p>

          <motion.a
            href="https://wa.me/33600000000?text=Bonjour%20By%20Julie%20D%C3%A9co%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20vos%20prestations."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'home_cta' })}
            whileHover={{ scale: 1.025, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '18px 50px',
              background: C.gold,
              color: C.black,
              fontFamily: F.sans,
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <WhatsAppIcon />
            Écrire sur WhatsApp
          </motion.a>

          {/* Thin decorative line below */}
          <div style={{ marginTop: 60, display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
            <div style={{ width: 40, height: 1, background: `${C.gold}35` }} />
            <span style={{ fontFamily: F.serif, fontSize: '0.9rem', color: `${C.gold}50`, fontStyle: 'italic' }}>
              by-julie-deco.fr
            </span>
            <div style={{ width: 40, height: 1, background: `${C.gold}35` }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="#0a0a0a">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function JDDecoHome() {
  useEffect(() => {
    if (document.getElementById('by-julie-deco-fonts')) return;
    const link = document.createElement('link');
    link.id   = 'by-julie-deco-fonts';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{`
        #jd-root *, #jd-root *::before, #jd-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        #jd-root { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        @media (max-width: 640px) {
          #jd-root section { overflow-x: hidden; }
        }
      `}</style>
      <div id="jd-root" style={{ background: C.white, color: C.black, overflowX: 'hidden' }}>
        <Hero />
        <WhySection />
        <BeforeAfterSection />
        <RealisationsSection />
        <FAQSection />
        <CTASection />
      </div>
    </>
  );
}
