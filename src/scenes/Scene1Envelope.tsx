import React from 'react';
import {SceneShell} from '../components/SceneShell';
import {Garland} from '../components/Garland';
import {Envelope} from '../components/Envelope';

/** 0–6s: cream envelope, wax seal cracks, flap opens, card slides up and fills the screen. */
export const Scene1Envelope: React.FC = () => (
  <SceneShell tone="maroon" frame={false} zoom={[1, 1.04]} drift={[0, -10]}>
    <Garland variant="marigold" strands={9} maxLength={420} seed="env" delay={6} />
    <Envelope />
  </SceneShell>
);
