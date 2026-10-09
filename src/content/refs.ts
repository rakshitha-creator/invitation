/**
 * The Pinterest reference media used on the site (see REFERENCES.md).
 *
 * Every image here was taken from the pins the couple chose. Nothing is redrawn or
 * generated: objects were only cut out of their original background so they can sit
 * on separate depth layers. Coordinates are in the pixel space of the original image
 * ({ W, H }), so each piece can be put back exactly where it was in the reference.
 */
export type Cut = { src: string; x: number; y: number; w: number; h: number };

const cut = (src: string, x: number, y: number, w: number, h: number): Cut => ({ src, x, y, w, h });

/** ref 1 — https://pin.it/53OSiVkoM (animated invite video, 720×1280) */
export const opening = {
  video: "/ref/opening/opening.mp4", // the reference clip, cut just before its own names appear
  webm: "/ref/opening/opening.webm", // same clip, VP9/Opus
  poster: "/ref/opening/poster.jpg", // first frame (arch on maroon damask)
  endcard: "/ref/opening/endcard.webp", // last frame with the original couple's names removed
  W: 720,
  H: 1280,
};

/** ref 2 — https://pin.it/5J82flr1I (hero, 1080×1920), split into depth layers */
export const hero = {
  W: 1080,
  H: 1920,
  wash: "/ref/hero/wash.webp",
  bell1: cut("/ref/hero/bell1.webp", 0, 0, 114, 442),
  bell2: cut("/ref/hero/bell2.webp", 84, 0, 110, 346),
  bell3: cut("/ref/hero/bell3.webp", 184, 0, 100, 256),
  leaves: cut("/ref/hero/leaves.webp", 415, 0, 592, 546),
  pillar: cut("/ref/hero/pillar.webp", 871, 0, 209, 1920),
  pond: cut("/ref/hero/pond.webp", 0, 1096, 562, 824),
  couple: cut("/ref/hero/couple.webp", 334, 1398, 533, 522),
  lamp: cut("/ref/hero/lamp.webp", 839, 1173, 151, 738),
  kalash: cut("/ref/hero/kalash.webp", 847, 1619, 143, 301),
};

/** ref 3 — https://pin.it/6DdyUh4P5 (gopuram, cut out; the doorway is open) */
export const gopuram = { ...cut("/ref/scenes/gopuram.webp", 4, 112, 1076, 1608), W: 1080, H: 1920, door: { x: 541, y: 1458 } };

/** ref 4 — https://pin.it/2KVDLSzZs (carved pillar with peacock, banana leaves, lamp, kalash) */
export const pillar = { ...cut("/ref/scenes/pillar.webp", 368, 0, 368, 1307), W: 736, H: 1307 };

/** ref 5 — https://pin.it/vMDU7Uvf8 (banana tree in a gold pot by a garlanded pillar) */
export const banana = { ...cut("/ref/scenes/banana.webp", 0, 35, 529, 1035), W: 736, H: 1104 };

/** ref 6 — https://pin.it/4Bz1Qszv1 (maroon scene), keyed off its flat maroon */
export const maroon = {
  W: 1080,
  H: 1920,
  color: "rgb(118 12 16)",
  bells: cut("/ref/scenes/m-bells.webp", 0, 0, 281, 442),
  kolam: cut("/ref/scenes/m-kolam.webp", 0, 674, 656, 810),
  right: cut("/ref/scenes/m-right.webp", 356, 0, 724, 1790),
  urli: cut("/ref/scenes/m-urli.webp", 340, 1780, 740, 140),
  flowers: cut("/ref/scenes/m-flowers.webp", 0, 1511, 340, 409),
};

/** ref 7 — https://pin.it/51djczAJr (watercolour courtyard), lifted off its white paper */
export const courtyard = { ...cut("/ref/scenes/courtyard.webp", 0, 0, 577, 1054), W: 577, H: 1054 };

/** ref 8 — https://pin.it/1coWZO3y5 (saptapadi: feet, tied cloth, banana leaves) */
export const saptapadi = {
  W: 736,
  H: 1308,
  paper: "#f7efe5",
  feet: cut("/ref/scenes/feet.webp", 0, 0, 736, 558),
  leafL: cut("/ref/scenes/leaf-l.webp", 0, 877, 192, 431),
  leafR: cut("/ref/scenes/leaf-r.webp", 484, 891, 252, 417),
  /** his bare foot below the green-bordered veshti, and hers below the red silk — the footsteps */
  footHis: cut("/ref/scenes/foot-his.webp", 38, 298, 284, 199),
  footHers: cut("/ref/scenes/foot-hers.webp", 442, 423, 260, 74),
};

/** ref 9 — https://pin.it/5LwCWxJWU (hands under a marigold-and-bell arch) */
export const hands = {
  W: 675,
  H: 1200,
  paper: "/ref/scenes/closing-paper.webp",
  arch: cut("/ref/scenes/arch.webp", 0, 0, 675, 262),
  ram: cut("/ref/scenes/hand-ram.webp", 0, 240, 343, 263),
  sita: cut("/ref/scenes/hand-sita.webp", 320, 250, 355, 343),
  foliage: cut("/ref/scenes/foliage.webp", 0, 747, 675, 453),
};

/** ref 10 — https://pin.it/DPxe1Qan1 (storybook video): one clean still per scene, before
 *  the original invite's text writes on. 640×1136. */
export const scenes = {
  intro: "/ref/events/intro.webp",
  haldi: "/ref/events/haldi.webp",
  mehendi: "/ref/events/mehendi.webp",
  sangeet: "/ref/events/sangeet.webp",
  wedding: "/ref/events/wedding.webp",
  reception: "/ref/events/reception.webp",
} as const;
