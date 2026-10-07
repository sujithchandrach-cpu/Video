import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import {fontsReady} from '../fonts';

/** Holds rendering until the Google Fonts have loaded (needed for text measuring). */
export const FontGate: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [handle] = useState(() => delayRender('Loading fonts', {timeoutInMilliseconds: 60000}));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fontsReady
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [handle]);
  return ready ? <>{children}</> : null;
};
