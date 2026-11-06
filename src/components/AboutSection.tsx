export default function AboutSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="about" className="portfolio-section page-width section-space" aria-labelledby="about-title" tabIndex={-1}>
      <div className="section-heading"><Heading id="about-title">About</Heading></div>
    </section>
  );
}
