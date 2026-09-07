// components/sections/api.tsx
"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

const BULLETS = [
  "Real-time webhooks for every payment state",
  "Sandbox environment with test networks",
  "Official SDKs for Node, Python, and PHP",
  "Idempotent requests — retry safely, never double-charge",
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
    </svg>
  );
}

function ApiCodeMockup({ className }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-border bg-background p-6 font-mono text-xs leading-relaxed sm:text-sm ${className ?? ""}`}>
      <p className="text-muted-foreground">Request</p>
      <pre className="mt-2 overflow-x-auto text-foreground">{`POST /v1/payments
{
  "amount": "129.00",
  "currency": "USD",
  "settle_to": "USDT",
  "webhook_url": "https://yoursite.com/hooks/asteroidpay"
}`}</pre>
      <p className="mt-6 text-muted-foreground">Response</p>
      <pre className="mt-2 overflow-x-auto text-accent">{`200 OK
{
  "id": "pay_8fq2k1",
  "status": "pending",
  "pay_address": "TXn2...ac9F",
  "network": "TRON"
}`}</pre>
    </div>
  );
}

export function Api() {
  const { openContact } = useModal();

  return (
    <section id="api" className="border-t border-border bg-background py-24 text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            One API for every network you accept.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Create a payment, get a webhook when it settles. Asteroid Pay handles routing,
            conversion, and confirmations — your integration doesn&apos;t need to know which chain
            the customer used.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-foreground">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <ArrowIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-10 h-12 rounded-full px-8" onClick={openContact}>
            Contact us
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto min-w-0 w-full max-w-lg md:max-w-none"
        >
          <ApiCodeMockup />
        </motion.div>
      </div>
    </section>
  );
}
