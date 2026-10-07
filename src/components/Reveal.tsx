import React from 'react';
import {useCurrentFrame} from 'remotion';
import {prog} from '../anim';

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  lift?: number;
  /** letter-spacing in em at start → end (settles) */
  spacing?: [number, number];
  style?: React.CSSProperties;
};

/** Soft fade + upward slide + slight letter-spacing settle. */
export const Reveal: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 28,
  lift = 36,
  spacing = [0.1, 0.02],
  style,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, duration);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * lift}px)`,
        letterSpacing: `${spacing[0] + (spacing[1] - spacing[0]) * p}em`,
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
