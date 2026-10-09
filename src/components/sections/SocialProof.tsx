import { site } from "@/data/site";
import { TextLink } from "@/components/ui/Button";
import { HexLamps } from "@/components/brand/HexLamps";
import { formatAtLeast, formatRating } from "@/lib/utils";

const { reviews, fiveStar, rating, sourceUrl } = site.stats;

/**
 * Scale, then perfection, then the principle. The count rolls from the 4000 milestone
 * (crew photo) to today's number once, when the section arrives (MotionController: data-count).
 * Counters carry a "+" (confirmed minimum, the profile keeps growing) in their own element, so the
 * roll still reads a plain number; the 5,0 rating has none. Once rolled, the review count itself beats
 * like a heart, twice and a pause, with a neon halo flaring on each beat (`.review-pulse`, CSS). A small
 * cyan heart in front of the thanks beats together with it; nothing else in the section moves.
 */
export function SocialProof() {
  return (
    <section aria-labelledby="proof-title" className="section-y relative overflow-x-clip bg-ink">
      <HexLamps variant="cluster" />
      <h2 id="proof-title" className="sr-only">
        {formatAtLeast(reviews)} opinii na Booksy, średnia ocena {formatRating(rating)}, {formatAtLeast(fiveStar)} ocen pięciogwiazdkowych
      </h2>
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="review-count lg:col-span-7">
            <p className="t-mega tabular-nums leading-[0.85] max-lg:!text-[min(24vw,9rem)]" aria-hidden="true">
              <span className="review-pulse">
                {/* the same characters in transparent ink: only their cyan glow shows, behind the digits */}
                <span className="review-halo">
                  {reviews}
                  <span className="stat-plus">+</span>
                </span>
                <span data-count data-count-from={site.milestone}>
                  {reviews}
                </span>
                <span className="stat-plus">+</span>
              </span>
            </p>
            <p className="t-title mt-4 text-steel" aria-hidden="true">opinii na Booksy</p>
            <p className="review-thanks t-meta">
              <svg className="review-heart" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 20.4c-.3 0-.6-.1-.8-.3C6.6 16.2 3 13 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3 .8 4 2 1-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 3.9-3.6 7.1-8.2 11-.2.2-.5.3-.8.3Z" />
              </svg>
              Dziękujemy za każde zaufanie.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-6 border-t border-graphite pt-8 lg:col-span-5 lg:col-start-8 lg:pt-6" aria-hidden="true">
            <div className="flex flex-col-reverse gap-1">
              <dt className="t-meta text-steel">średnia ocena</dt>
              <dd className="t-display text-cyan">{formatRating(rating)}</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="t-meta text-steel">ocen 5 / 5</dt>
              <dd className="t-display whitespace-nowrap">
                {fiveStar}
                <span className="stat-plus">+</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-[clamp(4rem,9vw,8rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p data-reveal="lines" className="t-statement">
            <span className="text-steel">Jedna zasada.</span>
            <br />
            Jakość ponad ilość.
          </p>
          <TextLink href={sourceUrl} external className="t-meta self-start text-steel hover:text-bone md:self-auto">
            Sprawdź opinie na Booksy
          </TextLink>
        </div>
      </div>
    </section>
  );
}
