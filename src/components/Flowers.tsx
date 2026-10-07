import React from 'react';
import {COLORS} from '../config';

export const Marigold: React.FC<{r: number}> = ({r}) => (
  <g>
    {Array.from({length: 14}, (_, i) => (
      <ellipse key={`o${i}`} cx={0} cy={-r * 0.62} rx={r * 0.27} ry={r * 0.4} fill={COLORS.marigold} stroke={COLORS.marigoldDeep} strokeWidth={r * 0.03} transform={`rotate(${(i * 360) / 14})`} />
    ))}
    {Array.from({length: 10}, (_, i) => (
      <ellipse key={`i${i}`} cx={0} cy={-r * 0.38} rx={r * 0.2} ry={r * 0.3} fill={COLORS.marigoldLight} transform={`rotate(${(i * 360) / 10 + 13})`} />
    ))}
    <circle r={r * 0.2} fill={COLORS.marigoldDeep} />
    <circle r={r * 0.09} fill="#F9D26B" />
  </g>
);

export const Jasmine: React.FC<{r: number}> = ({r}) => (
  <g>
    {Array.from({length: 6}, (_, i) => (
      <ellipse key={i} cx={0} cy={-r * 0.5} rx={r * 0.26} ry={r * 0.5} fill={COLORS.jasmine} stroke="#E4D8BE" strokeWidth={r * 0.04} transform={`rotate(${(i * 360) / 6})`} />
    ))}
    <circle r={r * 0.16} fill="#EBD58B" />
  </g>
);

export const Leaf: React.FC<{len: number; rot: number; fill?: string}> = ({len, rot, fill = COLORS.banana}) => (
  <path
    d={`M0,0 C${len * 0.3},${-len * 0.25} ${len * 0.3},${-len * 0.7} 0,${-len} C${-len * 0.3},${-len * 0.7} ${-len * 0.3},${-len * 0.25} 0,0Z`}
    fill={fill}
    transform={`rotate(${rot})`}
  />
);
