import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from './analytics';
import imgServicesBanner from './Salon lumiere.jpg';

import { C, F } from './tokens';

const ease = [0.22, 1, 0.36, 1];

// ─── REVEAL ───────────────────────────────────────────────────────────────────
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
function Label({ children, light }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: F.sans,
      fontSize: '0.62rem',
      fontWeight: 400,
      letterSpacing: '0.38em',
      textTransform: 'uppercase',
      color: light ? 'rgba(201,168,76,0.85)' : C.gold,
      marginBottom: 18,
    }}>
      {children}
    </span>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    n: '01',
    title: 'Conseil déco\n+ moodboard',
    price: '150',
    desc: 'Un regard expert sur votre espace, une planche tendance personnalisée.',
    detail: 'Pour avoir enfin une vision claire avant d\'acheter quoi que ce soit.',
    includes: ['Analyse de votre espace (sur photos)', 'Planche tendance sur-mesure', 'Palette couleurs & matières', '1 échange visio de 45 min'],
    dark: false,
  },
  {
    n: '02',
    title: 'Sélection\nmobilier',
    price: '250',
    desc: 'Je cherche à votre place. Vous recevez une liste de meubles prêts à commander, adaptés à votre espace et vos goûts.',
    detail: "Fini les heures à comparer des sites et les mauvais achats.",
    includes: ['Sélection de 15 à 25 références', 'Liens d\'achat directs', 'Plan de disposition', '1 appel de suivi'],
    dark: false,
  },
  {
    n: '03',
    title: 'Accompagnement\ncomplet',
    price: '490',
    desc: 'De la première vision à la commande finale, je m\'occupe de tout. Vous validez, je propose.',
    detail: 'Idéal si vous voulez déléguer et ne plus y penser.',
    includes: ['Tout le contenu des formules 01 & 02', '3 appels visio inclus', 'Suivi personnalisé 30 jours', 'Révisions illimitées'],
    dark: true,
  },
];

