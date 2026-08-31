// components/sections/fees.tsx
const FEE_POINTS = [
  "No setup fee",
  "No monthly fee",
  "No hidden costs",
  "Volume-based discounts for high-volume and enterprise merchants",
  "Transparent, per-transaction pricing",
];

export function Fees() {
  return (
    <section id="fees" className="bg-cream py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Pricing</p>
        <h2 className="mt-3 font-heading text-5xl font-bold text-black sm:text-6xl">From 0.3%</h2>
        <p className="mt-4 text-black/60">
          per successful transaction — the rate drops further as your volume grows.
        </p>
        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {FEE_POINTS.map((point) => (
            <li key={point} className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-black/80">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
