# Pinterest reference map — Sita & Ram

All ten pins were opened, and their **actual media** was saved into `references/`
(originals, untouched). The site uses those images and videos themselves — nothing
was redrawn, traced or generated. Where a scene needed depth, the reference was only
**cut apart along its own objects** (bells, leaves, pillar, couple…) and the pieces were
put back on separate 3D layers at their original size and position.

Processed files live in `public/ref/`, and their coordinates are in `src/content/refs.ts`.

| # | Pinterest URL | Main visual element / animation in the reference | Website section | Implementation technique | Asset used |
|---|---|---|---|---|---|
| 1 | https://pin.it/53OSiVkoM | 10 s portrait video: cream-and-gold floral arch on maroon damask → parchment scroll unrolls → "Finally it's happening! We are getting married soon…" → couple walks in → names + date + caricature couple | **Opening** (`Opening.tsx`) | The clip plays full-screen (muted autoplay, sound toggle, skip, replay). It is cut at 8.4 s, just before the original invite's own couple names appear, and dissolves into its **own last frame with those names removed**; *Sita weds Ram*, 1 January 2027 and Anantapur then write themselves into the arch in the same white script, followed by **Open Our Wedding Invitation**. Wide screens keep the 9:16 frame with a blurred extension of it at the sides. | `public/ref/opening/opening.mp4` + `.webm` (re-encoded, 0–8.4 s), `poster.jpg` (first frame), `endcard.webp` (last frame, names removed using the clip's own first frame) |
| 2 | https://pin.it/5J82flr1I | Watercolour paper; three brass bells top-left; banana leaves top-right; carved pillar on the right; lotus pond with elephant table bottom-left; South Indian couple seen from behind; kuthuvilakku; kalash | **Hero** (`HeroScene.tsx`) | The image was split into 9 pieces (wash, 3 bells, leaves, pillar, pond, couple, lamp, kalash). Each sits on its own `translateZ` plane in a CSS perspective stage, anchored to the edge it touches in the reference, so a 9:16 phone shows the reference 1:1 and a desktop opens it out sideways. Pointer/gyro parallax, swinging bells, swaying leaves, and a GSAP scroll "dolly" *into* the scene. | `public/ref/hero/*.webp` |
| 3 | https://pin.it/6DdyUh4P5 | Painted gopuram (tiered tower, kalasams, open doorway) | **Gateway** between hero and invitation (`Gateway.tsx`) | The gopuram was cut off its background **with the doorway left open**. Pinned scroll scene: the camera walks up to it and through the lit doorway (scale around the door), then fades to the invitation. | `public/ref/scenes/gopuram.webp` |
| 4 | https://pin.it/2KVDLSzZs | Carved teak pillar with peacock relief, banana leaves at the capital, brass lamp + kalash at its foot | **Invitation** — the two pillars framing the 3D card | Cut-out, mirrored for the left side, depth parallax | `public/ref/scenes/pillar.webp` |
| 5 | https://pin.it/vMDU7Uvf8 | Banana tree with fruit and flower in an embossed gold pot beside a garlanded pillar | **Venue** — the trees flank the entrance | Cut-out, mirrored for the right side, parallax | `public/ref/scenes/banana.webp` |
| 6 | https://pin.it/4Bz1Qszv1 | Flat deep-maroon ground; brass bells with jasmine; sikku kolam; banana leaves, carved pillar with jasmine strings and lit lamp; urli with floating flowers; elephant and flowers | **Celebrations** — the maroon hall (the section takes the reference's own maroon) | Each object keyed off the flat maroon into its own layer: swinging bells, kolam revealed in a widening circle as it scrolls in, pillar group with parallax, flowers, urli under the cards. The same kolam is chalked white on the gateway floor and foiled gold on the invitation cover. | `public/ref/scenes/m-*.webp` |
| 7 | https://pin.it/51djczAJr | Watercolour courtyard: banana trees, tall brass lamps, baskets of jasmine and rose petals, rice-flour kolam | **The Bride & Groom** — the courtyard around the portraits | Lifted off its white paper (soft alpha keeps the watercolour edge), placed left and mirrored right, parallax | `public/ref/scenes/courtyard.webp` |
| 8 | https://pin.it/1coWZO3y5 | Saptapadi: his veshti and her red silk, cloths tied in a knot, barefoot steps, scattered petals, banana leaves in the corners, cream paper | **Our Story** — opens on the seven steps; leaves in the bottom corners; section uses the reference's paper colour | Cut-outs, zoom-in reveal, the dotted path draws as you scroll | `public/ref/scenes/feet.webp`, `leaf-l.webp`, `leaf-r.webp` |
| 9 | https://pin.it/5LwCWxJWU | Blue hand with rudraksha beads and hennaed hand with bangles, little fingers linking, under a gold filigree arch with marigold strings and bells; botanical foliage; pink cloud wash | **Closing** — Ram's and Sita's hands drift together as you scroll until they link | Arch, each hand and the foliage cut out and laid over the reference's own paper (objects removed); scroll-driven hands | `public/ref/scenes/arch.webp`, `hand-ram.webp`, `hand-sita.webp`, `foliage.webp`, `closing-paper.webp` |
| 10 | https://pin.it/DPxe1Qan1 | 67 s storybook video: hands reaching on violet → Haldi (swing) → Mehendi (garden, peacock) → Sangeet (night, sky lanterns, swans) → Wedding (garland exchange) → Reception (dance) | **Celebrations** — each event card opens on its own scene; **Countdown** — the opening hands | One clean still per scene, taken from the video just before its original text writes on (the other couple's names, dates and Delhi venues are never shown) | `public/ref/events/*.webp` |

## What could not be used as-is
- **Ref 1** and **ref 10** have another couple's names, dates and venues baked into the
  video. Those moments are never shown: ref 1 is cut before its names appear and
  finishes on its own clean frame; ref 10 is used only as clean stills.
- The caricature couple at the end of ref 1 and the Radha–Krishna figures in ref 10 are part
  of those templates and appear as they are.

## Rights
These images and videos belong to their creators on Pinterest (several are sold as
invitation templates). They are fine for trying the design out; before sharing the site
publicly, please buy or get permission for the templates (or ask the artists for
customised versions), especially refs 1 and 10.
