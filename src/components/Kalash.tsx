import React, {useId} from 'react';
import {COLORS} from '../config';
import {Leaf, Marigold} from './Flowers';

type Props = {size?: number; style?: React.CSSProperties; fillProgress?: number};

/** Brass kalash with mango leaves and a coconut. viewBox is 200×300. */
export const Kalash: React.FC<Props> = ({size = 220, style}) => {
  const id = useId();
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 200 300" style={{overflow: 'visible', ...style}}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor="#7A5520" />
          <stop offset="0.3" stopColor="#F3D98F" />
          <stop offset="0.55" stopColor="#C99B4A" />
          <stop offset="1" stopColor="#6E4A18" />
        </linearGradient>
        <radialGradient id={`${id}c`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#A9743F" />
          <stop offset="1" stopColor="#5A361B" />
        </radialGradient>
      </defs>
      {/* mango leaves */}
      <g transform="translate(100,92)">
        {[-62, -34, 34, 62].map((a) => (
          <Leaf key={a} len={96} rot={a} fill={Math.abs(a) > 40 ? COLORS.bananaDark : COLORS.banana} />
        ))}
      </g>
      {/* coconut */}
      <g transform="translate(100,62)">
        <circle r={36} fill={`url(#${id}c)`} />
        {[-26, -14, 0, 14, 26].map((x) => (
          <path key={x} d={`M${x},-34 Q${x * 0.4},0 ${x},34`} stroke="#3D2410" strokeWidth={1.3} fill="none" opacity={0.5} />
        ))}
        <circle cx={-9} cy={10} r={3.3} fill="#2D190A" />
        <circle cx={9} cy={10} r={3.3} fill="#2D190A" />
        <circle cx={0} cy={20} r={3.3} fill="#2D190A" />
        <path d="M-10,-34 Q0,-52 10,-34 Q0,-40 -10,-34Z" fill="#8A5C2E" />
      </g>
      {/* neck + rim */}
      <path d="M72,110 L128,110 L134,140 L66,140 Z" fill={`url(#${id}b)`} />
      <ellipse cx={100} cy={108} rx={36} ry={8} fill={`url(#${id}b)`} stroke="#8A6428" strokeWidth={1.5} />
      {/* body */}
      <path d="M66,136 C8,160 4,236 56,268 L144,268 C196,236 192,160 134,136 Z" fill={`url(#${id}b)`} />
      <path d="M44,262 L156,262 L164,282 L36,282 Z" fill={`url(#${id}b)`} />
      <ellipse cx={100} cy={282} rx={64} ry={7} fill="#6E4A18" />
      {/* bands */}
      <path d="M22,190 Q100,214 178,190" stroke={COLORS.maroon} strokeWidth={5} fill="none" />
      <path d="M26,204 Q100,228 174,204" stroke="#FFF3D4" strokeWidth={2.5} fill="none" strokeDasharray="1 9" strokeLinecap="round" />
      <path d="M72,140 Q100,150 128,140" stroke={COLORS.maroon} strokeWidth={4} fill="none" />
      {/* kumkum dots */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={78 + i * 22} cy={236 + (i === 1 ? 4 : 0)} r={5} fill={COLORS.maroon} />
      ))}
      {/* little marigolds at neck */}
      <g transform="translate(70,128)"><Marigold r={9} /></g>
      <g transform="translate(130,128)"><Marigold r={9} /></g>
    </svg>
  );
};
