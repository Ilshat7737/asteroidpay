// app/aml/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AML Policy",
  description:
    "HQclouds' approach to anti-money laundering compliance, customer due diligence, and transaction monitoring.",
  alternates: { canonical: "/aml" },
};

export default function AmlPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-24 pt-32">
        <article className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-accent-ink">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-black sm:text-5xl">
            AML Policy
          </h1>
          <p className="mt-4 text-sm text-black/50">Last updated: August 31, 2026</p>

          <div className="mt-12 space-y-10 text-black/80">
            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                1. Our Commitment
              </h2>
              <p className="mt-3 leading-relaxed">
                HQclouds is committed to preventing the use of our platform for money laundering,
                terrorist financing, or other financial crime. This Anti-Money Laundering (AML)
                Policy outlines the principles and controls we apply to our merchants and
                transactions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                2. Regulatory Framework
              </h2>
              <p className="mt-3 leading-relaxed">
                Our AML program is designed to align with internationally recognized standards for
                combating money laundering and the financing of terrorism, and is adapted to the
                specific regulatory requirements applicable in each jurisdiction in which we
                operate.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                3. Customer Due Diligence (CDD) and KYC
              </h2>
              <p className="mt-3 leading-relaxed">
                Before onboarding, merchants undergo identity verification and Know Your Customer
                (KYC) checks, including confirmation of business registration, beneficial
                ownership, and the nature of the business. Enhanced due diligence is applied to
                merchants or transactions presenting a higher risk profile.
              </p>
              <p className="mt-3 leading-relaxed">
                Where a transaction or pattern of transactions warrants it, we may request
                supporting evidence of the source of funds or source of wealth behind incoming
                crypto deposits — for example, information tracing a deposit back to a known
                exchange withdrawal, mining or staking reward, or other legitimate origin — before
                releasing settlement.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                4. Risk-Based Approach
              </h2>
              <p className="mt-3 leading-relaxed">
                We apply a risk-based approach to AML compliance, calibrating the level of due
                diligence and ongoing monitoring to factors such as merchant industry,
                transaction volume, geography, and payment network used. Merchants operating in,
                or receiving a material share of transactions from, jurisdictions identified as
                high-risk by international standard-setting bodies are subject to enhanced due
                diligence, which may include more frequent reviews, lower transaction thresholds
                for manual approval, and additional source-of-funds evidence.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                5. Transaction Monitoring
              </h2>
              <p className="mt-3 leading-relaxed">
                Transactions processed through HQclouds are subject to ongoing automated and
                manual monitoring designed to detect patterns consistent with money laundering,
                fraud, or other illicit activity, including unusually large, rapid, or structured
                transactions. This includes blockchain transaction monitoring and on-chain
                analytics: incoming deposits are screened at the wallet-address level for exposure
                to illicit sources such as sanctioned addresses, darknet markets, ransomware,
                mixers and tumblers, and other high-risk services, and each transaction receives a
                risk score based on transaction pattern and counterparty wallet risk before funds
                are released.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                6. Reporting Suspicious Activity
              </h2>
              <p className="mt-3 leading-relaxed">
                Where we identify activity that reasonably appears suspicious, we investigate and,
                where required by applicable law, report it to the relevant financial intelligence
                unit or competent authority. We may also suspend or restrict an account, decline to
                release settlement, or flag the associated wallet address pending investigation. We
                cooperate with law enforcement and regulators investigating suspicious blockchain
                activity, including by providing transaction and wallet-screening records available
                to us upon lawful request.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                7. Sanctions and Watchlist Screening
              </h2>
              <p className="mt-3 leading-relaxed">
                Merchants and, where applicable, their beneficial owners and controlling parties
                are screened against relevant sanctions lists, watchlists, and lists of politically
                exposed persons (PEPs) prior to onboarding and on an ongoing basis. Incoming and
                outgoing wallet addresses are likewise screened against known sanctioned-address
                lists using blockchain analytics tooling. We do not knowingly provide services to
                individuals or entities subject to applicable sanctions, and additional scrutiny is
                applied to PEPs and their close associates.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                8. Record Keeping
              </h2>
              <p className="mt-3 leading-relaxed">
                We retain records related to customer due diligence, transaction monitoring, and
                any related investigations for the period required by applicable law, to support
                regulatory examinations and law enforcement requests.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                9. Employee Training
              </h2>
              <p className="mt-3 leading-relaxed">
                Employees involved in onboarding, compliance, and transaction operations receive
                periodic training on AML obligations, red flags for suspicious activity, and
                internal escalation procedures.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                10. Compliance Contact
              </h2>
              <p className="mt-3 leading-relaxed">
                Questions about this AML Policy, or reports of suspected misuse of the Service,
                can be directed to our compliance team through the contact form on this website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
