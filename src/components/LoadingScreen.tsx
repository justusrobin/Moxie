import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC = () => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs  = prefersReduced ? 300  : 1800;
    const outMs   = prefersReduced ? 200  : 700;

    // Phase: in → hold
    const t1 = setTimeout(() => setPhase('hold'), 50);
    // Phase: hold → out
    const t2 = setTimeout(() => setPhase('out'), holdMs);
    // Phase: out → done (unmount)
    const t3 = setTimeout(() => setPhase('done'), holdMs + outMs + 50);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  const isOut = phase === 'out';
  const isIn  = phase === 'in';

  return (
    <>
      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: translateY(28px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes splashBarGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes splashTagIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes splashGlowPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.08); }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 40%, #0d1e38 0%, #060c18 60%, #020609 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.25rem',
        /* Fade in immediately, fade out on exit */
        opacity: isOut ? 0 : 1,
        transform: isOut ? 'scale(1.035)' : 'scale(1)',
        transition: isOut
          ? 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none',
        pointerEvents: isOut ? 'none' : 'all',
      }}>

        {/* Soft radial blue glow behind logo */}
        <div style={{
          position: 'absolute',
          width: '520px',
          height: '320px',
          background: 'radial-gradient(ellipse, rgba(26,115,200,0.22) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          animation: isIn ? 'none' : 'splashGlowPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Logo — emblem + wordmark */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem',
          opacity: isIn ? 0 : 1,
          animation: isIn ? 'none' : 'splashLogoIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Emblem */}
          <img
            src="/images/moxie_emblem.png"
            alt="Moxie Infratech"
            style={{
              height: '120px',
              width: '120px',
              objectFit: 'contain',
              borderRadius: '50%',
              filter: 'drop-shadow(0 0 28px rgba(26,115,200,0.6)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
              flexShrink: 0,
            }}
          />
          {/* Full wordmark */}
          <img
            src="/images/moxie_logo_full.png"
            alt="Moxie Infratech Pvt Ltd"
            style={{
              height: '96px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '6px',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
              flexShrink: 0,
            }}
          />
        </div>

        {/* Progress bar */}
        <div style={{
          width: '240px',
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
          opacity: isIn ? 0 : 1,
          animation: isIn ? 'none' : 'splashTagIn 0.4s ease 0.3s both',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #1A73C8 0%, #38BDF8 50%, #1A73C8 100%)',
            backgroundSize: '200% 100%',
            borderRadius: '2px',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
            animation: isIn ? 'none' : 'splashBarGrow 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
          }} />
        </div>

        {/* Tagline */}
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
          opacity: isIn ? 0 : 1,
          animation: isIn ? 'none' : 'splashTagIn 0.5s ease 0.9s both',
          position: 'relative',
          zIndex: 1,
        }}>
          Civil &amp; Electrical EPC
        </span>

      </div>
    </>
  );
};