// ─── HEADER SECTION ───────────────────────────────────────────────────────────
function PageHeader() {
  return (
    <section style={{
      padding: 'clamp(52px, 7vw, 88px) clamp(28px, 8vw, 120px) clamp(72px, 10vw, 120px)',
      background: C.white,
      borderBottom: `1px solid rgba(10,10,10,0.07)`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: 40,
        }} className="jd-header-grid">

          {/* Left — title */}
          <Reveal>
            <h1 style={{
              fontFamily: F.serif,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: C.black,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Mes prestations
            </h1>
          </Reveal>

          {/* Right — subtitle */}
          <Reveal delay={0.15} style={{ paddingBottom: 8 }}>
            <p style={{
              fontFamily: F.sans,
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              fontWeight: 300,
              color: C.muted,
              lineHeight: 1.75,
              margin: 0,
              maxWidth: 260,
              textAlign: 'right',
            }}>
              Des formules claires,<br />des résultats concrets.
            </p>
          </Reveal>

        </div>

        {/* Thin gold rule */}
        <Reveal delay={0.25}>
          <div style={{
            marginTop: 'clamp(40px, 6vw, 60px)',
            height: 1,
            background: `linear-gradient(to right, ${C.gold}55, transparent 70%)`,
          }} />
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .jd-header-grid {
            grid-template-columns: 1fr !important;
          }
          .jd-header-grid > div:last-child p {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ service, delay }) {
  const [hovered, setHovered] = useState(false);
  const dark = service.dark;

  return (
    <Reveal delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.4, ease }}
        style={{
          padding: 'clamp(36px, 5vw, 52px) clamp(28px, 4vw, 44px)',
          background: dark ? C.black : C.white,
          border: dark
            ? `1px solid ${hovered ? 'rgba(201,168,76,0.25)' : 'transparent'}`
            : `1px solid ${hovered ? 'rgba(10,10,10,0.22)' : 'rgba(10,10,10,0.09)'}`,
          transition: 'border-color 0.35s ease',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative ghost price */}
        <div style={{
          position: 'absolute',
          bottom: -20,
          right: -12,
          fontFamily: F.serif,
          fontSize: 'clamp(7rem, 11vw, 13rem)',
          fontWeight: 300,
          lineHeight: 1,
          color: dark ? 'rgba(201,168,76,0.06)' : 'rgba(10,10,10,0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.04em',
        }}>
          {service.price}
        </div>

        {/* Top gold line */}
        <div style={{
          width: hovered ? 56 : 32,
          height: 1,
          background: C.gold,
          marginBottom: 28,
          transition: 'width 0.4s ease',
        }} />

        {/* Number */}
        <span style={{
          fontFamily: F.sans,
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          color: dark ? 'rgba(201,168,76,0.7)' : C.gold,
          display: 'block',
          marginBottom: 20,
        }}>
          {service.n}
        </span>

        {/* Title */}
        <h2 style={{
          fontFamily: F.serif,
          fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: dark ? C.white : C.black,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          margin: '0 0 clamp(24px, 3vw, 36px)',
          whiteSpace: 'pre-line',
        }}>
          {service.title}
        </h2>

        {/* Price */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 6,
          marginBottom: 24,
          position: 'relative',
        }}>
          <span style={{
            fontFamily: F.serif,
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            fontWeight: 300,
            color: dark ? C.white : C.black,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            {service.price}
          </span>
          <span style={{
            fontFamily: F.sans,
            fontSize: '1rem',
            fontWeight: 400,
            color: C.gold,
            letterSpacing: '0.02em',
          }}>
            €
          </span>
        </div>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: 1,
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,10,0.07)',
          marginBottom: 24,
        }} />

        {/* Description */}
        <p style={{
          fontFamily: F.sans,
          fontSize: '0.9rem',
          fontWeight: 300,
          color: dark ? 'rgba(255,255,255,0.65)' : C.muted,
          lineHeight: 1.8,
          margin: '0 0 16px',
        }}>
          {service.desc}
        </p>
        <p style={{
          fontFamily: F.sans,
          fontSize: '0.78rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: dark ? 'rgba(201,168,76,0.75)' : C.gold,
          margin: '0 0 28px',
          lineHeight: 1.5,
        }}>
          {service.detail}
        </p>

        {/* Includes */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {service.includes.map((item) => (
            <li key={item} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              fontFamily: F.sans,
              fontSize: '0.8rem',
              color: dark ? 'rgba(255,255,255,0.5)' : C.muted,
              fontWeight: 300,
              lineHeight: 1.5,
            }}>
              <span style={{
                width: 14,
                height: 1,
                background: C.gold,
                flexShrink: 0,
                marginTop: 9,
                opacity: dark ? 0.6 : 0.8,
              }} />
              {item}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <motion.a
          href="https://wa.me/33600000000"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('service_cta_clicked', { service_name: service.title.replace('\n', ' '), price: service.price })}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.25, ease }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 36,
            fontFamily: F.sans,
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: C.gold,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Choisir cette formule
          <svg viewBox="0 0 20 10" width="20" height="10" fill="none">
            <path d="M1 5h16M13 1l4 4-4 4" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

      </motion.div>
    </Reveal>
  );
}

