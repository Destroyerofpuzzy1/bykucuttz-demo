import Image from "next/image";

type Photo = { src: string; width: number; height: number; alt: string };

/** Plain haircut photo; the card owns its layout and existing entrance reveal. */
export function ProgramMedia({ photo }: { photo: Photo }) {
  const sizes = "(min-width: 1100px) 300px, (min-width: 768px) 45vw, 100vw";

  return (
    <figure className="academy-program-media">
      <Image {...photo} quality={80} sizes={sizes} />
    </figure>
  );
}
