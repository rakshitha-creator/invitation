"use client";
/**
 * Falling jasmine, rose and marigold petals on a <canvas>, sized to its parent.
 * Light: ~20–34 petals, paused when off-screen or the tab is hidden, and not drawn
 * at all for visitors who prefer reduced motion.
 */
import { useEffect, useRef } from "react";

const COLORS = ["#fffaf0", "#fffaf0", "#f6b2c0", "#e2566f", "#f5a524", "#ffd36b"];

type Petal = { x: number; y: number; r: number; vy: number; sway: number; ph: number; rot: number; vr: number; c: string };

export default function Petals({ count = 26, className }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const n = innerWidth < 700 ? Math.round(count * 0.65) : count;
    let w = 0, h = 0, raf = 0, visible = true, last = performance.now();

    const size = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const make = (top: boolean): Petal => ({
      x: Math.random() * w,
      y: top ? -20 - Math.random() * h * 0.3 : Math.random() * h,
      r: 4 + Math.random() * 5,
      vy: 18 + Math.random() * 26,
      sway: 14 + Math.random() * 24,
      ph: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 1.6,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    });
    size();
    const petals = Array.from({ length: n }, () => make(false));

    const frame = (t: number) => {
      raf = 0;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.vy * dt;
        p.ph += dt * 1.2;
        p.rot += p.vr * dt;
        const x = p.x + Math.sin(p.ph) * p.sway;
        if (p.y > h + 20) petals[i] = make(true);
        ctx.save();
        ctx.translate(x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(p.ph)));
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (visible) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(cv);
    const onVis = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : start());
    document.addEventListener("visibilitychange", onVis);
    addEventListener("resize", size);
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      removeEventListener("resize", size);
    };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
