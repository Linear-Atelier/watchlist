"use client";

import { CHRISTMAS } from "@/watchlist.config";
import { useToday } from "./useToday";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const today = useToday();

  const label = "until Christmas";
  let p = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  let isChristmas = false;

  if (today) {
    const now = new Date(today.now);
    let target = new Date(now.getFullYear(), CHRISTMAS.month - 1, CHRISTMAS.day);
    isChristmas = today.month === CHRISTMAS.month && today.day === CHRISTMAS.day;
    if (now > target && !isChristmas) {
      target = new Date(now.getFullYear() + 1, CHRISTMAS.month - 1, CHRISTMAS.day);
    }
    p = parts(target.getTime() - now.getTime());
  }

  if (isChristmas) {
    return (
      <p className="font-script text-4xl gold-text animate-shimmer sm:text-5xl" id="countdown">
        Merry Christmas! 🎄
      </p>
    );
  }

  const units: [string, number][] = [
    ["days", p.days],
    ["hrs", p.hours],
    ["min", p.minutes],
    ["sec", p.seconds],
  ];

  if (compact) {
    return (
      <p id="countdown" className="text-sm text-snow/70" suppressHydrationWarning>
        🎄{" "}
        <span className="font-bold text-gold-light tabular-nums">
          {today ? `${p.days}d ${p.hours}h ${p.minutes}m` : "—"}
        </span>{" "}
        until Christmas
      </p>
    );
  }

  return (
    <div id="countdown" className="flex flex-col items-center gap-3">
      <div className="flex gap-2 sm:gap-4">
        {units.map(([u, v]) => (
          <div
            key={u}
            className="flex w-16 flex-col items-center rounded-xl border border-gold/30 bg-crimson-900/70 px-2 py-3 shadow-inner shadow-black/30 backdrop-blur sm:w-24 sm:py-4"
          >
            <span className="text-2xl font-bold tabular-nums text-snow sm:text-4xl">
              {today ? String(v).padStart(2, "0") : "--"}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold sm:text-xs">{u}</span>
          </div>
        ))}
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-snow/60">{label}</p>
    </div>
  );
}
