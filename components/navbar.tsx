// components/navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/#services", label: "Solutions" },
  { href: "/#networks", label: "Networks" },
  { href: "/#fees", label: "Fees" },
  { href: "/#reviews", label: "Reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openLogin, openContact } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled
          ? "border-b border-border bg-card/72 shadow-[inset_0_1px_0_0_rgba(205,232,51,0.14)] backdrop-blur-xl backdrop-saturate-[1.4]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="rounded-full" onClick={openLogin}>
            Log in
          </Button>
          <Button className="rounded-full" onClick={openContact}>
            Contact us
          </Button>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-card/72 p-6 backdrop-blur-2xl backdrop-saturate-[1.4] md:hidden">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button
              className="flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="relative inline-block w-fit text-foreground transition-colors duration-150 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                setMobileOpen(false);
                openLogin();
              }}
            >
              Log in
            </Button>
            <Button
              className="rounded-full"
              onClick={() => {
                setMobileOpen(false);
                openContact();
              }}
            >
              Contact us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
