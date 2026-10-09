"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "@phosphor-icons/react";
import { reviews, type Review } from "@/data/reviews";
import { atBarber } from "@/data/team";
import { site } from "@/data/site";
import { formatAtLeast, formatRating } from "@/lib/utils";

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
 * Review ticker: two continuous rows of verbatim Booksy reviews.
 * Seamless loop: each row renders its list twice and travels exactly one copy's width.
 * Pauses only while offscreen (performance). Reduced motion: static wrapped list.
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
      aria-labelledby="opinie-title"
      className={`relative overflow-hidden bg-ink py-[clamp(4rem,7vw,7rem)] ${offscreen ? "marquee-offscreen" : ""}`}
    >
      <div className="container-x mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Stars className="text-[clamp(1.5rem,2.4vw,2.25rem)]" />
            <span className="t-meta text-bone">
              {formatRating(site.stats.rating)} na Booksy, {formatAtLeast(site.stats.reviews)} opinii
            </span>
          </p>
          <h2 id="opinie-title" data-reveal="lines" className="t-display mt-5">
            Co piszą po wizycie
          </h2>
        </div>
        <a href={site.stats.sourceUrl} target="_blank" rel="noopener" className="link-line t-meta self-start text-steel hover:text-bone md:self-auto">
          Wszystkie opinie na Booksy
        </a>
      </div>

      <div className="flex flex-col gap-5 md:gap-7">
        <Row items={rowA} speed={SPEED_A} />
        <Row items={rowB} speed={SPEED_B} reverse />
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
