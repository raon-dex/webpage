import DrumHome from "@/components/DrumHome";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="drum-home drum-home-design">
      <DrumHome>
        <AboutSection heading="h2" />
        <SkillsSection heading="h2" />
        <WorksSection heading="h2" />
        <ContactSection heading="h2" />
      </DrumHome>
      <Footer homeHref="#top" />
    </div>
  );
}
