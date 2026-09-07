// app/invoice/[uuid]/page.tsx
import type { Metadata } from "next";
import { PaymentFlow } from "@/components/payment/payment-flow";

const DESCRIPTION = "Pay your invoice securely with crypto — scan the QR code or copy the wallet address to complete payment.";

// Each invoice is a private, single-use transaction page, not marketing
// content — description stays strictly about paying the invoice (no
// Asteroid Pay sales copy), and robots gets both a per-page noindex/nofollow
// here and a blanket disallow in app/robots.ts, so it never surfaces in
// search results regardless of which domain/host serves this route.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>;
}): Promise<Metadata> {
  const { uuid } = await params;
  const url = `/invoice/${uuid}`;

  return {
    title: "Pay Invoice",
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title: "Pay Invoice",
      description: DESCRIPTION,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Pay Invoice",
      description: DESCRIPTION,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

export default async function InvoicePage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <PaymentFlow uuid={uuid} />
      </div>
    </main>
  );
}
