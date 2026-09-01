// app/terms/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms and conditions governing use of HQclouds' crypto payment gateway services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-24 pt-32">
        <article className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-accent-ink">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-black sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-black/50">Last updated: August 31, 2026</p>

          <div className="mt-12 space-y-10 text-black/80">
            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3 leading-relaxed">
                By accessing or using the HQclouds website, dashboard, or payment infrastructure
                (collectively, the &ldquo;Service&rdquo;), you agree to be bound by these Terms of
                Use. If you are entering into these Terms on behalf of a company or other legal
                entity, you represent that you have the authority to bind that entity, in which
                case &ldquo;you&rdquo; refers to that entity. If you do not agree to these Terms,
                you must not use the Service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                2. Description of Service
              </h2>
              <p className="mt-3 leading-relaxed">
                HQclouds provides merchants with infrastructure to accept cryptocurrency payments
                across multiple blockchain networks, including automatic conversion of received
                funds into stablecoins or fiat currency at prevailing market rates. The Service is
                made available to businesses onboarded through our sales process; it is not
                currently offered as a self-service, instant-signup product.
              </p>
              <p className="mt-3 leading-relaxed">
                HQclouds acts solely as a payment facilitator and technology gateway between you
                and your customers. We are not a custodian: received funds are held only for the
                brief period required to detect, convert, and settle each transaction through our
                auto-convert process, and are not retained as a standing balance on your behalf.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">3. Eligibility</h2>
              <p className="mt-3 leading-relaxed">
                You must be at least 18 years old and have the legal capacity to enter into
                binding contracts to use the Service. Businesses must be validly formed and in
                good standing under the laws of their jurisdiction of incorporation. We may
                decline to onboard, or may suspend, any applicant or merchant that does not meet
                our eligibility or risk criteria.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                4. Account and User Obligations
              </h2>
              <p className="mt-3 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account
                credentials and for all activity that occurs under your account. You agree to
                provide accurate, current, and complete information during onboarding and to
                promptly update that information if it changes, and to notify us immediately of
                any unauthorized use of your account.
              </p>
              <p className="mt-3 leading-relaxed">
                You are solely responsible for the accuracy of any wallet address you provide or
                configure for receiving settlement. Blockchain transactions are irreversible once
                broadcast to the network: HQclouds cannot recover, reverse, or refund a transaction
                sent to an incorrect or unsupported address, and has no obligation to do so.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">5. Fees</h2>
              <p className="mt-3 leading-relaxed">
                Use of the Service is subject to transaction fees starting from 0.3% per
                successfully settled payment, as described on our website and confirmed in your
                merchant agreement. Fees may vary based on transaction volume, network, and
                settlement currency. We do not charge setup or monthly fees, and applicable fees
                are always disclosed before they are applied.
              </p>
              <p className="mt-3 leading-relaxed">
                Separately from our service fees, each blockchain network charges its own network
                (miner or validator) fee to process a transaction. Network fees are set by the
                network itself, fluctuate with real-time network conditions, and are outside
                HQclouds&apos; control.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                6. Prohibited Uses
              </h2>
              <p className="mt-3 leading-relaxed">
                You may not use the Service to process payments related to illegal goods or
                services, fraud, money laundering, terrorist financing, sanctions evasion, or any
                activity that violates applicable law. We reserve the right to refuse, delay, or
                reverse any transaction we reasonably believe violates this section, and to
                terminate accounts engaged in prohibited activity.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                7. Intellectual Property
              </h2>
              <p className="mt-3 leading-relaxed">
                The Service, including its software, design, branding, and documentation, is
                owned by HQclouds and protected by intellectual property laws. We grant you a
                limited, non-exclusive, non-transferable license to use the Service in accordance
                with these Terms. You may not copy, modify, reverse-engineer, or create derivative
                works from the Service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                8. Limitation of Liability
              </h2>
              <p className="mt-3 leading-relaxed">
                To the fullest extent permitted by law, HQclouds shall not be liable for any
                indirect, incidental, special, or consequential damages arising out of or in
                connection with your use of the Service, including losses resulting from
                blockchain network congestion, third-party wallet errors, or market volatility
                between the time a payment is received and converted.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                9. Indemnification
              </h2>
              <p className="mt-3 leading-relaxed">
                You agree to indemnify and hold HQclouds harmless from any claims, damages, or
                expenses, including reasonable legal fees, arising from your use of the Service,
                your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">10. Termination</h2>
              <p className="mt-3 leading-relaxed">
                We may suspend or terminate your access to the Service at any time, with or
                without cause, including where we reasonably suspect a violation of these Terms or
                applicable law. You may terminate your use of the Service at any time by
                contacting our team. Provisions that by their nature should survive termination
                will survive.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">11. Governing Law</h2>
              <p className="mt-3 leading-relaxed">
                These Terms are governed by the laws of the applicable jurisdiction specified in
                your merchant agreement, without regard to conflict-of-law principles. Any
                disputes arising under these Terms will be resolved in the courts or arbitration
                forum specified in that agreement.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                12. Changes to These Terms
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update these Terms from time to time to reflect changes in our Service or
                legal requirements. We will post the updated Terms on this page with a revised
                &ldquo;Last updated&rdquo; date. Continued use of the Service after changes take
                effect constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">13. Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about these Terms can be directed to our team through the contact form
                on this website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
