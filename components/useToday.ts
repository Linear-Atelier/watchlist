"use client";

import { useSyncExternalStore } from "react";

export type Today = { month: number; day: number; now: number };

/**
 * Current local date, browser-only (null during SSR / prerender).
 * Ticks every second. For testing, add `?today=MM-DD` to the URL.
 */
let snapshot: Today | null = null;

function compute(): Today {
  const now = new Date();
  const override = new URLSearchParams(window.location.search).get("today");
  const m = override?.match(/^(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const fake = new Date(now.getFullYear(), Number(m[1]) - 1, Number(m[2]), now.getHours(), now.getMinutes(), now.getSeconds());
    return { month: Number(m[1]), day: Number(m[2]), now: fake.getTime() };
  }
  return { month: now.getMonth() + 1, day: now.getDate(), now: now.getTime() };
}

function subscribe(cb: () => void) {
  const id = setInterval(() => {
    snapshot = compute();
    cb();
  }, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  if (!snapshot) snapshot = compute();
  return snapshot;
}

export function useToday(): Today | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
