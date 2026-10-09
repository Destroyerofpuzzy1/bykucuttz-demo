import { academy } from "@/data/academy";
import { cn } from "@/lib/utils";

type Source = "hero" | "nav" | "menu";

/** Every training inquiry: the confirmed Academy channel (Instagram), never the Booksy salon booking. */
export function AcademyCta({ source, compact = false, className }: { source: Source; compact?: boolean; className?: string }) {
  return (
    <a
      href={academy.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn academy-cta", compact && "!min-h-11 !px-5", className)}
      data-cta={`academy-${source}`}
    >
      Zapytaj o szkolenie
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (Instagram CUTZ ACADEMY, otwiera się w nowej karcie)</span>
    </a>
  );
}
