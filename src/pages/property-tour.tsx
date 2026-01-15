import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';

// Lazy load the viewer to avoid SSR issues with Three.js
const DollhouseViewerWrapper = () => {
  const DollhouseViewer = require('@site/src/components/DollhouseViewer').default;
  return <DollhouseViewer />;
};

export default function PropertyTourPage(): JSX.Element {
  return (
    <Layout
      title="Property Tour"
      description="Take an interactive 3D tour of The Fellowship property. Explore our rooms, common spaces, and amenities."
    >
      <main className="container-wide" style={{ padding: '2rem 1rem' }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <h1 className="section-title">Interactive Property Tour</h1>
          <p className="section-subtitle">
            Explore our three houses with this interactive 3D dollhouse view.
            Click on any room to see photos.
          </p>
        </div>

        {/* Dollhouse Viewer */}
        <BrowserOnly fallback={<LoadingFallback />}>
          {() => <DollhouseViewerWrapper />}
        </BrowserOnly>

        {/* Room Legend */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Room Guide</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <FloorSection
              title="Floor 1"
              rooms={[
                { name: 'Living / Dining', color: '#38a169' },
                { name: 'Kitchen', color: '#dd6b20' },
                { name: 'Entry / Stairs', color: '#805ad5' },
              ]}
            />
            <FloorSection
              title="Floor 2"
              rooms={[
                { name: 'Bedroom A', color: '#4a5568' },
                { name: 'Hall / Bath Entry', color: '#319795' },
                { name: 'Bedroom B / Flex', color: '#3182ce' },
              ]}
            />
          </div>
        </div>

        {/* CTA */}
        <div
          className="cta-section"
          style={{
            marginTop: '3rem',
            textAlign: 'center',
          }}
        >
          <h2 className="section-title" style={{ color: 'inherit' }}>
            Ready to See It in Person?
          </h2>
          <p
            className="section-subtitle"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Schedule a tour to experience the property firsthand and meet our community.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/apply" className="btn btn-primary">
              Schedule a Tour
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function LoadingFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '600px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.2)',
            borderTopColor: '#E85D04',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }}
        />
        <span>Loading 3D viewer...</span>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface FloorSectionProps {
  title: string;
  rooms: { name: string; color: string }[];
}

function FloorSection({ title, rooms }: FloorSectionProps) {
  return (
    <div
      style={{
        padding: '1rem',
        background: 'var(--ifm-card-background-color)',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {rooms.map((room) => (
          <div
            key={room.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                background: room.color,
              }}
            />
            <span style={{ fontSize: '0.875rem' }}>{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
