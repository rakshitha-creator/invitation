/**
 * Hero — reference 2 (https://pin.it/5J82flr1I) rebuilt as a layered 3D scene.
 *
 * The reference image was cut apart along its own objects (nothing redrawn), and each
 * piece sits on its own depth plane inside a CSS `perspective` stage (real translateZ,
 * size-compensated so the composition matches the reference at rest):
 *
 *   far   watercolour wash (the reference's own paper, objects removed)
 *         three hanging brass bells · carved pillar · banana leaves
 *   mid   names + date (on the picture plane, so the text stays perfectly sharp)
 *   near  lotus pond with the elephant table · the couple · kuthuvilakku · kalash
 *
 * Every piece keeps its original size and its distance to the nearest edge of the
 * frame, so a 9:16 phone shows the reference exactly, and a wide screen opens the
 * same scene out sideways with the names in the middle.
 * <Cinema/> moves the camera: pointer/drift parallax, and on scroll a dolly *into* the
 * scene (near layers sweep past, far layers barely move).
 */
import type { CSSProperties } from "react";
import s from "./ref.module.css";
import Petals from "./Petals";
import { hero, type Cut } from "@/content/refs";
import { wedding } from "@/content/wedding";

const z = (depth: number, i: number) => ({ "--z": depth, "--i": i }) as CSSProperties;

/** one cut-out piece, anchored to an edge of the frame like in the reference */
export function Piece({
  c,
  anchor,
  className,
  style,
  eager,
}: {
  c: Cut;
  anchor: "tl" | "tr" | "bl" | "br" | "bc";
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
}) {
  return (
    <img
      src={c.src}
      alt=""
      width={c.w}
      height={c.h}
      decoding="async"
      loading={eager ? "eager" : "lazy"}
      data-anchor={anchor}
      className={`${s.piece} ${className ?? ""}`}
      style={{ "--x": c.x, "--y": c.y, "--w": c.w, "--h": c.h, ...style } as CSSProperties}
    />
  );
}

export default function HeroScene() {
  const { bride, groom } = wedding;
  return (
    <section className={s.hero} id="top" data-scene="hero" aria-labelledby="hero-names">
      <div className={s.sticky}>
        <div className={s.stage}>
          <div className={s.world}>
            <div className={`${s.layer} ${s.wash}`} style={{ ...z(-700, 0), backgroundImage: `url(${hero.wash})` }} />

            <div className={s.layer} style={z(-260, 1)}>
              <Piece c={hero.bell1} anchor="tl" className={s.bell} eager />
              <Piece c={hero.bell2} anchor="tl" className={s.bell} style={{ animationDelay: "-1.3s" }} eager />
              <Piece c={hero.bell3} anchor="tl" className={s.bell} style={{ animationDelay: "-2.4s" }} eager />
            </div>

            <div className={s.layer} style={z(-170, 2)}>
              <Piece c={hero.pillar} anchor="tr" eager />
            </div>

            <div className={s.layer} style={z(-120, 2)}>
              <Piece c={hero.leaves} anchor="tr" className={s.leaves} eager />
            </div>

            <div className={`${s.layer} ${s.copy}`} style={z(0, 3)}>
              <p className={s.kicker}>The wedding of</p>
              <h1 className={s.names} id="hero-names">
                <span>{bride}</span>
                <em>&amp;</em>
                <span>{groom}</span>
              </h1>
              <p className={s.when}>
                <span>{wedding.date.long}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {wedding.place.city}, {wedding.place.region}
                </span>
              </p>
              <p className={s.subtitle}>{wedding.hero.subtitle}</p>
              <a href="#invite" className={s.cue}>
                <span>Scroll to enter</span>
                <i aria-hidden="true" />
              </a>
            </div>

            <div className={s.layer} style={z(40, 4)}>
              <Piece c={hero.pond} anchor="bl" eager />
            </div>

            <div className={s.layer} style={z(70, 5)}>
              <Piece c={hero.couple} anchor="bc" eager />
            </div>

            <div className={s.layer} style={z(100, 5)}>
              <Piece c={hero.lamp} anchor="br" eager />
            </div>

            <div className={s.layer} style={z(130, 6)}>
              <Piece c={hero.kalash} anchor="br" eager />
            </div>
          </div>
        </div>

        <Petals count={14} />
        <div className={s.heroFade} aria-hidden="true" />
      </div>
    </section>
  );
}
