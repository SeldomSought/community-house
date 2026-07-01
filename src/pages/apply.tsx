import React, { useState, FormEvent } from 'react';
import Layout from '@theme/Layout';

const FORMSPREE_FORM_ID = 'mzddgwra';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  age: string;
  phone: string;
  social: string;
  'room-interest': string;
  'move-in': string;
  intention: string;
  'why-coliving': string;
  hobbies: string;
  'shared-space': string;
  'cleaning-style': string;
  conflict: string;
  'show-up': string;
  contribution: string;
  pets: string;
  'work-situation': string;
  'anything-else': string;
}

const emptyForm: FormData = {
  name: '',
  age: '',
  phone: '',
  social: '',
  'room-interest': '',
  'move-in': '',
  intention: '',
  'why-coliving': '',
  hobbies: '',
  'shared-space': '',
  'cleaning-style': '',
  conflict: '',
  'show-up': '',
  contribution: '',
  pets: '',
  'work-situation': '',
  'anything-else': '',
};

export default function ApplyPage(): JSX.Element {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus('success');
        setFormData(emptyForm);
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    background: 'var(--ifm-background-color)',
    color: 'var(--color-text)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    lineHeight: '1.4',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
  };

  const dividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid rgba(128, 128, 128, 0.12)',
    margin: '0',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '1.25rem',
  };

  const disabled = status === 'submitting';

  function Field({
    label,
    required,
    hint,
    children,
  }: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
  }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: 'var(--color-text-muted)', marginLeft: '0.25rem' }}>*</span>}
        </label>
        {hint && (
          <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            {hint}
          </p>
        )}
        {children}
      </div>
    );
  }

  function RadioGroup({ name, options }: { name: string; options: string[] }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.1rem' }}>
        {options.map((opt) => (
          <label
            key={opt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontWeight: 'normal',
              fontSize: '0.975rem',
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={formData[name as keyof FormData] === opt}
              onChange={handleChange}
              required={!formData[name as keyof FormData]}
              disabled={disabled}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  if (status === 'success') {
    return (
      <Layout title="Application Submitted" description="Thank you for your application.">
        <main className="container-narrow" style={{ padding: '4rem 1.5rem' }}>
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'var(--ifm-background-surface-color)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.5rem',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="section-title" style={{ marginBottom: '1rem' }}>
              Application Received!
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Thank you for taking the time to share yourself with us. We read every
              answer and will be in touch within 24–48 hours.
            </p>
            <a href="/" className="btn btn-primary">
              Return Home
            </a>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Apply" description="Apply to join our coliving community.">
      <main className="container-narrow" style={{ padding: '4rem 1.5rem' }}>
        <div className="section-header">
          <h1 className="section-title">Fellowship Intake Form</h1>
          <p className="section-subtitle">
            Take your time with this — we read every answer. Honesty and
            self-awareness go a long way here.
          </p>
        </div>

        <div
          style={{
            maxWidth: '680px',
            margin: '3rem auto',
            padding: '2.5rem',
            background: 'var(--ifm-background-surface-color)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(128, 128, 128, 0.1)',
          }}
        >
          {status === 'error' && (
            <div
              style={{
                padding: '1rem',
                marginBottom: '1.5rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#dc2626',
              }}
            >
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >

            {/* ── About you ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2rem' }}>
              <p style={sectionLabelStyle}>About you</p>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
                <Field label="Name" required>
                  <input type="text" name="name" required placeholder="Your full name" value={formData.name} onChange={handleChange} disabled={disabled} style={inputStyle} />
                </Field>
                <Field label="Age" required>
                  <input type="number" name="age" required placeholder="27" value={formData.age} onChange={handleChange} disabled={disabled} style={inputStyle} min="18" max="99" />
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <Field label="Phone" required>
                  <input type="tel" name="phone" required placeholder="(512) 000-0000" value={formData.phone} onChange={handleChange} disabled={disabled} style={inputStyle} />
                </Field>
                <Field label="Instagram or other social">
                  <input type="text" name="social" placeholder="@handle" value={formData.social} onChange={handleChange} disabled={disabled} style={inputStyle} />
                </Field>
              </div>

              <Field label="Which house / room are you interested in?" required>
                <input type="text" name="room-interest" required placeholder="e.g. private room with en-suite" value={formData['room-interest']} onChange={handleChange} disabled={disabled} style={inputStyle} />
              </Field>

              <Field label="Ideal move-in date" required>
                <input type="date" name="move-in" required value={formData['move-in']} onChange={handleChange} disabled={disabled} style={inputStyle} />
              </Field>
            </div>

            <hr style={dividerStyle} />

            {/* ── Mindset & lifestyle ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 0' }}>
              <p style={sectionLabelStyle}>Mindset &amp; lifestyle</p>

              <Field label="What does 'living with intention' mean to you?" required>
                <textarea name="intention" required rows={4} value={formData.intention} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>

              <Field label="Why are you specifically looking for a coliving experience rather than a normal apartment?" required>
                <textarea name="why-coliving" required rows={4} value={formData['why-coliving']} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>

              <Field label="What are 3 activities and/or hobbies you really enjoy and why?" required>
                <textarea name="hobbies" required rows={5} placeholder={'1. \n2. \n3. '} value={formData.hobbies} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>
            </div>

            <hr style={dividerStyle} />

            {/* ── Living together ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 0' }}>
              <p style={sectionLabelStyle}>Living together</p>

              <Field label="What's your relationship to shared space and mess? Be honest." required>
                <textarea name="shared-space" required rows={4} value={formData['shared-space']} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>

              <Field
                label="Practically, how do you keep up with cleaning?"
                required
                hint="Are you a clean-as-you-go person, a scheduled-chores person, a hire-it-out person, or 'I'll be honest, I struggle with it'?"
              >
                <RadioGroup
                  name="cleaning-style"
                  options={[
                    'Clean-as-you-go',
                    'Scheduled chores',
                    'Hire it out',
                    "I'll be honest, I struggle with it",
                  ]}
                />
              </Field>

              <Field label="What's your approach to dealing with conflict?" required>
                <textarea name="conflict" required rows={4} value={formData.conflict} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>

              <Field
                label="How do you like to show up in a shared home?"
                required
                hint="Hosting, cooking, organizing, quietly contributing, something else?"
              >
                <textarea name="show-up" required rows={3} value={formData['show-up']} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>

              <Field label="What would you bring to the house and the community here?" required hint="Could be a skill, an energy, something you love to host or organize. We're especially looking for people who actively make the community better by being part of it.">
                <textarea name="contribution" required rows={5} value={formData.contribution} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>
            </div>

            <hr style={dividerStyle} />

            {/* ── Logistics ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 0' }}>
              <p style={sectionLabelStyle}>Logistics</p>

              <Field label="Pets?" required>
                <RadioGroup name="pets" options={['None', 'Cat', 'Dog', 'Other']} />
              </Field>

              <Field label="Work situation as it affects the house?" required>
                <RadioGroup
                  name="work-situation"
                  options={[
                    'Remote / WFH',
                    'Hybrid',
                    'In-office',
                    'Variable',
                    'Not currently working',
                  ]}
                />
              </Field>

              <Field label="Anything else we should know?">
                <textarea name="anything-else" rows={4} value={formData['anything-else']} onChange={handleChange} disabled={disabled} style={textareaStyle} />
              </Field>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={disabled}
              style={{ opacity: disabled ? 0.7 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              {disabled ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            We typically respond within 24–48 hours. Questions?{' '}
            <a href="mailto:hello@fellowshipatx.com">hello@fellowshipatx.com</a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
