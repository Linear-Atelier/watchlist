"use client";

export function ProgressBar({ done, total, hydrated }: { done: number; total: number; hydrated: boolean }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="w-full" id="progress">
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="uppercase tracking-[0.2em] text-snow/60">Progress</span>
        <span className="tabular-nums text-snow/90">
          <span className="text-lg font-bold text-gold-light">{hydrated ? done : "–"}</span> / {total} watched
        </span>
      </div>
      <div
        className="h-3 overflow-hidden rounded-full bg-crimson-950/80 ring-1 ring-white/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="candy-stripes h-full rounded-full animate-shimmer transition-[width] duration-700 ease-out"
          style={{ width: hydrated ? `${pct}%` : "0%", animationDuration: "1.6s" }}
        />
      </div>
    </div>
  );
}
