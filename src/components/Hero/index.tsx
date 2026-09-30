import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
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

/**
 * Atlas-style opening: centred display type on paper, with the aerial
 * photograph printed beneath it as an engraved "plate" in cobalt ink.
 * The photograph returns to full colour on hover (desktop).
 */
export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage = '/img/home/hero-banner.png',
}: HeroProps): JSX.Element {
  const bgUrl = useBaseUrl(backgroundImage);
  const words = title.split(' ');

  return (
    <section className={clsx('hero-section', styles.hero)}>
      {/* Recolours photography into the site's ink. Luminance → ink density. */}
      <svg className={styles.filterDefs} aria-hidden="true" width="0" height="0">
        <defs>
          <filter id="fellowship-ink" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 .0902  0 0 0 0 .2275  0 0 0 0 .4667  -.465 -.915 -.17 0 1.25"
              result="ink"
            />
            <feComposite in="ink" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className={styles.opening}>
        <div className={styles.edition} aria-hidden="true">
          <span>The Fellowship / Travis Heights, Austin</span>
          <span>Three houses &nbsp;·&nbsp; Twelve rooms</span>
        </div>

        <h1 className={clsx('hero-title', styles.title)}>
          {words.map((word, i) => (
            <span
              key={i}
              className={styles.wordWrapper}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p className={clsx('hero-subtitle', styles.subtitle)}>{subtitle}</p>

        <div className={styles.ctas}>
          {primaryCta && (
            <Link to={primaryCta.to} className={clsx('btn btn-primary', styles.ctaButton)}>
              {primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.to} className={styles.inkLink}>
              {secondaryCta.label}
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>

        <div className={styles.compass} aria-hidden="true">
          <svg viewBox="0 0 80 90">
            <path d="M40 4 L42 38 64 26 47 45 72 47 47 50 61 72 42 57 40 86 37 56 18 69 32 50 8 47 33 43 21 24 37 37Z" />
            <path d="M40 4 V86 M8 47 H72" />
          </svg>
          <span>N</span>
        </div>
      </div>

      <div className={styles.plate}>
        <img
          className={styles.plateImage}
          src={bgUrl}
          width="2048"
          height="860"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}
