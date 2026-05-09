// Landing page — Dra. Lucia Nosetti
const { useState, useEffect, useRef } = React;

// ── Color tokens (mirror de CSS custom properties para inline styles dinámicos) ──
const C = {
  white:      '#FFFFFF',
  warmWhite:  '#FDFCFB',
  altSection: '#FDF5F6',
  pink:       '#F2C4CE',
  pinkSoft:   '#F9E0E5',
  pinkNude:   '#E8A0A8',
  ink:        '#2C1F22',
  inkMuted:   '#8C6B70',
  border:     'rgba(232, 160, 168, 0.22)',
  shadowPink: '0 18px 40px -20px rgba(232, 160, 168, 0.45)',
};

const WA_LINK = 'https://wa.me/541169323425?text=Hola%20Dra.%20Lucia%2C%20me%20comunico%20desde%20su%20p%C3%A1gina%20web%20para%20solicitar%20un%20turno.';
const IG_LINK = 'https://www.instagram.com/dralucianosetti';
const LI_LINK = 'https://www.linkedin.com/in/lucia-nosetti-39368b118';
const MAIL    = 'luchi_nosetti@hotmail.com';
const MAPS    = 'https://maps.app.goo.gl/bYQgyrgLhbyiGyDC9?g_st=iw';
const ADDRESS = 'Larrea 1012, Recoleta, CABA';

// ── Reveal on scroll ──────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as = 'div', style = {}, ...rest }) {
  const [ref, shown] = useReveal();
  const Comp = as;
  return (
    <Comp
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// ── Image placeholder ─────────────────────────────────────────────────────────
function Placeholder({ label, ratio = '3/4', radius = 12, style = {} }) {
  return (
    <div style={{
      width: '100%', aspectRatio: ratio, borderRadius: radius, maxHeight: 'calc(100vh - 140px)',
      background: `linear-gradient(135deg, ${C.pinkSoft} 0%, ${C.pink} 60%, ${C.pinkNude} 120%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 30px 60px -30px rgba(232, 160, 168, 0.55)',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 14px)',
      }} />
      <span style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 12, letterSpacing: 2, color: 'rgba(44,31,34,0.65)',
        background: 'rgba(255,255,255,0.7)', padding: '8px 14px',
        borderRadius: 999, backdropFilter: 'blur(4px)',
      }}>{label}</span>
    </div>
  );
}

// ── Logo chip ─────────────────────────────────────────────────────────────────
function LogoChip({ label = 'LOGO' }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: `linear-gradient(135deg, ${C.pinkSoft}, ${C.pink})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 9, color: 'rgba(44,31,34,0.7)', letterSpacing: 1, flexShrink: 0,
    }}>{label}</div>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
function SectionTag({ children }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, letterSpacing: 2.5,
      textTransform: 'uppercase', color: C.pinkNude, fontWeight: 600,
      background: C.altSection, border: `1px solid ${C.border}`,
      padding: '6px 14px', borderRadius: 999, marginBottom: 18,
    }}>{children}</span>
  );
}

const titleStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300, fontSize: 'clamp(36px, 4vw, 52px)',
  lineHeight: 1.05, margin: '0 0 22px', color: '#2C1F22', letterSpacing: '-0.01em',
};

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Inicio', '#inicio'],
    ['Sobre mí', '#sobre-mi'],
    ['Procedimientos', '#procedimientos'],
    ['Formación', '#formacion'],
    ['Experiencia', '#experiencia'],
    ['Instagram', '#instagram'],
    ['Turnos', '#turnos'],
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50, height: 70,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
      transition: 'background .3s ease, border-color .3s ease',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', height: '100%', padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#inicio" onClick={(e) => handleClick(e, '#inicio')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <LogoChip label="LN" />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 20, color: C.ink }}>
              Dra. Lucia Nosetti
            </span>
            <span style={{ fontSize: 11, color: C.pinkNude, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 2 }}>
              Dermatología · Estética
            </span>
          </div>
        </a>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => handleClick(e, href)}
              style={{ color: C.ink, textDecoration: 'none', fontSize: 14, fontWeight: 400, transition: 'color .2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.pinkNude}
              onMouseLeave={(e) => e.currentTarget.style.color = C.ink}
            >{label}</a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta-pill" style={{
            background: C.pinkNude, color: '#fff', padding: '10px 18px',
            borderRadius: 999, fontSize: 13, fontWeight: 500, textDecoration: 'none',
            boxShadow: '0 6px 18px -8px rgba(232,160,168,0.7)',
          }}>Pedir turno</a>
        </div>

        <button className="nav-burger" aria-label="Menú" onClick={() => setOpen(o => !o)} style={{
          display: 'none', background: 'transparent', border: 0, cursor: 'pointer', width: 40, height: 40, padding: 0,
        }}>
          <span style={{ display: 'block', width: 22, height: 2, background: C.ink, margin: '5px auto', transition: 'transform .25s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: C.ink, margin: '5px auto', opacity: open ? 0 : 1, transition: 'opacity .2s' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: C.ink, margin: '5px auto', transition: 'transform .25s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      <div className="mobile-menu" style={{
        display: 'none', background: '#fff', borderBottom: `1px solid ${C.border}`,
        maxHeight: open ? 600 : 0, overflow: 'hidden', transition: 'max-height .35s ease',
      }}>
        <div style={{ padding: '14px 28px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => handleClick(e, href)}
              style={{ color: C.ink, textDecoration: 'none', fontSize: 16, padding: '8px 0', borderBottom: `1px solid ${C.altSection}` }}
            >{label}</a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
            marginTop: 8, background: C.pinkNude, color: '#fff', padding: '12px 18px',
            borderRadius: 999, textDecoration: 'none', textAlign: 'center', fontWeight: 500,
          }}>Pedir turno</a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="inicio" style={{
      scrollMarginTop: 70,
      position: 'relative', height: '100vh', boxSizing: 'border-box', display: 'flex', alignItems: 'flex-start',
      background: `radial-gradient(ellipse at 30% 30%, ${C.pinkSoft} 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, ${C.pink}55 0%, transparent 60%), ${C.warmWhite}`,
      overflow: 'hidden',
    }}>
      <div className="float-slow" style={{ position: 'absolute', top: '8%', right: '5%', width: 280, height: 280, borderRadius: '50%', border: `1.5px solid ${C.pink}`, opacity: 0.3, pointerEvents: 'none' }} />
      <div className="float-slow" style={{ position: 'absolute', bottom: '12%', left: '-4%', width: 220, height: 220, borderRadius: '50%', border: `1.5px solid ${C.pinkNude}`, opacity: 0.25, pointerEvents: 'none', animationDelay: '-2s' }} />
      <div className="float-slow" style={{ position: 'absolute', top: '40%', left: '38%', width: 110, height: 110, borderRadius: '50%', border: `1px solid ${C.pinkNude}`, opacity: 0.2, pointerEvents: 'none', animationDelay: '-4s' }} />

      <div className="hero-grid" style={{
        maxWidth: 1240, margin: '0 auto', padding: '40px 28px 20px', width: '100%',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 48, alignItems: 'center', position: 'relative',
      }}>
        <Reveal>
          <span style={{
            display: 'inline-block', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            color: C.pinkNude, fontWeight: 500, background: 'rgba(255,255,255,0.7)',
            border: `1px solid ${C.border}`, padding: '8px 16px', borderRadius: 999, marginBottom: 28,
          }}>Médica Especialista · Mat. Nac. 166.497</span>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: 'clamp(48px, 6vw, 78px)', lineHeight: 1.02,
            margin: '0 0 22px', color: C.ink, letterSpacing: '-0.01em',
          }}>
            Dra. Lucia<br />
            <em style={{ fontWeight: 400, color: C.pinkNude }}>Nosetti</em>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.6, color: C.ink, maxWidth: 520, margin: '0 0 14px', fontWeight: 500, textAlign: 'justify' }}>
            Dermatología Pediátrica & Medicina Estética.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.inkMuted, maxWidth: 520, margin: '0 0 36px', fontWeight: 300, textAlign: 'justify' }}>
            Cuidado integral de la piel en todas las etapas de la vida.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">Pedir turno</a>
            <a href="#sobre-mi" onClick={(e) => { e.preventDefault(); document.querySelector('#sobre-mi').scrollIntoView({ behavior: 'smooth' }); }} className="btn-outline">Conocé más</a>
          </div>
        </Reveal>

        <Reveal delay={150} style={{ position: 'relative' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden' }}>
            <img src="images/foto_principal.webp" alt="Dra. Lucia Nosetti" style={{ width: '100%', maxHeight: 'calc(100vh - 180px)', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          </div>
          <div className="float-slow" style={{
            position: 'absolute', bottom: 24, left: -22, background: '#fff',
            padding: '14px 20px', borderRadius: 14, boxShadow: C.shadowPink,
            border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12, animationDelay: '-1s',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: C.pinkSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.pinkNude,
            }}>9+</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.inkMuted }}>Años de</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: C.ink }}>experiencia</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Sobre mí ──────────────────────────────────────────────────────────────────
