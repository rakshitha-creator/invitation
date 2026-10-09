/**
 * Photo manifest. To use your own photos, replace the files in
 * /public/images/wedding/ with the SAME file names (any size; portraits
 * work best for bride/groom). Nothing else needs to change.
 * Temporary photos are credited in ASSET-CREDITS.md.
 */
const p = (file: string, alt: string, w: number, h: number) => ({
  src: `/images/wedding/${file}`,
  alt,
  width: w,
  height: h,
});

export const photos = {
  bride: p("bride.jpg", "Portrait of the bride", 1067, 1600),
  groom: p("groom.jpg", "Portrait of the groom", 1067, 1600),
  "couple-01": p("couple-01.jpg", "The couple together", 1600, 1067),
  "couple-02": p("couple-02.jpg", "The couple beneath a floral canopy", 1600, 1067),
  "couple-03": p("couple-03.jpg", "The couple sharing a smile", 1600, 1067),
  "pre-wedding": p("pre-wedding.jpg", "Pre-wedding portrait of the couple", 1600, 1067),
  family: p("family.jpg", "Family blessing the bride", 1600, 1067),
  ceremony: p("ceremony.jpg", "Petals showered during the ceremony", 1067, 1600),
  rings: p("rings.jpg", "Two wedding rings on a palm leaf", 1067, 1600),
  temple: p("temple.jpg", "Temple tower at dusk", 1600, 1067),
  mandap: p("mandap.jpg", "The wedding mandap", 1600, 1067),
  mehendi: p("mehendi.jpg", "Hands with henna and gold bangles", 1067, 1600),
} as const;

export type PhotoKey = keyof typeof photos;
