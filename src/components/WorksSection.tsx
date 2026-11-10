"use client";

import Image from "next/image";
import { useState } from "react";
import { useDrumSound } from "@/components/DrumSoundProvider";
import { projects } from "@/data/projects";

export default function WorksSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  const [selected, setSelected] = useState(() => projects.find((project) => project.featured) ?? projects[0]);
  const { playPad } = useDrumSound();

  return (
    <section id="works" className="portfolio-section page-width section-space" aria-labelledby="works-title" tabIndex={-1}>
      <div className="section-heading launchpad-heading">
        <Heading id="works-title">Works</Heading>
        <p>런치패드를 클릭하셔서 저의 Project와 Research를 확인해보세요!</p>
      </div>
      <div className="project-launchpad" role="group" aria-label="Works launchpad">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            className="project-pad"
            aria-pressed={selected === project}
            aria-controls="launchpad-project"
            onClick={() => {
              setSelected(project);
              playPad(index);
            }}
          >
            <Image src={`/images/projects/${project.image}`} alt="" width={32} height={32} />
            <span>{project.title}</span>
          </button>
        ))}
        {Array.from({ length: Math.max(0, 8 - projects.length) }, (_, index) => (
          <span key={index} className="project-pad project-pad-empty" aria-hidden="true" />
        ))}
      </div>
      <article id="launchpad-project" className="launchpad-project" aria-live="polite">
        <div className="launchpad-image">
          <Image
            src={`/images/projects/${selected.image}`}
            alt={`${selected.title} project artwork`}
            fill
            sizes="(max-width: 640px) 90vw, 320px"
          />
        </div>
        <div className="launchpad-copy">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <ul aria-label="Project tags">
            {selected.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          {selected.href !== "https://github.com/" && <a className="text-link" href={selected.href}>View project ↗</a>}
        </div>
      </article>
    </section>
  );
}
