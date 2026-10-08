/** Single hexagon cell: the separator mark of the site (from the LED ceiling). */
export function HexGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M7 3.5h10l5 8.5-5 8.5H7L2 12z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
