import Image from "next/image";
import { InstagramLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { work, type WorkItem } from "@/data/work";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const byId = (id: string) => work.find((w) => w.id === id)!;

/**
 * Curated wall of work. Every frame is 4:5; rhythm comes from scale and vertical offset,
 * so all four cuts sit within roughly one viewport on desktop:
 *   [ hero 4 cols ][ 3 cols, dropped ][ 3 cols, raised ][ 2 cols, dropped ]
 * Mobile: hero full width, then a tight two-column wall.
 */
export function Work() {
  return (
    <section id="robota" aria-labelledby="robota-title" className="relative bg-ink py-[clamp(4.5rem,8vw,8rem)]">
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="robota-title" lead="Prawdziwe cięcia z naszych foteli.">
            Robota.
          </SectionHeading>
          <a
            href={site.socials.instagram.url}
            target="_blank"
            rel="noopener"
            data-reveal="fade"
            className="link-line self-start text-[clamp(1rem,1.4vw,1.25rem)] font-bold [font-stretch:110%] md:self-auto"
          >
            <InstagramLogo size={22} weight="light" aria-hidden="true" className="link-icon" />
            Więcej na {site.socials.instagram.handle}
            <ArrowUpRight size={18} weight="light" aria-hidden="true" className="link-arrow" />
            <span className="sr-only"> (Instagram, otwiera się w nowej karcie)</span>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 items-start gap-x-3 gap-y-6 sm:gap-x-4 md:mt-12 lg:grid-cols-12 lg:gap-x-4">
          <Frame item={byId("taper")} className="col-span-2 lg:col-span-4" sizes="(min-width:1024px) 32vw, 100vw" priority />
          <Frame item={byId("fade")} className="lg:col-span-3 lg:mt-[clamp(3rem,7vw,7rem)]" sizes="(min-width:1024px) 24vw, 50vw" />
          <Frame item={byId("beard")} className="mt-10 lg:col-span-3 lg:mt-0" sizes="(min-width:1024px) 24vw, 50vw" />
          <Frame item={byId("design")} className="col-span-2 mx-auto w-[64%] lg:col-span-2 lg:mx-0 lg:mt-[clamp(5rem,12vw,12rem)] lg:w-full" sizes="(min-width:1024px) 16vw, 64vw" />
        </div>
      </div>
    </section>
  );
}

function Frame({ item, className, sizes, priority }: { item: WorkItem; className?: string; sizes: string; priority?: boolean }) {
  return (
    <figure className={cn("group flex flex-col", className)}>
      <div data-reveal="clip" className="relative aspect-[4/5] w-full overflow-hidden bg-carbon">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes={sizes}
          quality={80}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.015]"
          style={{ objectPosition: item.position }}
        />
      </div>
      <figcaption className="t-meta mt-3 flex items-center gap-3 text-steel">
        <span aria-hidden="true" className="h-px w-6 bg-cyan transition-[width] duration-300 ease-[var(--ease-out-expo)] motion-safe:group-hover:w-10" />
        {item.caption}
      </figcaption>
    </figure>
  );
}
