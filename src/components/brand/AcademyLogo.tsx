import mark from "./academy-logo.json";

/**
 * The CUTZ ACADEMY mark (CUTZ lettering, ACADEMY and the scissors) as one inline vector path, traced
 * from the supplied transparent logo (scripts/build-academy-logo-svg.mjs). No redraw, no typeface.
 * It takes the surrounding text colour (fill="currentColor"): black on the light Academy pages,
 * white on the dark BYKUCUTZZ homepage (navbar link, teaser). Width comes from the parent; height
 * follows the mark's own ratio, so it is sharp at every size and never stretched.
 */
export function AcademyLogo({ decorative = false, className }: { decorative?: boolean; className?: string }) {
  return (
    <svg
      viewBox={mark.viewBox}
      fill="currentColor"
      className={`academy-logo block h-auto w-full ${className ?? ""}`}
      {...(decorative ? { "aria-hidden": true, focusable: "false" } : { role: "img", "aria-label": "CUTZ ACADEMY" })}
    >
      <path fillRule="evenodd" d={mark.d} />
    </svg>
  );
}
