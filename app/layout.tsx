import type { Metadata } from "next";
import { Great_Vibes, Gentium_Book_Plus } from "next/font/google";
import { WatchedProvider } from "@/components/WatchedProvider";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const gentium = Gentium_Book_Plus({
  variable: "--font-gentium",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Christmas Watchlist · A Movie a Day",
    template: "%s · Christmas Watchlist",
  },
  description:
    "A cozy, day-by-day Christmas movie watchlist for November and December. Track what you've watched and count down to Christmas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${gentium.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <WatchedProvider>{children}</WatchedProvider>
      </body>
    </html>
  );
}
