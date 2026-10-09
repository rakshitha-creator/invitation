/**
 * One small painted scene per celebration — each with its own time of day,
 * after the storybook invite in ref 10 (figures are not reproduced). Original SVG.
 */
import type { CSSProperties } from "react";
import { Flame } from "./Temple";

/** trig rounded to 4 dp so server and browser render identical SVG (no hydration drift) */
const sin = (x: number) => Math.round(Math.sin(x) * 1e4) / 1e4;
const cos = (x: number) => Math.round(Math.cos(x) * 1e4) / 1e4;


type Id = "haldi" | "mehendi" | "sangeet" | "wedding" | "reception";

const Stars = ({ n = 40, h = 150 }: { n?: number; h?: number }) => (
  <g fill="#fff6d8">
    {Array.from({ length: n }, (_, i) => (
      <circle key={i} className="twinkle" style={{ animationDelay: `${(i % 7) * 0.4}s` }} cx={(i * 97) % 400} cy={(i * 53) % h} r={i % 5 === 0 ? 1.6 : 0.9} />
    ))}
  </g>
);

function Haldi() {
  return (
    <>
      <defs>
        <linearGradient id="sc-haldi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="1" stopColor="#f2b33d" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#sc-haldi)" />
      <g transform="translate(300 70)" className="spin">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} transform={`rotate(${i * 22.5})`} d="M0-34L4-90-4-90z" fill="#fff8d8" opacity="0.6" />
        ))}
      </g>
      <circle cx="300" cy="70" r="30" fill="#fff4c2" />
      {/* forest + swing */}
      <path d="M0 150c40-30 80-20 110-40 30 20 70 10 100 30 40-20 90-30 190 0v100H0z" fill="#9db94c" opacity="0.7" />
      <path d="M0 180c60-20 140-10 200 0s140 10 200-10v70H0z" fill="#6f9a3a" />
      <path d="M150 0v128M210 0v128" stroke="#7a5418" strokeWidth="3" />
      <rect x="140" y="126" width="80" height="10" rx="3" fill="#a8743a" />
      {/* mango-leaf toran */}
      <path d="M0 14q200 30 400 0" stroke="#7a5418" strokeWidth="2" fill="none" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 15 + i * 31;
        const y = 14 + sin((x / 400) * Math.PI) * 14;
        return <path key={i} d={`M${x} ${y}c-6 10-6 22 0 30 6-8 6-20 0-30z`} fill={i % 3 === 1 ? "#f2a14e" : "#4f7d22"} />;
      })}
      {/* turmeric bowl */}
      <path d="M276 196c0 18 18 28 40 28s40-10 40-28z" fill="url(#a-brass)" />
      <ellipse cx="316" cy="196" rx="40" ry="8" fill="#f2c21a" />
      <circle cx="300" cy="194" r="5" fill="#e86d8a" />
      <circle cx="330" cy="193" r="5" fill="#fffdf6" />
    </>
  );
}

