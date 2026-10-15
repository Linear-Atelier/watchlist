"use client";

import { useEffect, useRef } from "react";
import type { Movie } from "@/lib/types";
import { movieId } from "@/lib/ids";
import { useWatched } from "./WatchedProvider";
import { useToday } from "./useToday";
import { PosterThumb } from "./PosterThumb";
import { ProgressBar } from "./ProgressBar";

export type MovieRow = Movie & { posterUrl: string | null };

function CheckButton({ checked, onClick, title }: { checked: boolean; onClick: () => void; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      aria-label={checked ? `Mark ${title} as not watched` : `Mark ${title} as watched`}
      className={`relative flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        checked
          ? "border-gold bg-gold text-crimson-950 shadow-[0_0_14px_rgb(217_169_78/0.6)]"
          : "border-snow/30 bg-transparent text-transparent hover:border-gold/70"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 24 24" className="h-4 w-4 animate-pop" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5 10 17 19 7" />
        </svg>
      )}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.7rem] leading-tight text-snow/80">
      {children}
    </span>
  );
}

export function WatchlistTable({
  monthSlug,
  monthNumber,
  movies,
}: {
  monthSlug: string;
  monthNumber: number;
  movies: MovieRow[];
}) {
  const { watched, toggle, hydrated } = useWatched();
  const today = useToday();
  const scrolled = useRef(false);

  const todayDate = today && today.month === monthNumber ? today.day : null;
  const titled = movies.filter((m) => m.title);
  const done = titled.filter((m) => watched.has(movieId(monthSlug, m.date, m.title))).length;
  const tonight = titled.find((m) => m.date === todayDate);

  useEffect(() => {
    if (!todayDate || scrolled.current) return;
    const el = Array.from(document.querySelectorAll<HTMLElement>("[data-today]")).find(
      (n) => n.offsetParent !== null,
    );
    if (el) {
      scrolled.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [todayDate]);

  return (
    <section className="flex flex-col gap-6" aria-label="Watchlist">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <ProgressBar done={done} total={titled.length} hydrated={hydrated} />
        {tonight && (
          <p className="animate-fade-up rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-gold-light">
            🍿 Tonight: <strong className="text-snow">{tonight.title}</strong>
          </p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-visible rounded-lg ring-1 ring-white/10 md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-crimson-700/80 text-sm text-snow/80">
              <th scope="col" className="w-14 py-2.5 pr-3 text-right font-normal">Date</th>
              <th scope="col" className="py-2.5 pl-3 font-normal">Movie Title</th>
              <th scope="col" className="w-28 py-2.5 text-center font-normal">Platform</th>
              <th scope="col" className="w-32 py-2.5 text-center font-normal">Genre</th>
              <th scope="col" className="py-2.5 pl-3 text-center font-normal">Vibe</th>
              <th scope="col" className="w-16 py-2.5 text-center font-normal"><span className="sr-only">Watched</span>✓</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m, i) => {
              const id = movieId(monthSlug, m.date, m.title);
              const isWatched = !!m.title && watched.has(id);
              const isToday = m.date === todayDate;
              return (
                <tr
                  key={`${m.date}-${i}`}
                  id={`row-${m.date}`}
                  data-today={isToday || undefined}
                  className={`group border-t border-white/[0.06] transition-colors duration-200 hover:bg-white/[0.04] ${
                    i % 2 ? "bg-crimson-800/40" : "bg-crimson-800/20"
                  } ${isToday ? "relative !bg-gold/10 animate-glow" : ""}`}
                >
                  <td className="py-2 pr-3 text-right align-middle tabular-nums text-snow/80">
                    {isToday ? (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold font-bold text-crimson-950">
                        {m.date}
                      </span>
                    ) : (
                      m.date
                    )}
                  </td>
                  <td className="py-2 pl-3 align-middle">
                    {m.title ? (
                      <div className="flex items-center gap-3">
                        <PosterThumb src={m.poster ?? m.posterUrl} title={m.title} seed={m.date} />
                        <div className="flex flex-col">
                          <span
                            className={`text-lg font-bold leading-snug transition-all duration-300 ${
                              isWatched ? "text-snow/45 line-through decoration-gold/70 decoration-2" : "text-snow"
                            }`}
                          >
                            {m.title}
                          </span>
                          {isToday && (
                            <span className="text-xs uppercase tracking-[0.2em] text-gold-light">Tonight 🍿</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-snow/20 italic">—</span>
                    )}
                  </td>
                  <td className="py-2 text-center align-middle text-sm text-snow/85">{m.platform}</td>
                  <td className="py-2 text-center align-middle text-sm text-snow/85">{m.genre}</td>
                  <td className={`max-w-xs py-2 pl-3 pr-2 align-middle text-xs leading-relaxed ${isWatched ? "text-snow/40" : "text-snow/75"}`}>
                    {m.vibe}
                  </td>
                  <td className="py-2 align-middle">
                    {m.title && (
                      <div className="flex justify-center">
                        <CheckButton checked={isWatched} onClick={() => toggle(id)} title={m.title} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ol className="flex flex-col gap-3 md:hidden">
        {movies
          .filter((m) => m.title || m.date === todayDate)
          .map((m, i) => {
            const id = movieId(monthSlug, m.date, m.title);
            const isWatched = !!m.title && watched.has(id);
            const isToday = m.date === todayDate;
            return (
              <li
                key={`${m.date}-${i}`}
                data-today={isToday || undefined}
                className={`flex gap-3 rounded-xl border border-white/10 bg-crimson-800/40 p-3 ${
                  isToday ? "animate-glow bg-gold/10" : ""
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums ${
                    isToday ? "bg-gold text-crimson-950" : "bg-crimson-700 text-snow"
                  }`}
                >
                  {m.date}
                </div>
                {m.title && <PosterThumb src={m.poster ?? m.posterUrl} title={m.title} seed={m.date} />}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className={`font-bold leading-snug ${isWatched ? "text-snow/45 line-through decoration-gold/70" : "text-snow"}`}
                  >
                    {m.title || "Nothing planned"}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {isToday && <Chip>Tonight 🍿</Chip>}
                    {m.platform && <Chip>{m.platform}</Chip>}
                    {m.genre && <Chip>{m.genre}</Chip>}
                  </div>
                  {m.vibe && <p className="text-xs leading-relaxed text-snow/65">{m.vibe}</p>}
                </div>
                {m.title && <CheckButton checked={isWatched} onClick={() => toggle(id)} title={m.title} />}
              </li>
            );
          })}
      </ol>
    </section>
  );
}