// ─── SERVICES GRID ────────────────────────────────────────────────────────────
function ServicesGrid() {
  return (
    <section style={{
      padding: 'clamp(72px, 10vw, 120px) clamp(28px, 8vw, 120px)',
      background: C.cream,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(16px, 2.5vw, 28px)',
          alignItems: 'stretch',
        }} className="jd-cards-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.n} service={s} delay={i * 0.12} />
          ))}
        </div>

        {/* Note bas de page */}
        <Reveal delay={0.4} style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{
            fontFamily: F.sans,
            fontSize: '0.75rem',
            color: C.muted,
            fontWeight: 300,
            fontStyle: 'italic',
          }}>
            Toutes les formules se déroulent 100% en ligne. Paiement sécurisé à la réservation.
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .jd-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{
      padding: 'clamp(88px, 12vw, 160px) clamp(28px, 8vw, 120px)',
      background: C.black,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top edge */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.gold}40 35%, ${C.gold}40 65%, transparent)`,
      }} />

      {/* Ghost lettering */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: F.serif,
        fontSize: 'clamp(5rem, 15vw, 18rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        formules
      </div>

      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}>
        <Reveal>
          <Label light>Parlons de votre projet</Label>

          <h2 style={{
            fontFamily: F.serif,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.white,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            margin: '0 0 20px',
          }}>
            Pas sûre de la formule qui vous convient&nbsp;?
          </h2>

          <p style={{
            fontFamily: F.sans,
            fontSize: '0.92rem',
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.9,
            fontWeight: 300,
            margin: '0 0 48px',
          }}>
            Je réponds personnellement à chaque message.<br />
            Sans engagement, sans jargon.
          </p>

          <motion.a
            href="https://wa.me/33600000000?text=Bonjour%20By%20Julie%20D%C3%A9co%2C%20j%27ai%20une%20question%20sur%20vos%20formules."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'services_cta' })}
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

          {/* Separator ornament */}
          <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 1, background: `${C.gold}30` }} />
            <span style={{ fontFamily: F.serif, fontSize: '0.85rem', fontStyle: 'italic', color: `${C.gold}45` }}>
              by-julie-deco.fr
            </span>
            <div style={{ width: 36, height: 1, background: `${C.gold}30` }} />
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

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const schemaPrestations = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://by-julie-deco.fr' },
        { '@type': 'ListItem', position: 2, name: 'Prestations', item: 'https://by-julie-deco.fr/prestations' },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Prestations By Julie Déco',
      itemListElement: [
        {
          '@type': 'ListItem', position: 1,
          item: {
            '@type': 'Service',
            name: 'Conseil déco + moodboard',
            description: 'Analyse de votre espace sur photos, planche tendance personnalisée, palette couleurs & matières, échange visio 45 min.',
            offers: { '@type': 'Offer', price: '150', priceCurrency: 'EUR' },
            provider: { '@id': 'https://by-julie-deco.fr/#business' },
          },
        },
        {
          '@type': 'ListItem', position: 2,
          item: {
            '@type': 'Service',
            name: 'Sélection mobilier',
            description: 'Sélection de 15 à 25 références mobilier avec liens d\'achat directs, plan de disposition et appel de suivi.',
            offers: { '@type': 'Offer', price: '250', priceCurrency: 'EUR' },
            provider: { '@id': 'https://by-julie-deco.fr/#business' },
          },
        },
        {
          '@type': 'ListItem', position: 3,
          item: {
            '@type': 'Service',
            name: 'Accompagnement complet',
            description: 'Moodboard, sélection mobilier, 3 appels visio inclus, suivi personnalisé 30 jours, révisions illimitées.',
            offers: { '@type': 'Offer', price: '490', priceCurrency: 'EUR' },
            provider: { '@id': 'https://by-julie-deco.fr/#business' },
          },
        },
      ],
    },
  ],
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function JDDecoServices() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPrestations) }} />
      <style>{`
        #jd-root *, #jd-root *::before, #jd-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        #jd-root { -webkit-font-smoothing: antialiased; }
      `}</style>
      <div id="jd-root" style={{ background: C.cream, color: C.black, overflowX: 'hidden' }}>
        {/* Banner plein largeur */}
        <div style={{
          marginTop: 68,
          width: '100%',
          overflow: 'hidden',
          height: '85vh',
          position: 'relative',
        }}>
          <img
            src={imgServicesBanner}
            alt="Ambiance By Julie Déco — Salon"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.35) 70%, transparent)`,
          }} />
        </div>
        <PageHeader />
        <ServicesGrid />
        <CTASection />
      </div>
    </>
  );
}
