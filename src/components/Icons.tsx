import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS} from '../config';
import {prog} from '../anim';

type IconProps = {size?: number; delay?: number; duration?: number; color?: string};

const Draw: React.FC<{paths: string[]; viewBox: string; size: number; p: number; color: string; stroke?: number}> = ({
  paths,
  viewBox,
  size,
  p,
  color,
  stroke = 3,
}) => (
  <svg width={size} height={size} viewBox={viewBox} style={{overflow: 'visible', display: 'block'}}>
    {paths.map((d, i) => (
      <path
        key={i}
        d={d}
        pathLength={1}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, Math.max(0, p * paths.length - i * 0.6))}
      />
    ))}
  </svg>
);

/** Two clinking champagne flutes (line icon). */
export const ChampagneIcon: React.FC<IconProps> = ({size = 110, delay = 0, duration = 40, color = COLORS.gold}) => {
  const p = prog(useCurrentFrame(), delay, duration);
  return (
    <Draw
      size={size}
      p={p}
      color={color}
      viewBox="0 0 100 100"
      paths={[
        'M18,14 L40,10 L46,42 C46,52 38,56 30,54 C24,52 22,46 21,40 Z',
        'M30,54 L34,80 M24,84 L44,80',
        'M82,14 L60,10 L54,42 C54,52 62,56 70,54 C76,52 78,46 79,40 Z',
        'M70,54 L66,80 M56,80 L76,84',
        'M50,2 L50,-4 M38,0 L34,-5 M62,0 L66,-5',
      ]}
    />
  );
};

/** Line-art kalash with leaves + coconut. */
export const KalashIcon: React.FC<IconProps> = ({size = 110, delay = 0, duration = 40, color = COLORS.gold}) => {
  const p = prog(useCurrentFrame(), delay, duration);
  return (
    <Draw
      size={size}
      p={p}
      color={color}
      viewBox="0 0 100 100"
      paths={[
        'M38,40 L62,40 L66,50 C84,58 86,82 70,92 L30,92 C14,82 16,58 34,50 Z',
        'M34,50 L66,50 M22,70 Q50,80 78,70',
        'M50,40 C34,32 26,18 26,10 C38,12 46,24 50,40 M50,40 C66,32 74,18 74,10 C62,12 54,24 50,40',
        'M50,36 C44,30 44,14 50,6 C56,14 56,30 50,36',
        'M50,12 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0',
      ]}
    />
  );
};

/** Gold map pin. Filled once drawn. */
export const PinIcon: React.FC<{size?: number; color?: string}> = ({size = 150, color = COLORS.gold}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{overflow: 'visible', display: 'block'}}>
    <defs>
      <linearGradient id="pin-g" x1="0" x2="1">
        <stop offset="0" stopColor={COLORS.goldDeep} />
        <stop offset="0.4" stopColor="#E9CF8F" />
        <stop offset="1" stopColor={color} />
      </linearGradient>
    </defs>
    <path d="M50,126 C50,126 6,76 6,46 C6,20 26,4 50,4 C74,4 94,20 94,46 C94,76 50,126 50,126Z" fill="url(#pin-g)" stroke={COLORS.goldDeep} strokeWidth={3} />
    <circle cx={50} cy={46} r={18} fill={COLORS.paper} stroke={COLORS.goldDeep} strokeWidth={3} />
    <circle cx={50} cy={46} r={7} fill={COLORS.maroon} />
  </svg>
);
