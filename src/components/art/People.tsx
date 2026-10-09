/**
 * The couple — original SVG artwork.
 *  CoupleBack   bride & groom seated, seen from behind (hero, ref 2)
 *  Hand         Sita's mehendi hand / Ram's blue hand reaching (closing, ref 9)
 *  Saptapadi    feet, hems and the tied knot (story, ref 8)
 *  Footprint    one alta-red footprint (story path)
 */
import type { CSSProperties } from "react";

/** trig rounded to 4 dp so server and browser render identical SVG (no hydration drift) */
const sin = (x: number) => Math.round(Math.sin(x) * 1e4) / 1e4;
const cos = (x: number) => Math.round(Math.cos(x) * 1e4) / 1e4;


type P = { className?: string; style?: CSSProperties };

export function CoupleBack({ className, style }: P) {
  const braid = Array.from({ length: 22 }, (_, i) => {
    const y = 118 + i * 11.5;
    const w = 13 - i * 0.38;
    return { y, w, x: 120 + (i % 2 ? 2 : -2) };
  });
  return (
    <svg className={className} style={style} viewBox="0 0 360 400" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* ── bride ── */}
      <g>
        {/* arms */}
        <path d="M64 176C52 214 48 300 52 400h26c-4-90-2-160 6-206z" fill="url(#a-skin-light)" />
        <path d="M174 176c10 40 14 120 10 224h-24c0-90-2-150-8-200z" fill="url(#a-skin-light)" />
        <path d="M52 236c8 2 18 2 26 0M51 245c8 2 18 2 26 0" stroke="#e2b24a" strokeWidth="4" fill="none" />
        {/* waist skin */}
        <path d="M70 236h104l4 34H66z" fill="url(#a-skin-light)" />
        {/* blouse with rounded shoulders */}
        <path d="M60 176C62 156 84 144 108 142h24c24 2 46 14 48 34l2 66H60z" fill="url(#a-silk-green)" />
        <path d="M98 142c2 30 42 30 44 0z" fill="url(#a-skin-light)" />
        <path d="M98 142c2 30 42 30 44 0M62 242h118" stroke="#e8b34a" strokeWidth="4" fill="none" />
        <path d="M58 200c8 2 18 2 26-2M182 200c-8 2-18 2-26-2" stroke="#e8b34a" strokeWidth="4" fill="none" />
        {/* saree below the waist */}
        <path d="M66 268c-6 50-14 90-18 132h146c-4-42-10-82-16-132z" fill="url(#a-silk-mustard)" />
        <path d="M66 270h112" stroke="#b5192d" strokeWidth="6" />
        <g stroke="#9a5f0f" strokeOpacity="0.4" strokeWidth="2" fill="none">
          <path d="M96 274c-4 40-8 80-10 126M122 274v126M148 274c4 40 8 80 10 126" />
        </g>
        {/* pallu over the left shoulder */}
        <path d="M58 168c8-18 32-24 46-12-6 76-10 160-12 244H34c4-84 12-166 24-232z" fill="url(#a-silk-red)" />
        <path d="M92 160c-6 80-10 160-12 240" stroke="#e8b34a" strokeWidth="8" fill="none" />
        <path d="M92 160c-6 80-10 160-12 240" stroke="#b5192d" strokeWidth="2" strokeDasharray="4 6" fill="none" />
        <g fill="#f3c55a" opacity="0.55">
          {[[56, 220], [62, 270], [48, 320], [70, 350], [54, 380]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.4" />
          ))}
        </g>
        {/* neck + head */}
        <path d="M108 104h24v42h-24z" fill="url(#a-skin-light)" />
        <ellipse cx="120" cy="78" rx="31" ry="36" fill="url(#a-hair)" />
        <ellipse cx="89" cy="88" rx="4" ry="7" fill="#c98e60" />
        <ellipse cx="151" cy="88" rx="4" ry="7" fill="#c98e60" />
        <path d="M86 96c-4 6-4 12 0 16 4-4 4-10 0-16zM154 96c-4 6-4 12 0 16 4-4 4-10 0-16z" fill="url(#a-gold)" />
        <path d="M100 44c10-6 30-6 40 0" stroke="#5a3a28" strokeOpacity="0.5" strokeWidth="2" fill="none" />
        {/* jasmine crescent */}
        {Array.from({ length: 11 }, (_, i) => {
          const a = Math.PI * (0.15 + (i / 10) * 0.7);
          return <circle key={i} cx={120 - cos(a) * 30} cy={104 - sin(a) * 16} r="5.2" fill="#fffdf7" stroke="#e2d8c2" strokeWidth="0.8" />;
        })}
        <circle cx="120" cy="96" r="6" fill="#d43a50" />
        {/* braid */}
        {braid.map(({ y, w, x }, i) => (
          <ellipse key={i} cx={x} cy={y} rx={w} ry="8" fill="url(#a-hair)" stroke="#000" strokeOpacity="0.25" strokeWidth="0.8" />
        ))}
        {/* jasmine strands along the braid */}
        {[-1, 1].map((sd) =>
          Array.from({ length: 13 }, (_, i) => (
            <circle key={`${sd}${i}`} cx={120 + sd * (13 - i * 0.35)} cy={116 + i * 11} r="3.6" fill="#fffdf7" stroke="#e2d8c2" strokeWidth="0.6" />
          )),
        )}
        {/* jadai gold discs + kunjalam tassel */}
        {[150, 196, 242].map((y) => (
          <g key={y}>
            <circle cx="120" cy={y} r="5.5" fill="url(#a-gold)" />
            <circle cx="120" cy={y} r="2" fill="#c3262f" />
          </g>
        ))}
        <path d="M114 368h12l6 22h-24z" fill="url(#a-gold)" />
        <path d="M112 390l-4 10M120 390v10M128 390l4 10" stroke="#c3262f" strokeWidth="3" />
      </g>

      {/* ── groom ── */}
      <g>
        {/* arms */}
        <path d="M184 150c-18 24-22 120-18 250h26c-2-100 0-170 10-224z" fill="url(#a-skin)" />
        <path d="M316 150c18 24 22 120 18 250h-26c2-100 0-170-10-224z" fill="url(#a-skin)" />
        <path d="M168 230c8 3 18 3 26 0" stroke="url(#a-gold)" strokeWidth="3" fill="none" />
        {/* back with rounded shoulders */}
        <path d="M180 168c2-26 26-40 56-42h28c30 2 54 16 56 42l-8 132H188z" fill="url(#a-skin)" />
        <path d="M250 140c-2 50-2 110 0 160" stroke="#6a3a1e" strokeOpacity="0.32" strokeWidth="3" fill="none" />
        <path d="M206 158c14 12 22 32 22 58M294 158c-14 12-22 32-22 58" stroke="#6a3a1e" strokeOpacity="0.2" strokeWidth="3" fill="none" />
        <path d="M194 150c20-14 40-18 56-18" stroke="#e7a374" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* angavastram: left shoulder → right hip */}
        <path d="M182 150c10-16 34-24 48-18l92 152-6 22h-36L180 186z" fill="url(#a-cloth)" />
        <path d="M230 132l92 152" stroke="#d9a63e" strokeWidth="5" fill="none" />
        <path d="M181 186l99 120" stroke="#d9a63e" strokeWidth="5" fill="none" />
        <path d="M223 136l90 150" stroke="#b5192d" strokeWidth="1.6" fill="none" />
        {/* veshti */}
        <path d="M188 296h124c6 36 10 70 12 104H176c2-34 6-68 12-104z" fill="url(#a-cloth)" />
        <path d="M188 300h124" stroke="#d9a63e" strokeWidth="8" />
        <path d="M188 306h124" stroke="#2f7a45" strokeWidth="2.5" />
        {/* neck + head */}
        <path d="M236 96h28v40h-28z" fill="url(#a-skin)" />
        <path d="M234 128c6 10 26 10 32 0" stroke="url(#a-gold)" strokeWidth="3" fill="none" />
        <ellipse cx="216" cy="72" rx="5" ry="9" fill="#9a5a31" />
        <ellipse cx="284" cy="72" rx="5" ry="9" fill="#9a5a31" />
        <ellipse cx="250" cy="62" rx="33" ry="38" fill="url(#a-hair)" />
        <path d="M222 86c10 14 46 14 56 0" stroke="#000" strokeOpacity="0.3" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
}

