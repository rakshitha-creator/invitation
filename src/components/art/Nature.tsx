/**
 * Plants and flowers — original SVG artwork.
 * Banana leaves / tree in a gold pot, lotus pond, marigold strings, foliage.
 */
import type { CSSProperties, ReactNode } from "react";

/** trig rounded to 4 dp so server and browser render identical SVG (no hydration drift) */
const sin = (x: number) => Math.round(Math.sin(x) * 1e4) / 1e4;
const cos = (x: number) => Math.round(Math.cos(x) * 1e4) / 1e4;


type P = { className?: string; style?: CSSProperties };

/** One banana leaf pointing up from (0,0): length l, half-width w, with veins and a few tears. */
function Leaf({ l, w, tears = [] as number[], fill = "url(#a-leaf)" }: { l: number; w: number; tears?: number[]; fill?: string }) {
  const veins: ReactNode[] = [];
  for (let t = 0.1; t < 0.95; t += 0.045) {
    const y = -l * t;
    const half = w * sin(Math.PI * Math.min(1, t * 1.15)) * 0.95;
    veins.push(<path key={t} d={`M0 ${y}q${half * 0.5} ${-l * 0.02} ${half} ${-l * 0.05}M0 ${y}q${-half * 0.5} ${-l * 0.02} ${-half} ${-l * 0.05}`} />);
  }
  return (
    <g>
      <path d={`M0 0C${w * 1.05} ${-l * 0.12} ${w * 1.1} ${-l * 0.72} 0 ${-l}C${-w * 1.05} ${-l * 0.72} ${-w} ${-l * 0.12} 0 0Z`} fill={fill} />
      <g stroke="#2f5216" strokeOpacity="0.35" strokeWidth="1" fill="none">
        {veins}
      </g>
      {tears.map((t) => (
        <path key={t} d={`M0 ${-l * t}l${w * 0.95} ${-l * 0.06}`} stroke="#fdf6e6" strokeWidth="2.2" opacity="0.9" />
      ))}
      <path d={`M0 0Q${w * 0.06} ${-l * 0.5} 0 ${-l}`} stroke="#e4efb4" strokeWidth={Math.max(1.5, w * 0.06)} fill="none" />
    </g>
  );
}

