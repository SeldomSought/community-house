import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import { FeatureGrid } from '@site/src/components/FeatureCard';
import FloorPlan from '@site/src/components/FloorPlan';
import featuresData from '@site/src/data/features.json';

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

function FeaturesSection(): JSX.Element {
  return (
    <section className="section" id="features">
      <div className="container-wide">
        <div className="section-header">
          <h2 className="section-title">Features & Amenities</h2>
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
      description="A modern coliving and coworking community. Flexible leases, fully equipped workspaces, and a vibrant community."
    >
      <main>
        <Hero
          title="The Fellowship — a coliving community in Travis Heights, Austin."
          subtitle="Three houses on a half-acre with a gym, cold plunge, hot tub, movie theatre, backyard chickens, and a house Tesla. Less than a mile to Lady Bird Trail. Rooms from $750/month."
          primaryCta={{
            label: 'View Rooms',
            to: '/membership',
          }}
          secondaryCta={{
            label: 'Apply Now',
            to: '/apply',
          }}
        />
        
        <FeaturesSection />
        <FloorPlanSection />
        <RoadmapSection />
        <CTASection />
      </main>
    </Layout>
  );
}
