import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ModalProvider } from "@/components/modal-provider";
import { LoginModal } from "@/components/login-modal";
import { ContactModal } from "@/components/contact-modal";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hqclouds.com"),
  title: {
    default: "HQclouds — Fast, Low-Fee Crypto Payments",
    template: "%s · HQclouds",
  },
  description:
    "HQclouds is a crypto payment gateway built for speed, low fees from 0.3%, and reliable settlement across Bitcoin, Ethereum, Tron, BNB Smart Chain, Polygon, and Solana.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HQclouds — Fast, Low-Fee Crypto Payments",
    description:
      "Accept crypto payments across major networks with fees from 0.3%, automatic stablecoin conversion, and fast, reliable settlement.",
    url: "/",
    siteName: "HQclouds",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HQclouds — Fast, Low-Fee Crypto Payments",
    description:
      "Accept crypto payments across major networks with fees from 0.3%, automatic stablecoin conversion, and fast, reliable settlement.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HQclouds",
  url: "https://hqclouds.com",
  logo: "https://hqclouds.com/icon.png",
  description:
    "HQclouds is a crypto payment gateway built for speed, low fees from 0.3%, and reliable settlement across Bitcoin, Ethereum, Tron, BNB Smart Chain, Polygon, and Solana.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body>
        <ModalProvider>
          {children}
          <LoginModal />
          <ContactModal />
        </ModalProvider>
      </body>
    </html>
  );
}
