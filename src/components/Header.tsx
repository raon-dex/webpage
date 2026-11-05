import { Terminal } from "lucide-react";
import { navigation } from "@/data/navigation";

export default function Header() {
  return (
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HAJUN'S WORLD home">
          <span className="brand-emblem" aria-hidden="true"><Terminal size={22} strokeWidth={2} /></span>
          <span>HAJUN&apos;S WORLD</span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          {navigation.map(({ label, href, icon: Icon }) => (
            <a href={href} key={label}><Icon size={16} strokeWidth={1.8} aria-hidden="true" />{label}</a>
          ))}
        </nav>
      </header>
  );
}
