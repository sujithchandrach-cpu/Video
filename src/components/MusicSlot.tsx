import React, {useEffect, useState} from 'react';
import {Audio, continueRender, delayRender, interpolate, staticFile, useVideoConfig} from 'remotion';
import {ASSETS} from '../config';

/**
 * Plays public/music.mp3 if (and only if) it exists. Existence is probed with a HEAD request so
 * the project renders fine without any audio file. 1s fade in, 2s fade out (see config.ts).
 */
export const MusicSlot: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();
  const [handle] = useState(() => delayRender('Checking for music file'));
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(staticFile(ASSETS.music), {method: 'HEAD'})
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        if (!cancelled) setExists(res.ok && /audio|octet-stream|mpeg/i.test(type));
      })
      .catch(() => undefined)
      .finally(() => continueRender(handle));
    return () => {
      cancelled = true;
    };
  }, [handle]);

  if (!exists) return null;
  const fin = ASSETS.musicFadeInSeconds * fps;
  const fout = ASSETS.musicFadeOutSeconds * fps;
  return (
    <Audio
      src={staticFile(ASSETS.music)}
      volume={(f) =>
        ASSETS.musicVolume *
        interpolate(f, [0, fin, durationInFrames - fout, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      }
    />
  );
};
