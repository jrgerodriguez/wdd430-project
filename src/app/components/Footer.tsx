import Link from "next/link";
import { SocialMediaIcons } from "./footer/SocialMediaIcons";

export default function Footer() {
  return (
    <footer className="relative px-6 py-7 flex flex-col items-center lg:flex-row lg:justify-between lg:items-center gap-7">
      <nav className="flex">
        <ul className="flex gap-6 font-sans text-[0.94rem] text-white/50">
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <SocialMediaIcons />
    </footer>
  );
}