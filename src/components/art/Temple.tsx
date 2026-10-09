/**
 * Temple objects — original SVG artwork (no traced or copied imagery).
 * Bells, kuthuvilakku lamp, kalash, urli, carved pillar, gopuram, elephant.
 * Paint comes from <ArtDefs/>.
 */
import type { CSSProperties } from "react";

/** trig rounded to 4 dp so server and browser render identical SVG (no hydration drift) */
const sin = (x: number) => Math.round(Math.sin(x) * 1e4) / 1e4;
const cos = (x: number) => Math.round(Math.cos(x) * 1e4) / 1e4;


type P = { className?: string; style?: CSSProperties };

/* ── flame (flickers via .flame class in globals.css) ─────────── */
export function Flame({ x, y, s = 1, d = 0 }: { x: number; y: number; s?: number; d?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="16" cy="-6" fill="url(#a-glow)" className="glow" style={{ animationDelay: `${d}s` }} />
      <path
        className="flame"
        style={{ animationDelay: `${d}s` }}
        d="M0 4C-6 2-7-5-4-11-2-15-1-19 0-24 2-18 6-13 6-6 6 0 4 3 0 4Z"
        fill="url(#a-flame)"
      />
    </g>
  );
}

/* ── hanging temple bell with chain and a jasmine tuft ────────── */
export function Bell({ className, style, chain = 150, jasmine = true }: P & { chain?: number; jasmine?: boolean }) {
  const links = Array.from({ length: Math.floor(chain / 9) }, (_, i) => i * 9);
  const h = chain + 80;
  return (
    <svg className={className} style={style} viewBox={`0 0 60 ${h}`} aria-hidden="true">
      <g fill="none" stroke="#7a5418" strokeWidth="2">
        {links.map((y, i) =>
          i % 2 ? (
            <line key={y} x1="30" y1={y} x2="30" y2={y + 9} stroke="#a77a2a" strokeWidth="2.4" />
          ) : (
            <ellipse key={y} cx="30" cy={y + 4.5} rx="3" ry="5" />
          ),
        )}
      </g>
      {jasmine && (
        <g transform={`translate(30 ${chain - 8})`}>
          {[[-9, 0], [9, 0], [0, -6], [-5, 6], [5, 6], [0, 2], [-12, 7], [12, 7]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.6" fill="#fffdf6" stroke="#e5dcc6" strokeWidth="0.8" />
          ))}
          <circle cx="0" cy="12" r="3" fill="#d43a50" />
        </g>
      )}
      <g transform={`translate(0 ${chain})`}>
        <path d="M27 2h6v8h-6z" fill="url(#a-brass)" />
        <path
          d="M30 8c-7 0-11 4-12 10-1 9-3 17-6 24-2 5-6 8-6 11h48c0-3-4-6-6-11-3-7-5-15-6-24-1-6-5-10-12-10z"
          fill="url(#a-brass)"
        />
        <path d="M6 53h48c0 4-3 6-6 6H12c-3 0-6-2-6-6z" fill="#8a5a17" />
        <path d="M14 30c4 2 28 2 32 0" stroke="#fff1c2" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
        <circle cx="30" cy="65" r="5.5" fill="url(#a-brass)" />
      </g>
    </svg>
  );
}

