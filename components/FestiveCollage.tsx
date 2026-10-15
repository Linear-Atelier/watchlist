import type { ReactNode } from "react";

const RED = "#d7142f";
const WHITE = "#fff7ef";
const PINK = "#f7b9c9";

function Tree({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" aria-hidden>
      <path fill={color} d="M32 6 18 24h7L14 38h8L10 52h44L42 38h8L39 24h7z" />
      <rect x="28" y="52" width="8" height="7" fill={color} />
    </svg>
  );
}

function CandyCane() {
  return (
    <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" aria-hidden>
      <defs>
        <pattern id="cc" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="10" fill={WHITE} />
          <rect width="5" height="10" fill={RED} />
        </pattern>
      </defs>
      <path
        d="M24 58V22a10 10 0 0 1 20 0v4"
        fill="none"
        stroke="url(#cc)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M24 58V22a10 10 0 0 1 20 0v4" fill="none" stroke="#0002" strokeWidth="9.5" strokeLinecap="round" opacity=".15" />
    </svg>
  );
}

function Snowflake({ color }: { color: string }) {
  const arm = (r: number) => (
    <g transform={`rotate(${r} 32 32)`} key={r}>
      <line x1="32" y1="32" x2="32" y2="8" />
      <polyline points="25,14 32,20 39,14" fill="none" />
      <polyline points="27,22 32,26 37,22" fill="none" />
    </g>
  );
  return (
    <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" stroke={color} strokeWidth="3.2" strokeLinecap="round" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map(arm)}
    </svg>
  );
}

function Star({ color, gold }: { color?: string; gold?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" aria-hidden>
      {gold && (
        <defs>
          <linearGradient id="gstar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7e3a8" />
            <stop offset=".5" stopColor="#c8922e" />
            <stop offset="1" stopColor="#f3d68d" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={gold ? "url(#gstar)" : color}
        d="m32 5 8.2 17.3 18.8 2.4-13.8 13 3.6 18.7L32 47.2 15.2 56.4l3.6-18.7L5 24.7l18.8-2.4z"
      />
    </svg>
  );
}

function Stocking() {
  return (
    <svg viewBox="0 0 64 64" className="h-3/5 w-3/5" aria-hidden>
      <path fill={WHITE} d="M22 16h20v22c0 3-1.5 5-4 7l-11 9c-6 4.5-15 .5-15-7 0-3.5 2-6 5-8l5-4z" />
      <rect x="22" y="22" width="20" height="5" fill="#1f5a3c" />
      <rect x="19" y="7" width="26" height="10" rx="2.5" fill={WHITE} />
      <rect x="19" y="14" width="26" height="3" fill="#1f5a3c" opacity=".9" />
    </svg>
  );
}

type Tile = { bg: string; icon: ReactNode; className?: string };

const TILES: Tile[] = [
  { bg: RED, icon: <Tree color={WHITE} /> },
  { bg: WHITE, icon: <CandyCane /> },
  { bg: PINK, icon: <Snowflake color={WHITE} /> },
  { bg: RED, icon: <Star color={WHITE} /> },
  { bg: WHITE, icon: <Snowflake color="#b9b2ad" /> },
  { bg: RED, icon: <Stocking /> },
  { bg: WHITE, icon: <Star gold /> },
  { bg: PINK, icon: <CandyCane /> },
  { bg: PINK, icon: <Star color={RED} /> },
  { bg: WHITE, icon: <Tree color={RED} /> },
  { bg: RED, icon: <Snowflake color={WHITE} /> },
  { bg: "", icon: null, className: "glitter animate-shimmer" },
];

export function FestiveCollage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-4 overflow-hidden rounded-sm shadow-[0_20px_60px_-15px_rgb(0_0_0/0.6)] ring-1 ring-white/10 ${className}`}
      aria-hidden
    >
      {TILES.map((t, i) => (
        <div
          key={i}
          className={`group/tile flex aspect-square items-center justify-center animate-tile-in ${t.className ?? ""}`}
          style={{ backgroundColor: t.bg || undefined, animationDelay: `${120 + i * 70}ms` }}
        >
          <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover/tile:rotate-12 group-hover/tile:scale-110">
            {t.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
