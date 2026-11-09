import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, MapPin, ChevronDown } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRFQ }) => {
  // Mobile accordion state — allows toggling sections open/closed
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const nav = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'about',      label: 'About Company' },
    { id: 'services',   label: 'Turnkey EPC Capabilities' },
    { id: 'projects',   label: 'Verified Project Track Record' },
    { id: 'industries', label: 'Industry Sectors' },
    { id: 'contact',    label: 'Contact & Enquiry Desk' },
  ];

  const services = [
    'Substation Civil Works (11kV to 765kV)',
    'Electrical Turnkey & Switchyards',
    'Industrial Electrification & Solar',
    'Turnkey MEP & Building Services',
    'Statutory CEIG Testing & Approvals',
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
                +91 8220223232
              </a>
              <a
                href="mailto:moxieinfratech@gmail.com"
                className="footer-enquiry-email"
              >
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

          {/* ══════════════════════════════════════════════
              DESKTOP VIEW (>= 769px) — Standard 4-Col Layout
             ══════════════════════════════════════════════ */}
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
                    +91 8220223232
                  </a>

                  <a
                    href="mailto:moxieinfratech@gmail.com"
                    style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', textDecoration: 'none', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                  >
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

          {/* ══════════════════════════════════════════════
              MOBILE ACCORDION FORMAT VIEW (< 769px)
              Minimal, formal, neat typography, no icons
             ══════════════════════════════════════════════ */}
          <div className="footer-accordion-mobile">
            {/* Top Brand Logo */}
            <div className="accordion-mobile-header">
              <button
                onClick={() => nav('home')}
                className="accordion-mobile-brand"
                aria-label="Moxie Infratech Home"
              >
                <BrandLogo height={28} variant="full" theme="dark" />
              </button>
            </div>

            {/* Subtle Tagline */}
            <p className="accordion-mobile-tagline">
              Civil &amp; electrical EPC infrastructure contractor across South India.
            </p>

            {/* ── ACCORDION 1: Opening Hours ── */}
            <div className="accordion-mobile-item">
              <button
                type="button"
                className="accordion-mobile-trigger"
                onClick={() => toggleSection('hours')}
                aria-expanded={openSection === 'hours'}
              >
                <span>Opening Hours</span>
                <ChevronDown
                  className={`accordion-mobile-chevron ${openSection === 'hours' ? 'open' : ''}`}
                />
              </button>

              {openSection === 'hours' && (
                <div className="accordion-mobile-panel">
                  <div className="accordion-hours-row">
                    <span className="accordion-hours-label">Corporate Office</span>
                    <span className="accordion-hours-val">Mon – Sat: 9:00 AM – 6:30 PM</span>
                  </div>
                  <div className="accordion-hours-row">
                    <span className="accordion-hours-label">Site Execution</span>
                    <span className="accordion-hours-val">24/7 Ongoing Operations</span>
                  </div>
                  <div className="accordion-hours-row">
                    <span className="accordion-hours-label">Direct Desk</span>
                    <a href="tel:+918220223232" className="accordion-hours-link">
                      +91 8220223232
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* ── ACCORDION 2: Quick Links ── */}
            <div className="accordion-mobile-item">
              <button
                type="button"
                className="accordion-mobile-trigger"
                onClick={() => toggleSection('links')}
                aria-expanded={openSection === 'links'}
              >
                <span>Quick Links</span>
                <ChevronDown
                  className={`accordion-mobile-chevron ${openSection === 'links' ? 'open' : ''}`}
                />
              </button>

              {openSection === 'links' && (
                <div className="accordion-mobile-panel">
                  <ul className="accordion-links-list">
                    {navLinks.map(({ id, label }) => (
                      <li key={id}>
                        <button
                          onClick={() => nav(id)}
                          className="accordion-link-btn"
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ── ACCORDION 3: Find Us ── */}
            <div className="accordion-mobile-item">
              <button
                type="button"
                className="accordion-mobile-trigger"
                onClick={() => toggleSection('findus')}
                aria-expanded={openSection === 'findus'}
              >
                <span>Find Us</span>
                <ChevronDown
                  className={`accordion-mobile-chevron ${openSection === 'findus' ? 'open' : ''}`}
                />
              </button>

              {openSection === 'findus' && (
                <div className="accordion-mobile-panel">
                  <div className="accordion-findus-block">
                    <div className="accordion-findus-loc">
                      <MapPin style={{ width: '0.8rem', height: '0.8rem', color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                      <div>
                        <strong>Chennai Headquarters:</strong><br />
                        3/485, Mogappair West, Chennai — 600037
                      </div>
                    </div>

                    <div className="accordion-findus-loc">
                      <MapPin style={{ width: '0.8rem', height: '0.8rem', color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                      <div>
                        <strong>Coimbatore Regional Office:</strong><br />
                        11/91, Kamatchipuram, Ondipudur, Coimbatore — 641016
                      </div>
                    </div>

                    <div className="accordion-findus-actions">
                      <a href="tel:+918220223232" className="accordion-findus-pill">
                        +91 8220223232
                      </a>
                      <a href="mailto:moxieinfratech@gmail.com" className="accordion-findus-pill">
                        moxieinfratech@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── BOTTOM ROW: Clean Formal Centered Copyright (No WhatsApp button) ── */}
            <div className="accordion-mobile-bottom">
              <p className="accordion-mobile-copy">
                &copy; 2026 Moxie Infratech Pvt. Ltd. All rights reserved.
              </p>
              <p className="accordion-mobile-loc">
                Chennai, Tamil Nadu
              </p>
              <p className="accordion-mobile-disclaimer">
                Moxie Infratech and Ingaran Power Controls Pvt. Ltd. are independent entities.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────
          FOOTER STYLES
      ───────────────────────────────────────────────── */}
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

        /* Mobile Accordion Styles — Hidden on desktop */
        .footer-accordion-mobile {
          display: none;
        }

        @media (max-width: 1023px) {
          .footer-cols {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ══════════════════════════════════════════════
           MOBILE ACCORDION FORMAT (< 769px)
           Minimal, neat, formal corporate representation
           ══════════════════════════════════════════════ */
        @media (max-width: 768px) {
          /* Compact banner above accordion */
          .footer-enquiry-banner {
            padding: 2rem 0;
          }

          .footer-enquiry-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .footer-enquiry-rule {
            margin-bottom: 0.5rem;
          }

          .footer-enquiry-heading {
            font-size: 1.35rem;
            margin-bottom: 0.35rem;
          }

          .footer-enquiry-lead {
            font-size: 0.85rem;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .footer-enquiry-btn {
            width: 100%;
            max-width: 280px;
            font-size: 0.85rem;
            padding: 0.75rem 1.5rem;
          }

          .footer-enquiry-contact {
            display: none;
          }

          /* Dark styled minimal formal accordion footer */
          .footer-main {
            background: #0E1318;
            color: #F5F6F8;
            padding-top: 1.75rem;
            padding-bottom: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
          }

          .footer-desktop-view {
            display: none !important;
          }

          .footer-accordion-mobile {
            display: flex !important;
            flex-direction: column;
            width: 100%;
          }

          /* Header: Brand Logo cleanly left-aligned */
          .accordion-mobile-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            margin-bottom: 0.4rem;
          }

          .accordion-mobile-brand {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            line-height: 1;
            display: flex;
            align-items: center;
          }

          /* Tagline below brand */
          .accordion-mobile-tagline {
            font-size: 0.78rem;
            color: rgba(245, 246, 248, 0.45);
            line-height: 1.5;
            margin: 0 0 1rem 0;
            padding-bottom: 0.5rem;
          }

          /* Accordion Items with Thin Delicate Dividers */
          .accordion-mobile-item {
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            width: 100%;
          }

          .accordion-mobile-item:last-of-type {
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          }

          /* Trigger Button - Refined, formal, understated font size */
          .accordion-mobile-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.85rem 0;
            background: none;
            border: none;
            cursor: pointer;
            text-align: left;
            font-family: var(--font-body);
            font-size: 0.925rem;
            font-weight: 500;
            color: #E2E8F0;
            letter-spacing: 0.01em;
            transition: color 0.15s ease;
          }

          .accordion-mobile-trigger:active {
            color: var(--accent);
          }

          .accordion-mobile-chevron {
            width: 1rem;
            height: 1rem;
            color: rgba(245, 246, 248, 0.35);
            transition: transform 0.25s ease, color 0.2s;
            flex-shrink: 0;
          }

          .accordion-mobile-chevron.open {
            transform: rotate(180deg);
            color: var(--accent);
          }

          /* Expanded Panels */
          .accordion-mobile-panel {
            padding-bottom: 1rem;
            animation: accordionSlideDown 0.2s ease-out;
          }

          @keyframes accordionSlideDown {
            from {
              opacity: 0;
              transform: translateY(-4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Hours content */
          .accordion-hours-row {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            padding: 0.4rem 0;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
          }

          .accordion-hours-row:last-child {
            border-bottom: none;
          }

          .accordion-hours-label {
            font-size: 0.7rem;
            font-family: var(--font-mono);
            color: rgba(245, 246, 248, 0.45);
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .accordion-hours-val {
            font-size: 0.825rem;
            color: #CBD5E1;
            font-weight: 400;
          }

          .accordion-hours-link {
            font-size: 0.85rem;
            font-family: var(--font-mono);
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
          }

          /* Links List */
          .accordion-links-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
          }

          .accordion-link-btn {
            background: none;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            padding: 0.55rem 0;
            width: 100%;
            text-align: left;
            font-size: 0.825rem;
            color: rgba(245, 246, 248, 0.65);
            cursor: pointer;
            transition: color 0.15s, padding-left 0.15s;
          }

          .accordion-link-btn:last-child {
            border-bottom: none;
          }

          .accordion-link-btn:active {
            color: var(--accent);
            padding-left: 0.25rem;
          }

          /* Find Us Content */
          .accordion-findus-block {
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
          }

          .accordion-findus-loc {
            display: flex;
            gap: 0.5rem;
            align-items: flex-start;
            font-size: 0.8rem;
            color: rgba(245, 246, 248, 0.65);
            line-height: 1.5;
          }

          .accordion-findus-loc strong {
            color: #E2E8F0;
            font-weight: 500;
          }

          .accordion-findus-actions {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.35rem;
          }

          .accordion-findus-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 4px;
            padding: 0.45rem 0.65rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: #CBD5E1;
            text-decoration: none;
            flex: 1;
            text-align: center;
          }

          /* Bottom Row: Centered Formal Clean Copyright (No WhatsApp button) */
          .accordion-mobile-bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-top: 1.5rem;
            margin-top: 0.5rem;
          }

          .accordion-mobile-copy {
            font-size: 0.68rem;
            color: rgba(245, 246, 248, 0.45);
            margin: 0;
            line-height: 1.4;
            font-family: var(--font-mono);
          }

          .accordion-mobile-loc {
            font-size: 0.68rem;
            color: rgba(245, 246, 248, 0.35);
            margin: 0.15rem 0 0 0;
            font-family: var(--font-mono);
          }

          .accordion-mobile-disclaimer {
            font-size: 0.58rem;
            color: rgba(245, 246, 248, 0.22);
            margin: 0.25rem 0 0 0;
            line-height: 1.4;
            max-width: 320px;
            font-family: var(--font-mono);
          }
        }
      `}</style>
    </>
  );
};
