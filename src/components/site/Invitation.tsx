/**
 * The whole invitation as one continuous cinematic journey, built from the couple's
 * own Pinterest references (the images themselves, cut into depth layers — nothing
 * redrawn or generated):
 *
 *   Opening video (ref 1) → Hero 3D scene (ref 2) →
 *   the 3D invitation card between carved pillars (ref 4) →
 *   Bride & Groom in the watercolour courtyard (ref 7) → Our Story, the seven steps (ref 8) →
 *   Celebrations in the maroon hall with bells, kolam and lamp (ref 6), each event on its
 *   own scene (ref 10) → Venue between banana trees (ref 5) → Gallery → Countdown (ref 10)
 *   → RSVP → the hands meet under the marigold arch (ref 9)
 *
 * See REFERENCES.md for the full reference map.
 * Sharp photographs, solid colours, thin gold lines. Motion is added by
 * <Motion/> through data attributes:
 *   data-reveal="up|arch|flip-l|flip-r|tilt|zoom|rise|draw"  3D entrance when scrolled into view
 *   style={{"--d": n}}                                       stagger delay (×90 ms)
 *   data-parallax="0.15"                                     depth parallax while scrolling
 *   data-tilt                                                3D tilt that follows the pointer
 * All words live in src/content/wedding.ts.
 */
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./site.module.css";
import { Divider } from "./Ornament";
import Events from "./Events";
import Countdown from "./Countdown";
import Music from "./Music";
import Motion from "./Motion";
import Cinema from "./Cinema";
import Opening from "./Opening";
import HeroScene from "./HeroScene";
import InviteCard from "./InviteCard";
import Closing from "./Closing";
import sc from "./scene.module.css";
import r from "./ref.module.css";
import { banana, courtyard, maroon, pillar, saptapadi, scenes } from "@/content/refs";
import { photos, type PhotoKey } from "@/content/photos";
import { wedding, telHref, whatsappHref } from "@/content/wedding";

