import type { CSSProperties } from "react";

const INK = "#111111";
const RED = "#8C2F39";

type Line = { d: string; delay: number; color?: string; width?: number };

// A three-door wardrobe in front elevation, 1 unit = 1 cm. Drawn carcass first, then doors,
// shelves, handles and finally the dimension lines.
const LINES: Line[] = [
  { d: "M20 20 H200 V280 H20 Z", delay: 0.2, width: 1.6 },
  { d: "M20 250 H200", delay: 0.7 },
  { d: "M80 20 V250", delay: 0.9 },
  { d: "M140 20 V250", delay: 1.0 },
  { d: "M140 80 H200", delay: 1.25 },
  { d: "M140 140 H200", delay: 1.35 },
  { d: "M140 200 H200", delay: 1.45 },
  { d: "M20 52 H80", delay: 1.3 },
  { d: "M72 125 V155", delay: 1.6, width: 2.4 },
  { d: "M88 125 V155", delay: 1.65, width: 2.4 },
  { d: "M20 265 H200", delay: 1.7 },
  { d: "M20 300 H200", delay: 1.9, color: RED },
  { d: "M20 293 V307 M200 293 V307", delay: 1.9, color: RED },
  { d: "M220 20 V280", delay: 2.05, color: RED },
  { d: "M213 20 H227 M213 280 H227", delay: 2.05, color: RED },
];

/** Technical drawing of a fitted wardrobe that draws itself line by line on load. */
export function Blueprint({ className = "" }: { className?: string }) {
  return (
    <figure className={`grid content-between border border-fg bg-surface ${className}`}>
      <svg viewBox="0 0 250 330" className="block h-auto w-full" role="img" aria-label="Front elevation of a three-door wardrobe, 180 cm wide and 260 cm high">
        <defs>
          <pattern id="bp-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0 H0 V10" fill="none" stroke="#E7E3DC" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="250" height="330" fill="url(#bp-grid)" />
        {LINES.map((line, i) => (
          <path
            key={i}
            d={line.d}
            pathLength={1}
            className="draw-in"
            fill="none"
            stroke={line.color ?? INK}
            strokeWidth={line.width ?? 1}
            strokeLinecap="square"
            style={{ "--d": `${line.delay}s` } as CSSProperties}
          />
        ))}
        <g className="fade-in-late" style={{ "--d": "2.6s" } as CSSProperties} fill={RED} fontSize="14" fontWeight="600" fontFamily="inherit">
          <text x="110" y="318" textAnchor="middle">1800 mm</text>
          <text x="240" y="150" textAnchor="middle" transform="rotate(90 238 150)">2600 mm</text>
        </g>
      </svg>
      <figcaption className="flex justify-between border-t border-fg px-3 py-2 text-xs">
        <span className="font-semibold">W-180 wardrobe</span>
        <span className="text-muted">Scale 1:20</span>
      </figcaption>
    </figure>
  );
}
