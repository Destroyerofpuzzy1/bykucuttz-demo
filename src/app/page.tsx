import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { MotionController } from "@/components/motion/MotionController";
import { Hero } from "@/components/sections/Hero";
import { Manifest } from "@/components/sections/Manifest";
import { Salons } from "@/components/sections/Salons";
import { Pricing } from "@/components/sections/Pricing";
import { Space } from "@/components/sections/Space";
import { Team } from "@/components/sections/Team";
import { Work } from "@/components/sections/Work";
import { SocialProof } from "@/components/sections/SocialProof";
import { Reviews } from "@/components/sections/Reviews";
import { Crew } from "@/components/sections/Crew";
import { Finale } from "@/components/sections/Finale";
import { Contact } from "@/components/sections/Contact";
import { primaryAddress, bookingOptions } from "@/data/salons";

export default function Home() {
  return (
    <>
      <Loader />
      <Header address={primaryAddress()} />
      <main id="main">
        <Hero />
        <Manifest />
        <Salons />
        <Pricing />
        <Space />
        <Team />
        <Work />
        <SocialProof />
        <Reviews />
        <Crew />
        <Finale />
        <Contact />
      </main>
      <Footer />
      <MobileBookingBar options={bookingOptions()} />
      <MotionController />
    </>
  );
}
