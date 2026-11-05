import { sections } from "@/data/sections";

export default function RemainingSections() {
  return (
      <div className="sections">
        {sections.map((section) => (
          <section className="content-section" id={section.id} key={section.id}>
            <span className="section-eyebrow">{section.eyebrow}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {section.id === "contact" && <a className="github-link" href="https://github.com/raon-dex" target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
          </section>
        ))}
      </div>
  );
}
