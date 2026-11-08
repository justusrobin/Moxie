import React, { useState, useMemo } from 'react';
import { VERIFIED_PROJECTS } from '../data/companyData';
import type { ProjectItem } from '../data/companyData';
import { Search, MapPin, ChevronRight } from 'lucide-react';

export const ProjectsPage: React.FC<{
  onSelectProject: (project: ProjectItem) => void;
  onOpenRFQ: () => void;
}> = ({ onSelectProject }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Substation & Grid',
    'Renewable Solar',
    'Data Centre',
    'Industrial & Agro',
    'Commercial & Healthcare',
    'CEIG Inspection',
  ];

  const getProjectImage = (p: ProjectItem) => {
    if (p.id === 'proj-8') return '/images/project_mondipatti.jpg';
    if (p.id === 'proj-6' || p.id === 'proj-7' || p.id === 'proj-10') return '/images/project_sirungattur.jpg';
    if (p.id === 'proj-15' || p.id === 'proj-16') return '/images/project_datacenter.jpg';
    if (p.id === 'proj-14') return '/images/project_transmission.jpg';
    if (p.category === 'Renewable Solar') return '/images/industry_solar.jpg';
    if (p.category === 'Industrial & Agro') return '/images/industry_factory.jpg';
    if (p.category === 'CEIG Inspection') return '/images/quality_testing.jpg';
    return '/images/civil_foundations.jpg';
  };

  const filtered = useMemo(() => {
    return VERIFIED_PROJECTS.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.clientOrDeveloper.toLowerCase().includes(q) ||
        p.locationDetail.toLowerCase().includes(q);
      const matchCategory = category === 'All' || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

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
          <span className="eyebrow">Verified Portfolio</span>
          <h1 style={{ maxWidth: '780px', marginBottom: '1.25rem' }}>
            Infrastructure Execution Track Record.
          </h1>
          <p className="text-lead" style={{ maxWidth: '600px' }}>
            22 verified contracts across high-voltage substation civil works, renewable solar pooling switchyards, hyperscale data centres, and industrial electrification.
          </p>
        </div>
      </section>

      {/* STICKY FILTER & SEARCH BAR (MOBILE-OPTIMISED HORIZONTAL CHIPS) */}
      <div
        style={{
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 40,
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.75rem 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Top row: Horizontal Scrollable Chips on Mobile, Flexible wrap on Desktop */}
          <div
            className="scrollable-chip-track"
            style={{
              padding: '0.2rem 0',
            }}
          >
            {categories.map((c) => {
              const isSelected = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.5rem 0.9rem',
                    minHeight: '40px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    background: isSelected ? 'var(--blue-primary)' : 'var(--bg-elevated)',
                    border: `1px solid ${isSelected ? 'var(--blue-primary)' : 'var(--border-color)'}`,
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 600 : 500,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '0.95rem',
                height: '0.95rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search by client, title or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                paddingTop: '0.65rem',
                paddingBottom: '0.65rem',
                minHeight: '44px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                fontSize: '16px', // Prevents iOS auto-zoom!
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <section style={{ background: 'var(--bg-main)', padding: 'clamp(3rem, 6vw, 5rem) 0 clamp(4.5rem, 8vw, 7.5rem)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Showing {filtered.length} of {VERIFIED_PROJECTS.length} verified contracts
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.25rem, 3vw, 2rem)',
            }}
          >
            {filtered.map((p) => {
              const isDone = p.status === 'Completed';
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="photo-card"
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="photo-card-img-wrap" style={{ height: 'clamp(180px, 45vw, 210px)' }}>
                    <img src={getProjectImage(p)} alt={p.title} loading="lazy" />
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        left: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: 'rgba(17, 24, 32, 0.88)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--blue-accent)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '3px',
                        border: '1px solid rgba(196, 205, 214, 0.15)',
                      }}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div style={{ padding: 'clamp(1.15rem, 3.5vw, 1.5rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin style={{ width: '0.75rem', height: '0.75rem' }} />
                        {p.state}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: isDone ? '#10B981' : '#F59E0B',
                          fontWeight: 600,
                        }}
                      >
                        {p.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '0.35rem' }}>
                      {p.title}
                    </h3>

                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--blue-accent)', marginBottom: '0.75rem' }}>
                      {p.clientOrDeveloper}
                    </p>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                      {p.scope}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Contract Value</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {p.costInLakhs !== undefined ? `₹${p.costInLakhs.toFixed(2)} Lakhs` : 'Rate Contract (ARC)'}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--blue-accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', minHeight: '36px' }}>
                        Scope <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>No projects found matching your query.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-secondary" style={{ marginTop: '0.75rem' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
