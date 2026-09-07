// app/wallet/[uuid]/page.tsx
import type { Metadata } from "next";
import { WalletFlow } from "@/components/payment/wallet-flow";

const DESCRIPTION = "Send crypto to this wallet address to complete your payment.";

// Same treatment as /invoice/[uuid] — a private, single-use transaction
// page, not marketing content. See that route for the reasoning.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>;
}): Promise<Metadata> {
  const { uuid } = await params;
  const url = `/wallet/${uuid}`;

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

export default async function WalletPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <WalletFlow uuid={uuid} />
      </div>
    </main>
  );
}
