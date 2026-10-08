/* eslint-disable @next/next/no-img-element */
// Traced from the supplied logo (scripts/build-assets.mjs). Never re-typeset the script.
// 2240 x 720 viewBox -> aspect 3.111
type Props = {
  variant?: "full" | "fill";
  className?: string;
  /** decorative when the brand name is already present as text nearby */
  decorative?: boolean;
};

export function Logo({ variant = "full", className = "", decorative = false }: Props) {
  return (
    <img
      src={variant === "full" ? "/images/brand/logo-full.svg" : "/images/brand/logo-fill.svg"}
      alt={decorative ? "" : "BYKUCUTZZ Barber"}
      width={2240}
      height={720}
      className={`block h-auto ${className}`}
      draggable={false}
    />
  );
}
