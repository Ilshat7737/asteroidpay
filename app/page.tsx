import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { AutoConvert } from "@/components/sections/auto-convert";
import { Fees } from "@/components/sections/fees";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/footer";
import { LoginModal } from "@/components/login-modal";
import { ContactModal } from "@/components/contact-modal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <AutoConvert />
        <Fees />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <LoginModal />
      <ContactModal />
    </>
  );
}
