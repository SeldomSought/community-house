import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Hand-drawn vignettes in the manner of coloured pencil on paper.
 * Each drawing is a hatched colour wash (fill="url(#h-…)", defined in
 * src/theme/Root.tsx) under a pencil line in currentColor, all passed
 * through the #pencil filter so strokes wobble and pick up paper grain.
 *
 * Drawn for this site; viewBox 0 0 64 64.
 */

type Drawing = { wash: React.ReactNode; line: React.ReactNode };

const DRAWINGS: Record<string, Drawing> = {
  houses: {
    wash: (
      <>
        <path d="M6 42V27l8-8 8 8v15z" fill="url(#h-verdigris)" />
        <path d="M23 42V22l9-10 9 10v20z" fill="url(#h-rust)" />
        <path d="M42 42V27l8-8 8 8v15z" fill="url(#h-plum)" />
        <path d="M2 42h60v6H2z" fill="url(#h-leaf)" />
      </>
    ),
    line: (
      <>
        <path d="M6 42V27l8-8 8 8v15M22.6 26.4l.4-4.4 9-10 9 10v20M42 27l8-8 8 8v15" />
        <path d="M2 42.4c20-.8 40 .6 60-.4" />
        <path d="M29.5 42v-8h5v8M10 30h4v4h-4zM50 30h4v4h-4zM28 22h8" />
        <path d="M8 50c6-2 10 1 16-1M36 51c6-2 12 1 20-1" />
      </>
    ),
  },
  fiber: {
    wash: <circle cx="54" cy="22" r="7" fill="url(#h-lemon)" />,
    line: (
      <>
        <path d="M6 46c14 0 16-26 30-26 8 0 12 6 18 2" />
        <path d="M6 52c16 0 18-20 32-20 8 0 11 4 16-8" />
        <path d="M6 40c12 0 14-28 28-28 7 0 12 4 20 10" />
        <path d="M54 15v-4M61 22h4M59 17l3-3M59 27l3 3" />
        <circle cx="54" cy="22" r="2.2" />
      </>
    ),
  },
  conservatory: {
    wash: (
      <>
        <path d="M14 52V27a18 18 0 0 1 36 0v25z" fill="url(#h-sky)" />
        <path d="M23 52l2-8h14l2 8z" fill="url(#h-rust)" />
        <path d="M32 44c-6-10-12-8-14-5 4 2 9 3 14 5zM32 44c3-12 10-13 13-10-3 3-8 6-13 10z" fill="url(#h-leaf)" />
      </>
    ),
    line: (
      <>
        <path d="M14 52V27a18 18 0 0 1 36 0v25z" />
        <path d="M32 9v18M14 30h36M20 16l6 11M44 16l-6 11" />
        <path d="M23 52l2-8h14l2 8" />
        <path d="M32 44c-6-10-12-8-14-5 4 2 9 3 14 5zM32 44c3-12 10-13 13-10-3 3-8 6-13 10zM32 44V33" />
        <path d="M8 52.5h48" />
      </>
    ),
  },
  soak: {
    wash: (
      <>
        <path d="M6 40h34v8c0 4-3 6-6 6H12c-3 0-6-2-6-6z" fill="url(#h-rust)" />
        <path d="M46 30l10-4 4 10-10 4z" fill="url(#h-sky)" />
      </>
    ),
    line: (
      <>
        <path d="M6 40h34v8c0 4-3 6-6 6H12c-3 0-6-2-6-6z" />
        <path d="M9 44c4-2 7 2 11 0s7 2 11 0 5 1 7 0" />
        <path d="M14 34c-4-4 4-6 0-11M22 34c-4-4 4-6 0-11M30 34c-4-4 4-6 0-11" />
        <path d="M46 30l10-4 4 10-10 4zM50 40l2 9 10-4-2-9M56 26l1-2 5 10-2 2" />
        <path d="M49 34l3-1" />
      </>
    ),
  },
  theatre: {
    wash: (
      <>
        <path d="M36 10h24v24H36z" fill="url(#h-lemon)" />
        <path d="M18 31L36 12v22z" fill="url(#h-lemon)" opacity=".55" />
        <path d="M4 29h14v10H4z" fill="url(#h-ink)" />
      </>
    ),
    line: (
      <>
        <path d="M36 10h24v24H36z" />
        <path d="M18 31L36 12M18 35l18-1" />
        <path d="M4 29h14v10H4z" />
        <circle cx="8" cy="23" r="5" />
        <circle cx="17" cy="24" r="4" />
        <path d="M11 39v12M6 51h10M40 40v14M56 40v14M38 54h20" />
      </>
    ),
  },
  car: {
    wash: (
      <>
        <path d="M6 42c1-6 6-9 12-10l8-6c6-4 14-4 18 0l8 6c6 1 8 5 8 10z" fill="url(#h-ink)" />
        <path d="M24 31l6-4c4-2 8-2 12 0l4 4z" fill="url(#h-sky)" />
      </>
    ),
    line: (
      <>
        <path d="M6 42c1-6 6-9 12-10l8-6c6-4 14-4 18 0l8 6c6 1 8 5 8 10z" />
        <path d="M24 31l6-4c4-2 8-2 12 0l4 4z" />
        <circle cx="18" cy="43" r="5" />
        <circle cx="48" cy="43" r="5" />
        <path d="M2 51h6M12 51h8M26 51h10M42 51h8M54 51h8" />
      </>
    ),
  },
  barbell: {
    wash: (
      <>
        <path d="M11 20h6v24h-6zM47 20h6v24h-6z" fill="url(#h-plum)" />
        <path d="M17 24h4v16h-4zM43 24h4v16h-4z" fill="url(#h-plum)" opacity=".6" />
      </>
    ),
    line: (
      <>
        <path d="M3 32h58" />
        <path d="M11 20h6v24h-6zM47 20h6v24h-6zM17 24h4v16h-4zM43 24h4v16h-4z" />
        <path d="M23 29v6M41 29v6" />
        <path d="M6 54c10-2 20 1 28-1s16 1 24-1" />
      </>
    ),
  },
  chicken: {
    wash: (
      <>
        <path d="M18 40c-4-10 2-20 12-18 2-8 10-10 12-4 2 4 0 8 2 12 4-4 10-8 12-4 2 8-4 18-16 20-10 2-18 0-22-6z" fill="url(#h-ochre)" />
        <path d="M37 15c1-4 3-4 4-1 1-3 3-2 3 1-1 2-5 2-7 0z" fill="url(#h-rust)" />
        <path d="M43 21c1 3 0 5-2 4" fill="url(#h-rust)" />
      </>
    ),
    line: (
      <>
        <path d="M18 40c-4-10 2-20 12-18 2-8 10-10 12-4 2 4 0 8 2 12 4-4 10-8 12-4 2 8-4 18-16 20-10 2-18 0-22-6z" />
        <path d="M37 15c1-4 3-4 4-1 1-3 3-2 3 1" />
        <path d="M42 18l5 1-4 2M43 21c1 3 0 5-2 4" />
        <path d="M27 33c7-3 12 0 14 6" />
        <path d="M30 46v8M36 46v8M27 54h6M33 54h6" />
        <circle cx="39.5" cy="18" r=".9" fill="currentColor" />
      </>
    ),
  },
  yard: {
    wash: (
      <>
        <path d="M20 36c-12 0-12-15-2-16-2-10 12-12 14-3 8-1 9 14-2 16z" fill="url(#h-leaf)" />
        <path d="M50 46c-6-6 0-12 0-18 4 6 8 10 0 18z" fill="url(#h-rust)" />
        <path d="M2 54h60v4H2z" fill="url(#h-leaf)" opacity=".6" />
      </>
    ),
    line: (
      <>
        <path d="M20 54V35M20 42l-5-4M20 40l5-4" />
        <path d="M20 36c-12 0-12-15-2-16-2-10 12-12 14-3 8-1 9 14-2 16" />
        <path d="M50 46c-6-6 0-12 0-18 4 6 8 10 0 18zM50 46c-2-3 0-5 0-7 2 2 3 4 0 7" />
        <path d="M41 54l18-6M41 48l18 6" />
        <path d="M2 54.4c20-.6 40 .4 60-.4" />
      </>
    ),
  },
  loft: {
    wash: (
      <>
        <path d="M36 20v-6h22v6z" fill="url(#h-verdigris)" />
        <path d="M38 14c1-3 5-3 6 0z" fill="url(#h-peony)" />
      </>
    ),
    line: (
      <>
        <path d="M8 58L18 8M18 58L28 8" />
        <path d="M10 49h10M12 39h10M14 29h10M16 19h10" />
        <path d="M28 21h32M36 20v-6h22v6M38 14c1-3 5-3 6 0M48 14v6" />
        <path d="M60 21v37" />
      </>
    ),
  },
  shed: {
    wash: (
      <>
        <path d="M8 40l40-20 6 6-40 20z" fill="url(#h-ink)" opacity=".7" />
        <path d="M48 20c6-8 14-4 12 4l-6 2z" fill="url(#h-ochre)" />
      </>
    ),
    line: (
      <>
        <path d="M8 40l40-20 6 6-40 20z" />
        <path d="M14 46l2 2 2-3 2 2 2-3 2 2 2-3 2 2 2-3 2 2 2-3 2 2 2-3 2 2 2-3 2 2" />
        <path d="M48 20c6-8 14-4 12 4l-6 2M52 22c2-3 5-2 5 0" />
        <path d="M14 56c4-6 8 0 8-3M26 57c3-5 7 0 8-3M38 56c3-4 6 0 7-3" />
      </>
    ),
  },
  pin: {
    wash: (
      <>
        <path d="M32 8c-10 0-16 8-16 16 0 12 16 28 16 28s16-16 16-28c0-8-6-16-16-16z" fill="url(#h-rust)" />
        <path d="M4 58c16-10 28-2 56-8v6c-24 4-40-2-56 6z" fill="url(#h-verdigris)" opacity=".6" />
      </>
    ),
    line: (
      <>
        <path d="M32 8c-10 0-16 8-16 16 0 12 16 28 16 28s16-16 16-28c0-8-6-16-16-16z" />
        <circle cx="32" cy="24" r="5" />
        <path d="M4 58c16-10 28-2 56-8" />
        <path d="M10 62c6-4 12-2 16-4" />
      </>
    ),
  },
  /* ornaments */
  key: {
    wash: <circle cx="14" cy="32" r="8" fill="url(#h-ochre)" />,
    line: (
      <>
        <circle cx="14" cy="32" r="8" />
        <circle cx="14" cy="32" r="3" />
        <path d="M22 32h36M48 32v8h4v-4M56 32v6" />
        <path d="M8 24c-2-3 0-6 3-6" />
      </>
    ),
  },
  peony: {
    wash: (
      <>
        <path d="M32 20c-8-8-18 0-12 8-8 2-6 14 4 12 0 8 12 10 14 2 8 4 14-6 6-12 8-6 0-18-8-12 0-4-2-4-4 2z" fill="url(#h-peony)" />
        <path d="M31 52c-7-2-11 2-13 6 6 0 10-2 13-6z" fill="url(#h-leaf)" />
        <path d="M33 47c6-4 12-2 14 2-6 1-10 1-14-2z" fill="url(#h-leaf)" />
      </>
    ),
    line: (
      <>
        <path d="M32 20c-8-8-18 0-12 8-8 2-6 14 4 12 0 8 12 10 14 2 8 4 14-6 6-12 8-6 0-18-8-12 0-4-2-4-4 2z" />
        <path d="M29 30c3-4 7-2 7 1s-4 4-5 1M24 28c4 2 5 4 5 2M40 26c-2 3-3 4-4 4" />
        <path d="M32 42c-2 8 0 14-2 20" />
        <path d="M31 52c-7-2-11 2-13 6 6 0 10-2 13-6zM33 47c6-4 12-2 14 2-6 1-10 1-14-2z" />
      </>
    ),
  },
  bloom: {
    wash: (
      <>
        <circle cx="32" cy="24" r="7" fill="url(#h-lemon)" />
        <path d="M22 60c2-10 8-18 10-24 2 6 8 14 10 24z" fill="url(#h-leaf)" opacity=".5" />
      </>
    ),
    line: (
      <>
        <path d="M32 16c-3-8 3-10 4-4 2-6 8-3 4 3 6-2 8 4 2 5 6 2 3 8-3 5 2 6-4 8-5 2-2 6-8 3-5-3-6 2-8-4-2-5-6-2-3-8 3-4z" />
        <circle cx="32" cy="24" r="3" />
        <path d="M32 32c0 10-2 18 0 28M32 46c-6-6-12-4-14-2 4 2 10 3 14 2M32 42c5-5 10-4 12-1-3 2-8 2-12 1" />
      </>
    ),
  },
  seed: {
    wash: <path d="M16 54h32l-4 8H20z" fill="url(#h-ochre)" />,
    line: (
      <>
        <path d="M16 54h32l-4 8H20z" />
        <path d="M32 54V34" />
        <path d="M32 40c-8-2-12-10-10-14 6 0 10 6 10 14zM32 36c6-4 12-8 14-4-2 4-8 6-14 4z" />
        <path d="M32 34c-1-3 1-6 3-6" />
      </>
    ),
  },
  wind: {
    wash: <path d="M4 26h40c6 0 8-4 6-7M4 34h48c4 0 6 3 4 6H4z" fill="url(#h-sky)" opacity=".7" />,
    line: (
      <>
        <path d="M6 30h38c8 0 10-10 4-12s-8 4-4 6" />
        <path d="M6 38h46c6 0 8 8 2 9s-6-4-2-5" />
        <path d="M12 46h22" />
        <path d="M14 22h16" />
      </>
    ),
  },
};

export type VignetteName = keyof typeof DRAWINGS;
export const VIGNETTE_NAMES = Object.keys(DRAWINGS);

interface VignetteProps {
  name: string;
  className?: string;
  size?: number | string;
  title?: string;
}

export default function Vignette({ name, className, size = 64, title }: VignetteProps): JSX.Element | null {
  const drawing = DRAWINGS[name];
  if (!drawing) return null;
  return (
    <svg
      className={clsx(styles.vignette, className)}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g filter="url(#pencil)">
        <g className={styles.wash}>{drawing.wash}</g>
        <g
          className={styles.line}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {drawing.line}
        </g>
      </g>
    </svg>
  );
}
