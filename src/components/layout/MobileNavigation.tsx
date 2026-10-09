"use client";

import { useEffect, useRef } from "react";
import { InstagramLogo, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { AcademyLogo } from "@/components/brand/AcademyLogo";
import { AcademyCta } from "@/components/academy/AcademyCta";
import { BookingButton } from "@/components/ui/Button";
import { navLinks, site } from "@/data/site";
import { academy as academyData, academyNavLinks } from "@/data/academy";

/** `academy`: the CUTZ ACADEMY variant (Academy links, Academy Instagram, training inquiry CTA). */
type Props = { open: boolean; onClose: () => void; address: string; academy?: boolean };

/** Full-screen menu (<1024px). Focus-trapped, Escape and every link close it, background scroll locked. */
export function MobileNavigation({ open, onClose, address, academy = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const items = [...ref.current.querySelectorAll<HTMLElement>("a,button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[var(--z-menu)] flex flex-col overflow-y-auto bg-ink lg:hidden"
    >
      <div className="container-x flex h-[var(--nav-h)] shrink-0 items-center justify-between">
        {academy ? (
          <div className="nav-brands">
            <a href={academyData.href} onClick={onClose} aria-label="CUTZ ACADEMY, szkolenia barberskie" aria-current="page" className="academy-nav-main">
              <AcademyLogo decorative />
            </a>
            <a href="/" onClick={onClose} aria-label="BYKUCUTZZ, strona główna" className="nav-home-link">
              <Logo decorative className="w-full" />
            </a>
          </div>
        ) : (
          <div className="nav-brands">
            <a href="/" onClick={onClose} className="-ml-1 block p-1" aria-label="BYKUCUTZZ, strona główna">
              <Logo decorative className="w-[6.75rem]" />
            </a>
            <a href={academyData.href} onClick={onClose} aria-label="CUTZ ACADEMY, szkolenia barberskie" className="academy-nav-link">
              <AcademyLogo decorative />
            </a>
          </div>
        )}
        <button type="button" className="-mr-2 grid h-12 w-12 place-items-center" onClick={onClose}>
          <span className="sr-only">Zamknij menu</span>
          <X size={28} weight="light" aria-hidden="true" />
        </button>
      </div>

      <ul className="container-x mt-4 flex flex-col">
        {(academy ? academyNavLinks : navLinks).map((l) => (
          <li key={l.href} className="border-b border-graphite">
            <a
              href={l.href}
              onClick={onClose}
              className="flex min-h-16 items-center text-[clamp(1.75rem,8.5vw,2.75rem)] font-extrabold uppercase leading-none [font-stretch:112%]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="container-x mt-auto flex flex-col gap-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10">
        <p className="t-meta text-steel">{academy ? `Szkolenia barberskie · ${academyData.city}` : address}</p>
        <a
          href={academy ? academyData.instagram.url : site.socials.instagram.url}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-12 items-center gap-3 font-semibold"
        >
          <InstagramLogo size={22} weight="light" aria-hidden="true" />
          {academy ? academyData.instagram.handle : site.socials.instagram.handle}
        </a>
        {academy ? <AcademyCta source="menu" className="w-full" /> : <BookingButton source="menu" className="w-full" />}
      </div>
    </div>
  );
}
