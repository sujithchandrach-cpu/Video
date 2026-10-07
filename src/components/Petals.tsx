import React from 'react';
import {interpolate, random, useCurrentFrame} from 'remotion';
import {COLORS, VIDEO} from '../config';

const PALETTE = [COLORS.rose, COLORS.roseDark, COLORS.marigold, COLORS.marigoldLight, COLORS.rose, COLORS.jasmine];
const MAX = 120;

type Props = {
  /** Number of petals visible at a given frame; defaults to 40. */
  count?: (frame: number) => number;
  seed?: string;
};

/** Deterministic falling petals (rose, marigold, jasmine). All randomness comes from random(seed). */
export const Petals: React.FC<Props> = ({count = () => 40, seed = 'petal'}) => {
  const frame = useCurrentFrame();
  const active = Math.min(MAX, Math.round(count(frame)));
  const {width: W, height: H} = VIDEO;
  const items = [];
  for (let i = 0; i < active; i++) {
    const r = (k: string) => random(`${seed}-${i}-${k}`);
    const size = 16 + r('s') * 22;
    const speed = 1.8 + r('v') * 2.6; // px / frame
    const span = H + 240;
    const y = ((r('y') * span + frame * speed) % span) - 120;
    const baseX = r('x') * (W + 120) - 60;
    const sway = 30 + r('sw') * 70;
    const x = baseX + Math.sin(frame / (28 + r('f') * 30) + r('p') * 6.28) * sway;
    const rot = r('r') * 360 + frame * (1 + r('rs') * 3) * (r('d') > 0.5 ? 1 : -1);
    const flip = Math.cos(frame / (14 + r('t') * 16) + r('q') * 6.28);
    const color = PALETTE[Math.floor(r('c') * PALETTE.length)];
    const fade = interpolate(y, [-120, -40, H - 80, H + 100], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    items.push(
      <g key={i} transform={`translate(${x},${y}) rotate(${rot}) scale(${size * (0.35 + 0.65 * Math.abs(flip))},${size})`} opacity={0.9 * fade}>
        <path d="M0,-1 C0.85,-0.55 0.8,0.55 0,1 C-0.8,0.55 -0.85,-0.55 0,-1Z" fill={color} />
        <path d="M0,-0.9 Q0.08,0 0,0.9" stroke="rgba(0,0,0,0.18)" strokeWidth={0.05} fill="none" />
      </g>,
    );
  }
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {items}
    </svg>
  );
};
