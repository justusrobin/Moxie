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

    // Allow dev/inspection hold mode (e.g. ?intro=hold) to freeze screen for examination
    const isHold = typeof window !== 'undefined' && window.location.search.includes('intro=hold');
    if (isHold) {
      return () => {
        document.body.classList.remove('intro-active');
      };
    }

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdDuration = prefersReduced ? 400 : 2050;
    const fadeDuration = prefersReduced ? 350 : 850;

    // Trigger smooth fade after logo choreographed reveal settles
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
      {/* ── BACKGROUND LAYER 1: Architectural Engineering Datum Lines ── */}
      <div className="brand-intro-datum-lines" aria-hidden="true">
        <div className="brand-intro-datum-marker brand-intro-datum-marker--top" />
        <div className="brand-intro-datum-marker brand-intro-datum-marker--bottom" />
      </div>

      {/* ── BACKGROUND LAYER 2: Soft Oversized Radial Blue Glow ── */}
      <div className="brand-intro-radial-glow" aria-hidden="true" />

      {/* ── BACKGROUND LAYER 3: Slow Subtle Light Sweep ── */}
      <div className="brand-intro-light-sweep" aria-hidden="true" />

      {/* ── BACKGROUND LAYER 4: Perimeter Vignette ── */}
      <div className="brand-intro-vignette" aria-hidden="true" />

      {/* ── CENTERPIECE: Substantial Logo Reveal Composition ── */}
      <div className="brand-intro-centerpiece">
        {/* Large Logo Container (desktop width ~520-640px, responsive on mobile) */}
        <div className="brand-intro-logo-wrap">
          <BrandLogo width="100%" height="auto" animated={true} theme="dark" />
        </div>

        {/* Stage D: Thin Brand Accent Line Track with Traveling Gleam */}
        <div className="brand-intro-accent-track" aria-hidden="true">
          <div className="brand-intro-accent-base" />
          <div className="brand-intro-accent-line" />
          <div className="brand-intro-accent-gleam" />
        </div>
      </div>
    </div>
  );
};


