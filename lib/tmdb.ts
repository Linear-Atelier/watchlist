import { cacheLife, cacheTag } from "next/cache";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

/**
 * Looks up a poster on TMDB. Returns null if no TMDB_API_KEY is set
 * or nothing matches. Results are cached for weeks.
 */
export async function getPoster(title: string, year?: string): Promise<string | null> {
  "use cache";
  cacheLife("weeks");
  cacheTag("posters");

  const key = process.env.TMDB_API_KEY;
  if (!key || !title) return null;

  const params = new URLSearchParams({ query: title, include_adult: "false" });
  if (year) params.set("year", year);

  // Supports both the v4 Read Access Token (long JWT) and the v3 API key.
  const isBearer = key.length > 40;
  if (!isBearer) params.set("api_key", key);

  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`, {
      headers: isBearer ? { Authorization: `Bearer ${key}` } : undefined,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { results?: { poster_path?: string | null }[] };
    const path = json.results?.find((r) => r.poster_path)?.poster_path;
    return path ? `${IMG_BASE}${path}` : null;
  } catch {
    return null;
  }
}
