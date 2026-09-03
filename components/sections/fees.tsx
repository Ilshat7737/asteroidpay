// components/sections/fees.tsx
"use client";

import { Reveal } from "@/components/ui/reveal";

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z" />
      <path d="M9 12.5 11 14.5 15 10" />
    </svg>
  );
}

function ChartUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="4" y="14" width="3.2" height="6" rx="1" />
      <rect x="10.4" y="9" width="3.2" height="11" rx="1" />
      <rect x="16.8" y="4" width="3.2" height="16" rx="1" />
    </svg>
  );
}

function PercentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

const FEE_POINTS = [
  {
    Icon: BoltIcon,
    title: "No setup fee",
    description: "Start accepting payments the same day you sign up — nothing to configure or pay upfront.",
  },
  {
    Icon: CalendarIcon,
    title: "No monthly fee",
    description: "Pay only when you get paid. There's no recurring charge sitting on your books.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "No hidden costs",
    description: "The rate you see is the rate you pay — no surprise deductions at settlement.",
  },
  {
    Icon: ChartUpIcon,
    title: "Volume-based discounts",
    description: "Your rate drops automatically as monthly volume grows — built for high-volume and enterprise merchants.",
  },
  {
    Icon: PercentIcon,
    title: "Transparent pricing",
    description: "Every transaction shows its fee up front, itemized on every statement.",
  },
];

export function Fees() {
  return (
    <section id="fees" className="bg-background py-28">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">Pricing</p>
          <h2 className="mt-3 font-heading text-5xl font-bold text-foreground sm:text-6xl">
            From <span className="text-accent">0.3%</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            per successful transaction — the rate drops further as your volume grows.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEE_POINTS.map(({ Icon, title, description }, i) => (
            <Reveal key={title} index={i}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_48px_rgba(205,232,51,0.28)]">
                <div className="relative h-14 w-14">
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-6 rounded-xl bg-accent/15" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
