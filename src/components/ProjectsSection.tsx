import Image from "next/image";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-inner">
        <div className="projects-heading">
          <span>03 / THINGS I&apos;VE BUILT</span>
          <h2 id="projects-title">Project Inventory</h2>
          <p>A collection of tools, experiments, and ideas turned into software.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className={`project-card${project.featured ? " project-featured" : ""}`} key={project.title}>
              {project.featured && (
                <div className="project-spotlight">
                  <span>ITEM SPOTLIGHT</span>
                  <Image src="/images/projects/sparkles.svg" width={16} height={16} alt="" />
                </div>
              )}
              <div className="project-content">
                <div className="project-artwork-row">
                  <div className="project-artwork">
                    <Image src={`/images/projects/${project.image}`} alt={`${project.title} pixel artwork`} fill sizes={project.featured ? "(max-width: 600px) calc(100vw - 100px), 340px" : "88px"} />
                  </div>
                  {!project.featured && <span className="project-category">{project.category}</span>}
                </div>
                <h3>
                  <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — GitHub (opens in a new tab)`}>
                    <span>{project.title}</span>
                    <Image src="/images/projects/arrow-up-right.svg" width={18} height={18} alt="" />
                  </a>
                </h3>
                {project.featured && <span className="project-subtitle">{project.category}</span>}
                <p>{project.description}</p>
                <ul className="project-tags" aria-label="Project technologies">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="projects-note"><Image src="/images/projects/code.svg" width={16} height={16} alt="" />Different problems. One habit: making ideas tangible.</p>
      </div>
    </section>
  );
}
