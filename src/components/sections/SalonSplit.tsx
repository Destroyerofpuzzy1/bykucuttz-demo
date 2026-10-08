"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/animations";

/**
 * Desktop (>=1024px): both photos are full-height layers; one CSS variable (--split)
 * drives both clip-paths and the LED divider. Pointer or keyboard focus on a salon
 * opens it to ~65%. Touch-only wide screens: tap toggles.
 * Mobile: plain stacked near-fullscreen panels (CSS), no hover logic at all.
 */
export function SalonSplit({ children, count }: { children: React.ReactNode; count: number }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (count < 2) {
          el.style.setProperty("--split", "100%");
          return;
        }
        const reduce = window.matchMedia(MQ.reduce).matches;
        const panels = [...el.querySelectorAll<HTMLElement>("[data-panel]")];
        const setActive = (side: string | null) => {
          el.dataset.active = side ?? "";
          const v = side === "a" ? "65%" : side === "b" ? "35%" : "50%";
          gsap.to(el, { "--split": v, duration: reduce ? 0 : 0.95, ease: "power3.inOut", overwrite: true });
        };
        const canHover = window.matchMedia("(hover: hover)").matches;
        const cleanups: (() => void)[] = [];
        panels.forEach((p) => {
          const side = p.dataset.panel!;
          const enter = () => setActive(side);
          const focusIn = () => setActive(side);
          const tap = (e: Event) => {
            if ((e.target as HTMLElement).closest("a,button")) return;
            setActive(el.dataset.active === side ? null : side);
          };
          if (canHover) p.addEventListener("pointerenter", enter);
          else p.addEventListener("click", tap);
          p.addEventListener("focusin", focusIn);
          cleanups.push(() => {
            p.removeEventListener("pointerenter", enter);
            p.removeEventListener("click", tap);
            p.removeEventListener("focusin", focusIn);
          });
        });
        const leave = () => setActive(null);
        const focusOut = (e: FocusEvent) => {
          if (!el.contains(e.relatedTarget as Node)) setActive(null);
        };
        if (canHover) el.addEventListener("pointerleave", leave);
        el.addEventListener("focusout", focusOut);

        // reveal: the divider ignites, then both rooms open outward from the line
        if (!reduce) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 15%", scrub: 0.6 },
          });
          tl.fromTo(el.querySelector(".split__divider"), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 0.35 }, 0)
            .fromTo(el.querySelectorAll(".split__curtain--a"), { scaleX: 1 }, { scaleX: 0, ease: "power2.inOut", duration: 0.65 }, 0.3)
            .fromTo(el.querySelectorAll(".split__curtain--b"), { scaleX: 1 }, { scaleX: 0, ease: "power2.inOut", duration: 0.65 }, 0.3)
            .fromTo(el.querySelectorAll(".split__img"), { scale: 1.12 }, { scale: 1, ease: "none", duration: 1 }, 0);
        }

        return () => {
          cleanups.forEach((c) => c());
          el.removeEventListener("pointerleave", leave);
          el.removeEventListener("focusout", focusOut);
        };
      });

      // mobile: each panel's photo opens as it arrives
      mm.add(MQ.mobile, () => {
        el.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
          gsap.fromTo(
            p.querySelector(".split__img"),
            { scale: 1.1 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [count] }
  );

  return (
    <div id="salony-panels" ref={root} className={`split ${count < 2 ? "split--single" : ""}`}>
      {children}
      {count > 1 && (
        <>
          <div aria-hidden="true" className="split__curtain split__curtain--a" />
          <div aria-hidden="true" className="split__curtain split__curtain--b" />
          <div aria-hidden="true" className="split__divider led-tube origin-top" />
        </>
      )}
    </div>
  );
}
