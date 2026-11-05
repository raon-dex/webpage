"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, X, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { playDrum, type DrumSound } from "@/lib/drum-audio";

const instruments: { sound: DrumSound; label: string; project: number }[] = [
  { sound: "crash", label: "Crash", project: 1 },
  { sound: "tom", label: "Tom", project: 2 },
  { sound: "ride", label: "Ride", project: 4 },
  { sound: "snare", label: "Snare", project: 3 },
  { sound: "kick", label: "Kick", project: 0 },
];

function DrumArtwork({ sound }: { sound: DrumSound }) {
  const cymbal = sound === "crash" || sound === "ride";
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" className="drum-art" shapeRendering="crispEdges">
      {cymbal ? (
        <g stroke="#493c2c" strokeWidth="3" strokeLinejoin="miter">
          <path d="M12 53h15V43h37V33h72v10h37v10h15v17h-15v9H27v-9H12Z" fill="#d7b770" />
          <path d="M28 61h144M52 48h96" stroke="#f4df9c" strokeWidth="5" />
          <path d="M80 53V42h12v-9h16v9h12v11Z" fill="#b18c4e" />
          <path d="M100 23v17" strokeWidth="5" />
          <path d="M31 75h138" stroke="#9d7944" />
        </g>
      ) : sound === "kick" ? (
        <g stroke="#493c2c" strokeWidth="3">
          <path d="M40 17h120v12h17v20h11v64h-11v20h-17v10H40v-10H23v-20H12V49h11V29h17Z" fill="#9b6753" />
          <path d="M48 24h104v12h17v20h9v50h-9v18h-17v10H48v-10H31v-18h-9V56h9V36h17Z" fill="#fcf8ec" />
          <path d="M82 61h12V49h12v12h12v12h12v12h-12V73h-12V61H94v12H82v12H70V73h12Z" fill="#8daa83" stroke="none" />
          <rect x="120" y="100" width="16" height="16" fill="#493c2c" stroke="none" />
          <path d="M35 129l-9 18m139-18 9 18" strokeWidth="7" />
        </g>
      ) : (
        <g stroke="#493c2c" strokeWidth="3">
          <path d="M25 38h150v65h-10v12H35v-12H25Z" fill={sound === "tom" ? "#a7785e" : "#8daa83"} />
          <path d="M25 48h150M35 99h130" stroke="#d8c9aa" strokeWidth="7" />
          <path d="M25 28h20V18h110v10h20v25h-20v9H45v-9H25Z" fill="#ede6d4" />
          <path d="M46 30h108M55 42h90" stroke="#d0c5ad" strokeWidth="3" />
          <path d="M43 68v24m40-24v30m36-30v30m38-30v24" stroke="#493c2c" strokeWidth="5" />
          <path d="M49 68v22m40-22v27m36-27v27m38-27v22" stroke="#e0cfae" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}

export default function ProjectsSection() {
  const [muted, setMuted] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [hit, setHit] = useState<DrumSound | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const project = selected === null ? null : projects[selected];

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    void audio.current?.close().catch(() => {});
  }, []);

  useEffect(() => {
    if (selected !== null && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [selected]);

  function openProject(index: number, sound?: DrumSound) {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (sound) {
      setHit(sound);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setHit(null), 250);
      if (!muted) {
        try {
          audio.current ??= new AudioContext();
          void playDrum(audio.current, sound).catch(() => setAudioUnavailable(true));
        } catch { setAudioUnavailable(true); }
      }
    }
    setSelected(index);
  }

  function closeProject() {
    dialog.current?.close();
    setSelected(null);
    returnFocus.current?.focus({ preventScroll: true });
  }

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="page-width section-space">
        <div className="section-heading projects-heading">
          <div><span className="eyebrow">03 / PROJECT STUDIO</span><h2 id="projects-title">A different kind of setlist.</h2></div>
          <p>A little rhythm. A few things I&apos;ve built.<br />Pick a drum to explore a project.</p>
        </div>
        <div className="drum-studio">
          <div className="studio-toolbar">
            <span className="studio-label"><span className="pixel-marker" aria-hidden="true" />HAJUN&apos;S SESSION</span>
            <button className="sound-toggle" type="button" aria-pressed={muted} onClick={() => { setMuted(!muted); if (!muted) void audio.current?.suspend().catch(() => {}); }}>
              {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
          <div className="drum-kit" role="group" aria-label="Interactive drum kit: choose a project">
            <svg className="drum-stands" viewBox="0 0 800 440" aria-hidden="true">
              <ellipse cx="400" cy="383" rx="320" ry="37" fill="#e4dfcd" />
              <g fill="none" stroke="#968e7b" strokeWidth="5" strokeLinejoin="miter">
                <path d="M145 95v260m0-60-42 70m42-70 43 70M650 105v245m0-55-42 65m42-65 42 65M370 155v100M229 245v115m0-20-27 36m27-36 28 36M560 250v90m0-10-24 35m24-35 24 35" />
              </g>
              <path d="M382 373h36v34h-36Z" fill="#b3aa94" stroke="#493c2c" strokeWidth="3" />
            </svg>
            {instruments.map((instrument) => (
              <button key={instrument.sound} type="button" className={`drum-pad drum-${instrument.sound}${hit === instrument.sound ? " is-hit" : ""}`}
                aria-label={`${instrument.label}: open ${projects[instrument.project].title}`}
                aria-haspopup="dialog" onClick={() => openProject(instrument.project, instrument.sound)}>
                <DrumArtwork sound={instrument.sound} />
              </button>
            ))}
          </div>
          <p className="studio-hint" role="status">{audioUnavailable ? "Sound is unavailable in this browser. All projects are still available." : "Tap a drum. Meet a project. Sound plays only when you do."}</p>
        </div>
        <details className="project-setlist">
          <summary>Prefer a list? View all 5 projects <span aria-hidden="true">+</span></summary>
          <div className="setlist-items">
            {projects.map((item, index) => <button type="button" key={item.title} onClick={() => openProject(index)} aria-haspopup="dialog"><span className="item-number">0{index + 1}</span><span>{item.title}</span><ArrowUpRight size={16} aria-hidden="true" /></button>)}
          </div>
        </details>
        <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title"
          onCancel={(event) => { event.preventDefault(); closeProject(); }}
          onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject(); } }}>
          {project && <>
            <div className="project-dialog-header"><span className="eyebrow">FROM THE SETLIST</span><button type="button" onClick={closeProject} aria-label="Close project"><X size={20} /></button></div>
            <div className="project-dialog-body">
              <Image src={`/images/projects/${project.image}`} width={112} height={112} alt={`${project.title} pixel artwork`} />
              <span className="project-category">{project.category}</span>
              <h3 id="project-dialog-title">{project.title}</h3>
              <p>{project.description}</p>
              <span className="project-technology">{project.tags.join(" · ")}</span>
              <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">Explore on GitHub <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </>}
        </dialog>
      </div>
    </section>
  );
}
