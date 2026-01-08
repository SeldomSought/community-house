import React from 'react';
import Layout from '@theme/Layout';

export default function ApplyPage(): JSX.Element {
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
          {/* 
            Replace this with your preferred form solution:
            - Typeform embed
            - Google Forms embed
            - Cal.com scheduling widget
            - Custom form with Formspree/Netlify Forms
          */}
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="linkedin"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                LinkedIn or Personal Website
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="membership"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                Interested In *
              </label>
              <select
                id="membership"
                name="membership"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
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
              <label
                htmlFor="move-in"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                Desired Move-in Date
              </label>
              <input
                type="date"
                id="move-in"
                name="move-in"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="about"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                Tell us about yourself *
              </label>
              <textarea
                id="about"
                name="about"
                required
                rows={4}
                placeholder="What do you do? Why are you interested in coliving? What are you working on?"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  resize: 'vertical',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="referral"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}
              >
                How did you hear about us?
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                placeholder="Friend, Twitter, Google, etc."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(128, 128, 128, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Application
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
