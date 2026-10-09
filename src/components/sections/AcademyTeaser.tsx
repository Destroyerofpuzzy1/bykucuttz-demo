import Image from "next/image";
import { AcademyLogo } from "@/components/brand/AcademyLogo";
import { academyPractice } from "@/data/academy";

export function AcademyTeaser() {
  return (
    <aside className="academy-teaser container-x" aria-labelledby="academy-teaser-heading">
      <div className="academy-teaser-inner" data-reveal="rise">
        <div className="academy-teaser-photo"><Image {...academyPractice} quality={80} sizes="(min-width: 768px) 280px, 100vw" /></div>
        <div className="academy-teaser-copy">
          <div className="academy-teaser-logo"><AcademyLogo /></div>
          <h2 id="academy-teaser-heading">Strzyżemy. <br />Dzielimy się wiedzą.</h2>
          <p>Szkolenia barberskie od BYKUCUTZZ w Łodzi. Fade Control, Shape Control i praktyka, która pomaga zrozumieć technikę.</p>
          <a href="/cutz-academy" className="link-line" data-cta="academy-home">Poznaj CUTZ ACADEMY <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </aside>
  );
}
