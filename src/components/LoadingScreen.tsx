import React, { useState, useEffect } from 'react';

/**
 * Lightweight Loading Screen Transition
 * Provides a smooth zero-lag entrance without blocking user interaction.
 */
export const LoadingScreen: React.FC = () => {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: '#111820',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease',
      }}
      aria-hidden="true"
    />
  );
};
