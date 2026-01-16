import React from 'react';
import styles from './styles.module.css';

interface GlanceItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const glanceItems: GlanceItem[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: 'Starting at',
    value: '$750/mo',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Travis Heights, Austin',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Community',
    value: '12 Rooms, 3 Houses',
  },
];

export default function AtAGlance(): JSX.Element {
  return (
    <section className={styles.atAGlance}>
      <div className={styles.container}>
        <p className={styles.tagline}>Live with intention. Thrive together.</p>
        <div className={styles.grid}>
          {glanceItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.text}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
