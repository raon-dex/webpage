import Image from "next/image";
import { ArrowRight, Mail, Sparkles, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section id="top" className="hero">
        <div className="introduction">
          <div className="hello"><span className="pixel-marker" />HELLO, WORLD!</div>
          <h1>I&apos;m Hajun Kim.</h1>
          <h2>AI Researcher &amp; Software Engineer</h2>
          <p className="tagline">Exploring AI, building things, breaking limits.</p>
          <div className="hero-actions">
            <a className="pixel-button primary" href="#projects">View Projects <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="pixel-button secondary" href="#contact">Contact Me <Mail size={18} aria-hidden="true" /></a>
          </div>
          <p className="personal-note"><Sparkles size={16} aria-hidden="true" /> A little world of research, code &amp; curiosity.</p>
        </div>

        <div className="workspace-window">
          <div className="window-title"><span>hajun&apos;s room / a place to make things</span><span className="window-controls" aria-hidden="true"><i /><i /></span></div>
          <div className="workspace-image">
            <Image src="/images/pixel-workspace.png" alt="Pixel art illustration of Hajun's creative workspace" fill priority sizes="(max-width: 900px) 100vw, 628px" style={{ objectFit: "cover" }} />
          </div>
          <div className="window-status"><span>HOME BASE</span><span>small steps, new worlds</span></div>
        </div>
      </section>
<div className="world-directory">
        <span>A PERSONAL WORLD, IN PROGRESS</span>
        <div><span>THINK CAREFULLY</span><span>BUILD WITH PURPOSE</span><span>STAY CURIOUS</span></div>
        <a href="#about" aria-label="Scroll to about"><ArrowDown size={18} aria-hidden="true" /></a>
      </div>
    </>
  );
}
