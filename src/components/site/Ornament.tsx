/** Small gold divider: two hairlines and a lotus-bud diamond. Original SVG. */
export function Divider({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 20" width="220" height="20" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 10h78M138 10h78" />
        <path d="M86 10c6-6 12-6 16 0-4 6-10 6-16 0zM134 10c-6-6-12-6-16 0 4 6 10 6 16 0z" />
      </g>
      <path d="M110 2l6 8-6 8-6-8z" fill="currentColor" />
      <circle cx="82" cy="10" r="1.6" fill="currentColor" />
      <circle cx="138" cy="10" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Simple kalash / lamp mark used above section titles. Original SVG. */
export function Kalash({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 4c3 4 3 7 0 10-3-3-3-6 0-10z" fill="currentColor" stroke="none" />
        <path d="M14 18c3-3 7-4 10-4s7 1 10 4" />
        <path d="M12 20h24" />
        <path d="M14 22c-2 4-2 10 1 14 2 3 6 5 9 5s7-2 9-5c3-4 3-10 1-14" />
        <path d="M17 29h14" />
        <path d="M18 44h12M24 41v3" />
      </g>
    </svg>
  );
}