/** Google Calendar link for the wedding day (all-day until the muhurat time is set). */
const calendarHref = (() => {
  const start = new Date(wedding.date.iso);
  const ymd = (dt: Date) => dt.toISOString().slice(0, 10).replace(/-/g, "");
  const local = new Date(start.getTime() + 5.5 * 3600e3);
  const next = new Date(local.getTime() + 86400e3);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding of ${wedding.bride} & ${wedding.groom}`,
    dates: `${ymd(local)}/${ymd(next)}`,
    location: [wedding.place.venue, wedding.place.city, wedding.place.region].filter(Boolean).join(", "),
    details: wedding.meta.description,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
})();

const d = (n: number) => ({ "--d": n }) as CSSProperties;

function Photo({ k, sizes, className, priority }: { k: PhotoKey; sizes: string; className?: string; priority?: boolean }) {
  const p = photos[k];
  return <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes={sizes} className={className} priority={priority} />;
}

function Heading({ kicker, title, light }: { kicker: string; title: string; light?: boolean }) {
  return (
    <header className={styles.heading} data-light={light || undefined} data-scroll3d>
      <p className={styles.kicker} data-reveal="up" style={d(1)}>
        {kicker}
      </p>
      <h2 className={styles.title} data-reveal="tilt" style={d(2)}>
        {title}
      </h2>
      <span data-reveal="draw" style={d(3)}>
        <Divider className={styles.divider} />
      </span>
    </header>
  );
}

export default function Invitation() {
  const { bride, groom } = wedding;
  return (
    <>
      <Motion />
      <Cinema />
      <Opening />
      <div className={styles.progress} aria-hidden="true" />

      {/* ── 1 · Hero: the layered scene ─────────────────────── */}
      <HeroScene />

      {/* ── 3 · The invitation card ──────────────────────────── */}
      <section className={`${sc.invite} ${r.invite}`} id="invite" aria-labelledby="invite-title">
        {(["L", "R"] as const).map((side) => (
          <div key={side} className={`${r.invitePillar} ${r[`invitePillar${side}`]}`} data-parallax="0.08" data-depth="22" aria-hidden="true">
            <img src={pillar.src} alt="" width={pillar.w} height={pillar.h} loading="lazy" decoding="async" />
          </div>
        ))}
        <div className={sc.inviteBody}>
          <p className={styles.kicker} data-reveal="up">
            You are invited
          </p>
          <h2 className={sc.inviteTitle} id="invite-title" data-reveal="tilt" style={d(1)}>
            Our Wedding Invitation
          </h2>
          <InviteCard />
        </div>
      </section>

      {/* everything below opens once the guest opens the card (InviteCard lifts <html data-gate>) */}
      <div className={r.afterInvite}>
      {/* ── 4 · Bride & Groom, in the courtyard ──────────────── */}
      <section className={`${styles.section} ${sc.courtyard} ${r.courtyard}`} id="couple">
        <div className={sc.courtyardBack} aria-hidden="true">
          {(["L", "R"] as const).map((side) => (
            <img
              key={side}
              className={`${r.cy} ${r[`cy${side}`]}`}
              src={courtyard.src}
              alt=""
              width={courtyard.w}
              height={courtyard.h}
              loading="lazy"
              decoding="async"
              data-parallax="0.05"
              data-depth="14"
            />
          ))}
        </div>
        <Heading kicker="Meet" title="The Bride & Groom" />
        <div className={styles.couple} data-scroll3d>
          {(["bride", "groom"] as const).map((who, i) => (
            <figure key={who} className={styles.person} data-reveal={who === "bride" ? "flip-l" : "flip-r"} style={d(i * 2)}>
              <div className={styles.portrait} data-tilt="8">
                <Photo k={who} sizes="(min-width: 760px) 340px, 44vw" />
              </div>
              <figcaption>
                <span className={styles.personLabel}>{wedding.couple[who].label}</span>
                <span className={styles.personName}>{who === "bride" ? bride : groom}</span>
                <span className={styles.personLine}>{wedding.couple[who].line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 5 · Our story: the seven steps ───────────────────── */}
      <section className={`${styles.section} ${sc.story} ${r.story}`} id="story" data-scene="story">
        <img data-depth="16" className={`${r.storyLeaf} ${r.storyLeafL}`} src={saptapadi.leafL.src} alt="" width={saptapadi.leafL.w} height={saptapadi.leafL.h} loading="lazy" decoding="async" />
        <img data-depth="16" className={`${r.storyLeaf} ${r.storyLeafR}`} src={saptapadi.leafR.src} alt="" width={saptapadi.leafR.w} height={saptapadi.leafR.h} loading="lazy" decoding="async" />
        <div className={r.feet} data-reveal="zoom">
          <img
            data-depth="10"
            src={saptapadi.feet.src}
            alt="The bride and groom walking the seven steps, their cloths tied together"
            width={saptapadi.feet.w}
            height={saptapadi.feet.h}
            loading="lazy"
            decoding="async"
          />
        </div>
        <Heading kicker="Saptapadi · how it began" title="Our Story" />
        <ol className={sc.path}>
          <span className={sc.pathLine} aria-hidden="true" />
          {/* the seven steps of the saptapadi: his foot and hers (cut from ref 8) walk down the
              path as you scroll */}
          <span className={r.walk} aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} className={r.footstep} style={{ "--i": i } as CSSProperties}>
                <img className={r.footHis} src={saptapadi.footHis.src} alt="" width={saptapadi.footHis.w} height={saptapadi.footHis.h} loading="lazy" decoding="async" />
                <img className={r.footHers} src={saptapadi.footHers.src} alt="" width={saptapadi.footHers.w} height={saptapadi.footHers.h} loading="lazy" decoding="async" />
                <span className={r.stepNum}>{i + 1}</span>
              </span>
            ))}
          </span>
          {wedding.story.map((st, i) => (
            <li key={st.title} className={sc.step} data-scroll3d>
              <div className={sc.stepPhoto} data-reveal={i % 2 ? "flip-r" : "flip-l"}>
                <div className={styles.storyPhotoInner} data-tilt="6">
                  <Photo k={st.photo} sizes="(min-width: 760px) 440px, 88vw" />
                </div>
              </div>
              <div className={sc.stepText}>
                <span className={sc.stepNo} data-reveal="up" style={d(1)}>
                  {st.step}
                </span>
                <h3 data-reveal="tilt" style={d(2)}>
                  {st.title}
                </h3>
                <p data-reveal="up" style={d(3)}>
                  {st.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 6 · Celebrations: pinned, sideways through the maroon hall ── */}
      <Events
        heading={<Heading kicker="Join us for" title="The Celebrations" light />}
        decor={
          <>
            <img data-depth="8" className={r.mBells} src={maroon.bells.src} alt="" width={maroon.bells.w} height={maroon.bells.h} loading="lazy" decoding="async" />
            <div className={r.mKolam} data-reveal="kolam">
              <img src={maroon.kolam.src} alt="" width={maroon.kolam.w} height={maroon.kolam.h} loading="lazy" decoding="async" />
            </div>
            <img data-depth="26" className={r.mRight} src={maroon.right.src} alt="" width={maroon.right.w} height={maroon.right.h} loading="lazy" decoding="async" />
            <img data-depth="18" className={r.mFlowers} src={maroon.flowers.src} alt="" width={maroon.flowers.w} height={maroon.flowers.h} loading="lazy" decoding="async" />
          </>
        }
        foot={
          <div className={r.mFoot} aria-hidden="true">
            <img data-depth="30" src={maroon.urli.src} alt="" width={maroon.urli.w} height={maroon.urli.h} loading="lazy" decoding="async" />
          </div>
        }
      />

      {/* ── 7 · Venue ────────────────────────────────────────── */}
      <section className={`${styles.section} ${sc.venue} ${r.venue}`} id="venue">
        {(["L", "R"] as const).map((side) => (
          <div key={side} className={`${r.venueSide} ${r[`venueSide${side}`]}`} aria-hidden="true" data-parallax="0.06" data-depth="20">
            <img src={banana.src} alt="" width={banana.w} height={banana.h} loading="lazy" decoding="async" />
          </div>
        ))}
        <Heading kicker="Where" title="The Venue" />
        <div data-scroll3d>
        <div className={sc.venueCard} data-reveal="arch">
          <div className={sc.venueInner} data-tilt="4">
            <p className={sc.venueCity}>{wedding.place.city}</p>
            <p className={sc.venueRegion}>{wedding.place.region}</p>
            <Divider className={styles.dividerSm} />
            <p className={sc.venueName} data-tba={!wedding.place.venue || undefined}>
              {wedding.place.venue ?? "Venue to be announced"}
            </p>
            {wedding.place.address && <p className={sc.venueAddress}>{wedding.place.address}</p>}
            <p className={sc.venueDate}>{wedding.date.long}</p>
            <div className={sc.venueActions}>
              <a className={`${styles.button} ${styles.shine}`} href={wedding.place.mapsUrl} target="_blank" rel="noopener noreferrer">
                Directions
              </a>
              <a className={`${styles.button} ${styles.buttonOutline}`} href={calendarHref} target="_blank" rel="noopener noreferrer">
                Add to calendar
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── 8 · Gallery ──────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.paper} ${sc.gallerySection}`} id="gallery">
        <Heading kicker="Moments" title="Held in the Light" />
        <div className={`${styles.gallery} ${sc.gallery}`} data-scroll3d>
          {(["couple-01", "ceremony", "couple-02", "rings", "pre-wedding", "mehendi"] as const).map((k, i) => (
            <div key={k} className={styles.galleryItem} data-k={k} data-reveal="zoom" style={d(i)}>
              <div className={sc.galleryInner} data-tilt="7">
                <Photo k={k} sizes="(min-width: 900px) 30vw, 46vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9 · Countdown ────────────────────────────────────── */}
      <section className={`${styles.section} ${r.countdown}`} id="countdown">
        <div className={r.countdownArt} data-reveal="zoom" aria-hidden="true">
          <img src={scenes.intro} alt="" width={640} height={1136} loading="lazy" decoding="async" data-parallax="0.04" data-depth="-10" />
        </div>
        <div className={r.countdownBody} data-scroll3d>
          <Heading kicker="The wedding day" title="Counting the Days" />
          <Countdown />
        </div>
      </section>
      {/* ── 10 · RSVP + Instagram ──────────────────────────── */}
      <section className={`${styles.section} ${styles.maroon}`} id="rsvp">
        <div className={styles.cards} data-scroll3d>
          <div data-reveal="arch" style={d(0)}>
            <div className={styles.card} data-tilt="5">
              <h2 className={styles.cardTitle}>{wedding.rsvp.heading}</h2>
              <p className={styles.cardText}>{wedding.rsvp.line}</p>
              <a className={`${styles.button} ${styles.shine}`} href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.8 2.3 1 2.5.1.1 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2z"
                  />
                </svg>
                RSVP on WhatsApp
              </a>
              <a className={styles.phone} href={telHref}>
                Call / WhatsApp: {wedding.rsvp.phone}
              </a>
            </div>
          </div>

          <div data-reveal="arch" style={d(2)}>
            <div className={styles.card} data-tilt="5">
              <h2 className={styles.cardTitle}>{wedding.instagram.heading}</h2>
              <p className={styles.handle}>{wedding.instagram.handle}</p>
              <a className={`${styles.button} ${styles.buttonOutline}`} href={wedding.instagram.url} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <g fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                  </g>
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
                Open Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11 · The hands meet ────────────────────────────── */}
      <Closing />
      </div>

      <Music />
    </>
  );
}
