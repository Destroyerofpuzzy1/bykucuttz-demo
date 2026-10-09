"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ArrowUpRight } from "@phosphor-icons/react";
import { reviews, type Review } from "@/data/reviews";
import { atBarber } from "@/data/team";
import { site } from "@/data/site";
import { BookingButton } from "@/components/ui/Button";
import { formatAtLeast, formatRating } from "@/lib/utils";

const { rating, fiveStar, sourceUrl } = site.stats;
const reviewCount = site.stats.reviews;

const rowA = reviews.filter((_, i) => i % 2 === 0);
const rowB = reviews.filter((_, i) => i % 2 === 1);

// px per second; the two rows move in opposite directions at slightly different speeds
const SPEED_A = 70;
const SPEED_B = 58;

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[0.15em] text-cyan ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} weight="fill" className="h-[1em] w-[1em]" />
      ))}
    </span>
  );
}

/**
 * The one social-proof section (former SocialProof + Opinie): scale (5098+, rolled once from the
 * 4000 milestone and then beating three times), the 5,0 rating with stars, two continuous rows of
 * verbatim Booksy reviews, and a booking CTA at this peak of trust.
 * Numbers come only from `site.stats`. Counters carry a "+" (confirmed minimum) in their own element,
 * so the roll still reads a plain number; the rating has none.
 * Marquee: each row renders its list twice and travels exactly one copy's width; pauses only while
 * offscreen. Reduced motion: no roll, no beat, static wrapped list.
 */
export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const [offscreen, setOffscreen] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={root}
      id="opinie"
      aria-labelledby="opinie-title"
      className={`relative overflow-hidden bg-ink py-[clamp(4.5rem,8vw,8rem)] ${offscreen ? "marquee-offscreen" : ""}`}
    >
      <p className="sr-only">
        {formatAtLeast(reviewCount)} opinii na Booksy, średnia ocena {formatRating(rating)} na 5, {formatAtLeast(fiveStar)} ocen
        pięciogwiazdkowych.
      </p>

      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="review-count lg:col-span-7">
          <p className="t-mega tabular-nums leading-[0.85] max-lg:!text-[min(24vw,9rem)]" aria-hidden="true">
            <span className="review-pulse">
              {/* the same characters in transparent ink: only their cyan glow shows, behind the digits */}
              <span className="review-halo">
                {reviewCount}
                <span className="stat-plus">+</span>
              </span>
              <span data-count data-count-from={site.milestone}>
                {reviewCount}
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

        <dl className="grid grid-cols-2 gap-6 border-t border-graphite pt-6 lg:col-span-5 lg:col-start-8" aria-hidden="true">
          <div className="flex flex-col-reverse gap-2">
            <dt className="t-meta text-steel">średnia ocena</dt>
            <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="t-display text-cyan">{formatRating(rating)}</span>
              <Stars className="text-[clamp(0.875rem,1.2vw,1.125rem)]" />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-2">
            <dt className="t-meta text-steel">ocen 5 / 5</dt>
            <dd className="t-display whitespace-nowrap">
              {fiveStar}
              <span className="stat-plus">+</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="container-x mb-6 mt-[clamp(3.5rem,7vw,6rem)] flex flex-wrap items-end justify-between gap-x-6 gap-y-3 md:mb-8">
        <h2 id="opinie-title" data-reveal="lines" className="t-title">
          Co piszą po wizycie
        </h2>
        <a href={sourceUrl} target="_blank" rel="noopener" className="link-line t-meta text-steel hover:text-bone">
          Wszystkie opinie na Booksy
          <ArrowUpRight size={14} weight="light" aria-hidden="true" className="link-arrow" />
          <span className="sr-only"> (otwiera się w nowej karcie)</span>
        </a>
      </div>

      <div className="flex flex-col gap-5 md:gap-7">
        <Row items={rowA} speed={SPEED_A} />
        <Row items={rowB} speed={SPEED_B} reverse />
      </div>

      <div id="opinie-cta" className="container-x mt-[clamp(2.5rem,5vw,4rem)]">
        <BookingButton source="opinie" className="w-full sm:w-auto" />
      </div>
    </section>
  );
}

function Row({ items, speed, reverse = false }: { items: Review[]; speed: number; reverse?: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const [duration, setDuration] = useState(items.length * 6);

  // duration from the real width of one copy, so the speed is constant at every viewport
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDuration(el.scrollWidth / 2 / speed);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  return (
    <div className="marquee-row">
      <ul
        ref={track}
        className="marquee"
        style={{ ["--marquee-duration" as string]: `${duration}s`, ["--marquee-direction" as string]: reverse ? "reverse" : "normal" }}
      >
        {items.map((r, i) => (
          <Item key={`a${i}`} r={r} />
        ))}
        {items.map((r, i) => (
          <Item key={`b${i}`} r={r} hidden />
        ))}
      </ul>
    </div>
  );
}

function Item({ r, hidden = false }: { r: Review; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className="shrink-0 pr-3 md:pr-4">
      <figure className="flex h-full w-[min(24rem,80vw)] flex-col border-l-2 border-cyan bg-carbon px-5 py-5 md:w-[26rem] md:px-7 md:py-6">
        <Stars className="text-[0.875rem]" />
        <blockquote className="mt-3 flex-1 text-[clamp(1.25rem,1.9vw,1.75rem)] font-bold leading-[1.2] [font-stretch:106%]">
          „{r.text}”
        </blockquote>
        <figcaption className="mt-4 flex items-baseline justify-between gap-3 text-[0.9375rem]">
          <span className="font-semibold text-bone">{r.author}</span>
          <span className="t-meta text-steel">{atBarber[r.barber] ?? r.barber}</span>
        </figcaption>
      </figure>
    </li>
  );
}
