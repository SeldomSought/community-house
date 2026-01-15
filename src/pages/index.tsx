import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import { FeatureGrid } from '@site/src/components/FeatureCard';
import FloorPlan from '@site/src/components/FloorPlan';
import featuresData from '@site/src/data/features.json';

interface Pillar {
  id: string;
  title: string;
  tagline: string;
  color: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

// Floor plan data
const floors = [
  {
    id: 'ground-floor',
    label: 'Ground Floor',
    image: '/img/floor-plans/ground-floor.svg',
    alt: 'Ground floor plan showing common areas, kitchen, and outdoor deck',
  },
  {
    id: 'first-floor',
    label: 'First Floor',
    image: '/img/floor-plans/first-floor.svg',
    alt: 'First floor plan showing private bedrooms and coworking office',
  },
];

function PillarsSection(): JSX.Element {
  const pillars = (featuresData as { pillars: Pillar[] }).pillars;

  return (
    <section className="section" id="pillars">
      <div className="container-wide">
        <div className="section-header">
          <h2 className="section-title">Five Pillars of Living Well</h2>
          <p className="section-subtitle">
            Our community is built around what matters most: movement, recovery,
            focus, connection, and nature.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="feature-card"
              style={{
                borderTop: `3px solid ${pillar.color}`,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: pillar.color,
                }} />
                <h3 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 600,
                }}>{pillar.title}</h3>
              </div>
              <p style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}>{pillar.tagline}</p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {pillar.features.map((feature) => (
                  <li
                    key={feature.title}
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(128,128,128,0.1)',
                    }}
                  >
                    <strong>{feature.title}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection(): JSX.Element {
  return (
    <section className="section" id="features">
      <div className="container-wide">
        <div className="section-header">
          <h2 className="section-title">All Amenities</h2>
          <p className="section-subtitle">
            Everything you need for productive work and comfortable living,
            all under one roof.
          </p>
        </div>

        <FeatureGrid
          features={featuresData.features}
          columns={3}
        />
      </div>
    </section>
  );
}

function FloorPlanSection(): JSX.Element {
  return (
    <section className="section" id="floor-plan">
      <div className="container-wide">
        <FloorPlan 
          floors={floors} 
          title="Explore Our Space"
        />
      </div>
    </section>
  );
}

function CTASection(): JSX.Element {
  return (
    <section className="cta-section">
      <h2 className="section-title" style={{ color: 'inherit' }}>
        Join The Fellowship
      </h2>
      <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
        Apply to join our community. We'll schedule a call to get to know you.
      </p>
      <Link to="/apply" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
        Apply Now
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 10h12m0 0l-4-4m4 4l-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </section>
  );
}

function RoadmapSection(): JSX.Element {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container-narrow">
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic'
        }}>
          Coming soon: sauna, courtyard garden, solar power, and more.
        </p>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="A wellness-focused coliving community in Travis Heights, Austin. Movement, recovery, focus, community, and nature—all under one roof."
    >
      <main>
        <Hero
          title="Live with intention. Thrive together."
          subtitle="The Fellowship is a wellness-focused coliving community in Travis Heights, Austin. Three houses, twelve rooms, half an acre of land—designed around movement, recovery, focus, community, and nature. Rooms from $750/month."
          primaryCta={{
            label: 'View Rooms',
            to: '/membership',
          }}
          secondaryCta={{
            label: 'Schedule a Tour',
            to: '/apply',
          }}
        />

        <PillarsSection />
        <FeaturesSection />
        <FloorPlanSection />
        <RoadmapSection />
        <CTASection />
      </main>
    </Layout>
  );
}
