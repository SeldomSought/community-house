import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import { FeatureGrid } from '@site/src/components/FeatureCard';
import PropertyMap from '@site/src/components/PropertyMap';
import AtAGlance from '@site/src/components/AtAGlance';
import StickyCTA from '@site/src/components/StickyCTA';
import Gallery from '@site/src/components/Gallery';
import SectionPlate from '@site/src/components/SectionPlate';
import Vignette from '@site/src/components/Vignette';
import featuresData from '@site/src/data/features.json';

function FeaturesSection(): JSX.Element {
  return (
    <section className="section" id="features">
      <div className="container-wide">
        <SectionPlate
          number="I"
          month="Floréal"
          gloss="the month of flowers"
          vignette="peony"
          accent="peony"
          title={<>What's <em>here</em></>}
          subtitle="The short list of what you get here, not counting the housemates."
        />

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
        <SectionPlate
          number="III"
          month="Prairial"
          gloss="the month of meadows"
          vignette="yard"
          accent="leaf"
          title={<>How the land <em>lays out</em></>}
          subtitle="Three houses on half an acre. Each one has its own personality and its own share of the good stuff."
        />
        <PropertyMap />
      </div>
    </section>
  );
}

function CTASection(): JSX.Element {
  return (
    <section className="cta-section">
      <Vignette name="peony" size={120} className="cta-flourish cta-flourish--left" />
      <Vignette name="bloom" size={110} className="cta-flourish cta-flourish--right" />
      <SectionPlate
        number="V"
        month="Vendémiaire"
        gloss="the harvest, and the new year"
        vignette="key"
        title={<>Come <em>live</em> here</>}
        subtitle="Fill out the application and we'll set up a call. It's mostly just us getting to know you."
      />
      <Link to="/apply" className="btn btn-primary">
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
        <Vignette name="seed" size={72} className="roadmap__seed vignette-draw" />
        <p className="roadmap__kicker">
          Plate IV <span aria-hidden="true">&middot;</span> <strong>Germinal</strong>{' '}
          <em>seeds sprouting</em>
        </p>
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
          subtitle="The Fellowship is three houses in Travis Heights that share half an acre of yard. We set it up around how we actually like to live: lift in the morning, get real work done, sit in the hot tub or the cold plunge, cook for each other at night. Twelve rooms. From $850 a month."
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
