import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRFQ }) => {
  const nav = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'about',      label: 'About' },
    { id: 'services',   label: 'Services' },
    { id: 'projects',   label: 'Projects' },
    { id: 'industries', label: 'Industries' },
    { id: 'contact',    label: 'Contact' },
  ];

  const services = [
    'Substation Civil Works',
    'Electrical Turnkey & Switchyards',
    'Industrial Electrification',
    'MEP & PHE',
    'CEIG Testing & Approvals',
  ];

  /* Shared hover helpers */
  const linkHover = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, enter: boolean) => {
    (e.currentTarget as HTMLElement).style.color = enter ? 'var(--ink)' : 'var(--ink-3)';
    if ((e.currentTarget as HTMLButtonElement).tagName === 'BUTTON') {
      (e.currentTarget as HTMLButtonElement).style.paddingLeft = enter ? '6px' : '0px';
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────
          CLOSING ENQUIRY BANNER
      ───────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-light)',
        borderTop: '1px solid var(--line)',
        padding: '6rem 0',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3rem',
          }}>
            {/* Headline */}
            <div style={{ maxWidth: '560px' }}>
              <hr style={{ width: 36, height: 2, background: 'var(--accent)', border: 'none', marginBottom: '1.5rem' }} />
              <h2 style={{
                color: 'var(--ink)', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.1,
              }}>
                Have a project in mind?
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 440 }}>
                Let's discuss your civil or electrical infrastructure requirements.
              </p>
              <button onClick={onOpenRFQ} className="btn-primary">
                Discuss Your Project&nbsp;
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>

            {/* Quick contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="tel:+918220223232"
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}>
                <Phone style={{ width: '1rem', height: '1rem', color: 'var(--accent)' }} />
                +91 8220223232
              </a>
              <a href="mailto:moxieinfratech@gmail.com"
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}>
                <Mail style={{ width: '1rem', height: '1rem', color: 'var(--ink-4)' }} />
                moxieinfratech@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────────── */}
      <footer style={{
        background: 'var(--bg-off)',
        borderTop: '1px solid var(--line)',
        paddingTop: '4rem',
      }}>
        <div className="container">

          {/* ── 4-column grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid var(--line)',
          }}
            /* collapse to 2-col on tablet, 1-col on mobile via style tag below */
            className="footer-cols"
          >

            {/* Col 1 — Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => nav('home')}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                aria-label="Go to home">
                <BrandLogo height={44} variant="full" theme="light" />
              </button>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>
                Civil and electrical EPC solutions for power and industrial infrastructure.
              </p>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '1.25rem',
              }}>Pages</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {navLinks.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => nav(id)}
                      style={{
                        background: 'none', border: 'none',
                        borderBottom: '1px solid var(--line)',
                        cursor: 'pointer',
                        fontSize: '0.9375rem', color: 'var(--ink-3)',
                        padding: '0.55rem 0', textAlign: 'left',
                        width: '100%', display: 'block',
                        transition: 'color 0.2s, padding-left 0.2s',
                      }}
                      onMouseEnter={e => linkHover(e, true)}
                      onMouseLeave={e => linkHover(e, false)}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '1.25rem',
              }}>Services</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {services.map(s => (
                  <li key={s}>
                    <button
                      onClick={() => nav('services')}
                      style={{
                        background: 'none', border: 'none',
                        borderBottom: '1px solid var(--line)',
                        cursor: 'pointer',
                        fontSize: '0.875rem', color: 'var(--ink-3)',
                        padding: '0.5rem 0', textAlign: 'left',
                        width: '100%', display: 'block',
                        transition: 'color 0.2s, padding-left 0.2s',
                      }}
                      onMouseEnter={e => linkHover(e, true)}
                      onMouseLeave={e => linkHover(e, false)}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: '1.25rem',
              }}>Contact</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <MapPin style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.6 }}>
                    3/485, Mogappair West<br />Chennai — 600037, Tamil Nadu
                  </span>
                </div>

                <a href="tel:+918220223232"
                  style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', textDecoration: 'none', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}>
                  <Phone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)' }} />
                  +91 8220223232
                </a>

                <a href="mailto:moxieinfratech@gmail.com"
                  style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', textDecoration: 'none', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}>
                  <Mail style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)' }} />
                  moxieinfratech@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* ── Copyright row ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center',
            gap: '0.75rem', padding: '1.5rem 0 2rem',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-4)' }}>
              © {new Date().getFullYear()} Moxie Infratech Pvt. Ltd. All rights reserved.
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--ink-4)' }}>
              Moxie Infratech and Ingaran Power Controls Pvt. Ltd. are independent entities.
            </span>
          </div>

        </div>
      </footer>

      {/* Responsive footer columns */}
      <style>{`
        @media (max-width: 1023px) {
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};
