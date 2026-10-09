# Sita ♥ Ram — wedding invitation

Next.js 15 · React 19 · TypeScript · CSS Modules

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

## The experience
A cinematic South Indian wedding invitation built **from the couple's own 10 Pinterest
references** — the actual images and videos, cut into depth layers (see **REFERENCES.md**).
Nothing is redrawn or generated.

1. **Opening** (`Opening.tsx`, ref 1): the reference video plays full-screen (muted autoplay,
   *Sound on*, *Skip intro*, Esc). Just before the original invite's names appear it dissolves
   into its own last frame and **Sita weds Ram · 1 January 2027 · Anantapur** write into the arch,
   then **Open Our Wedding Invitation**. If autoplay is blocked or motion is reduced, the end card
   shows at once.
2. **Hero** (`HeroScene.tsx`, ref 2): the reference split into 9 depth planes (wash, bells, pillar,
   leaves, names, lotus pond, couple, lamp, kalash). Pointer (or gentle drift on phones) moves the
   camera; scrolling dollies *into* the scene.
3. **Gateway** (`Gateway.tsx`, ref 3): you walk up to the gopuram and through its open, lit doorway.
4. **Invitation** (`InviteCard.tsx`, ref 4 pillars): tap the silk cover and it swings open in 3D.
5. **The Bride & Groom** (ref 7): portraits inside the watercolour courtyard.
6. **Our Story** (ref 8): opens on the saptapadi feet; the path draws as you scroll.
7. **Celebrations** (refs 6 + 10): the maroon hall with swinging bells, a kolam that opens as it
   scrolls in and the garlanded pillar; each event card opens on its ref 10 scene.
8. **Venue** (ref 5): banana trees in gold pots at the entrance, Directions + Add to calendar.
9. **Gallery**, **Countdown** (ref 10's reaching hands), **RSVP + Instagram**.
10. **Closing** (ref 9): Ram's blue hand and Sita's hennaed hand meet under the marigold arch.

Motion: `Cinema.tsx` (GSAP ScrollTrigger: hero dolly, gateway walk, story path, hands), `Motion.tsx`
(reveals, parallax, tilt), `Petals.tsx` (light petals). With *reduced motion* everything is shown
at rest, with no tall scroll stages. Without JavaScript the opening is hidden and every section shows.

## Change the content: `src/content/wedding.ts`
Names, every line of text, parents' names, the events, RSVP phone/WhatsApp, Instagram, the countdown date and music.
- **Events:** `date`, `time`, `venue`, `location` and `mapsUrl` are `null`, so they show "To be announced". Nothing was invented. A Directions button appears once `mapsUrl` is set. `photo` picks the card image.
- **Parents:** set `parents.bride` / `parents.groom`, and a "daughter of … / son of …" line appears.
- **Date & place:** `date` (wedding day, set to 1 January 2027; set `date.iso` to the muhurat time and
  `timeConfirmed: true` once known) and `place` (Anantapur; add `venue`, `address`, `mapsUrl`).
- **Opening:** the "Together with our families" line and the button text. The names, date and city
  come from `bride`, `groom`, `date` and `place`.
- **Music:** put a track you are licensed to use in `public/audio/` and set `music.src`. Until then, a quiet original ambience is synthesised in the browser.

## Replace the photos
- **Wedding photos** (portraits, story, gallery): in `public/images/wedding/`, keep the **same file names**:
  `bride.jpg  groom.jpg  couple-01.jpg  couple-02.jpg  couple-03.jpg  pre-wedding.jpg
  family.jpg  ceremony.jpg  rings.jpg  temple.jpg  mandap.jpg  mehendi.jpg`.
  The current ones are **temporary stand-ins** (Unsplash, see `ASSET-CREDITS.md`) — the people are
  not Sita and Ram. If a photo's shape changes a lot, update `width`/`height` in `src/content/photos.ts`.
- **Reference media**: originals in `references/`, processed layers in `public/ref/`
  (coordinates in `src/content/refs.ts`).

## Structure
```
references/              the 10 Pinterest originals (2 videos, 9 images), untouched
public/ref/              layers cut from them: opening/ hero/ scenes/ events/
src/app/                 layout (fonts, metadata), globals.css (colours, fonts), page
src/content/             wedding.ts (all text/data), refs.ts (reference layers + positions), photos.ts
src/components/site/     Opening, HeroScene, Gateway, InviteCard, Closing, Events, Cinema (GSAP scroll camera),
                         Motion (reveals, parallax, tilt), Petals, Countdown, Music, Ornament (gold divider),
                         Invitation (all sections), ref.module.css (reference scenes), scene.module.css,
                         opening.module.css, site.module.css
src/lib/ambient.ts       synthesised music
```
No longer used and safe to delete: `src/components/art/` (the old hand-drawn SVG recreations),
the empty placeholder files in `src/components/*.tsx` outside `site/`, `src/components/experience`,
`src/components/scenes`, `src/three`, `src/journey`, and the stock photos in `public/images/site/`,
`public/images/temple/`, `public/images/magic/`, `public/assets/art/`.

## Accessibility
- Event cards, arrows and dots work by keyboard and touch. Links and buttons are at least 46 px tall.
- With `prefers-reduced-motion`, all animation, parallax, tilt and smooth scrolling is turned off and everything shows at once.
- If JavaScript is off, every section is still visible (the hidden "before" state only applies once motion is switched on).
