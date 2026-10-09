"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations";

type Photo = { src: string; width: number; height: number; alt: string };

/* Shape Control lines, drawn in the 800 x 1000 space of public/images/academy/shape.webp (the crop is
   fixed in scripts/build-academy-assets.mjs). Outline of the silhouette from the fringe over the crown
   to the nape, the weight line from the fringe through the temple boundary above the ear, and the
   section line from there to the crown. */
const CONTOUR =
  "M133 394 C132 381 124 345 129 318 C134 291 148 259 163 234 C178 209 200 184 220 166 C240 148 262 136 285 127 C308 118 334 114 360 112 C386 111 413 111 440 118 C467 125 494 138 520 152 C546 166 574 183 596 202 C619 221 639 243 655 268 C671 293 683 321 692 350 C701 379 709 412 710 444 C711 477 706 515 698 545 C691 575 678 601 665 625 C652 649 640 671 622 688 C605 706 570 723 560 730";
const GUIDES = ["M133 393 L707 505", "M500 464 L425 120"];
const NODES = [
  [133, 394],
  [360, 112],
  [710, 444],
  [560, 730],
  [500, 464],
];

/**
 * Photo panel of a programme card, each with an effect taken from the technique.
 * fade: a real fade photographed from behind; colour rises from the skin at the nape through the
 *   blend into the longer hair (CSS mask on a registered `--fade` boundary, cyan line on the edge).
 *   Hovering the card lifts the boundary a little.
 * shape: a longer haircut in profile with its outline, weight line and section line drawn over it
 *   (SVG, LED-style draw); hovering the card brightens the lines.
 * Both reveal once on scroll; without `.js-motion` they are simply shown in their finished state.
 */
export function ProgramMedia({ kind, photo }: { kind: "fade" | "shape"; photo: Photo }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !document.documentElement.classList.contains("js-motion")) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true } });
      if (kind === "fade") {
        tl.fromTo(el, { "--fade-in": -0.25 }, { "--fade-in": 1, duration: 1.8, ease: "power2.inOut" });
      } else {
        tl.fromTo(".academy-shape-contour", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", autoRound: false })
          .fromTo(".academy-shape-guides", { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "none" }, 0.7)
          .fromTo(".academy-shape-node", { attr: { r: 0 } }, { attr: { r: 9 }, duration: 0.45, ease: "back.out(2)", stagger: 0.08 }, 0.9);
      }
    },
    { scope: root }
  );

  const sizes = "(min-width: 1100px) 300px, (min-width: 768px) 45vw, 100vw";

  if (kind === "fade") {
    return (
      <figure ref={root} className="academy-program-media academy-fade">
        <Image className="academy-fade-base" src={photo.src} width={photo.width} height={photo.height} alt="" aria-hidden="true" quality={80} sizes={sizes} />
        <Image className="academy-fade-colour" {...photo} quality={80} sizes={sizes} />
        <span className="academy-fade-line" aria-hidden="true" />
      </figure>
    );
  }

  return (
    <figure ref={root} className="academy-program-media academy-shape">
      <Image {...photo} quality={80} sizes={sizes} />
      <svg className="academy-shape-lines" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="academy-shape-guides">
          {GUIDES.map((d) => (
            <path key={d} className="academy-shape-guide" d={d} />
          ))}
        </g>
        <path className="academy-shape-contour" d={CONTOUR} pathLength={1} />
        <g className="academy-shape-nodes">
          {NODES.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} className="academy-shape-node" cx={cx} cy={cy} r={9} />
          ))}
        </g>
      </svg>
    </figure>
  );
}
