import React, { useState, FormEvent } from 'react';
import Layout from '@theme/Layout';

// Configure your Formspree form ID here
// Get one at https://formspree.io - it looks like: xrgvkpzn
const FORMSPREE_FORM_ID = 'mzddgwra';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  membership: string;
  'move-in': string;
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
  referral: string;
}

const emptyForm: FormData = {
  name: '',
  email: '',
  linkedin: '',
  membership: '',
  'move-in': '',
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
  referral: '',
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
        setErrorMessage(
          data.error || 'Something went wrong. Please try again.'
        );
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

  const hintStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.6rem',
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.4',
  };

  const isSubmitting = status === 'submitting';

  function RadioGroup({ name, options }: { name: string; options: string[] }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.1rem' }}>
        {options.map((opt) => (
          <label
            key={opt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
              disabled={isSubmitting}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <Layout
        title="Application Submitted"
        description="Thank you for your application."
      >
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
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="section-title" style={{ marginBottom: '1rem' }}>
              Application Received!
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Thank you for your interest in joining The Fellowship. We've
              received your application and will be in touch within 24–48 hours
              to schedule an introductory call.
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
    <Layout
      title="Apply"
      description="Apply to join our coliving and coworking community."
    >
      <main className="container-narrow" style={{ padding: '4rem 1.5rem' }}>
        <div className="section-header">
          <h1 className="section-title">Apply to Join</h1>
          <p className="section-subtitle">
            We'd love to meet you! Complete the form below and we'll be in touch
            within 24–48 hours.
          </p>
        </div>

        <div
          style={{
            maxWidth: '600px',
            margin: '3rem auto',
            padding: '2rem',
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
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* ── Basics ── */}
            <div>
              <label htmlFor="name" style={labelStyle}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" style={labelStyle}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="linkedin" style={labelStyle}>
                LinkedIn or Personal Website
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="linkedin.com/in/yourprofile or yoursite.com"
                value={formData.linkedin}
                onChange={handleChange}
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="membership" style={labelStyle}>
                Which room are you interested in? *
              </label>
              <select
                id="membership"
                name="membership"
                required
                value={formData.membership}
                onChange={handleChange}
                disabled={isSubmitting}
                style={inputStyle}
              >
                <option value="">Select a room</option>
                <option value="cozy-room">Cozy Room — $750/mo</option>
                <option value="medium-room">Medium Sized Room — $950/mo</option>
                <option value="en-suite">En Suite — $1,250/mo</option>
              </select>
            </div>

            <div>
              <label htmlFor="move-in" style={labelStyle}>
                Desired Move-in Date
              </label>
              <input
                type="date"
                id="move-in"
                name="move-in"
                value={formData['move-in']}
                onChange={handleChange}
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            {/* ── About you ── */}
            <div>
              <label htmlFor="why-coliving" style={labelStyle}>
                Why are you specifically looking for a coliving experience rather
                than a normal apartment? *
              </label>
              <textarea
                id="why-coliving"
                name="why-coliving"
                required
                rows={4}
                value={formData['why-coliving']}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label htmlFor="hobbies" style={labelStyle}>
                What are 3 activities and/or hobbies you really enjoy and why? *
              </label>
              <textarea
                id="hobbies"
                name="hobbies"
                required
                rows={5}
                placeholder={'1. \n2. \n3. '}
                value={formData.hobbies}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* ── Living together ── */}
            <div>
              <label htmlFor="shared-space" style={labelStyle}>
                What's your relationship to shared space and mess? Be honest. *
              </label>
              <textarea
                id="shared-space"
                name="shared-space"
                required
                rows={4}
                value={formData['shared-space']}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={labelStyle}>
                Practically, how do you keep up with cleaning? *
              </label>
              <span style={hintStyle}>
                Are you a clean-as-you-go person, a scheduled-chores person, a
                hire-it-out person, or "I'll be honest, I struggle with it"?
              </span>
              <RadioGroup
                name="cleaning-style"
                options={[
                  'Clean-as-you-go',
                  'Scheduled chores',
                  'Hire it out',
                  "I'll be honest, I struggle with it",
                ]}
              />
            </div>

            <div>
              <label htmlFor="conflict" style={labelStyle}>
                What's your approach to dealing with conflict? *
              </label>
              <textarea
                id="conflict"
                name="conflict"
                required
                rows={4}
                value={formData.conflict}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label htmlFor="show-up" style={labelStyle}>
                How do you like to show up in a shared home? *
              </label>
              <span style={hintStyle}>
                Hosting, cooking, organizing, quietly contributing, something else?
              </span>
              <textarea
                id="show-up"
                name="show-up"
                required
                rows={3}
                value={formData['show-up']}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label htmlFor="contribution" style={labelStyle}>
                What would you bring to the house and the community here? *
              </label>
              <span style={hintStyle}>
                Could be a skill, an energy, something you love to host or
                organize. We're especially looking for people who actively make
                the community better by being part of it.
              </span>
              <textarea
                id="contribution"
                name="contribution"
                required
                rows={5}
                value={formData.contribution}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* ── Logistics ── */}
            <div>
              <label style={labelStyle}>Do you have any pets? *</label>
              <RadioGroup
                name="pets"
                options={['No pets', 'Cat', 'Dog', 'Other']}
              />
            </div>

            <div>
              <label style={labelStyle}>
                Work situation as it affects the house? *
              </label>
              <RadioGroup
                name="work-situation"
                options={[
                  'Remote / WFH',
                  'Hybrid',
                  'In-office',
                  'Not currently working',
                ]}
              />
            </div>

            <div>
              <label htmlFor="anything-else" style={labelStyle}>
                Anything else we should know?
              </label>
              <textarea
                id="anything-else"
                name="anything-else"
                rows={4}
                value={formData['anything-else']}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label htmlFor="referral" style={labelStyle}>
                How did you hear about us?
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                placeholder="Friend, Instagram, Google, etc."
                value={formData.referral}
                onChange={handleChange}
                disabled={isSubmitting}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            We typically respond within 24–48 hours. For urgent inquiries,
            email us at{' '}
            <a href="mailto:hello@fellowshipatx.com">
              hello@fellowshipatx.com
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
