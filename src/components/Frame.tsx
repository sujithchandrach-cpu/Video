import React from 'react';
import {COLORS, VIDEO} from '../config';
import {prog} from '../anim';
import {useCurrentFrame} from 'remotion';

/** Thin gold double-line border with ornamental corners that draw themselves in. */
export const Frame: React.FC<{outer?: number; inner?: number; delay?: number}> = ({
  outer = 36,
  inner = 46,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, 40);
  const {width: W, height: H} = VIDEO;
  const rect = (i: number) => `M${i},${i} H${W - i} V${H - i} H${i} Z`;
  const perim = 2 * (W + H);
  const corner = (x: number, y: number, sx: number, sy: number) => (
    <g transform={`translate(${x},${y}) scale(${sx},${sy})`} opacity={p}>
      <path d="M0,0 Q26,0 30,30 Q30,12 56,10" fill="none" stroke={COLORS.gold} strokeWidth={2} />
      <circle cx={34} cy={34} r={5} fill={COLORS.gold} />
    </g>
  );
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <path
        d={rect(outer)}
        fill="none"
        stroke={COLORS.gold}
        strokeWidth={3}
        strokeDasharray={perim}
        strokeDashoffset={perim * (1 - p)}
      />
      <path
        d={rect(inner)}
        fill="none"
        stroke={COLORS.gold}
        strokeWidth={1.5}
        strokeDasharray={perim}
        strokeDashoffset={perim * (1 - p)}
      />
      {corner(inner + 8, inner + 8, 1, 1)}
      {corner(W - inner - 8, inner + 8, -1, 1)}
      {corner(inner + 8, H - inner - 8, 1, -1)}
      {corner(W - inner - 8, H - inner - 8, -1, -1)}
    </svg>
  );
};
