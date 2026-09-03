// components/sections/trust-bar.tsx
//
// Adapted from 21st.dev's "Logo Cloud Marquee" (@7ovr/logo-cloud-3,
// https://21st.dev/@7ovr/components/logo-cloud-3): kept the seamless
// duplicated-track marquee mechanism (edge-fade mask, pause-on-hover,
// reduced-motion support), dropped the icon-based logos, @remixicon/react
// dependency, and its own inline @keyframes in favor of the `marquee`
// keyframes already defined in app/globals.css (Task 1), and restyled to
// KShost's dark-section tokens as a coin icon + ticker row.
import { coins } from "@/lib/data/coins";
import { CoinIcon } from "@/components/coin-icon";
import { Reveal } from "@/components/ui/reveal";

export function TrustBar() {
  const items = [...coins, ...coins];

  return (
    <section className="border-y border-border bg-background py-10">
      <Reveal>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          50+ popular coins supported
        </p>
      </Reveal>
      <Reveal>
        <div className="group relative mt-6 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
          <div className="flex w-max animate-[marquee_220s_linear_infinite] items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {items.map((coin, i) => (
              <span
                key={`${coin.ticker}-${i}`}
                aria-hidden={i >= coins.length ? "true" : undefined}
                title={coin.name}
                className="group/coin flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {/* Coin marks render via CoinIcon's next/image, which can't be
                    recoloured with currentColor. Per the approved TrustBar
                    artboard's decision, this marquee goes monochrome by
                    default with a lime tint on hover — achieved without
                    touching coin-icon.tsx via a mix-blend-mode overlay that
                    tints the icon toward a solid hue regardless of its
                    source colors. Network icons on Services stay full lime
                    (a different, deliberate treatment — see that file). */}
                <span className="relative inline-flex h-6 w-6 shrink-0">
                  <CoinIcon ticker={coin.ticker} className="h-6 w-6" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full bg-muted-foreground mix-blend-color transition-colors duration-200 group-hover/coin:bg-accent"
                  />
                </span>
                {coin.ticker}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
