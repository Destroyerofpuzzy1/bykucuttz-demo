/**
 * The tagline becomes a belief. One vertical LED tube starts under the hero ceiling,
 * runs through this section and becomes the divider between the two salons.
 */
export function Manifest() {
  return (
    <section aria-label="Nasza zasada" className="relative overflow-hidden bg-ink py-[clamp(6rem,16vw,14rem)]">
      <div
        aria-hidden="true"
        data-led-scrub
        className="led-tube absolute right-4 top-0 h-full w-[2px] origin-top md:left-1/2 md:right-auto md:-ml-px"
      />
      <div className="container-x relative flex flex-col gap-[clamp(3.5rem,10vw,9rem)]">
        <p data-slide="left" className="t-statement max-w-[15ch] pr-6 md:pl-[4vw] md:pr-0">
          Nie robimy tego na ilość.
        </p>
        <p data-slide="right" className="t-statement max-w-[15ch] pr-6 md:self-end md:pr-[4vw] md:text-right">
          Robimy to dobrze.
        </p>
      </div>
    </section>
  );
}
