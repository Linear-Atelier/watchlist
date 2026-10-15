export type Movie = {
  date: number;
  title: string;
  platform: string;
  genre: string;
  vibe: string;
  year?: string;
  poster?: string;
};

export type MonthData =
  | { ok: true; movies: Movie[]; source: "sheet" | "sample" }
  | { ok: false; error: string; movies: Movie[]; source: "sample" };
