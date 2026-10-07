import {Easing, interpolate} from 'remotion';

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** 0→1 progress between start and start+duration frames, eased out. */
export const prog = (frame: number, start: number, duration: number, easing = Easing.out(Easing.cubic)) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const progInOut = (frame: number, start: number, duration: number) =>
  prog(frame, start, duration, Easing.inOut(Easing.cubic));

export const sec = (s: number, fps = 30) => Math.round(s * fps);
