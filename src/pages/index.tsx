import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import { FeatureGrid } from '@site/src/components/FeatureCard';
import PropertyMap from '@site/src/components/PropertyMap';
import AtAGlance from '@site/src/components/AtAGlance';
import StickyCTA from '@site/src/components/StickyCTA';
import Gallery from '@site/src/components/Gallery';
import featuresData from '@site/src/data/features.json';

function FeaturesSection(): JSX.Element {
  return (
    <section className="section" id="features">
      <div className="container-wide">
        <div className="section-header">
          <h2 className="section-title">What's here</h2>
          <p className="section-subtitle">
            The short list of what you get here, not counting the housemates.
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
          <h2 className="section-title">How the land lays out</h2>
          <p className="section-subtitle">
            Three houses on half an acre. Each one has its own personality and its own share of the good stuff.
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
        Come live here
      </h2>
      <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
        Fill out the application and we'll set up a call. It's mostly just us getting to know you.
      </p>
      <Link to="/apply" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
        Start an application
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
    <section className="section roadmap" style={{ textAlign: 'center' }}>
      <div className="container-narrow">
        <p className="roadmap-note">
          Still on the list: a sauna, a courtyard garden, and solar.
        </p>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Coliving in Travis Heights, Austin. Three houses that share half an acre of backyard, with twelve rooms starting at $850 a month."
    >
      <main>
        <Hero
          title="Three houses, one backyard."
          subtitle="The Fellowship is three houses in Travis Heights that share half an acre of yard. Twelve private rooms, a barbell gym, a hot tub and cold plunge, and fiber internet, a few minutes from downtown. Rooms from $850 a month."
          primaryCta={{
            label: 'See the rooms',
            to: '/membership',
          }}
          secondaryCta={{
            label: 'Come see it in person',
            to: '/apply',
          }}
        />

        <AtAGlance />
        <FeaturesSection />
        <Gallery />
        <ExploreSpaceSection />
        <RoadmapSection />
        <CTASection />
        <StickyCTA />
      </main>
    </Layout>
  );
}
