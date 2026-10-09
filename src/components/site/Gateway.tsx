/**
 * The gateway — reference 3 (https://pin.it/6DdyUh4P5): the painted gopuram, cut out of
 * its background with its doorway left open. As you scroll, the camera walks up to it and
 * through the lit doorway; the invitation waits inside. Scroll progress (--p) comes from
 * <Cinema/>. The kolam on the forecourt is the one from reference 6, chalked in white.
 */
import type { CSSProperties } from "react";
import s from "./ref.module.css";
import { gopuram, hero, maroon } from "@/content/refs";

export default function Gateway() {
  const origin = {
    "--ox": `${((gopuram.door.x / gopuram.w) * 100).toFixed(2)}%`,
    "--oy": `${((gopuram.door.y / gopuram.h) * 100).toFixed(2)}%`,
    "--ar": `${gopuram.w} / ${gopuram.h}`,
  } as CSSProperties;
  return (
    <section className={s.gateway} id="gateway" data-scene="gateway" aria-label="The temple gateway">
      <div className={s.gateSticky}>
        <div className={s.gateSky} style={{ backgroundImage: `url(${hero.wash})` }} />
        <div className={s.gateFloor}>
          <img className={s.gateKolam} src={maroon.kolam.src} alt="" loading="lazy" decoding="async" />
        </div>
        <div className={s.gopuramWrap} style={origin}>
          <span className={s.doorGlow} aria-hidden="true" />
          <img className={s.gopuram} src={gopuram.src} alt="A painted South Indian temple gopuram" width={gopuram.w} height={gopuram.h} loading="lazy" decoding="async" />
        </div>
        <div className={s.gateText}>
          <p className={s.kicker}>Step inside</p>
          <p className={s.gateLine}>Through the temple gate, our families welcome you.</p>
        </div>
        <div className={s.doorLight} aria-hidden="true" />
      </div>
    </section>
  );
}
