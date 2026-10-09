/**
 * Patterns and frames — original SVG artwork.
 *  Kolam          sikku (interlaced) kolam that can draw itself (ref 6)
 *  MughalArch     scalloped arch window with maroon damask (opening, ref 1)
 *  FloralBorder   cream-on-gold floral fill around the arch (opening, ref 1)
 *  GarlandArch    gold filigree arch with marigold strings and bells (ref 9)
 */
import type { CSSProperties } from "react";
import { Bell } from "./Temple";
import { MarigoldString } from "./Nature";

type P = { className?: string; style?: CSSProperties };

/* ── kolam ─────────────────────────────────────────────────────── */
function serpentine(n: number, s: number, vertical: boolean) {
  const pt = (x: number, y: number) => (vertical ? `${y * s} ${x * s}` : `${x * s} ${y * s}`);
  let d = `M${pt(0, 0)}C${pt(-0.85, 0.15)} ${pt(0.15, -0.85)} ${pt(0, 0)}`;
  for (let k = 0; k <= n; k++) {
    const right = k % 2 === 0;
    for (let a = 0; a < n; a++) {
      const x0 = right ? a : n - a;
      const x1 = right ? a + 1 : n - a - 1;
      const sign = (a + k + (vertical ? 1 : 0)) % 2 ? 1 : -1;
      d += `Q${pt((x0 + x1) / 2, k + sign * 0.2)} ${pt(x1, k)}`;
    }
    const xe = right ? n : 0;
    if (k < n) {
      const out = right ? n + 0.95 : -0.95;
      d += `C${pt(out, k - 0.35)} ${pt(out, k + 1.35)} ${pt(xe, k + 1)}`;
    } else {
      const o = right ? 0.85 : -0.85;
      d += `C${pt(xe + o, k - 0.15)} ${pt(xe - (right ? 0.15 : -0.15), k + 0.85)} ${pt(xe, k)}`;
    }
  }
  return d;
}

