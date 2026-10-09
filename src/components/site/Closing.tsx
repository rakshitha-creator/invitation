/**
 * Closing — reference 9 (https://pin.it/5LwCWxJWU): under the gold filigree arch hung with
 * marigolds and bells, the blue hand with rudraksha beads and the hennaed hand with bangles
 * — Ram's and Sita's — drift together as you scroll until their little fingers link.
 * All pieces are cut from the reference itself and laid over its own paper.
 * Scroll progress (--p) comes from <Cinema/>.
 */
import type { CSSProperties } from "react";
import s from "./ref.module.css";
import sc from "./scene.module.css";
import Petals from "./Petals";
import { hands } from "@/content/refs";
import { wedding } from "@/content/wedding";

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;

export default function Closing() {
  const { bride, groom } = wedding;
  return (
    <footer className={s.closing} id="closing" data-scene="closing" style={{ backgroundImage: `url(${hands.paper})` }}>
      <img className={s.closingArch} src={hands.arch.src} alt="" width={hands.arch.w} height={hands.arch.h} loading="lazy" decoding="async" />
      <Petals count={12} />
      <div className={s.hands} aria-hidden="true" style={{ aspectRatio: `${hands.W} / 360` }}>
        <img
          className={s.handRam}
          src={hands.ram.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ left: pct(hands.ram.x, hands.W), width: pct(hands.ram.w, hands.W), top: pct(hands.ram.y - 240, 360) }}
        />
        <img
          className={s.handSita}
          src={hands.sita.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ left: pct(hands.sita.x, hands.W), width: pct(hands.sita.w, hands.W), top: pct(hands.sita.y - 240, 360) }}
        />
      </div>
      <div className={sc.closingText}>
        <p className={sc.closingBlessing} data-reveal="up">
          {wedding.final.blessing}
        </p>
        <p className={sc.closingNames} data-reveal="tilt" style={{ "--d": 1 } as CSSProperties}>
          {bride} <em>&amp;</em> {groom}
        </p>
        <p className={sc.closingDate} data-reveal="up" style={{ "--d": 2 } as CSSProperties}>
          {wedding.date.long} · {wedding.place.city}
        </p>
        <p className={sc.closingLine} data-reveal="up" style={{ "--d": 3 } as CSSProperties}>
          {wedding.final.line}
        </p>
        <p className={sc.closingThanks} data-reveal="up" style={{ "--d": 4 } as CSSProperties}>
          {wedding.final.thanks}
        </p>
      </div>
      <img className={s.foliage} src={hands.foliage.src} alt="" width={hands.foliage.w} height={hands.foliage.h} loading="lazy" decoding="async" />
    </footer>
  );
}
