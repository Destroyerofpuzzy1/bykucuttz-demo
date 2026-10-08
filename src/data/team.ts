import { img, type Img } from "@/lib/utils";
import { bykuFrom } from "./pricing";

// Staff list from Booksy (read 2026-10-06). No roles, bios or specialties: Booksy shows none.
// Each review is a verbatim Booksy review whose "Pracownik" field names this barber.
// Portraits supplied by the business (assets-src/*.jpeg).

export interface Employee {
  id: string;
  /** name as listed on Booksy */
  name: string;
  /** genitive form for "Umów się do ..." / "u ..." */
  genitive: string;
  image: Img;
  /** TO PROVIDE: individual Booksy staff link. null = main Booksy profile (barber is chosen there). */
  bookingUrl: string | null;
  /** TO PROVIDE: role/title if the business wants one shown. Never guessed. */
  role: string | null;
  review: { text: string; author: string; source: "Booksy" } | null;
  /** extra verified fact shown under the review */
  note?: string;
}

const portrait = (id: string, name: string) => img(`/images/team/${id}.webp` as Parameters<typeof img>[0], `${name}, barber BYKUCUTZZ`);

export const team: Employee[] = [
  {
    id: "byku",
    name: "Byku",
    genitive: "Byku",
    image: portrait("byku", "Byku"),
    bookingUrl: null,
    role: null,
    review: { text: "najlepszy barber w łodzi, bardzo polecam", author: "Daniel", source: "Booksy" },
    note: `Strzyżenie Byku od ${bykuFrom} zł`,
  },
  {
    id: "kacper",
    name: "Kacper",
    genitive: "Kacpra",
    image: portrait("kacper", "Kacper"),
    bookingUrl: null,
    role: null,
    review: { text: "Topka bardzo dokładny barber", author: "Kornel", source: "Booksy" },
  },
  {
    id: "kamil",
    name: "Kamil",
    genitive: "Kamila",
    image: portrait("kamil", "Kamil"),
    bookingUrl: null,
    role: null,
    review: { text: "Wszystko super napewno wroce", author: "Dorian", source: "Booksy" },
  },
  {
    id: "sandra",
    name: "Sandra",
    genitive: "Sandry",
    image: portrait("sandra", "Sandra"),
    bookingUrl: null,
    role: null,
    review: { text: "wirtuozersko", author: "Miłosz", source: "Booksy" },
  },
  {
    // Portrait file was named "kasyan"; Booksy lists "Kasim". TO VERIFY spelling with the business.
    id: "kasim",
    name: "Kasim",
    genitive: "Kasima",
    image: portrait("kasim", "Kasim"),
    bookingUrl: null,
    role: null,
    review: { text: "🔝🔝🔝", author: "szymon", source: "Booksy" },
  },
  {
    id: "patryk",
    name: "Patryk",
    genitive: "Patryka",
    image: portrait("patryk", "Patryk"),
    bookingUrl: null,
    role: null,
    review: { text: "Mega super strzyżenie Panie Patryku :-)", author: "Monika", source: "Booksy" },
  },
  {
    id: "ryan",
    name: "Ryan",
    genitive: "Ryana",
    image: portrait("ryan", "Ryan"),
    bookingUrl: null,
    role: null,
    review: { text: "Ryan boss", author: "Arek", source: "Booksy" },
  },
  {
    id: "macias",
    name: "Macias",
    genitive: "Maciasa",
    image: portrait("macias", "Macias"),
    bookingUrl: null,
    role: null,
    review: { text: "Macias to jakiś mistrz nożyczek, Polecam gorąco!!!", author: "Oliwier", source: "Booksy" },
  },
];

/** "Daniel, u Byku" attributions in the review marquee. */
export const atBarber = Object.fromEntries(team.map((e) => [e.name, `u ${e.genitive}`])) as Record<string, string>;
