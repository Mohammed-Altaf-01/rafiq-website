import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Cta } from "@/components/sections/cta";
import { Download } from "@/components/sections/download";
import { Faq } from "@/components/sections/faq";
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
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofRibbon />
        <Verse />
        <HowItWorks />
        <Protection />
        <Journey />
        <Download />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
