"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "watchlist:v1";
const EMPTY: readonly string[] = [];

/* ---------- tiny localStorage-backed store (SSR-safe) ---------- */
const listeners = new Set<() => void>();
let cache: readonly string[] | null = null;

function read(): readonly string[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache!;
}

function write(next: readonly string[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage full / disabled — keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/* ---------- context ---------- */
type WatchedCtx = {
  watched: ReadonlySet<string>;
  hydrated: boolean;
  toggle: (id: string) => void;
};

const Ctx = createContext<WatchedCtx | null>(null);

export function WatchedProvider({ children }: { children: React.ReactNode }) {
  const list = useSyncExternalStore(subscribe, read, () => EMPTY);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);

  const value = useMemo(
    () => ({ watched: new Set(list), hydrated, toggle }),
    [list, hydrated, toggle],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWatched() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWatched must be used inside <WatchedProvider>");
  return ctx;
}
