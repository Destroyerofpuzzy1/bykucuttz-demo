"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { List } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { AcademyLogo } from "@/components/brand/AcademyLogo";
import { AcademyCta } from "@/components/academy/AcademyCta";
import { BookingButton } from "@/components/ui/Button";
import { navLinks } from "@/data/site";
import { academy, academyNavLinks } from "@/data/academy";
import { ScrollTrigger, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./MobileNavigation";

type Props = {
  /** "home": transparent over the hero and revealed by the loader intro. "page": solid from the start. */
  variant?: "home" | "page";
  address: string;
};

export function Header({ variant = "home", address }: Props) {
  // The route picks the brand: CUTZ ACADEMY gets its own logo order, section links and inquiry CTA
  // (Instagram), never the salon links or Booksy. usePathname is known during SSR, so no wrong flash.
  const isAcademy = usePathname()?.startsWith(academy.href) ?? false;
  const links = isAcademy ? academyNavLinks : navLinks;
  const [solid, setSolid] = useState(variant === "page");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // always visible; solid background after the hero (ScrollTrigger, no scroll listener)
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (variant === "home") setSolid(self.scroll() > window.innerHeight * 0.85);
      },
    });
    return () => st.kill();
  });

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-cyan focus:px-4 focus:py-3 focus:text-ink"
      >
        Przejdź do treści
      </a>
      <header
        {...(variant === "home" ? { "data-hero": "nav" } : {})}
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-[background-color] duration-500 ease-[var(--ease-out-expo)]",
          solid ? "bg-carbon/95" : "bg-transparent"
        )}
      >
        <nav aria-label="Główna" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-3 xl:gap-6">
          {isAcademy ? (
            <div className="nav-brands">
              <a href={academy.href} aria-label="CUTZ ACADEMY, szkolenia barberskie" aria-current="page" className="academy-nav-main">
                <AcademyLogo decorative />
              </a>
              <a href="/" aria-label="BYKUCUTZZ, strona główna" className="nav-home-link">
                <Logo decorative className="w-full" />
              </a>
            </div>
          ) : (
            <div className="nav-brands">
              <a href="/" className="-ml-1 block p-1" aria-label="BYKUCUTZZ, strona główna">
                <Logo decorative className="w-[6.75rem] xl:w-[8rem]" />
              </a>
              <a href={academy.href} aria-label="CUTZ ACADEMY, szkolenia barberskie" className="academy-nav-link">
                <AcademyLogo decorative />
              </a>
            </div>
          )}
          <ul className="hidden items-center gap-4 lg:flex xl:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="t-button relative py-3 text-[0.8125rem] text-bone/85 transition-colors hover:text-bone">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 sm:gap-2">
            {isAcademy ? (
              <AcademyCta source="nav" compact className="hidden sm:inline-flex" />
            ) : (
              <BookingButton source="nav" size="sm" className="hidden sm:inline-flex" />
            )}
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 grid h-12 w-12 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Otwórz menu</span>
              <List size={28} weight="light" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNavigation
        open={open}
        address={address}
        academy={isAcademy}
        onClose={() => {
          setOpen(false);
          toggleRef.current?.focus();
        }}
      />
    </>
  );
}
