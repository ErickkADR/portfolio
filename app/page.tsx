import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import RobotSection from "@/components/RobotSection";
import Projects from "@/components/Projects";
import Languages from "@/components/Languages";
import Career from "@/components/Career";
import Stack from "@/components/Stack";
import MobileDock from "@/components/MobileDock";
import Contact from "@/components/Contact";

export default function Home() {
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
        <Languages />
        <Career />
        <Stack />
      </main>
      <Contact />
    </>
  );
}
