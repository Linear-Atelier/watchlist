import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#4f0a0d",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://watchlist.linearatelier.com",
  ),
  title: {
    default: "Christmas Watchlist · A Movie a Day",
    template: "%s · Christmas Watchlist",
  },
  description:
    "A cozy, day-by-day holiday movie watchlist from October through Christmas. Track what you've watched, explore vibes, and count down to Christmas.",
  applicationName: "Christmas Watchlist",
  keywords: [
    "Christmas movies",
    "holiday movie watchlist",
    "Christmas watchlist",
    "advent calendar movies",
    "holiday movie tracker",
    "Christmas films",
  ],
  authors: [{ name: "Linear Atelier" }],
  creator: "Linear Atelier",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Christmas Watchlist · A Movie a Day",
    description:
      "A cozy, day-by-day holiday movie watchlist from October through Christmas. Track what you've watched, explore vibes, and count down to Christmas.",
    url: "/",
    siteName: "Christmas Watchlist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christmas Watchlist: A Movie a Day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Watchlist · A Movie a Day",
    description:
      "A cozy, day-by-day holiday movie watchlist from October through Christmas. Track what you've watched, explore vibes, and count down to Christmas.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${gentium.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <WatchedProvider>{children}</WatchedProvider>
      </body>
    </html>
  );
}
