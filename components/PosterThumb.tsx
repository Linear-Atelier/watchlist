"use client";

import Image from "next/image";
import { useState } from "react";

const PALETTES = [
  "from-berry to-crimson-800",
  "from-pine to-crimson-900",
  "from-gold to-crimson-700",
  "from-blush to-berry",
];

export function PosterThumb({ src, title, seed }: { src?: string | null; title: string; seed: number }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className="group/poster relative h-[60px] w-10 shrink-0 sm:h-[66px] sm:w-11">
      <div className="absolute inset-0 overflow-hidden rounded-md shadow-md shadow-black/40 ring-1 ring-white/15 transition-all duration-300 ease-out group-hover/poster:z-20 group-hover/poster:-translate-y-2 group-hover/poster:scale-[2.2] group-hover/poster:shadow-2xl group-hover/poster:ring-gold/60 origin-left">
        {showImage ? (
          <Image
            src={src}
            alt={`${title} poster`}
            fill
            sizes="100px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${PALETTES[seed % PALETTES.length]}`}
            aria-hidden
          >
            <span className="text-lg drop-shadow">{["🎄", "🎁", "⭐", "❄️"][seed % 4]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
