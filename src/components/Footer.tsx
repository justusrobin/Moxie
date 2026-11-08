import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, Phone, Mail, MapPin, ChevronDown, Clock } from 'lucide-react';

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
          CLOSING ENQUIRY BANNER (COMPACT ON MOBILE)
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

          {/* ══════════════════════════════════════════════
              MOBILE ACCORDION FORMAT VIEW (< 769px)
              (Formatted exactly like the requested design)
             ══════════════════════════════════════════════ */}
          <div className="footer-accordion-mobile">
            {/* Top Brand & Social/Action Bar */}
            <div className="accordion-mobile-header">
              <button
                onClick={() => nav('home')}
                className="accordion-mobile-brand"
                aria-label="Moxie Infratech Home"
              >
                <BrandLogo height={32} variant="full" theme="dark" />
              </button>

              {/* Circular Action Icon (Phone / Contact) */}
              <a
                href="tel:+918220223232"
                className="accordion-mobile-circle-btn"
                aria-label="Call Moxie Infratech"
              >
                <Phone style={{ width: '1.1rem', height: '1.1rem' }} />
              </a>
            </div>

            {/* Short Tagline */}
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
                    <span className="accordion-hours-label">
                      <Clock style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />
                      Corporate Office
                    </span>
                    <span className="accordion-hours-val">Mon – Sat: 9:00 AM – 6:30 PM</span>
                  </div>
                  <div className="accordion-hours-row">
                    <span className="accordion-hours-label">
                      <Clock style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />
                      Site Execution
                    </span>
                    <span className="accordion-hours-val">24/7 Operations On-Site</span>
                  </div>
                  <div className="accordion-hours-row">
                    <span className="accordion-hours-label">
                      <Phone style={{ width: '0.85rem', height: '0.85rem', color: 'var(--accent)' }} />
                      Direct Desk
                    </span>
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
                      <MapPin style={{ width: '0.9rem', height: '0.9rem', color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                      <div>
                        <strong>Chennai Headquarters:</strong><br />
                        3/485, Mogappair West, Chennai — 600037, Tamil Nadu
                      </div>
                    </div>

                    <div className="accordion-findus-loc">
                      <MapPin style={{ width: '0.9rem', height: '0.9rem', color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                      <div>
                        <strong>Coimbatore Engineering Office:</strong><br />
                        11/91, Kamatchipuram, Ondipudur, Coimbatore — 641016
                      </div>
                    </div>

                    <div className="accordion-findus-actions">
                      <a href="tel:+918220223232" className="accordion-findus-pill">
                        <Phone style={{ width: '0.85rem', height: '0.85rem' }} /> +91 8220223232
                      </a>
                      <a href="mailto:moxieinfratech@gmail.com" className="accordion-findus-pill">
                        <Mail style={{ width: '0.85rem', height: '0.85rem' }} /> moxieinfratech@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── BOTTOM ROW: WhatsApp Icon + Copyright + Location ── */}
            <div className="accordion-mobile-bottom">
              {/* WhatsApp Floating/Fixed Circular Button */}
              <a
                href="https://wa.me/918220223232?text=Hello%20Moxie%20Infratech%2C%20I%20have%20an%20infrastructure%20project%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="accordion-whatsapp-btn"
                aria-label="Chat on WhatsApp"
              >
                {/* Official WhatsApp SVG Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 17.84c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.032 8.032 0 0 1-1.23-4.28c0-4.47 3.64-8.11 8.11-8.11 2.17 0 4.2 0.85 5.73 2.38a8.04 8.04 0 0 1 2.38 5.73c0 4.47-3.64 8.05-8.11 8.05zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.09-.39-.12-.55.12-.17.24-.63.79-.77.96-.15.17-.29.19-.53.07-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.44-1.35-1.68-.15-.24-.02-.37.1-.49.11-.11.24-.29.37-.43.12-.15.17-.24.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.55-.42h-.47c-.17 0-.43.06-.66.31-.22.24-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
                </svg>
              </a>

              {/* Centered Copyright & Location */}
              <div className="accordion-mobile-copyright-box">
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

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────
          FOOTER STYLES (MATCHING USER SCREENSHOT SPEC)
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
           Matches user reference screenshot:
           - Dark rich backdrop
           - Bold serif/display accordion triggers
           - Thin line separators
           - Circular action button top-right
           - Circular WhatsApp badge bottom-left
           - Centered copyright & location
           ══════════════════════════════════════════════ */
        @media (max-width: 768px) {
          /* Compact banner above accordion */
          .footer-enquiry-banner {
            padding: 2.25rem 0;
          }

          .footer-enquiry-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }

          .footer-enquiry-rule {
            margin-bottom: 0.65rem;
          }

          .footer-enquiry-heading {
            font-size: 1.45rem;
            margin-bottom: 0.4rem;
          }

          .footer-enquiry-lead {
            font-size: 0.9rem;
            margin-bottom: 1.25rem;
            line-height: 1.5;
          }

          .footer-enquiry-btn {
            width: 100%;
            max-width: 300px;
          }

          .footer-enquiry-contact {
            display: none; /* Contact is cleanly in accordion below */
          }

          /* Dark styled accordion footer matching user screenshot */
          .footer-main {
            background: #0E1318;
            color: #F5F6F8;
            padding-top: 2rem;
            padding-bottom: 2.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .footer-desktop-view {
            display: none !important;
          }

          .footer-accordion-mobile {
            display: flex !important;
            flex-direction: column;
            width: 100%;
          }

          /* Header Row: Logo left + Circular Action button right */
          .accordion-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 0.75rem;
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

          .accordion-mobile-circle-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.18);
            background: rgba(255, 255, 255, 0.04);
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .accordion-mobile-circle-btn:active {
            background: rgba(255, 255, 255, 0.15);
            transform: scale(0.95);
          }

          /* Tagline below brand */
          .accordion-mobile-tagline {
            font-size: 0.85rem;
            color: rgba(245, 246, 248, 0.55);
            line-height: 1.55;
            margin: 0 0 1.25rem 0;
            padding-bottom: 0.75rem;
          }

          /* Accordion Items with Thin Dividers */
          .accordion-mobile-item {
            border-top: 1px solid rgba(255, 255, 255, 0.09);
            width: 100%;
          }

          .accordion-mobile-item:last-of-type {
            border-bottom: 1px solid rgba(255, 255, 255, 0.09);
          }

          /* Trigger Button */
          .accordion-mobile-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.15rem 0;
            background: none;
            border: none;
            cursor: pointer;
            text-align: left;
            font-family: var(--font-display, 'Space Grotesk', serif, sans-serif);
            font-size: 1.125rem;
            font-weight: 600;
            color: #F5F6F8;
            letter-spacing: -0.01em;
            transition: color 0.15s ease;
          }

          .accordion-mobile-trigger:active {
            color: var(--accent);
          }

          .accordion-mobile-chevron {
            width: 1.25rem;
            height: 1.25rem;
            color: rgba(245, 246, 248, 0.45);
            transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), color 0.2s;
            flex-shrink: 0;
          }

          .accordion-mobile-chevron.open {
            transform: rotate(180deg);
            color: var(--accent);
          }

          /* Expanded Panels */
          .accordion-mobile-panel {
            padding-bottom: 1.25rem;
            animation: accordionSlideDown 0.25s ease-out;
          }

          @keyframes accordionSlideDown {
            from {
              opacity: 0;
              transform: translateY(-6px);
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
            gap: 0.25rem;
            padding: 0.5rem 0;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
          }

          .accordion-hours-row:last-child {
            border-bottom: none;
          }

          .accordion-hours-label {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.78rem;
            font-family: var(--font-mono);
            color: rgba(245, 246, 248, 0.5);
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .accordion-hours-val {
            font-size: 0.9rem;
            color: #F5F6F8;
            font-weight: 500;
            padding-left: 1.25rem;
          }

          .accordion-hours-link {
            font-size: 0.95rem;
            font-family: var(--font-mono);
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
            padding-left: 1.25rem;
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
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 0.75rem 0;
            width: 100%;
            text-align: left;
            font-size: 0.925rem;
            color: rgba(245, 246, 248, 0.75);
            cursor: pointer;
            transition: color 0.15s, padding-left 0.15s;
          }

          .accordion-link-btn:last-child {
            border-bottom: none;
          }

          .accordion-link-btn:active {
            color: var(--accent);
            padding-left: 0.35rem;
          }

          /* Find Us Content */
          .accordion-findus-block {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
          }

          .accordion-findus-loc {
            display: flex;
            gap: 0.65rem;
            align-items: flex-start;
            font-size: 0.875rem;
            color: rgba(245, 246, 248, 0.75);
            line-height: 1.55;
          }

          .accordion-findus-loc strong {
            color: #F5F6F8;
          }

          .accordion-findus-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 0.4rem;
          }

          .accordion-findus-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            padding: 0.55rem 0.85rem;
            font-family: var(--font-mono);
            font-size: 0.825rem;
            color: #F5F6F8;
            text-decoration: none;
            width: 100%;
          }

          /* Bottom Bar with WhatsApp on Left, Centered Copyright */
          .accordion-mobile-bottom {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding-top: 2rem;
            margin-top: 1rem;
            position: relative;
          }

          /* Green Circular WhatsApp Badge */
          .accordion-whatsapp-btn {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #25D366;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
            flex-shrink: 0;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .accordion-whatsapp-btn:active {
            transform: scale(0.92);
            box-shadow: 0 2px 8px rgba(37, 211, 102, 0.45);
          }

          /* Copyright & Location text */
          .accordion-mobile-copyright-box {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            flex: 1;
            font-family: var(--font-mono);
          }

          .accordion-mobile-copy {
            font-size: 0.72rem;
            color: rgba(245, 246, 248, 0.5);
            margin: 0;
            line-height: 1.4;
          }

          .accordion-mobile-loc {
            font-size: 0.72rem;
            color: rgba(245, 246, 248, 0.4);
            margin: 0.2rem 0 0 0;
            font-weight: 500;
          }

          .accordion-mobile-disclaimer {
            font-size: 0.62rem;
            color: rgba(245, 246, 248, 0.25);
            margin: 0.25rem 0 0 0;
            line-height: 1.4;
          }
        }
      `}</style>
    </>
  );
};
