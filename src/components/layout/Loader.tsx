"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, flicker } from "@/lib/animations";
import { LedTrace } from "@/components/brand/LedTrace";

declare global {
  interface Window {
    __bkMotion?: boolean;
  }
}

/**
 * "The lights come on": the hero ceiling (traced from the photo) ignites in the dark,
 * the logo appears with one cyan pulse, then the darkness lifts and the drawn lines
 * sit exactly on the real LED tubes of the hero photo.
 * Also owns the hero intro, so the hand-off is one continuous timeline.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    window.__bkMotion = true;
    const html = document.documentElement;
    const motion = html.classList.contains("js-motion");
    const showLoader = motion && !html.classList.contains("no-loader");
    const short = html.dataset.loader === "short";

    const heroIntro = () => {
      const tl = gsap.timeline();
      tl.fromTo("[data-hero='media']", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo("[data-hero='nav']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.15)
        .fromTo("[data-hero='line']", { autoAlpha: 1, yPercent: 105 }, { yPercent: 0, duration: 1, stagger: 0.09 }, 0.1)
        .fromTo("[data-hero='fade']", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.45);
      return tl;
    };

    if (!motion) {
      setGone(true);
      return;
    }
    if (!showLoader) {
      heroIntro();
      setGone(true);
      return;
    }

    const el = root.current!;
    const q = gsap.utils.selector(el);
    const visibleTrace = q(".loader__trace").find((s) => getComputedStyle(s).display !== "none");
    const paths = visibleTrace ? visibleTrace.querySelectorAll(".led-path") : [];

    html.style.overflow = "hidden";
    gsap.set("[data-hero='media'], [data-hero='nav'], [data-hero='fade']", { autoAlpha: 0 });

    const finish = () => {
      html.style.overflow = "";
      try {
        sessionStorage.setItem("bk-loader", "1");
        localStorage.setItem("bk-loader", "1");
      } catch {}
      setGone(true);
      ScrollTrigger.refresh();
    };

    const draw = short ? 0.35 : 0.55;
    const tl = gsap.timeline({ onComplete: finish });
    tl.set(paths, { strokeDasharray: "1 1", strokeDashoffset: 1, opacity: 1 })
      // 1. tubes switch on along the ceiling
      .to(paths, { strokeDashoffset: 0, duration: draw, ease: "power2.inOut", stagger: { each: draw / Math.max(paths.length, 1) / 1.6 } }, 0.05)
      .add(flicker(q(".loader__trace")), 0.05)
      // 2. logo out of the dark, one cyan pulse, the phrase
      .fromTo(q(".loader__fill"), { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power3.inOut" }, short ? 0.1 : 0.3)
      .fromTo(q(".loader__sil"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, ease: "none" }, short ? 0.45 : 0.68)
      .to(q(".loader__sil"), { autoAlpha: 0, duration: 0.45, ease: "power2.in" }, short ? 0.6 : 0.82)
      .fromTo(q(".loader__tag"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, short ? 0.4 : 0.62)
      // 3. the room lights up under the drawn lines
      .addLabel("lift", short ? 0.75 : 1.05)
      .to(q(".loader__brand"), { autoAlpha: 0, y: -16, duration: 0.4, ease: "power2.in" }, "lift-=0.1")
      .to(q(".loader__bg"), { autoAlpha: 0, duration: 0.55, ease: "power1.inOut" }, "lift")
      .add(heroIntro(), "lift")
      .to(q(".loader__trace"), { autoAlpha: 0, duration: 0.5, ease: "power1.in" }, "lift+=0.35");

    // never hold anyone hostage: any input fast-forwards, and a wall-clock failsafe
    // completes everything even if animation frames are throttled.
    const skip = () => tl.timeScale(4);
    const failsafe = window.setTimeout(() => tl.progress(1), 3200);
    tl.eventCallback("onComplete", () => {
      window.clearTimeout(failsafe);
      finish();
    });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      html.style.overflow = "";
    };
  });

  if (gone) return null;

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="loader__bg" />
      <LedTrace name="hero" className="loader__trace absolute inset-0 hidden h-full w-full md:block" />
      <LedTrace name="chair" className="loader__trace absolute inset-0 h-full w-full md:hidden" />
      <div className="loader__brand absolute inset-0 flex flex-col items-center justify-center gap-5 px-6">
        <div className="relative w-[min(72vw,30rem)]" style={{ aspectRatio: "2240 / 720" }}>
          <img src="/images/brand/logo-silhouette.svg" alt="" className="loader__sil invisible absolute inset-0 h-full w-full" />
          <img src="/images/brand/logo-fill.svg" alt="" className="loader__fill invisible absolute inset-0 h-full w-full" />
        </div>
        <p className="loader__tag t-button invisible tracking-[0.18em] text-bone">Jakość ponad ilość</p>
      </div>
    </div>
  );
}