/** A hand reaching to the right. who="sita" → mehendi + bangles; who="ram" → blue + rudraksha. */
export function Hand({ who, className, style }: P & { who: "sita" | "ram" }) {
  const skin = who === "ram" ? "url(#a-blue)" : "url(#a-skin-light)";
  const edge = who === "ram" ? "#1d3d75" : "#8a5230";
  const finger = (x: number, y: number, len: number, w: number, rot: number, key: string) => {
    const r = w * 0.4;
    return (
      <path
        key={key}
        transform={`translate(${x} ${y}) rotate(${rot})`}
        d={`M0 ${-w / 2}C${len * 0.5} ${-w / 2} ${len - r * 2} ${-r - 1} ${len - r} ${-r}A${r} ${r} 0 0 1 ${len - r} ${r}C${len - r * 2} ${r + 1} ${len * 0.5} ${w / 2} 0 ${w / 2}Z`}
        fill={skin}
        stroke={edge}
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
    );
  };
  return (
    <svg className={className} style={style} viewBox="0 0 520 240" aria-hidden="true">
      {/* forearm, tapering to the wrist */}
      <path d="M-40 90C60 88 170 98 270 110L272 162C170 168 60 180-40 182Z" fill={skin} stroke={edge} strokeOpacity="0.3" strokeWidth="1.2" />
      {/* fingers behind */}
      {finger(372, 150, 72, 14, 15, "pinky")}
      {finger(380, 139, 86, 16, 8, "ring")}
      {finger(384, 127, 94, 17, 3, "middle")}
      {/* palm */}
      <path d="M262 110C300 102 350 104 388 114 400 126 400 148 390 158 350 168 300 168 266 162Z" fill={skin} stroke={edge} strokeOpacity="0.4" strokeWidth="1.2" />
      {/* index + thumb in front */}
      {finger(386, 117, 96, 16, -3, "index")}
      {finger(316, 162, 64, 18, -12, "thumb")}
      {/* knuckle creases */}
      <g stroke={edge} strokeOpacity="0.35" strokeWidth="1.5" fill="none">
        <path d="M440 112q3 6 0 12M434 124q3 6 0 12M428 137q3 6 0 11" />
      </g>
      {who === "sita" ? (
        <g>
          {/* mehendi */}
          <g stroke="#7a2412" strokeWidth="2" fill="none" opacity="0.85">
            <circle cx="330" cy="132" r="16" />
            <circle cx="330" cy="132" r="8" />
            {Array.from({ length: 10 }, (_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return <circle key={i} cx={330 + cos(a) * 22} cy={132 + sin(a) * 22} r="2.6" />;
            })}
            <path d="M362 120c10-4 20-2 26 4M362 146c10 4 20 2 26-4" />
            <path d="M408 116h40M416 110v12M432 110v12" />
            <path d="M286 122c-12 6-12 20 0 26" />
          </g>
          <g fill="#9c2a1a" opacity="0.85">
            <circle cx="474" cy="113" r="5" />
            <circle cx="470" cy="131" r="5" />
          </g>
          {/* bangles */}
          {[200, 212, 224, 236, 248].map((x, i) => (
            <rect key={x} x={x} y="84" width="9" height="100" rx="4.5" fill={i % 2 ? "url(#a-gold)" : i === 2 ? "#1f7a45" : "#c3262f"} />
          ))}
        </g>
      ) : (
        <g>
          {/* rudraksha */}
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx="236" cy={90 + i * 15} r="8" fill="#6e3518" stroke="#3b1a0a" strokeWidth="1.2" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={`b${i}`} cx="256" cy={92 + i * 14} r="7" fill="#7d3d1c" stroke="#3b1a0a" strokeWidth="1.2" />
          ))}
          <path d="M300 112c30-6 60-4 86 6" stroke="#c6dcff" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}