function Sobre() {
  return (
    <section id="sobre-mi" style={{ background: '#fff', padding: '120px 0' }}>
      <div className="about-grid" style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 28px',
        display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center',
      }}>
        <Reveal>
          <img src="images/foto_de_perfil.webp" alt="Dra. Lucia Nosetti" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 12, display: 'block' }} />
        </Reveal>
        <Reveal delay={120}>
          <SectionTag>Sobre mí</SectionTag>
          <h2 style={titleStyle}>
            Una medicina cercana,<br /><em style={{ color: C.pinkNude, fontWeight: 400 }}>desde adentro</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: C.inkMuted, fontSize: 16, lineHeight: 1.7, fontWeight: 300, marginBottom: 36, textAlign: 'justify' }}>
            <p style={{ margin: 0 }}>Soy médica especialista en dermatología pediátrica y medicina estética, dedicada al cuidado integral de la piel en todas las etapas de la vida.</p>
            <p style={{ margin: 0 }}>Acompaño a bebés, niños y adolescentes desde los primeros días, abordando patologías frecuentes y cuadros complejos con un enfoque cálido, respetuoso y personalizado para cada familia.</p>
            <p style={{ margin: 0 }}>En medicina estética, trabajo en la prevención y el tratamiento del envejecimiento cutáneo, buscando resultados naturales que respeten la armonía de cada paciente.</p>
            <p style={{ margin: 0 }}>Creo en una medicina cercana, donde cada consulta sea un espacio de confianza, escucha y acompañamiento.</p>
          </div>
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {[['9+', 'Años de experiencia'], ['3', 'Especialidades médicas']].map(([n, l], i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ background: C.altSection, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: C.pinkNude, fontWeight: 400, lineHeight: 1 }}>{n}</span>
                    <span style={{ fontSize: 13, color: C.inkMuted, lineHeight: 1.4 }}>{l}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Procedimientos ────────────────────────────────────────────────────────────
function Procedimientos() {
  const items = [
    ['Extracción de moluscos', 'Tratamiento seguro y preciso para niños y adultos.'],
    ['Biopsia de piel', 'Diagnóstico dermatológico bajo estrictos protocolos.'],
    ['Mapeo 360° de lunares', 'Seguimiento digital completo de lesiones pigmentadas.'],
    ['Peeling químico', 'Renovación celular con resultados visibles y duraderos.'],
    ['PRP capilar y facial', 'Plasma rico en plaquetas para rejuvenecimiento y caída del cabello.'],
    ['Mesoterapia', 'Microinyecciones para hidratación profunda y tratamiento capilar.'],
    ['Microagujas', 'Estimulación del colágeno para mejorar la textura de la piel.'],
    ['Toxina botulínica', 'Suavizado de expresiones con resultados naturales.'],
  ];
  const conditions = [
    ['Dermatitis atópica pediátrica', 'Tratamiento integral para piel sensible en niños y adolescentes.'],
    ['Rosácea', 'Manejo del enrojecimiento facial y brotes con protocolos específicos.'],
    ['Piel del recién nacido', 'Acompañamiento desde los primeros días de vida.'],
    ['Verruga vulgar', 'Eliminación efectiva de lesiones causadas por HPV cutáneo.'],
    ['Molusco contagioso', 'Tratamiento ambulatorio cuidadoso para chicos y adultos.'],
    ['Acné adolescente', 'Plan personalizado para controlar brotes y prevenir cicatrices.'],
    ['Skincare especializado', 'Rutinas adaptadas a cada tipo y etapa de la piel.'],
    ['Lesiones pigmentadas', 'Evaluación, seguimiento y tratamiento de manchas cutáneas.'],
  ];

  const renderGrid = (data) => (
    <div className="proc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
      {data.map(([title, desc], i) => (
        <Reveal key={title} delay={(i % 4) * 80}>
          <div className="proc-card" style={{
            background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14,
            padding: '26px 22px', height: '100%',
            transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease', cursor: 'default',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.pinkNude }} />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.ink, margin: '0 0 8px', lineHeight: 1.2 }}>{title}</h3>
            <p style={{ fontSize: 14, color: C.inkMuted, lineHeight: 1.55, margin: 0, fontWeight: 300, textAlign: 'justify' }}>{desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section id="procedimientos" style={{ background: C.altSection, padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -120, right: -100, width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, ${C.pinkSoft} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionTag>Procedimientos</SectionTag>
            <h2 style={{ ...titleStyle, textAlign: 'center' }}>
              Medicina para <em style={{ color: C.pinkNude, fontWeight: 400 }}>tu piel</em>
            </h2>
            <p style={{ color: C.inkMuted, fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Soluciones dermatológicas y estéticas integrales con un enfoque profesional.
            </p>
          </div>
        </Reveal>
        {renderGrid(items)}

        <Reveal>
          <div style={{ textAlign: 'center', marginTop: 100, marginBottom: 60 }}>
            <SectionTag>Patologías</SectionTag>
            <h2 style={{ ...titleStyle, textAlign: 'center' }}>
              Compromiso con <em style={{ color: C.pinkNude, fontWeight: 400 }}>tu salud</em>
            </h2>
            <p style={{ color: C.inkMuted, fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Comprendemos la naturaleza de cada patología para acompañarte con los tratamientos adecuados.
            </p>
          </div>
        </Reveal>
        {renderGrid(conditions)}
      </div>
    </section>
  );
}

// ── Formación ─────────────────────────────────────────────────────────────────
function Formacion() {
  const timeline = [
    ['2017',      'Médica (MN 166.497)',                    'Universidad del Salvador',       'USAL', 'https://www.usal.edu.ar/ingreso/'],
    ['2018–2021', 'Residencia de Pediatría',                'Hospital Alemán',                'ALEM', 'https://www.hospitalaleman.org.ar/'],
    ['2022',      'Posgrado en Medicina Estética',           'SAEME · UBA', 'SAEM', 'https://saeme.com.ar/'],
    ['2022–2025', 'Residencia de Dermatología Pediátrica',  'Hospital Ramos Mejía', 'RAMO', 'https://buenosaires.gob.ar/gcaba_historico/salud/hospitales-y-establecimientos-de-salud/hospital-ramos-mejia'],
  ];

  // altura del bloque de contenido arriba/abajo de la línea
  const BLOCK = 140;
  const DOT = 16;

  return (
    <section id="formacion" style={{ background: '#fff', padding: '120px 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
        <Reveal>
          <SectionTag>Formación</SectionTag>
          <h2 style={titleStyle}>Trayectoria <em style={{ color: C.pinkNude, fontWeight: 400 }}>académica</em></h2>
        </Reveal>

        {/* Timeline zigzag horizontal */}
        <div className="timeline-h" style={{ position: 'relative', marginTop: 48, height: BLOCK * 2 + DOT + 40 }}>
          {/* línea central */}
          <div className="timeline-h-line" style={{
            position: 'absolute', top: BLOCK + DOT / 2, left: 0, right: 0,
            height: 2, background: `linear-gradient(to right, ${C.pink}, ${C.pinkSoft})`,
          }} />

          <div className="timeline-h-items" style={{ display: 'flex', height: '100%', position: 'relative' }}>
            {timeline.map(([year, title, place, logo, url], i) => {
              const above = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 100} style={{ flex: 1, position: 'relative' }}>
                  {/* punto conector en la línea central */}
                  <div style={{
                    position: 'absolute', top: BLOCK, left: 0,
                    width: DOT, height: DOT, borderRadius: '50%',
                    background: C.pinkNude, border: '3px solid #fff', boxShadow: `0 0 0 2px ${C.pink}`,
                  }} />

                  {/* contenido arriba o abajo */}
                  <div className="timeline-content" style={{
                    position: 'absolute', left: 0, paddingRight: 20,
                    ...(above
                      ? { top: 0, height: BLOCK - 12, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
                      : { top: BLOCK + DOT + 12 }),
                  }}>
                    <div style={{ fontSize: 12, color: C.pinkNude, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{year}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: C.ink, margin: '0 0 6px', lineHeight: 1.25 }}>{title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <LogoChip label={logo} />
                      <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: C.inkMuted, textDecoration: 'none', transition: 'transform .2s ease', display: 'inline-block' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >{place}</a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experiencia ───────────────────────────────────────────────────────────────
function Experiencia() {
  const exp = [
    ['Hospital Alemán',     'https://www.hospitalaleman.org.ar/'],
    ['Sanatorio San José',  'https://www.sanatoriosanjose.org.ar/'],
    ['Clínica Zabala',      'https://www.swissmedical.com.ar/clinewsite/zabala/'],
    ['Ministerio de Salud', 'https://buenosaires.gob.ar/gcaba_historico/salud'],
  ];

  return (
    <section id="experiencia" style={{ background: C.altSection, padding: '120px 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
        <Reveal>
          <SectionTag>Experiencia</SectionTag>
          <h2 style={titleStyle}>Recorrido <em style={{ color: C.pinkNude, fontWeight: 400 }}>profesional</em></h2>
        </Reveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 36 }}>
          {exp.map(([place, url], i) => (
            <Reveal key={place} delay={i * 70}>
              <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div className="exp-card" style={{
                  background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12,
                  padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'transform .25s ease, box-shadow .25s ease', cursor: 'pointer',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.pinkNude, flexShrink: 0, boxShadow: `0 0 0 4px ${C.pinkSoft}` }} />
                  <div style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{place}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Instagram ─────────────────────────────────────────────────────────────────
function Instagram() {
  useEffect(() => {
    if (window.instgrm) { window.instgrm.Embeds.process(); return; }
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const s = document.createElement('script');
      s.src = '//www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section id="instagram" style={{ background: '#fff', padding: '120px 0' }}>
      <div className="ig-grid" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'flex', gap: 80, alignItems: 'center' }}>

        {/* Video izquierda */}
        <Reveal delay={120} style={{ flexShrink: 0, width: 480 }}>
          <div style={{
            width: 480, background: '#fff', borderRadius: 18, padding: 12,
            boxShadow: '0 30px 60px -30px rgba(232,160,168,0.6)', border: `1px solid ${C.border}`,
          }}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DP3zU3jADq6/?igsh=cGIydjE2dTdmamN3"
              data-instgrm-version="14"
              style={{ background: '#FFF', border: 0, margin: '0 auto', maxWidth: 480, minWidth: 0, padding: 0, width: '100%' }}
            >
              <div style={{ padding: 16, textAlign: 'center', color: C.inkMuted, fontSize: 14 }}>
                Cargando contenido de Instagram…
              </div>
            </blockquote>
          </div>
        </Reveal>

        {/* Texto derecha */}
        <Reveal style={{ flex: 1 }}>
          <SectionTag>Instagram</SectionTag>
          <h2 style={{ ...titleStyle, textAlign: 'left' }}>
            Seguime en <em style={{ color: C.pinkNude, fontWeight: 400 }}>Instagram</em>
          </h2>
          <p style={{ color: C.pinkNude, fontSize: 16, fontWeight: 500, margin: '0 0 36px' }}>@dralucianosetti</p>
          <a href={IG_LINK} target="_blank" rel="noreferrer" className="btn-outline">Ver más en Instagram</a>
        </Reveal>

      </div>
    </section>
  );
}

// ── Turnos ────────────────────────────────────────────────────────────────────
function Turnos() {
  const horarios = [
    ['Martes',  '9:00 – 12:00 hs  /  17:00 – 19:00 hs'],
    ['Viernes', '9:00 – 12:00 hs  /  17:00 – 19:00 hs'],
  ];

  return (
    <section id="turnos" style={{ background: '#fff', padding: '120px 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionTag>Turnos</SectionTag>
            <h2 style={{ ...titleStyle, textAlign: 'center' }}>
              Visitanos en <em style={{ color: C.pinkNude, fontWeight: 400 }}>Recoleta</em>
            </h2>
          </div>
        </Reveal>

        <div className="turnos-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div style={{ background: C.altSection, border: `1px solid ${C.border}`, borderRadius: 18, padding: '36px 34px', height: '100%' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.ink, margin: '0 0 8px' }}>Consultorio en Recoleta</h3>
              <p style={{ color: C.inkMuted, fontSize: 15, margin: '0 0 8px' }}>{ADDRESS}</p>
              <a href={MAPS} target="_blank" rel="noreferrer" style={{ color: C.pinkNude, fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${C.pink}`, paddingBottom: 2 }}>Ver en Google Maps →</a>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: C.pinkNude, fontWeight: 500, marginBottom: 14 }}>Horarios de atención</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {horarios.map(([dia, hora], i) => (
                    <div key={i} className="horario-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < horarios.length - 1 ? `1px dashed ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 15, color: C.ink, fontWeight: 500 }}>{dia}</span>
                      <span style={{ fontSize: 14, color: C.inkMuted }}>{hora}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: '40px 34px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: C.shadowPink }}>
              <div className="float-slow" style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${C.pinkSoft}, ${C.pink})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
                  <path d="M3 5a2 2 0 0 1 2-2h2.5a1 1 0 0 1 1 .76l1 4a1 1 0 0 1-.55 1.13l-1.85.93a13 13 0 0 0 6.08 6.08l.93-1.85a1 1 0 0 1 1.13-.55l4 1a1 1 0 0 1 .76 1V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400, color: C.ink, margin: '0 0 10px' }}>Solicitá tu turno</h3>
              <p style={{ color: C.inkMuted, fontSize: 15, margin: '0 0 26px', maxWidth: 320, lineHeight: 1.55 }}>Escribinos por WhatsApp y coordinamos.</p>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="#fff" style={{ marginRight: 10, verticalAlign: 'middle', flexShrink: 0 }}>
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.653 4.827 1.797 6.854L2 30l7.356-1.768A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.607l-.422-.252-4.366 1.05 1.083-4.253-.276-.437A11.543 11.543 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.33-8.63c-.347-.174-2.054-1.013-2.374-1.129-.32-.116-.553-.174-.786.174-.232.347-.9 1.129-1.104 1.362-.203.232-.406.26-.753.087-.347-.174-1.465-.54-2.79-1.722-1.031-.92-1.727-2.055-1.93-2.402-.203-.347-.022-.535.153-.708.157-.155.347-.406.52-.609.174-.203.232-.347.347-.58.116-.232.058-.435-.029-.609-.087-.174-.786-1.893-1.076-2.592-.283-.68-.57-.588-.786-.598l-.668-.011c-.232 0-.609.087-.927.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.366 1.42 3.598c.174.232 2.452 3.744 5.942 5.25.83.358 1.478.572 1.983.732.833.265 1.591.228 2.19.138.668-.1 2.054-.84 2.345-1.651.29-.812.29-1.507.203-1.652-.087-.145-.319-.232-.667-.406z"/>
                </svg>
                Solicitar turno por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Galería Consultorio ───────────────────────────────────────────────────────
function GaleriaConsultorio() {
  // Reemplazá estas rutas con las fotos reales del consultorio
  const fotos = [
    'images/Consultorio1.webp',
    'images/Consultorio2.webp',
    'images/Consultorio3.webp',
  ];
  // Triplicamos para que el loop sea continuo y nunca se vea el salto
  const todas = [...fotos, ...fotos, ...fotos];

  return (
    <section style={{ background: C.altSection, padding: '80px 0', overflow: 'hidden' }}>
      <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
        <SectionTag>Consultorio</SectionTag>
        <h2 style={{ ...titleStyle, textAlign: 'center' }}>
          Nuestro <em style={{ color: C.pinkNude, fontWeight: 400 }}>espacio</em>
        </h2>
      </Reveal>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="carousel-track">
          {todas.map((src, i) => (
            <div key={i} className="carousel-item" style={{
              flexShrink: 0, width: 420, height: 300, borderRadius: 20, overflow: 'hidden',
              border: `1px solid ${C.border}`, boxShadow: C.shadowPink,
            }}>
              <img
                src={src}
                alt={`Consultorio ${(i % 3) + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = C.pinkSoft;
                  e.currentTarget.parentElement.style.display = 'flex';
                  e.currentTarget.parentElement.style.alignItems = 'center';
                  e.currentTarget.parentElement.style.justifyContent = 'center';
                  e.currentTarget.parentElement.innerHTML = `<span style="color:${C.pinkNude};font-size:13px;font-family:ui-monospace,monospace;letter-spacing:1.5px">[ FOTO ${(i % 3) + 1} ]</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ padding: '120px 28px', background: `radial-gradient(ellipse at center, ${C.pinkSoft} 0%, ${C.pink}55 35%, #fff 80%)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="float-slow" style={{ position: 'absolute', top: '20%', left: '8%', width: 180, height: 180, borderRadius: '50%', border: `1px solid ${C.pinkNude}`, opacity: 0.3 }} />
      <div className="float-slow" style={{ position: 'absolute', bottom: '15%', right: '10%', width: 140, height: 140, borderRadius: '50%', border: `1px solid ${C.pink}`, opacity: 0.4, animationDelay: '-3s' }} />
      <Reveal>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 64px)', color: C.ink, margin: '0 0 18px', lineHeight: 1.1 }}>
          ¿Querés <em style={{ color: C.pinkNude, fontWeight: 400 }}>pedir un turno?</em>
        </h2>
        <p style={{ color: C.inkMuted, fontSize: 18, margin: '0 0 36px', fontWeight: 300 }}>Escribinos por WhatsApp y coordinamos.</p>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ fontSize: 16 }}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="#fff" style={{ marginRight: 10, verticalAlign: 'middle', flexShrink: 0 }}>
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.653 4.827 1.797 6.854L2 30l7.356-1.768A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.607l-.422-.252-4.366 1.05 1.083-4.253-.276-.437A11.543 11.543 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.33-8.63c-.347-.174-2.054-1.013-2.374-1.129-.32-.116-.553-.174-.786.174-.232.347-.9 1.129-1.104 1.362-.203.232-.406.26-.753.087-.347-.174-1.465-.54-2.79-1.722-1.031-.92-1.727-2.055-1.93-2.402-.203-.347-.022-.535.153-.708.157-.155.347-.406.52-.609.174-.203.232-.347.347-.58.116-.232.058-.435-.029-.609-.087-.174-.786-1.893-1.076-2.592-.283-.68-.57-.588-.786-.598l-.668-.011c-.232 0-.609.087-.927.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.366 1.42 3.598c.174.232 2.452 3.744 5.942 5.25.83.358 1.478.572 1.983.732.833.265 1.591.228 2.19.138.668-.1 2.054-.84 2.345-1.651.29-.812.29-1.507.203-1.652-.087-.145-.319-.232-.667-.406z"/>
          </svg>
          Solicitar turno por WhatsApp
        </a>
      </Reveal>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    ['Instagram', IG_LINK,   <svg key="i" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>],
    ['LinkedIn',  LI_LINK,   <svg key="l" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7"/></svg>],
    ['WhatsApp',  'https://wa.me/541169323425', <svg key="w" width="18" height="18" viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.653 4.827 1.797 6.854L2 30l7.356-1.768A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.607l-.422-.252-4.366 1.05 1.083-4.253-.276-.437A11.543 11.543 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.33-8.63c-.347-.174-2.054-1.013-2.374-1.129-.32-.116-.553-.174-.786.174-.232.347-.9 1.129-1.104 1.362-.203.232-.406.26-.753.087-.347-.174-1.465-.54-2.79-1.722-1.031-.92-1.727-2.055-1.93-2.402-.203-.347-.022-.535.153-.708.157-.155.347-.406.52-.609.174-.203.232-.347.347-.58.116-.232.058-.435-.029-.609-.087-.174-.786-1.893-1.076-2.592-.283-.68-.57-.588-.786-.598l-.668-.011c-.232 0-.609.087-.927.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.366 1.42 3.598c.174.232 2.452 3.744 5.942 5.25.83.358 1.478.572 1.983.732.833.265 1.591.228 2.19.138.668-.1 2.054-.84 2.345-1.651.29-.812.29-1.507.203-1.652-.087-.145-.319-.232-.667-.406z"/></svg>],
    ['Email',     `mailto:${MAIL}`, <svg key="m" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>],
  ];

  return (
    <footer style={{ background: '#fff', borderTop: `1px solid ${C.pink}`, padding: '40px 28px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map(([label, href, icon]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              style={{ width: 42, height: 42, borderRadius: '50%', background: C.altSection, color: C.pinkNude, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', border: `1px solid ${C.border}`, transition: 'transform .2s, background .2s, color .2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.pinkNude; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.altSection; e.currentTarget.style.color = C.pinkNude; e.currentTarget.style.transform = 'translateY(0)'; }}
            >{icon}</a>
          ))}
        </div>
        <p style={{ fontSize: 13, color: C.inkMuted, margin: 0, textAlign: 'center' }}>
          © 2025 Dra. Lucia Nosetti · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Procedimientos />
        <Formacion />
        <Experiencia />
        <Instagram />
        <Turnos />
        <GaleriaConsultorio />
        <FinalCTA />
      </main>
      <Footer />
    </React.Fragment>
  );
}

window.LandingPage = LandingPage;
