// components/sections/trust-bar.tsx
//
// Adapted from 21st.dev's "Logo Cloud Marquee" (@7ovr/logo-cloud-3,
// https://21st.dev/@7ovr/components/logo-cloud-3): kept the seamless
// duplicated-track marquee mechanism (edge-fade mask, pause-on-hover,
// reduced-motion support), dropped the icon-based logos, @remixicon/react
// dependency, and its own inline @keyframes in favor of the `marquee`
// keyframes already defined in app/globals.css (Task 1), and restyled to
// HQclouds's dark-section tokens as a coin icon + ticker row.
import { coins } from "@/lib/data/coins";
import { CoinIcon } from "@/components/coin-icon";

export function TrustBar() {
  const items = [...coins, ...coins];

  return (
    <section className="border-y border-white/10 bg-black py-10">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-white/40">
        50+ popular coins supported
      </p>
      <div className="group relative mt-6 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-[marquee_220s_linear_infinite] items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((coin, i) => (
            <span
              key={`${coin.ticker}-${i}`}
              aria-hidden={i >= coins.length ? "true" : undefined}
              title={coin.name}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-semibold text-white/70 transition-colors duration-200 hover:text-white"
            >
              <CoinIcon ticker={coin.ticker} className="h-6 w-6" />
              {coin.ticker}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
