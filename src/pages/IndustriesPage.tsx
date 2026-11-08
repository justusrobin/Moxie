import React from 'react';
import { INDUSTRIES_SERVED } from '../data/companyData';
import { ChevronRight } from 'lucide-react';

interface IndustriesPageProps {
  onOpenRFQ: () => void;
  onNavigateToProjects: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigateToProjects }) => {
  const photos: Record<string, string> = {
    'power-utilities':  '/images/hero_substation.jpg',
    'renewable-energy': '/images/industry_solar.jpg',
    'data-centres':     '/images/project_datacenter.jpg',
    'industrial-plants':'/images/industry_factory.jpg',
    'railways-metro':   '/images/project_transmission.jpg',
    'oil-gas':          '/images/enquiry_dusk.jpg',
  };

  return (
    <div style={{ background: 'var(--bg-white)' }}>

      {/* PAGE HEADER */}
      <section style={{ background: 'var(--bg-light)', paddingTop: '9rem', paddingBottom: '5rem', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="eyebrow">Sectors</span>
          <h1 style={{ color: 'var(--ink)', maxWidth: '700px', marginBottom: '1.25rem' }}>Industries We Serve.</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '560px' }}>
            From utility transmission grids and solar farms to hyperscale data centres and heavy industrial plants.
          </p>
        </div>
      </section>

      {/* INDUSTRY LIST */}
      <section style={{ background: 'var(--bg-white)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {INDUSTRIES_SERVED.map((ind, idx) => (
            <div
              key={ind.id}
              className="card ind-card"
              style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr' }}
            >
              {/* Image */}
              <div className="photo-card-wrap" style={{ height: '300px' }}>
                <img
                  src={photos[ind.id] || '/images/hero_substation.jpg'}
                  alt={ind.title}
                  className="photo-card-img"
                />
              </div>

              {/* Content */}
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--ink-4)', marginBottom: '0.75rem', display: 'block' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.875rem)', color: 'var(--ink)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {ind.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: '480px' }}>
                  {ind.desc}
                </p>
                <button onClick={onNavigateToProjects} className="btn-text">
                  View Related Projects <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
