import React from 'react';
import { VERIFIED_PROJECTS } from '../data/companyData';
import type { ProjectItem } from '../data/companyData';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onPreFillRFQ: (scope: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenRFQ, onSelectProject }) => {
  const fp = [
    { item: VERIFIED_PROJECTS.find(p => p.id === 'proj-8')!,  img: '/images/project_mondipatti.jpg',  cat: 'Hybrid GIS Substation' },
    { item: VERIFIED_PROJECTS.find(p => p.id === 'proj-6')!,  img: '/images/project_sirungattur.jpg', cat: 'Solar Pooling Bay' },
    { item: VERIFIED_PROJECTS.find(p => p.id === 'proj-15')!, img: '/images/project_datacenter.jpg',  cat: 'Data Centre Civil' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-white)' }}>

      {/* ── HERO — Natural Infrastructure Photographic Direction ── */}
      <section className="photo-hero" aria-label="Hero Overview">
        <div className="photo-hero-image-wrap">
          <img
            src="/images/hero_substation_natural.jpg"
            alt="High-voltage electrical substation switchyard with power transformers and gantry structures"
            className="photo-hero-bg"
            loading="eager"
          />
        </div>
        <div className="photo-hero-overlay" />
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">Turnkey Civil &amp; Electrical EPC</span>
            <h1 className="hero-title">
              Engineering the Infrastructure<br className="hero-title-break" /> That Moves Industry.
            </h1>
            <p className="hero-lead">
              Integrated civil and electrical capabilities for power substations, solar pooling bays, and industrial facilities across South India.
            </p>
            <div className="hero-actions">
              <button onClick={onOpenRFQ} className="btn-hero-primary">
                Discuss Your Project
              </button>
              <button onClick={() => onNavigate('services')} className="btn-hero-secondary">
                Explore Capabilities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO — white, editorial split ── */}
      <section style={{ background: 'var(--bg-white)', padding: '7rem 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="split-grid">
            {/* Text */}
            <div>
              <hr className="rule" />
              <h2 style={{ color: 'var(--ink)', marginBottom: '1.5rem', maxWidth: '540px' }}>
                Single-source accountability.<br />From earthworks to energization.
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: '500px' }}>
                Moxie Infratech delivers unified EPC contracting across high-voltage substations, renewable energy pooling infrastructure, industrial electrification, and mission-critical civil construction.
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '460px' }}>
                Active across Tamil Nadu, Telangana, Andhra Pradesh, and the Andaman & Nicobar Islands — one integrated team eliminates commissioning delays.
              </p>
              <button onClick={() => onNavigate('about')} className="btn-text">
                About Moxie Infratech <ChevronRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
            {/* Photo */}
            <div className="photo-frame" style={{ height: '440px' }}>
              <img src="/images/company_intro.jpg" alt="Moxie Infratech project operations" />
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '2.5rem', marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--line)' }} className="metrics-grid">
            {[
              { val: '11kV–765kV', label: 'Substation Range', note: 'Full civil execution capability' },
              { val: '22+',        label: 'Verified Projects',  note: 'Documented in brochures' },
              { val: '4 States',   label: 'Operational Reach',  note: 'TN · TS · AP · Andaman' },
              { val: 'CEIG',       label: 'Statutory Compliance', note: 'Testing, inspection & clearance' },
            ].map(m => (
              <div key={m.val}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 2.75rem)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.04em' }}>{m.val}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', marginTop: '0.5rem' }}>{m.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)', marginTop: '0.2rem' }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES — Midnight-Graphite Feature Section ── */}
      <section className="section-graphite-feature" style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--blue-brand)' }}>Core Capabilities</span>
              <h2 style={{ color: '#FFFFFF', maxWidth: '480px' }}>Integrated Civil &amp; Electrical Solutions.</h2>
            </div>
            <button onClick={() => onNavigate('services')} className="btn-secondary" style={{ borderColor: 'rgba(196, 205, 214, 0.35)', color: '#FFFFFF' }}>
              All Services <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="caps-grid">
            {[
              {
                title: 'Substation Civil Works',
                desc: 'Transformer plinths, GIS hall superstructures, oil containment pits, precast cable raceways, and site grading for 11kV to 765kV yards.',
                img: '/images/civil_foundations.jpg', tag: '01 — Civil'
              },
              {
                title: 'EHV Switchyards & Electrification',
                desc: 'AIS/GIS switchgear installation, HT/LT distribution, protection relay testing, busbar trunking, and statutory CEIG commissioning.',
                img: '/images/electrical_gis.jpg', tag: '02 — Electrical'
              },
            ].map(c => (
              <div key={c.title} className="card card-graphite" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="photo-card-wrap" style={{ height: '280px' }}>
                  <img src={c.img} alt={c.title} className="photo-card-img" />
                </div>
                <div style={{ padding: '2rem', flex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-brand)', display: 'block', marginBottom: '0.625rem' }}>{c.tag}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{c.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--steel)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{c.desc}</p>
                  <button onClick={() => onNavigate('services')} className="btn-text" style={{ color: 'var(--blue-brand)' }}>View Scope <ChevronRight style={{ width: '0.9rem', height: '0.9rem' }} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS — Cool White Editorial Section ── */}
      <section style={{ background: 'var(--bg-cool)', padding: '7rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <span className="eyebrow">Selected Work</span>
              <h2 style={{ color: 'var(--ink)' }}>Featured Projects.</h2>
              <p style={{ color: 'var(--ink-3)', marginTop: '0.5rem', fontSize: '1rem' }}>Verified contracts with documented costs and client references.</p>
            </div>
            <button onClick={() => onNavigate('projects')} className="btn-secondary">
              All 22 Projects <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.5rem' }} className="proj-grid">
            {fp.filter(f => f.item).map((f, i) => (
              <div key={i} onClick={() => onSelectProject(f.item)} className="card" style={{ cursor: 'pointer' }}>
                <div className="photo-card-wrap" style={{ height: '220px' }}>
                  <img src={f.img} alt={f.item.title} className="photo-card-img" />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>{f.cat}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-4)' }}>{f.item.state}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{f.item.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: '1rem' }}>{f.item.scope}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.875rem', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {f.item.costInLakhs ? `₹${f.item.costInLakhs.toFixed(2)} L` : 'ARC'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                      View <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
