import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
        <Logo className="[&_span]:text-white" />
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#services">Solutions</a>
          <a href="#networks">Networks</a>
          <a href="#fees">Fees</a>
          <a href="#reviews">Reviews</a>
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/aml">AML Policy</a>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} HQclouds. All rights reserved.</p>
      </div>
    </footer>
  );
}
