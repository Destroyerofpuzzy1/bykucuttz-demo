import type { Metadata } from "next";
import Image from "next/image";
import { AcademyLogo } from "@/components/brand/AcademyLogo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionController } from "@/components/motion/MotionController";
import { AcademyCta } from "@/components/academy/AcademyCta";
import { AcademyGallery } from "@/components/academy/AcademyGallery";
import { AcademyVideos } from "@/components/academy/AcademyVideos";
import { ProgramMedia } from "@/components/academy/ProgramMedia";
import { academy, academyFormats, academyPeople, academyTopics, academyVideos } from "@/data/academy";
import { primaryAddress } from "@/data/salons";
import "./academy.css";

const title = "CUTZ ACADEMY | Szkolenia barberskie w Łodzi | BYKUCUTZZ";
const description = "CUTZ ACADEMY od BYKUCUTZZ: szkolenia barberskie w Łodzi, indywidualnie i w grupie. Fade Control, Shape Control i świadoma praca w praktyce. Zapytaj o szkolenie.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, locale: "pl_PL", type: "website" },
};

export default function CutzAcademy() {
  return (
    <>
      <Header variant="page" address={primaryAddress()} />
      <main id="main" className="academy">
        {/* HERO: heading, logo, practical offer and inquiry, then the participant strip. */}
        <section id="start" className="academy-hero" aria-labelledby="academy-heading">
          <div className="container-x">
            <h1 id="academy-heading" className="academy-h1" data-reveal="academy-hero">
              Technika buduje przewagę.
            </h1>
            <div className="academy-hero-brand" data-reveal="academy-hero">
              <div className="academy-hero-logo"><AcademyLogo preload /></div>
              <p className="t-meta text-steel academy-hero-meta">Szkolenia barberskie · {academy.city}</p>
            </div>
            <div className="academy-hero-copy">
              <p className="academy-intro" data-reveal="academy-hero">Szkolenia barberskie w Łodzi. Indywidualnie i w grupie, od podstaw do poziomu zaawansowanego. Uczysz się techniki i ćwiczysz przy modelu.</p>
              <div id="zapisy" className="academy-hero-actions">
                <AcademyCta source="hero" />
                <a href="#szkolenia" className="link-line">Poznaj ofertę <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
          <AcademyGallery
            count={academyPeople.length}
            label="Uczestnicy po szkoleniach CUTZ ACADEMY"
          >
            {academyPeople.map((photo, index) => (
              <li className="academy-gallery-slide" key={photo.src}>
                <figure className="academy-gallery-photo">
                  <div className="academy-gallery-frame">
                    <Image
                      {...photo}
                      quality={80}
                      preload={index === 0}
                      loading={index < 5 ? "eager" : undefined}
                      sizes="(min-width: 1440px) 300px, (min-width: 1024px) 270px, 210px"
                    />
                  </div>
                  <figcaption aria-hidden="true">{String(index + 1).padStart(2, "0")}</figcaption>
                </figure>
              </li>
            ))}
          </AcademyGallery>
        </section>

        {/* TRAININGS IN PRACTICE: programmes, clips from the classes, formats with photos of that format */}
        <section id="szkolenia" className="academy-practice section-y" aria-labelledby="academy-practice-heading">
          <div className="container-x">
            <span className="academy-section-led" data-led-line aria-hidden="true" />
            <div className="academy-section-heading">
              <h2 id="academy-practice-heading" className="academy-h2" data-reveal="slide">Szkolenia <br />w praktyce.</h2>
              <p className="t-body-l text-steel" data-reveal="fade">Od podstaw do poziomu zaawansowanego. Praktyka, analiza błędów i wymiana doświadczeń. W Łodzi.</p>
            </div>

            <div className="academy-programs">
              {academyTopics.map((topic, index) => (
                <article className={`academy-program academy-program--${topic.media.kind}`} data-reveal="rise" key={topic.name}>
                  <div className="academy-program-copy">
                    <p className="t-meta text-cyan">0{index + 1} / Program</p>
                    <h3>{topic.name}</h3>
                    <p className="academy-program-lead">{topic.lead}</p>
                    <p className="text-steel">{topic.description}</p>
                    <ul>
                      {topic.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <ProgramMedia photo={topic.media.photo} />
                </article>
              ))}
            </div>

            <div id="praktyka" className="academy-reel">
              <p className="academy-reel-label t-meta" data-reveal="fade">
                <span className="text-cyan">Z zajęć CUTZ ACADEMY</span> · Filmy bez dźwięku · Kliknij film, aby go zatrzymać lub wznowić
              </p>
              <AcademyVideos videos={academyVideos} />
            </div>

            <div className="academy-formats">
              {academyFormats.map((format, index) => (
                <article className="academy-format" key={format.name}>
                  <figure className="academy-format-photo" data-reveal="clip">
                    <Image {...format.photo} quality={80} sizes="(min-width: 768px) 46vw, 100vw" />
                  </figure>
                  <div className="academy-format-copy" data-reveal="rise">
                    <p className="t-meta text-cyan">0{index + 1} / Format</p>
                    <h3 className="t-title">{format.name}</h3>
                    <p className="text-steel">{format.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="academy-confirmation t-meta text-steel">
              Do potwierdzenia przy zapisie: program, termin, czas trwania, cena, liczba uczestników, dokładne miejsce szkolenia i informacja o certyfikatach.
            </p>
          </div>
        </section>

        <section id="prowadzacy" className="academy-brand section-y" aria-labelledby="academy-brand-heading">
          <div className="container-x academy-brand-grid">
            <div>
              <span className="academy-section-led" data-led-line aria-hidden="true" />
              <p className="t-meta text-cyan">CUTZ ACADEMY × BYKUCUTZZ</p>
              <h2 id="academy-brand-heading" className="academy-h2" data-reveal="slide">Ta sama marka. <br />Przestrzeń <span className="academy-nowrap">do nauki.</span></h2>
            </div>
            <div className="academy-brand-copy">
              <p className="t-body-l" data-reveal="fade">CUTZ ACADEMY to szkolenia barberskie prowadzone przez BYKUCUTZZ. Dzielimy się wiedzą przy fotelu: pokazujemy technikę, analizujemy pracę i dopracowujemy szczegóły.</p>
              <p className="text-steel">Osobę prowadzącą i zakres konkretnego szkolenia potwierdzisz bezpośrednio z Academy przy zapisie.</p>
              <a href="/#ekipa" className="link-line">Poznaj BYKUCUTZZ <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <MotionController heroParallax={false} />
    </>
  );
}
