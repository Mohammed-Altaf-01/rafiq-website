import { Device } from "@/components/ui/device";

/** Real product screens provide the hero's proof and its only major depth moment. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[430px] sm:h-[590px] lg:h-[650px] lg:max-w-[500px]">
      <div
        className="absolute inset-x-[8%] top-[12%] h-[72%] rounded-[48%]"
        aria-hidden
        style={{
          background: "color-mix(in srgb, var(--primary) 13%, transparent)",
          filter: "blur(48px)",
        }}
      />
      <div className="absolute top-[15%] left-[2%] w-[55%] -rotate-[8deg] sm:left-[1%]">
        <Device
          src="/screens/block-limit.webp"
          alt="Rafiq holding a daily app limit after its chosen minutes have been used."
          eager
          sizes="(max-width: 640px) 52vw, (max-width: 1024px) 260px, 270px"
        />
      </div>
      <div className="absolute top-0 right-[1%] w-[64%] rotate-[2deg]">
        <Device
          src="/screens/home.webp"
          alt="The Rafiq home screen showing protection controls, today's blocks, time saved, and the dhikr of the day."
          sizes="(max-width: 640px) 61vw, (max-width: 1024px) 300px, 320px"
        />
      </div>
    </div>
  );
}
