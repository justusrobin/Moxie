import React from 'react';

interface BrandLogoProps {
  height?: number;
  variant?: 'full' | 'emblem' | 'horizontal-compact';
  className?: string;
  theme?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  height = 48,
  variant = 'full',
  className = '',
}) => {
  if (variant === 'emblem') {
    return (
      <img
        src="/images/moxie_emblem.png"
        alt="Moxie Infratech"
        style={{ height, width: height, display: 'block', objectFit: 'contain', flexShrink: 0 }}
        className={className}
      />
    );
  }

  // Full: emblem circle + full wordmark PNG side by side
  const wordmarkWidth = Math.round(height * 3.5);

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
    >
      {/* Official blue circle emblem */}
      <img
        src="/images/moxie_emblem.png"
        alt=""
        aria-hidden="true"
        style={{ height, width: height, display: 'block', objectFit: 'contain', flexShrink: 0 }}
      />

      {/* Full wordmark image — exact file, unchanged */}
      <img
        src="/images/moxie_logo_full.png"
        alt="Moxie Infratech Pvt Ltd"
        style={{
          height,
          width: wordmarkWidth,
          display: 'block',
          objectFit: 'contain',
          objectPosition: 'left center',
          flexShrink: 0,
          borderRadius: '4px',
        }}
      />
    </div>
  );
};
