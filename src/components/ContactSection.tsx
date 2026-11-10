"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useDrumSound } from "@/components/DrumSoundProvider";
import type { GuitarEffect } from "@/lib/guitar-audio";

const stringPositions = [98, 104, 110, 116, 122, 128];

const pedals: { label: string; effect: GuitarEffect; href?: string }[] = [
  { label: "GitHub", effect: "drive", href: "https://github.com/raon-dex" },
  { label: "ORCID", effect: "echo", href: "https://orcid.org/0009-0003-2093-9824" },
  { label: "Blog", effect: "tremolo" },
  { label: "LinkedIn", effect: "fuzz" },
];

export default function ContactSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  const [effect, setEffect] = useState<GuitarEffect | null>(null);
  const lastString = useRef<number | null>(null);
  const hasStrummed = useRef(false);
  const guitar = useRef<SVGSVGElement>(null);
  const { muted, unavailable, playChord } = useDrumSound();

  function vibrate(from: number, to: number) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = guitar.current?.querySelectorAll(".contact-guitar-string");
    const first = Math.min(from, to);
    const last = Math.max(from, to);
    for (let index = first; lines && index <= last; index += 1) {
      const line = lines[index];
      line.getAnimations().forEach((animation) => animation.cancel());
      line.animate([
        { transform: "translateY(-2px)" },
        { transform: "translateY(2px)" },
        { transform: "translateY(-1px)" },
        { transform: "translateY(1px)" },
        { transform: "translateY(0)" },
      ], { duration: 220 });
    }
  }

  function strum(event: PointerEvent<HTMLButtonElement>) {
    if (event.type === "pointerdown") hasStrummed.current = !muted;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY >= bounds.bottom) {
      lastString.current = null;
      return;
    }
    const next = Math.floor((event.clientY - bounds.top) / bounds.height * stringPositions.length);
    const previous = lastString.current;
    lastString.current = next;
    if (event.type === "pointerdown" || previous === null) {
      if (hasStrummed.current) playChord(effect);
      vibrate(next, next);
      return;
    }
    if (next !== previous) vibrate(previous + Math.sign(next - previous), next);
  }

  return (
    <section id="contact" className="portfolio-section page-width section-space" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="section-heading"><Heading id="contact-title">Contact</Heading></div>
      <p className="contact-rig-hint">
        {unavailable ? "Instrument audio is unavailable." : muted ? "Turn sound on to play." : "줄을 클릭하면 소리가 납니다. 다양한 이펙터와 함께 소리를 경험하고 프로필 링크를 확인해보세요."}
      </p>
      <div className="contact-rig">
        <div className="contact-guitar">
          <svg ref={guitar} viewBox="8 40 624 190" role="img" aria-label="Pixel art of an electric guitar" shapeRendering="crispEdges">
            <path d="M43 209h190l23-12h326v11H271l-28 14H43Z" fill="#c6d5be" />
            <g stroke="#45342b" strokeWidth="4">
              <path d="M186 92h358v42H186Z" fill="#6e5141" />
              <path d="M205 96h339v34H205Z" fill="#6f5140" stroke="none" />
              <path d="M535 89h19V77h41v7h22v15h9v27h-16v8h-75Z" fill="#d6ad7c" />
              <path d="M33 103h12V84h18V65h26V49h35v7h18v17h20v13h25V73h17V59h36v13h-11v19h-12v44h13v14h11v23h-13v18h-24v10h-31v-7h-25v-11h-24v10H96v8H66v-10H47v-15H32v-22H23v-32h10Z" fill="#a75347" />
              <path d="M34 119h13v-17h15V84h20V68h31v-7h16m-89 94v18h14v12h20m91-5h17v10h26" fill="none" stroke="#d98568" />
              <path d="M129 88h25v10h34v34h15v21h-23v11h-39v-8h-30v-17h-12v-30h14Z" fill="#f3e4c7" />
              <path d="M121 102h13v42h-13Zm26 0h13v42h-13Zm26 0h13v42h-13Z" fill="#e5cdaa" strokeWidth="3" />
              <path d="M79 101h15v44H79Z" fill="#b7b1a0" />
              <path d="M203 159h12v12h-12Zm-24 13h10v10h-10Z" fill="#edd6a8" strokeWidth="3" />
              <path d="M215 94v38m58-38v38m51-38v38m46-38v38m41-38v38m37-38v38m33-38v38m29-38v38m25-38v38" stroke="#d3b393" strokeWidth="2" />
              {stringPositions.map((y) => (
                <path key={y} className="contact-guitar-string" d={`M88 ${y}h514`} stroke="#f6e5be" strokeOpacity=".82" strokeWidth="1" />
              ))}
              <path d="M548 85h8v9h-8Zm13 0h8v9h-8Zm13 0h8v9h-8Zm13 0h8v9h-8Zm13 7h8v9h-8Zm10 10h8v9h-8Z" fill="#e9dec6" strokeWidth="2" />
            </g>
          </svg>
          <button className="contact-strings" type="button" aria-label="Strum E major chord"
            onPointerDown={strum} onPointerMove={strum}
            onPointerLeave={() => { lastString.current = null; }}
            onPointerCancel={() => { lastString.current = null; }}
            onClick={(event) => {
              if (event.detail !== 0) return;
              hasStrummed.current = !muted;
              playChord(effect);
              vibrate(0, stringPositions.length - 1);
            }} />
        </div>
        <div className="contact-gear">
          <div className="contact-amp">
            <div className="contact-amp-controls"><span>AMP</span><span>{effect ?? "clean"}</span></div>
            <div className="contact-amp-grille" aria-hidden="true" />
          </div>
          <div className="contact-pedals" role="group" aria-label="Guitar effects and profile links">
            {pedals.map(({ label, effect: pedalEffect, href }) => (
              <div className="contact-pedal" key={pedalEffect} data-effect={pedalEffect}>
                <div className="contact-pedal-knobs" aria-hidden="true"><i /><i /><i /></div>
                <span className="contact-pedal-mode">{pedalEffect}</span>
                {href ? <a href={href}>{label} ↗</a> : <span>{label}</span>}
                <button type="button" aria-pressed={effect === pedalEffect}
                  aria-label={`${label} ${pedalEffect} pedal`}
                  onClick={() => setEffect(effect === pedalEffect ? null : pedalEffect)}>
                  <span className="contact-pedal-led" aria-hidden="true" />
                  <span className="contact-pedal-switch" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
