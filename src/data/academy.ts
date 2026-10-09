import images from "./academy-images.json";
import media from "./academy-videos.json";

/** Confirmed by the client and the official Instagram bio, read 2026-10-09. */
export const academy = {
  name: "CUTZ ACADEMY",
  href: "/cutz-academy",
  instagram: { handle: "@cutzzacademy", url: "https://www.instagram.com/cutzzacademy/" },
  city: "Łódź",
  source: "https://www.instagram.com/cutzzacademy/",
  verifiedAsOf: "2026-10-09",
  // TO_PROVIDE: exact venue, instructors, dates, prices, duration, group sizes,
  // full syllabus and whether any certificate is issued. Photos are not proof of an offer.
} as const;

/** The one visible statement about unconfirmed offer details (programme, dates, duration, price,
 *  group size, venue, instructor, certificates): they are agreed in the Instagram conversation. */
export const academyInquiryNote =
  "Szczegóły, dostępne terminy i cenę szkolenia ustalisz z nami w wiadomości na Instagramie.";

/** Navbar on the Academy route: the page's own sections (ids on /cutz-academy), not the salon links. */
export const academyNavLinks = [
  { href: `${academy.href}#start`, label: "Start" },
  { href: `${academy.href}#szkolenia`, label: "Szkolenia" },
  { href: `${academy.href}#praktyka`, label: "Praktyka" },
  { href: `${academy.href}#zapisy`, label: "Zapisy" },
];

/** Paraphrased from client-supplied Instagram screenshots, 2026-10-09; shortened to the key facts.
 *  The card photos are client-supplied BYKUCUTZZ haircut photos (assets-src cut4 / cut6) that show the
 *  technique; they illustrate it and are not presented as work from a specific training. */
export const academyTopics = [
  {
    name: "Fade Control",
    lead: "Przejścia pod kontrolą.",
    description: "Fade rozłożony na kroki, z analizą błędów i dopracowaniem detali.",
    details: ["Precyzja i czystość przejść", "Od podstaw po wykończenie", "Kontrola techniki i powtarzalność"],
    media: { kind: "fade", photo: { ...images.fade, alt: "Fade widziany od tyłu: płynne przejście od skóry na karku do dłuższych włosów na górze" } },
  },
  {
    name: "Shape Control",
    lead: "Zrozum kształt. Nadaj kierunek.",
    description: "Technika i detale, które budują całość strzyżenia.",
    details: ["Świadoma praca z kształtem", "Dłuższe włosy i elementy maszynki", "Cieniowanie brody"],
    media: { kind: "shape", photo: { ...images.shape, alt: "Dłuższa, teksturowana fryzura widziana z profilu" } },
  },
] as const;

/** Formats, each with a photo that shows that format (checked against the material, 2026-10-09).
 *  The group photo is a still of academy2.mp4: no separate photo of a group class was supplied. */
export const academyFormats = [
  {
    name: "Indywidualnie",
    text: "Praca nad Twoim warsztatem. Powiedz, jakie elementy strzyżenia chcesz lepiej zrozumieć.",
    photo: { ...images.practice, alt: "Szkolenie indywidualne CUTZ ACADEMY: dwie osoby przy jednym stanowisku, strzyżenie modela" },
  },
  {
    name: "W grupie",
    text: "Wspólna praktyka, obserwacja i wymiana doświadczeń. Zapytaj o szkolenie dla Waszej ekipy.",
    photo: { ...media.groupStill, alt: "Zajęcia grupowe CUTZ ACADEMY: kilka osób obserwuje strzyżenie modela przy stanowisku" },
  },
] as const;

/** Silent clips from trainings. Every clip shows work on a model watched by several people; none is
 *  confirmed as Fade Control or Shape Control, so the titles describe only what is visible. */
export const academyVideos = media.videos.map((video, index) => ({
  ...video,
  ...[
    { title: "Praktyka przy fotelu", description: "Praca z włosami modela i wspólna obserwacja kolejnych ruchów." },
    { title: "Technika z bliska", description: "Demonstracja strzyżenia przy stanowisku, w obecności uczestników." },
    { title: "Uwaga na detal", description: "Praca nad wydzieloną sekcją włosów i wskazówki przy modelu." },
    { title: "Pokaz na żywo", description: "Strzyżenie modela przy stanowisku, uczestnicy śledzą każdy ruch." },
  ][index],
}));

/** Action shot from a training; the homepage Academy teaser uses it. */
export const academyPractice = {
  ...images.practice,
  alt: "Szkolenie barberskie CUTZ ACADEMY: praca przy strzyżeniu klienta pod okiem drugiej osoby",
};

/** Hero trust proof: every post-training photo (posed, client-supplied), each once, in one endless strip.
 *  Keep the count even: every second photo sits lower and the loop must keep that rhythm. */
export const academyPeople = [
  { ...images["12"], alt: "Cztery osoby związane z CUTZ ACADEMY przed logo BYKUCUTZZ w salonie" },
  { ...images["8"], alt: "Cztery osoby po szkoleniu CUTZ ACADEMY we wnętrzu salonu" },
  { ...images["11"], alt: "Grupa związana z CUTZ ACADEMY przed wejściem do salonu" },
  { ...images["5"], alt: "Trzy osoby po szkoleniu CUTZ ACADEMY przy błękitnym logo BYKUCUTZZ" },
  { ...images["6"], alt: "Cztery osoby pozujące do zdjęcia po szkoleniu w salonie BYKUCUTZZ" },
  { ...images["3"], alt: "Wspólne zdjęcie trzech osób po szkoleniu w BYKUCUTZZ" },
  { ...images["10"], alt: "Trzy osoby związane z CUTZ ACADEMY przy wejściu do salonu" },
  { ...images["1"], alt: "Dwie osoby po szkoleniu CUTZ ACADEMY przy ścianie z logo BYKUCUTZZ" },
  { ...images["2"], alt: "Wspólne zdjęcie trzech osób po szkoleniu przed logo BYKUCUTZZ" },
  { ...images["4"], alt: "Trzy osoby po szkoleniu CUTZ ACADEMY pod neonem BYKUCUTZZ" },
  { ...images["7"], alt: "Trzy osoby po szkoleniu CUTZ ACADEMY przed ścianą z logo salonu" },
  { ...images["9"], alt: "Trzy osoby związane z CUTZ ACADEMY pozujące przed wejściem" },
] as const;
