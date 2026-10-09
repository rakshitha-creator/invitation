"use client";
/** The five celebrations as swipeable cards (scroll-snap), with arrows and dots.
 *  Each card opens on its own scene from reference 10 (https://pin.it/DPxe1Qan1):
 *  Haldi on the swing, Mehendi in the garden, Sangeet under sky lanterns, the Wedding
 *  garland exchange at night, the Reception dance — each a still taken from the
 *  reference video just before its original text appears. */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./site.module.css";
import { scenes } from "@/content/refs";
import { wedding } from "@/content/wedding";

const TBA = "To be announced";

export default function Events() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const n = wedding.events.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step =
        card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setActive(Math.max(0, Math.min(n - 1, Math.round(el.scrollLeft / step))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [n]);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      const card = el?.children[Math.max(0, Math.min(n - 1, i))] as
        HTMLElement | undefined;
      if (!el || !card) return;
      el.scrollTo({
        left:
          card.offsetLeft -
          el.offsetLeft -
          (el.clientWidth - card.offsetWidth) / 2,
        behavior: "smooth",
      });
    },
    [n],
  );

  return (
    <div className={styles.events}>
      <ul
        ref={track}
        className={styles.eventTrack}
        aria-label="Wedding celebrations"
      >
        {wedding.events.map((e, i) => {
          return (
            <li
              key={e.id}
              className={styles.eventItem}
              aria-label={`${i + 1} of ${n}: ${e.name}`}
              data-reveal="rise"
              style={{ "--d": i } as CSSProperties}
            >
              <div className={styles.eventCard} data-tilt="6">
                <div className={styles.eventPhoto}>
                  <img
                    src={scenes[e.id]}
                    alt=""
                    width={640}
                    height={1136}
                    loading="lazy"
                    decoding="async"
                    className={styles.eventScene}
                  />
                  <span className={styles.eventScript} aria-hidden="true">
                    {e.name}
                  </span>
                </div>
                <div className={styles.eventBody}>
                  <span className={styles.eventNum}>
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(n).padStart(2, "0")}
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
                      <dd data-tba={!e.venue || undefined}>
                        {e.venue
                          ? `${e.venue}${e.location ? `, ${e.location}` : ""}`
                          : TBA}
                      </dd>
                    </div>
                  </dl>
                  {e.mapsUrl && (
                    <a
                      className={styles.button}
                      href={e.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Directions
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.eventNav}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous celebration"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(active + 1)}
          disabled={active === n - 1}
          aria-label="Next celebration"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
