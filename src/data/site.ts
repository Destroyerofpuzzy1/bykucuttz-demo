// Brand-level facts and configuration. Every filled value was read from an official source.
// `null` = not verified yet: components skip it, the privacy page shows it as "do uzupełnienia".

export const BOOKSY_URL =
  "https://booksy.com/pl-pl/293129_bykucutzz-barbershop_barber-shop_23280_lodz";

export const site = {
  name: "BYKUCUTZZ Barbershop",
  tagline: "Jakość ponad ilość",
  city: "Łódź",
  url: null as null | string, // TO PROVIDE: production domain
  bookingUrl: BOOKSY_URL,
  socials: {
    instagram: { url: "https://www.instagram.com/bykucutzz/", handle: "@bykucutzz" },
    // TO VERIFY: no official Facebook page found (Booksy links only Instagram).
    facebook: null as null | { url: string },
  },
  // TO PROVIDE: Booksy hides the phone number behind login. Never fill from third-party directories.
  phone: null as null | { display: string; tel: string },
  // Booksy profile, read 2026-10-06. Dynamic: update here only. The counters (reviews, fiveStar) are shown
  // as confirmed minimums with a trailing "+" (formatAtLeast); the rating is shown as is. Keep asOf current.
  stats: {
    rating: 5.0,
    reviews: 5098,
    fiveStar: 5093,
    asOf: "2026-10-06",
    sourceUrl: BOOKSY_URL,
  },
  // Crew photo shows the 4000-review milestone (historical, not the live number).
  milestone: 4000,
} as const;

/** Privacy-policy facts. All TO PROVIDE by the business; nothing here may be guessed. */
export const legal = {
  administrator: null as null | string, // full business name of the data controller
  address: null as null | string, // registered address
  nip: null as null | string,
  email: null as null | string, // contact for privacy matters
  hostingProvider: null as null | string, // e.g. the company hosting this website
  serverLogRetention: null as null | string, // as configured by the hosting provider
  policyUpdated: "2026-10-06",
};

export const navLinks = [
  { href: "/#salony", label: "Salony" },
  { href: "/#cennik", label: "Cennik" },
  { href: "/#ekipa", label: "Ekipa" },
  { href: "/#robota", label: "Robota" },
  { href: "/#kontakt", label: "Kontakt" },
];
