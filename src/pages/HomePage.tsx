import React, { useEffect, useRef } from 'react';
import { VERIFIED_PROJECTS, INDUSTRIES_SERVED, SERVICES_LIST } from '../data/companyData';
import type { ProjectItem } from '../data/companyData';
import { ArrowRight, ChevronRight, CheckCircle2, Check, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onPreFillRFQ: (scope: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenRFQ,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger & Parallax Choreography (Optimised for mobile performance)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.innerWidth >= 768;

    const ctx = gsap.context(() => {
      // 1. Multi-layer Parallax on Hero Image (Only enabled on tablet/desktop to ensure 60/120fps smooth scrolling on phones)
      if (isDesktop) {
        gsap.to('.hero-bg-image', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        gsap.to('.parallax-img-electrical', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.section-electrical',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        gsap.to('.parallax-img-civil', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.section-civil',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // 2. Staggered Scroll Reveals for Editorial Blocks (Smooth on both mobile & desktop)
      gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: isDesktop ? 28 : 16 },
          {
            opacity: 1,
            y: 0,
            duration: isDesktop ? 0.75 : 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Verified Featured Projects (High-Impact Real Contracts)
  const featuredProjects = [
    {
      item: VERIFIED_PROJECTS.find(p => p.id === 'proj-8')!,
      img: '/images/project_mondipatti.jpg',
      badge: 'Hybrid GIS Pooling Substation',
      specs: '33/110kV Hybrid GIS · Transformer Raft Plinths',
    },
    {
      item: VERIFIED_PROJECTS.find(p => p.id === 'proj-6')!,
      img: '/images/project_sirungattur.jpg',
      badge: 'Solar Pooling Switchyard',
      specs: '33/110kV Substation · RCC Control Building',
    },
    {
      item: VERIFIED_PROJECTS.find(p => p.id === 'proj-1')!,
      img: '/images/industry_solar.jpg',
      badge: 'Utility Solar Feeder Bay',
      specs: '11kV Feeder Bay · Erection & Relays',
    },
    {
      item: VERIFIED_PROJECTS.find(p => p.id === 'proj-15')!,
      img: '/images/project_datacenter.jpg',
      badge: 'Data Centre Infrastructure',
      specs: 'Internal Concrete Roads · Heavy Storm Drains',
    },
  ].filter(p => Boolean(p.item));

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('about-moxie');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--bg-main)' }}>

      {/* ═══════════════════════════════════════════════════════
          SECTION 01 — HERO (PORTRAIT & MOBILE OPTIMISED)
          ═══════════════════════════════════════════════════════ */}
      <section className="hero-section" aria-label="Hero Overview">
        <div className="hero-image-wrap">
          <img
            src="/images/hero_substation_natural.jpg"
            alt="High-voltage electrical substation switchyard with power transformers and gantry structures"
            className="hero-bg-image"
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />

        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="hero-content-wrap">
            <span className="hero-eyebrow">
              Civil &amp; Electrical EPC Infrastructure
            </span>

            <h1 className="hero-headline">
              Engineering the Infrastructure That Moves Industry.
            </h1>

            <p className="hero-lead-text">
              Integrated civil and electrical turnkey solutions for extra-high-voltage substations (11kV to 765kV), renewable pooling bays, and industrial facilities across South India.
            </p>

            <div className="hero-cta-group">
              <button onClick={onOpenRFQ} className="btn-primary">
                Discuss Your Project <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
              <button onClick={() => onNavigate('services')} className="btn-ghost">
                Explore Capabilities
              </button>
            </div>
          </div>
        </div>

        {/* Sophisticated Scroll Down Indicator */}
        <button
          onClick={handleScrollToNext}
          className="hero-scroll-indicator"
          aria-label="Scroll to company background"
        >
          <span>Scroll</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-thumb" />
          </div>
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 02 — ABOUT MOXIE (EDITORIAL SPLIT & METRICS)
          ═══════════════════════════════════════════════════════ */}
      <section
        id="about-moxie"
        style={{
          background: 'var(--bg-main)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left: Editorial Statement */}
            <div>
              <span className="eyebrow">About Moxie Infratech</span>
              <h2 style={{ marginBottom: '1.25rem', maxWidth: '520px' }}>
                Single-source accountability.<br />From earthworks to energization.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem', maxWidth: '500px' }}>
                Moxie Infratech delivers unified EPC contracting across high-voltage substations, renewable energy pooling infrastructure, industrial electrification, and mission-critical civil construction.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
                Active across Tamil Nadu, Telangana, Andhra Pradesh, and the Andaman &amp; Nicobar Islands — our integrated engineering scheduling eliminates the costly delays typical between independent civil and electrical vendors.
              </p>
              <button onClick={() => onNavigate('about')} className="btn-text">
                Read Company Background <ChevronRight style={{ width: '1.1rem', height: '1.1rem' }} />
              </button>
            </div>

            {/* Right: Infrastructure Photography */}
            <div className="photo-frame-editorial" style={{ height: 'clamp(220px, 55vw, 420px)' }}>
              <img
                src="/images/company_intro.jpg"
                alt="Moxie Infratech engineering operations"
                loading="lazy"
              />
            </div>
          </div>

          {/* Key Documented Metrics */}
          <div className="metrics-row reveal-block" style={{ marginTop: 'clamp(3rem, 6vw, 5.5rem)' }}>
            <div className="metric-item">
              <div className="metric-val">11kV–765kV</div>
              <div className="metric-label">Substation Range</div>
              <div className="metric-desc">Complete civil &amp; structural capability</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">22+</div>
              <div className="metric-label">Verified Contracts</div>
              <div className="metric-desc">Documented in official brochures</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">4 States</div>
              <div className="metric-label">Regional Reach</div>
              <div className="metric-desc">TN · TS · AP · Andaman &amp; Nicobar</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">CEIG</div>
              <div className="metric-label">Statutory Compliance</div>
              <div className="metric-desc">In-house testing &amp; government clearance</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 03 — ELECTRICAL INFRASTRUCTURE (IMAGE-LED)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="section-electrical"
        style={{
          background: 'var(--bg-surface)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Electrical Scope & Technical Details */}
            <div style={{ order: 0 }}>
              <span className="eyebrow">Electrical Engineering</span>
              <h2 style={{ marginBottom: '1.25rem' }}>
                High-Voltage Electrical Infrastructure &amp; Switchyards.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                From 11kV distribution to EHV substations up to 400kV, Moxie provides end-to-end electrical turnkey contracting encompassing detailed plant design, switchgear erection, high-voltage cabling, relay coordination, and commissioning.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  'AIS & Gas-Insulated Substation (GIS) switchgear erection up to 400kV',
                  'HT/LT industrial power distribution & Motor Control Centres (MCC)',
                  'Power factor correction (APFC), harmonic filtration & earthing grids',
                  'Pre-commissioning statutory testing & CEIG government approvals',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--blue-subtle)', color: 'var(--blue-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check style={{ width: '12px', height: '12px' }} />
                    </div>
                    <span style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => onNavigate('services')} className="btn-secondary" style={{ width: '100%', maxWidth: '280px' }}>
                View Electrical Scope <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
              </button>
            </div>

            {/* Photo with responsive framing */}
            <div
              className="photo-card-img-wrap"
              style={{
                height: 'clamp(240px, 50vw, 420px)',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                order: 1,
              }}
            >
              <img
                src="/images/electrical_gis.jpg"
                alt="High-voltage gas-insulated substation GIS switchgear hall"
                className="parallax-img-electrical"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 04 — CIVIL INFRASTRUCTURE (DISTINCT COMPOSITION)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="section-civil"
        style={{
          background: 'var(--bg-main)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Civil Content */}
            <div style={{ order: 0 }}>
              <span className="eyebrow">Civil Substation Engineering</span>
              <h2 style={{ marginBottom: '1.25rem' }}>
                Engineered Civil Foundations for Mission-Critical Power.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                Substation reliability begins in the ground. Moxie's civil engineering division specializes in heavy equipment plinths, GIS hall laser levelling, and transformer containment systems designed to withstand dynamic seismic forces and short-circuit mechanical stresses.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  'Transformer plinths and raft foundations engineered for dynamic mechanical loads',
                  'Gas-Insulated Substation (GIS) indoor hall floor laser levelling',
                  'RCC cable raceways with precast concrete covers and integrated drainage',
                  'Oil containment pits, oil-water separation sumps, and blast-resistant firewalls',
                  'Yard gravelling (100–150mm clean granite ballast) for touch-and-step safety',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--blue-subtle)', color: 'var(--blue-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check style={{ width: '12px', height: '12px' }} />
                    </div>
                    <span style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => onNavigate('services')} className="btn-secondary" style={{ width: '100%', maxWidth: '280px' }}>
                View Civil Capabilities <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
              </button>
            </div>

            {/* Civil Photography */}
            <div
              className="photo-card-img-wrap"
              style={{
                height: 'clamp(240px, 50vw, 420px)',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                order: 1,
              }}
            >
              <img
                src="/images/civil_foundations.jpg"
                alt="Substation civil foundations, transformer plinths, and cable trench construction"
                className="parallax-img-civil"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 05 — FEATURED PROJECTS (EDITORIAL SHOWCASE)
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg-elevated)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div
            className="reveal-block"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2.75rem',
            }}
          >
            <div>
              <span className="eyebrow">Documented Execution</span>
              <h2>Featured Infrastructure Contracts.</h2>
              <p style={{ marginTop: '0.5rem', maxWidth: '520px' }}>
                Verified projects with documented scopes, contract values in Lakhs, and state utility client references.
              </p>
            </div>
            <button onClick={() => onNavigate('projects')} className="btn-secondary" style={{ width: 'auto' }}>
              View All 22 Projects <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
            </button>
          </div>

          {/* Project Grid — 1 column on mobile, 2 on tablet/desktop */}
          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.25rem, 3vw, 2rem)',
            }}
          >
            {featuredProjects.map((p, idx) => (
              <div
                key={idx}
                onClick={() => onSelectProject(p.item)}
                className="photo-card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div className="photo-card-img-wrap" style={{ height: 'clamp(190px, 48vw, 230px)' }}>
                  <img src={p.img} alt={p.item.title} loading="lazy" />
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      background: 'rgba(17, 24, 32, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--blue-accent)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '3px',
                      border: '1px solid rgba(196, 205, 214, 0.15)',
                    }}
                  >
                    {p.badge}
                  </span>
                </div>

                <div style={{ padding: 'clamp(1.25rem, 3.5vw, 1.75rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {p.item.state}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue-accent)', fontWeight: 600 }}>
                      {p.item.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.45rem', lineHeight: 1.35 }}>
                    {p.item.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                    {p.item.scope}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Contract Value</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {p.item.costInLakhs !== undefined ? `₹${p.item.costInLakhs.toFixed(2)} Lakhs` : 'Rate Contract'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.825rem', color: 'var(--blue-accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', minHeight: '36px' }}>
                      Inspect <ChevronRight style={{ width: '0.9rem', height: '0.9rem' }} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 06 — CAPABILITIES (EPC SCOPE BREAKDOWN)
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg-main)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div className="reveal-block" style={{ marginBottom: '2.75rem' }}>
            <span className="eyebrow">Integrated Capabilities</span>
            <h2>Turnkey EPC Service Divisions.</h2>
            <p style={{ maxWidth: '560px', marginTop: '0.5rem' }}>
              Multi-disciplinary civil, electrical, MEP, and statutory services executed under a single accountable contract.
            </p>
          </div>

          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {SERVICES_LIST.map((srv, idx) => (
              <div
                key={srv.id}
                className="photo-card"
                style={{ padding: 'clamp(1.35rem, 3.5vw, 2.25rem)', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)' }}>
                    0{idx + 1} — {srv.category}
                  </span>
                  {srv.voltageClass && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', background: 'var(--border-subtle)', padding: '0.2rem 0.5rem', borderRadius: '3px' }}>
                      {srv.voltageClass}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', lineHeight: 1.3 }}>
                  {srv.title}
                </h3>

                <p style={{ fontSize: '0.8875rem', color: 'var(--text-secondary)', lineHeight: 1.68, marginBottom: '1.5rem', flex: 1 }}>
                  {srv.shortDesc}
                </p>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Standards: {srv.standards.slice(0, 2).join(' · ')}
                  </div>
                  <button onClick={() => onNavigate('services')} className="btn-text">
                    Explore Deliverables <ChevronRight style={{ width: '0.9rem', height: '0.9rem' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 07 — INDUSTRIES WE SERVE
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg-surface)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div className="reveal-block" style={{ marginBottom: '2.75rem' }}>
            <span className="eyebrow">Sector Expertise</span>
            <h2>Industries We Serve.</h2>
            <p style={{ maxWidth: '540px', marginTop: '0.5rem' }}>
              Tailored civil and electrical EPC execution across high-voltage utility grids, renewable parks, hyperscale data centres, and heavy manufacturing.
            </p>
          </div>

          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <div
                key={ind.id}
                className="photo-card"
                style={{ padding: 'clamp(1.35rem, 3.5vw, 2rem)', display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)', marginBottom: '0.65rem', display: 'block' }}>
                  Industry 0{idx + 1}
                </span>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', lineHeight: 1.3 }}>
                  {ind.title}
                </h3>

                <p style={{ fontSize: '0.8875rem', color: 'var(--text-secondary)', lineHeight: 1.68, marginBottom: '1.25rem', flex: 1 }}>
                  {ind.desc}
                </p>

                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {ind.metric}
                  </span>
                  <button onClick={() => onNavigate('industries')} className="btn-text">
                    View Sector <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 08 — QUALITY & EXECUTION GOVERNANCE
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg-main)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div
            className="reveal-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left: Quality Principles */}
            <div>
              <span className="eyebrow">Quality &amp; Standards</span>
              <h2 style={{ marginBottom: '1.25rem' }}>
                Six Sigma Standardization.<br />Zero Compromise on Safety.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
                Under the quality governance of Director Dr. G. Subashini (Six Sigma Green Belt), every civil foundation, cable joint, and protection relay is tested and validated against rigorous Indian Standards (IS), IEC, and Central Electricity Authority regulations.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                {[
                  {
                    title: 'Statutory CEIG Approvals Facilitation',
                    desc: 'Pre-commissioning insulation, oil BDV, and earthing resistance testing leading to official Chief Electrical Inspector to Government clearance.',
                  },
                  {
                    title: 'Adherence to IS & IEC Technical Standards',
                    desc: 'Full compliance with IS 456 (concrete), IS 732 (wiring), IS 3043 (earthing), and IEC 61936-1 for power installations exceeding 1kV.',
                  },
                  {
                    title: 'Calibrated NABL Traceable Instrumentation',
                    desc: 'Primary and secondary injection test kits, calibrated protection test benches, and safety grounding measurement protocols.',
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '4px', background: 'var(--blue-subtle)', color: 'var(--blue-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <CheckCircle2 style={{ width: '15px', height: '15px' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.975rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quality & Testing Photograph */}
            <div className="photo-frame-editorial" style={{ height: 'clamp(220px, 55vw, 420px)' }}>
              <img
                src="/images/quality_testing.jpg"
                alt="Engineers performing pre-commissioning relay testing and electrical safety audit"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 09 — CONTACT & ENQUIRY FINALE
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: '#0B1015',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
        }}
      >
        {/* Background Dusk Infrastructure Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/images/enquiry_dusk.jpg"
            alt="Industrial infrastructure at dusk"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(11, 16, 21, 0.95) 0%, rgba(11, 16, 21, 0.82) 60%, rgba(11, 16, 21, 0.65) 100%)',
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div
            className="reveal-block"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5rem',
            }}
          >
            {/* Enquiry Message */}
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <span className="eyebrow" style={{ color: 'var(--blue-accent)' }}>
                Begin Your Project
              </span>
              <h2 style={{ color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                Have a project in mind?<br />Let's engineer the solution.
              </h2>
              <p style={{ color: 'rgba(245, 246, 248, 0.8)', fontSize: '1rem', lineHeight: 1.68, marginBottom: '2rem' }}>
                Discuss your civil foundations, switchyard bays, industrial electrification, or CEIG compliance requirements directly with our senior engineering directors.
              </p>
              <button onClick={onOpenRFQ} className="btn-primary" style={{ width: '100%', maxWidth: '280px', minHeight: '50px' }}>
                Discuss Your Project <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>

            {/* Quick Contact Box — Full width on mobile without overflow! */}
            <div
              style={{
                background: 'rgba(24, 36, 49, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(196, 205, 214, 0.15)',
                borderRadius: '6px',
                padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)' }}>
                Direct Engineering Desk
              </div>
              <a
                href="tel:+918220223232"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  minHeight: '44px',
                  transition: 'color 0.2s',
                }}
              >
                <Phone style={{ width: '1.1rem', height: '1.1rem', color: 'var(--blue-accent)' }} />
                +91 8220223232
              </a>
              <a
                href="mailto:moxieinfratech@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'rgba(245, 246, 248, 0.85)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  minHeight: '40px',
                  transition: 'color 0.2s',
                }}
              >
                <Mail style={{ width: '1.1rem', height: '1.1rem', color: 'var(--blue-accent)' }} />
                moxieinfratech@gmail.com
              </a>
              <div style={{ fontSize: '0.75rem', color: 'rgba(245, 246, 248, 0.45)', lineHeight: 1.5, paddingTop: '0.5rem', borderTop: '1px solid rgba(196, 205, 214, 0.1)' }}>
                Office hours: Mon–Sat, 9:00 AM – 7:00 PM IST
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
