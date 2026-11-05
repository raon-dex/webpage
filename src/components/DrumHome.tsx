"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import DrumArtwork from "@/components/DrumArtwork";
import { SoundToggle, useDrumSound } from "@/components/DrumSoundProvider";
import type { DrumSound } from "@/lib/drum-audio";

const menu: { name: string; instrument: string; sound: DrumSound; href: string; position: string }[] = [
  { name: "About", instrument: "Hi-hat", sound: "hihat", href: "/about", position: "hihat" },
  { name: "Projects", instrument: "Tom", sound: "tom", href: "/projects", position: "tom" },
  { name: "Publications", instrument: "Crash", sound: "crash", href: "/publications", position: "crash" },
  { name: "Research", instrument: "Snare", sound: "snare", href: "/research", position: "snare" },
  { name: "Contact", instrument: "Kick", sound: "kick", href: "/contact", position: "kick" },
];

export default function DrumHome() {
  const { play, unavailable } = useDrumSound();
  return (
    <div className="drum-home">
      <header className="drum-home-header page-width">
        <Link href="/" className="brand" aria-label="HAJUN'S WORLD home"><Terminal size={22} aria-hidden="true" /><span>HAJUN&apos;S WORLD</span></Link>
        <SoundToggle />
      </header>
      <main id="main-content" className="drum-home-main page-width">
        <div className="drum-home-intro"><span className="eyebrow">RESEARCHER. BUILDER. DRUMMER.</span><h1>Hajun Kim</h1><p>Pick a drum. Find a little more about me.</p></div>
        <nav className="home-kit" aria-label="Drum navigation">
          <svg className="home-stands" viewBox="0 0 800 460" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="400" cy="406" rx="320" ry="30" fill="#eee7d5" />
          </svg>
          {menu.map((item) => (
            <Link key={item.name} href={item.href} className={`home-drum home-drum-${item.position}`} aria-label={`${item.name} — ${item.instrument}`} onClick={(event) => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) play(item.sound); }}>
              <DrumArtwork sound={item.sound} /><span className="home-drum-label">{item.name}</span>
            </Link>
          ))}
        </nav>
        <p className="home-sound-note" role="status">{unavailable ? "Sound is unavailable. You can still explore every page." : "A small sound with every hello. Nothing plays until you tap."}</p>
      </main>
      <footer className="drum-home-footer page-width">
        <span>Kim Hajun · One pixel at a time.</span>
        <nav aria-label="Text navigation">{menu.map((item) => <Link href={item.href} key={item.name}>{item.name}</Link>)}</nav>
      </footer>
    </div>
  );
}
