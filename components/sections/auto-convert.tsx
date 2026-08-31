// components/sections/auto-convert.tsx
export function AutoConvert() {
  return (
    <section className="bg-black py-24 text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Every payment lands the way you want it.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            The moment a payment arrives, HQclouds converts it automatically into a stablecoin like
            USDT or USDC — or straight to fiat — at the live market rate. You never hold volatile
            crypto you didn&apos;t choose to hold.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <ul className="space-y-4 text-sm text-white/80">
            <li>→ Converted at the market rate the instant funds are received</li>
            <li>→ Settle in USDT, USDC, or fiat — your choice</li>
            <li>→ No manual swaps, no exposure to price swings</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
