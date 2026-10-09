"use client";
/**
 * All page motion in one small client component (no libraries):
 *  - [data-reveal]   gets [data-in] once it scrolls into view → CSS plays a 3D entrance
 *  - [data-parallax] moves at its own depth while scrolling (translate3d only — stays sharp)
 *  - [data-tilt]     tilts in 3D toward the pointer (mouse / pen only)
 *  - [data-depth]    image layers drift by their depth with the pointer (or the phone's tilt,
 *                    or a slow drift) — --dx/--dy on <html>, used in globals.css
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
    let layers = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const onCard = () => {
      layers = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
      onScroll();
    };
    addEventListener("card:open", onCard);
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

    /* depth drift: pointer on desktop, device tilt (where allowed) or a slow drift on phones */
    let dtx = 0, dty = 0, dx = 0, dy = 0, draf = 0, tilted = false;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      dtx = (e.clientX / innerWidth) * 2 - 1;
      dty = (e.clientY / innerHeight) * 2 - 1;
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tilted = true;
      dtx = Math.max(-1, Math.min(1, e.gamma / 25));
      dty = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    };
    const fineDepth = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const depthTick = (t: number) => {
      if (!fineDepth && !tilted) {
        dtx = Math.sin(t / 3400) * 0.5;
        dty = Math.cos(t / 4300) * 0.3;
      }
      const nx = dx + (dtx - dx) * 0.07;
      const ny = dy + (dty - dy) * 0.07;
      if (Math.abs(nx - dx) > 0.0005 || Math.abs(ny - dy) > 0.0005) {
        dx = nx;
        dy = ny;
        root.style.setProperty("--dx", dx.toFixed(3));
        root.style.setProperty("--dy", dy.toFixed(3));
      }
      draf = requestAnimationFrame(depthTick);
    };
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("deviceorientation", onTilt, { passive: true });
    draf = requestAnimationFrame(depthTick);

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
      cancelAnimationFrame(draf);
      removeEventListener("pointermove", onPointer);
      removeEventListener("deviceorientation", onTilt);
      removeEventListener("card:open", onCard);
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
