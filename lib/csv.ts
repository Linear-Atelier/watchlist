import type { Movie } from "./types";

/** RFC 4180-style CSV parser: handles quoted fields, escaped quotes ("") and newlines in quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function matchHeader(header: string): keyof Movie | undefined {
  const h = header.trim().toLowerCase();
  if (h === "date" || h === "day" || h.startsWith("date")) return "date";
  if (h.includes("title") || h === "movie") return "title";
  if (h.includes("platform") || h.includes("service") || h.includes("where")) return "platform";
  if (h.includes("genre") || h.includes("category")) return "genre";
  if (h.includes("vibe") || h.includes("summary") || h.includes("desc") || h.includes("synopsis")) return "vibe";
  if (h.includes("year")) return "year";
  if (h.includes("poster") || h.includes("image")) return "poster";
  return undefined;
}

export function parseDayNumber(raw: string): number {
  const str = raw.trim();
  if (!str) return NaN;

  // 1. ISO format: YYYY-MM-DD or YYYY/MM/DD (e.g. 2026-10-15) -> 15
  let m = str.match(/^\d{4}[-/]\d{1,2}[-/](\d{1,2})/);
  if (m) return Number.parseInt(m[1], 10);

  // 2. Format with 4-digit year at end: MM/DD/YYYY or DD/MM/YYYY
  m = str.match(/^(\d{1,2})[-/](\d{1,2})[-/]\d{4}/);
  if (m) {
    const a = Number.parseInt(m[1], 10);
    const b = Number.parseInt(m[2], 10);
    return a > 12 ? a : b;
  }

  // 3. Month name + day, e.g. "Oct 15", "October 15th"
  m = str.match(/(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})/i);
  if (m) return Number.parseInt(m[1], 10);

  // 4. Day + Month name, e.g. "15 Oct", "15th of October"
  m = str.match(/(\d{1,2})(?:st|nd|rd|th)?\s*(?:of\s*)?(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i);
  if (m) return Number.parseInt(m[1], 10);

  // 5. Plain number or day, e.g. "15", "15th"
  m = str.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
  if (m) return Number.parseInt(m[1], 10);

  return NaN;
}

/** Parse watchlist CSV (header row required) into sorted Movie rows. */
export function parseWatchlist(text: string): Movie[] {
  const [header, ...rows] = parseCsv(text);
  if (!header) return [];
  const keys = header.map(matchHeader);

  const movies: Movie[] = [];
  for (const row of rows) {
    const m: Partial<Record<keyof Movie, string>> = {};
    keys.forEach((key, i) => {
      if (key) m[key] = (row[i] ?? "").trim();
    });
    const date = parseDayNumber(m.date ?? "");
    if (!Number.isFinite(date)) continue;
    movies.push({
      date,
      title: m.title ?? "",
      platform: m.platform ?? "",
      genre: m.genre ?? "",
      vibe: m.vibe ?? "",
      year: m.year || undefined,
      poster: m.poster || undefined,
    });
  }
  return movies.sort((a, b) => a.date - b.date);
}
