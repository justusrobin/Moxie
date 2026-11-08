import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/companyData';
import type { ServiceItem } from '../data/companyData';
import { ArrowRight, Check } from 'lucide-react';

export const ServicesPage: React.FC<{
  onOpenRFQ: () => void;
  onPreFillRFQ: (scope: any) => void;
}> = ({ onPreFillRFQ }) => {
  const [activeId, setActiveId] = useState(SERVICES_LIST[0].id);
  const active = SERVICES_LIST.find((s) => s.id === activeId) || SERVICES_LIST[0];

  const photos: Record<string, string> = {
    'substation-civil': '/images/civil_foundations.jpg',
    'electrical-turnkey': '/images/electrical_gis.jpg',
    'mep-phe': '/images/project_datacenter.jpg',
    'fire-safety': '/images/industry_factory.jpg',
    'statutory-ceig': '/images/quality_testing.jpg',
  };

  const handleEnquire = (s: ServiceItem) => {
    onPreFillRFQ({
      category: s.title,
      modules: s.deliverables.slice(0, 4),
      timelineEst: '6–12 Weeks',
    });
  };

  return (
    <div style={{ background: 'var(--bg-main)' }}>

      {/* HEADER */}
      <section
        style={{
          background: 'var(--bg-surface)',
          paddingTop: 'clamp(6.5rem, 12vw, 8.5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <span className="eyebrow">EPC Scope</span>
          <h1 style={{ maxWidth: '780px', marginBottom: '1.25rem' }}>
            Civil, Electrical &amp; Turnkey MEP Solutions.
          </h1>
          <p className="text-lead" style={{ maxWidth: '620px' }}>
            High-voltage substation civil works (11kV to 765kV), switchyard electrical installation, building MEP, active fire protection, and statutory CEIG approvals under single-source accountability.
          </p>
        </div>
      </section>

      {/* SERVICE SELECTOR & DETAIL SHOWCASE */}
      <section style={{ background: 'var(--bg-main)', padding: 'clamp(3.5rem, 6vw, 6rem) 0' }}>
        <div className="container">
          {/* Mobile Horizontal Pill Selector (< 1024px) */}
          <div className="lg-hidden" style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
              Select Engineering Division
            </span>
            <div className="scrollable-chip-track">
              {SERVICES_LIST.map((s, idx) => {
                const isSelected = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.6rem 1rem',
                      minHeight: '44px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      background: isSelected ? 'var(--blue-primary)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isSelected ? 'var(--blue-primary)' : 'var(--border-color)'}`,
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      fontWeight: isSelected ? 600 : 500,
                      transition: 'all 0.18s ease',
                    }}
                  >
                    0{idx + 1}. {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="services-layout-grid"
            style={{
              display: 'grid',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            {/* Desktop Vertical Selector (hidden on mobile, shown on >= 1024px) */}
            <div className="desktop-only-selector" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                Engineering Divisions
              </span>

              {SERVICES_LIST.map((s, idx) => {
                const isSelected = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    style={{
                      background: isSelected ? 'var(--bg-elevated)' : 'transparent',
                      border: `1.5px solid ${isSelected ? 'var(--blue-primary)' : 'var(--border-color)'}`,
                      borderRadius: '6px',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: isSelected ? 'var(--blue-accent)' : 'var(--text-muted)' }}>
                        Division 0{idx + 1}
                      </span>
                      {s.voltageClass && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {s.voltageClass.split(' ')[0]}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.35 }}>
                      {s.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Comprehensive Specification Card */}
            <div
              className="photo-card services-detail-card"
              style={{
                overflow: 'hidden',
                background: 'var(--bg-elevated)',
              }}
            >
              {/* Photo Banner with Responsive Height */}
              <div style={{ position: 'relative', height: 'clamp(200px, 45vw, 340px)', overflow: 'hidden', background: '#111820' }}>
                <img
                  key={active.id}
                  src={photos[active.id] || '/images/hero_substation.jpg'}
                  alt={active.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17, 24, 32, 0.92) 0%, rgba(17, 24, 32, 0.3) 60%, transparent 100%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: 'clamp(1rem, 3vw, 1.75rem)', left: 'clamp(1rem, 3.5vw, 2rem)', right: 'clamp(1rem, 3.5vw, 2rem)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)', display: 'block', marginBottom: '0.25rem' }}>
                    {active.category}{active.voltageClass ? ` · ${active.voltageClass}` : ''}
                  </span>
                  <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.25rem, 4vw, 2rem)', lineHeight: 1.25 }}>
                    {active.title}
                  </h2>
                </div>
              </div>

              {/* Scope Content */}
              <div style={{ padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem', fontSize: 'clamp(0.925rem, 2.5vw, 1rem)' }}>
                  {active.fullDesc}
                </p>

                {/* Deliverables */}
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)', marginBottom: '1rem' }}>
                  Documented Engineering Deliverables
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                  {active.deliverables.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--blue-subtle)', color: 'var(--blue-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Check style={{ width: '12px', height: '12px' }} />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Project References & Standards Footer */}
                <div
                  style={{
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.25rem',
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Applicable Technical Standards
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                      {active.standards.join(' · ')}
                    </span>
                  </div>

                  <button onClick={() => handleEnquire(active)} className="btn-primary" style={{ width: '100%', maxWidth: '320px', minHeight: '48px' }}>
                    Enquire for {active.title} <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 1023px) {
          .desktop-only-selector { display: none !important; }
          .services-layout-grid { grid-template-columns: 1fr !important; }
          .services-detail-card { grid-column: span 1 !important; }
        }
        @media (min-width: 1024px) {
          .lg-hidden { display: none !important; }
          .services-layout-grid { grid-template-columns: 280px 1fr !important; }
        }
      `}</style>

    </div>
  );
};
