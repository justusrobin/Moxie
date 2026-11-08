import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Check, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC<{ onOpenRFQ: () => void }> = ({ onOpenRFQ }) => (
  <div style={{ background: 'var(--bg-main)' }}>

    {/* PAGE HEADER */}
    <section
      style={{
        background: 'var(--bg-surface)',
        paddingTop: 'clamp(6.5rem, 12vw, 8.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        <span className="eyebrow">Corporate Profile</span>
        <h1 style={{ maxWidth: '780px', marginBottom: '1.25rem' }}>
          Engineering Precision.<br />Dependable Infrastructure Execution.
        </h1>
        <p className="text-lead" style={{ maxWidth: '640px' }}>
          Moxie Infratech Pvt Ltd is an integrated EPC contractor delivering high-voltage substation civil works, electrical power infrastructure, and turnkey industrial installations across South India.
        </p>
      </div>
    </section>

    {/* PHILOSOPHY & CAPABILITY */}
    <section style={{ background: 'var(--bg-main)', padding: 'clamp(4.5rem, 8vw, 6.5rem) 0', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          <div>
            <hr className="rule-accent" />
            <h2 style={{ marginBottom: '1.25rem', maxWidth: '520px' }}>
              Rigorous planning. Seamless civil-electrical coordination.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem', maxWidth: '500px' }}>
              As a unified EPC entity, Moxie eliminates vendor friction between deep earthworks, precision equipment foundations, switchyard structures, and electrical energization.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '1.25rem' }}>
              {[
                'Direct senior engineering director oversight on every project',
                'Integrated civil and electrical engineering milestones to prevent energization delays',
                'Six Sigma quality governance applied across civil plinths and electrical terminations',
                'Resource-efficient construction minimizing environmental impact and material waste',
              ].map((pt, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue-primary)', flexShrink: 0, marginTop: '0.55rem' }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="photo-frame-editorial" style={{ height: 'clamp(220px, 55vw, 420px)' }}>
            <img src="/images/civil_foundations.jpg" alt="Substation civil foundation works" loading="lazy" />
          </div>
        </div>

        {/* Vision & Mission */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            paddingTop: 'clamp(2.5rem, 5vw, 3.5rem)',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ background: 'var(--bg-surface)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '6px', borderLeft: '3px solid var(--blue-primary)' }}>
            <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)', marginBottom: '0.75rem' }}>
              Corporate Vision
            </h3>
            <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontStyle: 'italic' }}>
              "Achieve the target with optimal engineering solutions and create enduring standards across the EPC and infrastructure industry."
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '6px', borderLeft: '3px solid var(--blue-accent)' }}>
            <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-accent)', marginBottom: '0.75rem' }}>
              Engineering Mission
            </h3>
            <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontStyle: 'italic' }}>
              "Provide engineering services with continuous technical upgrades to address changing industrial needs, delivering high value-addition while maintaining stringent quality and safety standards."
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CORE VALUES */}
    <section style={{ background: 'var(--bg-surface)', padding: 'clamp(4.5rem, 8vw, 6.5rem) 0', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <span className="eyebrow">Operating Principles</span>
        <h2 style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>The Principles Guiding Our Execution.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.25rem, 3vw, 2rem)' }}>
          {COMPANY_INFO.coreValues.map((val, idx) => (
            <div key={idx} className="photo-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--blue-primary)',
                  opacity: 0.25,
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.04em',
                }}
              >
                0{idx + 1}
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>{val.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.68 }}>
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* LEADERSHIP */}
    <section style={{ background: 'var(--bg-main)', padding: 'clamp(4.5rem, 8vw, 6.5rem) 0', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <span className="eyebrow">Executive Leadership</span>
        <h2 style={{ marginBottom: '0.75rem' }}>Technical Directors &amp; Governance.</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '520px' }}>
          Directors with over two decades of high-voltage substation engineering and quality standardization experience.
        </p>

        {/* Directors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '3rem' }}>
          {COMPANY_INFO.leadership.map((leader, idx) => (
            <div key={idx} className="photo-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{leader.name}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue-accent)' }}>
                    {leader.credentials} · {leader.role}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: 'var(--blue-subtle)', color: 'var(--blue-accent)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 600 }}>
                  {leader.experienceYears}
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {leader.summary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {leader.keyStrengths.map((str, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <Check style={{ width: '14px', height: '14px', color: 'var(--blue-accent)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Engineering Personnel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {COMPANY_INFO.keyPersonnel.map((person, idx) => (
            <div key={idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.15rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>{person.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--blue-accent)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {person.role}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{person.department}</div>
            </div>
          ))}
        </div>

        {/* Corporate Independence Note */}
        <div
          style={{
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Corporate Identity Note: </strong>
            Moxie Infratech Pvt Ltd is an independent EPC contractor. Ingaran Power Controls Private Limited is an independent associate entity and not a division or subsidiary of Moxie Infratech.
          </div>
          <button onClick={onOpenRFQ} className="btn-primary" style={{ width: '100%', maxWidth: '280px', minHeight: '48px' }}>
            Discuss Your Project <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
          </button>
        </div>
      </div>
    </section>

  </div>
);
