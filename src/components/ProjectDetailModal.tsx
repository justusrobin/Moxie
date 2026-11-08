import React, { useEffect } from 'react';
import type { ProjectItem } from '../data/companyData';
import { X, CheckCircle2, Clock, MapPin, Building2, IndianRupee, Calendar, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onEnquireSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onEnquireSimilar }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (project) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;

  const done = project.status === 'Completed';

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>

      <div style={{ width: '100%', maxWidth: '680px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px', boxShadow: '0 32px 80px rgba(0,0,0,0.16)', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: '92vh' }}>

        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--line)', background: 'var(--bg-off)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexShrink: 0 }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.25rem 0.625rem', borderRadius: '4px', fontWeight: 600 }}>
                {project.category}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: done ? '#ECFDF5' : '#FFFBEB', color: done ? '#059669' : '#D97706', padding: '0.25rem 0.625rem', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {done ? <CheckCircle2 style={{ width: '0.7rem', height: '0.7rem' }} /> : <Clock style={{ width: '0.7rem', height: '0.7rem' }} />}
                {project.status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{project.title}</h3>
          </div>
          <button onClick={onClose}
            style={{ background: 'none', border: '1px solid var(--line)', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: 'var(--ink-3)', display: 'flex', flexShrink: 0 }}>
            <X style={{ width: '1.1rem', height: '1.1rem' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Project Featured Photo with Reveal Animation */}
          <div className="modal-photo-wrap">
            <img
              src={
                project.id === 'proj-8' ? '/images/project_mondipatti.jpg' :
                project.id === 'proj-6' ? '/images/project_sirungattur.jpg' :
                project.id === 'proj-15' ? '/images/project_datacenter.jpg' :
                project.id === 'proj-14' ? '/images/project_transmission.jpg' :
                (project.category?.includes('Solar') ? '/images/project_sirungattur.jpg' :
                 project.category?.includes('GIS') ? '/images/project_mondipatti.jpg' :
                 '/images/civil_foundations.jpg')
              }
              alt={project.title}
            />
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.875rem' }}>
            {[
              { icon: <IndianRupee style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />, label: 'Project Cost', value: project.costInLakhs !== undefined ? `₹${project.costInLakhs.toFixed(2)} Lakhs` : 'ARC' },
              { icon: <Calendar style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />, label: 'Year', value: String(project.year) },
              { icon: <MapPin style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />, label: 'State', value: project.state },
              { icon: <Building2 style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />, label: 'Client', value: project.clientOrDeveloper },
            ].map((m, i) => (
              <div key={i} style={{ background: 'var(--bg-off)', border: '1px solid var(--line)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.375rem', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)' }}>
                  {m.icon}{m.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.5rem' }}>Site Location</p>
            <p style={{ background: 'var(--bg-off)', border: '1px solid var(--line)', borderRadius: '6px', padding: '0.875rem 1rem', fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{project.locationDetail}</p>
          </div>

          {/* Scope */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.5rem' }}>Scope of Work</p>
            <p style={{ background: 'var(--bg-off)', border: '1px solid var(--line)', borderRadius: '6px', padding: '0.875rem 1rem', fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>{project.scope}</p>
          </div>

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.625rem' }}>Technical Highlights</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.highlights.map((h, i) => (
                  <span key={i} style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '4px', fontWeight: 500 }}>{h}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 2rem', background: 'var(--bg-off)', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-4)', letterSpacing: '0.06em' }}>
            MIPL-PRJ-{String(project.srNo).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}>Close</button>
            <button onClick={() => { onClose(); onEnquireSimilar(project.title); }} className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}>
              Enquire Similar <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
