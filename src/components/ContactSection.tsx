export default function ContactSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="contact" className="portfolio-section page-width section-space" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="section-heading"><Heading id="contact-title">Contact</Heading></div>
    </section>
  );
}
