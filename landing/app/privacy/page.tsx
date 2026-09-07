// app/privacy/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AsteroidPay collects, uses, and protects your personal data across our website and payment services.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background pb-24 pt-32">
        <article className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-accent">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: August 31, 2026</p>

          <div className="mt-12 space-y-10 text-muted-foreground">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                1. Information We Collect
              </h2>
              <p className="mt-3 leading-relaxed">
                We collect information you provide directly, such as your name, company details,
                email address, and phone number when you contact us or engage our services. We
                also collect technical information automatically, including IP address, browser
                type, and usage data when you interact with our website and dashboard.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                2. How We Use Your Information
              </h2>
              <p className="mt-3 leading-relaxed">
                We use the information we collect to provide and improve the Service, respond to
                inquiries, process merchant onboarding, communicate important updates, detect and
                prevent fraud, and comply with our legal and regulatory obligations, including
                those described in our AML Policy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                3. Cookies and Tracking
              </h2>
              <p className="mt-3 leading-relaxed">
                Our website uses cookies and similar technologies to keep you signed in, remember
                your preferences, and understand how our site is used. You can control cookies
                through your browser settings; disabling certain cookies may affect the
                functionality of the website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                4. Data Sharing and Third Parties
              </h2>
              <p className="mt-3 leading-relaxed">
                We do not sell your personal data. We may share information with service providers
                who help us operate the Service, such as hosting and communications providers,
                under confidentiality obligations, and with regulators, law enforcement, or
                professional advisors where required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                5. Data Retention
              </h2>
              <p className="mt-3 leading-relaxed">
                We retain personal data for as long as necessary to provide the Service, meet our
                legal and regulatory obligations, including recordkeeping requirements described
                in our AML Policy, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">6. Data Security</h2>
              <p className="mt-3 leading-relaxed">
                We use administrative, technical, and organizational safeguards designed to
                protect personal data against unauthorized access, alteration, disclosure, or
                destruction. No method of transmission or storage is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">7. Your Rights</h2>
              <p className="mt-3 leading-relaxed">
                Subject to applicable law, you may have the right to access, correct, delete, or
                port your personal data, and to object to or restrict certain processing. To
                exercise these rights, contact us through the form on this website; we will
                respond within the timeframe required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                8. International Data Transfers
              </h2>
              <p className="mt-3 leading-relaxed">
                As we operate across multiple jurisdictions, your data may be transferred to and
                processed in countries other than your own. Where required, we use appropriate
                safeguards to ensure such transfers comply with applicable data protection law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                9. Children&apos;s Privacy
              </h2>
              <p className="mt-3 leading-relaxed">
                The Service is intended for business use by adults and is not directed at
                individuals under the age of 18. We do not knowingly collect personal data from
                children.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                10. Changes to This Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update this Privacy Policy from time to time. We will post the revised
                policy on this page with an updated &ldquo;Last updated&rdquo; date. Material
                changes will be communicated through the website or directly to merchants where
                appropriate.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">11. Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about this Privacy Policy or requests concerning your personal data can
                be directed to our team through the contact form on this website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
