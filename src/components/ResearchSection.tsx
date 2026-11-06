export default function ResearchSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="research" className="portfolio-section page-width section-space" aria-labelledby="research-title" tabIndex={-1}>
      <div className="section-heading"><Heading id="research-title">Research</Heading></div>
    </section>
  );
}
