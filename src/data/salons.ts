import { img, type Img } from "@/lib/utils";
import { BOOKSY_URL } from "./site";

/**
 * A value is either verified (safe to show) or missing.
 * Components only ever render `verified` values; missing ones are skipped,
 * except in the explicit development preview where they render as visible placeholders.
 */
export type Field<T> =
  | { status: "verified"; value: T }
  | { status: "TO_PROVIDE" | "TO_VERIFY"; note?: string; preview?: T };

export const verified = <T,>(value: T): Field<T> => ({ status: "verified", value });
export const missing = <T,>(preview?: T, note?: string): Field<T> => ({ status: "TO_PROVIDE", preview, note });

export type Hours = { days: string; ranges: string[] }[];

export interface Salon {
  id: "salon-01" | "salon-02";
  number: "01" | "02";
  /** false = not rendered anywhere in production. */
  published: boolean;
  name: Field<string>;
  district: Field<string>;
  street: Field<string>;
  postcode: Field<string>;
  hours: Field<Hours>;
  phone: Field<string>;
  bookingUrl: Field<string>;
  mapUrl: Field<string>;
  description: Field<string>;
  directionsNote: Field<string>;
  image: Img & {
    /** object-position of the photo inside its sliding window (desktop) and stacked panel (mobile) */
    desktopPosition: string;
    mobilePosition: string;
  };
}

const COORDS_01 = { lat: 51.782902317846776, lng: 19.447081661376956 };

export const salons: Salon[] = [
  {
    id: "salon-01",
    number: "01",
    published: true,
    name: verified("Bałuty"),
    district: verified("Bałuty"),
    street: verified("Drewnowska 49a, LU11"),
    postcode: verified("91-002 Łódź"),
    hours: verified([
      // display copy: ranges written with "do", no dash separators (JSON-LD keeps its own format)
      { days: "Pon do Pt", ranges: ["10:00 do 14:30", "15:00 do 20:00"] },
      { days: "Sob", ranges: ["09:00 do 12:40", "13:00 do 17:00"] },
      { days: "Nd", ranges: ["zamknięte"] },
    ]),
    phone: missing<string>(undefined, "Booksy hides the phone number behind login."),
    bookingUrl: verified(BOOKSY_URL),
    mapUrl: verified(
      `https://www.google.com/maps/dir/?api=1&destination=${COORDS_01.lat},${COORDS_01.lng}`
    ),
    description: missing<string>(),
    directionsNote: missing<string>(undefined, "How to find unit LU11 (entrance, parking)."),
    image: {
      ...img("/images/salon/salon-01.webp", "Wnętrze salonu BYKUCUTZZ na Bałutach: rząd czarnych foteli, lustra i heksagonalne światło LED na suficie"),
      desktopPosition: "64% 50%",
      mobilePosition: "72% 50%",
    },
  },
  {
    id: "salon-02",
    number: "02",
    // TO PROVIDE: flip to true only when name, address, hours and Booksy URL below are verified.
    published: false,
    name: missing("Salon 02"),
    district: missing("Dzielnica"),
    street: missing("Adres do uzupełnienia"),
    postcode: missing("00-000 Łódź"),
    hours: missing([{ days: "Godziny", ranges: ["do uzupełnienia"] }]),
    phone: missing<string>(),
    bookingUrl: missing<string>(undefined, "Separate Booksy profile or location option?"),
    mapUrl: missing<string>(),
    description: missing<string>(),
    directionsNote: missing<string>(),
    image: {
      // TO VERIFY: confirm this photo shows the second salon.
      ...img("/images/salon/salon-02.webp", "Przestronne wnętrze drugiego salonu: przeszklona ściana, heksagonalne światła LED i schody z niebieskim podświetleniem"),
      desktopPosition: "34% 55%",
      mobilePosition: "30% 60%",
    },
  },
];

/** Development-only preview of the complete two-salon design (placeholders are visibly marked). */
export const SALON_02_PREVIEW =
  process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SALON_02_PREVIEW !== "0";

export type SalonView = Salon & { preview: boolean };

export function visibleSalons(): SalonView[] {
  return salons
    .filter((s) => s.published || (SALON_02_PREVIEW && s.id === "salon-02"))
    .map((s) => ({ ...s, preview: !s.published }));
}

/** Value to render: verified value, or (only in preview) the visible placeholder. */
export function show<T>(field: Field<T>, preview: boolean): T | undefined {
  if (field.status === "verified") return field.value;
  return preview ? field.preview : undefined;
}

export function salonBookingUrl(s: Salon): string | undefined {
  return s.bookingUrl.status === "verified" ? s.bookingUrl.value : undefined;
}

// Production guard: a published salon must have its core facts verified.
for (const s of salons) {
  if (!s.published) continue;
  for (const key of ["name", "street", "hours", "bookingUrl"] as const) {
    if (s[key].status !== "verified") {
      throw new Error(`[content] ${s.id} is published but "${key}" is ${s[key].status}.`);
    }
  }
}

/** "Drewnowska 49a, LU11, 91-002 Łódź" for menus and compact contact lines. */
export function primaryAddress(): string {
  const s = salons[0];
  return [show(s.street, false), show(s.postcode, false)].filter(Boolean).join(", ");
}

/** Bookable salons for the mobile booking picker (only verified Booksy URLs). */
export function bookingOptions() {
  return visibleSalons().flatMap((s) => {
    const url = salonBookingUrl(s);
    return url ? [{ id: s.id, number: s.number, label: show(s.district, false) ?? `Salon ${s.number}`, url }] : [];
  });
}
