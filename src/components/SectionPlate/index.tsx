import React from 'react';
import clsx from 'clsx';
import Vignette from '@site/src/components/Vignette';
import styles from './styles.module.css';

/**
 * A section opening in the manner of Christophe Chemin's month plates:
 * a small drawing, the plate number and a Revolutionary month with the
 * thing it was named for, then the title. `accent` sets which ink the
 * drawing is lined in and the month is set in.
 */
interface SectionPlateProps {
  number: string;
  month: string;
  gloss: string;
  vignette: string;
  accent?: 'rust' | 'verdigris' | 'plum' | 'ochre' | 'peony' | 'leaf' | 'ink';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

export default function SectionPlate({
  number,
  month,
  gloss,
  vignette,
  accent = 'rust',
  title,
  subtitle,
  as: Heading = 'h2',
  className,
}: SectionPlateProps): JSX.Element {
  return (
    <header className={clsx(styles.plate, className)} data-accent={accent}>
      <Vignette name={vignette} size={88} className={clsx(styles.drawing, 'vignette-draw')} />
      <p className={styles.kicker}>
        <span className={styles.number}>Plate {number}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.month}>{month}</span>
        <em className={styles.gloss}>{gloss}</em>
      </p>
      <Heading className={styles.title}>{title}</Heading>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
