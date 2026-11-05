import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RemainingSections, { Footer } from "@/components/RemainingSections";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <ProjectsSection />
        <RemainingSections />
      </main>
      <Footer />
    </>
  );
}
