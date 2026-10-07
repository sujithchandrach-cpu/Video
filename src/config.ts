/**
 * Everything you are likely to edit lives here: text, dates, colours, timings.
 * Scenes read from this file; they contain no hard-coded copy.
 */

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  /** Reels / Status UI overlays the edges — keep all text inside this margin (px). */
  safeMargin: 90,
} as const;

export const COLORS = {
  paper: '#F7EFE2',
  paperLight: '#FCF7EC',
  gold: '#B8925A',
  goldDeep: '#8A6730',
  goldLight: '#E6CE95',
  maroon: '#7A1E2C',
  maroonDark: '#4B0F1A',
  marigold: '#E8892B',
  marigoldLight: '#F5B53F',
  marigoldDeep: '#C9650F',
  banana: '#3E6B3A',
  bananaDark: '#274A27',
  bananaLight: '#6F9C57',
  jasmine: '#FFFDF6',
  rose: '#D4607A',
  roseDark: '#B03F5B',
  ink: '#4A2822',
} as const;

export const TEXT = {
  monogram: 'A & K',
  sealLetters: 'A K',
  opening: 'Destiny brought us together, love will keep us forever.',
  weddingInvitationLabel: 'WEDDING INVITATION',
  names: {first: 'Aishwarya', connector: 'weds', second: 'Karthik'},
  inviteLead: 'Come celebrate with us',
  inviteMid: 'as we begin our',
  inviteScript: 'happily ever after',
  celebrationsTitle: 'Celebrations',
  reception: {
    label: 'RECEPTION',
    date: 'Saturday, 14th November 2026',
    time: '7:00 PM onwards',
  },
  muhurtham: {
    label: 'MUHURTHAM',
    date: 'Sunday, 15th November 2026',
    time: '10:15 AM',
    lagna: 'Lagna: Dhanur',
  },
  venue: {
    label: 'VENUE',
    name: 'Toranam',
    addressLines: [
      'Hotel Priyadarshini,',
      'Yalamanchili Complex,',
      'Station Road, Hosapete',
    ],
  },
  closing: "We can't say 'I do' without our friends by our side!",
  signOff: 'to love, laughter, and happily ever after',
} as const;

/** Scene lengths in seconds. Total video length = sum of these (transitions overlap, not add). */
export const SCENE_SECONDS = {
  envelope: 6,
  monogram: 5,
  names: 7,
  invite: 5,
  events: 11,
  venue: 6,
  closing: 5,
} as const;

/** Crossfade / paper-slide length between scenes, in seconds. */
export const TRANSITION_SECONDS = 0.5;

export const ASSETS = {
  /** Set true and drop a PNG in public/assets/ to show it in the Names scene. */
  useCoupleImage: false,
  coupleImage: 'assets/couple.png',
  /** Optional soundtrack: place your own file at public/music.mp3. */
  music: 'music.mp3',
  musicFadeInSeconds: 1,
  musicFadeOutSeconds: 2,
  musicVolume: 0.8,
} as const;

export const SCENE_NAMES = Object.keys(SCENE_SECONDS) as (keyof typeof SCENE_SECONDS)[];

export const TOTAL_SECONDS = Object.values(SCENE_SECONDS).reduce((a, b) => a + b, 0);
export const TOTAL_FRAMES = TOTAL_SECONDS * VIDEO.fps;
