import React, { useState, FormEvent } from 'react';
import Layout from '@theme/Layout';

// Formspree form ID for application submissions
const FORMSPREE_FORM_ID = 'mzddgwra';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  membership: string;
  'move-in': string;
  about: string;
  referral: string;
}

export default function ApplyPage(): JSX.Element {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    linkedin: '',
    membership: '',
    'move-in': '',
    about: '',
    referral: '',
  });

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

    // Check if Formspree is configured
    if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
      setStatus('error');
      setErrorMessage(
        'Form not configured. Please set up a Formspree form ID in the code.'
      );
      return;
    }

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
        // Reset form
        setFormData({
          name: '',
          email: '',
          linkedin: '',
          membership: '',
          'move-in': '',
          about: '',
          referral: '',
        });
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

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    background: 'var(--ifm-background-color)',
    color: 'var(--color-text)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500' as const,
  };

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
              received your application and will be in touch within 24-48 hours
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
            We'd love to meet you! Complete the form below to schedule an
            introductory video call with our community manager.
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
          {/* Error message */}
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
                disabled={status === 'submitting'}
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
                disabled={status === 'submitting'}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="linkedin" style={labelStyle}>
                LinkedIn or Personal Website
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={handleChange}
                disabled={status === 'submitting'}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="membership" style={labelStyle}>
                Interested In *
              </label>
              <select
                id="membership"
                name="membership"
                required
                value={formData.membership}
                onChange={handleChange}
                disabled={status === 'submitting'}
                style={inputStyle}
              >
                <option value="">Select an option</option>
                <option value="coliving-shared">
                  Coliving - Private Room (Shared Bath)
                </option>
                <option value="coliving-private">
                  Coliving - Private Room (Private Bath)
                </option>
                <option value="coliving-premium">Coliving - Premium Suite</option>
                <option value="coworking">Coworking Only</option>
                <option value="tour">Just want a tour</option>
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
                disabled={status === 'submitting'}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="about" style={labelStyle}>
                Tell us about yourself *
              </label>
              <textarea
                id="about"
                name="about"
                required
                rows={4}
                placeholder="What do you do? Why are you interested in coliving? What are you working on?"
                value={formData.about}
                onChange={handleChange}
                disabled={status === 'submitting'}
                style={{
                  ...inputStyle,
                  resize: 'vertical' as const,
                }}
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
                placeholder="Friend, Twitter, Google, etc."
                value={formData.referral}
                onChange={handleChange}
                disabled={status === 'submitting'}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'submitting'}
              style={{
                opacity: status === 'submitting' ? 0.7 : 1,
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            We typically respond within 24-48 hours. For urgent inquiries,
            email us at{' '}
            <a href="mailto:hello@communityhouse.example">
              hello@communityhouse.example
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
