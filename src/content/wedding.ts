/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITA & RAM — every word the guests read lives in this file.
 * ─────────────────────────────────────────────────────────────────────────
 *  Only information that was actually provided is filled in. Anything left
 *  as `null` shows an elegant "to be announced" line instead of invented
 *  details. Fill it in and the whole journey updates.
 */

export type WeddingEvent = {
  id: "haldi" | "mehendi" | "sangeet" | "wedding" | "reception";
  name: string;
  /** one-line feeling for the panel (not a fact) */
  note: string;
  /** photo key from photos.ts shown on the event card */
  photo: "family" | "mehendi" | "couple-03" | "mandap" | "couple-01" | "ceremony" | "rings";
  date: string | null; // e.g. "Saturday, 12 December 2026"
  time: string | null; // e.g. "10:30 AM"
  venue: string | null; // e.g. "Sri Ranga Mandapam"
  location: string | null; // e.g. "Hyderabad"
  mapsUrl: string | null; // Google Maps link → shows a Directions button
};

export const wedding = {
  bride: "Sita",
  groom: "Ram",

  /** Wedding day shown everywhere (opening, hero, invitation, countdown). */
  date: {
    /** ISO date-time of the muhurat. Only the day is confirmed, so the time is midnight IST
     *  until you set it, e.g. "2027-01-01T10:30:00+05:30". */
    iso: "2027-01-01T00:00:00+05:30",
    /** set to true once the exact muhurat time above is confirmed */
    timeConfirmed: false,
    long: "Friday, 1 January 2027",
    short: "01 · 01 · 2027",
  },

  /** Where the wedding takes place. `venue` / `mapsUrl` stay null until confirmed. */
  place: {
    city: "Anantapur",
    region: "Andhra Pradesh",
    venue: null as string | null, // e.g. "Sri Lakshmi Kalyana Mandapam"
    address: null as string | null,
    /** link for the Directions button. Until the venue is set it opens Anantapur on Google Maps. */
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Anantapur%2C+Andhra+Pradesh",
  },

  /** The cinematic opening screen: the reference 1 video plays, then these words are
   *  written into its arch (see src/components/site/Opening.tsx). */
  opening: {
    together: "Together with our families",
    button: "Open Our Wedding Invitation",
  },

  hero: {
    subtitle: "Two souls, one sacred fire, a lifetime of seven promises.",
  },

  entrance: {
    together: "Together with their families,",
    invite: "we invite you to celebrate our wedding.",
  },

  invitation: {
    blessing: "॥ श्री गणेशाय नमः ॥",
    intro: "With the blessings of the Almighty and our elders, our families joyfully invite you to the wedding of",
    closing: "Your presence and blessings will make our day complete.",
  },

  /** Parents' names, e.g. "Mr. & Mrs. …" — shown under each name once filled in (null → hidden) */
  parents: {
    bride: null as string | null,
    groom: null as string | null,
  },

  couple: {
    bride: { label: "The Bride", line: "Grace that fills every room she enters." },
    groom: { label: "The Groom", line: "A quiet strength, a gentle heart." },
  },

  /** Our Story — told as steps of the saptapadi. */
  story: [
    { step: "The first step", title: "First Meeting", text: "An ordinary day that quietly became the most important one.", photo: "pre-wedding" },
    { step: "The second step", title: "First Conversation", text: "Hours felt like minutes. Neither of us wanted it to end.", photo: "couple-03" },
    { step: "The third step", title: "A Beautiful Journey", text: "Two families, many blessings, and a love that kept growing.", photo: "family" },
    { step: "The seventh step", title: "Forever", text: "Now we take the seven steps — and we would love you beside us.", photo: "couple-02" },
  ] as const,

  /** The celebrations. Details stay null until they are confirmed. */
  events: [
    { id: "haldi", name: "Haldi", note: "Turmeric, laughter and sunshine", photo: "family", date: null, time: null, venue: null, location: null, mapsUrl: null },
    { id: "mehendi", name: "Mehendi", note: "Henna, songs and stories", photo: "mehendi", date: null, time: null, venue: null, location: null, mapsUrl: null },
    { id: "sangeet", name: "Sangeet", note: "An evening of music and dance", photo: "couple-03", date: null, time: null, venue: null, location: null, mapsUrl: null },
    { id: "wedding", name: "Wedding", note: "Seven steps around the sacred fire", photo: "mandap", date: "Friday, 1 January 2027", time: null, venue: null, location: "Anantapur", mapsUrl: null },
    { id: "reception", name: "Reception", note: "Dinner, blessings and togetherness", photo: "couple-01", date: null, time: null, venue: null, location: null, mapsUrl: null },
  ] satisfies WeddingEvent[],

  rsvp: {
    heading: "Will you join us?",
    line: "Your presence would make our celebration complete.",
    phone: "9347915212",
    countryCode: "91",
    whatsappMessage: "Namaste! We have received the wedding invitation of Sita & Ram and would love to celebrate with you.",
  },

  instagram: {
    heading: "Follow our journey",
    handle: "@cine__snaps__",
    url: "https://www.instagram.com/cine__snaps__?stkn=NXRheHh1azEwcndh",
  },

  final: {
    blessing: "Like Sita and Ram — two hands, one promise.",
    line: "Two hearts. One beautiful beginning.",
    thanks: "Thank you for being part of our journey.",
  },

  music: {
    /** A music file you are licensed to use, e.g. "/audio/our-song.mp3".
     *  null → a quiet original temple ambience is synthesised in the browser. */
    src: null as string | null,
  },

  meta: {
    siteUrl: "http://localhost:3000",
    title: "Sita & Ram — Wedding Invitation",
    description: "You are invited to the wedding of Sita & Ram — 1 January 2027, Anantapur.",
  },
};

export const telHref = `tel:+${wedding.rsvp.countryCode}${wedding.rsvp.phone}`;
export const whatsappHref = `https://wa.me/${wedding.rsvp.countryCode}${wedding.rsvp.phone}?text=${encodeURIComponent(wedding.rsvp.whatsappMessage)}`;
