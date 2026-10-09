import manifest from "@/data/images.json";

/** Join class names, skipping falsy values. */
export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

export type Img = { src: string; width: number; height: number; alt: string };

/** Typed image reference from public/images (dimensions come from the build manifest). */
export function img(src: keyof typeof manifest, alt: string): Img {
  const { width, height } = manifest[src];
  return { src, width, height, alt };
}

export const formatRating = (n: number) => n.toFixed(1).replace(".", ",");
/** Booksy counters only grow: the stored number is a confirmed minimum, shown as "5098+". Never for the rating. */
export const formatAtLeast = (n: number) => `${n}+`;
export const zl = (n: number) => `${n} zł`;
export const formatDatePl = (iso: string) =>
  new Date(iso).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
