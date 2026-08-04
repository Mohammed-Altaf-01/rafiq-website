import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Glance } from "@/components/sections/glance";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Pause } from "@/components/sections/pause";
import { Pricing } from "@/components/sections/pricing";
import { Privacy } from "@/components/sections/privacy";
import { Protection } from "@/components/sections/protection";
import { Setup } from "@/components/sections/setup";
import { Verse } from "@/components/sections/verse";
import { EmailGate } from "@/components/ui/email-gate";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Verse />
        <Pause />
        <Glance />
        <Protection />
        <Privacy />
        <Setup />
        <Journey />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      {/* Landing page only, and only for a reader who has scrolled past the
          middle of it without leaving an address. */}
      <EmailGate />
    </>
  );
}
