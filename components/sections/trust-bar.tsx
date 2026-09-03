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
                className="group/coin flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-semibold text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                {/* Icons render in their native brand colors (see the note
                    in coin-icon.tsx on why a monochrome/lime-tint treatment
                    isn't viable across this icon set). The hover affordance
                    is a lime glow + slight scale on the icon and a color
                    shift on the ticker text, not a recolor of the mark
                    itself. Network icons on Services stay full lime (a
                    different, deliberate treatment — see that file). */}
                <CoinIcon
                  ticker={coin.ticker}
                  className="h-6 w-6 transition-[scale,box-shadow] duration-200 group-hover/coin:scale-110 group-hover/coin:shadow-[0_0_12px_rgba(205,232,51,0.5)]"
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
