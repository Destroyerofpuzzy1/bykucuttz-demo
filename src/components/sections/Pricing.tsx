import { serviceGroups, type ServiceGroup } from "@/data/pricing";
import { site } from "@/data/site";
import { BookingButton, TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { zl } from "@/lib/utils";

// Desktop: two balanced columns of groups. Groups with a Byku variant get a second, cyan price column.
const columns: ServiceGroup[][] = [
  serviceGroups.filter((g) => ["strzyzenie", "combo"].includes(g.id)),
  serviceGroups.filter((g) => ["broda", "junior"].includes(g.id)),
];

/** Functional, premium price list: every price visible, no decoration. */
export function Pricing() {
  return (
    <section id="cennik" aria-labelledby="cennik-title" className="section-y relative bg-ink">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="cennik-title" lead="Bez zgadywania. Tyle płacisz, tyle trwa.">
            Cennik.
          </SectionHeading>
          <p data-reveal="fade" className="t-meta max-w-[40ch] text-steel md:text-right">
            Kolumna <span className="font-bold text-cyan">Byku</span>: ta sama usługa u Byku.
          </p>
        </div>

        <div className="mt-12 grid gap-x-[clamp(3rem,7vw,7rem)] gap-y-14 md:mt-16 lg:grid-cols-2">
          {columns.map((groups, i) => (
            <div key={i} className="flex flex-col gap-14">
              {groups.map((g) => (
                <PriceGroup key={g.id} group={g} />
              ))}
            </div>
          ))}
        </div>

        <div data-reveal="fade" className="mt-14 flex flex-col gap-4 border-t border-graphite pt-10 sm:flex-row sm:items-center sm:gap-8 md:mt-20">
          <BookingButton source="cennik" />
          <TextLink href={site.bookingUrl} external className="self-start text-steel hover:text-bone sm:self-auto">
            Pełny cennik na Booksy
          </TextLink>
        </div>
      </div>
    </section>
  );
}

function PriceGroup({ group }: { group: ServiceGroup }) {
  const hasByku = group.services.some((s) => s.byku);
  const cols = hasByku ? "grid-cols-[1fr_4.25rem_4.25rem] sm:grid-cols-[1fr_5.5rem_5.5rem]" : "grid-cols-[1fr_5.5rem]";

  return (
    <div data-reveal="fade">
      <div className={`grid items-end gap-x-3 border-b border-graphite pb-3 ${cols}`}>
        <h3 className="t-title">{group.title}</h3>
        {hasByku && (
          <>
            <span className="t-meta text-right text-steel">Ekipa</span>
            <span className="t-meta text-right font-bold text-cyan">Byku</span>
          </>
        )}
      </div>
      <ul>
        {group.services.map((s) => (
          <li key={s.name} className={`grid items-baseline gap-x-3 border-b border-graphite/60 py-3.5 last:border-0 ${cols}`}>
            <span className="min-w-0">
              <span className="block font-semibold [font-stretch:104%]">{s.name}</span>
              <span className="t-meta text-steel">{s.duration}</span>
            </span>
            <span className="t-price text-right">{zl(s.price)}</span>
            {hasByku && (
              <span className="t-price text-right text-cyan">
                {s.byku ? (
                  zl(s.byku)
                ) : (
                  <>
                    <span aria-hidden="true" className="text-graphite">
                      ·
                    </span>
                    <span className="sr-only">brak wariantu u Byku</span>
                  </>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
