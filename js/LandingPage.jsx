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
    ['Instagram', '#instagram'],
    ['Turnos', '#turnos'],
    ['Contacto', '#contacto'],
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
      position: 'relative', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box', display: 'flex', alignItems: 'center',
      background: `radial-gradient(ellipse at 30% 30%, ${C.pinkSoft} 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, ${C.pink}55 0%, transparent 60%), ${C.warmWhite}`,
      overflow: 'hidden',
    }}>
      <div className="float-slow" style={{ position: 'absolute', top: '8%', right: '5%', width: 280, height: 280, borderRadius: '50%', border: `1.5px solid ${C.pink}`, opacity: 0.3, pointerEvents: 'none' }} />
      <div className="float-slow" style={{ position: 'absolute', bottom: '12%', left: '-4%', width: 220, height: 220, borderRadius: '50%', border: `1.5px solid ${C.pinkNude}`, opacity: 0.25, pointerEvents: 'none', animationDelay: '-2s' }} />
      <div className="float-slow" style={{ position: 'absolute', top: '40%', left: '38%', width: 110, height: 110, borderRadius: '50%', border: `1px solid ${C.pinkNude}`, opacity: 0.2, pointerEvents: 'none', animationDelay: '-4s' }} />

      <div className="hero-grid" style={{
        maxWidth: 1240, margin: '0 auto', padding: '20px 28px', width: '100%',
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
          <img src="images/foto_principal.webp" alt="Dra. Lucia Nosetti" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 12, display: 'block', maxHeight: 'calc(100vh - 140px)' }} />
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
    ['2022',      'Posgrado en Medicina Estética',           'SAEME · UBA (Sociedad Argentina de Especialistas en Medicina Estética)', 'SAEM', 'https://saeme.com.ar/'],
    ['2022–2025', 'Residencia de Dermatología Pediátrica',  'Hospital Ramos Mejía',           'RAMO', 'https://buenosaires.gob.ar/gcaba_historico/salud/hospitales-y-establecimientos-de-salud/hospital-ramos-mejia'],
  ];
  const exp = [
    ['Hospital Alemán',        'https://www.hospitalaleman.org.ar/'],
    ['Sanatorio San José',     'https://www.sanatoriosanjose.org.ar/'],
    ['Clínica Zabala',         'https://www.swissmedical.com.ar/clinewsite/zabala/'],
    ['Ministerio de Salud', 'https://buenosaires.gob.ar/gcaba_historico/salud'],
  ];

  return (
    <section id="formacion" style={{ background: '#fff', padding: '120px 0' }}>
      <div className="form-grid" style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 28px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
      }}>
        <Reveal>
          <SectionTag>Formación</SectionTag>
          <h2 style={titleStyle}>Trayectoria <em style={{ color: C.pinkNude, fontWeight: 400 }}>académica</em></h2>
          <div style={{ position: 'relative', paddingLeft: 36, marginTop: 36 }}>
            <div style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 2, background: `linear-gradient(${C.pink}, ${C.pinkSoft})` }} />
            {timeline.map(([year, title, place, logo, url], i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ position: 'relative', marginBottom: 36 }}>
                  <div style={{ position: 'absolute', left: -32, top: 4, width: 16, height: 16, borderRadius: '50%', background: C.pinkNude, border: '3px solid #fff', boxShadow: `0 0 0 2px ${C.pink}` }} />
                  <div style={{ fontSize: 12, color: C.pinkNude, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{year}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.ink, margin: '0 0 6px', lineHeight: 1.25 }}>{title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <LogoChip label={logo} />
                    <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: C.inkMuted, textDecoration: 'none', transition: 'transform .2s ease', display: 'inline-block' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >{place}</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <SectionTag>Experiencia</SectionTag>
          <h2 style={titleStyle}>Recorrido <em style={{ color: C.pinkNude, fontWeight: 400 }}>profesional</em></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 36 }}>
            {exp.map(([place, url], i) => (
              <Reveal key={place} delay={i * 70}>
                <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div className="exp-card" style={{
                  background: C.altSection, border: `1px solid ${C.border}`, borderRadius: 12,
                  padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'transform .25s ease, box-shadow .25s ease', cursor: 'pointer',
                  maxWidth: '87%',
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
        </Reveal>
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
    <section id="instagram" style={{ background: C.altSection, padding: '120px 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
        <Reveal>
          <SectionTag>Instagram</SectionTag>
          <h2 style={{ ...titleStyle, textAlign: 'center' }}>
            Seguime en <em style={{ color: C.pinkNude, fontWeight: 400 }}>Instagram</em>
          </h2>
          <p style={{ color: C.pinkNude, fontSize: 16, fontWeight: 500, margin: '0 0 50px' }}>@dralucianosetti</p>
        </Reveal>
        <Reveal delay={120}>
          <div style={{
            maxWidth: 400, margin: '0 auto 32px', background: '#fff', borderRadius: 18, padding: 12,
            boxShadow: '0 30px 60px -30px rgba(232,160,168,0.6)', border: `1px solid ${C.border}`,
          }}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DP3zU3jADq6/?igsh=cGIydjE2dTdmamN3"
              data-instgrm-version="14"
              style={{ background: '#FFF', border: 0, margin: '0 auto', maxWidth: 400, minWidth: 0, padding: 0, width: '100%' }}
            >
              <div style={{ padding: 16, textAlign: 'center', color: C.inkMuted, fontSize: 14 }}>
                Cargando contenido de Instagram…
              </div>
            </blockquote>
          </div>
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
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < horarios.length - 1 ? `1px dashed ${C.border}` : 'none' }}>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: 10, verticalAlign: 'middle' }}>
                  <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 1.1c-.2.2-.4.2-.7.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z"/>
                  <path d="M20.5 3.5A10 10 0 0 0 4.1 16.6L3 21l4.5-1.2a10 10 0 0 0 13-15.3zM12 19.6a7.6 7.6 0 0 1-3.9-1.1l-.3-.2-2.8.7.7-2.7-.2-.3a7.6 7.6 0 1 1 6.5 3.6z"/>
                </svg>
                Solicitar turno por WhatsApp
              </a>
              <p style={{ color: C.inkMuted, fontSize: 12.5, margin: '20px 0 0', fontStyle: 'italic' }}>Respondemos a la brevedad en horario de atención.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Consultas ─────────────────────────────────────────────────────────────────
function Consultas() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', edad: '', consulta: '' });
  const [status, setStatus] = useState('idle');

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // TODO: reemplazar con tu URL de Google Apps Script
    const GOOGLE_SCRIPT_URL = '';
    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus('success');
      setForm({ nombre: '', apellido: '', email: '', edad: '', consulta: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10,
    padding: '14px 16px', fontSize: 15, fontFamily: 'inherit', color: C.ink,
    outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  };
  const labelStyle = {
    display: 'block', fontSize: 12, color: C.inkMuted,
    letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 500,
  };

  return (
    <section id="contacto" style={{ background: C.altSection, padding: '120px 0' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 28px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionTag>Contacto</SectionTag>
            <h2 style={{ ...titleStyle, textAlign: 'center' }}>
              ¿Tenés alguna <em style={{ color: C.pinkNude, fontWeight: 400 }}>duda?</em>
            </h2>
            <p style={{ color: C.inkMuted, fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Escribinos tu pregunta general y te respondemos a la brevedad. Para consultas médicas específicas, coordiná un turno por WhatsApp.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} style={{ background: '#fff', borderRadius: 20, padding: '40px', border: `1px solid ${C.border}`, boxShadow: '0 30px 60px -30px rgba(232,160,168,0.45)' }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Nombre</label>
                <input className="ff" type="text" required value={form.nombre} onChange={update('nombre')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Apellido</label>
                <input className="ff" type="text" required value={form.apellido} onChange={update('apellido')} style={inputStyle} />
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Correo electrónico</label>
                <input className="ff" type="email" required value={form.email} onChange={update('email')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Edad</label>
                <input className="ff" type="number" required value={form.edad} onChange={update('edad')} style={inputStyle} min="0" max="120" />
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Consulta o pregunta</label>
              <textarea className="ff" required rows={4} value={form.consulta} onChange={update('consulta')} style={{ ...inputStyle, resize: 'vertical', minHeight: 120, fontFamily: 'inherit' }} />
            </div>
            <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ width: '100%', border: 0, cursor: 'pointer', fontSize: 15 }}>
              {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
            </button>
            {status === 'success' && (
              <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 10, background: C.pinkSoft, color: C.ink, fontSize: 14, textAlign: 'center', border: `1px solid ${C.pink}` }}>
                ¡Gracias! Tu consulta fue enviada.
              </div>
            )}
            {status === 'error' && (
              <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 10, background: '#FEE', color: '#A33', fontSize: 14, textAlign: 'center' }}>
                Ocurrió un error. Probá de nuevo o escribinos por WhatsApp.
              </div>
            )}
          </form>
        </Reveal>

        <Reveal delay={200}>
          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 36 }}>
            {['FOTO_1', 'FOTO_2', 'FOTO_3'].map((l) => (
              <div key={l} style={{ aspectRatio: '1/1', border: `2px dashed ${C.pink}`, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: C.pinkNude }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11, letterSpacing: 1.5 }}>[ {l} ]</span>
              </div>
            ))}
          </div>
        </Reveal>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: 10, verticalAlign: 'middle' }}>
            <path d="M20.5 3.5A10 10 0 0 0 4.1 16.6L3 21l4.5-1.2a10 10 0 0 0 13-15.3zM12 19.6a7.6 7.6 0 0 1-3.9-1.1l-.3-.2-2.8.7.7-2.7-.2-.3a7.6 7.6 0 1 1 6.5 3.6z"/>
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
    ['WhatsApp',  'https://wa.me/541169323425', <svg key="w" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.5 3.5A10 10 0 0 0 4.1 16.6L3 21l4.5-1.2a10 10 0 0 0 13-15.3z" strokeLinejoin="round"/></svg>],
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
        <Instagram />
        <Turnos />
        <Consultas />
        <FinalCTA />
      </main>
      <Footer />
    </React.Fragment>
  );
}

window.LandingPage = LandingPage;
