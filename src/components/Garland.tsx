import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {COLORS, VIDEO} from '../config';
import {prog} from '../anim';
import {Jasmine, Leaf, Marigold} from './Flowers';

type Props = {
  variant?: 'marigold' | 'jasmine' | 'mixed';
  strands?: number;
  /** longest strand length in px */
  maxLength?: number;
  seed?: string;
  delay?: number;
  /** sway amplitude in degrees */
  sway?: number;
};

const SWAG_SEGMENTS = 3;
const SAG = 70;

/** Top-edge swag with marigold / jasmine strands hanging down and swaying. */
export const Garland: React.FC<Props> = ({
  variant = 'mixed',
  strands = 9,
  maxLength = 520,
  seed = 'garland',
  delay = 0,
  sway = 2.4,
}) => {
  const frame = useCurrentFrame();
  const W = VIDEO.width;
  const drop = prog(frame, delay, 36);
  const segW = W / SWAG_SEGMENTS;
  const pick = (i: number) => (variant === 'mixed' ? (i % 3 === 2 ? 'jasmine' : 'marigold') : variant);
  const swagY = (x: number) => 24 + SAG * Math.sin(Math.PI * ((x % segW) / segW));

  // swag flowers
  const swag = [];
  const step = 40;
  for (let x = 0; x <= W; x += step) {
    const kind = pick(Math.round(x / step));
    swag.push(
      <g key={`s${x}`} transform={`translate(${x},${swagY(x)})`}>
        {kind === 'marigold' ? <Marigold r={25} /> : <Jasmine r={24} />}
      </g>,
    );
  }
  let swagPath = '';
  for (let x = 0; x <= W; x += 10) swagPath += `${x === 0 ? 'M' : 'L'}${x},${swagY(x)} `;

  // strands
  const items = [];
  for (let s = 0; s < strands; s++) {
    const x = ((s + 0.5) / strands) * W + (random(`${seed}-x${s}`) - 0.5) * 30;
    const len = maxLength * (0.35 + random(`${seed}-l${s}`) * 0.65);
    const kind = variant === 'mixed' ? (s % 2 ? 'jasmine' : 'marigold') : variant;
    const topY = swagY(x);
    const angle = Math.sin(frame / (46 + s * 3.1) + random(`${seed}-p${s}`) * 6.28) * sway;
    const flowers = [];
    const gap = kind === 'marigold' ? 40 : 30;
    const n = Math.floor((len * drop) / gap);
    for (let k = 1; k <= n; k++) {
      const y = k * gap;
      const jas = kind === 'jasmine' || (kind === 'marigold' && k % 5 === 0);
      flowers.push(
        <g key={k} transform={`translate(0,${y})`}>
          {jas ? <Jasmine r={kind === 'jasmine' ? 15 : 17} /> : <Marigold r={20} />}
          {k % 3 === 0 ? (
            <g transform="translate(0,0)">
              <Leaf len={22} rot={70} />
              <Leaf len={22} rot={-70} />
            </g>
          ) : null}
        </g>,
      );
    }
    items.push(
      <g key={s} transform={`translate(${x},${topY}) rotate(${angle})`}>
        <line x1={0} y1={0} x2={0} y2={len * drop} stroke={COLORS.goldDeep} strokeWidth={2.5} />
        {flowers}
        {n > 2 ? <circle cx={0} cy={n * gap + 14} r={8} fill={kind === 'marigold' ? COLORS.marigoldDeep : COLORS.gold} /> : null}
      </g>,
    );
  }

  return (
    <svg width={W} height={maxLength + 160} style={{position: 'absolute', top: 0, left: 0, overflow: 'visible'}}>
      <path d={swagPath} stroke={COLORS.goldDeep} strokeWidth={3} fill="none" />
      {items}
      {swag}
    </svg>
  );
};
