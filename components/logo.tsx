import Link from "next/link";

export function Logo({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 ${className ?? ""}`}
      aria-label="HQclouds home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size static brand mark, next/image adds no benefit here */}
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        className={`h-7 w-7 shrink-0 ${invert ? "invert" : ""}`}
      />
      <span className="font-heading text-lg font-bold tracking-tight text-black">HQclouds</span>
    </Link>
  );
}
