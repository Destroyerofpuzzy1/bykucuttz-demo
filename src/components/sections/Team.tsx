import Image from "next/image";
import { team, type Employee } from "@/data/team";
import { site } from "@/data/site";
import { BookingButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookingLinkProps } from "@/lib/booking";
import { cn } from "@/lib/utils";

const [lead, ...crew] = team;

/**
 * One crew of hexagon portraits. Byku (the owner) is the large anchor; the other seven form a
 * honeycomb ring: one in the middle, six around it (placement in globals.css, DOM order unchanged).
 *   lg+:   Byku on the left (hexagon, text below), the ring on the right.
 *   md-lg: Byku as a wide row at the top left (hexagon, text beside), the ring below.
 *   mobile: Byku as a wide lead row, crew in 2 columns, booking tile closes the grid.
 * The LED outline reacts only to the hexagon itself (its clip-path is the hit area) or to keyboard
 * focus on the barber's Booksy link.
 */
export function Team() {
  return (
    <section id="ekipa" aria-labelledby="ekipa-title" className="relative bg-ink py-[clamp(4.5rem,8vw,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="ekipa-title" lead="Ośmioro barberów. Każdego wybierzesz na Booksy.">
            Ekipa.
          </SectionHeading>
          <BookingButton source="ekipa" className="hidden md:inline-flex" />
        </div>

        <ol className="lineup mt-10 grid grid-cols-2 items-start gap-x-3 gap-y-8 sm:gap-x-5 md:mt-14">
          <Member employee={lead} lead className="lineup-lead col-span-2" />
          {crew.map((e, i) => (
            <Member key={e.id} employee={e} className={i % 2 ? "lineup-down" : undefined} />
          ))}
          <li className="lineup-cta lineup-down flex flex-col justify-end gap-3 self-stretch border-t border-graphite pt-4 md:hidden">
            <p className="t-meta text-steel">Barbera, usługę i godzinę wybierasz na Booksy.</p>
            <BookingButton source="ekipa" size="sm" className="w-full !px-3" />
          </li>
        </ol>
      </div>
    </section>
  );
}

function Member({ employee: e, lead = false, className }: { employee: Employee; lead?: boolean; className?: string }) {
  const url = e.bookingUrl ?? site.bookingUrl;
  return (
    <li className={cn("group flex min-w-0 flex-col", lead && "max-lg:grid max-lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] max-lg:items-end max-lg:gap-x-4", className)}>
      <figure data-reveal="rise" className="hex-portrait">
        <div className="hex-portrait__photo">
          <Image
            src={e.image.src}
            alt={e.image.alt}
            fill
            sizes={lead ? "(min-width:1024px) 26vw, (min-width:768px) 45vw, 60vw" : "(min-width:1024px) 10vw, (min-width:768px) 14vw, 46vw"}
            quality={80}
            className="object-cover object-[50%_35%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]"
          />
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="hex-portrait__ring">
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
        </svg>
      </figure>

      <div data-reveal="fade" className={cn("min-w-0 pt-3", lead && "md:pt-4")}>
        <h3
          className={cn(
            "font-extrabold uppercase leading-[0.9] [font-stretch:72%]",
            lead ? "text-[clamp(2.75rem,5vw,5rem)]" : "text-[clamp(1.75rem,2.4vw,2.25rem)]"
          )}
        >
          {e.name}
        </h3>
        {e.note && <p className="t-meta mt-1.5 font-semibold text-cyan">{e.note}</p>}

        {e.review && (
          <figure className="mt-2.5">
            <blockquote
              className={cn("font-semibold leading-snug text-bone/90", lead ? "text-[clamp(1rem,1.3vw,1.25rem)]" : "text-[0.875rem]")}
            >
              „{e.review.text}”
            </blockquote>
            <figcaption className="mt-1 text-[0.75rem] text-steel">
              {e.review.author}, {e.review.source}
            </figcaption>
          </figure>
        )}

        <a {...bookingLinkProps("ekipa", url)} className="mt-1 inline-flex min-h-10 items-center text-[0.8125rem] font-semibold underline decoration-1 underline-offset-4 transition-colors hover:text-cyan">
          Umów się do {e.genitive}
          <span className="sr-only"> (Booksy, otwiera się w nowej karcie)</span>
        </a>
      </div>
    </li>
  );
}
