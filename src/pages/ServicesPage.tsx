import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/companyData';
import type { ServiceItem } from '../data/companyData';
import { ArrowRight, Check } from 'lucide-react';

export const ServicesPage: React.FC<{ onOpenRFQ: () => void; onPreFillRFQ: (s: any) => void }> = ({ onPreFillRFQ }) => {
  const [activeId, setActiveId] = useState(SERVICES_LIST[0].id);
  const active = SERVICES_LIST.find(s => s.id === activeId) || SERVICES_LIST[0];
  const photos: Record<string, string> = {
    'substation-civil': '/images/civil_foundations.jpg',
    'electrical-turnkey': '/images/electrical_gis.jpg',
    'mep-phe': '/images/project_datacenter.jpg',
    'fire-safety': '/images/industry_factory.jpg',
    'statutory-ceig': '/images/quality_testing.jpg',
  };
  const enquire = (s: ServiceItem) => onPreFillRFQ({ category: s.title, modules: s.deliverables.slice(0, 3), timelineEst: '6–12 Weeks' });

  return (
    <div style={{ background: 'var(--bg-white)' }}>

      {/* HEADER */}
      <section style={{ background: 'var(--bg-light)', paddingTop: '9rem', paddingBottom: '5rem', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="eyebrow">Capabilities</span>
          <h1 style={{ color: 'var(--ink)', maxWidth: '720px', marginBottom: '1.5rem' }}>Civil, Electrical &amp; Turnkey MEP Solutions.</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '580px' }}>
            High-voltage substation civil works, industrial electrification, building MEP, fire protection, and CEIG approvals — under one contract.
          </p>
        </div>
      </section>

      {/* SERVICE SELECTOR + DETAIL */}
      <section style={{ background: 'var(--bg-white)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="srv-layout">

            {/* Selector tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {SERVICES_LIST.map(s => (
                <button key={s.id} onClick={() => setActiveId(s.id)}
                  style={{
                    background: s.id === activeId ? 'var(--accent-light)' : 'transparent',
                    border: `1.5px solid ${s.id === activeId ? 'var(--accent)' : 'var(--line)'}`,
                    borderRadius: '6px', padding: '1rem 1.25rem',
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: s.id === activeId ? 'var(--accent)' : 'var(--ink-4)', marginBottom: '0.25rem' }}>{s.category}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: s.id === activeId ? 'var(--accent)' : 'var(--ink)', lineHeight: 1.3 }}>{s.title}</div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div className="services-showcase-wrap" key={active.id}>
                <img
                  src={photos[active.id] || '/images/hero_substation.jpg'}
                  alt={active.title}
                  className="services-showcase-img"
                />
              </div>
              <div style={{ padding: '2.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', display: 'block', marginBottom: '0.75rem' }}>
                  {active.category}{active.voltageClass ? ` · ${active.voltageClass}` : ''}
                </span>
                <h2 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.875rem)', color: 'var(--ink)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>{active.title}</h2>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9375rem' }}>{active.fullDesc}</p>

                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: '1rem' }}>Deliverables</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '0.625rem', marginBottom: '2rem' }} className="del-grid">
                  {active.deliverables.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                      <Check style={{ width: '0.875rem', height: '0.875rem', color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{d}</span>
                    </div>
                  ))}
                </div>

                <div style={{ paddingTop: '1.75rem', borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '0.25rem', letterSpacing: '0.1em' }}>Standards</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-3)' }}>{active.standards.join(' · ')}</div>
                  </div>
                  <button onClick={() => enquire(active)} className="btn-primary" style={{ fontSize: '0.82rem' }}>
                    Enquire <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
