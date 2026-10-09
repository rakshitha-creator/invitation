"use client";
/**
 * Cinematic opening — the reference video itself (ref 1, https://pin.it/53OSiVkoM).
 *
 *   The clip plays full-screen: the floral arch on maroon damask, the parchment scroll
 *   unrolling, "Finally it's happening! We are getting married soon…" and the couple
 *   walking in. The clip is cut just before the original invite shows its own couple's
 *   names; at that moment it dissolves into its own last frame (with those names removed)
 *   and "Sita weds Ram", the date and the city write themselves into the arch in the same
 *   white script — so the names belong to the composition rather than sitting on top of it.
 *
 * - Muted, inline autoplay (allowed by every browser). If autoplay is refused, the video
 *   fails or the guest prefers reduced motion, the finished end card is shown at once.
 * - "Skip intro" (or Esc) jumps to the end card; a sound toggle unmutes the clip.
 * - The page cannot be scrolled (wheel, touch or keys) until the guest opens the invitation.
 * - Portrait screens fill edge to edge; wide screens keep the clip's 9:16 framing with a
 *   soft, blurred extension of the same frame on either side.
 * - No JS → hidden by CSS, so the page is never blocked.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./opening.module.css";
import { opening } from "@/content/refs";
import { wedding } from "@/content/wedding";

type Stage = "play" | "card" | "leave" | "gone";

export default function Opening() {
  const [stage, setStage] = useState<Stage>("play");
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>(0);
  const unlock = useRef<() => void>(() => {});
  const { bride, groom } = wedding;

  const showCard = useCallback(() => {
    setStage((s) => (s === "play" ? "card" : s));
    videoRef.current?.pause();
  }, []);

  const replay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setStage("play");
    v.play().catch(() => setStage("card"));
  }, []);

  const enter = useCallback(() => {
    setStage("leave");
    videoRef.current?.pause();
    const root = document.documentElement;
    root.dataset.entered = "";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(
      () => {
        setStage("gone");
        unlock.current();
        root.style.removeProperty("overflow");
        window.dispatchEvent(new Event("opening:done"));
      },
      reduce ? 50 : 1300,
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // deep links (e.g. /#events) skip straight in
    if (location.hash) {
      root.dataset.entered = "";
      setStage("gone");
      window.dispatchEvent(new Event("opening:done"));
      return;
    }
    root.style.overflow = "hidden";
    const v = videoRef.current;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !v) {
      setStage("card");
    } else {
      v.play().catch(() => setStage("card"));
    }
    const SCROLL_KEYS = [" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") showCard();
      // the page stays put until the invitation is opened
      else if (SCROLL_KEYS.includes(e.key) && !(e.target instanceof HTMLButtonElement && e.key === " ")) e.preventDefault();
    };
    const block = (e: Event) => e.preventDefault();
    addEventListener("keydown", onKey);
    addEventListener("wheel", block, { passive: false });
    addEventListener("touchmove", block, { passive: false });
    window.scrollTo(0, 0);
    unlock.current = () => {
      removeEventListener("wheel", block);
      removeEventListener("touchmove", block);
      removeEventListener("keydown", onKey);
    };
    return () => {
      clearTimeout(timer.current);
      unlock.current();
      root.style.removeProperty("overflow");
    };
  }, [showCard]);

  useEffect(() => {
    if (stage === "card") enterRef.current?.focus({ preventScroll: true });
  }, [stage]);

  if (stage === "gone") return null;

  const d = (i: number) => ({ "--i": i }) as CSSProperties;
  const day = wedding.date.long.replace(/^\w+, /, "");

  return (
    <div
      className={styles.opening}
      data-stage={stage}
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of ${bride} and ${groom}`}
    >
      {/* wide screens: the same frame, blurred, carries the colour to the edges */}
      <div className={styles.backdrop} aria-hidden="true" style={{ backgroundImage: `url(${opening.poster})` }} />

      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
          poster={opening.poster}
          muted={muted}
          playsInline
          preload="auto"
          aria-hidden="true"
          onEnded={showCard}
        >
          <source src={opening.webm} type="video/webm" />
          <source src={opening.video} type="video/mp4" onError={showCard} />
        </video>
        {/* the clip's own final frame, with the original names taken out */}
        <img className={styles.endcard} src={opening.endcard} alt="" aria-hidden="true" decoding="async" />

        <div className={styles.card}>
          <p className={styles.together} style={d(0)}>
            {wedding.opening.together}
          </p>
          <p className={styles.names}>
            <span style={d(1)}>{bride}</span>
            <em style={d(2)}>weds</em>
            <span style={d(3)}>{groom}</span>
          </p>
          <p className={styles.date} style={d(4)}>
            {day}
          </p>
          <p className={styles.place} style={d(5)}>
            {wedding.place.city}
          </p>
          <button
            ref={enterRef}
            type="button"
            className={styles.enter}
            style={d(6)}
            onClick={enter}
            tabIndex={stage === "card" ? 0 : -1}
          >
            {wedding.opening.button}
          </button>
        </div>
      </div>

      {stage === "play" ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrl}
            onClick={() => setMuted((m) => !m)}
            aria-pressed={!muted}
          >
            {muted ? "Sound on" : "Sound off"}
          </button>
          <button type="button" className={styles.ctrl} onClick={showCard}>
            Skip intro
          </button>
        </div>
      ) : stage === "card" ? (
        <div className={styles.controls}>
          <button type="button" className={styles.ctrl} onClick={replay}>
            Replay intro
          </button>
        </div>
      ) : null}
    </div>
  );
}
