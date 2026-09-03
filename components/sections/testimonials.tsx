// components/sections/testimonials.tsx
//
// Continuous marquee, same mechanism as TrustBar (components/sections/trust-bar.tsx):
// a duplicated track animated with the shared `marquee` keyframes (app/globals.css)
// for a seamless infinite loop, paused on hover, disabled under
// prefers-reduced-motion.
import { testimonials } from "@/lib/data/testimonials";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  const [spotlight, ...rest] = testimonials;
  const items = [...rest, ...rest];

  return (
    <section id="reviews" className="bg-background py-24 text-foreground">
      <Reveal className="mx-auto max-w-6xl px-4">
        <p className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">Reviews</p>
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Built for businesses that move fast.
        </h2>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-3xl px-4 text-center">
        <blockquote className="font-heading text-2xl leading-snug text-foreground sm:text-3xl">
          &ldquo;{spotlight.quote}&rdquo;
        </blockquote>
        <p className="mt-5 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{spotlight.name}</span> · {spotlight.role}, {spotlight.company} · {spotlight.location}
        </p>
      </Reveal>

      <div className="group relative mt-14 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-[marquee_70s_linear_infinite] gap-6 px-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              aria-hidden={i >= rest.length ? "true" : undefined}
              // No lift/scale here, unlike every other card on the page — deliberate,
              // per the approved Testimonials artboard: hovering already pauses the
              // marquee (the pause *is* the hover affordance), so a simultaneous lift
              // would fire on a card that's mid-deceleration — two responses to one
              // gesture. Only a border shift marks the hovered card while it's stopped.
              className="w-[360px] shrink-0 rounded-3xl border border-border bg-card p-6 transition-colors duration-150 hover:border-border-strong"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-muted-foreground">
                  {t.role}, {t.company} · {t.location}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
