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

  /* Shared hover helpers for desktop */
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
      <section className="footer-enquiry-banner">
        <div className="container">
          <div className="footer-enquiry-inner">
            {/* Headline & CTA */}
            <div className="footer-enquiry-text">
              <hr className="footer-enquiry-rule" />
              <h2 className="footer-enquiry-heading">
                Have a project in mind?
              </h2>
              <p className="footer-enquiry-lead">
                Let's discuss your civil or electrical infrastructure requirements.
              </p>
              <button onClick={onOpenRFQ} className="btn-primary footer-enquiry-btn">
                Discuss Your Project&nbsp;
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>

            {/* Quick contact */}
            <div className="footer-enquiry-contact">
              <a
                href="tel:+918220223232"
                className="footer-enquiry-phone"
              >
                <Phone style={{ width: '0.95rem', height: '0.95rem', color: 'var(--accent)' }} />
                +91 8220223232
              </a>
              <a
                href="mailto:moxieinfratech@gmail.com"
                className="footer-enquiry-email"
              >
                <Mail style={{ width: '0.95rem', height: '0.95rem', color: 'var(--ink-4)' }} />
                moxieinfratech@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────────── */}
      <footer className="footer-main">
        <div className="container">

          {/* ════════ DESKTOP VIEW (>= 769px) ════════ */}
          <div className="footer-desktop-view">
            <div className="footer-cols">
              {/* Col 1 — Identity */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={() => nav('home')}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  aria-label="Go to home"
                >
                  <BrandLogo height={44} variant="full" theme="light" />
                </button>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>
                  Civil and electrical EPC solutions for power and industrial infrastructure.
                </p>
              </div>

              {/* Col 2 — Navigation */}
              <div>
                <p className="footer-col-title">Pages</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {navLinks.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => nav(id)}
                        className="footer-desktop-link"
                        onMouseEnter={e => linkHover(e, true)}
                        onMouseLeave={e => linkHover(e, false)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — Services */}
              <div>
                <p className="footer-col-title">Services</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {services.map(s => (
                    <li key={s}>
                      <button
                        onClick={() => nav('services')}
                        className="footer-desktop-link"
                        onMouseEnter={e => linkHover(e, true)}
                        onMouseLeave={e => linkHover(e, false)}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 — Contact */}
              <div>
                <p className="footer-col-title">Contact</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <MapPin style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)', flexShrink: 0, marginTop: '0.25rem' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.6 }}>
                      3/485, Mogappair West<br />Chennai — 600037, Tamil Nadu
                    </span>
                  </div>

                  <a
                    href="tel:+918220223232"
                    style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', textDecoration: 'none', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                  >
                    <Phone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)' }} />
                    +91 8220223232
                  </a>

                  <a
                    href="mailto:moxieinfratech@gmail.com"
                    style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', textDecoration: 'none', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                  >
                    <Mail style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)' }} />
                    moxieinfratech@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Copyright row */}
            <div className="footer-desktop-bottom">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-4)' }}>
                © 2026 Moxie Infratech Pvt. Ltd. All rights reserved.
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--ink-4)' }}>
                Moxie Infratech and Ingaran Power Controls Pvt. Ltd. are independent entities.
              </span>
            </div>
          </div>

          {/* ════════ MOBILE MINIMAL & SHORT VIEW (< 769px) ════════ */}
          <div className="footer-mobile-view">
            {/* Centered Brand Logo */}
            <button
              onClick={() => nav('home')}
              className="footer-mobile-logo-btn"
              aria-label="Go to home"
            >
              <BrandLogo height={34} variant="full" theme="light" />
            </button>

            {/* Concise Tagline */}
            <p className="footer-mobile-tagline">
              Civil &amp; Electrical EPC Solutions · Tamil Nadu
            </p>

            {/* Compact Horizontal Nav Links */}
            <nav className="footer-mobile-nav" aria-label="Footer Navigation">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => nav(id)}
                  className="footer-mobile-nav-btn"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Compact Direct Contact */}
            <div className="footer-mobile-contact">
              <a href="tel:+918220223232" className="footer-mobile-contact-link">
                <Phone style={{ width: '0.8rem', height: '0.8rem', color: 'var(--accent)' }} />
                +91 8220223232
              </a>
              <span className="footer-mobile-dot">·</span>
              <a href="mailto:moxieinfratech@gmail.com" className="footer-mobile-contact-link">
                <Mail style={{ width: '0.8rem', height: '0.8rem', color: 'var(--ink-4)' }} />
                moxieinfratech@gmail.com
              </a>
            </div>

            {/* Minimal Location & Legal */}
            <div className="footer-mobile-legal">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                <MapPin style={{ width: '0.75rem', height: '0.75rem', color: 'var(--ink-4)' }} />
                <span>Chennai — 600037, Tamil Nadu</span>
              </div>
              <div>© 2026 Moxie Infratech Pvt. Ltd. All rights reserved.</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--ink-4)', marginTop: '0.15rem', opacity: 0.85 }}>
                Moxie Infratech and Ingaran Power Controls Pvt. Ltd. are independent entities.
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Responsive Footer Styling */}
      <style>{`
        /* Closing Enquiry Banner */
        .footer-enquiry-banner {
          background: var(--bg-light);
          border-top: 1px solid var(--line);
          padding: 5.5rem 0;
        }

        .footer-enquiry-inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }

        .footer-enquiry-text {
          max-width: 560px;
        }

        .footer-enquiry-rule {
          width: 36px;
          height: 2px;
          background: var(--accent);
          border: none;
          margin-bottom: 1.5rem;
        }

        .footer-enquiry-heading {
          color: var(--ink);
          font-size: clamp(2rem, 3.5vw, 3rem);
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .footer-enquiry-lead {
          font-size: 1.0625rem;
          color: var(--ink-3);
          line-height: 1.75;
          margin-bottom: 2.5rem;
          max-width: 440px;
        }

        .footer-enquiry-contact {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-enquiry-phone {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
          color: var(--ink);
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 600;
          transition: color 0.2s;
        }

        .footer-enquiry-phone:hover {
          color: var(--accent);
        }

        .footer-enquiry-email {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
          color: var(--ink-3);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          transition: color 0.2s;
        }

        .footer-enquiry-email:hover {
          color: var(--accent);
        }

        /* Footer Main */
        .footer-main {
          background: var(--bg-off);
          border-top: 1px solid var(--line);
          padding-top: 4rem;
        }

        /* Desktop Styles */
        .footer-desktop-view {
          display: block;
        }

        .footer-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid var(--line);
        }

        .footer-col-title {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-4);
          margin-bottom: 1.25rem;
        }

        .footer-desktop-link {
          background: none;
          border: none;
          border-bottom: 1px solid var(--line);
          cursor: pointer;
          font-size: 0.9375rem;
          color: var(--ink-3);
          padding: 0.55rem 0;
          text-align: left;
          width: 100%;
          display: block;
          transition: color 0.2s, padding-left 0.2s;
        }

        .footer-desktop-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 0 2rem;
        }

        /* Mobile Minimal Styles (< 769px) */
        .footer-mobile-view {
          display: none;
        }

        @media (max-width: 1023px) {
          .footer-cols {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          /* Minimal & Short Closing Banner */
          .footer-enquiry-banner {
            padding: 2.25rem 0;
          }

          .footer-enquiry-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          .footer-enquiry-rule {
            margin-bottom: 0.75rem;
          }

          .footer-enquiry-heading {
            font-size: 1.45rem;
            margin-bottom: 0.5rem;
          }

          .footer-enquiry-lead {
            font-size: 0.9rem;
            margin-bottom: 1.25rem;
            line-height: 1.55;
          }

          .footer-enquiry-btn {
            width: 100%;
            max-width: 320px;
          }

          .footer-enquiry-contact {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.75rem 1.25rem;
            width: 100%;
            padding-top: 0.75rem;
            border-top: 1px solid var(--line);
          }

          .footer-enquiry-phone,
          .footer-enquiry-email {
            font-size: 0.825rem;
          }

          /* Minimal & Short Footer */
          .footer-main {
            padding-top: 2rem;
            padding-bottom: 1.5rem;
          }

          .footer-desktop-view {
            display: none !important;
          }

          .footer-mobile-view {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.875rem;
          }

          .footer-mobile-logo-btn {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            line-height: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .footer-mobile-tagline {
            font-size: 0.8rem;
            color: var(--ink-3);
            margin: 0;
            line-height: 1.4;
          }

          .footer-mobile-nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.2rem 0.6rem;
            width: 100%;
            padding: 0.65rem 0;
            margin: 0.25rem 0;
            border-top: 1px solid var(--line);
            border-bottom: 1px solid var(--line);
          }

          .footer-mobile-nav-btn {
            background: none;
            border: none;
            padding: 0.35rem 0.45rem;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--ink-2);
            cursor: pointer;
            font-family: var(--font-body);
            transition: color 0.15s;
          }

          .footer-mobile-nav-btn:hover {
            color: var(--accent);
          }

          .footer-mobile-contact {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 0.4rem 0.6rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
          }

          .footer-mobile-contact-link {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            color: var(--ink-2);
            text-decoration: none;
            font-size: 0.8rem;
            transition: color 0.15s;
          }

          .footer-mobile-contact-link:hover {
            color: var(--accent);
          }

          .footer-mobile-dot {
            color: var(--ink-4);
            user-select: none;
          }

          .footer-mobile-legal {
            font-family: var(--font-mono);
            font-size: 0.68rem;
            color: var(--ink-4);
            line-height: 1.5;
            margin-top: 0.25rem;
          }
        }
      `}</style>
    </>
  );
};
