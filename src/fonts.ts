import {loadFont as loadGreatVibes} from '@remotion/google-fonts/GreatVibes';
import {loadFont as loadCinzel} from '@remotion/google-fonts/Cinzel';
import {loadFont as loadCormorant} from '@remotion/google-fonts/CormorantGaramond';

const greatVibes = loadGreatVibes('normal', {weights: ['400'], subsets: ['latin']});
const cinzel = loadCinzel('normal', {weights: ['400', '600'], subsets: ['latin']});
const cormorant = loadCormorant('normal', {weights: ['400', '500', '600'], subsets: ['latin']});
const cormorantItalic = loadCormorant('italic', {weights: ['400', '500'], subsets: ['latin']});

export const FONTS = {
  script: greatVibes.fontFamily,
  label: cinzel.fontFamily,
  body: cormorant.fontFamily,
};

export const fontsReady = Promise.all(
  [greatVibes, cinzel, cormorant, cormorantItalic].map((f) => f.waitUntilDone()),
);
