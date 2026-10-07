import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {Garland} from '../components/Garland';
import {BananaLeaves} from '../components/BananaLeaf';
import {WriteOn} from '../components/WriteOn';
import {Reveal} from '../components/Reveal';
import {Kalash} from '../components/Kalash';
import {Diya} from '../components/Diya';
import {Kolam} from '../components/Kolam';
import {GoldDivider} from '../components/GoldDivider';
import {ASSETS, COLORS, TEXT} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

const row = (baseline: number, size: number): React.CSSProperties => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: baseline - size * 1.15,
  display: 'flex',
  justifyContent: 'center',
});

/** 11–18s: the names are written on; garlands sway; kalash and diya below. */
export const Scene3Names: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell drift={[-12, -26]}>
      <BananaLeaves />
      <Garland variant="mixed" strands={9} maxLength={380} seed="names" delay={4} sway={3} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 485, textAlign: 'center'}}>
        <Reveal delay={18} spacing={[0.4, 0.24]}>
          <div style={{fontFamily: FONTS.label, fontWeight: 600, fontSize: 46, color: COLORS.goldDeep}}>{TEXT.weddingInvitationLabel}</div>
        </Reveal>
      </div>
      <div style={row(800, 240)}>
        <WriteOn text={TEXT.names.first} fontFamily={FONTS.script} fontSize={240} color={COLORS.maroon} delay={28} stagger={6} letterFrames={26} />
      </div>
      <div style={row(965, 130)}>
        <WriteOn text={TEXT.names.connector} fontFamily={FONTS.script} fontSize={130} color={COLORS.gold} delay={92} stagger={7} letterFrames={22} strokeWidth={2} />
      </div>
      <div style={row(1235, 240)}>
        <WriteOn text={TEXT.names.second} fontFamily={FONTS.script} fontSize={240} color={COLORS.maroon} delay={116} stagger={6} letterFrames={26} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1370, display: 'flex', justifyContent: 'center'}}>
        <GoldDivider delay={150} width={700} />
      </div>
      <Kalash size={200} style={{position: 'absolute', left: 110, top: 1470, opacity: prog(frame, 40, 30)}} />
      <Diya size={200} seed="names-diya" style={{position: 'absolute', right: 110, top: 1520, opacity: prog(frame, 50, 30)}} />
      {ASSETS.useCoupleImage ? (
        <Img
          src={staticFile(ASSETS.coupleImage)}
          style={{position: 'absolute', left: 340, top: 1440, width: 400, height: 400, objectFit: 'cover', borderRadius: '50%', border: `4px solid ${COLORS.gold}`, opacity: prog(frame, 150, 30)}}
        />
      ) : (
        <div style={{position: 'absolute', left: 340, top: 1440, width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Kolam size={400} progress={prog(frame, 100, 100)} opacity={0.9} strokeWidth={2.6} />
        </div>
      )}
    </SceneShell>
  );
};
