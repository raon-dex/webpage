import { Terminal } from "lucide-react";
import { navigation } from "@/data/navigation";

export default function Header() {
  return (
    <header className="site-header page-width">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <a className="brand" href="#top" aria-label="HAJUN'S WORLD home">
        <Terminal size={22} strokeWidth={1.8} aria-hidden="true" />
        <span>HAJUN&apos;S WORLD</span>
      </a>
      <nav className="navigation" aria-label="Main navigation">
        {navigation.map(({ label, href }) => <a href={href} key={label}>{label}</a>)}
      </nav>
    </header>
  );
}
