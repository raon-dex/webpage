import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer({ homeHref = "/" }: { homeHref?: string } = {}) {
  return (
    <footer className="site-footer page-width">
      <Link href={homeHref} className="footer-brand">HAJUN&apos;S WORLD</Link>
      <p>Kim Hajun · One pixel at a time.</p>
      <Link className="back-to-top" href={homeHref}>Back to the drums <ArrowUp size={15} aria-hidden="true" /></Link>
    </footer>
  );
}
