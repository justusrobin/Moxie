import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: { category?: string; voltage?: string; modules?: string[]; timelineEst?: string; projectTitle?: string; } | null;
}

export const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, initialData }) => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', category: 'Substation Civil Works', state: 'Tamil Nadu', budgetScope: '₹25 Lakhs – ₹1 Crore', scopeDescription: '', consent: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (initialData) {
      setForm(prev => ({
        ...prev,
        category: initialData.category || prev.category,
        scopeDescription: initialData.modules
          ? `Scope:\n- ${initialData.modules.join('\n- ')}\nTimeline: ${initialData.timelineEst || 'TBD'}`
          : initialData.projectTitle ? `Enquiry for: ${initialData.projectTitle}` : prev.scopeDescription,
      }));
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
      setSubmitting(false); setSuccess(true);
    }, 800);
  };

  const mailHref = () => {
    const s = encodeURIComponent(`Project Enquiry: ${form.category} — ${form.company}`);
    const b = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nCategory: ${form.category}\nState: ${form.state}\nBudget: ${form.budgetScope}\n\n${form.scopeDescription}`);
    return `mailto:moxieinfratech@gmail.com?subject=${s}&body=${b}`;
  };

  /* Light-theme input style */
  const iS = (f: string): React.CSSProperties => ({
    width: '100%', padding: '0.7rem 0.875rem',
    background: errors[f] ? '#FFF5F5' : 'var(--bg-off)',
    border: `1px solid ${errors[f] ? '#FCA5A5' : 'var(--line)'}`,
    borderRadius: '6px', fontSize: '0.875rem', color: 'var(--ink)',
    outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
  });
  const lS: React.CSSProperties = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--ink-2)', marginBottom: '0.4rem',
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}>

      <div style={{ width: '100%', maxWidth: '700px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: '92vh' }}>

        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-off)', flexShrink: 0 }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.15rem' }}>Project Enquiry</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-3)', letterSpacing: '0.08em' }}>Moxie Infratech · EPC Coordination</p>
          </div>
          <button onClick={onClose}
            style={{ background: 'none', border: '1px solid var(--line)', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: 'var(--ink-3)', display: 'flex', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-light)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-3)'; }}>
            <X style={{ width: '1.1rem', height: '1.1rem' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <CheckCircle2 style={{ width: '3rem', height: '3rem', color: 'var(--accent)', margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>Enquiry Submitted</h4>
              <p style={{ color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: '0.5rem' }}>
                Thank you, <strong style={{ color: 'var(--ink)' }}>{form.name}</strong>. We'll review your scope and be in touch shortly.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-4)', marginBottom: '2rem' }}>
                moxieinfratech@gmail.com · +91 8220223232
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={mailHref()} className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.82rem' }}>
                  <Mail style={{ width: '0.9rem', height: '0.9rem' }} /><span>Send Email Copy</span>
                </a>
                <button onClick={() => { setSuccess(false); onClose(); }} className="btn-secondary" style={{ fontSize: '0.82rem' }}>Close</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }} className="modal-row">
                <div><label style={lS}>Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={iS('name')} />{errors.name && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.2rem' }}>{errors.name}</p>}</div>
                <div><label style={lS}>Company *</label><input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Organisation" style={iS('company')} />{errors.company && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.2rem' }}>{errors.company}</p>}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }} className="modal-row">
                <div><label style={lS}>Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" style={iS('email')} />{errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.2rem' }}>{errors.email}</p>}</div>
                <div><label style={lS}>Phone *</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" style={iS('phone')} />{errors.phone && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.2rem' }}>{errors.phone}</p>}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }} className="modal-row-3">
                <div><label style={lS}>Category</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ ...iS(''), cursor: 'pointer' }}><option>Substation Civil Works</option><option>Electrical Turnkey</option><option>MEP & PHE</option><option>Fire Protection</option><option>CEIG Testing</option></select></div>
                <div><label style={lS}>State</label><select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} style={{ ...iS(''), cursor: 'pointer' }}><option>Tamil Nadu</option><option>Telangana</option><option>Andhra Pradesh</option><option>Andaman & Nicobar</option><option>Other</option></select></div>
                <div><label style={lS}>Budget</label><select value={form.budgetScope} onChange={e => setForm({ ...form, budgetScope: e.target.value })} style={{ ...iS(''), cursor: 'pointer' }}><option>Under ₹25 Lakhs</option><option>₹25 Lakhs – ₹1 Crore</option><option>₹1 Crore – ₹3 Crores</option><option>Above ₹3 Crores</option><option>Annual Rate Contract</option></select></div>
              </div>
              <div>
                <label style={lS}>Project Details</label>
                <textarea rows={3} value={form.scopeDescription} onChange={e => setForm({ ...form, scopeDescription: e.target.value })} placeholder="Site location, voltage level, scope, timeline…" style={{ ...iS(''), resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <input type="checkbox" id="rfq-consent" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} style={{ marginTop: '0.2rem', accentColor: 'var(--accent)', cursor: 'pointer' }} />
                <label htmlFor="rfq-consent" style={{ fontSize: '0.8rem', color: 'var(--ink-3)', cursor: 'pointer', lineHeight: 1.55 }}>
                  I agree to share these details with Moxie Infratech for project evaluation.
                </label>
              </div>
              {errors.consent && <p style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.consent}</p>}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--line)', display: 'flex', gap: '0.875rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" onClick={onClose} className="btn-secondary" style={{ fontSize: '0.82rem' }}>Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ fontSize: '0.82rem' }}>
                  {submitting
                    ? <><span style={{ width: '0.875rem', height: '0.875rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} /><span>Sending…</span></>
                    : <><Send style={{ width: '0.875rem', height: '0.875rem' }} /><span>Submit Enquiry</span></>
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
