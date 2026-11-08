import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Substation Civil Works',
    state: 'Tamil Nadu',
    message: '',
    consent: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.company.trim()) e.company = 'Company required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = '10-digit phone number required';
    if (!form.message.trim()) e.message = 'Project scope description required';
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
      list.push({ id: `MIPL-ENQ-${Date.now()}`, timestamp: new Date().toISOString(), ...form });
      localStorage.setItem('moxie_enquiries', JSON.stringify(list));
      setSubmitting(false);
      setSuccess(true);
    }, 600);
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
    <div style={{ background: 'var(--bg-main)' }}>

      {/* HEADER */}
      <section
        style={{
          background: 'var(--bg-surface)',
          paddingTop: 'clamp(6rem, 14vw, 8.5rem)',
          paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <span className="eyebrow">Direct Contact</span>
          <h1 style={{ maxWidth: '780px', marginBottom: '1.25rem' }}>
            Get in Touch with Engineering Leadership.
          </h1>
          <p className="text-lead" style={{ maxWidth: '580px' }}>
            Registered Corporate Office in Chennai and Regional Engineering Office in Coimbatore. Direct coordination for substation civil tenders, electrical bids, and turnkey EPC contracts.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: 'var(--bg-main)', padding: 'clamp(3rem, 7vw, 6rem) 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 5vw, 3.5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left: Office Locations & Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div className="photo-frame-editorial" style={{ height: 'clamp(180px, 45vw, 220px)' }}>
                <img src="/images/company_intro.jpg" alt="Moxie Infratech Corporate Office" loading="lazy" />
              </div>

              {[
                {
                  city: 'Chennai',
                  tag: 'Corporate Headquarters',
                  address: '3/485, Mogappair West, Chennai — 600037, Tamil Nadu',
                  maps: 'https://www.google.com/maps/search/?api=1&query=3/485+Mogappair+West+Chennai+600037',
                  phone: '+91 8220223232',
                  email: 'moxieinfratech@gmail.com',
                },
                {
                  city: 'Coimbatore',
                  tag: 'Regional Engineering Office',
                  address: '11/91, Kamatchipuram, Ondipudur, Coimbatore — 641016, Tamil Nadu',
                  maps: 'https://www.google.com/maps/search/?api=1&query=11/91+Kamatchipuram+Ondipudur+Coimbatore+641016',
                  phone: '+91 8220223232',
                  email: 'moxieinfratech@gmail.com',
                },
              ].map((office) => (
                <div key={office.city} className="photo-card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{office.city} Office</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--blue-accent)', background: 'var(--blue-subtle)', padding: '0.2rem 0.55rem', borderRadius: '4px', letterSpacing: '0.08em' }}>
                      {office.tag}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <MapPin style={{ width: '1rem', height: '1rem', color: 'var(--blue-accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{office.address}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, '')}`}
                      style={{
                        display: 'inline-flex',
                        gap: '0.6rem',
                        alignItems: 'center',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        minHeight: '44px',
                      }}
                    >
                      <Phone style={{ width: '0.9rem', height: '0.9rem', color: 'var(--blue-accent)', flexShrink: 0 }} />
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      style={{
                        display: 'inline-flex',
                        gap: '0.6rem',
                        alignItems: 'center',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        minHeight: '44px',
                      }}
                    >
                      <Mail style={{ width: '0.9rem', height: '0.9rem', color: 'var(--blue-accent)', flexShrink: 0 }} />
                      {office.email}
                    </a>
                    <a
                      href={office.maps}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        gap: '0.4rem',
                        alignItems: 'center',
                        color: 'var(--blue-accent)',
                        fontSize: '0.825rem',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono)',
                        minHeight: '44px',
                      }}
                    >
                      Open Location in Google Maps <ExternalLink style={{ width: '0.75rem', height: '0.75rem', flexShrink: 0 }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Project Enquiry Form */}
            <div className="photo-card" style={{ padding: 'clamp(1.5rem, 4.5vw, 2.5rem)' }}>
              <span className="eyebrow">Project Desk</span>
              <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', marginBottom: '0.5rem' }}>Submit Project Enquiry</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                All technical enquiries are reviewed directly by our Managing Director and senior department managers.
              </p>

              {success ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 style={{ width: '3.5rem', height: '3.5rem', color: '#10B981', margin: '0 auto 1.25rem' }} />
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Enquiry Logged Successfully</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 2rem' }}>
                    Thank you, <strong style={{ color: 'var(--text-primary)' }}>{form.name}</strong>. Our engineering team has received your project parameters and will reach out promptly.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn-secondary" style={{ width: '100%', maxWidth: '320px' }}>
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-grid-2">
                    <div>
                      <label style={lS}>Full Name *</label>
                      <input
                        type="text"
                        autoComplete="name"
                        inputMode="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your Name"
                        style={iS('name')}
                      />
                      {errors.name && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{errors.name}</p>}
                    </div>

                    <div>
                      <label style={lS}>Company / Client *</label>
                      <input
                        type="text"
                        autoComplete="organization"
                        inputMode="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Organisation Name"
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

                  <div className="form-grid-2">
                    <div>
                      <label style={lS}>Service Division</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        style={{ ...iS(''), cursor: 'pointer' }}
                      >
                        <option>Substation Civil Works (11kV to 765kV)</option>
                        <option>Electrical Turnkey &amp; Switchyards</option>
                        <option>Turnkey MEP &amp; PHE</option>
                        <option>Fire Protection &amp; Deluge Systems</option>
                        <option>Statutory CEIG Testing &amp; Clearances</option>
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
                  </div>

                  <div>
                    <label style={lS}>Scope of Work &amp; Technical Specifications *</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please specify site location, voltage ratings, equipment types, tender deadlines, and project milestones…"
                      style={{ ...iS('message'), resize: 'vertical', minHeight: '110px' }}
                    />
                    {errors.message && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{errors.message}</p>}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.25rem 0' }}>
                    <input
                      type="checkbox"
                      id="contact-consent"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      style={{ marginTop: '0.25rem', accentColor: 'var(--blue-primary)', cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <label htmlFor="contact-consent" style={{ fontSize: '0.825rem', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1.55 }}>
                      I agree to allow Moxie Infratech Pvt Ltd to process these details for the purpose of engineering evaluation and tender quotation.
                    </label>
                  </div>
                  {errors.consent && <p style={{ fontSize: '0.75rem', color: '#EF4444' }}>{errors.consent}</p>}

                  <div className="form-submit-row">
                    <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '0.875rem 2rem', minHeight: '50px' }}>
                      {submitting ? (
                        <>
                          <span style={{ width: '0.875rem', height: '0.875rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                          <span>Sending Enquiry…</span>
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
      </section>

    </div>
  );
};
