import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/useTheme';
import { Menu, X, Sun, Moon, ArrowRight, ChevronRight, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenRFQ,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent background page scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'industries', label: 'Industries' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentTab === 'home' || !navItems.some((n) => n.id === currentTab);
  const isTransparent = isHome && !scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={`site-header ${isTransparent ? 'site-header--transparent' : 'site-header--scrolled'}`}
        role="banner"
      >
        <div className="container header-inner">
          {/* Official Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="header-logo-btn"
            aria-label="Moxie Infratech Pvt Ltd — Return to Home"
          >
            <BrandLogo height={34} variant="full" />
          </button>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Group: Theme Toggle & Primary Enquiry CTA */}
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun style={{ width: '1.15rem', height: '1.15rem' }} />
              ) : (
                <Moon style={{ width: '1.15rem', height: '1.15rem' }} />
              )}
            </button>

            {/* Desktop Header CTA */}
            <button onClick={onOpenRFQ} className="btn-header-enquiry">
              Discuss Your Project
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X style={{ width: '1.4rem', height: '1.4rem' }} />
              ) : (
                <Menu style={{ width: '1.4rem', height: '1.4rem' }} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => handleNavClick('home')}
              className={`mobile-nav-link ${currentTab === 'home' ? 'mobile-nav-link--active' : ''}`}
            >
              <span>Home Overview</span>
              <ChevronRight style={{ width: '1.1rem', height: '1.1rem', opacity: 0.6 }} />
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link ${currentTab === item.id ? 'mobile-nav-link--active' : ''}`}
              >
                <span>{item.label}</span>
                <ChevronRight style={{ width: '1.1rem', height: '1.1rem', opacity: 0.6 }} />
              </button>
            ))}
          </nav>

          {/* Drawer Actions & Contact */}
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Quick Contact Desk */}
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--blue-accent)' }}>
                Direct Engineering Desk
              </div>
              <a
                href="tel:+918220223232"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  minHeight: '36px',
                }}
              >
                <Phone style={{ width: '0.9rem', height: '0.9rem', color: 'var(--blue-accent)' }} />
                +91 8220223232
              </a>
              <a
                href="mailto:moxieinfratech@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  minHeight: '32px',
                }}
              >
                <Mail style={{ width: '0.9rem', height: '0.9rem', color: 'var(--blue-accent)' }} />
                moxieinfratech@gmail.com
              </a>
            </div>

            {/* Appearance Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Appearance</span>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun style={{ width: '1.1rem', height: '1.1rem' }} />
                ) : (
                  <Moon style={{ width: '1.1rem', height: '1.1rem' }} />
                )}
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRFQ();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', minHeight: '50px' }}
            >
              Discuss Your Project <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
