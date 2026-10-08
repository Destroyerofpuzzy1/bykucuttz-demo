import { Logo } from "@/components/brand/Logo";
import { legal, site } from "@/data/site";
import { formatDatePl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-graphite bg-carbon">
      <div className="container-x flex flex-col gap-8 py-10 pb-28 md:flex-row md:items-end md:justify-between lg:pb-10">
        <div className="flex flex-col gap-3">
          <Logo className="w-36" />
          <p className="t-button text-[0.75rem] tracking-[0.18em] text-steel">Jakość ponad ilość</p>
        </div>
        <div className="t-meta flex flex-col gap-1 text-steel md:items-end md:text-right">
          <a href="/polityka-prywatnosci" className="inline-flex min-h-11 items-center text-bone underline-offset-4 hover:underline">
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
