import React from 'react';

// QualitySafetyPage — standalone reference page
export const QualitySafetyPage: React.FC = () => (
  <div style={{ background: 'var(--bg-main)', paddingTop: 'clamp(6rem, 14vw, 9rem)', paddingBottom: 'clamp(3rem, 7vw, 6rem)' }}>
    <div className="container">
      <span className="eyebrow">Quality &amp; Safety</span>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Quality Governance &amp; Safety.</h1>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '560px' }}>
        Moxie Infratech adheres to IS / IEC standards across all civil and electrical execution scopes. All statutory testing and CEIG approvals are managed by our in-house technical team.
      </p>
    </div>
  </div>
);
