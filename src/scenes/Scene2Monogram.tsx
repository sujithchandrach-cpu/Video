import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneShell} from '../components/SceneShell';
import {Garland} from '../components/Garland';
import {WriteOn} from '../components/WriteOn';
import {Reveal} from '../components/Reveal';
import {GoldDivider} from '../components/GoldDivider';
import {COLORS, TEXT, VIDEO} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

const CY = 760;

/** 6–11s: large gold monogram that draws itself, opening line fades in below. */
export const Scene2Monogram: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = prog(frame, 14, 70);
  const R = 360;
  const circ = 2 * Math.PI * R;
  const size = 215;
  return (
    <SceneShell drift={[10, -20]}>
      <Garland variant="jasmine" strands={10} maxLength={260} seed="mono" delay={10} />
      <svg width={VIDEO.width} height={VIDEO.height} style={{position: 'absolute', inset: 0}}>
        {[R, R - 14].map((r, i) => (
          <circle
            key={r}
            cx={VIDEO.width / 2}
            cy={CY + 60}
            r={r}
            fill="none"
            stroke={COLORS.gold}
            strokeWidth={i ? 1.5 : 3}
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - ring)}
            transform={`rotate(-90 ${VIDEO.width / 2} ${CY + 60})`}
          />
        ))}
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: CY + 60 - size * 0.85, display: 'flex', justifyContent: 'center'}}>
        <WriteOn text={TEXT.monogram} fontFamily={FONTS.script} fontSize={size} color={COLORS.gold} delay={22} stagger={14} letterFrames={34} strokeWidth={3} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1230, display: 'flex', justifyContent: 'center'}}>
        <GoldDivider delay={70} />
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1310, textAlign: 'center'}}>
        <Reveal delay={84} duration={36}>
          <div style={{fontFamily: FONTS.body, fontStyle: 'italic', fontWeight: 500, fontSize: 64, lineHeight: 1.3, color: COLORS.maroon}}>{TEXT.opening}</div>
        </Reveal>
      </div>
    </SceneShell>
  );
};
