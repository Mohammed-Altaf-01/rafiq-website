import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { FreeMonth } from "@/components/sections/free-month";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Journey } from "@/components/sections/journey";
import { ProofRibbon } from "@/components/sections/proof-ribbon";
import { Protection } from "@/components/sections/protection";
import { Verse } from "@/components/sections/verse";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <ProofRibbon />
        <Verse />
        <HowItWorks />
        <Protection />
        <Journey />
        <FreeMonth />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
