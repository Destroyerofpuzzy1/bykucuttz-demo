"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MQ, flicker } from "@/lib/animations";

/**
 * The whole motion vocabulary in one place, driven by data attributes so sections
 * stay Server Components:
 *   data-reveal="lines"  mask rise per line (SplitText)
 *   data-reveal="fade"   short rise + fade
 *   data-reveal="clip"   image opens from the bottom, photo settles 1.12 -> 1
 *   data-led-draw        traced LED strokes ignite (draw + tube flicker)
 *   data-led-scrub       vertical LED tube grows with scroll (manifest -> salons)
 *   data-led-line        horizontal LED tube ignites once (finale)
 *   data-slide=left|right  manifest lines slide in from opposite sides (scrubbed)
 *   data-parallax / data-speed  subtle depth, desktop only
 * Without `.js-motion` (reduced motion / no JS) nothing is hidden and nothing runs.
 */
export function MotionController() {
  useGSAP(() => {
    if (!document.documentElement.classList.contains("js-motion")) return;
    const mm = gsap.matchMedia();
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { autoAlpha: 1 });
              // room for Polish diacritics (Ś, Ć above caps; ogonek of Ę/Ą below) inside the line masks
              gsap.set(self.masks, { paddingTop: "0.14em", marginTop: "-0.14em", paddingBottom: "0.16em", marginBottom: "-0.16em" });
              return gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.05,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 86%", once: true },
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.95, scrollTrigger: { trigger: el, start: "top 90%", once: true } }
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]').forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          tl.fromTo(el, { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.inOut" });
          if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.1);
        });

        gsap.utils.toArray<SVGSVGElement>("[data-led-draw]").forEach((svg) => {
          const paths = svg.querySelectorAll(".led-path");
          const tl = gsap.timeline({ scrollTrigger: { trigger: svg.parentElement, start: "top 55%", once: true } });
          tl.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.12 }).add(flicker(svg), 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-led-scrub]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 70%", scrub: 0.4 } }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-led-line]").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
          tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.inOut" }).add(flicker(el), 0.85);
        });

        const counted: [HTMLElement, number][] = [];
        // numbers roll once from a meaningful start (e.g. the 4000 milestone) to today's value
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.textContent);
          const counter = { v: Number(el.dataset.countFrom ?? 0) };
          const render = () => (el.textContent = String(Math.round(counter.v)));
          render();
          gsap.to(counter, {
            v: to,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: render,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          counted.push([el, to]);
        });

        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((el) => {
          const dir = el.dataset.slide === "left" ? -1 : 1;
          gsap.fromTo(
            el,
            { xPercent: 22 * dir, autoAlpha: 0.15 },
            { xPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 98%", end: "center 55%", scrub: 0.5 } }
          );
        });
        return () => counted.forEach(([el, to]) => (el.textContent = String(to)));
      });

      mm.add(MQ.desktop, () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.08, yPercent: -3 },
            { scale: 1, yPercent: 3, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = Number(el.dataset.speed);
          gsap.fromTo(
            el,
            { yPercent: -speed },
            { yPercent: speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
        // hero photo drifts slower than the page
        gsap.to("[data-hero='media']", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: "#start", start: "top top", end: "bottom top", scrub: true },
        });
      });

      ScrollTrigger.refresh();
    };

    if (document.fonts?.status === "loaded") setup();
    else document.fonts.ready.then(setup);

    return () => {
      cancelled = true;
      mm.revert();
    };
  });

  return null;
}
