"use client";

import { useRef, useState } from "react";
import { List } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { BookingButton } from "@/components/ui/Button";
import { navLinks } from "@/data/site";
import { ScrollTrigger, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./MobileNavigation";

type Props = {
  /** "home": transparent over the hero and revealed by the loader intro. "page": solid from the start. */
  variant?: "home" | "page";
  address: string;
};

export function Header({ variant = "home", address }: Props) {
  const [solid, setSolid] = useState(variant === "page");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // solid after the hero; hide on scroll down, show on scroll up (ScrollTrigger, no scroll listener)
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        if (variant === "home") setSolid(y > window.innerHeight * 0.85);
        setHidden(self.direction === 1 && y > window.innerHeight * 0.6);
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
          "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-[background-color,transform] duration-500 ease-[var(--ease-out-expo)]",
          solid ? "bg-carbon/95" : "bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <nav aria-label="Główna" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a href="/" className="-ml-1 block p-1" aria-label="BYKUCUTZZ, strona główna">
            <Logo decorative className="w-[6.75rem] md:w-[8rem]" />
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="t-button relative py-3 text-[0.8125rem] text-bone/85 transition-colors hover:text-bone">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 sm:gap-2">
            <BookingButton source="nav" size="sm" className="hidden sm:inline-flex" />
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
        onClose={() => {
          setOpen(false);
          toggleRef.current?.focus();
        }}
      />
    </>
  );
}
