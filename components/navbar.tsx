"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "OUR SERVICES", href: "/services" },
  { label: "PRICING", href: "/pricing" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="GrowthEdge Digital Home">
          <Image
            src="/images/logo.png"
            alt="GrowthEdge Digital"
            width={140}
            height={56}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-semibold text-foreground tracking-wide hover:text-[#F5A623] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book a Call Button */}
        <Link
          href="#contact"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-[#F5A623] px-6 py-2.5 text-sm font-bold text-background hover:bg-[#e09510] transition-colors"
        >
          Book a Call
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-foreground tracking-wide hover:text-[#F5A623] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#F5A623] px-6 py-2.5 text-sm font-bold text-background hover:bg-[#e09510] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
