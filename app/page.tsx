import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { Api } from "@/components/sections/api";
import { AutoConvert } from "@/components/sections/auto-convert";
import { WhiteLabel } from "@/components/sections/white-label";
import { Testimonials } from "@/components/sections/testimonials";
import { Wallet } from "@/components/sections/wallet";
import { Receive } from "@/components/sections/receive";
import { Send } from "@/components/sections/send";
import { Convert } from "@/components/sections/convert";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Api />
        <AutoConvert />
        <WhiteLabel />
        <Testimonials />
        <Wallet />
        <Receive />
        <Send />
        <Convert />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
