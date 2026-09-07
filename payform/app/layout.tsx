import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Deliberately minimal compared to landing's root layout: no ModalProvider
// or login/contact/register modals (those are marketing-site concerns this
// app never uses), no framer-motion, no Organization JSON-LD (nothing here
// is meant to be indexed or found via search — see robots below and each
// page's own generateMetadata).

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://payment.asteroidpay.io"),
  title: {
    default: "Pay Invoice",
    template: "%s · AsteroidPay",
  },
  // Every route here is a private, single-use transaction page — default
  // to noindex at the root; each page also sets this explicitly itself.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
