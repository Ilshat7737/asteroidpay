import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { ModalProvider } from "@/components/modal-provider";
import { LoginModal } from "@/components/login-modal";
import { ContactModal } from "@/components/contact-modal";
import { RegisterModal } from "@/components/register-modal";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asteroidpay.io"),
  title: {
    default: "AsteroidPay — Fast, Low-Fee Crypto Payments",
    template: "%s · AsteroidPay",
  },
  description:
    "AsteroidPay is a crypto payment gateway with fees from 0.3%, automatic stablecoin conversion, and fast settlement across Bitcoin, Ethereum, Tron, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AsteroidPay — Fast, Low-Fee Crypto Payments",
    description:
      "Accept crypto payments across major networks with fees from 0.3%, automatic stablecoin conversion, and fast, reliable settlement.",
    url: "/",
    siteName: "AsteroidPay",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AsteroidPay — Fast, Low-Fee Crypto Payments",
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
  name: "AsteroidPay",
  url: "https://asteroidpay.io",
  logo: "https://asteroidpay.io/icon.png",
  description:
    "AsteroidPay is a crypto payment gateway with fees from 0.3%, automatic stablecoin conversion, and fast settlement across Bitcoin, Ethereum, Tron, BNB Smart Chain, Polygon, and Solana.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <ModalProvider>
            {children}
            <LoginModal />
            <ContactModal />
            <RegisterModal />
          </ModalProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
