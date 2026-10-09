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
        {/* HERO: logo, heading, then one row of copy | CTA | strip controls, then the photo strip of
            people after trainings (trust proof) */}
        <section id="start" className="academy-hero" aria-labelledby="academy-heading">
          <div className="container-x">
            <div className="academy-hero-brand" data-reveal="rise">
              <div className="academy-hero-logo"><AcademyLogo preload /></div>
              <p className="t-meta text-steel academy-hero-meta">Szkolenia barberskie · {academy.city}</p>
            </div>
            <h1 id="academy-heading" className="academy-h1" data-reveal="slide">
              Dobre cięcie zaczyna się <span className="academy-nowrap">od techniki.</span>
            </h1>
          </div>
          <AcademyGallery
            count={academyPeople.length}
            label="Uczestnicy po szkoleniach CUTZ ACADEMY"
            lead={
              <>
                <p className="t-body-l academy-intro" data-reveal="rise">Indywidualnie i w grupie. Z naciskiem na praktykę.</p>
                <div className="academy-hero-actions" data-reveal="rise">
                  <AcademyCta source="hero" />
                  <a href="#szkolenia" className="link-line academy-hero-more">Poznaj ofertę <span aria-hidden="true">↓</span></a>
                </div>
              </>
            }
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
                  <ProgramMedia kind={topic.media.kind} photo={topic.media.photo} />
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

        <section id="zapisy" className="academy-contact container-x section-y" aria-labelledby="academy-contact-heading">
          <div className="academy-led" data-led-line aria-hidden="true" />
          <p className="t-meta text-steel">Szkolenia barberskie w Łodzi</p>
          <h2 id="academy-contact-heading" className="academy-h2" data-reveal="slide">Zrób kolejny krok.</h2>
          <p className="t-body-l text-steel" data-reveal="fade">Napisz, jakie masz doświadczenie i co chcesz rozwinąć.<br className="hidden md:block" /> O szczegóły i dostępne terminy zapytaj w wiadomości prywatnej.</p>
          <AcademyCta source="contact" />
          <p className="t-meta text-steel academy-contact-handle">{academy.instagram.handle} · Zapisy przez Instagram</p>
          <a href="/" className="link-line academy-back">Wróć do BYKUCUTZZ <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <Footer />
      <MotionController heroParallax={false} />
    </>
  );
}
