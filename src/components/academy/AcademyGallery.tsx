"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { gsap } from "@/lib/animations";

const SPEED = 34; // px per second of the endless drift, constant (the pointer hovering does not change it)

type Engine = { step: (dir: 1 | -1) => void; pause: (on: boolean) => void };

/**
 * Hero strip of post-training photos, the page's one photo carousel. With motion (`.js-motion`) the
 * photos open briefly together, then the strip drifts on its own in an endless loop: copies of the
 * set (hidden from assistive tech) fill any screen width and the track wraps by one set width, so
 * there is never a jump back. The speed is constant; hovering does not change it. Dragging holds the
 * drift and moves the strip 1:1 (no inertia after release); after a drag or an arrow glide the drift
 * eases back in from standstill. It stops while its controls or the strip have keyboard focus or via
 * the pause button (WCAG 2.2.2). Without motion (reduced motion / no JS) it is a native scroll strip:
 * touch, keyboard and the arrows still work, nothing moves on its own.
 * Controls sit below the photographs, aligned right, without covering the participants.
 */
export function AcademyGallery({ children, count, label }: { children: ReactNode; count: number; label: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine | null>(null);
  const [loop, setLoop] = useState(false);
  // one copy is rendered from the start (CSS hides it without motion), so the loop never shows a gap
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState({ index: 0, start: true, end: false });

  useEffect(() => {
    if (document.documentElement.classList.contains("js-motion")) setLoop(true);
  }, []);

  // native strip: arrows and the counter follow the scroll position
  useEffect(() => {
    const list = viewport.current;
    const set = track.current?.firstElementChild;
    if (loop || !list || !set) return;
    let frame = 0;
    const measure = () => {
      const items = Array.from(set.children) as HTMLElement[];
      const origin = items[0]?.offsetLeft ?? 0;
      let index = 0;
      for (let i = 1; i < items.length; i++) {
        if (Math.abs(items[i].offsetLeft - origin - list.scrollLeft) < Math.abs(items[index].offsetLeft - origin - list.scrollLeft)) index = i;
      }
      const start = list.scrollLeft < 2;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
      setPosition((old) => (old.index === index && old.start === start && old.end === end ? old : { index, start, end }));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(list);
    list.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      list.removeEventListener("scroll", schedule);
    };
  }, [loop]);

  // endless strip: one transform on the track, driven by the GSAP ticker
  useEffect(() => {
    const view = viewport.current;
    const row = track.current;
    const panel = controls.current;
    if (!loop || !view || !row || !panel) return;
    const state = { x: 0, factor: 0 };
    let period = 1; // one set + one gap: the distance after which the strip looks the same again
    let starts: number[] = []; // left edge of every photo inside a set
    let edge = 0; // the page gutter: a photo that stops there lines up with the heading
    let index = -1;
    let entered = false;
    let visible = false;
    let focused = false;
    let userPaused = false;
    let cancelled = false;
    let target: number | null = null;
    let glide: gsap.core.Tween | null = null;
    let speed: gsap.core.Tween | null = null;
    let entrance: gsap.core.Timeline | null = null;
    let drag: { id: number; x0: number; from: number; moved: boolean } | null = null;

    const wrap = (x: number) => ((x % period) + period) % period;
    const measure = () => {
      const set = row.firstElementChild as HTMLElement;
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      period = set.offsetWidth + gap;
      starts = Array.from(set.children, (item) => (item as HTMLElement).offsetLeft);
      edge = panel.parentElement ? parseFloat(getComputedStyle(panel.parentElement).paddingLeft) || 0 : 0;
      setCopies(Math.max(2, Math.ceil(view.clientWidth / period) + 1));
    };
    const render = () => {
      const w = wrap(state.x);
      row.style.transform = `translate3d(${(-w).toFixed(2)}px, 0, 0)`;
      const line = wrap(w + edge + 2);
      let i = 0;
      starts.forEach((start, k) => {
        if (start <= line) i = k;
      });
      if (i !== index) {
        index = i;
        setPosition((old) => (old.index === i ? old : { ...old, index: i }));
      }
    };
    const tick = (_: number, deltaTime: number) => {
      if (!visible && !glide && !drag) return;
      if (!glide && !drag) state.x += (SPEED * state.factor * Math.min(deltaTime, 64)) / 1000;
      render();
    };
    const settle = () => {
      const goal = !entered || userPaused || focused ? 0 : 1;
      speed?.kill();
      speed = gsap.to(state, { factor: goal, duration: goal > state.factor ? 1.2 : 0.5, ease: "power2.inOut" });
    };
    const glideTo = (x: number, duration: number, ease: string) => {
      target = x;
      glide?.kill();
      glide = gsap.to(state, {
        x,
        duration,
        ease,
        onComplete: () => {
          glide = null;
          target = null;
          // ease back into the drift from standstill instead of jumping to full speed
          state.factor = 0;
          settle();
        },
      });
    };
    // next / previous photo: glide until the nearest photo edge sits on the gutter line; "previous"
    // skips a photo that has only just drifted past the line, otherwise it would merely realign it
    const step = (dir: 1 | -1) => {
      const base = target ?? state.x;
      const line = wrap(base) + edge;
      let best: number | null = null;
      for (const copy of [-1, 0, 1, 2]) {
        for (const start of starts) {
          const at = start + copy * period;
          if (dir > 0 ? at > line + 2 && (best === null || at < best) : at < line - 60 && (best === null || at > best)) best = at;
        }
      }
      if (best !== null) glideTo(base + best - line, 0.85, "power3.inOut");
    };

    // Short simultaneous entrance, then the unchanged drift eases in.
    const enter = () => {
      if (cancelled) return;
      const frames = Array.from(row.querySelectorAll<HTMLElement>(".academy-gallery-frame"));
      const shown = frames
        .filter((frame) => {
          const box = frame.getBoundingClientRect();
          return box.right > 0 && box.left < window.innerWidth;
        })
        .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
      const photos = shown.map((frame) => frame.querySelector("img")).filter(Boolean);
      const done = () => {
        view.dataset.entered = "";
        gsap.set(frames, { clearProps: "clipPath" });
        gsap.set(photos, { clearProps: "transform" });
        entered = true;
        settle();
      };
      entrance = gsap
        .timeline({ onComplete: done })
        .fromTo(shown, { clipPath: "inset(12% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power2.out" }, 0)
        .fromTo(photos, { scale: 1.03 }, { scale: 1, duration: 0.4, ease: "power2.out" }, 0);
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      glide?.kill();
      glide = null;
      target = null;
      drag = { id: event.pointerId, x0: event.clientX, from: state.x, moved: false };
    };
    const onMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x0;
      if (!drag.moved) {
        if (Math.abs(dx) < 6) return;
        drag.moved = true;
        view.setPointerCapture(event.pointerId);
        view.classList.add("is-dragging");
        speed?.kill();
        state.factor = 0; // the drift waits while the strip is held
      }
      state.x = drag.from - dx;
    };
    // release: the strip stays where it was dropped (no inertia) and the drift eases back in
    const onUp = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const { moved } = drag;
      drag = null;
      view.classList.remove("is-dragging");
      if (moved) settle();
    };
    // keyboard focus on the strip or its controls holds it; a mouse click on a button does not
    const inside = (node: EventTarget | null) => node instanceof Node && (view.contains(node) || panel.contains(node));
    const onFocusIn = (event: FocusEvent) => {
      focused = (event.target as Element).matches(":focus-visible");
      settle();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (inside(event.relatedTarget)) return;
      focused = false;
      settle();
    };
    const noDrag = (event: DragEvent) => event.preventDefault();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "120px 0px" });
    const resize = new ResizeObserver(() => {
      measure();
      render();
    });
    measure();
    state.x = -edge; // start with the first photo aligned to the heading
    render();
    io.observe(view);
    resize.observe(view);
    gsap.ticker.add(tick);
    view.addEventListener("pointerdown", onDown);
    view.addEventListener("pointermove", onMove);
    view.addEventListener("pointerup", onUp);
    view.addEventListener("pointercancel", onUp);
    view.addEventListener("dragstart", noDrag);
    for (const scope of [view, panel]) {
      scope.addEventListener("focusin", onFocusIn);
      scope.addEventListener("focusout", onFocusOut);
    }
    engine.current = {
      step,
      pause: (on) => {
        userPaused = on;
        setPaused(on);
        settle();
      },
    };
    // two frames later the copies for wide screens are in the DOM as well
    const start = () => requestAnimationFrame(() => requestAnimationFrame(enter));
    if (document.fonts?.status === "loaded") start();
    else document.fonts.ready.then(start);

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      io.disconnect();
      resize.disconnect();
      glide?.kill();
      speed?.kill();
      entrance?.kill();
      view.removeEventListener("pointerdown", onDown);
      view.removeEventListener("pointermove", onMove);
      view.removeEventListener("pointerup", onUp);
      view.removeEventListener("pointercancel", onUp);
      view.removeEventListener("dragstart", noDrag);
      for (const scope of [view, panel]) {
        scope.removeEventListener("focusin", onFocusIn);
        scope.removeEventListener("focusout", onFocusOut);
      }
      row.style.transform = "";
      engine.current = null;
    };
  }, [loop]);

  function move(index: number) {
    const list = viewport.current;
    const set = track.current?.firstElementChild;
    if (!list || !set) return;
    const first = set.children[0] as HTMLElement;
    const target = set.children[Math.max(0, Math.min(count - 1, index))] as HTMLElement;
    list.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function go(dir: 1 | -1) {
    if (loop) engine.current?.step(dir);
    else move(position.index + dir);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (loop) {
      const dir = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
      if (!dir) return;
      event.preventDefault();
      engine.current?.step(dir);
      return;
    }
    const target = { ArrowLeft: position.index - 1, ArrowRight: position.index + 1, Home: 0, End: count - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    move(target);
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="academy-strip">
      <p id="academy-gallery-hint" className="sr-only">
        {loop ? "Zdjęcia przesuwają się same. Przeciągnij lub użyj klawiszy strzałek." : "Przesuń lub użyj klawiszy strzałek."}
      </p>
      <div
        ref={viewport}
        id="academy-gallery-track"
        className="academy-gallery"
        role="region"
        aria-roledescription="karuzela"
        aria-label={label}
        aria-describedby="academy-gallery-hint"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div ref={track} className="academy-gallery-track">
          <ul className="academy-gallery-set">{children}</ul>
          {Array.from({ length: copies - 1 }, (_, copy) => (
            <ul key={copy} className="academy-gallery-set" aria-hidden="true" inert>
              {children}
            </ul>
          ))}
        </div>
      </div>
      <div className="academy-gallery-footer container-x">
        <div ref={controls} className="academy-gallery-controls" role="group" aria-label="Sterowanie zdjęciami">
          <p className="academy-strip-count t-meta" aria-live={loop ? "off" : "polite"} aria-atomic="true">
            <span className="academy-accent">Po szkoleniu</span> {pad(position.index + 1)} / {pad(count)}
          </p>
          {/* rendered from the start (CSS hides it without motion), so nothing shifts on hydration */}
          <button
            type="button"
            className="academy-gallery-arrow academy-gallery-pause"
            aria-label={paused ? "Wznów przewijanie zdjęć" : "Zatrzymaj przewijanie zdjęć"}
            onClick={() => engine.current?.pause(!paused)}
          >
            {paused ? <Play size={16} weight="fill" aria-hidden="true" /> : <Pause size={16} weight="fill" aria-hidden="true" />}
          </button>
          <button type="button" className="academy-gallery-arrow" aria-label="Poprzednie zdjęcie" aria-controls="academy-gallery-track" disabled={!loop && position.start} onClick={() => go(-1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="academy-gallery-arrow" aria-label="Następne zdjęcie" aria-controls="academy-gallery-track" disabled={!loop && position.end} onClick={() => go(1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
