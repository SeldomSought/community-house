import React from 'react';

/**
 * Site-wide SVG definitions for the drawn layer.
 *
 * - #pencil: wobbles a line slightly and eats into it with paper grain,
 *   so vector strokes read as coloured pencil rather than CAD.
 * - #h-<ink>: diagonal hatching used as fills, the way coloured pencil
 *   is laid down. Use as fill="url(#h-rust)".
 *
 * Wrapped around every page by Docusaurus (src/theme/Root).
 */
const HATCHES: [string, string, number][] = [
  // id, colour, opacity. Laid on firmly, the way Chemin colours.
  ['ink', '#173a77', 0.7],
  ['rust', '#b4532c', 0.85],
  ['verdigris', '#3f7a64', 0.85],
  ['plum', '#7a4672', 0.85],
  ['ochre', '#a7802a', 0.9],
  ['peony', '#d0628a', 0.9],
  ['leaf', '#7c9c43', 0.9],
  ['sky', '#6fa3c2', 0.9],
  ['lemon', '#e2b83a', 0.95],
];

function DrawingDefs(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="pencil" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="drawn" />
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="9" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.05 1.3"
            result="tooth"
          />
          <feComposite in="drawn" in2="tooth" operator="in" />
        </filter>
        {HATCHES.map(([id, colour, opacity]) => (
          <pattern
            key={id}
            id={`h-${id}`}
            width="2.6"
            height="2.6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-38)"
          >
            <line x1="0" y1="0" x2="0" y2="2.6" stroke={colour} strokeWidth="1.35" opacity={opacity} />
          </pattern>
        ))}
      </defs>
    </svg>
  );
}

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <DrawingDefs />
      {children}
    </>
  );
}
