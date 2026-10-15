import { MONTHS } from "@/watchlist.config";
import { getMonthMovies } from "@/lib/sheets";
import { movieId } from "@/lib/ids";
import { FestiveCollage } from "@/components/FestiveCollage";
import { Countdown } from "@/components/Countdown";
import { MonthCard } from "@/components/MonthCard";

export default async function Home() {
  const months = await Promise.all(
    MONTHS.map(async (m) => {
      const data = await getMonthMovies(m.slug);
      const titled = data.movies.filter((x) => x.title);
      return {
        ...m,
        ids: titled.map((x) => movieId(m.slug, x.date, x.title)),
        preview: titled.slice(0, 4).map((x) => x.title),
      };
    }),
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-5 py-12 sm:px-8 sm:py-20">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <p className="animate-fade-up text-xs uppercase tracking-[0.5em] text-gold">A movie a day ✦ all season long</p>
          <h1
            className="animate-fade-up font-script text-7xl leading-[0.9] text-snow drop-shadow-[0_4px_24px_rgb(0_0_0/0.4)] sm:text-8xl lg:text-9xl"
            style={{ animationDelay: "100ms" }}
          >
            Christmas
            <span className="block gold-text animate-shimmer">Watchlist</span>
          </h1>
          <p className="max-w-md animate-fade-up text-snow/70" style={{ animationDelay: "200ms" }}>
            Cozy up with one festive film every night from November through Christmas. Tick them off as you go.
          </p>
          <div className="animate-fade-up pt-2" style={{ animationDelay: "300ms" }}>
            <Countdown />
          </div>
        </div>
        <FestiveCollage className="mx-auto w-full max-w-sm -rotate-2 transition-transform duration-700 hover:rotate-0 lg:max-w-md" />
      </section>

      <section aria-label="Months" className="grid gap-6 md:grid-cols-2">
        {months.map((m, i) => (
          <MonthCard key={m.slug} slug={m.slug} label={m.label} ids={m.ids} preview={m.preview} index={i} />
        ))}
      </section>

      <footer className="mt-auto text-center text-xs text-snow/40">
        Made with ❤️ &amp; hot cocoa · Data from Google Sheets{process.env.TMDB_API_KEY ? " · Posters from TMDB" : ""}
      </footer>
    </main>
  );
}