/* ── kuthuvilakku: tall brass oil lamp, five lit wicks ──────────── */
export function Lamp({ className, style, lit = true }: P & { lit?: boolean }) {
  return (
    <svg className={className} style={style} viewBox="0 0 140 430" aria-hidden="true">
      {lit && <ellipse cx="70" cy="140" rx="70" ry="44" fill="url(#a-glow)" className="glow" />}
      {/* annam finial */}
      <g fill="url(#a-brass)">
        <path d="M70 6c6 0 9 5 8 10-1 4 4 6 8 5-2 6-8 9-14 8l-2 8h-6l1-9c-5-2-7-7-5-12 1-5 5-10 10-10z" />
        <path d="M66 38h8l4 8H62z" />
        <ellipse cx="70" cy="56" rx="9" ry="9" />
        <rect x="66" y="64" width="8" height="26" />
        <ellipse cx="70" cy="96" rx="13" ry="7" />
        <rect x="65" y="102" width="10" height="34" />
      </g>
      {/* oil dish */}
      <path d="M12 140c16 16 100 16 116 0l-8 16c-10 10-90 10-100 0z" fill="url(#a-brass)" />
      <ellipse cx="70" cy="140" rx="58" ry="9" fill="#e6bd60" />
      <ellipse cx="70" cy="140" rx="50" ry="6" fill="#7a4f12" opacity="0.55" />
      {lit && (
        <g>
          <Flame x={22} y={137} s={0.85} d={0.1} />
          <Flame x={46} y={145} s={0.95} d={0.5} />
          <Flame x={70} y={147} s={1.05} d={0.25} />
          <Flame x={94} y={145} s={0.95} d={0.7} />
          <Flame x={118} y={137} s={0.85} d={0.35} />
        </g>
      )}
      {/* stem */}
      <g fill="url(#a-brass)">
        <rect x="64" y="158" width="12" height="40" />
        <ellipse cx="70" cy="202" rx="16" ry="9" />
        <rect x="63" y="208" width="14" height="44" />
        <ellipse cx="70" cy="258" rx="20" ry="11" />
        <rect x="62" y="266" width="16" height="40" />
        <ellipse cx="70" cy="312" rx="24" ry="10" />
        <path d="M60 318h20l8 26H52z" />
        <path d="M52 342c-6 16-28 30-36 52-2 8 4 14 12 14h84c8 0 14-6 12-14-8-22-30-36-36-52z" />
        <rect x="18" y="404" width="104" height="12" rx="4" />
      </g>
      <path d="M44 380c10-6 42-6 52 0" stroke="#fff3c9" strokeOpacity="0.5" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ── kalash: copper pot, mango leaves and coconut ─────────────── */
export function Kalash({ className, style }: P) {
  const leaves = [-64, -34, -8, 18, 46];
  return (
    <svg className={className} style={style} viewBox="0 0 170 210" aria-hidden="true">
      {leaves.map((r, i) => (
        <g key={i} transform={`translate(85 86) rotate(${r})`}>
          <path d="M0 0C-12-20-10-52 0-74 10-52 12-20 0 0z" fill="url(#a-leaf)" />
          <path d="M0-4V-70" stroke="#d7e9a0" strokeWidth="1.2" />
        </g>
      ))}
      <ellipse cx="85" cy="62" rx="25" ry="30" fill="#8b5a2b" />
      <path d="M68 40c6-12 28-12 34 0-6-4-28-4-34 0z" fill="#c8a06a" />
      <path d="M72 34c4-14 22-16 26-2" stroke="#d9b98a" strokeWidth="3" fill="none" />
      <path d="M58 90h54l-4 12H62z" fill="url(#a-copper)" />
      <circle cx="85" cy="150" r="56" fill="url(#a-copper)" />
      <path d="M33 140c30 10 74 10 104 0" stroke="#f2c14e" strokeWidth="5" fill="none" />
      <path d="M33 148c30 10 74 10 104 0" stroke="#c3262f" strokeWidth="3" fill="none" />
      {[64, 85, 106].map((x) => (
        <circle key={x} cx={x} cy="122" r="3.2" fill="#c3262f" />
      ))}
      <path d="M48 120c4-14 16-22 26-24" stroke="#ffd6b3" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M58 200h54l-6-8H64z" fill="#6e2d12" />
    </svg>
  );
}

/* ── urli: wide brass bowl, floating flowers and a diya ───────── */
export function Urli({ className, style }: P) {
  const flowers: [number, number, string, number][] = [
    [48, 34, "url(#a-rose)", 9], [80, 40, "#fffdf6", 8], [112, 32, "url(#a-marigold)", 9], [190, 36, "url(#a-rose)", 9],
    [222, 41, "#fffdf6", 8], [252, 33, "url(#a-marigold)", 8], [140, 44, "#fffdf6", 6], [168, 46, "url(#a-rose)", 7],
  ];
  return (
    <svg className={className} style={style} viewBox="0 0 300 120" aria-hidden="true">
      <ellipse cx="150" cy="60" rx="150" ry="58" fill="url(#a-glow)" className="glow" />
      <path d="M8 36c0 40 60 70 142 70s142-30 142-70z" fill="url(#a-brass)" />
      <ellipse cx="150" cy="36" rx="142" ry="20" fill="#e3b85c" />
      <ellipse cx="150" cy="38" rx="132" ry="15" fill="#5b2a14" opacity="0.85" />
      {flowers.map(([x, y, f, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={f} />
          <circle cx={x} cy={y} r={r * 0.35} fill={f === "#fffdf6" ? "#f2d35a" : "#7a1020"} opacity="0.6" />
        </g>
      ))}
      <path d="M134 40c4 6 28 6 32 0l-4-6h-24z" fill="#b5622f" />
      <Flame x={150} y={33} s={0.9} />
      <path d="M40 62c30 18 190 18 220 0" stroke="#fff1c2" strokeOpacity="0.4" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ── small brass elephant on a wooden stool ─────────────────────── */
export function Elephant({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 130 160" aria-hidden="true">
      <g fill="url(#a-brass)">
        <ellipse cx="68" cy="52" rx="36" ry="24" />
        <rect x="42" y="62" width="11" height="26" rx="3" />
        <rect x="58" y="64" width="11" height="24" rx="3" />
        <rect x="78" y="64" width="11" height="24" rx="3" />
        <rect x="92" y="60" width="11" height="28" rx="3" />
        <circle cx="34" cy="44" r="19" />
        <path d="M20 50c-6 10-6 22 2 30 3 3 8 1 6-3-5-6-4-14 2-20z" />
      </g>
      <path d="M38 34c8 2 12 12 8 22-6-2-12-10-8-22z" fill="#a8741f" />
      <path d="M44 66c10 4 40 4 52 0" stroke="#c3262f" strokeWidth="4" fill="none" />
      <circle cx="30" cy="40" r="1.8" fill="#3a220b" />
      <rect x="14" y="88" width="104" height="12" rx="3" fill="url(#a-wood)" />
      <path d="M22 100h10l-4 58h-6zM100 100h10l2 58h-6z" fill="url(#a-wood-dark)" />
      <path d="M30 120h72" stroke="#8a5c28" strokeWidth="4" />
    </svg>
  );
}

/* ── carved temple pillar (corbel, lotus capital, bands, peacock panel) ── */
export function Pillar({ className, style, peacock = true, garland = false }: P & { peacock?: boolean; garland?: boolean }) {
  const beads = (y: number, x0 = 58, x1 = 142) =>
    Array.from({ length: Math.floor((x1 - x0) / 8) + 1 }, (_, i) => <circle key={i} cx={x0 + i * 8} cy={y} r="2.6" />);
  return (
    <svg className={className} style={style} viewBox="0 0 200 1000" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* corbel */}
      <path d="M0 0h200v30H0z" fill="url(#a-wood)" />
      <path d="M8 30h184l-6 18H14z" fill="url(#a-wood-dark)" />
      <path d="M22 48c-8 0-14 6-12 14 2 6 10 8 14 3 4-4 0-10-4-8M178 48c8 0 14 6 12 14-2 6-10 8-14 3-4-4 0-10 4-8" fill="none" stroke="#5e3a16" strokeWidth="5" strokeLinecap="round" />
      <path d="M28 48h144l-14 30H42z" fill="url(#a-wood)" />
      <path d="M92 78h16l-8 18z" fill="url(#a-wood-dark)" />
      {/* capital: abacus + inverted lotus + kalasa */}
      <rect x="34" y="82" width="132" height="16" fill="url(#a-wood)" />
      <g fill="url(#a-wood)" stroke="#5e3a16" strokeWidth="1.2">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${42 + i * 14.5} 98c-6 10-4 22 7 24 11-2 13-14 7-24z`} />
        ))}
      </g>
      <ellipse cx="100" cy="146" rx="52" ry="26" fill="url(#a-wood)" />
      <path d="M52 140c30 10 66 10 96 0" stroke="#f0c98a" strokeOpacity="0.55" strokeWidth="2" fill="none" />
      <rect x="44" y="168" width="112" height="14" fill="url(#a-wood-dark)" />
      {/* shaft */}
      <rect x="56" y="182" width="88" height="420" fill="url(#a-wood)" />
      <g fill="#4d2e10" opacity="0.32">
        <rect x="66" y="210" width="68" height="70" rx="4" />
        <rect x="66" y="320" width="68" height="110" rx="34" />
        <rect x="66" y="470" width="68" height="70" rx="4" />
      </g>
      {/* carved medallions */}
      <g fill="none" stroke="#f3cf8e" strokeOpacity="0.75" strokeWidth="2">
        <path d="M100 222l22 23-22 23-22-23z" />
        <circle cx="100" cy="375" r="22" />
        <circle cx="100" cy="375" r="10" />
        <path d="M100 482l22 23-22 23-22-23z" />
      </g>
      <g fill="#f3cf8e" opacity="0.8">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <ellipse key={i} cx={100 + cos(a) * 16} cy={375 + sin(a) * 16} rx="3.2" ry="5.5" transform={`rotate(${(a * 180) / Math.PI + 90} ${100 + cos(a) * 16} ${375 + sin(a) * 16})`} />;
        })}
      </g>
      <g fill="url(#a-wood-dark)">
        <rect x="50" y="292" width="100" height="14" />
        <rect x="50" y="444" width="100" height="14" />
      </g>
      <g fill="#f0c98a" opacity="0.75">
        {beads(299)}
        {beads(451)}
      </g>
      {/* drop pendants */}
      <g fill="url(#a-wood)" stroke="#5e3a16" strokeWidth="1">
        {[70, 100, 130].map((x) => (
          <path key={x} d={`M${x - 7} 306h14l-7 18z`} />
        ))}
      </g>
      {/* lower block */}
      <rect x="40" y="600" width="120" height="20" fill="url(#a-wood-dark)" />
      <rect x="46" y="620" width="108" height="150" fill="url(#a-wood)" />
      <rect x="58" y="634" width="84" height="122" rx="42" fill="#4d2e10" opacity="0.3" />
      <g transform="translate(100 694)" fill="#f3cf8e" opacity="0.85">
        {[-50, -25, 0, 25, 50].map((r) => (
          <path key={r} transform={`rotate(${r})`} d="M0 0C-7-12-6-28 0-40 6-28 7-12 0 0z" />
        ))}
        <ellipse cx="0" cy="4" rx="16" ry="5" />
      </g>
      {/* base with peacock relief */}
      <path d="M30 770h140v18H30z" fill="url(#a-wood-dark)" />
      <rect x="22" y="788" width="156" height="166" fill="url(#a-wood)" />
      <rect x="32" y="798" width="136" height="146" fill="#4d2e10" opacity="0.3" />
      {peacock && (
        <g transform="translate(36 802)">
          {/* tail fan */}
          {Array.from({ length: 7 }, (_, i) => {
            const a = -70 + i * 17;
            return (
              <g key={i} transform={`translate(52 108) rotate(${a})`}>
                <path d="M0 0C6-20 6-50 0-72-6-50-6-20 0 0z" fill="#c99654" stroke="#5e3a16" strokeWidth="1" />
                <ellipse cx="0" cy="-60" rx="5" ry="7" fill="#7a4f22" />
                <circle cx="0" cy="-60" r="2.4" fill="#f3cf8e" />
              </g>
            );
          })}
          {/* body + neck */}
          <path d="M44 118c-10-6-12-22-2-32 6-6 6-16 2-26-3-8 2-16 9-14 6 2 6 10 3 16-4 10-2 18 6 26 10 10 8 26-4 30z" fill="url(#a-wood)" stroke="#5e3a16" strokeWidth="1.4" />
          <path d="M51 44l-4-10M55 43l1-11M59 45l5-9" stroke="#5e3a16" strokeWidth="1.6" />
          <path d="M44 54l-8 3 8 2z" fill="#5e3a16" />
          <circle cx="50" cy="52" r="1.6" fill="#3a220b" />
          <path d="M48 134v6M60 134v6" stroke="#5e3a16" strokeWidth="2" />
        </g>
      )}
      <path d="M14 954h172v20H14z" fill="url(#a-wood-dark)" />
      <path d="M6 974h188v26H6z" fill="url(#a-wood)" />
      {/* jasmine + rose garland strands (ref 5 / 6) */}
      {garland &&
        [44, 156].map((x, k) => (
          <g key={k}>
            {Array.from({ length: 34 }, (_, i) => (
              <circle key={i} cx={x + sin(i * 0.9) * 2} cy={190 + i * 11} r={i % 6 === 5 ? 6 : 5} fill={i % 6 === 5 ? "url(#a-rose)" : "#fffdf6"} stroke="#e4d9c0" strokeWidth="0.6" />
            ))}
          </g>
        ))}
    </svg>
  );
}

/* ── gopuram: tiered, painted gateway tower with an open doorway ── */
const NICHE = ["#2c9a92", "#d9577a", "#e8b33a", "#3d6fb8", "#5fb36b", "#e07a3a"];
export function Gopuram({ className, style }: P) {
  const tiers = 7;
  const baseY = 760;
  const tierH = 82;
  const rows = Array.from({ length: tiers }, (_, i) => {
    const w = 470 - i * 36;
    const y = baseY - (i + 1) * tierH;
    return { i, w, x: 300 - w / 2, y };
  });
  return (
    <svg className={className} style={style} viewBox="0 0 600 1000" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* kalasams */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 196 + i * 26;
        return (
          <g key={i} fill="url(#a-gold)">
            <path d={`M${x} 52c-4 6-4 10 0 12 4-2 4-6 0-12z`} />
            <ellipse cx={x} cy="72" rx="7" ry="9" />
            <ellipse cx={x} cy="86" rx="9" ry="6" />
            <rect x={x - 6} y="90" width="12" height="18" />
          </g>
        );
      })}
      {/* shala (barrel vault) */}
      <path d="M170 186c0-50 40-80 130-80s130 30 130 80z" fill="#c2453a" />
      <path d="M186 186c0-40 34-64 114-64s114 24 114 64" fill="none" stroke="#f0d27a" strokeWidth="5" />
      <g stroke="#7d1f18" strokeWidth="1.4" opacity="0.65">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1={190 + i * 18} y1="130" x2={180 + i * 18} y2="186" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`b${i}`} x1={180 + i * 18} y1="130" x2={190 + i * 18} y2="186" />
        ))}
      </g>
      <path d="M170 186c-22-10-30-34-14-50 6 14 16 20 26 22zM430 186c22-10 30-34 14-50-6 14-16 20-26 22z" fill="#2c9a92" stroke="#145e59" strokeWidth="2" />
      <circle cx="300" cy="150" r="22" fill="#e8b33a" stroke="#8a5a17" strokeWidth="3" />
      <circle cx="300" cy="150" r="10" fill="#d9577a" />
      {/* tiers */}
      {rows.map(({ i, w, x, y }) => {
        const n = Math.max(5, 11 - i);
        const cell = w / n;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={tierH} fill={i % 2 ? "#f1d9a6" : "#ecd09a"} />
            <rect x={x - 8} y={y + tierH - 14} width={w + 16} height="14" fill="#b9853f" />
            <path d={`M${x - 8} ${y + tierH - 14}h${w + 16}`} stroke="#6e4a1c" strokeWidth="2" />
            {Array.from({ length: n }, (_, k) => {
              const cx = x + cell * (k + 0.5);
              const center = k === Math.floor(n / 2);
              const col = NICHE[(k + i) % NICHE.length];
              return (
                <g key={k}>
                  <path
                    d={`M${cx - cell * 0.32} ${y + tierH - 16}v-38c0-12 ${cell * 0.32}-20 ${cell * 0.32}-20s${cell * 0.32} 8 ${cell * 0.32} 20v38z`}
                    fill={center ? "#2a1810" : col}
                    stroke="#6e4a1c"
                    strokeWidth="1.2"
                  />
                  {!center && (
                    <g fill={NICHE[(k + i + 2) % NICHE.length]}>
                      <circle cx={cx} cy={y + tierH - 46} r={cell * 0.09} />
                      <rect x={cx - cell * 0.1} y={y + tierH - 40} width={cell * 0.2} height="22" rx="3" />
                    </g>
                  )}
                  {/* small kudu arches on the cornice */}
                  <path d={`M${cx - 7} ${y + 6}c0-8 14-8 14 0z`} fill="#f0c25a" stroke="#6e4a1c" strokeWidth="1" />
                </g>
              );
            })}
          </g>
        );
      })}
      {/* base (stone) */}
      <rect x="40" y={baseY} width="520" height="230" fill="#d8b783" />
      <rect x="30" y={baseY} width="540" height="16" fill="#a77a42" />
      <rect x="24" y="972" width="552" height="28" fill="#9b7038" />
      <g fill="#c49d64">
        {[60, 110, 160, 200, 400, 440, 490, 540].map((x) => (
          <rect key={x} x={x - 8} y={baseY + 22} width="16" height="190" />
        ))}
      </g>
      {[[96, "#2c9a92"], [504, "#d9577a"]].map(([x, c]) => (
        <g key={x as number}>
          <path d={`M${(x as number) - 22} 900v-70c0-16 22-26 22-26s22 10 22 26v70z`} fill="#7c5a2c" />
          <circle cx={x as number} cy="836" r="7" fill={c as string} />
          <rect x={(x as number) - 8} y="844" width="16" height="44" rx="4" fill={c as string} />
        </g>
      ))}
      {/* doorway */}
      <rect x="236" y="790" width="128" height="200" fill="#6e4a1c" />
      <rect x="248" y="802" width="104" height="188" fill="#1d0f08" />
      <rect x="248" y="802" width="104" height="188" fill="url(#a-glow)" className="doorGlow" />
      <path d="M236 790h128" stroke="#f0c25a" strokeWidth="4" />
    </svg>
  );
}
