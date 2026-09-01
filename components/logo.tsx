import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 ${className ?? ""}`}
      aria-label="HQclouds home"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="9" fill="#FF5E7E" />
        <path
          d="M8 9L13 19L15 13L20 19L20 9"
          stroke="black"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-heading text-lg font-bold tracking-tight text-black">HQclouds</span>
    </Link>
  );
}