/** A fan of banana leaves growing from the bottom-left corner of its box (mirror with flip). */
export function BananaLeaves({ className, style, flip = false }: P & { flip?: boolean }) {
  const leaves = [
    { r: -8, l: 380, w: 62, t: [0.42, 0.66] },
    { r: 22, l: 360, w: 58, t: [0.55] },
    { r: 52, l: 330, w: 54, t: [0.38, 0.7] },
    { r: 80, l: 280, w: 48, t: [0.5] },
    { r: -34, l: 300, w: 50, t: [0.6] },
  ];
  return (
    <svg className={className} style={style} viewBox="0 0 520 520" aria-hidden="true">
      <g transform={flip ? "translate(520 0) scale(-1 1)" : undefined}>
        <g transform="translate(80 500)">
          {leaves.map((f, i) => (
            <g key={i} transform={`rotate(${f.r})`} className="sway" style={{ animationDelay: `${i * 0.6}s` }}>
              <Leaf l={f.l} w={f.w} tears={f.t} />
            </g>
          ))}
          <path d="M-8 20C-4 0 4-20 6-40" stroke="#6b8a2e" strokeWidth="16" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}

/** Banana tree with a bunch and flower, in an embossed gold pot (ref 5). */
export function BananaTree({ className, style, flip = false }: P & { flip?: boolean }) {
  const leaves = [
    { r: -62, l: 250, w: 46 }, { r: -40, l: 270, w: 48 }, { r: -14, l: 280, w: 50 }, { r: 12, l: 270, w: 48 },
    { r: 38, l: 250, w: 46 }, { r: 62, l: 220, w: 42 }, { r: -84, l: 190, w: 38 },
  ];
  return (
    <svg className={className} style={style} viewBox="0 0 400 760" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
        {/* trunk */}
        <path d="M184 650c-6-120-4-260 8-370h26c10 110 10 250 4 370z" fill="url(#a-leaf-soft)" />
        <g stroke="#3f5f22" strokeOpacity="0.35" strokeWidth="2" fill="none">
          <path d="M196 640c-2-100 0-220 6-350M210 640c2-110 2-230-2-350" />
        </g>
        {/* lower leaves */}
        {[{ r: -48, l: 150, w: 32, y: 560 }, { r: 52, l: 140, w: 30, y: 590 }, { r: -70, l: 120, w: 28, y: 610 }].map((f, i) => (
          <g key={i} transform={`translate(203 ${f.y}) rotate(${f.r})`}>
            <Leaf l={f.l} w={f.w} fill="url(#a-leaf)" />
          </g>
        ))}
        {/* crown */}
        <g transform="translate(205 300)">
          {leaves.map((f, i) => (
            <g key={i} transform={`rotate(${f.r})`} className="sway" style={{ animationDelay: `${i * 0.45}s` }}>
              <Leaf l={f.l} w={f.w} tears={[0.5]} />
            </g>
          ))}
        </g>
        {/* bunch + flower */}
        <g transform="translate(240 330)">
          <path d="M0 0c10 20 14 50 10 90" stroke="#6b8a2e" strokeWidth="6" fill="none" />
          {Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 5 - Math.floor(r / 2) }, (_, k) => (
              <path key={`${r}-${k}`} d={`M${-14 + k * 9 + r * 2} ${12 + r * 13}c-6 8-6 16-2 22 4-6 6-14 4-22z`} fill="#7fae35" stroke="#4f7d22" strokeWidth="0.8" />
            )),
          )}
          <path d="M10 92c-12 6-16 26-6 40 10-8 16-26 6-40z" fill="#a3203f" />
          <path d="M10 96c4 10 4 22-2 34" stroke="#e35a76" strokeWidth="2" fill="none" />
        </g>
        {/* gold pot */}
        <path d="M120 640h166l-10 18H130z" fill="url(#a-gold)" />
        <path d="M128 656c-20 40-14 78 20 96h110c34-18 40-56 20-96z" fill="url(#a-gold)" />
        <g fill="none" stroke="#7a5418" strokeOpacity="0.55" strokeWidth="1.5">
          <path d="M138 690c40 12 90 12 130 0M140 716c40 10 86 10 126 0" />
          {[160, 184, 208, 232, 256].map((x) => (
            <circle key={x} cx={x} cy="703" r="7" />
          ))}
        </g>
        <path d="M150 680c-4 20 0 40 10 56" stroke="#fff3c9" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/** Pink lotuses, a bud and lily pads (ref 2). */
