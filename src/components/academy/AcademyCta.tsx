import { academy } from "@/data/academy";
import { cn } from "@/lib/utils";

type Source = "hero" | "nav" | "menu" | "closing";

/** Every training inquiry: the confirmed Academy channel (Instagram), never the Booksy salon booking.
 *  Academy CTA language: black button, white type, a small blue arrow (styles in academy.css). */
export function AcademyCta({ source, compact = false, large = false, className }: { source: Source; compact?: boolean; large?: boolean; className?: string }) {
  return (
    <a
      href={academy.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn academy-cta", compact && "!min-h-11 !px-5", large && "btn-lg", className)}
      data-cta={`academy-${source}`}
    >
      Zapytaj o szkolenie
      <span className="academy-cta-arrow" aria-hidden="true">↗</span>
      <span className="sr-only"> (Instagram CUTZ ACADEMY, otwiera się w nowej karcie)</span>
    </a>
  );
}
