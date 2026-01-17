import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import House1708Viewer from '@site/src/components/House1708';

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

        {/* House 1708 3D Floor Plan Viewer */}
        <House1708Viewer height="600px" />

        {/* Room Legend */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Room Guide</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <FloorSection
              title="Floor 1 (Ground)"
              rooms={[
                { name: 'Dining Room', color: '#f4e4c9' },
                { name: 'Kitchen', color: '#e8dcc6' },
                { name: 'Bedroom 1', color: '#d6c7b7' },
                { name: 'Bathroom 1', color: '#c4d4e6' },
              ]}
            />
            <FloorSection
              title="Floor 2"
              rooms={[
                { name: 'Conservatory', color: '#e6f3e6' },
                { name: 'Bedroom 2', color: '#d6c7b7' },
                { name: 'Bedroom 3', color: '#d6c7b7' },
                { name: 'Bathroom 2', color: '#c4d4e6' },
              ]}
            />
            <FloorSection
              title="Floor 3 & Amenities"
              rooms={[
                { name: 'Guest Loft', color: '#f0e6d2' },
                { name: 'Sun Room + Hot Tub', color: '#e0f7fa' },
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
