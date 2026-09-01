import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-black py-12 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
        <Logo className="[&_span]:text-white" invert />
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/#services">Solutions</Link>
          <Link href="/#networks">Networks</Link>
          <Link href="/#fees">Fees</Link>
          <Link href="/#reviews">Reviews</Link>
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/aml">AML Policy</a>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} HQclouds. All rights reserved.</p>
      </div>
      <div className="mt-10 select-none px-4 text-center" aria-hidden="true">
        <span className="font-heading text-[16vw] leading-none font-bold tracking-tight text-white/90 sm:text-[13vw] lg:text-[10vw]">
          HQclouds
        </span>
      </div>
    </footer>
  );
}
