import { cacheLife, cacheTag } from "next/cache";
import { getMonth } from "@/watchlist.config";
import { SAMPLE_CSV } from "@/data/samples";
import { parseWatchlist } from "./csv";
import type { MonthData } from "./types";

/**
 * Loads a month's movies from its published Google Sheets CSV,
 * falling back to bundled sample data. Refreshes about every minute.
 */
export async function getMonthMovies(slug: string): Promise<MonthData> {
  "use cache";
  cacheLife("minutes");
  cacheTag("sheets", `sheet-${slug}`);

  const month = getMonth(slug);
  const sample = parseWatchlist(SAMPLE_CSV[slug] ?? "");
  if (!month?.csvUrl) return { ok: true, movies: sample, source: "sample" };

  try {
    const res = await fetch(month.csvUrl, { redirect: "follow" });
    if (!res.ok) throw new Error(`Sheet responded with ${res.status}`);
    const text = await res.text();
    if (text.trimStart().startsWith("<")) {
      throw new Error("Link returned a web page, not CSV. Use File → Share → Publish to web → CSV.");
    }
    return { ok: true, movies: parseWatchlist(text), source: "sheet" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not load sheet",
      movies: sample,
      source: "sample",
    };
  }
}
