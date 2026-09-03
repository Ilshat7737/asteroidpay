import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 ${className ?? ""}`}
      aria-label="KShost home"
    >
      <LogoMark size={28} className="h-7 w-7 shrink-0" />
      <span className="font-heading text-lg font-bold tracking-tight text-foreground">KShost</span>
    </Link>
  );
}
