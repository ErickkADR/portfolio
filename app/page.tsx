import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import RobotSection from "@/components/RobotSection";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Certificates from "@/components/Certificates";
import Stack from "@/components/Stack";
import MobileDock from "@/components/MobileDock";
import Contact from "@/components/Contact";
import { certificateImages } from "@/lib/certificados";

export default function Home() {
  /* Lido do disco no build (Server Component): quais certificados já têm
     imagem em public/certificados/. Ver lib/certificados.ts. */
  const certImages = certificateImages();

  return (
    <>
      <Nav />
      <MobileDock />
      <main>
        <HeroVideo />
        <Manifesto />
        <Marquee />
        <RobotSection />
        <Projects />
        <Career />
        <Certificates images={certImages} />
        <Stack />
      </main>
      <Contact />
    </>
  );
}
