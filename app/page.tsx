import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { Api } from "@/components/sections/api";
import { AutoConvert } from "@/components/sections/auto-convert";
import { Testimonials } from "@/components/sections/testimonials";
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
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
