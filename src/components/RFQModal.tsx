import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: { category?: string; voltage?: string; modules?: string[]; timelineEst?: string; projectTitle?: string; } | null;
}

export const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Substation Civil Works',
    state: 'Tamil Nadu',
    budgetScope: '₹25 Lakhs – ₹1 Crore',
    scopeDescription: '',
    consent: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (initialData) {
      const timer = setTimeout(() => {
        setForm((prev) => ({
          ...prev,
          category: initialData.category || prev.category,
          scopeDescription: initialData.modules
            ? `Scope:\n- ${initialData.modules.join('\n- ')}\nTimeline: ${initialData.timelineEst || 'TBD'}`
            : initialData.projectTitle
            ? `Enquiry for: ${initialData.projectTitle}`
            : prev.scopeDescription,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.company.trim()) e.company = 'Company required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = '10-digit number required';
    if (!form.consent) e.consent = 'Consent required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const list = JSON.parse(localStorage.getItem('moxie_enquiries') || '[]');
      list.push({ id: `MIPL-RFQ-${Date.now()}`, timestamp: new Date().toISOString(), ...form });
      localStorage.setItem('moxie_enquiries', JSON.stringify(list));
      setSubmitting(false);
      setSuccess(true);
    }, 700);
  };

  const mailHref = () => {
    const s = encodeURIComponent(`Project Enquiry: ${form.category} — ${form.company}`);
    const b = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nCategory: ${form.category}\nState: ${form.state}\nBudget: ${form.budgetScope}\n\n${form.scopeDescription}`);
    return `mailto:moxieinfratech@gmail.com?subject=${s}&body=${b}`;
  };

  const iS = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.8rem 1rem',
    minHeight: '48px',
    background: 'var(--bg-surface)',
    border: `1px solid ${errors[field] ? '#EF4444' : 'var(--border-color)'}`,
    borderRadius: '4px',
    fontSize: '16px',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  const lS: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-secondary)',
    marginBottom: '0.45rem',
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 2.5vw, 1rem)',
        background: 'rgba(11, 16, 21, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-modal-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: 'min(94vh, calc(100dvh - 1rem))',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'clamp(1rem, 3.5vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-surface)',
            flexShrink: 0,
            gap: '0.75rem',
          }}
        >
          <div>
            <h3 id="rfq-modal-title" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Project Engineering Enquiry
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue-accent)', letterSpacing: '0.08em' }}>
              Moxie Infratech Pvt Ltd · Direct Technical Review
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              width: '44px',
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Close modal"
          >
            <X style={{ width: '1.2rem', height: '1.2rem' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(1rem, 4vw, 2rem)', overflowY: 'auto', flex: 1 }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle2 style={{ width: '3rem', height: '3rem', color: '#10B981', margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Enquiry Successfully Logged
              </h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.5rem' }}>
                Thank you, <strong style={{ color: 'var(--text-primary)' }}>{form.name}</strong>. Our engineering team will review your specifications and contact you within 24 hours.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--blue-accent)', marginBottom: '2rem' }}>
                moxieinfratech@gmail.com · +91 8220223232
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={mailHref()} className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.875rem', minHeight: '48px', width: 'min(100%, 280px)' }}>
                  <Mail style={{ width: '0.9rem', height: '0.9rem' }} />
                  <span>Send Direct Email Copy</span>
                </a>
                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.875rem', minHeight: '48px', width: 'min(100%, 280px)' }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div className="form-grid-2">
                <div>
                  <label style={lS}>Name *</label>
                  <input
                    type="text"
                    autoComplete="name"
                    inputMode="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Full Name"
                    style={iS('name')}
                  />
                  {errors.name && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={lS}>Organisation *</label>
                  <input
                    type="text"
                    autoComplete="organization"
                    inputMode="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company / Client Name"
                    style={iS('company')}
                  />
                  {errors.company && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{errors.company}</p>}
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={lS}>Email Address *</label>
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    style={iS('email')}
                  />
                  {errors.email && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={lS}>Phone Number *</label>
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={iS('phone')}
                  />
                  {errors.phone && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{errors.phone}</p>}
                </div>
              </div>

              <div className="form-grid-3">
                <div>
                  <label style={lS}>EPC Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={{ ...iS(''), cursor: 'pointer' }}
                  >
                    <option>Substation Civil Works</option>
                    <option>Electrical Turnkey &amp; Switchyards</option>
                    <option>Turnkey MEP &amp; PHE</option>
                    <option>Fire Protection &amp; Deluge</option>
                    <option>Statutory CEIG Testing</option>
                  </select>
                </div>
                <div>
                  <label style={lS}>State / Region</label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    style={{ ...iS(''), cursor: 'pointer' }}
                  >
                    <option>Tamil Nadu</option>
                    <option>Telangana</option>
                    <option>Andhra Pradesh</option>
                    <option>Andaman &amp; Nicobar</option>
                    <option>Other State</option>
                  </select>
                </div>
                <div>
                  <label style={lS}>Estimated Budget</label>
                  <select
                    value={form.budgetScope}
                    onChange={(e) => setForm({ ...form, budgetScope: e.target.value })}
                    style={{ ...iS(''), cursor: 'pointer' }}
                  >
                    <option>Under ₹25 Lakhs</option>
                    <option>₹25 Lakhs – ₹1 Crore</option>
                    <option>₹1 Crore – ₹3 Crores</option>
                    <option>Above ₹3 Crores</option>
                    <option>Annual Rate Contract (ARC)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={lS}>Project Scope &amp; Specifications</label>
                <textarea
                  rows={3}
                  value={form.scopeDescription}
                  onChange={(e) => setForm({ ...form, scopeDescription: e.target.value })}
                  placeholder="Project location, voltage class (11kV to 765kV), tender reference, timeline…"
                  style={{ ...iS(''), resize: 'vertical', minHeight: '90px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.25rem 0' }}>
                <input
                  type="checkbox"
                  id="rfq-consent"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  style={{ marginTop: '0.25rem', accentColor: 'var(--blue-primary)', cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="rfq-consent" style={{ fontSize: '0.825rem', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1.55 }}>
                  I consent to sharing these technical requirements with Moxie Infratech Pvt Ltd for EPC evaluation and quotation.
                </label>
              </div>
              {errors.consent && <p style={{ fontSize: '0.75rem', color: '#EF4444' }}>{errors.consent}</p>}

              <div className="form-submit-row">
                <button type="button" onClick={onClose} className="btn-secondary" style={{ fontSize: '0.875rem', minHeight: '48px' }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ fontSize: '0.875rem', minHeight: '48px' }}>
                  {submitting ? (
                    <>
                      <span style={{ width: '0.875rem', height: '0.875rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                      <span>Transmitting…</span>
                    </>
                  ) : (
                    <>
                      <Send style={{ width: '0.875rem', height: '0.875rem' }} />
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
