"use client";

import Image from "next/image";
import { useState } from "react";
import { BarChart3, Gamepad2, Monitor, UserRound } from "lucide-react";

const interests = ["AI Safety", "NLP", "LLM", "Software Engineering"];
const skills = [
  { name: "Python", mark: "Py", type: "LANG", pp: 30, maxPp: 30, description: "AI experiments, automation, and backend development." },
  { name: "Java", mark: "Jv", type: "LANG", pp: 30, maxPp: 30, description: "Object-oriented programming and application development." },
  { name: "TypeScript", mark: "TS", type: "LANG", pp: 20, maxPp: 20, description: "Typed interfaces and maintainable web applications." },
  { name: "Swift", mark: "Sw", type: "LANG", pp: 20, maxPp: 20, description: "Native iOS development and collaboration tools." },
  { name: "PyTorch", mark: "Pt", type: "AI", pp: 20, maxPp: 20, description: "Building and evaluating machine learning models." },
  { name: "React", mark: "Re", type: "WEB", pp: 20, maxPp: 20, description: "Interactive interfaces built from reusable components." },
  { name: "Next.js", mark: "Nx", type: "WEB", pp: 15, maxPp: 15, description: "React applications with routing and server rendering." },
  { name: "Git", mark: "Gt", type: "TOOL", pp: 15, maxPp: 15, description: "Version history, branches, and collaboration." },
  { name: "NLP", mark: "NLP", type: "AI", pp: 15, maxPp: 15, description: "Version history, branches, and collaboration." },
];
const views = [
  { name: "About", icon: UserRound },
  { name: "Skills", icon: Monitor },
  { name: "Stats", icon: BarChart3 },
] as const;

export default function AboutSection() {
  const [view, setView] = useState<(typeof views)[number]["name"]>("Skills");
  const [selected, setSelected] = useState(0);
  const skill = skills[selected];

  return (
    <section className="page-width about-game-screen" id="about" aria-labelledby="about-title">
      <div className="about-game-sidebar">
        <header>
          <span className="eyebrow">01 / ABOUT</span>
          <h1 id="about-title">Curious by nature.<br />A builder at heart.</h1>
        </header>
        <div className="about-game-card">
          <div className="about-game-profile">
            <Image src="/images/character-portrait.png" alt="Pixel portrait of Kim Hajun" width={112} height={112} />
            <div><h2>Kim Hajun</h2><p>Soongsil University<br />AI Software</p></div>
          </div>
          <p className="about-game-bio">I explore the space between thoughtful AI and practical software, with a particular interest in making intelligent systems safer and more useful.</p>
        </div>
        <div className="about-game-card">
          <h2 className="about-game-strip"><BarChart3 size={19} aria-hidden="true" /> Curiosity stats</h2>
          <ul className="about-game-stats">
            {interests.map((name) => (
              <li key={name}>
                <span>{name}</span>
                <span className="about-game-meter" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} data-filled={index < 5} />)}</span>
                <small>Exploring</small>
              </li>
            ))}
          </ul>
          <p className="about-game-note">Interest categories, not proficiency scores.</p>
        </div>
      </div>
      <div className="about-game-console">
        <div className="about-game-tabs" role="group" aria-label="Profile views">
          {views.map(({ name, icon: Icon }) => <button key={name} type="button" aria-pressed={view === name} onClick={() => setView(name)}><Icon size={17} aria-hidden="true" />{name}</button>)}
        </div>
        <div className="about-game-panel">
          <h2 className="about-game-strip"><Gamepad2 size={19} aria-hidden="true" /> {view === "Skills" ? "Skill move list" : view === "About" ? "Trainer profile" : "Research interests"}</h2>
          <div className="about-game-panelGrid">
            <div className="about-game-artwork">
              <Image src="/images/pixel-workspace.png" alt="Pixel art of Hajun at his workspace" fill sizes="(max-width: 580px) 85vw, 260px" />
            </div>
            {view === "Skills" ? (
              <ul className="about-game-moves" aria-label="Skill moves" tabIndex={0}>
                {skills.map((item, index) => (
                  <li key={item.name}>
                    <button type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>
                      <span className="about-game-token" aria-hidden="true">{item.mark}</span>
                      <strong>{item.name}</strong>
                      <span className="about-game-badge" data-type={item.type}>{item.type}</span>
                      <span className="about-game-pp">
                        <span>PP {item.pp} / {item.maxPp}</span>
                        <progress aria-hidden="true" value={item.pp} max={item.maxPp} />
                      </span>
                    </button>
                    {index === selected && <p className="about-game-inline-detail" aria-live="polite">{item.description}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="about-game-panelCopy">
                <h3>{view === "About" ? "Kim Hajun" : "Currently exploring"}</h3>
                {view === "About" ? <p>AI Software at Soongsil University. Building software and exploring how to make AI safer and more useful.</p> : <ul>{interests.map((name) => <li key={name}>{name}</li>)}</ul>}
              </div>
            )}
          </div>
          <div className="about-game-detail" data-view={view} aria-live="polite">
            <strong>{view === "Skills" ? skill.name : view === "About" ? "Profile" : "Curiosity"}</strong>
            <p>{view === "Skills" ? skill.description : view === "About" ? "Researcher. Builder. Drummer." : "Each bar represents an area of interest."}</p>
          </div>
        </div>
      </div>
      <p className="about-game-prompt"><span aria-hidden="true">▸</span> {view === "Skills" ? "Select a skill to see its details." : "Open Skills to explore the move list."}</p>
    </section>
  );
}
