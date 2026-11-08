import React from 'react';
import { COMPANY_INFO } from '../data/companyData';

export const AboutPage: React.FC<{ onOpenRFQ: () => void }> = (_props) => (
  <div style={{ background: 'var(--bg-white)' }}>

    {/* HEADER — light stone */}
    <section style={{ background: 'var(--bg-light)', paddingTop: '9rem', paddingBottom: '5rem', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <span className="eyebrow">About Moxie Infratech</span>
        <h1 style={{ color: 'var(--ink)', maxWidth: '700px', marginBottom: '1.5rem' }}>Engineering Precision.<br />Dependable Execution.</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '560px' }}>
          Moxie Infratech Pvt Ltd is a turnkey EPC contractor delivering high-voltage substation civil works, electrical infrastructure, and industrial engineering across South India.
        </p>
      </div>
    </section>

    {/* PHILOSOPHY — white */}
    <section style={{ background: 'var(--bg-white)', padding: '6rem 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="split-grid">
          <div>
            <hr className="rule" />
            <h2 style={{ color: 'var(--ink)', marginBottom: '1.5rem', maxWidth: '500px' }}>Precise planning. Coordinated delivery.</h2>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: '1.25rem', maxWidth: '480px' }}>
              As a multi-disciplinary EPC firm, we act as a single accountable entity — from geotechnical excavation to final energization and statutory CEIG clearance.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '1.5rem' }}>
              {['Direct senior management reporting on every project', 'Integrated civil and electrical scheduling', 'Responsible use of water, energy, and construction materials'].map(pt => (
                <li key={pt} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'var(--ink-2)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: '0.5rem' }} />{pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="photo-frame" style={{ height: '420px' }}>
            <img src="/images/civil_foundations.jpg" alt="Substation civil construction" />
          </div>
        </div>

        {/* Vision / Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.5rem', marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--line)' }} className="vm-grid">
          {[
            { label: 'Vision', text: '"Achieve the target with optimal solutions and create enduring standards across the EPC and infrastructure industry."' },
            { label: 'Mission', text: '"Provide engineering services with continuous technical upgrades to address changing industrial needs, delivering high value-addition while maintaining stringent quality and safety standards."' },
          ].map(v => (
            <div key={v.label} style={{ background: 'var(--bg-off)', padding: '2.5rem', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
              <h3 style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: '1rem' }}>{v.label}</h3>
              <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.8, fontStyle: 'italic' }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CORE VALUES — off-white */}
    <section style={{ background: 'var(--bg-off)', padding: '6rem 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <span className="eyebrow">Core Principles</span>
        <h2 style={{ color: 'var(--ink)', marginBottom: '3.5rem' }}>What guides our work.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.5rem' }} className="val-grid">
          {COMPANY_INFO.coreValues.map((val, i) => (
            <div key={i} className="card" style={{ padding: '2.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--accent)', opacity: 0.15, lineHeight: 1, display: 'block', marginBottom: '1.25rem', letterSpacing: '-0.05em' }}>0{i+1}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>{val.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* LEADERSHIP — white */}
    <section style={{ background: 'var(--bg-white)', padding: '6rem 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <span className="eyebrow">Leadership</span>
        <h2 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>Engineering Leadership.</h2>
        <p style={{ color: 'var(--ink-3)', marginBottom: '3.5rem', maxWidth: '480px' }}>Directors with over two decades of high-voltage substation and quality management experience.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.5rem', marginBottom: '3rem' }} className="leaders-grid">
          {COMPANY_INFO.leadership.map((l, i) => (
            <div key={i} className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--line)', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{l.name}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>{l.credentials} · {l.role}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.3rem 0.75rem', borderRadius: '4px' }}>{l.experienceYears}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{l.summary}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {l.keyStrengths.map((s, si) => (
                  <div key={si} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--ink-3)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: '0.4rem' }} />{s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2.5rem' }} className="team-grid">
          {COMPANY_INFO.keyPersonnel.map((p, i) => (
            <div key={i} style={{ background: 'var(--bg-off)', border: '1px solid var(--line)', borderRadius: '6px', padding: '1.125rem 1.25rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.role}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)', marginTop: '0.15rem' }}>{p.department}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.75rem', background: 'var(--bg-off)', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--ink-3)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--ink-2)' }}>Corporate Independence: </strong>
          Moxie Infratech Pvt Ltd is an independent EPC contractor. Ingaran Power Controls Private Limited is a separate entity and is not a subsidiary or division of Moxie Infratech.
        </div>
      </div>
    </section>
  </div>
);
