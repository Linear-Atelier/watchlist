/**
 * Watchlist configuration — the only file you need to edit to manage months.
 *
 * To connect a Google Sheet:
 *   1. In Google Sheets: File → Share → Publish to web
 *   2. Pick the tab for the month, choose "Comma-separated values (.csv)"
 *   3. Copy the link and paste it into `csvUrl` below.
 *
 * While `csvUrl` is empty, the built-in sample data in `data/` is used.
 */
export type MonthConfig = {
  slug: string;
  label: string;
  /** 1-12, used to highlight "tonight's" movie. */
  monthNumber: number;
  /** Published Google Sheets CSV link. Leave empty to use sample data. */
  csvUrl: string;
};

export const MONTHS: MonthConfig[] = [
  {
    slug: "october",
    label: "October",
    monthNumber: 10,
    csvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRm61B7oZlQsYsFjvA__5Dd1_ob9dRRd1raNBWNDpX_EH5ZlV2ADgIbZlxB67aDOCooOb4N8toACVD-/pub?gid=1000000&single=true&output=csv",
  },
  {
    slug: "november",
    label: "November",
    monthNumber: 11,
    csvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRm61B7oZlQsYsFjvA__5Dd1_ob9dRRd1raNBWNDpX_EH5ZlV2ADgIbZlxB67aDOCooOb4N8toACVD-/pub?gid=0&single=true&output=csv",
  },
  {
    slug: "december",
    label: "December",
    monthNumber: 12,
    csvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRm61B7oZlQsYsFjvA__5Dd1_ob9dRRd1raNBWNDpX_EH5ZlV2ADgIbZlxB67aDOCooOb4N8toACVD-/pub?gid=1231484876&single=true&output=csv",
  },
];

export const CHRISTMAS = { month: 12, day: 25 };

export function getMonth(slug: string) {
  return MONTHS.find((m) => m.slug === slug);
}
