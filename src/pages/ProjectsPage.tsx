import React, { useState, useMemo } from 'react';
import { VERIFIED_PROJECTS } from '../data/companyData';
import type { ProjectItem } from '../data/companyData';
import { Search, MapPin, ChevronRight } from 'lucide-react';

export const ProjectsPage: React.FC<{ onSelectProject: (p: ProjectItem) => void; onOpenRFQ: () => void }> = ({ onSelectProject }) => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Substation & Grid', 'Renewable Solar', 'Data Centre', 'Industrial & Agro', 'Commercial & Healthcare', 'CEIG Inspection'];

  const photo = (p: ProjectItem) => {
    if (p.id === 'proj-8') return '/images/project_mondipatti.jpg';
    if (p.id === 'proj-6' || p.id === 'proj-7') return '/images/project_sirungattur.jpg';
    if (p.id === 'proj-15' || p.id === 'proj-16') return '/images/project_datacenter.jpg';
    if (p.id === 'proj-14') return '/images/project_transmission.jpg';
    if (p.id === 'proj-1' || p.id === 'proj-2' || p.id === 'proj-3') return '/images/industry_solar.jpg';
    if (p.category === 'Substation & Grid') return '/images/hero_substation.jpg';
    if (p.category === 'Industrial & Agro') return '/images/industry_factory.jpg';
    return '/images/civil_foundations.jpg';
  };

  const filtered = useMemo(() => VERIFIED_PROJECTS.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.title.toLowerCase().includes(q) || p.clientOrDeveloper.toLowerCase().includes(q)) && (cat === 'All' || p.category === cat);
  }), [search, cat]);

  return (
    <div style={{ background: 'var(--bg-white)' }}>

      {/* HEADER */}
      <section style={{ background: 'var(--bg-light)', paddingTop: '9rem', paddingBottom: '5rem', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="eyebrow">Execution Track Record</span>
          <h1 style={{ color: 'var(--ink)', marginBottom: '1.25rem' }}>Project Portfolio.</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '540px' }}>
            22 verified contracts across substation civil works, solar pooling bays, data centres, and industrial electrification.
          </p>
        </div>
      </section>

      {/* FILTERS — sticky */}
      <div style={{ position: 'sticky', top: '68px', zIndex: 30, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '0.35rem 0.875rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                  background: c === cat ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${c === cat ? 'var(--accent)' : 'var(--line)'}`,
                  color: c === cat ? '#fff' : 'var(--ink-3)',
                  fontWeight: c === cat ? 600 : 400,
                }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)', pointerEvents: 'none' }} />
            <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: '2.25rem', paddingRight: '0.75rem', paddingTop: '0.45rem', paddingBottom: '0.45rem', background: 'var(--bg-off)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--ink)', outline: 'none' }} />
          </div>
        </div>
      </div>

      {/* GRID */}
      <section style={{ background: 'var(--bg-white)', padding: '4rem 0 6rem' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-3)', marginBottom: '2rem' }}>
            Showing {filtered.length} of {VERIFIED_PROJECTS.length} projects
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.5rem' }} className="proj-grid">
            {filtered.map(p => (
              <div key={p.id} onClick={() => onSelectProject(p)} className="card" style={{ cursor: 'pointer' }}>
                <div className="photo-card-wrap" style={{ height: '190px' }}>
                  <img src={photo(p)} alt={p.title} className="photo-card-img" />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>{p.category}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <MapPin style={{ width: '0.7rem', height: '0.7rem' }} />{p.state}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '0.9875rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, marginBottom: '0.35rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', marginBottom: '1rem' }}>{p.clientOrDeveloper}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {p.costInLakhs ? `₹${p.costInLakhs.toFixed(2)} L` : 'ARC'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      View <ChevronRight style={{ width: '0.8rem', height: '0.8rem' }} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--ink-3)', padding: '4rem 0' }}>No projects match. Try clearing the filter.</p>}
        </div>
      </section>

    </div>
  );
};
