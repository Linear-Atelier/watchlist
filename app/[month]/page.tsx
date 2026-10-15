import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MONTHS, getMonth } from "@/watchlist.config";
import { getMonthMovies } from "@/lib/sheets";
import { getPoster } from "@/lib/tmdb";
import { FestiveCollage } from "@/components/FestiveCollage";
import { MonthNav } from "@/components/MonthNav";
import { Countdown } from "@/components/Countdown";
import { WatchlistTable, type MovieRow } from "@/components/WatchlistTable";

export function generateStaticParams() {
  return MONTHS.map((m) => ({ month: m.slug }));
}

export async function generateMetadata(props: PageProps<"/[month]">): Promise<Metadata> {
  const { month } = await props.params;
  const m = getMonth(month);
  if (!m) return { title: "Month not found" };
  return {
    title: `${m.label} Movies`,
    description: `Your day-by-day Christmas movie watchlist for ${m.label}: platforms, genres and vibes for every night.`,
  };
}

export default function MonthPage(props: PageProps<"/[month]">) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-12">
      <div className="rounded-2xl bg-crimson-800/60 p-5 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
        <Suspense fallback={<MonthSkeleton />}>
          <MonthContent params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}

async function MonthContent({ params }: Pick<PageProps<"/[month]">, "params">) {
  const { month: slug } = await params;
  const month = getMonth(slug);
  if (!month) notFound();

  const data = await getMonthMovies(slug);
  const movies: MovieRow[] = await Promise.all(
    data.movies.map(async (m) => ({
      ...m,
      posterUrl: m.title && !m.poster ? await getPoster(m.title, m.year) : null,
    })),
  );

  return (
    <>
      <header className="mb-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <MonthNav current={slug} />
          <Countdown compact />
        </div>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="text-center md:text-left">
            <h1 className="animate-fade-up font-script text-7xl leading-none text-snow drop-shadow-[0_4px_20px_rgb(0_0_0/0.35)] sm:text-8xl lg:text-9xl">
              {month.label}
            </h1>
            <div className="mx-auto mt-3 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent md:mx-0 md:from-gold" />
          </div>
          <FestiveCollage className="mx-auto w-full max-w-[280px] sm:max-w-[320px]" />
        </div>
        {!data.ok && (
          <p role="alert" className="rounded-lg border border-blush/40 bg-blush/10 px-4 py-3 text-sm text-blush">
            ⚠️ Couldn&apos;t load your Google Sheet ({data.error}). Showing sample data for now.
          </p>
        )}
      </header>

      <WatchlistTable monthSlug={slug} monthNumber={month.monthNumber} movies={movies} />
    </>
  );
}

function MonthSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading watchlist">
      <div className="mb-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div className="h-24 w-72 rounded-lg bg-white/10" />
        <div className="mx-auto aspect-[4/3] w-[280px] rounded bg-white/10" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="h-12 rounded bg-white/5" />
        ))}
      </div>
    </div>
  );
}
