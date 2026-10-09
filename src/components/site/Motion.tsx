"use client";
/**
 * All page motion in one small client component (no libraries):
 *  - [data-reveal]   gets [data-in] once it scrolls into view → CSS plays a 3D entrance
 *  - [data-parallax] moves at its own depth while scrolling (translate3d only — stays sharp)
 *  - [data-tilt]     tilts in 3D toward the pointer (mouse / pen only)
 *  - --progress on <html> drives the thin gold scroll bar
 * Everything is skipped when the guest prefers reduced motion.
 */
import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete root.dataset.motion;
      return;
    }
    root.dataset.motion = "on";

    /* reveal on scroll */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    /* parallax + progress */
    const layers = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let raf = 0;
    const frame = () => {
      raf = 0;
      const vh = innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--progress", (max > 0 ? scrollY / max : 0).toFixed(4));
      for (const el of layers) {
        const host = el.parentElement!;
        const r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const speed = parseFloat(el.dataset.parallax || "0");
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.setProperty("--py", `${offset.toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    /* pointer tilt */
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const tilts = fine ? [...document.querySelectorAll<HTMLElement>("[data-tilt]")] : [];
    const move = (ev: PointerEvent) => {
      const el = ev.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const max = parseFloat(el.dataset.tilt || "6");
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      el.dataset.hover = "";
    };
    const leave = (ev: PointerEvent) => {
      const el = ev.currentTarget as HTMLElement;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      delete el.dataset.hover;
    };
    tilts.forEach((el) => {
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      tilts.forEach((el) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return null;
}
