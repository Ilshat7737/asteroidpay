export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "marco-conti",
    name: "Marco Conti",
    role: "Founder",
    company: "CloudNest Hosting",
    location: "Milan, Italy",
    quote:
      "Paying our upstream server providers used to mean two days of waiting on bank transfers and FX fees. Now clients pay us in USDT and it lands the same hour. 0.4% is nothing next to what we lost before.",
  },
  {
    id: "farah-haddad",
    name: "Farah Haddad",
    role: "Operations Lead",
    company: "VeilPoint VPN",
    location: "Beirut, Lebanon",
    quote:
      "Card processors kept flagging our subscriptions as high-risk. HQclouds just works, no explanations needed, and settlement is fast enough that we stopped worrying about cash flow week to week.",
  },
  {
    id: "tobias-lindqvist",
    name: "Tobias Lindqvist",
    role: "Founder",
    company: "Dropcase",
    location: "Gothenburg, Sweden",
    quote:
      "Our buyers are impatient — if checkout takes more than a minute we lose the sale. The auto-convert to USDC also means I never have to sit on a volatile balance between trades.",
  },
  {
    id: "ana-beatriz-souza",
    name: "Ana Beatriz Souza",
    role: "Account Manager",
    company: "AdaptAds",
    location: "São Paulo, Brazil",
    quote:
      "We move money across a dozen countries every week. Tron network fees are basically zero, and support actually answers when a transfer looks stuck instead of leaving us guessing.",
  },
  {
    id: "youssef-el-amrani",
    name: "Youssef El-Amrani",
    role: "Founder",
    company: "RankForge SEO",
    location: "Casablanca, Morocco",
    quote:
      "Clients abroad used to pay through three different services before the money reached me. Now it's one wallet address and a five-minute wait, at a fraction of the cost.",
  },
  {
    id: "mei-ling-tan",
    name: "Mei Ling Tan",
    role: "Founder",
    company: "StreamBox",
    location: "Kuala Lumpur, Malaysia",
    quote:
      "Switching from our old gateway cut processing costs by more than half. 0.3% on our volume is a real number on the P&L, not a marketing line.",
  },
  {
    id: "connor-byrne",
    name: "Connor Byrne",
    role: "Founder",
    company: "ProxyHaven",
    location: "Dublin, Ireland",
    quote:
      "I run this alone, so I needed something I could set up in an afternoon. HQclouds is the first crypto payment tool that didn't make me read documentation for a day first.",
  },
  {
    id: "isabela-rocha",
    name: "Isabela Rocha",
    role: "Founder",
    company: "LicenseKey Hub",
    location: "Lisbon, Portugal",
    quote:
      "Chargebacks on a low-ticket product were killing our margins. Crypto payments settle final, and auto-conversion means I still get paid in a stable currency at the end of the day.",
  },
];
