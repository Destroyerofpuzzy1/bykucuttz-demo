import Image from "next/image";
import { site } from "@/data/site";
import { formatAtLeast, img } from "@/lib/utils";
import { NeonSign } from "@/components/brand/NeonSign";

const crew = img("/images/social/crew-4000.webp", "Ekipa BYKUCUTZZ przed salonem, z balonami w kształcie liczby 4000");

/** The human moment. The photo is the 4000 milestone; today's number lives in typography. */
export function Crew() {
  return (
    <section aria-labelledby="crew-title" className="section-y relative bg-ink">
      <div className="container-x grid items-end gap-10 md:grid-cols-12 md:gap-8">
        <figure className="md:col-span-6 lg:col-span-5 lg:col-start-2">
          <div data-reveal="clip" className="relative aspect-[3/4] w-full max-w-[32rem] overflow-hidden bg-carbon">
            <Image src={crew.src} alt={crew.alt} fill sizes="(min-width:768px) 32rem, 100vw" quality={80} className="photo-soft object-cover" />
          </div>
          <figcaption className="t-meta mt-3 max-w-[32rem] text-steel">
            {site.milestone} opinii. Świętowaliśmy. Dziś jest ich {formatAtLeast(site.stats.reviews)}.
          </figcaption>
        </figure>
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 md:pb-[8%]">
          <NeonSign />
          <h2
            id="crew-title"
            data-reveal="lines"
            className="t-display whitespace-nowrap [font-stretch:115%] !text-[min(9.2vw,3.5rem)] md:!text-[min(4.4vw,4.75rem)] lg:!text-[min(3.8vw,4.75rem)]"
          >
            Bykucutzz.
          </h2>
          <p data-reveal="fade" className="t-title mt-6 max-w-[20ch] font-semibold">
            Przychodzisz po dobre cięcie. My robimy resztę.
          </p>
        </div>
      </div>
    </section>
  );
}
