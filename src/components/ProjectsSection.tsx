import Image from "next/image";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const featured = projects.find((project) => project.featured)!;
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="page-width section-space">
        <div className="section-heading projects-heading"><div><span className="eyebrow">03 / SELECTED WORK</span><h1 id="projects-title">Ideas, made tangible.</h1></div><p>Tools, experiments, and a little trial and error.</p></div>
        <article className="featured-project">
          <div className="featured-artwork"><Image src={`/images/projects/${featured.image}`} alt="Pixel artwork of a phone for TeamPool" fill sizes="(max-width: 760px) calc(100vw - 48px), 510px" /></div>
          <div className="featured-copy"><span className="eyebrow">FEATURED PROJECT</span><h3>{featured.title}</h3><span className="project-category">{featured.category}</span><p>{featured.description}</p><a className="text-link" href={featured.href} target="_blank" rel="noopener noreferrer">Explore on GitHub <Image src="/images/projects/arrow-up-right.svg" width={18} height={18} alt="" /><span className="sr-only"> (opens in a new tab)</span></a></div>
        </article>
        <div className="project-collection">{projects.filter((item) => !item.featured).map((item) => <article className="project-item" key={item.title}><Image className="project-thumbnail" src={`/images/projects/${item.image}`} alt={`${item.title} pixel artwork`} width={64} height={64} sizes="64px" /><div className="project-summary"><h3><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}<Image src="/images/projects/arrow-up-right.svg" width={18} height={18} alt="" /><span className="sr-only"> (opens in a new tab)</span></a></h3><p>{item.description}</p><span className="project-technology">{item.tags.join(" · ")}</span></div></article>)}</div>
      </div>
    </section>
  );
}
