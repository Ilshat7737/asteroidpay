// components/sections/testimonials.tsx
//
// 21st.dev sourcing note: `mcp__21st__search` returned strong candidates for
// this section (e.g. "Card Testimonial" #20215, "Testimonial" #7336/#6286),
// but `mcp__21st__get_component` hit the daily retrieval limit
// (retrieval_limit_reached, 2/day) before any source could be fetched. Per
// the task brief, falling back to the hand-built implementation is a
// sanctioned outcome in that case. This is a desktop grid / mobile CSS
// scroll-snap carousel with zero extra runtime dependency, styled to match
// the dark-section tokens already used by TrustBar and Fees.
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-black py-24 text-cream">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Reviews</p>
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Built for businesses that move fast.
        </h2>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="min-w-[85%] shrink-0 snap-start rounded-[28px] border border-white/10 bg-white/5 p-6 md:min-w-0"
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
