# Hariharan & Indhumathi — Wedding Site

Premium South Indian wedding invitation website for **V. Hariharan** and **N. Indhumathi** (13 December 2026).

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Personalize

Edit **`src/config/wedding.ts`** for names, muhurtham date/time (`Asia/Kolkata`), venue, parents, events, gallery, WhatsApp RSVP, and optional music.

- Couple photos: add files under `public/` and set `photoSrc` on bride/groom.
- Music: add `public/audio/wedding-instrumental.mp3` and set `audio.src` to `/audio/wedding-instrumental.mp3`.

## Features

- Cinematic temple-door intro (skip + no repeat in the same browser session)
- Invitation hero, couple section, countdown, events, gallery lightbox
- Add to Calendar (`.ics`), Google Maps directions & WhatsApp when configured
- React + Vite + TypeScript + Framer Motion
