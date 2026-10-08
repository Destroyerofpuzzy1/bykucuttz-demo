"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ, flicker } from "@/lib/animations";

const S3 = Math.sqrt(3);

/** Design spaces: the SVG is scaled to cover the area (width first) and cropped at the bottom. */
const DESIGNS = {
  wide: { width: 1440, height: 1300, r: 54, tube: 720 }, // the LED tube on the centre line
  narrow: { width: 390, height: 780, r: 28, tube: 373 }, // the tube in the right gutter
};
type Variant = keyof typeof DESIGNS;
type Design = (typeof DESIGNS)[Variant];
type Cell = { d: string; cx: number; cy: number; jitter: number };

/** Power-on: hot white-cyan flash that cools into the CTA cyan (the steady colour lives in CSS). */
const FLASH = "#dff8ff";
const STEADY = "#61ccf0";
/** The wave runs down the wall; cells further from the tube follow a little later. */
const SPREAD = 0.3;

/** Flat-top honeycomb, one column of cells centred on the tube, one cell past every edge. */
function honeycomb({ width, height, r, tube }: Design) {
  const h = S3 * r;
  const step = 1.5 * r;
  const cells: Cell[] = [];
  for (let i = Math.floor(-tube / step) - 1; i <= Math.ceil((width - tube) / step) + 1; i++) {
    const cx = tube + i * step;
    for (let j = -1; j * h < height + h; j++) {
      const cy = j * h + (Math.abs(i) % 2 ? h / 2 : 0);
      const pts = Array.from({ length: 6 }, (_, k) => `${(cx + r * Math.cos((k * Math.PI) / 3)).toFixed(1)} ${(cy + r * Math.sin((k * Math.PI) / 3)).toFixed(1)}`);
      // fixed per cell: neighbours power on slightly out of step, never at random
      const jitter = (((Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1) + 1) % 1;
      cells.push({ d: `M${pts.join("L")}Z`, cx, cy, jitter });
    }
  }
  return cells;
}

/**
 * Decorative LED wall behind the manifest and the salons intro (procedural, not a photo trace),
 * built in the browser for the current breakpoint only. Scroll decides which hexagons have power
 * (down: more of the wall, up: switched off again); each one powers on in real time like an LED:
 * the site's tube flicker, a hot flash, then a steady neon glow. Without motion the wall is simply on.
 */
export function HexGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const pick = () => setVariant(mq.matches ? "wide" : "narrow");
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  const design = variant ? DESIGNS[variant] : null;
  const cells = useMemo(() => (design ? honeycomb(design) : []), [design]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !design || !document.documentElement.classList.contains("js-motion")) return;
      const mm = gsap.matchMedia();
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        mm.add(MQ.motion, () => {
          const paths = el.querySelectorAll<SVGPathElement>(".hex-grid__cell");
          const ambient = el.querySelector<HTMLElement>(".hex-grid__ambient");
          const end = document.querySelector<HTMLElement>("[data-hex-grid-end]") ?? el;
          const glow = ambient ? gsap.quickTo(ambient, "opacity", { duration: 0.6, ease: "power2.out" }) : null;

          const ignite = [...paths].map((path) =>
            gsap
              .timeline({ paused: true })
              .add(flicker(path), 0)
              .fromTo(
                path,
                { stroke: FLASH, strokeWidth: 2.8 },
                // autoRound off, or the width would settle on a whole pixel
                { stroke: STEADY, strokeWidth: 1.5, duration: 0.9, ease: "power2.out", autoRound: false, immediateRender: false },
                0
              )
          );
          const fades: (gsap.core.Tween | undefined)[] = [];
          const powerOn = (i: number) => {
            fades[i]?.kill();
            ignite[i].restart();
          };
          const powerOff = (i: number) => {
            ignite[i].pause();
            fades[i] = gsap.to(paths[i], { opacity: 0, duration: 0.3, ease: "power1.in", onComplete: () => void ignite[i].pause(0) });
          };

          // threshold of each cell along the stretch (grid top -> intro bottom), in scroll progress
          let order: number[] = [];
          let at: number[] = [];
          let lit = 0;
          const measure = () => {
            const box = el.getBoundingClientRect();
            const scale = Math.max(box.width / design.width, box.height / design.height);
            const offsetX = (box.width - design.width * scale) / 2;
            const stretch = Math.max(end.getBoundingClientRect().bottom - box.top, 1);
            const tube = design.tube * scale + offsetX;
            const span = stretch + SPREAD * Math.max(tube, box.width - tube) + design.r * scale;
            at = cells.map((c) => (c.cy * scale + SPREAD * Math.abs(c.cx * scale + offsetX - tube) + design.r * scale * c.jitter) / span);
            order = at.map((_, i) => i).sort((a, b) => at[a] - at[b]);
          };
          // everything up to the front has power, everything past it is off
          const sync = (progress: number, animate: boolean) => {
            while (lit < order.length && at[order[lit]] <= progress) {
              const i = order[lit++];
              if (animate) powerOn(i);
              else ignite[i].progress(1);
            }
            while (lit > 0 && at[order[lit - 1]] > progress) {
              const i = order[--lit];
              if (animate) powerOff(i);
              else ignite[i].pause(0);
            }
          };
          const reset = (progress: number) => {
            fades.forEach((fade) => fade?.kill());
            ignite.forEach((tl) => tl.pause(0));
            lit = 0;
            measure();
            sync(progress, false);
          };

          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 72%",
            endTrigger: end,
            end: "bottom 72%",
            onRefresh: (self) => reset(self.progress),
            onUpdate: (self) => {
              sync(self.progress, true);
              glow?.(self.progress);
            },
          });
          reset(st.progress);
          glow?.(st.progress);
        });
      });

      return () => {
        cancelled = true;
        mm.revert();
      };
    },
    { scope: root, dependencies: [cells], revertOnUpdate: true }
  );

  const box = design && `0 0 ${design.width} ${design.height}`;
  return (
    <div ref={root} aria-hidden="true" className="hex-grid">
      <div className="hex-grid__ambient" />
      {box && (
        <>
          <svg viewBox={box} preserveAspectRatio="xMidYMin slice" className="hex-grid__base" focusable="false">
            {/* one element: shared edges are painted once */}
            <path d={cells.map((c) => c.d).join("")} />
          </svg>
          <svg viewBox={box} preserveAspectRatio="xMidYMin slice" className="hex-grid__lit" focusable="false">
            {cells.map((c, n) => (
              <path key={n} d={c.d} className="hex-grid__cell" />
            ))}
          </svg>
        </>
      )}
    </div>
  );
}
