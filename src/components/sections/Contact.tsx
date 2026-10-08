import { InstagramLogo, FacebookLogo, Phone, NavigationArrow, CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";
import { visibleSalons, show, salonBookingUrl } from "@/data/salons";
import { bookingLinkProps } from "@/lib/booking";

const linkCls = "inline-flex min-h-12 items-center gap-3 font-semibold transition-colors hover:text-cyan";

/** Logistics. Verified facts only; phone and Facebook render once provided in data/site.ts. */
export function Contact() {
  const salons = visibleSalons();
  const { instagram, facebook } = site.socials;

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="relative border-t border-graphite bg-carbon py-[clamp(4.5rem,9vw,8rem)]">
      <div className="container-x">
        <h2 id="kontakt-title" className="t-display">
          Kontakt.
        </h2>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {salons.map((s) => {
            const p = s.preview;
            const hours = show(s.hours, p);
            const map = show(s.mapUrl, false);
            const phone = show(s.phone, false);
            const booking = salonBookingUrl(s);
            return (
              <div key={s.id} className="flex flex-col gap-4">
                <p className="t-meta text-steel">
                  Salon {s.number}
                  {p && <span className="ml-3 text-cyan">podgląd, dane do uzupełnienia</span>}
                </p>
                <h3 className="t-title">{show(s.district, p)}</h3>
                <address className="not-italic leading-snug">
                  {show(s.street, p)}
                  <br />
                  {show(s.postcode, p)}
                </address>
                {hours && (
                  <dl className="t-meta grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
                    {hours.map((h) => (
                      <div key={h.days} className="contents">
                        <dt className="text-steel">{h.days}</dt>
                        <dd className="tabular-nums">{h.ranges.join(", ")}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="mt-1 flex flex-col">
                  {booking && (
                    <li>
                      <a {...bookingLinkProps("kontakt", booking)} className={linkCls}>
                        <CalendarCheck size={20} weight="light" aria-hidden="true" /> Rezerwacja na Booksy
                      </a>
                    </li>
                  )}
                  {map && (
                    <li>
                      <a href={map} target="_blank" rel="noopener" className={linkCls}>
                        <NavigationArrow size={20} weight="light" aria-hidden="true" className="rotate-90" /> Prowadź do salonu
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className={linkCls}>
                        <Phone size={20} weight="light" aria-hidden="true" /> {phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}

          <div className="flex flex-col gap-4">
            <p className="t-meta text-steel">Social</p>
            <ul className="flex flex-col">
              <li>
                <a href={instagram.url} target="_blank" rel="noopener" className={linkCls}>
                  <InstagramLogo size={22} weight="light" aria-hidden="true" /> Instagram {instagram.handle}
                </a>
              </li>
              {facebook && (
                <li>
                  <a href={facebook.url} target="_blank" rel="noopener" className={linkCls}>
                    <FacebookLogo size={22} weight="light" aria-hidden="true" /> Facebook
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.tel}`} className={linkCls}>
                    <Phone size={22} weight="light" aria-hidden="true" /> {site.phone.display}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