export function Kolam({ className, style, n = 6, dots = true }: P & { n?: number; dots?: boolean }) {
  const s = 40;
  const R = ((n / 2 + 1.3) * Math.SQRT2 * s).toFixed(1);
  return (
    <svg className={className} style={style} viewBox={`${-R} ${-R} ${2 * +R} ${2 * +R}`} aria-hidden="true">
      <g transform={`rotate(45) translate(${(-n * s) / 2} ${(-n * s) / 2})`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path className="kolamLine" pathLength={1} d={serpentine(n, s, false)} />
        <path className="kolamLine" pathLength={1} d={serpentine(n, s, true)} style={{ transitionDelay: "0.4s" }} />
        {dots && (
          <g fill="currentColor" stroke="none" className="kolamDots">
            {Array.from({ length: n * n }, (_, i) => (
              <circle key={i} cx={((i % n) + 0.5) * s} cy={(Math.floor(i / n) + 0.5) * s} r="3" />
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}

/* ── opening frame ─────────────────────────────────────────────── */
/** Multifoil Mughal arch, top and bottom, in a 400×700 box. */
export const ARCH_PATH =
  "M0 610V190A46 46 0 0 1 36 128A52 52 0 0 1 96 78A56 56 0 0 1 160 36Q186 22 200 0Q214 22 240 36A56 56 0 0 1 304 78A52 52 0 0 1 364 128A46 46 0 0 1 400 190V610A46 46 0 0 1 364 640A50 50 0 0 1 300 676Q250 690 200 700Q150 690 100 676A50 50 0 0 1 36 640A46 46 0 0 1 0 610Z";

export function MughalArch({ className, style, children }: P & { children?: React.ReactNode }) {
  return (
    <svg className={className} style={style} viewBox="0 0 400 700" aria-hidden="true">
      <defs>
        <pattern id="o-damask" width="80" height="96" patternUnits="userSpaceOnUse">
          <rect width="80" height="96" fill="#7c1424" />
          <g fill="none" stroke="#9b2b36" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
            <path d="M40 8c-14 10-14 28 0 36 14-8 14-26 0-36zM40 44v18M40 62c-8 8-20 8-24 0M40 62c8 8 20 8 24 0" />
            <path d="M0 48c10-6 18-2 20 6s-6 14-12 10M80 48c-10-6-18-2-20 6s6 14 12 10" />
            <path d="M14 90c4-10 14-12 20-6M66 90c-4-10-14-12-20-6" />
          </g>
          <g fill="#a5333d" opacity="0.8">
            <circle cx="40" cy="26" r="3" />
            <circle cx="0" cy="0" r="2.4" />
            <circle cx="80" cy="0" r="2.4" />
            <circle cx="0" cy="96" r="2.4" />
            <circle cx="80" cy="96" r="2.4" />
          </g>
        </pattern>
        <radialGradient id="o-vignette" cx="0.5" cy="0.45" r="0.65">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#2a0409" stopOpacity="0.55" />
        </radialGradient>
        <clipPath id="o-arch">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
      <g clipPath="url(#o-arch)">
        <rect width="400" height="700" fill="url(#o-damask)" />
        <rect width="400" height="700" fill="url(#o-vignette)" />
        {children}
      </g>
      <path d={ARCH_PATH} fill="none" stroke="url(#a-gold)" strokeWidth="7" />
      <path d={ARCH_PATH} fill="none" stroke="#fff1c4" strokeWidth="1.4" opacity="0.7" transform="translate(200 350) scale(0.975) translate(-200 -350)" />
    </svg>
  );
}

export function FloralBorder({ className, style }: P) {
  return (
    <svg className={className} style={style} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="o-floral" width="110" height="110" patternUnits="userSpaceOnUse">
          <rect width="110" height="110" fill="#c4914a" />
          <g fill="#f6e4bd">
            <g transform="translate(30 30)">
              {Array.from({ length: 8 }, (_, i) => (
                <ellipse key={i} rx="6" ry="15" cy="-12" transform={`rotate(${i * 45})`} />
              ))}
              <circle r="7" fill="#c4914a" />
              <circle r="4" />
            </g>
            <g transform="translate(85 85)">
              {Array.from({ length: 6 }, (_, i) => (
                <ellipse key={i} rx="5" ry="11" cy="-9" transform={`rotate(${i * 60})`} />
              ))}
              <circle r="4.5" fill="#c4914a" />
            </g>
            <path d="M52 40c10-4 20 4 18 14-8-2-14-6-18-14zM62 70c-10 2-16 10-12 18 8-2 12-8 12-18zM8 78c6-8 18-8 22 0-8 4-16 4-22 0zM96 30c-8-4-16 0-16 8 8 2 14-2 16-8z" />
          </g>
          <g fill="none" stroke="#f6e4bd" strokeWidth="1.6" strokeLinecap="round">
            <path d="M44 44c14 6 22 18 26 30M58 26c10-6 24-6 32 2M18 60c-6 12-6 24 0 34" />
          </g>
        </pattern>
        <linearGradient id="o-floral-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1406" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#3a1406" stopOpacity="0" />
          <stop offset="1" stopColor="#3a1406" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#o-floral)" />
      <rect width="100%" height="100%" fill="url(#o-floral-shade)" />
    </svg>
  );
}

/* ── garland arch (ref 9) ─────────────────────────────────────── */
export function GarlandArch({ className, style }: P) {
  const strings = [70, 130, 190, 810, 870, 930];
  return (
    <div className={className} style={style} aria-hidden="true" data-garland>
      <svg viewBox="0 0 1000 240" preserveAspectRatio="xMidYMin meet" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <g fill="none" stroke="url(#a-gold)" strokeLinecap="round">
          <path d="M0 40H1000" strokeWidth="5" />
          <path d="M0 54H1000" strokeWidth="1.5" />
          <path d="M40 240C40 120 230 60 500 60S960 120 960 240" strokeWidth="4" />
          <path d="M70 240C70 140 250 84 500 84S930 140 930 240" strokeWidth="1.5" />
          {[[230, 92], [770, 92]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y}c-30-30-70-10-60 20 6 18 30 18 34 0 2-10-8-16-14-10`} strokeWidth="2.5" />
          ))}
          <path d="M470 60c10-26 50-26 60 0M486 60c4-12 24-12 28 0" strokeWidth="2.5" />
          <path d="M500 20v20" strokeWidth="2.5" />
        </g>
        <circle cx="500" cy="16" r="7" fill="url(#a-gold)" />
        {/* scalloped valance */}
        <g fill="url(#a-gold)" opacity="0.9">
          {Array.from({ length: 50 }, (_, i) => (
            <path key={i} d={`M${i * 20} 54q10 12 20 0z`} />
          ))}
        </g>
      </svg>
      {strings.map((x, i) => (
        <span key={x} className="garlandString" style={{ left: `${x / 10}%`, animationDelay: `${i * 0.35}s` }}>
          <MarigoldString n={i % 3 === 1 ? 14 : 10} />
          {i % 3 !== 1 && <Bell chain={10} jasmine={false} className="garlandBell" />}
        </span>
      ))}
    </div>
  );
}
