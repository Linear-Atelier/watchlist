import { FestiveCollage } from "@/components/FestiveCollage";

export default function OgPreview() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        overflow: "hidden",
      }}
      className="flex items-center justify-between px-16 bg-crimson-950"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-script text-[140px] leading-[0.88] text-snow drop-shadow-[0_4px_30px_rgb(0_0_0/0.5)]">
          Christmas
          <span className="block gold-text animate-shimmer">Watchlist</span>
        </h1>
      </div>
      <div className="w-[490px] shrink-0 -rotate-2">
        <FestiveCollage />
      </div>
    </div>
  );
}
