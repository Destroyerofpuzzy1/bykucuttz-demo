import { visibleSalons, show, salonBookingUrl } from "@/data/salons";
import { BookingButton } from "@/components/ui/Button";
import { HexLamps } from "@/components/brand/HexLamps";

/** Nothing but the decision, under a lamp panel overhead. The LED tube from the loader closes the page. */
export function Finale() {
  const bookable = visibleSalons().flatMap((s) => {
    const url = salonBookingUrl(s);
    return url ? [{ s, url }] : [];
  });

  return (
    <section id="finale" aria-labelledby="finale-title" className="relative bg-ink py-[clamp(6rem,14vw,12rem)]">
      <HexLamps variant="overhead" />
      <div className="container-x relative">
        <div aria-hidden="true" data-led-line className="led-tube mb-[clamp(3rem,7vw,6rem)] h-[2px] w-full origin-left" />
        <h2 id="finale-title" data-reveal="lines" className="t-mega !text-[clamp(2.75rem,8.6vw,10rem)] [font-stretch:110%]">
          Czas na <br />
          dobre cięcie.
        </h2>
        <div data-reveal="fade" className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-14">
          {bookable.length > 1 ? (
            bookable.map(({ s, url }) => (
              <BookingButton key={s.id} source="finale" url={url} size="lg">
                Umów: {show(s.district, false)}
              </BookingButton>
            ))
          ) : (
            <BookingButton source="finale" size="lg" className="w-full sm:w-auto" />
          )}
        </div>
      </div>
    </section>
  );
}
