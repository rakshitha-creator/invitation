/**
 * The gateway — reference 3 (https://pin.it/6DdyUh4P5): the painted gopuram, cut out of
 * its background with its doorway left open. As you scroll, the camera walks up to it and
 * through the lit doorway; the invitation waits inside. Scroll progress (--p) comes from
 * <Cinema/>.
 *
 * Depth comes from the references themselves: the banana trees of ref 5 (mid) and the carved
 * pillars of ref 4 (near) stand in front of the temple and part to either side, faster the
 * closer they are, while the kolam of ref 6 lies on the stone forecourt in perspective.
 * The welcome words stay on screen through the walk and only fade as you cross the door.
 */
import type { CSSProperties } from "react";
import s from "./ref.module.css";
import { banana, gopuram, hero, maroon, pillar } from "@/content/refs";

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
        {(["L", "R"] as const).map((side) => (
          <div key={`t${side}`} className={`${s.gateNear} ${s.gateTree} ${s[`gateTree${side}`]}`} aria-hidden="true">
            <img src={banana.src} alt="" width={banana.w} height={banana.h} loading="lazy" decoding="async" data-depth="14" />
          </div>
        ))}
        <div className={s.gopuramWrap} style={origin}>
          <span className={s.doorGlow} aria-hidden="true" />
          <img className={s.gopuram} src={gopuram.src} alt="A painted South Indian temple gopuram" width={gopuram.w} height={gopuram.h} loading="lazy" decoding="async" />
        </div>
        {(["L", "R"] as const).map((side) => (
          <div key={`p${side}`} className={`${s.gateNear} ${s.gatePillar} ${s[`gatePillar${side}`]}`} aria-hidden="true">
            <img src={pillar.src} alt="" width={pillar.w} height={pillar.h} loading="lazy" decoding="async" data-depth="34" />
          </div>
        ))}
        <div className={s.gateText}>
          <p className={s.kicker}>Step inside</p>
          <p className={s.gateTitle}>Swagatham</p>
          <p className={s.gateLine}>Through the temple gate, our families welcome you.</p>
        </div>
        <div className={s.doorLight} aria-hidden="true" />
      </div>
    </section>
  );
}
