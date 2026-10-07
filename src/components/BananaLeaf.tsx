import React, {useMemo} from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS, VIDEO} from '../config';

type LeafSpec = {x: number; y: number; rot: number; len: number; half: number; opacity?: number};

const Blade: React.FC<LeafSpec & {phase: number; id: string}> = ({x, y, rot, len, half, opacity = 1, phase, id}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 60 + phase) * 1.4;
  const {edge, veins, rib} = useMemo(() => {
    const w = (t: number) => half * Math.sin(Math.PI * Math.pow(t, 0.75)) * (1 - 0.2 * t);
    const N = 36;
    const right: string[] = [];
    const left: string[] = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const bend = 40 * t * t;
      right.push(`${bend + w(t)},${-len * t}`);
      left.unshift(`${bend - w(t)},${-len * t}`);
    }
    const edge = `M${right.join(' L')} L${left.join(' L')} Z`;
    let veins = '';
    for (let i = 1; i < 46; i++) {
      const t = i / 46;
      const bend = 40 * t * t;
      const t2 = Math.min(1, t + 0.05);
      const bend2 = 40 * t2 * t2;
      veins += `M${bend},${-len * t} L${bend + w(t2) * 0.96},${-len * t2} M${bend},${-len * t} L${bend - w(t2) * 0.96},${-len * t2} `;
    }
    const rib = `M0,0 Q${20},${-len / 2} 40,${-len}`;
    return {edge, veins, rib};
  }, [len, half]);
  return (
    <g transform={`translate(${x},${y}) rotate(${rot + sway})`} opacity={opacity}>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={COLORS.bananaDark} />
          <stop offset="0.5" stopColor={COLORS.banana} />
          <stop offset="1" stopColor={COLORS.bananaLight} />
        </linearGradient>
      </defs>
      <path d={edge} fill={`url(#${id})`} />
      <path d={veins} stroke={COLORS.bananaLight} strokeWidth={1.4} opacity={0.45} fill="none" />
      <path d={rib} stroke="#CFE0A8" strokeWidth={4} opacity={0.55} fill="none" strokeLinecap="round" />
    </g>
  );
};

/** Banana leaves framing the left and right edges. */
export const BananaLeaves: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  const {width: W, height: H} = VIDEO;
  const left: LeafSpec[] = [
    {x: -34, y: H + 60, rot: -3, len: 1500, half: 58},
    {x: -52, y: H + 40, rot: 5, len: 960, half: 52, opacity: 0.95},
    {x: -44, y: 1000, rot: 14, len: 420, half: 40, opacity: 0.9},
  ];
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity, overflow: 'visible'}}>
      {left.map((l, i) => (
        <Blade key={`l${i}`} {...l} phase={i * 1.7} id={`bl${i}`} />
      ))}
      <g transform={`translate(${W},0) scale(-1,1)`}>
        {left.map((l, i) => (
          <Blade key={`r${i}`} {...l} phase={i * 1.3 + 2} id={`br${i}`} />
        ))}
      </g>
    </svg>
  );
};
