import Image from "next/image";
import { NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { visibleSalons, show, salonBookingUrl, type SalonView } from "@/data/salons";
import { BookingButton } from "@/components/ui/Button";
import { SalonSplit } from "./SalonSplit";

export function Salons() {
  const salons = visibleSalons();
  const multi = salons.length > 1;

  return (
    <section id="salony" aria-labelledby="salony-title" className="relative">
      {/* intro: the manifest's LED tube continues and becomes the divider.
          No background here: the manifest's LED wall runs on behind the intro (the panels below are opaque). */}
      <div data-hex-grid-end className="relative flex flex-col items-center justify-center overflow-hidden px-[var(--gutter)] pb-[clamp(4rem,6vw,6rem)] pt-[clamp(3.5rem,5vw,5rem)] text-center">
        <div aria-hidden="true" data-led-scrub className="led-tube absolute right-4 top-0 h-full w-[2px] origin-top md:left-1/2 md:right-auto md:-ml-px" />
        <h2 id="salony-title" data-reveal="slide" className="t-statement t-statement--compact text-scrim relative !max-w-none">
          {multi ? (
            <>
              Dwa miejsca.
              <br />
              Jeden standard.
            </>
          ) : (
            <>
              Drewnowska
              <br />
              49a.
            </>
          )}
        </h2>
        <p data-reveal="fade" className="t-body-l text-scrim relative mt-6 px-3 text-steel md:mt-8">
          {multi ? "Wybierz swój salon." : "Bałuty, Łódź."}
        </p>
      </div>

      <SalonSplit count={salons.length}>
        {salons.map((s, i) => (
          <SalonPanel key={s.id} salon={s} side={i === 0 ? "a" : "b"} single={!multi} />
        ))}
      </SalonSplit>
    </section>
  );
}

function SalonPanel({ salon, side, single }: { salon: SalonView; side: "a" | "b"; single: boolean }) {
  const p = salon.preview;
  const district = show(salon.district, p);
  const street = show(salon.street, p);
  const postcode = show(salon.postcode, p);
  const hours = show(salon.hours, p);
  const booking = salonBookingUrl(salon);
  const map = show(salon.mapUrl, false);
  const right = side === "b";

  return (
    <article
      data-panel={side}
      aria-labelledby={`${salon.id}-title`}
      className={`split__panel split__panel--${side} group/panel`}
    >
      <div className="split__media">
        <Image
          src={salon.image.src}
          alt={salon.image.alt}
          fill
          sizes="(min-width: 1024px) 65vw, 100vw"
          quality={80}
          className="split__img object-cover"
          style={{ objectPosition: `var(--pos, ${salon.image.desktopPosition})`, ["--pos-m" as string]: salon.image.mobilePosition }}
        />
      </div>
      <div className={`split__scrim split__scrim--${side}`} aria-hidden="true" />

      <span
        aria-hidden="true"
        className={`split__num t-names pointer-events-none absolute bottom-0 select-none text-bone/90 ${right ? "right-[var(--gutter)]" : "left-[var(--gutter)]"}`}
      >
        {salon.number}
      </span>

      <div
        className={`split__content absolute bottom-0 flex max-w-[min(30rem,86vw)] flex-col gap-5  ${
          right ? "right-[var(--gutter)] items-end text-right" : "left-[var(--gutter)] items-start"
        }`}
      >
        {p && (
          <p className="t-meta border border-cyan/60 px-3 py-2 text-cyan">
            Podgląd: dane salonu 02 do uzupełnienia
          </p>
        )}
        <div>
          <p className="t-meta text-steel">Salon {salon.number}</p>
          <h3 id={`${salon.id}-title`} className="t-display">
            {district}
          </h3>
        </div>
        <address className="t-body-l not-italic leading-snug">
          {street}
          <br />
          <span className="text-steel">{postcode}</span>
        </address>
        {hours && (
          <dl className="split__hours t-meta grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
            {hours.map((h) => (
              <div key={h.days} className="contents">
                <dt className="text-steel">{h.days}</dt>
                <dd className="tabular-nums">{h.ranges.join(", ")}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${right ? "justify-end" : ""}`}>
          {booking ? (
            <BookingButton source={salon.id} url={booking}>
              {single ? "Umów wizytę" : "Umów w tym salonie"}
            </BookingButton>
          ) : (
            <span className="btn" aria-disabled="true">
              Link Booksy do uzupełnienia
            </span>
          )}
          {map && (
            <a href={map} target="_blank" rel="noopener" className="link-line">
              <NavigationArrow size={18} weight="light" aria-hidden="true" className="link-icon rotate-90" />
              Prowadź
              <span className="sr-only"> do salonu (Mapy Google, otwiera się w nowej karcie)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
