import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {BananaLeaves} from '../components/BananaLeaf';
import {Reveal} from '../components/Reveal';
import {WriteOn} from '../components/WriteOn';
import {GoldDivider} from '../components/GoldDivider';
import {ChampagneIcon, KalashIcon} from '../components/Icons';
import {Thoranam} from '../components/Thoranam';
import {COLORS, TEXT} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

const label: React.CSSProperties = {fontFamily: FONTS.label, fontWeight: 600, fontSize: 54, letterSpacing: '0.16em', color: COLORS.maroon};
const date: React.CSSProperties = {fontFamily: FONTS.body, fontWeight: 600, fontSize: 60, fontVariantNumeric: 'lining-nums', color: COLORS.ink, lineHeight: 1.2};
const time: React.CSSProperties = {fontFamily: FONTS.body, fontWeight: 500, fontSize: 56, fontVariantNumeric: 'lining-nums', color: COLORS.goldDeep, lineHeight: 1.25};

/** 23–34s: "Celebrations" card with two event blocks revealed in turn. */
export const Scene5Events: React.FC = () => {
  const frame = useCurrentFrame();
  const card = prog(frame, 4, 30);
  const E1 = 70;
  const E2 = 190;
  return (
    <SceneShell drift={[-10, 16]}>
      <BananaLeaves />
      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          top: 150,
          bottom: 150,
          background: COLORS.paperLight,
          opacity: card,
          transform: `translateY(${(1 - card) * 60}px)`,
          boxShadow: '0 30px 60px rgba(74,40,34,0.28), 0 0 0 1px rgba(184,146,90,0.4)',
        }}
      >
        <div style={{position: 'absolute', inset: 16, border: `2px solid ${COLORS.gold}`}} />
        <div style={{position: 'absolute', inset: 25, border: `1px solid ${COLORS.gold}`}} />
      </div>
      <Thoranam delay={10} leafLen={90} />
      <div style={{position: 'absolute', left: 130, right: 130, top: 270, display: 'flex', justifyContent: 'center'}}>
        <WriteOn text={TEXT.celebrationsTitle} fontFamily={FONTS.script} fontSize={170} color={COLORS.maroon} delay={24} stagger={4} letterFrames={22} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 540, display: 'flex', justifyContent: 'center'}}>
        <GoldDivider delay={56} width={560} />
      </div>

      {/* Event 1 */}
      <div style={{position: 'absolute', left: 130, right: 130, top: 610, textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', opacity: prog(frame, E1, 6)}}>
          <ChampagneIcon size={120} delay={E1} />
        </div>
        <Reveal delay={E1 + 18} style={{marginTop: 26}}><div style={label}>{TEXT.reception.label}</div></Reveal>
        <Reveal delay={E1 + 30} style={{marginTop: 18}}><div style={date}>{TEXT.reception.date}</div></Reveal>
        <Reveal delay={E1 + 42} style={{marginTop: 8}}><div style={time}>{TEXT.reception.time}</div></Reveal>
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, top: 1058, display: 'flex', justifyContent: 'center'}}>
        <GoldDivider delay={E2 - 50} width={420} />
      </div>

      {/* Event 2 */}
      <div style={{position: 'absolute', left: 130, right: 130, top: 1130, textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', opacity: prog(frame, E2, 6)}}>
          <KalashIcon size={120} delay={E2} />
        </div>
        <Reveal delay={E2 + 18} style={{marginTop: 26}}><div style={label}>{TEXT.muhurtham.label}</div></Reveal>
        <Reveal delay={E2 + 30} style={{marginTop: 18}}><div style={date}>{TEXT.muhurtham.date}</div></Reveal>
        <Reveal delay={E2 + 42} style={{marginTop: 8}}><div style={time}>{TEXT.muhurtham.time}</div></Reveal>
        <Reveal delay={E2 + 56} style={{marginTop: 8}}>
          <div style={{...time, fontStyle: 'italic', color: COLORS.maroon}}>{TEXT.muhurtham.lagna}</div>
        </Reveal>
      </div>
    </SceneShell>
  );
};
