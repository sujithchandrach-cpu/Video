import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS} from '../config';
import {prog} from '../anim';

/** Ornamental divider: lines grow from a centre lotus/diamond. */
export const GoldDivider: React.FC<{width?: number; delay?: number; duration?: number; color?: string}> = ({
  width = 620,
  delay = 0,
  duration = 34,
  color = COLORS.gold,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, duration);
  const half = width / 2;
  const gap = 46;
  const len = half - gap;
  return (
    <svg width={width} height={48} viewBox={`${-half} -24 ${width} 48`} style={{display: 'block', overflow: 'visible'}}>
      <g opacity={p}>
        <path d="M0,-12 L12,0 L0,12 L-12,0Z" fill={color} />
        <path d="M0,-20 Q10,-10 0,-2 Q-10,-10 0,-20Z" fill="none" stroke={color} strokeWidth={1.5} transform="translate(0,-4) scale(0.8)" />
        <circle cx={-26} cy={0} r={3.5} fill={color} />
        <circle cx={26} cy={0} r={3.5} fill={color} />
      </g>
      <g stroke={color} strokeWidth={2} strokeLinecap="round">
        <line x1={-gap} y1={0} x2={-gap - len * p} y2={0} />
        <line x1={gap} y1={0} x2={gap + len * p} y2={0} />
        <line x1={-gap} y1={5} x2={-gap - len * p * 0.7} y2={5} opacity={0.6} strokeWidth={1} />
        <line x1={gap} y1={5} x2={gap + len * p * 0.7} y2={5} opacity={0.6} strokeWidth={1} />
      </g>
    </svg>
  );
};
