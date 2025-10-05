'use client'

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
      window.location.href= "/";
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <>
      <header className="w-full px-6 py-5 flex items-center justify-between relative bg-transparent">
        <div className="text-xl font-bold z-10">
          <Link href="/home">
            <span className="text-3xl">H</span>ancrafted<span className="text-3xl">H</span>aven
          </Link>
        </div>

        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex gap-10">
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/my-products">My Products</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="font-bold z-10 hidden lg:flex">
          <Link href="">
            <span className="cursor-pointer" onClick={handleLogout}>Log Out</span>
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-1 z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </header>

      <div
        className={`lg:hidden w-full overflow-hidden transition-[max-height] duration-500 ease-in-out 
        ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="shadow-md border-t border-gray-300">
          <ul className="flex flex-col items-start gap-4 text-white pl-6 py-4">
            <li><Link href="/marketplace" onClick={() => setIsOpen(false)}>Marketplace</Link></li>
            <li><Link href="/seller/products" onClick={() => setIsOpen(false)}>My Products</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><span onClick={handleLogout}>Log Out</span></li>
          </ul>
        </nav>
      </div>
    </>
  )
}