"use client";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./site.module.css";
import { wedding } from "@/content/wedding";

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/** Days / hours / minutes / seconds to the muhurat. Shows dashes until the date is set. */
export default function Countdown() {
  const target = wedding.date.iso ? new Date(wedding.date.iso).getTime() : null;
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const values = target && now !== null ? split(target - now) : null;

  return (
    <div className={styles.countdown}>
      <div className={styles.tiles} role="timer" aria-live="off">
        {UNITS.map((u, i) => (
          <div key={u} className={styles.tile} data-reveal="flip-x" style={{ "--d": i } as CSSProperties}>
            <span className={styles.tileNum} key={values ? values[i] : "none"}>
              {values ? String(values[i]).padStart(2, "0") : "--"}
            </span>
            <span className={styles.tileLabel}>{u}</span>
          </div>
        ))}
      </div>
      <p className={styles.countNote} data-reveal="up" style={{ "--d": 5 } as CSSProperties}>
        {target
          ? `${wedding.date.long} · ${wedding.place.city}${wedding.date.timeConfirmed ? "" : " · muhurat time to be announced"}`
          : "The muhurat will be announced soon"}
      </p>
    </div>
  );
}
