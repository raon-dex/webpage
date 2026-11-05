import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { navigation } from "@/data/navigation";
import { SoundToggle } from "@/components/DrumSoundProvider";

export default function Header() {
  return (
    <header className="site-header page-width inner-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Link className="back-home" href="/"><ArrowLeft size={16} aria-hidden="true" /><span>Back to the drums</span></Link>
      <nav className="navigation" aria-label="Main navigation">
        {navigation.map(({ label, href }) => <Link href={href} key={label}>{label}</Link>)}
      </nav>
      <SoundToggle />
    </header>
  );
}
