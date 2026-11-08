import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';

export const LoadingScreen: React.FC = () => {
  // Always display loading screen on page load/refresh
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // Attach intro-active class to body for coordinated hero content entrance
    document.body.classList.add('intro-active');

    // Preload homepage hero photo to guarantee zero flash during handoff
    const heroImg = new Image();
    heroImg.src = '/images/hero_substation_natural.jpg';

    // Allow dev hold mode (e.g. ?intro=hold) to freeze screen for inspection
    const isHold = typeof window !== 'undefined' && window.location.search.includes('intro=hold');
    if (isHold) {
      return () => {
        document.body.classList.remove('intro-active');
      };
    }

    // Respect reduced motion preference
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const holdDuration = prefersReduced ? 350 : 1750;
    const fadeDuration = prefersReduced ? 250 : 650;

    // Trigger smooth fade transition
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, holdDuration);

    // Unmount once dissolve transition finishes
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.classList.remove('intro-active');
    }, holdDuration + fadeDuration);

    // Helper on window for easy developer or inspection replay
    (window as any).__replayMoxieIntro = () => {
      window.location.reload();
    };

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.classList.remove('intro-active');
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`brand-intro${fading ? ' brand-intro--fade' : ''}`}
      aria-label="Moxie Infratech Introduction"
      role="status"
    >
      {/* ── Soft Imperceptible Blue Ambient Glow Behind Logo ── */}
      <div className="brand-intro-radial-glow" aria-hidden="true" />

      {/* ── Centerpiece Composition ── */}
      <div className="brand-intro-centerpiece">
        {/* Prominent Logo Presentation */}
        <div className="brand-intro-logo-wrap">
          <BrandLogo width="100%" height="auto" animated={false} theme="light" />
        </div>

        {/* Refined Typography Line */}
        <div className="brand-intro-tagline">
          ENGINEERING INFRASTRUCTURE. BUILDING PROGRESS.
        </div>

        {/* Understated Blue Progress Indicator */}
        <div className="brand-intro-progress-track" aria-hidden="true">
          <div className="brand-intro-progress-bar" />
          <div className="brand-intro-progress-gleam" />
        </div>
      </div>
    </div>
  );
};
