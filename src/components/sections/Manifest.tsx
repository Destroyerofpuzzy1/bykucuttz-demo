import { HexGrid } from "@/components/brand/HexGrid";

/**
 * The tagline becomes a belief. Behind it, a wall of LED hexagons powers on with scroll and runs on
 * behind the salons intro (--grid-ext); one vertical LED tube starts under the hero, runs through
 * this section and becomes the divider between the two salons.
 */
export function Manifest() {
  return (
    <section
      aria-label="Nasza zasada"
      className="relative overflow-x-clip bg-ink pb-[clamp(3rem,4vw,4rem)] pt-[clamp(6rem,8.5vw,8rem)] [--grid-ext:24rem] md:[--grid-ext:36rem]"
    >
      <HexGrid />
      <div
        aria-hidden="true"
        data-led-scrub
        className="led-tube absolute right-4 top-0 h-full w-[2px] origin-top md:left-1/2 md:right-auto md:-ml-px"
      />
      <div className="container-x relative flex flex-col gap-[clamp(1rem,2vw,2rem)]">
        <p data-reveal="slide" className="t-statement t-statement--compact text-scrim max-w-[15ch] pr-6 md:pl-[4vw] md:pr-0">
          Nie robimy tego na ilość.
        </p>
        <p data-reveal="slide" className="t-statement t-statement--compact text-scrim max-w-[15ch] pr-6 md:self-end md:pr-[4vw] md:text-right">
          Robimy to dobrze.
        </p>
      </div>
    </section>
  );
}
