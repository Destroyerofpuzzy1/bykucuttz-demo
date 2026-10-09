import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/data/site";
import { salons } from "@/data/salons";
import "@/styles/globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BYKUCUTZZ Barbershop Łódź | Jakość ponad ilość",
  description:
    "Barbershop BYKUCUTZZ w Łodzi. 5,0 na Booksy z ponad 5000 opinii. Strzyżenie, broda, combo. Umów wizytę online.",
  openGraph: {
    title: "BYKUCUTZZ Barbershop Łódź",
    description: "Jakość ponad ilość. Umów wizytę na Booksy.",
    locale: "pl_PL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060708",
  colorScheme: "dark",
};

// Runs before first paint: decides motion + loader without a flash.
const bootScript = `(function(){var d=document.documentElement;var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!rm)d.classList.add('js-motion');
var s=false,l=false;try{s=sessionStorage.getItem('bk-loader')==='1';l=localStorage.getItem('bk-loader')==='1'}catch(e){}
if(rm||s)d.classList.add('no-loader');else if(l)d.setAttribute('data-loader','short');
setTimeout(function(){if(!window.__bkMotion){d.classList.remove('js-motion');d.classList.add('no-loader')}},4000);})();`;

function jsonLd() {
  return salons
    .filter((s) => s.published)
    .map((s) => ({
      "@context": "https://schema.org",
      "@type": "BarberShop",
      name: site.name,
      slogan: site.tagline,
      address: {
        "@type": "PostalAddress",
        streetAddress: s.street.status === "verified" ? s.street.value : undefined,
        postalCode: "91-002",
        addressLocality: "Łódź",
        addressCountry: "PL",
      },
      geo: { "@type": "GeoCoordinates", latitude: 51.782902, longitude: 19.447082 },
      // Booksy hours, including the short breaks
      openingHoursSpecification: [
        ["10:00", "14:30"],
        ["15:00", "20:00"],
      ]
        .map(([opens, closes]) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens,
          closes,
        }))
        .concat(
          [
            ["09:00", "12:40"],
            ["13:00", "17:00"],
          ].map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens, closes }))
        ),
      url: site.bookingUrl,
      sameAs: [site.socials.instagram.url, ...(site.socials.facebook ? [site.socials.facebook.url] : [])],
    }));
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
