"use client";
/**
 * Scroll-driven camera work (GSAP + ScrollTrigger), one place, cleaned up on unmount.
 *
 *   [data-scene="hero"]     --p 0→1 while its sticky stage is pinned → dolly into the scene
 *   [data-scene="story"]    --p 0→1 → the saptapadi path draws down the page
 *   [data-scene="closing"]  --p 0→1 → the two hands drift together
 *   hero world              --mx/--my from the pointer (or a slow drift on touch)
 *
 * Reduced motion → nothing runs and the CSS shows every scene at rest.
 */
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Cinema() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const scrub = (sel: string, start: string, end: string, smooth = 0.7) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          gsap.fromTo(el, { "--p": 0 }, { "--p": 1, ease: "none", scrollTrigger: { trigger: el, start, end, scrub: smooth } });
        });
      };
      scrub('[data-scene="hero"]', "top top", "bottom bottom");
      scrub('[data-scene="story"]', "top 70%", "bottom 60%", 0.4);
      scrub('[data-scene="closing"]', "top 85%", "bottom bottom", 1);
    });

    /* pointer parallax on the hero (eased), gentle drift on touch screens */
    const hero = document.querySelector<HTMLElement>('[data-scene="hero"]');
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
    };
    const tick = (t: number) => {
      if (!fine) {
        tx = Math.sin(t / 3200) * 0.6;
        ty = Math.cos(t / 4100) * 0.35;
      }
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      if (hero && hero.getBoundingClientRect().bottom > 0) {
        hero.style.setProperty("--mx", x.toFixed(4));
        hero.style.setProperty("--my", y.toFixed(4));
      }
      raf = requestAnimationFrame(tick);
    };
    if (hero) {
      if (fine) addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }

    /* the opening overlay locks scrolling; re-measure once it is gone */
    const refresh = () => ScrollTrigger.refresh();
    addEventListener("opening:done", refresh);
    // the story, celebrations and closing only exist on the page once the card is opened
    addEventListener("card:open", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("opening:done", refresh);
      removeEventListener("card:open", refresh);
    };
  }, []);

  return null;
}
