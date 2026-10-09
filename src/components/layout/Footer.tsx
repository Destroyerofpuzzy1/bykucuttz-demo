import { InstagramLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { AcademyLogo } from "@/components/brand/AcademyLogo";
import { legal, site } from "@/data/site";
import { academy } from "@/data/academy";
import { formatDatePl } from "@/lib/utils";

/** `academy`: the light CUTZ ACADEMY footer (black mark, @cutzzacademy, BYKUCUTZZ as the parent brand). */
export function Footer({ variant = "bykucutzz" }: { variant?: "bykucutzz" | "academy" }) {
  if (variant === "academy") {
    return (
      <footer className="academy-footer">
        <div className="container-x academy-footer-inner">
          <div className="academy-footer-brand">
            <div className="academy-footer-logo">
              <AcademyLogo />
            </div>
            <p className="academy-footer-meta">Szkolenia barberskie · {academy.city}</p>
            <a href={academy.instagram.url} target="_blank" rel="noopener noreferrer" className="academy-footer-ig">
              <InstagramLogo size={20} weight="light" aria-hidden="true" />
              {academy.instagram.handle}
              <span className="sr-only"> (Instagram, otwiera się w nowej karcie)</span>
            </a>
          </div>
          <div className="academy-footer-legal">
            <a href="/" className="academy-footer-home" aria-label="BYKUCUTZZ, strona główna">
              <span>Część</span>
              <Logo decorative className="w-24" />
            </a>
            <a href="/polityka-prywatnosci" className="academy-footer-link">
              Polityka prywatności
            </a>
            <p>
              © {new Date().getFullYear()} {legal.administrator ?? site.name}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-graphite bg-carbon">
      <div className="container-x flex flex-col gap-8 pt-10 pb-[calc(2.5rem+var(--sticky-cta-h))] md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo className="w-36" />
          <p className="t-button text-[0.75rem] tracking-[0.18em] text-steel">Jakość ponad ilość</p>
          {/* a small signature only: Kontakt is the main social destination */}
          <ul className="-ml-2.5 flex items-center gap-1">
            <li>
              <a href={site.socials.instagram.url} target="_blank" rel="noopener" aria-label="Instagram BYKUCUTZZ" className="social-icon">
                <InstagramLogo size={22} weight="light" aria-hidden="true" />
              </a>
            </li>
            {site.socials.facebook && (
              <li>
                <a href={site.socials.facebook.url} target="_blank" rel="noopener" aria-label="Facebook BYKUCUTZZ" className="social-icon">
                  <FacebookLogo size={22} weight="light" aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="t-meta flex flex-col gap-1 text-steel md:items-end md:text-right">
          <a href="/polityka-prywatnosci" className="link-line self-start font-normal text-bone md:self-end">
            Polityka prywatności
          </a>
          <p>Ocena i liczba opinii: Booksy, stan na {formatDatePl(site.stats.asOf)}.</p>
          <p>
            © {new Date().getFullYear()} {legal.administrator ?? site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
