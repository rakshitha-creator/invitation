"use client";
/** Small round music button. Never autoplays — music starts only when tapped. */
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./site.module.css";
import { getAmbient, startAmbient } from "@/lib/ambient";
import { wedding } from "@/content/wedding";

const VOL = 0.4;

export default function Music() {
  const [on, setOn] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (wedding.music.src) {
      audio.current ??= Object.assign(new Audio(wedding.music.src), { loop: true, volume: VOL });
      audio.current.play().then(() => setOn(true)).catch(() => setOn(false));
      return;
    }
    const a = getAmbient() ?? startAmbient(VOL);
    if (!a) return;
    a.ctx.resume();
    setOn(true);
  }, []);

  const pause = useCallback(() => {
    audio.current?.pause();
    getAmbient()?.ctx.suspend();
    setOn(false);
  }, []);

  useEffect(() => {
    const vis = () => {
      if (document.hidden) {
        audio.current?.pause();
        getAmbient()?.ctx.suspend();
      } else if (on) {
        audio.current?.play().catch(() => {});
        getAmbient()?.ctx.resume();
      }
    };
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, [on]);

  useEffect(
    () => () => {
      audio.current?.pause();
      getAmbient()?.stop();
    },
    [],
  );

  return (
    <button
      type="button"
      className={styles.music}
      data-on={on || undefined}
      aria-pressed={on}
      aria-label={on ? "Pause music" : "Play music"}
      onClick={() => (on ? pause() : play())}
    >
      {on ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M8 5l11 7-11 7z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
