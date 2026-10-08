"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 0.9 });
}

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
  mobile: "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

/** Fluorescent-tube start: two quick flashes, then steady. */
export function flicker(target: gsap.TweenTarget, at = 0) {
  return gsap
    .timeline({ delay: at })
    .set(target, { opacity: 0 })
    .to(target, { opacity: 1, duration: 0.04, ease: "none" })
    .to(target, { opacity: 0.25, duration: 0.05, ease: "none" })
    .to(target, { opacity: 1, duration: 0.04, ease: "none" })
    .to(target, { opacity: 0.55, duration: 0.06, ease: "none" })
    .to(target, { opacity: 1, duration: 0.08, ease: "none" });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
