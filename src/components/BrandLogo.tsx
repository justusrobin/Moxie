import React, { useState, useEffect } from 'react';

export interface BrandLogoProps {
  height?: number | string;
  width?: number | string;
  variant?: 'full' | 'emblem' | 'horizontal-compact';
  className?: string;
  theme?: 'dark' | 'light';
  animated?: boolean;
}

/**
 * Moxie Infratech Official Logo
 *
 * Layout (viewBox 0 0 580 108):
 *   [0–104]   Blue circle emblem with transmission tower
 *   [116–580] MOXIE wordmark + INFRATECH PVT LTD
 *
 * The wordmark matches the official logo:
 *   M  — bold blue
 *   O  — thin circle outline with inner zigzag lightning
 *   X  — two overlapping arrows (→←) forming X shape
 *   I  — bold blue
 *   E  — bold blue
 *   "INFRATECH PVT LTD" — grey, wide tracking, below
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  height,
  width,
  className = '',
  theme = 'dark',
  animated = false,
}) => {
  const blue = '#3598DC';
  const greyDark = theme === 'light' ? '#374151' : '#C4CDD6';
  const emblemStroke = '#FFFFFF';

  // Compute dimensions: support both fixed numbers and fluid CSS (e.g. 100%)
  const svgHeight = height !== undefined ? height : (width !== undefined ? undefined : 50);
  const svgWidth = width !== undefined ? width : (typeof height === 'number' ? Math.round(368 * (height / 108)) : undefined);

  // Check reduced motion preference
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const shouldAnimate = animated && !prefersReduced;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 368 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Moxie Infratech Pvt Ltd"
      className={className}
      style={{ display: 'block', flexShrink: 0, maxWidth: '100%', height: height === 'auto' ? 'auto' : undefined }}
    >
      <defs>
        {shouldAnimate && (
          <>
            {/* Stage A: Circle emblem reveal mask (from center 52, 52) */}
            <clipPath id="moxie-intro-emblem-clip" clipPathUnits="userSpaceOnUse">
              <circle cx="52" cy="52" r="0">
                <animate
                  attributeName="r"
                  from="0"
                  to="54"
                  begin="0.10s"
                  dur="0.65s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1"
                  keyTimes="0;1"
                />
              </circle>
            </clipPath>

            {/* Stage B: MOXIE wordmark left-to-right clip mask */}
            <clipPath id="moxie-intro-wordmark-clip" clipPathUnits="userSpaceOnUse">
              <rect x="110" y="0" width="0" height="92">
                <animate
                  attributeName="width"
                  from="0"
                  to="260"
                  begin="0.45s"
                  dur="0.75s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.25 1 0.5 1"
                  keyTimes="0;1"
                />
              </rect>
            </clipPath>

            {/* Stage A: Subtle light sheen across the emblem */}
            <linearGradient id="emblem-sheen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="38%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="62%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </>
        )}
      </defs>

      {/* ══════════════════════════════
          STAGE A: CIRCLE EMBLEM (left)
          ══════════════════════════════ */}
      <g
        className={shouldAnimate ? 'logo-stage-emblem' : undefined}
        clipPath={shouldAnimate ? 'url(#moxie-intro-emblem-clip)' : undefined}
      >
        <circle cx="52" cy="52" r="50" fill={blue} />

        {/* Tower / pylon inside circle — white strokes */}
        <g stroke={emblemStroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Top horns */}
          <path d="M37 32 L27 15" />
          <path d="M67 32 L77 15" />
          {/* Vertical uprights */}
          <path d="M37 32 L37 67" />
          <path d="M67 32 L67 67" />
          {/* Upper V chevron */}
          <path d="M37 32 L52 46 L67 32" />
          {/* Cross-arm spurs */}
          <path d="M37 46 L25 41" />
          <path d="M67 46 L79 41" />
          {/* X diagonals */}
          <path d="M37 52 L67 74" />
          <path d="M67 52 L37 74" />
          {/* Lower V chevron */}
          <path d="M37 67 L52 78 L67 67" />
          {/* Base legs */}
          <path d="M37 74 L29 84 L30 92" />
          <path d="M67 74 L75 84 L74 92" />
        </g>

        {/* Subtle light sweep across emblem */}
        {shouldAnimate && (
          <circle
            cx="52"
            cy="52"
            r="50"
            fill="url(#emblem-sheen-grad)"
            className="logo-emblem-sheen"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </g>

      {/* ══════════════════════════════
          STAGE B: MOXIE WORDMARK
          ══════════════════════════════ */}
      <g
        className={shouldAnimate ? 'logo-stage-wordmark' : undefined}
        clipPath={shouldAnimate ? 'url(#moxie-intro-wordmark-clip)' : undefined}
      >
        {/* M  (x=116) */}
        <path
          d="M116 78 L116 20 L138 58 L160 20 L160 78"
          stroke={blue} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />

        {/* O  — circle with inner lightning zigzag */}
        {/* Outer thin ring */}
        <circle cx="200" cy="49" r="29" stroke={blue} strokeWidth="4.5" fill="none" />
        {/* Inner thin ring (grey, subtle) */}
        <circle cx="200" cy="49" r="20" stroke={greyDark} strokeWidth="1.2" fill="none" opacity="0.55" />
        {/* Lightning bolt / zigzag inside */}
        <path
          d="M204 23 L189 51 L199 51 L196 75 L214 47 L203 47 Z"
          fill={blue} opacity="0.88"
        />

        {/* X  — two diagonals + arrow motif */}
        {/* Back-slash \ */}
        <line x1="238" y1="20" x2="278" y2="78" stroke={blue} strokeWidth="7" strokeLinecap="round" />
        {/* Forward-slash / */}
        <line x1="278" y1="20" x2="238" y2="78" stroke={blue} strokeWidth="7" strokeLinecap="round" />
        {/* Horizontal arrow → overlaid */}
        <line x1="236" y1="49" x2="268" y2="49" stroke={blue} strokeWidth="4" strokeLinecap="round" />
        <path d="M260 41 L272 49 L260 57" stroke={blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* I */}
        <line x1="294" y1="20" x2="294" y2="78" stroke={blue} strokeWidth="7.5" strokeLinecap="round" />

        {/* E */}
        <path
          d="M312 20 L312 78 M312 20 L345 20 M312 49 L340 49 M312 78 L345 78"
          stroke={blue} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      </g>

      {/* ══════════════════════════════
          STAGE C: TAGLINE
          ══════════════════════════════ */}
      <g className={shouldAnimate ? 'logo-stage-tagline' : undefined}>
        <text
          x="116"
          y="104"
          fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
          fontWeight="700"
          fontSize="16.5"
          fill={greyDark}
          letterSpacing="4"
        >INFRATECH PVT LTD</text>
      </g>
    </svg>
  );
};
