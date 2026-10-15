"use client";

import Link from "next/link";
import { useWatched } from "./WatchedProvider";

export function MonthCard({
  slug,
  label,
  ids,
  preview,
  index,
}: {
  slug: string;
  label: string;
  ids: string[];
  preview: string[];
  index: number;
}) {
  const { watched, hydrated } = useWatched();
  const done = ids.filter((id) => watched.has(id)).length;
  const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;

  return (
    <Link
      href={`/${slug}`}
      id={`card-${slug}`}
      className="group relative flex animate-fade-up flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-crimson-700/70 to-crimson-900/80 p-7 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_40px_90px_-30px_rgb(217_169_78/0.35)]"
      style={{ animationDelay: `${300 + index * 120}ms` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-berry/30 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="flex items-start justify-between">
        <h2 className="font-script text-6xl leading-none text-snow">{label}</h2>
        <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-light">→</span>
      </div>

      <ul className="flex flex-col gap-1 text-sm text-snow/70">
        {preview.map((t) => (
          <li key={t} className="truncate">
            <span className="mr-2 text-gold">✦</span>
            {t}
          </li>
        ))}
        {ids.length > preview.length && (
          <li className="text-snow/40">+ {ids.length - preview.length} more</li>
        )}
      </ul>

      <div className="mt-auto">
        <div className="mb-1.5 flex justify-between text-xs uppercase tracking-[0.2em] text-snow/60">
          <span>{ids.length} movies</span>
          <span className="tabular-nums text-gold-light">{hydrated ? `${done} watched` : "\u00a0"}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-crimson-950/70">
          <div
            className="candy-stripes h-full rounded-full transition-[width] duration-700"
            style={{ width: hydrated ? `${pct}%` : "0%" }}
          />
        </div>
      </div>
    </Link>
  );
}
