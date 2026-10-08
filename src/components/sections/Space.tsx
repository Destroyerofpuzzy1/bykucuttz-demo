import Image from "next/image";
import { LedTrace } from "@/components/brand/LedTrace";
import { img } from "@/lib/utils";

const photo = img(
  "/images/salon/space-detail.webp",
  "Stanowiska barberskie z bliska: fotel, lustra z niebieskim podświetleniem i maszynki na blacie"
);

/**
 * Atmosphere at macro scale. The ceiling hex in the photo is traced and ignites over the
 * real tubes. Mobile: photo first, copy below on black (the frame is too busy for type).
 */
export function Space() {
  return (
    <section aria-labelledby="space-title" className="relative bg-ink lg:h-[100svh] lg:min-h-[40rem] lg:max-h-[64rem]">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        <div data-parallax className="absolute inset-0">
          <Image src={photo.src} alt={photo.alt} fill sizes="100vw" quality={80} className="object-cover object-[70%_50%] lg:object-center" />
          <LedTrace name="space" draw className="absolute inset-0 hidden h-full w-full lg:block" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,7,8,1)_0%,rgba(6,7,8,0)_45%)] lg:bg-[linear-gradient(to_right,rgba(6,7,8,.6)_0%,rgba(6,7,8,0)_50%),linear-gradient(to_top,rgba(6,7,8,1)_0%,rgba(6,7,8,0)_30%)]" />
      </div>

      <div className="container-x relative pb-[clamp(5rem,11vw,8rem)] lg:flex lg:h-full lg:items-center lg:pb-0">
        <div className="pt-4 lg:pt-[12svh]">
          <h2 id="space-title" data-reveal="lines" className="t-display">
            To nie jest <br />
            zwykły barber.
          </h2>
          <div className="t-title mt-8 flex flex-col gap-1.5 font-semibold lg:mt-12">
            <p data-reveal="fade">Wpadasz.</p>
            <p data-reveal="fade" className="pl-[1.25em]">
              Siadasz.
            </p>
            <p data-reveal="fade" className="pl-[2.5em]">
              Wychodzisz dobrze ostrzyżony.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
