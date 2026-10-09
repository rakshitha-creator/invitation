"use client";
/**
 * The invitation as a physical, two-leaf card (the ref 4 pillars frame it).
 * Closed: a maroon silk cover with gold foil, the kolam from reference 6 and the names.
 * Tap / click / Enter → the cover swings open on its hinge (CSS 3D, real depth and
 * shadow) and the printed inner page is revealed.
 */
import { useState } from "react";
import s from "./scene.module.css";
import { maroon } from "@/content/refs";
import { Divider } from "./Ornament";
import { wedding } from "@/content/wedding";

export default function InviteCard() {
  const [open, setOpen] = useState(false);
  const { bride, groom } = wedding;

  return (
    <div className={s.cardScene} data-reveal="arch">
      <div className={s.card} data-open={open || undefined}>
        <div className={s.cardBoard} aria-hidden="true" />

        {/* inner page */}
        <div className={s.cardInner} aria-hidden={!open} inert={!open || undefined}>
          <p className={s.cardBlessing} lang="sa">
            {wedding.invitation.blessing}
          </p>
          <Divider className={s.cardDivider} />
          <p className={s.cardIntro}>{wedding.invitation.intro}</p>
          <div className={s.cardNames}>
            <div>
              <h2>{bride}</h2>
              {wedding.parents.bride && <p className={s.cardParents}>daughter of {wedding.parents.bride}</p>}
            </div>
            <span className={s.cardAmp}>&amp;</span>
            <div>
              <h2>{groom}</h2>
              {wedding.parents.groom && <p className={s.cardParents}>son of {wedding.parents.groom}</p>}
            </div>
          </div>
          <dl className={s.cardFacts}>
            <div>
              <dt>On</dt>
              <dd>{wedding.date.long}</dd>
            </div>
            <div>
              <dt>At</dt>
              <dd>
                {wedding.place.venue ? `${wedding.place.venue}, ` : ""}
                {wedding.place.city}, {wedding.place.region}
              </dd>
            </div>
            {!wedding.date.timeConfirmed && (
              <div>
                <dt>Muhurat</dt>
                <dd data-tba>To be announced</dd>
              </div>
            )}
          </dl>
          <p className={s.cardClosing}>{wedding.invitation.closing}</p>
          <a href="#events" className={s.cardLink}>
            See the celebrations
          </a>
        </div>

        {/* cover */}
        <button
          type="button"
          className={s.cover}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close the invitation" : `Open the wedding invitation of ${bride} and ${groom}`}
        >
          <span className={s.coverFront}>
            <span className={s.coverFrame} />
            <span className={s.coverBlessing} lang="sa">
              {wedding.invitation.blessing}
            </span>
            <img className={s.coverKolam} src={maroon.kolam.src} alt="" width={maroon.kolam.w} height={maroon.kolam.h} decoding="async" />
            <span className={s.coverNames}>
              {bride} <em>&amp;</em> {groom}
            </span>
            <span className={s.coverDate}>{wedding.date.short}</span>
            <span className={s.coverHint}>Tap to open</span>
          </span>
          <span className={s.coverBack}>
            <img className={s.backKolam} src={maroon.kolam.src} alt="" width={maroon.kolam.w} height={maroon.kolam.h} decoding="async" />
            <span className={s.backTitle}>Subha Muhurtham</span>
            <span className={s.backLine}>with love, from the families of {bride} &amp; {groom}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
