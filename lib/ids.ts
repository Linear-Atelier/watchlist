/** Stable ID for a movie's watched state (shared by server and client code). */
export function movieId(month: string, date: number, title: string) {
  return `${month}:${date}:${title.toLowerCase()}`;
}
