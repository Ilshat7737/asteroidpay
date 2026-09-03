"use client";

import { Reveal } from "@/components/ui/reveal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9Z" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.3-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.7-1.7H16a4.5 4.5 0 0 0 4.5-4.5C20.5 6.6 16.7 3 12 3Z" />
      <circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c5 0 9 4 10.5 7-.6 1.2-1.5 2.5-2.6 3.6M6.1 6.1C4.2 7.4 2.7 9.1 1.5 12 3 15 7 19 12 19c1.1 0 2.1-.2 3.1-.5" />
      <path d="M9.5 10a2.5 2.5 0 0 0 3.5 3.5" />
    </svg>
  );
}

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 13a8 8 0 1 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

const WHITE_LABEL_POINTS = [
  { Icon: GlobeIcon, title: "Custom domain", description: "Checkout and dashboard run on your own domain, not ours." },
  { Icon: PaletteIcon, title: "Your logo and colors", description: "Every screen your customers see carries your brand, throughout." },
  { Icon: EyeOffIcon, title: "No third-party branding", description: "Your customers never see the word AsteroidPay." },
  { Icon: HeadsetIcon, title: "Dedicated support", description: "White-label accounts get their own support line." },
];

export function WhiteLabel() {
  const { openContact } = useModal();

  return (
    <section id="white-label" className="border-b border-border bg-background py-28">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">White-label</p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Your brand at checkout, not ours.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Merchants on our white-label plan run AsteroidPay entirely under their own identity —
            checkout, dashboard, and customer emails all carry your logo, your colors, your domain.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {WHITE_LABEL_POINTS.map(({ Icon, title, description }, i) => (
            <Reveal key={title} index={i}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 transition-[translate,scale,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_48px_rgba(205,232,51,0.28)]">
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
        <Reveal className="mt-12 flex justify-center">
          <Button size="lg" className="h-12 rounded-full px-8" onClick={openContact}>
            Talk to sales
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
