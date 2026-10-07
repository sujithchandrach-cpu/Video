import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Easing} from 'remotion';
import {COLORS, SCENE_SECONDS, TOTAL_FRAMES, TRANSITION_SECONDS, VIDEO} from './config';
import {FontGate} from './components/FontGate';
import {Petals} from './components/Petals';
import {MusicSlot} from './components/MusicSlot';
import {Scene1Envelope} from './scenes/Scene1Envelope';
import {Scene2Monogram} from './scenes/Scene2Monogram';
import {Scene3Names} from './scenes/Scene3Names';
import {Scene4Invite} from './scenes/Scene4Invite';
import {Scene5Events} from './scenes/Scene5Events';
import {Scene6Venue} from './scenes/Scene6Venue';
import {Scene7Closing} from './scenes/Scene7Closing';

const T = Math.round(TRANSITION_SECONDS * VIDEO.fps);
const timing = linearTiming({durationInFrames: T, easing: Easing.inOut(Easing.ease)});
const f = (s: number) => Math.round(s * VIDEO.fps);

const SCENES: {key: keyof typeof SCENE_SECONDS; C: React.FC; exit: 'fade' | 'slide'}[] = [
  {key: 'envelope', C: Scene1Envelope, exit: 'fade'},
  {key: 'monogram', C: Scene2Monogram, exit: 'fade'},
  {key: 'names', C: Scene3Names, exit: 'fade'},
  {key: 'invite', C: Scene4Invite, exit: 'slide'},
  {key: 'events', C: Scene5Events, exit: 'fade'},
  {key: 'venue', C: Scene6Venue, exit: 'fade'},
  {key: 'closing', C: Scene7Closing, exit: 'fade'},
];

/** Frames at which each scene starts (transitions overlap, so this is just the cumulative nominal time). */
const closingStart = f(
  SCENE_SECONDS.envelope + SCENE_SECONDS.monogram + SCENE_SECONDS.names + SCENE_SECONDS.invite + SCENE_SECONDS.events + SCENE_SECONDS.venue,
);

export const WeddingInvite: React.FC = () => {
  const frame = useCurrentFrame();
  const petalCount = (fr: number) =>
    interpolate(fr, [0, 60, closingStart, closingStart + f(3)], [24, 40, 40, 85], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const fadeToCream = interpolate(frame, [TOTAL_FRAMES - f(1.6), TOTAL_FRAMES - 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <FontGate>
      <AbsoluteFill style={{background: COLORS.paper}}>
        <TransitionSeries>
          {SCENES.flatMap(({key, C, exit}, i) => {
            const last = i === SCENES.length - 1;
            const els = [
              <TransitionSeries.Sequence key={key} durationInFrames={f(SCENE_SECONDS[key]) + (last ? 0 : T)}>
                <C />
              </TransitionSeries.Sequence>,
            ];
            if (!last) {
              els.push(
                <TransitionSeries.Transition
                  key={`${key}-t`}
                  presentation={exit === 'slide' ? slide({direction: 'from-bottom'}) : fade()}
                  timing={timing}
                />,
              );
            }
            return els;
          })}
        </TransitionSeries>
        <Petals count={petalCount} />
        <AbsoluteFill style={{background: COLORS.paper, opacity: fadeToCream}} />
        <MusicSlot />
      </AbsoluteFill>
    </FontGate>
  );
};
