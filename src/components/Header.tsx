import { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenRFQ
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when tab changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentTab]);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'industries', label: 'Industries' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentTab === 'home' || !['about', 'services', 'projects', 'industries', 'contact'].includes(currentTab);
  const isTransparent = isHome && !scrolled && !mobileMenuOpen;
  const isDarkNav = isTransparent || mobileMenuOpen;

  return (
    <>
      <header
        className={`site-header${isTransparent ? ' site-header--transparent' : ''}${mobileMenuOpen ? ' site-header--mobile-open' : ''}${!isTransparent && !mobileMenuOpen ? ' site-header--solid' : ''}${scrolled ? ' scrolled' : ''}`}
        role="banner"
      >
        <div className="container header-inner">

          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="header-logo-btn"
            aria-label="Moxie Infratech — Home"
          >
            <BrandLogo height={38} variant="full" theme={isDarkNav ? 'dark' : 'light'} />
          </button>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta">
            <button
              onClick={onOpenRFQ}
              className="btn-header-enquiry"
            >
              Discuss Your Project
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen
              ? <X style={{ width: '1.5rem', height: '1.5rem' }} />
              : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
            }
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer — rendered outside header to avoid fixed positioning stacking issues */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" role="dialog" aria-label="Mobile navigation">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <button
              onClick={() => handleNavClick('home')}
              className={`mobile-nav-link${currentTab === 'home' ? ' mobile-nav-link--active' : ''}`}
            >
              Overview
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link${currentTab === item.id ? ' mobile-nav-link--active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--line)', marginTop: '1.5rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRFQ();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem 1.5rem' }}
            >
              Discuss Your Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};
