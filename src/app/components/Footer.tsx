import Link from "next/link";
import { SocialMediaIcons } from "./footer/SocialMediaIcons";

export default function Footer() {
  return (
    <footer className="relative px-6 py-7 flex flex-col items-center lg:flex-row lg:justify-between lg:items-center gap-7">
      <nav className="flex">
        <ul className="flex gap-6">
          {/* CHANGE THE COLOR OF TEXT TO HAVE MORE CONTRAST */}
          <li><Link href="/marketplace" className="text-white/80">Marketplace</Link></li>
          <li><Link href="/about" className="text-white/80">About</Link></li>
          <li><Link href="/contact" className="text-white/80">Contact</Link></li>
        </ul>
      </nav>

      <SocialMediaIcons />
    </footer>
  );
}