import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', category: 'Substation Civil Works', state: 'Tamil Nadu', message: '', consent: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.company.trim()) e.company = 'Company required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = '10-digit number required';
    if (!form.message.trim()) e.message = 'Project description required';
    if (!form.consent) e.consent = 'Consent required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault(); if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const list = JSON.parse(localStorage.getItem('moxie_enquiries') || '[]');
      list.push({ id: `MIPL-${Date.now()}`, ts: new Date().toISOString(), ...form });
      localStorage.setItem('moxie_enquiries', JSON.stringify(list));
      setSubmitting(false); setSuccess(true);
    }, 600);
  };

  const iS = (f: string): React.CSSProperties => ({
    width: '100%', padding: '0.75rem 1rem',
    background: errors[f] ? '#FFF5F5' : 'var(--bg-white)',
    border: `1px solid ${errors[f] ? '#FCA5A5' : 'var(--line)'}`,
    borderRadius: '6px', fontSize: '0.9rem', color: 'var(--ink)',
    outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
  });
  const lS: React.CSSProperties = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--ink-2)', marginBottom: '0.5rem', letterSpacing: '-0.01em',
  };

  return (
    <div style={{ background: 'var(--bg-white)' }}>

      {/* HEADER */}
      <section style={{ background: 'var(--bg-light)', paddingTop: '9rem', paddingBottom: '5rem', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 style={{ color: 'var(--ink)', maxWidth: '640px', marginBottom: '1.25rem' }}>Get in Touch.</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '520px' }}>
            Offices in Chennai and Coimbatore. Direct coordination for substation civil works, electrical tenders, and EPC bids.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section style={{ background: 'var(--bg-white)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }} className="contact-grid">

            {/* Offices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="photo-frame" style={{ height: '220px' }}>
                <img src="/images/company_intro.jpg" alt="Moxie Infratech" />
              </div>
              {[
                { city: 'Chennai', tag: 'HQ', address: '3/485, Mogappair West, Chennai — 600037, Tamil Nadu', maps: 'https://www.google.com/maps/search/?api=1&query=3/485+Mogappair+West+Chennai+600037' },
                { city: 'Coimbatore', tag: 'Branch', address: '11/91, Kamatchipuram, Ondipudur, Coimbatore — 641016, Tamil Nadu', maps: 'https://www.google.com/maps/search/?api=1&query=11/91+Kamatchipuram+Ondipudur+Coimbatore+641016' },
              ].map(o => (
                <div key={o.city} className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--ink)' }}>{o.city} Office</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-light)', padding: '0.15rem 0.5rem', borderRadius: '4px', letterSpacing: '0.1em' }}>{o.tag}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <MapPin style={{ width: '0.875rem', height: '0.875rem', color: 'var(--ink-4)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{o.address}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.875rem', borderTop: '1px solid var(--line)' }}>
                    <a href="tel:+918220223232" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--ink)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      <Phone style={{ width: '0.8rem', height: '0.8rem', color: 'var(--accent)' }} />+91 8220223232
                    </a>
                    <a href="mailto:moxieinfratech@gmail.com" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--ink-3)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                      <Mail style={{ width: '0.8rem', height: '0.8rem', color: 'var(--ink-4)' }} />moxieinfratech@gmail.com
                    </a>
                    <a href={o.maps} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', gap: '0.375rem', alignItems: 'center', color: 'var(--accent)', fontSize: '0.78rem', textDecoration: 'none', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                      Open in Maps <ExternalLink style={{ width: '0.72rem', height: '0.72rem' }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <h2 style={{ color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Project Enquiry</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-3)', marginBottom: '2rem', lineHeight: 1.65 }}>We'll respond within 24 hours.</p>

              {success ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <CheckCircle2 style={{ width: '3rem', height: '3rem', color: 'var(--accent)', margin: '0 auto 1rem' }} />
                  <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>Enquiry Received</h3>
                  <p style={{ color: 'var(--ink-3)', marginBottom: '1.5rem' }}>We'll review your scope and be in touch shortly.</p>
                  <button onClick={() => { setSuccess(false); setForm({ name: '', company: '', email: '', phone: '', category: 'Substation Civil Works', state: 'Tamil Nadu', message: '', consent: true }); }} className="btn-secondary">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.25rem' }} className="form-row">
                    <div><label style={lS}>Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={iS('name')} />{errors.name && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.name}</p>}</div>
                    <div><label style={lS}>Company *</label><input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Organisation" style={iS('company')} />{errors.company && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.company}</p>}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.25rem' }} className="form-row">
                    <div><label style={lS}>Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" style={iS('email')} />{errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.email}</p>}</div>
                    <div><label style={lS}>Phone *</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" style={iS('phone')} />{errors.phone && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.phone}</p>}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.25rem' }} className="form-row">
                    <div><label style={lS}>Scope</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ ...iS(''), cursor: 'pointer' }}><option>Substation Civil Works</option><option>Electrical Turnkey</option><option>MEP & PHE</option><option>Fire Protection</option><option>CEIG Testing</option></select></div>
                    <div><label style={lS}>State</label><select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} style={{ ...iS(''), cursor: 'pointer' }}><option>Tamil Nadu</option><option>Telangana</option><option>Andhra Pradesh</option><option>Andaman & Nicobar</option><option>Other</option></select></div>
                  </div>
                  <div><label style={lS}>Project Description *</label><textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Site location, voltage level, scope, timeline…" style={{ ...iS('message'), resize: 'vertical' }} />{errors.message && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.message}</p>}</div>
                  <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <input type="checkbox" id="consent" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} style={{ marginTop: '0.2rem', accentColor: 'var(--accent)', cursor: 'pointer' }} />
                    <label htmlFor="consent" style={{ fontSize: '0.82rem', color: 'var(--ink-3)', cursor: 'pointer', lineHeight: 1.55 }}>I authorise Moxie Infratech to contact me about this enquiry.</label>
                  </div>
                  {errors.consent && <p style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.consent}</p>}
                  <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                    {submitting ? <><span style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /><span>Sending…</span></> : <><Send style={{ width: '0.9rem', height: '0.9rem' }} /><span>Submit Enquiry</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
