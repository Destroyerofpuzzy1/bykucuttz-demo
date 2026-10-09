"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MQ, flicker } from "@/lib/animations";

/**
 * The whole motion vocabulary in one place, driven by data attributes so sections
 * stay Server Components:
 *   data-reveal="lines"  mask rise per line (SplitText)
 *   data-reveal="slide"  statements: fast slide out of the mask from blur into focus, line by line, each
 *                        time one enters the viewport; reset only once it is completely off screen
 *   data-reveal="fade"   short rise + fade
 *   data-reveal="clip"   image opens from the bottom, photo settles 1.12 -> 1
 *   data-reveal="rise"   quick staggered rise out of a blur for elements entering together (team hexagons)
 *   data-led-draw        traced LED strokes ignite (draw + tube flicker)
 *   data-led-scrub       vertical LED tube grows with scroll (manifest -> salons)
 *   data-led-line        horizontal LED tube ignites once (finale)
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
        const maskLines = (el: HTMLElement, reveal: (lines: Element[]) => gsap.core.Tween, exact = false) =>
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { autoAlpha: 1 });
              // room for Polish diacritics (Ś, Ć above caps; ogonek of Ę/Ą below) inside the line masks
              gsap.set(self.masks, { paddingTop: "0.14em", marginTop: "-0.14em", paddingBottom: "0.16em", marginBottom: "-0.16em" });
              // exact: neighbouring masks' negative margins would collapse (+0.14em per line break);
              // each break gets the full -0.3em once, so the split keeps the unsplit height (no shift)
              if (exact) {
                gsap.set(self.masks, {
                  marginTop: (i: number) => (i ? "0em" : "-0.14em"),
                  marginBottom: (i: number, _: Element, all: Element[]) => (i < all.length - 1 ? "-0.3em" : "-0.16em"),
                });
              }
              return reveal(self.lines);
            },
          });

        gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) =>
          maskLines(el, (lines) =>
            gsap.from(lines, { yPercent: 108, duration: 1.05, stagger: 0.09, scrollTrigger: { trigger: el, start: "top 86%", once: true } })
          )
        );

        // statements: a fast, decisive slide out of the mask (60px up, blur 10 -> 0, 0.55s power4.out,
        // 0.08s stagger) every time one comes into view, from below or from above; back to the start only
        // once it has left the viewport completely. One paused tween per statement, so fast scrolling can
        // never stack timelines, and `shown` keeps type that is still on screen from replaying or hiding.
        gsap.utils.toArray<HTMLElement>('[data-reveal="slide"]').forEach((el) => {
          let reveal: gsap.core.Tween | undefined;
          let shown = false;
          maskLines(
            el,
            (lines) => {
              reveal = gsap.fromTo(
                lines,
                { y: 60, autoAlpha: 0, filter: "blur(10px)" },
                { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power4.out", stagger: 0.08, clearProps: "filter", paused: true }
              );
              if (shown) reveal.progress(1); // re-split (width change) while on screen: stay revealed
              return reveal;
            },
            true
          );
          const show = () => {
            if (shown) return;
            shown = true;
            reveal?.restart();
          };
          const hide = () => {
            shown = false;
            reveal?.pause(0);
          };
          // in: as soon as it is well inside the viewport; out: only when completely off screen
          const entry = ScrollTrigger.create({ trigger: el, start: "top 90%", end: "bottom 10%", onEnter: show, onEnterBack: show });
          ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onLeave: hide, onLeaveBack: hide });
          if (entry.isActive) show();
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

        // portraits (team hexagons): the ones entering together rise out of a blur on a quick stagger
        ScrollTrigger.batch('[data-reveal="rise"]', {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 40, filter: "blur(8px)" },
              { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", stagger: 0.06, clearProps: "filter" }
            ),
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
            // CSS can follow up once the number has arrived (e.g. the review count's heartbeat)
            onComplete: () => el.setAttribute("data-counted", ""),
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          counted.push([el, to]);
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
