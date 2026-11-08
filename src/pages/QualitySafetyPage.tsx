import React from 'react';

// QualitySafetyPage — not currently used in navigation
// Kept as a placeholder for future use
export const QualitySafetyPage: React.FC = () => (
  <div style={{ background: 'var(--bg-white)', paddingTop: '9rem', paddingBottom: '6rem' }}>
    <div className="container">
      <span className="eyebrow">Quality & Safety</span>
      <h1 style={{ color: 'var(--ink)', marginBottom: '1.5rem' }}>Quality Governance & Safety.</h1>
      <p style={{ color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '560px' }}>
        Moxie Infratech adheres to IS / IEC standards across all civil and electrical execution scopes. All statutory testing and CEIG approvals are managed by our in-house technical team.
      </p>
    </div>
  </div>
);
