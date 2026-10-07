import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {Garland} from '../components/Garland';
import {Reveal} from '../components/Reveal';
import {GoldDivider} from '../components/GoldDivider';
import {Diya} from '../components/Diya';
import {Kalash} from '../components/Kalash';
import {COLORS, TEXT} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

/** 40–45s: closing line + sign-off. Petals intensify globally; WeddingInvite fades the whole thing to cream. */
export const Scene7Closing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell drift={[-8, -14]}>
      <Garland variant="mixed" strands={9} maxLength={300} seed="close" delay={0} />
      <div style={{position: 'absolute', left: 100, right: 100, top: 640, textAlign: 'center'}}>
        <Reveal delay={12} duration={32}>
          <div style={{fontFamily: FONTS.body, fontStyle: 'italic', fontWeight: 500, fontSize: 80, lineHeight: 1.25, color: COLORS.maroon}}>{TEXT.closing}</div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1060, display: 'flex', justifyContent: 'center'}}>
        <GoldDivider delay={40} width={560} />
      </div>
      <div style={{position: 'absolute', left: 120, right: 120, top: 1130, textAlign: 'center'}}>
        <Reveal delay={46} duration={36} spacing={[0.05, 0]}>
          <div style={{fontFamily: FONTS.script, fontSize: 112, lineHeight: 1.2, color: COLORS.goldDeep}}>{TEXT.signOff}</div>
        </Reveal>
      </div>
      <Kalash size={150} style={{position: 'absolute', left: 130, top: 1530, opacity: prog(frame, 40, 30)}} />
      <Diya size={150} seed="close-diya" style={{position: 'absolute', right: 130, top: 1565, opacity: prog(frame, 40, 30)}} />
    </SceneShell>
  );
};
