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
        <p className="text-center font-mono text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
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
                {/* Per the approved TrustBar artboard's decision, this
                    marquee goes monochrome by default with a lime tint on
                    hover. CoinIcon renders each mark as a mask-image (alpha
                    only, ignores the source SVG's RGB) filled with
                    currentColor, so these text-color classes tint it
                    uniformly regardless of the icon's original palette —
                    unlike mix-blend-mode, this also works on the several
                    coin marks that are pure black/near-black at rest.
                    Network icons on Services stay full lime (a different,
                    deliberate treatment — see that file). */}
                <CoinIcon
                  ticker={coin.ticker}
                  className="h-6 w-6 text-muted-foreground transition-colors duration-200 group-hover/coin:text-accent"
                />
                {coin.ticker}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