/** Saptapadi: barefoot steps beneath silk hems, the two cloths tied in a knot (ref 8). */
export function Saptapadi({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 600 380" aria-hidden="true">
      {/* groom's veshti */}
      <path d="M44 0h226l8 218q-116 18-232 2z" fill="url(#a-cloth)" />
      <path d="M48 204q114 16 228-2" stroke="#2f7a45" strokeWidth="9" fill="none" />
      <path d="M47 216q116 16 230-2" stroke="#d9a63e" strokeWidth="8" fill="none" />
      <g stroke="#cbbd9e" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M110 0q-6 100-12 206M170 0q2 110 2 214M226 0q6 100 4 208" />
      </g>
      {/* groom's foot (heel lifted, stepping) */}
      <path d="M150 232c4 30 4 54 18 74 18 6 50 8 76 4 12-2 12-12 2-16-24-6-40-20-50-62z" fill="url(#a-skin)" />
      <g fill="url(#a-skin)">
        {[[244, 312, 7], [232, 316, 6], [220, 318, 5.5], [208, 318, 5], [196, 316, 4.5]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
      <path d="M160 300c30 10 60 12 90 6" stroke="#b8323a" strokeWidth="3" fill="none" opacity="0.7" />
      {/* bride's saree */}
      <path d="M330 0h240l22 226q-138 22-276 2z" fill="url(#a-silk-red)" />
      <path d="M318 206q138 20 274-2" stroke="#e8b34a" strokeWidth="14" fill="none" />
      <path d="M317 224q138 20 276-2" stroke="#e8b34a" strokeWidth="5" fill="none" />
      <g fill="none" stroke="#7d0f1f" strokeOpacity="0.35" strokeWidth="2">
        <path d="M400 0q-4 100-10 210M450 0q0 110 0 218M500 0q6 100 8 214" />
      </g>
      <g fill="#f3c55a" opacity="0.5">
        {Array.from({ length: 15 }, (_, i) => (
          <circle key={i} cx={360 + (i % 5) * 46 + (Math.floor(i / 5) % 2) * 20} cy={36 + Math.floor(i / 5) * 52} r="5" />
        ))}
      </g>
      {/* bride's foot (flat) with toe ring and alta */}
      <path d="M380 246c-4 22-2 44 8 56 30 6 70 8 96 4 10-2 10-12 0-15-30-6-52-20-60-45z" fill="url(#a-skin-light)" />
      <g fill="url(#a-skin-light)">
        {[[480, 304, 7], [467, 308, 6], [455, 310, 5.5], [443, 310, 5], [432, 308, 4.5]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
      <path d="M388 300c32 8 64 10 94 4" stroke="#b8323a" strokeWidth="5" fill="none" />
      <circle cx="455" cy="304" r="4" fill="none" stroke="url(#a-gold)" strokeWidth="2.2" />
      <path d="M392 276c20 6 40 8 60 4" stroke="url(#a-gold)" strokeWidth="3" fill="none" />
      {/* the knot: his angavastram tied to her pallu */}
      <path d="M248 0c14 30 34 62 50 96" stroke="url(#a-cloth)" strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M248 0c14 30 34 62 50 96" stroke="#d9a63e" strokeWidth="3" fill="none" transform="translate(9 -4)" />
      <path d="M352 0c-14 30-34 62-50 96" stroke="url(#a-silk-red)" strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M352 0c-14 30-34 62-50 96" stroke="#e8b34a" strokeWidth="3" fill="none" transform="translate(-9 -4)" />
      <ellipse cx="292" cy="104" rx="17" ry="13" transform="rotate(-30 292 104)" fill="url(#a-cloth)" stroke="#cbbd9e" />
      <ellipse cx="308" cy="104" rx="17" ry="13" transform="rotate(30 308 104)" fill="url(#a-silk-red)" />
      <circle cx="300" cy="106" r="7" fill="#e8b34a" />
      <path d="M292 114c-6 22-10 42-8 66l12-2c-2-22 0-42 4-62z" fill="url(#a-cloth)" stroke="#cbbd9e" />
      <path d="M308 114c6 22 10 42 8 66l-12-2c2-22 0-42-4-62z" fill="url(#a-silk-red)" />
      <path d="M284 176l12-2M304 176l12 2" stroke="#d9a63e" strokeWidth="4" />
      {/* petals */}
      {[[90, 270], [130, 340], [300, 300], [520, 280], [560, 340], [40, 330], [350, 352], [250, 360]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="4" transform={`rotate(${i * 40} ${x} ${y})`} fill={i % 2 ? "#e86d8a" : "#f2a14e"} />
      ))}
    </svg>
  );
}

export function Footprint({ className, style, left = false }: P & { left?: boolean }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 120" aria-hidden="true">
      <g transform={left ? "translate(60 0) scale(-1 1)" : undefined} fill="#b8323a" opacity="0.82">
        <path d="M22 34c-10 16-12 44-6 64 4 14 22 20 30 6 6-12 2-28 4-44 1-14-2-26-10-30-7-3-14-2-18 4z" />
        <circle cx="42" cy="18" r="7" />
        <circle cx="31" cy="15" r="5" />
        <circle cx="22" cy="18" r="4.5" />
        <circle cx="15" cy="24" r="4" />
        <circle cx="10" cy="31" r="3.4" />
      </g>
    </svg>
  );
}
