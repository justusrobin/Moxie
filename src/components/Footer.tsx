import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRFQ: _onOpenRFQ }) => {
  const handleNav = (tab: string) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'about', label: 'Company Overview' },
    { id: 'services', label: 'Turnkey EPC Capabilities' },
    { id: 'projects', label: 'Verified Project Track Record' },
    { id: 'industries', label: 'Industry Sectors' },
    { id: 'contact', label: 'Office Locations & Enquiries' },
  ];

  const serviceLinks = [
    'Substation Civil Works (11kV–765kV)',
    'High-Voltage Switchyards & Electrification',
    'Turnkey MEP & Building Services',
    'Fire Protection & Deluge Systems',
    'Statutory Testing & CEIG Clearance',
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-body">
          {/* Column 1: Brand & Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <button
              onClick={() => handleNav('home')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', lineHeight: 1, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              aria-label="Moxie Infratech Pvt Ltd — Return to Home"
            >
              <BrandLogo height={42} variant="full" />
            </button>
            <p style={{ fontSize: '0.9rem', color: 'rgba(245, 246, 248, 0.65)', lineHeight: 1.7, maxWidth: '340px' }}>
              Turnkey civil construction &amp; electrical EPC contracting for high-voltage substations, solar pooling bays, and industrial facilities across South India.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              {['Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'Andaman & Nicobar'].map((st) => (
                <span
                  key={st}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'rgba(245, 246, 248, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-nav-list">
              {navLinks.map((item) => (
                <li key={item.id} className="footer-nav-item">
                  <button onClick={() => handleNav(item.id)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Scopes */}
          <div>
            <h4 className="footer-column-title">EPC Capabilities</h4>
            <ul className="footer-nav-list">
              {serviceLinks.map((service, idx) => (
                <li key={idx} className="footer-nav-item">
                  <button onClick={() => handleNav('services')}>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact */}
          <div>
            <h4 className="footer-column-title">Direct Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--blue-accent)', display: 'block', marginBottom: '0.25rem' }}>
                  Registered Corporate Office
                </span>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245, 246, 248, 0.7)', lineHeight: 1.5, margin: 0 }}>
                  3/485, Mogappair West, Chennai — 600037, Tamil Nadu
                </p>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--blue-accent)', display: 'block', marginBottom: '0.25rem' }}>
                  Regional Engineering Office
                </span>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245, 246, 248, 0.7)', lineHeight: 1.5, margin: 0 }}>
                  11/91, Kamatchipuram, Ondipudur, Coimbatore — 641016, Tamil Nadu
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.5rem' }}>
                <a
                  href="tel:+918220223232"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    minHeight: '44px',
                  }}
                >
                  <Phone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--blue-accent)' }} />
                  +91 8220223232
                </a>
                <a
                  href="mailto:moxieinfratech@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(245, 246, 248, 0.75)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    minHeight: '44px',
                  }}
                >
                  <Mail style={{ width: '0.875rem', height: '0.875rem', color: 'var(--blue-accent)' }} />
                  moxieinfratech@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; 2026 Moxie Infratech Pvt Ltd. All rights reserved.
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(245, 246, 248, 0.45)', maxWidth: '520px', lineHeight: 1.5 }}>
            Independent EPC contractor. Ingaran Power Controls Private Limited is an independent associate entity and not a division or subsidiary of Moxie Infratech.
          </div>
        </div>
      </div>
    </footer>
  );
};
