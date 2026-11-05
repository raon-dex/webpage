import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="top" className="hero page-width" aria-labelledby="hero-title">
      <div className="introduction">
        <span className="eyebrow hello"><span className="pixel-marker" aria-hidden="true" />HELLO, WORLD!</span>
        <h1 id="hero-title">I&apos;m Hajun Kim.</h1>
        <p className="hero-role">AI Researcher &amp;<br />Software Engineer</p>
        <p className="tagline">A little world of thoughtful AI,<br className="desktop-break" /> useful software, and curiosity.</p>
        <div className="hero-actions">
          <a className="pixel-button" href="#projects">Explore my work <ArrowRight size={17} aria-hidden="true" /></a>
          <a className="text-link" href="#contact">Let&apos;s connect <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <figure className="workspace-window">
        <figcaption className="window-title"><span>hajun&apos;s room</span><span className="window-controls" aria-hidden="true"><i /><i /></span></figcaption>
        <div className="workspace-image">
          <Image src="/images/pixel-workspace.png" alt="Pixel art of Hajun working at a desk with books, a plant, and a warm lamp" fill priority sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1200px) 50vw, 560px" />
        </div>
      </figure>
    </section>
  );
}
