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
import {
  academy,
  academyFormats,
  academyInquiryNote,
  academyPeople,
  academyTopics,
  academyVideos,
} from "@/data/academy";
import { primaryAddress } from "@/data/salons";
import "./academy.css";

const title = "CUTZ ACADEMY | Szkolenia barberskie w Łodzi | BYKUCUTZZ";
const description = "CUTZ ACADEMY od BYKUCUTZZ: szkolenia barberskie w Łodzi, indywidualnie i w grupie. Fade Control, Shape Control i świadoma praca w praktyce. Zapytaj o szkolenie.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, locale: "pl_PL", type: "website" },
};

/**
 * CUTZ ACADEMY: the light, editorial division of the brand (BYKUCUTZZ is black and neon).
 * Paper/white surfaces, black type and mark, Academy blue only as a detail; one black band for the
 * training clips. Visitor flow: understand -> see the training -> see it in practice -> choose a
 * format -> ask on Instagram; the BYKUCUTZZ relationship comes after the inquiry.
 * All styles are scoped under `.academy-theme` (academy.css).
 */
export default function CutzAcademy() {
  return (
    <div className="academy-theme">
      <Header variant="page" address={primaryAddress()} />
      <main id="main" className="academy">
        {/* HERO: the Academy mark first, then the statement, offer and inquiry; then the participant strip */}
        <section id="start" className="academy-hero" aria-labelledby="academy-heading">
          <div className="container-x">
            <div className="academy-hero-top" data-reveal="academy-hero">
              <div className="academy-hero-logo">
                <AcademyLogo />
              </div>
              <p className="academy-hero-meta">
                <span>Szkolenia barberskie</span>
                <span>{academy.city}</span>
              </p>
            </div>
            <div className="academy-hero-main">
              <h1 id="academy-heading" className="academy-h1" data-reveal="academy-hero">
                Technika buduje przewagę.
              </h1>
              <div className="academy-hero-copy" data-reveal="academy-hero">
                <p className="academy-intro">
                  Szkolenia barberskie w Łodzi. Indywidualnie i w grupie, od podstaw do poziomu zaawansowanego. Uczysz się
                  techniki i ćwiczysz przy modelu.
                </p>
                <div className="academy-hero-actions">
                  <AcademyCta source="hero" />
                  <a href="#szkolenia" className="academy-textlink">
                    Poznaj ofertę <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <AcademyGallery count={academyPeople.length} label="Uczestnicy po szkoleniach CUTZ ACADEMY">
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

        {/* PROGRAMMES: editorial rows (rule, name, lead, details), photo and copy alternate sides */}
        <section id="szkolenia" className="academy-section academy-section--white" aria-labelledby="academy-practice-heading">
          <div className="container-x">
            <header className="academy-head">
              <h2 id="academy-practice-heading" className="academy-h2" data-reveal="lines">
                Szkolenia w praktyce.
              </h2>
              <p className="academy-lead">Od podstaw do poziomu zaawansowanego. Praktyka, analiza błędów i wymiana doświadczeń. W Łodzi.</p>
            </header>

            <div className="academy-programs">
              {academyTopics.map((topic) => (
                <article className={`academy-program academy-program--${topic.media.kind}`} key={topic.name}>
                  <div className="academy-program-media-wrap" data-reveal="clip">
                    <ProgramMedia photo={topic.media.photo} />
                  </div>
                  <div className="academy-program-copy">
                    <h3>{topic.name}</h3>
                    <p className="academy-program-lead">{topic.lead}</p>
                    <p className="academy-program-text">{topic.description}</p>
                    <ul className="academy-program-details">
                      {topic.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRACTICE: the page's one black band; real clips, one featured and three supporting */}
        <section id="praktyka" className="academy-section academy-section--ink" aria-labelledby="academy-reel-heading">
          <div className="container-x">
            <header className="academy-head academy-head--row">
              <h2 id="academy-reel-heading" className="academy-h2" data-reveal="lines">
                Z zajęć.
              </h2>
              <p className="academy-reel-note">Filmy bez dźwięku. Kliknij film, aby go zatrzymać lub wznowić.</p>
            </header>
            <AcademyVideos videos={academyVideos} />
          </div>
        </section>

        {/* FORMATS: two clear options, no pricing-card look */}
        <section id="formaty" className="academy-section" aria-labelledby="academy-formats-heading">
          <div className="container-x">
            <header className="academy-head">
              <h2 id="academy-formats-heading" className="academy-h2" data-reveal="lines">
                Wybierz format.
              </h2>
            </header>
            <div className="academy-formats">
              {academyFormats.map((format) => (
                <article className="academy-format" key={format.name}>
                  <h3>{format.name}</h3>
                  <p className="academy-format-text">{format.text}</p>
                  <figure className="academy-format-photo" data-reveal="clip">
                    <Image {...format.photo} quality={80} sizes="(min-width: 768px) 46vw, 100vw" />
                  </figure>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INQUIRY: the closing conversion; the navbar's "Zapisy" lands here */}
        <section id="zapisy" className="academy-section academy-section--white academy-closing" aria-labelledby="academy-closing-heading">
          <div className="container-x academy-closing-grid">
            <h2 id="academy-closing-heading" className="academy-closing-title" data-reveal="lines">
              Zapytaj o szkolenie.
            </h2>
            <div className="academy-closing-copy">
              <p className="academy-closing-note">{academyInquiryNote}</p>
              <p className="academy-closing-handle">
                Instagram{" "}
                <a href={academy.instagram.url} target="_blank" rel="noopener noreferrer">
                  {academy.instagram.handle}
                  <span className="sr-only"> (otwiera się w nowej karcie)</span>
                </a>
              </p>
              <AcademyCta source="closing" large />
            </div>
          </div>
        </section>

        {/* BRAND: the relationship with BYKUCUTZZ, after the inquiry */}
        <section id="prowadzacy" className="academy-section academy-section--mist academy-brand" aria-labelledby="academy-brand-heading">
          <div className="container-x academy-brand-grid">
            <h2 id="academy-brand-heading" className="academy-h3" data-reveal="lines">
              Ta sama marka. <br />
              Przestrzeń <span className="academy-nowrap">do nauki.</span>
            </h2>
            <div className="academy-brand-copy">
              <p>
                CUTZ ACADEMY to szkolenia barberskie prowadzone przez BYKUCUTZZ. Dzielimy się wiedzą przy fotelu: pokazujemy
                technikę, analizujemy pracę i dopracowujemy szczegóły.
              </p>
              <p className="academy-muted">Osobę prowadzącą i zakres konkretnego szkolenia potwierdzisz bezpośrednio z Academy przy zapisie.</p>
              <a href="/#ekipa" className="academy-textlink">
                Poznaj BYKUCUTZZ <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="academy" />
      <MotionController heroParallax={false} />
    </div>
  );
}
