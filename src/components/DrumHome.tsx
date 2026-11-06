"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Terminal } from "lucide-react";
import DrumArtwork from "@/components/DrumArtwork";
import { SoundToggle, useDrumSound } from "@/components/DrumSoundProvider";
import type { DrumSound } from "@/lib/drum-audio";

const homeTitle = "Hajun Kim";

const menu: { name: string; instrument: string; sound: DrumSound; section?: string; position: string }[] = [
  { name: "About", instrument: "Hi-hat", sound: "hihat", section: "about", position: "hihat" },
  { name: "Skills", instrument: "Snare", sound: "snare", section: "skills", position: "snare" },
  { name: "Works", instrument: "Crash", sound: "crash", section: "works", position: "crash" },
  { name: "Contact", instrument: "Kick", sound: "kick", section: "contact", position: "kick" },
  { name: "High Tom", instrument: "High tom", sound: "tom", position: "tom" },
  { name: "Mid Tom", instrument: "Mid tom", sound: "midTom", position: "mid-tom" },
  { name: "Low Tom", instrument: "Floor tom", sound: "lowTom", position: "low-tom" },
  { name: "Ride", instrument: "Ride cymbal", sound: "ride", position: "ride" },
];

export default function DrumHome({ children }: { children: ReactNode }) {
  const { play } = useDrumSound();
  const [struck, setStruck] = useState<DrumSound | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pedalHits, setPedalHits] = useState(0);
  const [typedLength, setTypedLength] = useState<number | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;

    function type(length: number) {
      setTypedLength(length);
      timer = setTimeout(
        () => type(length === homeTitle.length ? 0 : length + 1),
        length === homeTitle.length ? 2200 : 140,
      );
    }

    function syncMotion() {
      clearTimeout(timer);
      if (motion.matches) setTypedLength(null);
      else type(0);
    }

    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => {
      clearTimeout(timer);
      motion.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => () => {
    if (navigationTimer.current !== null) clearTimeout(navigationTimer.current);
  }, []);
  return (
    <>
      <header className="drum-home-bar">
        <div className="drum-home-header page-width">
          <a href="#top" className="brand" aria-label="HAJUN'S WORLD home"><Terminal size={22} aria-hidden="true" /><span>HAJUN&apos;S WORLD</span></a>
          <nav className="drum-home-menu" aria-label="Portfolio sections">
            {menu.map(({ name, section }) => section && <a href={`#${section}`} key={section}>{name}</a>)}
          </nav>
          <SoundToggle />
        </div>
      </header>
      <main id="main-content">
        <div className="drum-home-main page-width">
          <div className="drum-home-intro">
            <span className="eyebrow">AI Researcher | Software Engineer</span>
            <h1 aria-label={homeTitle}>
              <span aria-hidden="true" className={typedLength === null ? undefined : "home-title-placeholder"}>
                {homeTitle}
              </span>
              {typedLength !== null && (
                <span className="home-title-typing" aria-hidden="true">
                  {homeTitle.slice(0, typedLength)}<span className="home-title-cursor">_</span>
                </span>
              )}
            </h1>
            <p>드럼을 연주하시면 저에 대한 더 많은 정보를 확인하실 수 있습니다. 마음껏 연주해보세요!</p>
          </div>
          <nav className="home-kit" aria-label="Drum navigation">
            <svg className="home-stands" viewBox="0 0 800 460" preserveAspectRatio="none" aria-hidden="true">
              <ellipse cx="400" cy="406" rx="340" ry="29" fill="var(--design-stage)" />
            </svg>
            {menu.map((item) => {
              const DrumControl = item.section ? "a" : "button";
              return (
                <DrumControl
                  key={item.name}
                  href={item.section ? `#${item.section}` : undefined}
                  type={item.section ? undefined : "button"}
                  className={`home-drum home-drum-${item.position}`}
                  aria-label={`${item.name} — ${item.instrument}`}
                  data-struck={struck === item.sound}
                  onClick={(event) => {
                    if (item.section && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
                    event.preventDefault();
                    if (navigationTimer.current !== null) clearTimeout(navigationTimer.current);
                    play(item.sound);
                    setStruck(item.sound);
                    navigationTimer.current = setTimeout(() => {
                      navigationTimer.current = null;
                      setStruck(null);
                      if (item.section) {
                        const section = document.getElementById(item.section);
                        const hash = `#${item.section}`;
                        if (window.location.hash !== hash) window.location.hash = hash;
                        else section?.scrollIntoView();
                        section?.focus({ preventScroll: true });
                      }
                    }, 140);
                  }}
                >
                  <DrumArtwork sound={item.sound} /><span className="home-drum-label">{item.name}</span>
                </DrumControl>
              );
            })}
            <button
              type="button"
              className="home-kick-pedal"
              aria-label="Play kick pedal"
              title="Play kick pedal"
              onClick={() => {
                play("kick");
                setPedalHits((hits) => hits + 1);
              }}
            >
              <svg key={pedalHits} data-hit={pedalHits > 0} viewBox="0 0 100 110" aria-hidden="true" shapeRendering="crispEdges">
                <g stroke="#423c33" strokeWidth="2.5" strokeLinejoin="miter">
                  <path d="M27 68h46l11 32-5 6H21l-5-6Z" fill="#64665e" />
                  <path d="M27 68h46l11 32H16Z" fill="#92958a" />
                  <path d="M26 73V41l4-5h9v37Zm35 0V36h9l4 5v32Z" fill="#a4a79b" />
                  <path d="M30 70V42m36 28V42" stroke="#e7e5d8" strokeWidth="3" />
                  <g className="home-pedal-beater">
                    <path d="M50 42V19" strokeWidth="7" />
                    <path d="M50 42V19" stroke="#d5d8cc" strokeWidth="3" />
                    <path d="M42 7h16l5 5v12l-5 4H42l-5-4V12Z" fill="#41443b" />
                    <path d="M42 7h16l5 5H37Z" fill="#f4e5bf" />
                  </g>
                  <path d="M29 40h42v8H29Z" fill="#c4c7ba" />
                  <path d="M44 38h12v12H44Z" fill="#777b72" />
                  <path d="M50 51v15" strokeDasharray="2 2" strokeWidth="4" />
                  <path d="M70 50v17m-3-14h6m-6 4h6m-6 4h6m-6 4h6" fill="none" stroke="#62655e" strokeWidth="1.5" />
                  <g className="home-pedal-board">
                    <path d="M42 59h16l5 6 10 31-4 5H31l-4-5 10-31Z" fill="#777b72" />
                    <path d="M42 59h16l5 6 10 30H27l10-30Z" fill="#d4d6ca" />
                    <path d="M42 63h16M39 69h22M37 75h26M35 81h30M33 87h34" stroke="#969a90" strokeWidth="1.5" />
                    <path d="M45 64h10l4 27H41Z" fill="#edece0" stroke="none" />
                  </g>
                  <path d="M27 96h46v7H27Z" fill="#a7a99c" />
                </g>
              </svg>
            </button>
          </nav>
        </div>
        <div className="drum-home-sections">{children}</div>
      </main>
    </>
  );
}
