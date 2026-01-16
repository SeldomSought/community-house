import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface StickyCTAProps {
  label?: string;
  to?: string;
  showAfterScroll?: number;
}

export default function StickyCTA({
  label = 'Apply Now',
  to = '/apply',
  showAfterScroll = 400,
}: StickyCTAProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check scroll position
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    checkMobile();
    handleScroll();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAfterScroll]);

  // Only show on mobile and after scrolling
  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <div className={styles.stickyWrapper}>
      <Link to={to} className={styles.stickyButton}>
        {label}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 10h12m0 0l-4-4m4 4l-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
