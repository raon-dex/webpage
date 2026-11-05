import { ArrowUpRight, ArrowUp } from "lucide-react";
import Link from "next/link";

export function PublicationsSection() {
  return (
      <section className="publications-section page-width section-space" id="publications" aria-labelledby="publications-title">
        <div className="section-heading"><span className="eyebrow">04 / FIELD NOTES</span><h1 id="publications-title">Publications &amp;<br />milestones.</h1></div>
        <div className="publications-copy"><p>A place for academic work, research experience, and the things learned along the way.</p><span className="archive-note"><span className="pixel-marker" aria-hidden="true" />The journal is still being written. Details coming soon.</span></div>
      </section>
  );
}

export function ContactSection() {
  return (
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="page-width contact-inner">
          <div className="section-heading"><span className="eyebrow">05 / SAY HELLO</span><h1 id="contact-title">Good things start<br />with a conversation.</h1><p>Research, software, or a shared curiosity.<br />Let&apos;s find something worth exploring.</p></div>
          <div className="contact-links">
            <a href="https://github.com/raon-dex" target="_blank" rel="noopener noreferrer"><span><strong>GitHub</strong><small>Code &amp; experiments</small></span><ArrowUpRight size={22} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            <a href="https://orcid.org/0009-0003-2093-9824" target="_blank" rel="noopener noreferrer"><span><strong>ORCID</strong><small>Research identity</small></span><ArrowUpRight size={22} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer page-width">
      <Link href="/" className="footer-brand">HAJUN&apos;S WORLD</Link>
      <p>Kim Hajun · One pixel at a time.</p>
      <Link className="back-to-top" href="/">Back to the drums <ArrowUp size={15} aria-hidden="true" /></Link>
    </footer>
  );
}
