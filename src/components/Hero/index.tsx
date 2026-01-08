import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroProps): JSX.Element {
  return (
    <section 
      className={clsx('hero-section', styles.hero)}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Decorative elements */}
      <div className={styles.decorativeOrb1} aria-hidden="true" />
      <div className={styles.decorativeOrb2} aria-hidden="true" />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={clsx('hero-title', styles.title)}>
            {title.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={styles.wordWrapper}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {i === 0 ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}{' '}
              </span>
            ))}
          </h1>
          
          <p className={clsx('hero-subtitle', styles.subtitle)}>
            {subtitle}
          </p>
          
          <div className={styles.ctas}>
            {primaryCta && (
              <Link
                to={primaryCta.to}
                className="btn btn-primary"
              >
                {primaryCta.label}
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
            )}
            
            {secondaryCta && (
              <Link
                to={secondaryCta.to}
                className="btn btn-secondary"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>
    </section>
  );
}
