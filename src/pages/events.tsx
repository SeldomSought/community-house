import React, { useState } from 'react';
import Layout from '@theme/Layout';
import EventsList, { Event } from '@site/src/components/EventsList';
import eventsData from '@site/src/data/events.json';

type Category = 'all' | 'workshop' | 'social' | 'networking';

const categoryLabels: Record<Category, string> = {
  all: 'All Events',
  workshop: 'Workshops',
  social: 'Social',
  networking: 'Networking',
};

export default function EventsPage(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  
  const filteredEvents = activeCategory === 'all'
    ? eventsData.events
    : eventsData.events.filter(e => e.category === activeCategory);
  
  // Sort by date
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  return (
    <Layout
      title="Events"
      description="Upcoming events, workshops, and community gatherings at Community House."
    >
      <main className="container-wide" style={{ padding: '3rem 1rem' }}>
        <div className="section-header">
          <h1 className="section-title">Upcoming Events</h1>
          <p className="section-subtitle">
            Join our community events, workshops, and social gatherings. 
            Connect with fellow residents and locals.
          </p>
        </div>
        
        {/* Category Filters */}
        <div 
          className="floor-plan-tabs" 
          style={{ marginBottom: '2rem' }}
          role="tablist"
          aria-label="Event categories"
        >
          {(Object.keys(categoryLabels) as Category[]).map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={`floor-plan-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
        
        {/* Events List */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <EventsList 
            events={sortedEvents as Event[]}
            emptyMessage={`No ${activeCategory === 'all' ? '' : categoryLabels[activeCategory].toLowerCase()} events scheduled. Check back soon!`}
          />
        </div>
        
        {/* Subscribe CTA */}
        <div 
          className="cta-section" 
          style={{ 
            marginTop: '4rem',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <h2 className="section-title" style={{ color: 'inherit' }}>
            Never Miss an Event
          </h2>
          <p 
            className="section-subtitle" 
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Subscribe to our calendar to stay updated on all upcoming events.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <a 
              href="/events.ics" 
              className="btn btn-primary"
              download
            >
              📅 Add to Calendar
            </a>
            <a 
              href="/apply" 
              className="btn btn-secondary"
              style={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.5)' 
              }}
            >
              Join Community
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
