"use client";

import { useEffect, useRef, useState } from "react";
import { bookingLinkProps } from "@/lib/booking";
import { site } from "@/data/site";

type Option = { id: string; number: string; label: string; url: string };

const KEY = "bk-salon";

/**
 * Mobile-only booking bar. Visible between the hero and the finale, hidden where a
 * section already carries its own booking actions (salon panels, finale, footer).
 * With 2+ bookable salons, the first tap asks which one; the choice is remembered.
 */
export function MobileBookingBar({ options }: { options: Option[] }) {
  const [visible, setVisible] = useState(false);
  const [picker, setPicker] = useState(false);
  const [remembered, setRemembered] = useState<Option | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const id = localStorage.getItem(KEY);
      setRemembered(options.find((o) => o.id === id) ?? null);
    } catch {}
  }, [options]);

  useEffect(() => {
    const blockers = new Map<Element, boolean>();
    const targets = ["#start", "#salony-panels", "#finale", "#kontakt"]
      .map((s) => document.querySelector(s))
      .filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => blockers.set(e.target, e.isIntersecting));
        setVisible(![...blockers.values()].some(Boolean));
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => {
      blockers.set(t, true);
      io.observe(t);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!picker) return;
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPicker(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picker]);

  const choose = (o: Option) => {
    try {
      localStorage.setItem(KEY, o.id);
    } catch {}
    setRemembered(o);
    setPicker(false);
  };

  const needsPicker = options.length > 1 && !remembered;
  const target = remembered ?? options[0];

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-graphite bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        {needsPicker ? (
          <button type="button" className="btn w-full" tabIndex={visible ? 0 : -1} onClick={() => setPicker(true)}>
            Umów wizytę
          </button>
        ) : (
          <a {...bookingLinkProps("sticky", target?.url ?? site.bookingUrl)} className="btn w-full" tabIndex={visible ? 0 : -1}>
            Umów wizytę{remembered && options.length > 1 ? ` · ${remembered.label}` : ""}
          </a>
        )}
      </div>

      {picker && (
        <div className="fixed inset-0 z-[var(--z-menu)] lg:hidden" role="dialog" aria-modal="true" aria-label="Wybierz salon">
          <button type="button" aria-label="Zamknij" className="absolute inset-0 bg-ink/80" onClick={() => setPicker(false)} />
          <div ref={sheetRef} className="absolute inset-x-0 bottom-0 border-t border-graphite bg-carbon px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
            <p className="t-title mb-4">Wybierz salon</p>
            <ul className="flex flex-col">
              {options.map((o) => (
                <li key={o.id} className="border-t border-graphite">
                  <a {...bookingLinkProps("sticky", o.url)} onClick={() => choose(o)} className="flex min-h-16 items-center gap-4 font-bold">
                    <span className="text-3xl font-extrabold text-cyan [font-stretch:68%]">{o.number}</span>
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
