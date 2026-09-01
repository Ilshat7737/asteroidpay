// components/sections/testimonials.tsx
//
// Continuous marquee, same mechanism as TrustBar (components/sections/trust-bar.tsx):
// a duplicated track animated with the shared `marquee` keyframes (app/globals.css)
// for a seamless infinite loop, paused on hover, disabled under
// prefers-reduced-motion.
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const items = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="bg-black py-24 text-cream">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Reviews</p>
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Built for businesses that move fast.
        </h2>
      </div>

      <div className="group relative mt-12 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-[marquee_70s_linear_infinite] gap-6 px-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              aria-hidden={i >= testimonials.length ? "true" : undefined}
              className="w-[360px] shrink-0 rounded-[28px] border border-white/10 bg-white/5 p-6"
            >
              <blockquote className="text-sm leading-relaxed text-white/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-white/50">
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
