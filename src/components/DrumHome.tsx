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
        <div className="drum-home-intro"><span className="eyebrow">RESEARCHER. BUILDER. DRUMMER.</span><h1>Welcome to my world.</h1><p>Pick a drum. Find a little more about me.</p></div>
        <nav className="home-kit" aria-label="Drum navigation">
          <svg className="home-stands" viewBox="0 0 800 440" aria-hidden="true">
            <ellipse cx="400" cy="378" rx="330" ry="34" fill="#eee7d5" />
            <g fill="none" stroke="#a69c88" strokeWidth="4">
              <path d="M125 125v215m0-37-34 52m34-52 34 52M655 115v230m0-40-38 50m38-50 38 50M370 150v100M230 240v105m0-20-30 35m30-35 30 35" />
            </g>
            <path d="M385 369h34v35h-34Z" fill="#b3aa94" stroke="#493c2c" strokeWidth="3" />
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
