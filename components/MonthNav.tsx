import Link from "next/link";
import { MONTHS } from "@/watchlist.config";

export function MonthNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Months" className="flex flex-wrap items-center gap-2">
      <Link
        href="/"
        id="nav-home"
        className="rounded-full px-4 py-1.5 text-sm text-snow/70 transition-colors hover:bg-white/10 hover:text-snow"
      >
        ← Home
      </Link>
      {MONTHS.map((m) => {
        const active = m.slug === current;
        return (
          <Link
            key={m.slug}
            href={`/${m.slug}`}
            id={`nav-${m.slug}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${
              active
                ? "bg-snow text-crimson-900 shadow-lg shadow-black/30"
                : "border border-white/15 text-snow/80 hover:border-gold/60 hover:text-gold-light"
            }`}
          >
            {m.label}
          </Link>
        );
      })}
    </nav>
  );
}
