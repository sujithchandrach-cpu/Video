import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS, VIDEO} from '../config';

/** Textured paper: flat cream + SVG noise + mottling + soft vignette. */
export const Paper: React.FC<{tone?: 'ivory' | 'maroon'}> = ({tone = 'ivory'}) => {
  const maroon = tone === 'maroon';
  return (
    <AbsoluteFill
      style={{
        background: maroon
          ? `radial-gradient(ellipse at 50% 45%, #94303f 0%, ${COLORS.maroon} 55%, ${COLORS.maroonDark} 100%)`
          : COLORS.paper,
      }}
    >
      <svg width={VIDEO.width} height={VIDEO.height} style={{position: 'absolute', inset: 0}}>
        <defs>
          <filter id={`grain-${tone}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" stitchTiles="stitch" />
            <feColorMatrix
              values={
                maroon
                  ? '0 0 0 0 0.95  0 0 0 0 0.8  0 0 0 0 0.6  0 0 0 0.7 -0.25'
                  : '0 0 0 0 0.42  0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0.9 -0.3'
              }
            />
          </filter>
          <filter id={`mottle-${tone}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.014" numOctaves="3" seed="21" />
            <feColorMatrix
              values={
                maroon
                  ? '0 0 0 0 0.2  0 0 0 0 0.02  0 0 0 0 0.05  0 0 0 0.9 -0.3'
                  : '0 0 0 0 0.72  0 0 0 0 0.55  0 0 0 0 0.32  0 0 0 0.9 -0.3'
              }
            />
          </filter>
        </defs>
        <rect width={VIDEO.width} height={VIDEO.height} filter={`url(#mottle-${tone})`} opacity={0.22} />
        <rect width={VIDEO.width} height={VIDEO.height} filter={`url(#grain-${tone})`} opacity={0.4} />
      </svg>
      <AbsoluteFill
        style={{
          background: maroon
            ? 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(30,0,6,0.5) 100%)'
            : 'radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(140,98,40,0.2) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