export function LotusPond({ className, style }: P) {
  const flower = (x: number, y: number, s: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
      {[-70, -48, -26, 26, 48, 70].map((r) => (
        <path key={r} transform={`rotate(${r})`} d="M0 0C-14-14-14-44 0-64 14-44 14-14 0 0z" fill="url(#a-lotus)" stroke="#c23a63" strokeOpacity="0.4" strokeWidth="1" />
      ))}
      {[-12, 12].map((r) => (
        <path key={r} transform={`rotate(${r})`} d="M0 0C-12-14-12-46 0-70 12-46 12-14 0 0z" fill="url(#a-lotus)" stroke="#c23a63" strokeOpacity="0.45" strokeWidth="1" />
      ))}
      <ellipse cx="0" cy="-12" rx="14" ry="7" fill="#f2c94c" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={-10 + i * 2.5} cy={-16 - sin(i) * 2} r="1.4" fill="#d79a1e" />
      ))}
    </g>
  );
  return (
    <svg className={className} style={style} viewBox="0 0 520 420" preserveAspectRatio="xMinYMax meet" aria-hidden="true">
      {/* stems */}
      <g stroke="#5d8a3a" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M140 420C136 360 132 300 138 230" />
        <path d="M250 420C252 360 250 300 262 260" />
        <path d="M80 420C84 380 86 330 92 290" />
        <path d="M330 420C328 380 326 350 334 320" />
      </g>
      {/* pads */}
      {[
        [300, 390, 84, 26, -8], [60, 400, 90, 28, 6], [190, 410, 70, 20, 0], [420, 404, 76, 22, 10],
      ].map(([x, y, rx, ry, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx={rx} ry={ry} fill="url(#a-pad)" />
          <path d={`M0 0L${rx} -4L${rx} 6z`} fill="#fdf8ec" />
          <path d={`M0 0L${-rx * 0.8} ${-ry * 0.5}M0 0L${-rx * 0.4} ${ry * 0.8}M0 0L${rx * 0.4} ${-ry * 0.8}`} stroke="#2f5216" strokeOpacity="0.3" />
        </g>
      ))}
      {/* tall leaf */}
      <g transform="translate(330 330) rotate(-14)">
        <ellipse cx="0" cy="-30" rx="58" ry="22" fill="url(#a-pad)" transform="rotate(-20)" />
      </g>
      {flower(138, 232, 1.25, "a")}
      {flower(262, 262, 1, "b")}
      {flower(334, 322, 0.7, "c")}
      {/* bud */}
      <g transform="translate(92 290)">
        <path d="M0 0C-14-16-12-48 0-66 12-48 14-16 0 0z" fill="url(#a-lotus)" />
        <path d="M0 0C-6-20-4-46 0-66" stroke="#c23a63" strokeOpacity="0.4" fill="none" />
      </g>
    </svg>
  );
}

/** A hanging string of marigolds (with a rose every few flowers), ending in a bell tassel. */
export function MarigoldString({ className, style, n = 18 }: P & { n?: number }) {
  return (
    <svg className={className} style={style} viewBox={`0 0 30 ${n * 15 + 20}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <circle cx={15 + sin(i * 1.3) * 1.2} cy={10 + i * 15} r="8.5" fill={i % 5 === 4 ? "url(#a-rose)" : i % 2 ? "#f7b733" : "url(#a-marigold)"} />
          <circle cx={15} cy={10 + i * 15} r="2.5" fill="#9a3f08" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

/** Botanical foliage band (ref 9): palm fronds, tall grasses, little flowers. */
export function Foliage({ className, style }: P) {
  const blade = (x: number, h: number, r: number, k: string, c = "#5f8a4a") => (
    <path key={k} transform={`translate(${x} 260) rotate(${r})`} d={`M0 0C-8 ${-h * 0.4}-6 ${-h * 0.8} 0 ${-h}C6 ${-h * 0.8} 8 ${-h * 0.4} 0 0z`} fill={c} />
  );
  return (
    <svg className={className} style={style} viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {Array.from({ length: 46 }, (_, i) => blade(i * 27 + ((i * 37) % 13), 70 + ((i * 53) % 110), ((i * 29) % 40) - 20, `b${i}`, i % 3 ? "#6f9a55" : "#4d7a3c"))}
      {[120, 520, 980].map((x, k) => (
        <g key={k} transform={`translate(${x} 260)`}>
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i} transform={`rotate(${-80 + i * 20})`}>
              <Leaf l={150 + (i % 3) * 20} w={14} fill="url(#a-leaf-soft)" />
            </g>
          ))}
        </g>
      ))}
      {[
        [60, 170, "#e86d8a"], [260, 150, "#f2c14e"], [340, 190, "#d9466f"], [700, 160, "#f2c14e"], [820, 140, "#e86d8a"],
        [1080, 170, "#c06bb0"], [1140, 150, "#f2c14e"], [450, 140, "#c06bb0"], [610, 190, "#d9466f"],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d={`M0 0V${260 - (y as number)}`} stroke="#5f8a4a" strokeWidth="2" />
          {Array.from({ length: 6 }, (_, k) => (
            <circle key={k} cx={cos(k) * 7} cy={-k * 6} r={5 - k * 0.5} fill={c as string} />
          ))}
        </g>
      ))}
    </svg>
  );
}
