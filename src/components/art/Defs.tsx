/**
 * Shared SVG paint (gradients + filters) for every illustration on the page.
 * Rendered once near the top of <body>; all art references these ids.
 * Everything in /components/art is original artwork drawn in code.
 */
export default function ArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        {/* metals */}
        <linearGradient id="a-brass" x1="0" x2="1">
          <stop offset="0" stopColor="#6b4512" />
          <stop offset="0.28" stopColor="#c08a2c" />
          <stop offset="0.5" stopColor="#f7dc8f" />
          <stop offset="0.68" stopColor="#c8932f" />
          <stop offset="1" stopColor="#5a3a0e" />
        </linearGradient>
        <linearGradient id="a-brass-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d585" />
          <stop offset="0.55" stopColor="#c08a2c" />
          <stop offset="1" stopColor="#6b4512" />
        </linearGradient>
        <linearGradient id="a-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6220" />
          <stop offset="0.35" stopColor="#e9c46f" />
          <stop offset="0.55" stopColor="#fff0bf" />
          <stop offset="0.75" stopColor="#d4a548" />
          <stop offset="1" stopColor="#8a6220" />
        </linearGradient>
        <linearGradient id="a-copper" x1="0" x2="1">
          <stop offset="0" stopColor="#6e2d12" />
          <stop offset="0.35" stopColor="#c46a35" />
          <stop offset="0.55" stopColor="#f2a774" />
          <stop offset="1" stopColor="#5c230d" />
        </linearGradient>
        {/* carved teak / sandstone */}
        <linearGradient id="a-wood" x1="0" x2="1">
          <stop offset="0" stopColor="#5e3a16" />
          <stop offset="0.25" stopColor="#a8743a" />
          <stop offset="0.5" stopColor="#dcab68" />
          <stop offset="0.72" stopColor="#a8743a" />
          <stop offset="1" stopColor="#4d2e10" />
        </linearGradient>
        <linearGradient id="a-wood-dark" x1="0" x2="1">
          <stop offset="0" stopColor="#3f250c" />
          <stop offset="0.5" stopColor="#8a5c28" />
          <stop offset="1" stopColor="#3a220b" />
        </linearGradient>
        {/* leaves */}
        <linearGradient id="a-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3f6b1f" />
          <stop offset="0.48" stopColor="#8fbf3a" />
          <stop offset="0.52" stopColor="#c9df7a" />
          <stop offset="1" stopColor="#4f7d22" />
        </linearGradient>
        <linearGradient id="a-leaf-soft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5d7f3a" />
          <stop offset="0.5" stopColor="#a5c272" />
          <stop offset="1" stopColor="#62853c" />
        </linearGradient>
        {/* flowers */}
        <linearGradient id="a-lotus" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff2f4" />
          <stop offset="0.55" stopColor="#f6a9bb" />
          <stop offset="1" stopColor="#d9466f" />
        </linearGradient>
        <radialGradient id="a-pad" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#a6c86a" />
          <stop offset="1" stopColor="#3d6a2c" />
        </radialGradient>
        <radialGradient id="a-marigold" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffd45a" />
          <stop offset="0.6" stopColor="#f59a16" />
          <stop offset="1" stopColor="#c2570a" />
        </radialGradient>
        <radialGradient id="a-rose" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ff8aa0" />
          <stop offset="1" stopColor="#a3122f" />
        </radialGradient>
        {/* fire */}
        <radialGradient id="a-flame" cx="0.5" cy="0.75" r="0.75">
          <stop offset="0" stopColor="#fffbe0" />
          <stop offset="0.35" stopColor="#ffd55a" />
          <stop offset="0.75" stopColor="#ff8a1e" />
          <stop offset="1" stopColor="#e2470b" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="a-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        {/* silk + skin */}
        <linearGradient id="a-silk-red" x1="0" x2="1">
          <stop offset="0" stopColor="#7d0f1f" />
          <stop offset="0.45" stopColor="#c62a35" />
          <stop offset="0.6" stopColor="#e2483f" />
          <stop offset="1" stopColor="#8a1322" />
        </linearGradient>
        <linearGradient id="a-silk-mustard" x1="0" x2="1">
          <stop offset="0" stopColor="#a86b12" />
          <stop offset="0.5" stopColor="#e8b34a" />
          <stop offset="1" stopColor="#9a5f0f" />
        </linearGradient>
        <linearGradient id="a-silk-green" x1="0" x2="1">
          <stop offset="0" stopColor="#14502e" />
          <stop offset="0.5" stopColor="#2f8a4f" />
          <stop offset="1" stopColor="#124428" />
        </linearGradient>
        <linearGradient id="a-skin" x1="0" x2="1">
          <stop offset="0" stopColor="#7a4424" />
          <stop offset="0.45" stopColor="#b5703f" />
          <stop offset="0.7" stopColor="#c78452" />
          <stop offset="1" stopColor="#7c4526" />
        </linearGradient>
        <linearGradient id="a-skin-light" x1="0" x2="1">
          <stop offset="0" stopColor="#a86a3c" />
          <stop offset="0.5" stopColor="#dca277" />
          <stop offset="1" stopColor="#a96b3d" />
        </linearGradient>
        <linearGradient id="a-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fb0e8" />
          <stop offset="0.5" stopColor="#3f73c2" />
          <stop offset="1" stopColor="#24498a" />
        </linearGradient>
        <linearGradient id="a-cloth" x1="0" x2="1">
          <stop offset="0" stopColor="#e3d7bd" />
          <stop offset="0.5" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#dccfb3" />
        </linearGradient>
        <linearGradient id="a-hair" x1="0" x2="1">
          <stop offset="0" stopColor="#120a07" />
          <stop offset="0.5" stopColor="#3a241a" />
          <stop offset="1" stopColor="#110906" />
        </linearGradient>
        <linearGradient id="a-parchment" x1="0" x2="1">
          <stop offset="0" stopColor="#d9b679" />
          <stop offset="0.12" stopColor="#f3dca7" />
          <stop offset="0.5" stopColor="#f8e6bb" />
          <stop offset="0.88" stopColor="#f0d7a0" />
          <stop offset="1" stopColor="#cfa868" />
        </linearGradient>

        {/* watercolour wash edge */}
        <filter id="a-wash" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" />
          <feGaussianBlur stdDeviation="6" />
        </filter>
        {/* paper grain */}
        <filter id="a-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 0 0.2  0 0 0 0.09 0" />
        </filter>
        {/* soft hand-painted edge for illustrations */}
        <filter id="a-paint" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
      </defs>
    </svg>
  );
}
