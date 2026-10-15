import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="text-6xl">🎅</p>
      <h1 className="font-script text-6xl text-snow sm:text-7xl">Ho ho... no?</h1>
      <p className="max-w-md text-snow/70">That month isn&apos;t on Santa&apos;s list.</p>
      <Link
        href="/"
        className="rounded-full bg-snow px-6 py-2 font-bold text-crimson-900 transition-transform hover:scale-105"
      >
        Back to the watchlist
      </Link>
    </main>
  );
}
