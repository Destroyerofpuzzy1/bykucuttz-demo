import { img, type Img } from "@/lib/utils";

// Real client work supplied by the business. Every frame is cropped to 4:5 in the asset build.
// Captions use Booksy service names (TO VERIFY per photo with the business).

export interface WorkItem {
  id: string;
  image: Img;
  caption: string;
  /** object-position inside its frame */
  position?: string;
}

export const work: WorkItem[] = [
  {
    id: "taper",
    image: img("/images/work/taper.webp", "Tył głowy po strzyżeniu: teksturowana góra i niskie cieniowanie karku, w tle heksagonalne światło salonu"),
    caption: "Strzyżenie męskie",
    position: "50% 40%",
  },
  {
    id: "fade",
    image: img("/images/work/fade.webp", "Profil klienta: teksturowana grzywka i wysokie cieniowanie po bokach"),
    caption: "Strzyżenie męskie",
    position: "45% 45%",
  },
  {
    id: "beard",
    image: img("/images/work/beard.webp", "Klient po usłudze włosy i broda: kręcona góra, cieniowanie i wyprofilowana broda"),
    caption: "Włosy + broda",
    position: "40% 45%",
  },
  {
    id: "design",
    image: img("/images/work/design.webp", "Krótkie strzyżenie z wycinanym wzorem po boku głowy"),
    caption: "Buzzcut + design",
    position: "50% 45%",
  },
];
