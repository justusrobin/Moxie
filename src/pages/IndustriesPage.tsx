import React from 'react';
import { INDUSTRIES_SERVED } from '../data/companyData';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface IndustriesPageProps {
  onOpenRFQ: () => void;
  onNavigateToProjects: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onOpenRFQ,
  onNavigateToProjects,
}) => {
  const photos: Record<string, string> = {
    'power-utilities':  '/images/hero_substation.jpg',
    'renewable-energy': '/images/industry_solar.jpg',
    'data-centres':     '/images/project_datacenter.jpg',
    'industrial-plants':'/images/industry_factory.jpg',
    'railways-metro':   '/images/project_transmission.jpg',
    'oil-gas':          '/images/enquiry_dusk.jpg',
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
          <span className="eyebrow">Industry Domains</span>
          <h1 style={{ maxWidth: '780px', marginBottom: '1.25rem' }}>
            Infrastructure Solutions by Sector.
          </h1>
          <p className="text-lead" style={{ maxWidth: '600px' }}>
            Engineering solutions designed for mission-critical reliability across state utility grids, renewable solar parks, hyperscale data centres, and heavy process manufacturing.
          </p>
        </div>
      </section>

      {/* EDITORIAL INDUSTRY CARDS */}
      <section style={{ background: 'var(--bg-main)', padding: 'clamp(3.5rem, 6vw, 6rem) 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3rem)' }}>
          {INDUSTRIES_SERVED.map((ind, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={ind.id}
                className="photo-card industry-responsive-card"
                style={{
                  display: 'grid',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Image — Always top on mobile, alternating on desktop */}
                <div
                  className={`photo-card-img-wrap industry-img-wrap ${isEven ? 'desktop-order-1' : 'desktop-order-0'}`}
                  style={{
                    height: 'clamp(210px, 48vw, 360px)',
                  }}
                >
                  <img
                    src={photos[ind.id] || '/images/hero_substation.jpg'}
                    alt={ind.title}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div
                  className={`industry-content-wrap ${isEven ? 'desktop-order-0' : 'desktop-order-1'}`}
                  style={{
                    padding: 'clamp(1.5rem, 4vw, 3rem)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)' }}>
                      Sector 0{idx + 1}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--border-subtle)', padding: '0.2rem 0.55rem', borderRadius: '3px' }}>
                      {ind.metric}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.85rem)', marginBottom: '0.85rem', lineHeight: 1.25 }}>
                    {ind.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {ind.desc}
                  </p>

                  {ind.verifiedReferences?.length > 0 && (
                    <div style={{ marginBottom: '1.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.45rem' }}>
                        Verified Client Deliveries
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {ind.verifiedReferences.map((ref, rIdx) => (
                          <span key={rIdx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: 'var(--blue-subtle)', color: 'var(--blue-accent)', padding: '0.25rem 0.55rem', borderRadius: '3px' }}>
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                    <button onClick={onNavigateToProjects} className="btn-secondary" style={{ fontSize: '0.825rem', padding: '0.65rem 1.35rem', minHeight: '44px' }}>
                      Sector Projects <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
                    </button>
                    <button onClick={onOpenRFQ} className="btn-text" style={{ fontSize: '0.85rem', minHeight: '44px' }}>
                      Consult with Engineers <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 899px) {
          .industry-responsive-card { grid-template-columns: 1fr !important; }
          .industry-img-wrap { order: 0 !important; }
          .industry-content-wrap { order: 1 !important; }
        }
        @media (min-width: 900px) {
          .industry-responsive-card { grid-template-columns: 1fr 1fr !important; }
          .desktop-order-0 { order: 0 !important; }
          .desktop-order-1 { order: 1 !important; }
        }
      `}</style>

    </div>
  );
};
