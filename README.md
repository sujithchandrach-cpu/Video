# Aishwarya & Karthik — Wedding Invitation Video

A vertical (1080×1920, 30 fps, 45 s) wedding invitation built with [Remotion](https://www.remotion.dev) (React + TypeScript).
Everything is drawn in SVG/CSS, so it renders offline (fonts are the only network fetch — see below).

```
out/aishwarya-karthik-invite.mp4   # H.264, CRF 18
out/poster.png                     # poster frame (names scene)
out/aishwarya-karthik-invite-whatsapp.mp4   # ~8 MB share copy (see below)
```

## Quick start

```bash
npm install
npm run dev        # Remotion Studio: live preview + scrubbing
npm run build      # renders out/aishwarya-karthik-invite.mp4
npm run poster     # renders out/poster.png
```

`npm run build` is just `npx remotion render WeddingInvite out/aishwarya-karthik-invite.mp4`.
Codec, CRF 18, pixel format and JPEG quality are set in `remotion.config.ts`.

## Smaller file for WhatsApp

The full-quality render is large (~138 MB). Make a ~8 MB copy from it without re-rendering:

```bash
ffmpeg -i out/aishwarya-karthik-invite.mp4 -c:v libx264 -preset slow -crf 27 -maxrate 2800k -bufsize 5600k \
  -pix_fmt yuv420p -profile:v high -movflags +faststart -an out/aishwarya-karthik-invite-whatsapp.mp4
```

(`-an` drops audio; remove it, or add `-c:a aac -b:a 128k`, if you added music.) WhatsApp Status splits
videos into 30-second clips, so the 45 s video will post as two parts.

## Change the text, dates and colours

Everything editable is in **`src/config.ts`**:

| Export          | What it controls                                                      |
| --------------- | --------------------------------------------------------------------- |
| `TEXT`          | Every line of copy: names, quotes, event dates/times, venue, sign-off |
| `COLORS`        | The whole palette (paper, gold, maroon, marigold, banana green, …)    |
| `SCENE_SECONDS` | Length of each scene — total video length is the sum                  |
| `ASSETS`        | Music file name/volume/fades, optional couple illustration            |
| `VIDEO`         | Size, fps and the 90 px safe margin                                   |

After editing, re-render (`npm run build`). The Studio hot-reloads while `npm run dev` is running.

> Changing `SCENE_SECONDS` changes the video length automatically. Animation timings *inside* a scene
> are fixed frame numbers in each `src/scenes/*.tsx`, so very short scenes may cut animations off.

## Swap in music

1. Put your own royalty-free track (e.g. nadaswaram or soft veena instrumental) at **`public/music.mp3`**.
2. Re-render. The video fades it in over 1 s and out over the last 2 s (`ASSETS` in `config.ts`).

No music is bundled. If `public/music.mp3` doesn't exist the video simply renders silent
(the Studio/console may log a harmless 404 for `music.mp3` — that is the existence check).
To use a different file name, change `ASSETS.music`.

## Add the couple illustration (optional)

1. Drop your image at `public/assets/couple.png` (square-ish works best; it's shown in a round gold frame).
2. Set `ASSETS.useCoupleImage = true` in `src/config.ts`.

It replaces the kolam in the bottom centre of the Names scene.

## Project layout

```
src/
  config.ts            all text, colours, timings
  fonts.ts             Great Vibes / Cinzel / Cormorant Garamond via @remotion/google-fonts
  WeddingInvite.tsx    the composition: scenes + transitions + petals + audio + final fade
  scenes/              one component per scene (Scene1Envelope … Scene7Closing)
  components/          Petals, Garland, Kalash, Diya, Kolam, GoldDivider, Envelope,
                       plus Thoranam, BananaLeaf, Icons, Paper, Frame, WriteOn, Reveal …
```

| Scene | Time    | Content                                                         |
| ----- | ------- | --------------------------------------------------------------- |
| 1     | 0–6 s   | Envelope, wax seal cracks, flap opens, card fills the screen    |
| 2     | 6–11 s  | "A & K" monogram draws itself + opening line                    |
| 3     | 11–18 s | Names written on, garlands, kalash and diya                     |
| 4     | 18–23 s | Invite line over a self-drawing kolam                           |
| 5     | 23–34 s | "Celebrations": Reception, then Muhurtham                       |
| 6     | 34–40 s | Venue with a dropping map pin                                   |
| 7     | 40–45 s | Closing line, sign-off, more petals, fade to cream              |

Scenes overlap by 0.5 s during crossfades / the paper-slide (`@remotion/transitions`), so each scene
starts at the time shown above.

## Notes

- **Fonts** are fetched from Google Fonts at render time. The first render needs internet access; rendering
  waits for the fonts to load before drawing anything.
- **Randomness is deterministic.** Petals, flame flicker and wax-seal edges use Remotion's `random()` with
  fixed seeds, so every render is identical.
- **Safe margin:** text sits inside a 90 px margin; only decoration (garlands, leaves, borders) reaches the edges.
- If Remotion can't download its headless Chrome (restricted network), point it at an installed Chrome/Chromium:
  `npx remotion render WeddingInvite out/aishwarya-karthik-invite.mp4 --browser-executable=/path/to/chrome`.
