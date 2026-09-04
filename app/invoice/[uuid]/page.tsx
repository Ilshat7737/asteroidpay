// app/invoice/[uuid]/page.tsx
import type { Metadata } from "next";
import { PaymentFlow } from "@/components/payment/payment-flow";

export const metadata: Metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};

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
