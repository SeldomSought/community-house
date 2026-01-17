import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import { FeatureGrid } from '@site/src/components/FeatureCard';
import PropertyMap from '@site/src/components/PropertyMap';
import AtAGlance from '@site/src/components/AtAGlance';
import StickyCTA from '@site/src/components/StickyCTA';
import CommunitySection from '@site/src/components/CommunitySection';
import featuresData from '@site/src/data/features.json';

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

function ExploreSpaceSection(): JSX.Element {
  return (
    <section className="section" id="explore-space">
      <div className="container-wide">
        <div className="section-header">
          <h2 className="section-title">Explore Our Space</h2>
          <p className="section-subtitle">
            Three houses on half an acre in Travis Heights. Each house has its own character and amenities.
          </p>
        </div>
        <PropertyMap />
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
          title="Live with intention."
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

        <AtAGlance />
        <FeaturesSection />
        <ExploreSpaceSection />
        <CommunitySection />
        <RoadmapSection />
        <CTASection />
        <StickyCTA />
      </main>
    </Layout>
  );
}
