import Image from "next/image";
import images from "@/data/academy-images.json";

/** Original supplied mark, including scissors and texture. No redraw/recolour.
 *  Always eager: the same file sits in the navbar above the fold on every page. */
export function AcademyLogo({ decorative = false, preload = false }: { decorative?: boolean; preload?: boolean }) {
  return (
    <span className={`academy-logo-mount${images.logo.native ? " academy-logo-mount--native" : ""}`}>
      <Image
        src="/images/academy/logo.png"
        alt={decorative ? "" : "CUTZ ACADEMY"}
        width={images.logo.width}
        height={images.logo.height}
        unoptimized
        loading="eager"
        preload={preload}
        className="block h-auto w-full"
      />
    </span>
  );
}