function Mehendi() {
  return (
    <>
      <defs>
        <linearGradient id="sc-mehendi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe8ef" />
          <stop offset="1" stopColor="#f3f0d0" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#sc-mehendi)" />
      <path d="M0 140c50-20 90-10 130-26 40 16 100 6 140 22 40-12 90-14 130 4v100H0z" fill="#86b25a" />
      <path d="M0 190c80-16 160-4 240-10s120-8 160 2v58H0z" fill="#5f8f3d" />
      {[30, 80, 330, 370].map((x, i) => (
        <circle key={x} cx={x} cy={150 - (i % 2) * 10} r="26" fill="#4d7a3c" />
      ))}
      {/* a large peacock feather */}
      <g transform="translate(205 222) rotate(-24)">
        <path d="M0 0C2-60 4-130 0-196" stroke="#8a7a3a" strokeWidth="2.5" fill="none" />
        {Array.from({ length: 34 }, (_, i) => (
          <g key={i}>
            <path d={`M0 ${-20 - i * 5}q${-26 - sin(i / 6) * 8} ${-4} ${-34} ${-14}`} stroke="#3e8f6a" strokeWidth="1.2" fill="none" />
            <path d={`M0 ${-20 - i * 5}q${26 + sin(i / 6) * 8} ${-4} ${34} ${-14}`} stroke="#3e8f6a" strokeWidth="1.2" fill="none" />
          </g>
        ))}
        <ellipse cy="-176" rx="26" ry="32" fill="#2f8a6a" />
        <ellipse cy="-172" rx="19" ry="24" fill="#c99a2e" />
        <ellipse cy="-168" rx="13" ry="16" fill="#2b5fae" />
        <ellipse cy="-164" rx="7" ry="9" fill="#14275e" />
      </g>
      {/* mehendi cone */}
      <g transform="translate(90 200) rotate(30)">
        <path d="M0 0l40-6-40-6z" fill="#4a3a1a" />
        <path d="M40-6l10 0" stroke="#7a2412" strokeWidth="3" />
      </g>
      {[[300, 40], [330, 60], [280, 70]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}q6-6 12 0q6-6 12 0`} stroke="#5a5a5a" strokeWidth="1.4" fill="none" />
      ))}
    </>
  );
}

function Sangeet() {
  return (
    <>
      <defs>
        <linearGradient id="sc-sangeet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1838" />
          <stop offset="1" stopColor="#2a3a6e" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#sc-sangeet)" />
      <Stars />
      <circle cx="70" cy="50" r="18" fill="#fff4cf" />
      <circle cx="78" cy="45" r="16" fill="#0f1d44" />
      {/* rising sky lanterns */}
      {[[120, 90, 1], [190, 60, 0.8], [260, 100, 1.1], [320, 50, 0.7], [230, 30, 0.6]].map(([x, y, s], i) => (
        <g key={i} className="rise" style={{ animationDelay: `${i * 0.9}s` }}>
          <g transform={`translate(${x} ${y}) scale(${s})`}>
            <circle r="22" fill="url(#a-glow)" />
            <path d="M-9-12h18l4 22h-26z" fill="#ffb347" />
            <path d="M-9-12h18l4 22h-26z" fill="#fff0b8" opacity="0.45" />
          </g>
        </g>
      ))}
      {/* lotus lake */}
      <rect y="176" width="400" height="64" fill="#1b4c7a" />
      <path d="M0 184q100 8 200 0t200 0" stroke="#7fb0e8" strokeOpacity="0.4" fill="none" />
      {[40, 110, 300, 360].map((x, i) => (
        <g key={x} transform={`translate(${x} ${214 + (i % 2) * 8})`}>
          {[-50, -20, 20, 50].map((r) => (
            <path key={r} transform={`rotate(${r})`} d="M0 0C-6-6-6-18 0-26 6-18 6-6 0 0z" fill="url(#a-lotus)" />
          ))}
          <path d="M0 0C-6-6-6-20 0-30 6-20 6-6 0 0z" fill="url(#a-lotus)" />
        </g>
      ))}
    </>
  );
}

function Wedding() {
  return (
    <>
      <defs>
        <linearGradient id="sc-wedding" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1030" />
          <stop offset="1" stopColor="#5a1830" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#sc-wedding)" />
      <Stars n={50} h={120} />
      {/* mandap */}
      <g fill="url(#a-gold)">
        <rect x="110" y="70" width="8" height="140" />
        <rect x="282" y="70" width="8" height="140" />
        <path d="M100 74h200l-20-26H120z" />
        <path d="M150 48q50-36 100 0z" />
      </g>
      {/* jasmine + rose garlands (varmala) */}
      {[[118, 286, 120], [130, 270, 104]].map(([a, b, y], k) => (
        <g key={k}>
          {Array.from({ length: 22 }, (_, i) => {
            const t = i / 21;
            const x = a + (b - a) * t;
            const yy = 74 + sin(t * Math.PI) * (y - 74);
            return <circle key={i} cx={x} cy={yy} r="4.6" fill={i % 4 === 0 ? "url(#a-rose)" : k ? "url(#a-marigold)" : "#fffdf6"} />;
          })}
        </g>
      ))}
      {/* sacred fire */}
      <path d="M170 214h60l-8 12h-44z" fill="url(#a-copper)" />
      <path d="M164 206h72v10h-72z" fill="#8a4a2a" />
      <ellipse cx="200" cy="190" rx="50" ry="40" fill="url(#a-glow)" className="glow" />
      <Flame x={200} y={208} s={2.2} />
      <Flame x={186} y={208} s={1.4} d={0.3} />
      <Flame x={214} y={208} s={1.5} d={0.6} />
      <rect y="226" width="400" height="14" fill="#3a0e1a" />
    </>
  );
}

function Reception() {
  return (
    <>
      <defs>
        <linearGradient id="sc-reception" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101a3a" />
          <stop offset="1" stopColor="#3c4f84" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#sc-reception)" />
      <Stars n={36} />
      {/* string lights */}
      {[0, 1].map((k) => (
        <g key={k}>
          <path d={`M0 ${30 + k * 26}q200 ${40 - k * 10} 400 0`} stroke="#c9b37a" strokeWidth="1" fill="none" />
          {Array.from({ length: 16 }, (_, i) => {
            const t = (i + 0.5) / 16;
            const x = t * 400;
            const y = 30 + k * 26 + 4 * t * (1 - t) * (20 - k * 5) * 2;
            return <circle key={i} className="twinkle" style={{ animationDelay: `${i * 0.2}s` }} cx={x} cy={y + 4} r="3" fill="#ffd98a" />;
          })}
        </g>
      ))}
      {/* palms */}
      {[[40, 1], [370, -1]].map(([x, f], k) => (
        <g key={k} transform={`translate(${x} 240) scale(${f} 1)`}>
          <path d="M0 0C4-50 10-100 26-140" stroke="#1f2f22" strokeWidth="8" fill="none" />
          {[-120, -80, -40, -10, 30].map((r, i) => (
            <path key={i} transform={`translate(26 -140) rotate(${r})`} d="M0 0C20-6 50-6 76 6 50 2 20 6 0 0z" fill="#1f3a26" />
          ))}
        </g>
      ))}
      {/* clouds */}
      <g fill="#f4f1ff" opacity="0.9">
        <path d="M60 240c-10-30 30-46 50-30 10-26 60-26 70 0 20-20 60-10 60 20 20-10 60 0 60 10z" />
        <path d="M200 240c0-24 40-34 56-18 14-20 56-14 60 8 20-8 50 0 50 10z" opacity="0.8" />
      </g>
    </>
  );
}

const MAP: Record<Id, () => React.JSX.Element> = { haldi: Haldi, mehendi: Mehendi, sangeet: Sangeet, wedding: Wedding, reception: Reception };

export function EventScene({ id, className, style }: { id: Id; className?: string; style?: CSSProperties }) {
  const S = MAP[id];
  return (
    <svg className={className} style={style} viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <S />
    </svg>
  );
}
