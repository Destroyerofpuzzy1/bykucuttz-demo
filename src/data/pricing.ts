// Booksy price list, read 2026-10-06. Prices in PLN.
// `byku` = the same service with Byku (separate Booksy service).

export interface Service {
  name: string;
  price: number;
  byku?: number;
  duration: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "strzyzenie",
    title: "Strzyżenie",
    services: [
      { name: "Strzyżenie męskie", price: 100, byku: 120, duration: "45 min" },
      { name: "Włosy długie", price: 120, byku: 140, duration: "1 h" },
      { name: "Buzzcut", price: 80, duration: "30 min" },
      { name: "Metamorfoza", price: 130, duration: "1 h 10 min" },
      { name: "Design / wzorek", price: 10, duration: "10 min" },
    ],
  },
  {
    id: "combo",
    title: "Combo",
    services: [
      { name: "Włosy + broda", price: 140, byku: 160, duration: "1 h 15 min" },
      { name: "Głowa na 0 + broda", price: 80, duration: "40 min" },
    ],
  },
  {
    id: "broda",
    title: "Broda",
    services: [
      { name: "Strzyżenie brody", price: 70, duration: "30 min" },
      { name: "Konturowanie brody", price: 20, duration: "20 min" },
      { name: "Repigmentacja brody", price: 50, duration: "25 min" },
      { name: "Repigmentacja włosów", price: 70, duration: "30 min" },
      { name: "Woskowanie nosa", price: 20, duration: "5 min" },
    ],
  },
  {
    id: "junior",
    title: "Junior Barber",
    services: [
      { name: "Strzyżenie męskie", price: 60, duration: "1 h" },
      { name: "Włosy + broda", price: 80, duration: "1 h 30 min" },
      { name: "Buzzcut", price: 40, duration: "40 min" },
      { name: "Strzyżenie brody", price: 40, duration: "40 min" },
      { name: "Głowa na 0 + broda", price: 50, duration: "50 min" },
    ],
  },
];

/** Cheapest service with Byku, for "Strzyżenie Byku od ..." lines. */
export const bykuFrom = Math.min(...serviceGroups.flatMap((g) => g.services.map((s) => s.byku ?? Infinity)));
