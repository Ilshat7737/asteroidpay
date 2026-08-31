import { networks } from "@/lib/data/networks";

export function Services() {
  return (
    <section id="services" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-4xl font-bold text-black sm:text-5xl">
          Accept crypto payments across the networks your customers already use.
        </h2>
        <div
          id="networks"
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {networks.map((network) => (
            <div
              key={network.id}
              className="min-w-[80%] shrink-0 snap-start rounded-[28px] border border-black/10 bg-white p-6 sm:min-w-0 sm:shrink"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-xl font-semibold text-black">{network.name}</h3>
                <span className="text-sm font-medium text-black/50">{network.ticker}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-black/40">{network.standard}</p>
              <p className="mt-4 text-sm text-black/70">{network.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
