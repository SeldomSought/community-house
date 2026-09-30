import React, { useCallback, useEffect, useRef, useState } from 'react';
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

/* ── French Republican calendar ──────────────────────
   Christophe Chemin built his Prada prints on the Revolutionary
   calendar, whose months are named for what the land is doing.
   The edition line shows today's date in it. The new year is taken
   as 22 September (the autumn equinox, give or take a day). */
const MONTHS: [string, string][] = [
  ['Vendémiaire', 'the grape harvest'],
  ['Brumaire', 'mist'],
  ['Frimaire', 'frost'],
  ['Nivôse', 'snow'],
  ['Pluviôse', 'rain'],
  ['Ventôse', 'wind'],
  ['Germinal', 'seeds sprouting'],
  ['Floréal', 'flowers'],
  ['Prairial', 'meadows'],
  ['Messidor', 'the harvest'],
  ['Thermidor', 'summer heat'],
  ['Fructidor', 'fruit'],
];

function toRoman(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [value, numeral] of table) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}

function republicanDate(now: Date): { label: string; gloss: string } {
  const y = now.getFullYear();
  const startThisYear = new Date(y, 8, 22);
  const start = now >= startThisYear ? startThisYear : new Date(y - 1, 8, 22);
  const day = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const year = toRoman(start.getFullYear() - 1791);
  if (day >= 360) {
    return { label: `Jour complémentaire ${day - 359}, an ${year}`, gloss: 'the days between years' };
  }
  const [month, gloss] = MONTHS[Math.floor(day / 30)];
  return { label: `${(day % 30) + 1} ${month}, an ${year}`, gloss };
}

/**
 * Atlas-style opening: centred display type on paper, with the aerial
 * photograph printed beneath it as an engraved plate in cobalt ink.
 * On devices with a fine pointer, a loupe follows the cursor and shows
 * the real colour photograph underneath the engraving.
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

  // Rendered after mount so the server build and the visitor's clock agree.
  const [date, setDate] = useState<{ label: string; gloss: string } | null>(null);
  useEffect(() => setDate(republicanDate(new Date())), []);

  // Loupe: CSS variables updated once per animation frame.
  const plateRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = plateRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--lx', `${x}px`);
      el.style.setProperty('--ly', `${y}px`);
      el.dataset.loupe = 'on';
    });
  }, []);
  const onLeave = useCallback(() => {
    if (plateRef.current) plateRef.current.dataset.loupe = 'off';
  }, []);

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
        <div className={styles.edition}>
          <span aria-hidden="true">The Fellowship / Travis Heights, Austin</span>
          {date ? (
            <span
              className={styles.calendar}
              title="Today's date in the French Republican calendar"
            >
              {date.label} <em>· {date.gloss}</em>
            </span>
          ) : (
            <span aria-hidden="true">Three houses &nbsp;·&nbsp; Twelve rooms</span>
          )}
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

      <div
        ref={plateRef}
        className={styles.plate}
        data-loupe="off"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <img
          className={styles.plateImage}
          src={bgUrl}
          width="2048"
          height="860"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        {/* the same photograph in colour, revealed through the loupe */}
        <img
          className={styles.plateColour}
          src={bgUrl}
          width="2048"
          height="860"
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <span className={styles.loupeRim} aria-hidden="true" />
      </div>
      <p className={styles.plateHint} aria-hidden="true">
        Hold your cursor over the picture to see it in color.
      </p>
    </section>
  );
}
