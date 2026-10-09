import { getImageProps } from "next/image";
import { site } from "@/data/site";
import { visibleSalons, show } from "@/data/salons";
import { BookingButton } from "@/components/ui/Button";
import { formatAtLeast, formatRating, img } from "@/lib/utils";

const desktop = img("/images/salon/hero-interior.webp", "");
const mobile = img("/images/salon/chair-portrait.webp", "");

export function Hero() {
  const salons = visibleSalons();
  const signal = salons.length > 1 ? `${salons.length} salony · Łódź` : `${show(salons[0].street, false)} · Łódź`;

  // Art direction: landscape interior on desktop, the portrait chair shot on phones.
  const common = { alt: "", sizes: "100vw", priority: true, quality: 80 } as const;
  const { props: desk } = getImageProps({ ...common, ...desktop });
  const { props: mob } = getImageProps({ ...common, ...mobile });

  return (
    <section id="start" aria-labelledby="hero-title" className="relative isolate h-[100svh] min-h-[34rem] overflow-hidden">
      {/* object-position stays centred so the loader's traced LED geometry lands on the real ceiling */}
      <div data-hero="media" className="absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet={mob.srcSet} sizes="100vw" />
          <img {...desk} alt="" className="h-full w-full object-cover object-center" />
        </picture>
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(6,7,8,.75),rgba(6,7,8,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,7,8,.94)_0%,rgba(6,7,8,.6)_30%,rgba(6,7,8,0)_58%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(6,7,8,.65)_0%,rgba(6,7,8,0)_52%)] md:block" />
      </div>

      <div className="container-x relative flex h-full flex-col justify-end pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[calc(var(--nav-h)+1rem)] md:pb-10">
        <h1 id="hero-title" className="hero-title font-black uppercase">
          <span className="sr-only">BYKUCUTZZ Barbershop Łódź. </span>
          <span className="split-line block">
            <span data-hero="line" className="block">Jakość</span>
          </span>
          <span className="split-line block">
            <span data-hero="line" className="block pl-[0.6em]">ponad</span>
          </span>
          <span className="split-line block">
            <span data-hero="line" className="block">ilość</span>
          </span>
        </h1>

        <div className="mt-5 grid gap-5 md:mt-8 md:grid-cols-[1fr_auto] md:items-end md:gap-6">
          <div data-hero="fade" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookingButton source="hero" className="w-full xs:w-auto" />
            <a href="#ekipa" className="link-line">
              Poznaj ekipę
            </a>
          </div>

          <div
            data-hero="fade"
            className="flex items-end justify-between gap-6 border-t border-graphite pt-4 md:flex-col md:items-end md:gap-3 md:border-0 md:pt-0 md:text-right"
          >
            <p className="leading-tight">
              <span className="block text-[clamp(1.5rem,2.6vw,2.25rem)] font-extrabold [font-stretch:120%]">
                {formatRating(site.stats.rating)}
                <span className="ml-2 text-sm font-semibold text-steel [font-stretch:100%]">na Booksy</span>
              </span>
              <span className="t-meta text-bone">{formatAtLeast(site.stats.reviews)} opinii</span>
            </p>
            <a href="#salony" className="t-meta group inline-flex min-h-11 items-center gap-3 text-bone">
              <span>{signal}</span>
              <span aria-hidden="true" className="relative block h-7 w-px overflow-hidden bg-graphite">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-cyan transition-transform duration-700 group-hover:translate-y-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
