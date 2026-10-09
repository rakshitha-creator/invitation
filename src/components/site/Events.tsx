"use client";
/**
 * The celebrations — a horizontal journey through the maroon hall of reference 6.
 *
 * The section pins to the screen and the page's vertical scroll slides the five event
 * cards sideways (1 px of scroll = 1 px of travel). Each card turns in 3D as it passes
 * the centre, like walking past a row of framed scenes; the bells, kolam and pillar drift
 * at their own depths. Every card opens on its scene from reference 10
 * (https://pin.it/DPxe1Qan1): Haldi on the swing, Mehendi in the garden, Sangeet under sky
 * lanterns, the Wedding garland exchange, the Reception dance — stills taken just before
 * the original video's own text appears.
 *
 * Reduced motion / no JS: a normal swipeable row (scroll-snap), no pinning.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./site.module.css";
import r from "./ref.module.css";
import { scenes } from "@/content/refs";
import { wedding } from "@/content/wedding";

const TBA = "To be announced";

export default function Events({ heading, decor, foot }: { heading: ReactNode; decor: ReactNode; foot: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const n = wedding.events.length;
  const geo = useRef({ step: 0, dist: 0 });

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPinned(true);
    let raf = 0;

    const measure = () => {
      const cards = tr.children;
      if (cards.length < 2) return;
      const a = cards[0] as HTMLElement;
      const b = cards[1] as HTMLElement;
      const step = b.offsetLeft - a.offsetLeft;
      const dist = step * (cards.length - 1);
      geo.current = { step, dist };
      // the section is as tall as the sideways journey, so 1 px of scroll = 1 px of travel
      sec.style.height = `calc(100svh + ${dist}px)`;
      frame();
    };

    const frame = () => {
      raf = 0;
      const { step, dist } = geo.current;
      if (!step) return;
      const rect = sec.getBoundingClientRect();
      const travelled = Math.max(0, Math.min(dist, -rect.top));
      const p = dist ? travelled / dist : 0;
      tr.style.transform = `translate3d(${-travelled}px, 0, 0)`;
      sec.style.setProperty("--hp", p.toFixed(4));
      const f = travelled / step;
      [...tr.children].forEach((el, i) => {
        const o = Math.max(-2, Math.min(2, i - f));
        (el as HTMLElement).style.setProperty("--o", o.toFixed(3));
        (el as HTMLElement).style.setProperty("--a", Math.abs(o).toFixed(3));
      });
      setActive(Math.max(0, Math.min(n - 1, Math.round(f))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    measure();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", measure);
    addEventListener("card:open", measure);
    addEventListener("opening:done", measure);
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", measure);
      removeEventListener("card:open", measure);
      removeEventListener("opening:done", measure);
      sec.style.removeProperty("height");
    };
  }, [n]);

  const go = useCallback(
    (i: number) => {
      const k = Math.max(0, Math.min(n - 1, i));
      const sec = section.current;
      const tr = track.current;
      if (!sec || !tr) return;
      if (pinned) {
        const top = sec.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: top + k * geo.current.step + 1, behavior: "smooth" });
      } else {
        const card = tr.children[k] as HTMLElement | undefined;
        if (card) tr.scrollTo({ left: card.offsetLeft - tr.offsetLeft - (tr.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
      }
    },
    [n, pinned],
  );

  // swipeable-row fallback: keep the dots in sync
  useEffect(() => {
    const el = track.current;
    if (!el || pinned) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setActive(Math.max(0, Math.min(n - 1, Math.round(el.scrollLeft / step))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [n, pinned]);

  return (
    <section
      ref={section}
      className={`${styles.maroon} ${r.events}`}
      id="events"
      data-pinned={pinned || undefined}
      aria-label="The celebrations"
    >
      <div className={r.eventsSticky}>
        <div className={r.eventsDecor} aria-hidden="true">
          {decor}
        </div>
        <div className={r.eventsHead}>{heading}</div>
        <div className={r.eventsStage}>
          <ul ref={track} className={r.eventTrack} aria-label="Wedding celebrations">
            {wedding.events.map((e, i) => (
              <li key={e.id} className={r.eventItem} aria-label={`${i + 1} of ${n}: ${e.name}`} style={{ "--i": i } as CSSProperties}>
                <div className={`${styles.eventCard} ${r.eventCard}`} data-tilt="5">
                  <div className={`${styles.eventPhoto} ${r.eventPhoto}`}>
                    <img src={scenes[e.id]} alt="" width={640} height={1136} loading="lazy" decoding="async" className={styles.eventScene} />
                    <span className={styles.eventScript} aria-hidden="true">
                      {e.name}
                    </span>
                  </div>
                  <div className={`${styles.eventBody} ${r.eventBody}`}>
                    <span className={styles.eventNum}>
                      {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                    </span>
                    <h3 className={styles.eventName}>{e.name}</h3>
                    <p className={styles.eventNote}>{e.note}</p>
                    <dl className={styles.eventFacts}>
                      <div>
                        <dt>Date</dt>
                        <dd data-tba={!e.date || undefined}>{e.date ?? TBA}</dd>
                      </div>
                      <div>
                        <dt>Time</dt>
                        <dd data-tba={!e.time || undefined}>{e.time ?? TBA}</dd>
                      </div>
                      <div>
                        <dt>Venue</dt>
                        <dd data-tba={!e.venue || undefined}>{e.venue ? `${e.venue}${e.location ? `, ${e.location}` : ""}` : TBA}</dd>
                      </div>
                    </dl>
                    {e.mapsUrl && (
                      <a className={styles.button} href={e.mapsUrl} target="_blank" rel="noopener noreferrer">
                        Directions
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.eventNav} ${r.eventNav}`}>
          <button type="button" className={styles.arrow} onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous celebration">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.dots}>
            {wedding.events.map((e, i) => (
              <button
                key={e.id}
                type="button"
                className={styles.dot}
                data-on={i === active || undefined}
                aria-label={`Show ${e.name}`}
                aria-current={i === active}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className={styles.arrow} onClick={() => go(active + 1)} disabled={active === n - 1} aria-label="Next celebration">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {foot}
      </div>
    </section>
  );
}
