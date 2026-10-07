import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Paper} from './Paper';
import {Frame} from './Frame';

type Props = {
  children: React.ReactNode;
  /** Direction of the Ken Burns drift: [dx, dy] in px over the whole scene. */
  drift?: [number, number];
  zoom?: [number, number];
  tone?: 'ivory' | 'maroon';
  frame?: boolean;
};

/** Paper + border + slow Ken Burns drift so nothing is ever fully static. */
export const SceneShell: React.FC<Props> = ({
  children,
  drift = [-14, -22],
  zoom = [1.0, 1.055],
  tone = 'ivory',
  frame: showFrame = true,
}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(f, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp'});
  const scale = zoom[0] + (zoom[1] - zoom[0]) * t;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translate(${drift[0] * t}px, ${drift[1] * t}px) scale(${scale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <Paper tone={tone} />
        {children}
      </AbsoluteFill>
      {showFrame ? <Frame delay={8} /> : null}
    </AbsoluteFill>
  );
};
