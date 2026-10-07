import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {BananaLeaves} from '../components/BananaLeaf';
import {Thoranam} from '../components/Thoranam';
import {Reveal} from '../components/Reveal';
import {WriteOn} from '../components/WriteOn';
import {GoldDivider} from '../components/GoldDivider';
import {PinIcon} from '../components/Icons';
import {COLORS, TEXT} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

/** 34–40s: VENUE label, script venue name, address; map pin drops in with a bounce. */
export const Scene6Venue: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drop = spring({frame: frame - 22, fps, config: {damping: 7, stiffness: 110, mass: 1.1}});
  const pinY = (1 - drop) * -760;
  const shadow = Math.min(1, drop);
  return (
    <SceneShell drift={[12, -18]}>
      <BananaLeaves />
      <Thoranam delay={4} leafLen={130} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative', width: 150, height: 200}}>
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 2,
              width: 110 * shadow,
              height: 22 * shadow,
              marginLeft: (110 - 110 * shadow) / 2,
              borderRadius: '50%',
              background: 'rgba(74,40,34,0.35)',
              filter: 'blur(5px)',
            }}
          />
          <div style={{position: 'absolute', left: 0, bottom: 14, transform: `translateY(${pinY}px)`}}>
            <PinIcon size={150} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 740, textAlign: 'center'}}>
        <Reveal delay={46} spacing={[0.5, 0.3]}>
          <div style={{fontFamily: FONTS.label, fontWeight: 600, fontSize: 56, color: COLORS.goldDeep}}>{TEXT.venue.label}</div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center'}}>
        <WriteOn text={TEXT.venue.name} fontFamily={FONTS.script} fontSize={250} color={COLORS.maroon} delay={58} stagger={6} letterFrames={24} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1160, display: 'flex', justifyContent: 'center'}}>
        <GoldDivider delay={96} />
      </div>
      <div style={{position: 'absolute', left: 100, right: 100, top: 1250, textAlign: 'center'}}>
        {TEXT.venue.addressLines.map((line, i) => (
          <Reveal key={line} delay={104 + i * 12}>
            <div style={{fontFamily: FONTS.body, fontWeight: 600, fontSize: i === 0 ? 68 : 60, color: i === 0 ? COLORS.maroon : COLORS.ink, lineHeight: 1.35}}>{line}</div>
          </Reveal>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1560, display: 'flex', justifyContent: 'center', opacity: prog(frame, 140, 20)}}>
        <GoldDivider delay={140} width={420} />
      </div>
    </SceneShell>
  );
};
