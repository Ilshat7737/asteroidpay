import Link from "next/link";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/ui/reveal";

const FOOTER_LINK_CLASS =
  "relative text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border bg-background py-12 text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
        <Logo className="[&_span]:text-foreground" />
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/#services" className={FOOTER_LINK_CLASS}>
            Solutions
          </Link>
          <Link href="/#api" className={FOOTER_LINK_CLASS}>
            API
          </Link>
          <Link href="/#white-label" className={FOOTER_LINK_CLASS}>
            White-label
          </Link>
          <Link href="/#wallet" className={FOOTER_LINK_CLASS}>
            Wallet
          </Link>
          <Link href="/#reviews" className={FOOTER_LINK_CLASS}>
            Reviews
          </Link>
          <a href="/terms" className={FOOTER_LINK_CLASS}>
            Terms of Use
          </a>
          <a href="/privacy" className={FOOTER_LINK_CLASS}>
            Privacy Policy
          </a>
          <a href="/aml" className={FOOTER_LINK_CLASS}>
            AML Policy
          </a>
        </nav>
        <p className="font-mono text-xs text-border-strong">
          © {new Date().getFullYear()} AsteroidPay. All rights reserved.
        </p>
      </div>
      <Reveal>
        <div className="mt-10 select-none px-4 text-center" aria-hidden="true">
          <span
            className="font-heading text-[16vw] leading-none font-bold tracking-tight sm:text-[13vw] lg:text-[10vw]"
            style={{
              color: "var(--color-muted)",
              backgroundImage:
                "linear-gradient(180deg, color-mix(in oklch, var(--color-accent) 22%, transparent) 0%, var(--color-muted) 62%, var(--color-card) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AsteroidPay
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
