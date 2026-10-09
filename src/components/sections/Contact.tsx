import { InstagramLogo, FacebookLogo, Phone, NavigationArrow, CalendarCheck, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";
import { visibleSalons, show, salonBookingUrl } from "@/data/salons";
import { bookingLinkProps } from "@/lib/booking";

const ICON = 22;
const NEW_TAB = <span className="sr-only"> (otwiera się w nowej karcie)</span>;
const Arrow = () => <ArrowUpRight size={18} weight="light" aria-hidden="true" className="link-arrow" />;

/** Logistics. Verified facts only; the phone renders once provided in data/site.ts. Every action is a
 *  ruled row (cyan icon, white label, external arrow) with the shared cyan-rule hover (globals.css). */
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
                <p className="label-rule t-meta flex-wrap text-steel">
                  Salon {s.number}
                  {p && <span className="text-cyan">podgląd, dane do uzupełnienia</span>}
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
                {(booking || map || phone) && (
                  <ul className="link-rows mt-2 flex flex-col">
                    {booking && (
                      <li>
                        <a {...bookingLinkProps("kontakt", booking)} className="link-row">
                          <CalendarCheck size={ICON} weight="light" aria-hidden="true" className="link-icon" />
                          Rezerwacja na Booksy
                          <Arrow />
                          <span className="sr-only"> (Booksy, otwiera się w nowej karcie)</span>
                        </a>
                      </li>
                    )}
                    {map && (
                      <li>
                        <a href={map} target="_blank" rel="noopener" className="link-row">
                          <NavigationArrow size={ICON} weight="light" aria-hidden="true" className="link-icon rotate-90" />
                          Prowadź do salonu
                          <Arrow />
                          {NEW_TAB}
                        </a>
                      </li>
                    )}
                    {phone && (
                      <li>
                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="link-row">
                          <Phone size={ICON} weight="light" aria-hidden="true" className="link-icon" /> {phone}
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-4">
            <p className="label-rule t-meta text-steel">Social</p>
            <ul className="link-rows mt-2 flex flex-col">
              <li>
                <a href={instagram.url} target="_blank" rel="noopener" className="link-row">
                  <InstagramLogo size={ICON} weight="light" aria-hidden="true" className="link-icon" />
                  <span>
                    Instagram <span className="ml-1 font-medium text-steel">{instagram.handle}</span>
                  </span>
                  <Arrow />
                  {NEW_TAB}
                </a>
              </li>
              {facebook && (
                <li>
                  <a href={facebook.url} target="_blank" rel="noopener" className="link-row">
                    <FacebookLogo size={ICON} weight="light" aria-hidden="true" className="link-icon" />
                    Facebook
                    <Arrow />
                    {NEW_TAB}
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.tel}`} className="link-row">
                    <Phone size={ICON} weight="light" aria-hidden="true" className="link-icon" /> {site.phone.display}
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
