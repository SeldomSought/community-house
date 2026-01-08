import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: 'workshop' | 'social' | 'networking' | 'other';
  rsvpLink?: string;
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps): JSX.Element {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const day = dateObj.getDate();
  
  const categoryColors = {
    workshop: '#059669',
    social: '#7C3AED',
    networking: '#2563EB',
    other: '#6B7280',
  };
  
  return (
    <article className={clsx('event-card', styles.card)}>
      <div 
        className={clsx('event-date', styles.date)}
        style={{ 
          backgroundColor: event.category 
            ? categoryColors[event.category] 
            : 'var(--color-accent)' 
        }}
      >
        <span className={clsx('event-date__month', styles.month)}>
          {month}
        </span>
        <span className={clsx('event-date__day', styles.day)}>
          {day}
        </span>
      </div>
      
      <div className={clsx('event-details', styles.details)}>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.description}>{event.description}</p>
        
        <div className={clsx('event-meta', styles.meta)}>
          <span className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 8.5c0 4.5-5 6.5-5 6.5s-5-2-5-6.5a5 5 0 1110 0z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {event.location}
          </span>
          <span className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {event.time}
          </span>
        </div>
        
        {event.rsvpLink && (
          <Link 
            to={event.rsvpLink} 
            className={styles.rsvpButton}
          >
            RSVP
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

interface EventsListProps {
  events: Event[];
  showEmpty?: boolean;
  emptyMessage?: string;
}

export default function EventsList({ 
  events, 
  showEmpty = true,
  emptyMessage = "No upcoming events. Check back soon!"
}: EventsListProps): JSX.Element {
  if (events.length === 0 && showEmpty) {
    return (
      <div className={styles.empty}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 18h32" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 6v8M32 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className={styles.list}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
