// components/sections/trust-bar.tsx
//
// Adapted from 21st.dev's "Logo Cloud Marquee" (@7ovr/logo-cloud-3,
// https://21st.dev/@7ovr/components/logo-cloud-3): kept the seamless
// duplicated-track marquee mechanism (edge-fade mask, pause-on-hover,
// reduced-motion support), dropped the icon-based logos, @remixicon/react
// dependency, and its own inline @keyframes in favor of the `marquee`
// keyframes already defined in app/globals.css (Task 1), and restyled to
// HQclouds's dark-section tokens as a plain text/badge row.
import { networks } from "@/lib/data/networks";

export function TrustBar() {
  const items = [...networks, ...networks];

  return (
    <section className="border-y border-white/10 bg-black py-10">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-white/40">
        Supported networks
      </p>
      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((network, i) => (
            <span
              key={`${network.id}-${i}`}
              aria-hidden={i >= networks.length ? "true" : undefined}
              className="shrink-0 whitespace-nowrap text-lg font-semibold text-white/70 transition-colors duration-200 hover:text-white"
            >
              {network.name} · {network.ticker}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
