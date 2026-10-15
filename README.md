# 🎄 Christmas Watchlist

A festive, day-by-day Christmas movie watchlist. Each month's list comes from a Google Sheet, so you update the site just by editing the sheet.

- Track watched movies (saved in your browser) with a progress bar
- "Tonight" highlight for today's movie, plus a live countdown to Christmas
- Movie posters from TMDB (optional)

## Updating the list from Google Sheets

1. Make a sheet with one **tab per month** and these header columns:

   | Date | Movie Title | Platform | Genre | Vibe | Year *(optional)* | Poster *(optional)* |
   |---|---|---|---|---|---|---|

   - `Year` improves poster matching. `Poster` is an image URL that overrides TMDB.
   - Rows with a date but no title show as empty slots.
2. In Google Sheets: **File → Share → Publish to web**. Pick the month's tab, choose **Comma-separated values (.csv)**, click **Publish**, and copy the link.
3. Paste the link into `csvUrl` for that month in [`watchlist.config.ts`](./watchlist.config.ts), then commit and push.

After that, **edits in the sheet show up on the site within about a minute** — no redeploy needed. To refresh instantly, visit `/api/refresh?secret=YOUR_REFRESH_SECRET`.

Until a `csvUrl` is set, the month uses sample data from [`data/samples.ts`](./data/samples.ts).

### Adding a month
Add an entry to `MONTHS` in `watchlist.config.ts` (e.g. `{ slug: "january", label: "January", monthNumber: 1, csvUrl: "" }`).

## Environment variables

Copy `.env.example` to `.env.local` (and add the same values in Vercel → Project → Settings → Environment Variables):

| Variable | Purpose |
|---|---|
| `TMDB_API_KEY` | TMDB Read Access Token for posters ([get one free](https://www.themoviedb.org/settings/api)). Without it, festive placeholders are shown. |
| `REFRESH_SECRET` | Any random string; protects `/api/refresh`. |

## Development

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

Tip: add `?today=11-07` to a month URL to preview the "Tonight" highlight for any date.

## Deploying to Vercel

Import the repo in Vercel; no extra config needed. Add the env vars above.
