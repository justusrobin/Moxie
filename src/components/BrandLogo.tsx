import React from 'react';

interface BrandLogoProps {
  height?: number;
  variant?: 'full' | 'emblem';
  className?: string;
  style?: React.CSSProperties;
  theme?: 'dark' | 'light';
}

/**
 * Official Moxie Infratech Corporate Logo
 *
 * NOTE: The original `moxie_logo_full.png` already contains the blue circular emblem
 * and the company wordmark lockup. It is never paired with a separate emblem beside it.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  height = 42,
  variant = 'full',
  className = '',
  style = {},
}) => {
  if (variant === 'emblem') {
    return (
      <img
        src="/images/moxie_emblem.png"
        alt="Moxie Infratech Corporate Emblem"
        width={height}
        height={height}
        style={{
          height,
          width: height,
          display: 'block',
          objectFit: 'contain',
          flexShrink: 0,
          borderRadius: '50%',
          ...style,
        }}
        className={className}
      />
    );
  }

  // Full lockup: Single official original asset with preserved 2048:768 aspect ratio
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        lineHeight: 1,
        ...style,
      }}
    >
      <img
        src="/images/moxie_logo_full.png"
        alt="Moxie Infratech Pvt Ltd"
        height={height}
        style={{
          height,
          width: 'auto',
          aspectRatio: '2048 / 768',
          display: 'block',
          objectFit: 'contain',
          borderRadius: '4px',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
        }}
      />
    </div>
  );
};
