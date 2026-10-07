import React, {useMemo} from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

type Props = {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  /** frame at which the first letter starts being written */
  delay?: number;
  /** frames each letter takes to draw */
  letterFrames?: number;
  /** frames between letter starts */
  stagger?: number;
  strokeWidth?: number;
};

const measure = (text: string, font: string) => {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.font = font;
  const xs = Array.from(text).map((ch, i) => ctx.measureText(text.slice(0, i + 1)).width - ctx.measureText(ch).width);
  return {xs, total: ctx.measureText(text).width};
};

/**
 * "Writes" text on: every letter is stroked via stroke-dashoffset, then its fill fades in.
 * Letter x-positions are measured with canvas so kerning/joins of the script font are kept.
 */
export const WriteOn: React.FC<Props> = ({
  text,
  fontFamily,
  fontSize,
  color,
  delay = 0,
  letterFrames = 22,
  stagger = 5,
  strokeWidth = 2.4,
}) => {
  const frame = useCurrentFrame();
  const {xs, total} = useMemo(() => measure(text, `${fontSize}px ${fontFamily}`), [text, fontSize, fontFamily]);
  const dash = fontSize * 6;
  const height = fontSize * 1.7;
  const pad = fontSize * 0.25;
  return (
    <svg
      width={total + pad * 2}
      height={height}
      viewBox={`${-pad} 0 ${total + pad * 2} ${height}`}
      style={{overflow: 'visible', display: 'block'}}
    >
      {Array.from(text).map((ch, i) => {
        if (ch === ' ') return null;
        const start = delay + i * stagger;
        const p = interpolate(frame, [start, start + letterFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.inOut(Easing.quad),
        });
        const fillOpacity = interpolate(p, [0.55, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <text
            key={i}
            x={xs[i]}
            y={fontSize * 1.15}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fill={color}
            fillOpacity={fillOpacity}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={dash}
            strokeDashoffset={dash * (1 - p)}
            strokeOpacity={p > 0 ? 1 : 0}
          >
            {ch}
          </text>
        );
      })}
    </svg>
  );
};
