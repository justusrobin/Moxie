import React, { useEffect } from 'react';
import type { ProjectItem } from '../data/companyData';
import { X, CheckCircle2, Clock, MapPin, Building2, IndianRupee, Calendar, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onEnquireSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onEnquireSimilar,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const done = project.status === 'Completed';

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

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 2.5vw, 1rem)',
        background: 'rgba(11, 16, 21, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: 'min(94vh, calc(100dvh - 1rem))',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'clamp(1rem, 3.5vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: 'var(--blue-subtle)',
                  color: 'var(--blue-accent)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: done ? 'rgba(5, 150, 105, 0.15)' : 'rgba(217, 119, 6, 0.15)',
                  color: done ? '#10B981' : '#F59E0B',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                {done ? <CheckCircle2 style={{ width: '0.75rem', height: '0.75rem' }} /> : <Clock style={{ width: '0.75rem', height: '0.75rem' }} />}
                {project.status}
              </span>
            </div>
            <h3 id="modal-project-title" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              width: '44px',
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Close modal"
          >
            <X style={{ width: '1.2rem', height: '1.2rem' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(1rem, 4vw, 1.75rem) clamp(1rem, 4vw, 2rem)', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Project Photo */}
          <div style={{ width: '100%', height: 'clamp(160px, 42vw, 220px)', borderRadius: '6px', overflow: 'hidden', background: '#111820', position: 'relative' }}>
            <img
              src={getProjectImage(project)}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.75rem' }}>
            {[
              { icon: <IndianRupee style={{ width: '0.85rem', height: '0.85rem', color: 'var(--blue-accent)' }} />, label: 'Contract Value', value: project.costInLakhs !== undefined ? `₹${project.costInLakhs.toFixed(2)} Lakhs` : 'Annual Rate Contract (ARC)' },
              { icon: <Calendar style={{ width: '0.85rem', height: '0.85rem', color: 'var(--blue-accent)' }} />, label: 'Execution Year', value: String(project.year) },
              { icon: <MapPin style={{ width: '0.85rem', height: '0.85rem', color: 'var(--blue-accent)' }} />, label: 'State Location', value: project.state },
              { icon: <Building2 style={{ width: '0.85rem', height: '0.85rem', color: 'var(--blue-accent)' }} />, label: 'Client / Developer', value: project.clientOrDeveloper },
            ].map((m, i) => (
              <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: 'clamp(0.75rem, 2.5vw, 1rem)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.375rem', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  {m.icon}{m.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Site Location</p>
            <p style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{project.locationDetail}</p>
          </div>

          {/* Scope of Work */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Contract Scope</p>
            <p style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{project.scope}</p>
          </div>

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Technical Highlights</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {project.highlights.map((h, i) => (
                  <span key={i} style={{ background: 'var(--blue-subtle)', color: 'var(--blue-accent)', border: '1px solid rgba(120, 174, 255, 0.2)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.35rem 0.7rem', borderRadius: '4px', fontWeight: 500 }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1rem, 4vw, 2rem)',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            REF: MIPL-PRJ-{String(project.srNo).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', width: 'auto', flexWrap: 'wrap' }} className="modal-footer-btns">
            <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', minHeight: '44px' }}>
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquireSimilar(project.title);
              }}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', minHeight: '44px' }}
            >
              Enquire Similar Scope <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
