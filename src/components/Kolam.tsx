import React, {useMemo} from 'react';
import {COLORS} from '../config';
import {clamp01} from '../anim';

type Props = {
  size?: number;
  /** 0→1 overall drawing progress */
  progress: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
};

const rose = (R: number, k: number, rot: number) => {
  let d = '';
  for (let i = 0; i <= 480; i++) {
    const th = (i / 480) * Math.PI * 2;
    const r = R * Math.cos(k * th);
    const x = r * Math.cos(th + rot);
    const y = r * Math.sin(th + rot);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return d;
};

const scallops = (R: number, n: number, bulge: number) => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 1) / n) * Math.PI * 2;
    const p0 = [R * Math.cos(a0), R * Math.sin(a0)];
    const p1 = [R * Math.cos(a1), R * Math.sin(a1)];
    if (i === 0) d += `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} `;
    const chord = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
    d += `A${(chord * bulge).toFixed(1)},${(chord * bulge).toFixed(1)} 0 0 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)} `;
  }
  return d;
};

/** Kolam-style rosette (dots + looping petal lines) that draws itself. Centered at (0,0) of its own box. */
export const Kolam: React.FC<Props> = ({size = 900, progress, color = COLORS.gold, opacity = 1, strokeWidth = 3}) => {
  const R = size / 2;
  const layers = useMemo(
    () => [
      {d: `M${R * 0.97},0 A${R * 0.97},${R * 0.97} 0 1 1 ${-R * 0.97},0 A${R * 0.97},${R * 0.97} 0 1 1 ${R * 0.97},0`, a: 0, b: 0.25, w: 1},
      {d: `M${R * 0.93},0 A${R * 0.93},${R * 0.93} 0 1 1 ${-R * 0.93},0 A${R * 0.93},${R * 0.93} 0 1 1 ${R * 0.93},0`, a: 0.04, b: 0.28, w: 0.5},
      {d: scallops(R * 0.88, 24, 0.62), a: 0.15, b: 0.5, w: 1},
      {d: rose(R * 0.8, 4, 0), a: 0.3, b: 0.72, w: 1.2},
      {d: rose(R * 0.64, 4, Math.PI / 8), a: 0.42, b: 0.85, w: 1.2},
      {d: rose(R * 0.4, 3, Math.PI / 6), a: 0.55, b: 0.95, w: 1},
      {d: `M${R * 0.14},0 A${R * 0.14},${R * 0.14} 0 1 1 ${-R * 0.14},0 A${R * 0.14},${R * 0.14} 0 1 1 ${R * 0.14},0`, a: 0.8, b: 1, w: 1},
    ],
    [R],
  );
  const dots: {x: number; y: number; r: number; t: number}[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    dots.push({x: R * 0.92 * Math.cos(a), y: R * 0.92 * Math.sin(a), r: 5, t: 0.3 + i * 0.01});
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    dots.push({x: R * 0.8 * Math.cos(a), y: R * 0.8 * Math.sin(a), r: 7, t: 0.6 + i * 0.03});
  }
  return (
    <svg width={size} height={size} viewBox={`${-R} ${-R} ${size} ${size}`} style={{overflow: 'visible', opacity}}>
      {layers.map((l, i) => {
        const p = clamp01((progress - l.a) / (l.b - l.a));
        return (
          <path
            key={i}
            d={l.d}
            pathLength={1}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * l.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1 - p}
            opacity={p > 0 ? 1 : 0}
          />
        );
      })}
      {dots.map((d, i) => {
        const p = clamp01((progress - d.t) / 0.1);
        return <circle key={i} cx={d.x} cy={d.y} r={d.r * p} fill={color} />;
      })}
    </svg>
  );
};
