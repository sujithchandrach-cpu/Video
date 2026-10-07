import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {Kolam} from '../components/Kolam';
import {Reveal} from '../components/Reveal';
import {GoldDivider} from '../components/GoldDivider';
import {Garland} from '../components/Garland';
import {COLORS, TEXT} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

/** 18–23s: invite line over a kolam that draws itself. */
export const Scene4Invite: React.FC = () => {
  const frame = useCurrentFrame();
  const body: React.CSSProperties = {fontFamily: FONTS.body, fontStyle: 'italic', fontWeight: 500, fontSize: 78, color: COLORS.maroon, lineHeight: 1.2, textShadow: `0 0 18px ${COLORS.paper}, 0 0 8px ${COLORS.paper}`};
  return (
    <SceneShell drift={[14, 18]} zoom={[1.0, 1.06]}>
      <Garland variant="marigold" strands={7} maxLength={240} seed="invite" delay={4} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 960 - 520, display: 'flex', justifyContent: 'center'}}>
        <Kolam size={1040} progress={prog(frame, 10, 100, undefined)} opacity={0.34} strokeWidth={2.4} />
      </div>
      <div style={{position: 'absolute', left: 100, right: 100, top: 780, textAlign: 'center'}}>
        <Reveal delay={26}><div style={body}>{TEXT.inviteLead}</div></Reveal>
        <Reveal delay={40}><div style={body}>{TEXT.inviteMid}</div></Reveal>
        <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0 0'}}>
          <GoldDivider delay={52} width={520} />
        </div>
        <Reveal delay={62} duration={36} spacing={[0.06, 0]}>
          <div style={{fontFamily: FONTS.script, fontSize: 150, color: COLORS.maroon, lineHeight: 1.1, textShadow: `0 0 18px ${COLORS.paper}, 0 0 8px ${COLORS.paper}`}}>{TEXT.inviteScript}</div>
        </Reveal>
      </div>
    </SceneShell>
  );
};
