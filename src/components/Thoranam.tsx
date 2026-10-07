import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS, VIDEO} from '../config';
import {prog} from '../anim';
import {Marigold} from './Flowers';

const MangoLeaf: React.FC<{len: number; shade: string}> = ({len, shade}) => (
  <g>
    <path d={`M0,0 C${len * 0.2},${len * 0.2} ${len * 0.2},${len * 0.75} 0,${len} C${-len * 0.2},${len * 0.75} ${-len * 0.2},${len * 0.2} 0,0Z`} fill={shade} />
    <path d={`M0,0 L0,${len * 0.95}`} stroke={COLORS.bananaLight} strokeWidth={1.8} opacity={0.8} />
  </g>
);

/** Mango-leaf door-hanging (thoranam): leaves along a swag with marigold beads. */
export const Thoranam: React.FC<{delay?: number; leafLen?: number}> = ({delay = 0, leafLen = 120}) => {
  const frame = useCurrentFrame();
  const W = VIDEO.width;
  const p = prog(frame, delay, 40);
  const y = (x: number) => 30 + 44 * Math.sin((Math.PI * x) / W);
  const n = Math.round(W / 48);
  const parts = [];
  let d = '';
  for (let x = 0; x <= W; x += 8) d += `${x === 0 ? 'M' : 'L'}${x},${y(x)} `;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * W;
    const swing = Math.sin(frame / 38 + i * 0.7) * 2.2;
    const visible = i / n <= p;
    if (!visible) continue;
    parts.push(
      <g key={i} transform={`translate(${x},${y(x)}) rotate(${swing})`}>
        {i % 4 === 2 ? (
          <g>
            <line y1={0} y2={leafLen * 0.8} stroke={COLORS.goldDeep} strokeWidth={2} />
            <g transform={`translate(0,${leafLen * 0.8})`}>
              <Marigold r={21} />
            </g>
          </g>
        ) : (
          <MangoLeaf len={leafLen * (0.85 + 0.15 * Math.sin(i * 1.3))} shade={i % 2 ? COLORS.banana : COLORS.bananaDark} />
        )}
      </g>,
    );
  }
  return (
    <svg width={W} height={leafLen + 140} style={{position: 'absolute', top: 0, left: 0, overflow: 'visible'}}>
      <path d={d} stroke={COLORS.goldDeep} strokeWidth={4} fill="none" />
      {parts}
    </svg>
  );
};
