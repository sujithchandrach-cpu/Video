import React from 'react';
import {Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {COLORS, TEXT, VIDEO} from '../config';
import {FONTS} from '../fonts';
import {prog} from '../anim';

const W = VIDEO.width;
const H = VIDEO.height;
// envelope geometry
const BX = 100;
const BY = 800;
const BW = 880;
const BH = 600;
const FLAP_TIP = BY + 335;
const CX = BX + BW / 2;

export const CARD_W = 720;
export const CARD_H = 1280;

/** Card face (used inside the envelope and zooming to fill the frame). */
const CardFace: React.FC = () => (
  <g>
    <rect width={CARD_W} height={CARD_H} fill={COLORS.paperLight} />
    <rect x={24} y={24} width={CARD_W - 48} height={CARD_H - 48} fill="none" stroke={COLORS.gold} strokeWidth={2.4} />
    <rect x={31} y={31} width={CARD_W - 62} height={CARD_H - 62} fill="none" stroke={COLORS.gold} strokeWidth={1.1} />
    <g transform={`translate(${CARD_W / 2},${CARD_H / 2})`}>
      <circle r={120} fill="none" stroke={COLORS.gold} strokeWidth={2} />
      <circle r={110} fill="none" stroke={COLORS.gold} strokeWidth={1} />
      {Array.from({length: 12}, (_, i) => (
        <path key={i} d="M0,-100 Q14,-70 0,-46 Q-14,-70 0,-100Z" fill="none" stroke={COLORS.gold} strokeWidth={1.4} transform={`rotate(${i * 30})`} />
      ))}
      <circle r={9} fill={COLORS.maroon} />
    </g>
  </g>
);

/** Cracking wax seal, two halves flying apart. */
const Seal: React.FC<{crack: number; fall: number}> = ({crack, fall}) => {
  const blob = (() => {
    let d = '';
    const n = 28;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 84 + (random(`seal-${i}`) - 0.5) * 12;
      d += `${i === 0 ? 'M' : 'L'}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `;
    }
    return d + 'Z';
  })();
  const shake = crack > 0 && crack < 1 ? Math.sin(crack * 40) * 3 : 0;
  const open = interpolate(crack, [0.5, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dx = open * 46;
  const rot = open * 14;
  const dy = fall * 150;
  const opacity = 1 - fall;
  const face = (
    <g>
      <path d={blob} fill="url(#wax)" stroke="#4B0F1A" strokeWidth={2} strokeLinejoin="round" />
      <circle r={66} fill="none" stroke="#9B3B4A" strokeWidth={3} />
      <circle r={58} fill="none" stroke="#5A1320" strokeWidth={1.5} />
      <text textAnchor="middle" y={20} fontFamily={FONTS.label} fontWeight={600} fontSize={52} letterSpacing={4} fill={COLORS.goldLight} stroke="#3A0B14" strokeWidth={0.8}>
        {TEXT.sealLetters}
      </text>
    </g>
  );
  return (
    <g transform={`translate(${CX + shake},${FLAP_TIP - 10})`} opacity={opacity}>
      <defs>
        <clipPath id="seal-l"><path d="M-120,-120 H-6 L10,-60 L-8,-10 L10,40 L-4,120 H-120Z" /></clipPath>
        <clipPath id="seal-r"><path d="M-6,-120 H120 V120 H-4 L10,40 L-8,-10 L10,-60Z" /></clipPath>
        <radialGradient id="wax" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#B04053" />
          <stop offset="0.6" stopColor={COLORS.maroon} />
          <stop offset="1" stopColor="#4B0F1A" />
        </radialGradient>
      </defs>
      <g transform={`translate(${-dx},${dy}) rotate(${-rot})`} clipPath="url(#seal-l)">{face}</g>
      <g transform={`translate(${dx},${dy * 1.15}) rotate(${rot})`} clipPath="url(#seal-r)">{face}</g>
      {crack > 0 && open < 0.2 ? <path d="M-6,-84 L10,-60 L-8,-10 L10,40 L-4,84" stroke="#2A0710" strokeWidth={3} fill="none" opacity={crack} /> : null}
    </g>
  );
};

/** Gold tassel hanging from the seal. */
const Tassel: React.FC<{frame: number; fall: number}> = ({frame, fall}) => {
  const swing = Math.sin(frame / 18) * 5;
  return (
    <g transform={`translate(${CX + 56},${FLAP_TIP + 40 + fall * 260}) rotate(${swing + fall * 25})`} opacity={1 - fall}>
      <path d="M0,0 C30,40 -10,70 12,120" stroke={COLORS.gold} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M0,0 C30,40 -10,70 12,120" stroke={COLORS.goldLight} strokeWidth={1.5} fill="none" strokeDasharray="2 6" />
      <g transform="translate(12,120)">
        <rect x={-9} y={-4} width={18} height={20} rx={5} fill={COLORS.gold} stroke={COLORS.goldDeep} strokeWidth={1.5} />
        <rect x={-11} y={6} width={22} height={5} fill={COLORS.goldDeep} />
        {Array.from({length: 11}, (_, i) => {
          const x = -10 + i * 2;
          return <path key={i} d={`M${x},16 Q${x + Math.sin(frame / 14 + i) * 2},46 ${x * 1.5},78`} stroke={i % 2 ? COLORS.gold : COLORS.goldLight} strokeWidth={2.4} fill="none" strokeLinecap="round" />;
        })}
      </g>
    </g>
  );
};

type EnvProps = {};

/**
 * Whole opening animation: envelope appears, seal cracks, flap opens, card slides out and zooms to fill the frame.
 * All timings (frames) are relative to the start of the scene.
 */
export const Envelope: React.FC<EnvProps> = () => {
  const frame = useCurrentFrame();
  const appear = prog(frame, 0, 24);
  const float = Math.sin(frame / 40) * 4;
  const crack = prog(frame, 34, 20, Easing.linear);
  const fall = prog(frame, 58, 22, Easing.in(Easing.quad));
  const flap = prog(frame, 56, 40, Easing.inOut(Easing.cubic));
  const slide = prog(frame, 92, 44, Easing.inOut(Easing.cubic));
  const zoom = prog(frame, 136, 46, Easing.inOut(Easing.cubic));

  // flap: scaleY from 1 → -1 around its top edge
  const s = Math.cos(flap * Math.PI);
  const flapTransform = `translate(0,${BY}) scale(1,${s}) translate(0,${-BY})`;
  const flapPoly = `${BX},${BY} ${BX + BW},${BY} ${CX},${FLAP_TIP}`;

  // card path: in envelope → above envelope → fills the screen
  const cardScaleSmall = 0.4;
  const cardScaleOut = 0.5;
  const scale = interpolate(slide, [0, 1], [cardScaleSmall, cardScaleOut]) + zoom * (1.5 - cardScaleOut);
  const centreY = interpolate(slide, [0, 1], [BY + 330, BY - 170]) + zoom * (H / 2 - (BY - 170));
  const centreX = CX + zoom * (W / 2 - CX);

  const cardEl = (
    <g transform={`translate(${centreX},${centreY}) scale(${scale}) translate(${-CARD_W / 2},${-CARD_H / 2})`}>
          <CardFace />
    </g>
  );

  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <defs>
        <linearGradient id="env-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBF3E2" />
          <stop offset="1" stopColor="#EBDCBE" />
        </linearGradient>
        <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9F0DD" />
          <stop offset="1" stopColor="#E9D9B7" />
        </linearGradient>
        <filter id="env-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="26" stdDeviation="26" floodColor="#1A0308" floodOpacity="0.55" />
        </filter>
      </defs>

      <g opacity={appear} transform={`translate(0,${float + (1 - appear) * 40})`}>
        {/* body (inside liner) */}
        <rect x={BX} y={BY} width={BW} height={BH} rx={6} fill="#8A2634" filter="url(#env-shadow)" />
        <rect x={BX + 14} y={BY + 14} width={BW - 28} height={BH - 28} fill="none" stroke={COLORS.goldLight} strokeWidth={1.5} opacity={0.5} />

        {/* open flap (inside), behind the card */}
        {flap >= 0.5 ? (
          <g transform={flapTransform}>
            <polygon points={flapPoly} fill="#A33445" stroke={COLORS.goldLight} strokeWidth={2} strokeLinejoin="round" />
            <polygon points={`${BX + 40},${BY + 8} ${BX + BW - 40},${BY + 8} ${CX},${FLAP_TIP - 50}`} fill="none" stroke={COLORS.goldLight} strokeWidth={1.5} opacity={0.6} />
          </g>
        ) : null}

        {/* card (behind the pocket until it has lifted clear, then in front) */}
        {zoom === 0 ? cardEl : null}

        {/* front pocket */}
        <polygon points={`${BX},${BY} ${CX},${BY + 330} ${BX},${BY + BH}`} fill="url(#env-paper)" stroke="#D9C59B" strokeWidth={2} />
        <polygon points={`${BX + BW},${BY} ${CX},${BY + 330} ${BX + BW},${BY + BH}`} fill="url(#env-paper)" stroke="#D9C59B" strokeWidth={2} />
        <polygon points={`${BX},${BY + BH} ${CX},${BY + 255} ${BX + BW},${BY + BH}`} fill="url(#env-paper)" stroke="#D9C59B" strokeWidth={2} />
        <path d={`M${BX + 14},${BY + BH - 14} L${CX},${BY + 275} L${BX + BW - 14},${BY + BH - 14}`} fill="none" stroke={COLORS.gold} strokeWidth={1.5} opacity={0.6} />

        {/* closed flap */}
        {flap < 0.5 ? (
          <g transform={flapTransform}>
            <polygon points={flapPoly} fill="url(#env-flap)" stroke="#D2BC8C" strokeWidth={2.5} strokeLinejoin="round" />
            <polygon points={`${BX + 46},${BY + 8} ${BX + BW - 46},${BY + 8} ${CX},${FLAP_TIP - 52}`} fill="none" stroke={COLORS.gold} strokeWidth={1.6} opacity={0.7} />
          </g>
        ) : null}

        {/* resting petals on the envelope */}
        {[
          {x: 190, y: 1330, r: 20, c: COLORS.rose, a: 30},
          {x: 250, y: 1360, r: 16, c: COLORS.marigold, a: -50},
          {x: 800, y: 1340, r: 22, c: COLORS.marigold, a: 80},
          {x: 880, y: 1300, r: 16, c: COLORS.rose, a: -20},
          {x: 360, y: 1000, r: 14, c: COLORS.jasmine, a: 10},
          {x: 730, y: 990, r: 14, c: COLORS.rose, a: 120},
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y}) rotate(${p.a}) scale(${p.r * 0.7},${p.r})`}>
            <path d="M0,-1 C0.85,-0.55 0.8,0.55 0,1 C-0.8,0.55 -0.85,-0.55 0,-1Z" fill={p.c} stroke="rgba(0,0,0,0.12)" strokeWidth={0.04} />
          </g>
        ))}

        {zoom > 0 ? cardEl : null}
        <Tassel frame={frame} fall={fall} />
        <Seal crack={crack} fall={fall} />
      </g>
    </svg>
  );
};
