import React, {useId} from 'react';
import {random, useCurrentFrame} from 'remotion';

type Props = {size?: number; seed?: string; style?: React.CSSProperties};

/** Brass lamp with a deterministic flickering flame. viewBox 0 0 200 220. */
export const Diya: React.FC<Props> = ({size = 200, seed = 'diya', style}) => {
  const id = useId();
  const frame = useCurrentFrame();
  const n = random(`${seed}-${Math.floor(frame / 2)}`);
  const n2 = random(`${seed}-b-${Math.floor(frame / 3)}`);
  const flick = 1 + 0.07 * Math.sin(frame / 3) + (n - 0.5) * 0.14;
  const lean = Math.sin(frame / 7) * 3 + (n2 - 0.5) * 5;
  const glow = 0.5 + 0.18 * Math.sin(frame / 5) + (n - 0.5) * 0.2;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" style={{overflow: 'visible', ...style}}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor="#7A5520" />
          <stop offset="0.35" stopColor="#F3D98F" />
          <stop offset="0.65" stopColor="#C99B4A" />
          <stop offset="1" stopColor="#6E4A18" />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#FFC764" stopOpacity={0.85} />
          <stop offset="0.5" stopColor="#FF9A2E" stopOpacity={0.3} />
          <stop offset="1" stopColor="#FF9A2E" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}f`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFF3B0" />
          <stop offset="0.45" stopColor="#FFB02E" />
          <stop offset="1" stopColor="#F2641B" />
        </linearGradient>
      </defs>
      <circle cx={100} cy={72} r={96} fill={`url(#${id}g)`} opacity={glow} />
      {/* base */}
      <path d="M78,176 L122,176 L134,206 L66,206 Z" fill={`url(#${id}b)`} />
      <ellipse cx={100} cy={206} rx={36} ry={6} fill="#6E4A18" />
      {/* bowl with pinched spout */}
      <path d="M14,118 C20,160 62,182 100,182 C138,182 180,160 186,118 Q100,142 14,118Z" fill={`url(#${id}b)`} />
      <path d="M14,118 Q100,142 186,118 Q100,102 14,118Z" fill="#E7B95E" stroke="#8A6428" strokeWidth={1.5} />
      <path d="M22,116 L2,98 Q14,112 30,120Z" fill={`url(#${id}b)`} />
      {/* oil + wick */}
      <ellipse cx={100} cy={118} rx={62} ry={9} fill="#B8742A" opacity={0.6} />
      <rect x={97} y={108} width={6} height={12} rx={3} fill="#3A2A1A" />
      {/* flame */}
      <g transform={`translate(100,110) rotate(${lean}) scale(${1 / flick},${flick})`}>
        <path d="M0,0 C-22,-12 -20,-44 0,-84 C20,-44 22,-12 0,0Z" fill={`url(#${id}f)`} />
        <path d="M0,-2 C-9,-8 -8,-26 0,-46 C8,-26 9,-8 0,-2Z" fill="#FFF8D2" opacity={0.9} />
      </g>
    </svg>
  );
};
