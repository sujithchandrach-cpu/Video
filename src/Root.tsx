import React from 'react';
import {Composition} from 'remotion';
import {WeddingInvite} from './WeddingInvite';
import {TOTAL_FRAMES, VIDEO} from './config';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="WeddingInvite"
    component={WeddingInvite}
    durationInFrames={TOTAL_FRAMES}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
  />
);
