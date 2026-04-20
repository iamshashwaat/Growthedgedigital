"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// True liquid glass box-shadow borrowed from the Apple/CodePen style
const GLASS_NAV_SHADOW = [
  "inset 0 0 0 1px rgba(255,255,255,0.07)",
  "inset 1.8px 3px 0px -2px rgba(255,255,255,0.18)",
  "inset -2px -2px 0px -2px rgba(255,255,255,0.12)",
  "inset -3px -8px 1px -6px rgba(255,255,255,0.10)",
  "inset -0.3px -1px 4px 0px rgba(0,0,0,0.18)",
  "inset 0px 3px 4px -2px rgba(0,0,0,0.22)",
  "0px 1px 5px 0px rgba(0,0,0,0.18)",
  "0px 10px 36px 0px rgba(0,0,0,0.32)",
].join(",");

const GLASS_PILL_SHADOW = [
  "inset 0 0 0 1px rgba(255,255,255,0.10)",
  "inset 2px 1px 0px -1px rgba(255,255,255,0.22)",
  "inset -1.5px -1px 0px -1px rgba(255,255,255,0.12)",
  "inset -2px -6px 1px -5px rgba(255,255,255,0.08)",
  "inset -1px 2px 3px -1px rgba(0,0,0,0.22)",
  "inset 0px -4px 1px -2px rgba(0,0,0,0.12)",
  "0px 3px 6px 0px rgba(0,0,0,0.14)",
].join(",");

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(headerRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
      tl.fromTo(".nav-logo", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, "-=0.35");
      tl.fromTo(".nav-link", { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power2.out" }, "-=0.2");
      tl.fromTo(".nav-cta", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, "-=0.2");
    }, headerRef);
    return () => ctx.revert();
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      ref={headerRef}
      style={{
        transition: "top 0.45s cubic-bezier(0.4,0,0.2,1), width 0.5s cubic-bezier(0.4,0,0.2,1), max-width 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled
        ? "top-3 w-[92%] sm:w-[98%] max-w-[1100px]"
        : "top-4 sm:top-6 w-[92%] sm:w-[85%] max-w-[900px]"
        }`}
    >
      <nav
        className="relative flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full"
        style={{
          background: "rgba(12,12,14,0.72)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          boxShadow: GLASS_NAV_SHADOW,
        }}
      >
        {/* Logo */}
        <Link href="/" className="nav-logo shrink-0 pl-2" aria-label="GrowthEdge Digital Home">
          <Image
            src="/images/logo.png"
            alt="GrowthEdge Digital"
            width={130}
            height={40}
            className="h-8 w-auto object-contain transition-all hover:scale-105"
            style={{ filter: "invert(1) hue-rotate(180deg) brightness(1.1)" }}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <li
                key={link.label}
                className="relative nav-link"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-glass-pill"
                    className="absolute inset-0 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      boxShadow: GLASS_PILL_SHADOW,
                    }}
                  />
                )}
                <Link
                  href={link.href}
                  className={`relative z-10 px-3 lg:px-4 py-2 block text-[14px] lg:text-[15px] font-medium whitespace-nowrap transition-colors duration-150 ${isActive ? "text-white" : "text-white/70 hover:text-white/90"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <Link
          href="/book-a-call"
          className="nav-cta hidden md:inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-2.5 text-[15px] font-semibold text-black hover:bg-white transition-colors"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          Book a Call
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white mr-1"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-3xl px-6 pb-6 overflow-hidden"
            style={{
              background: "rgba(12,12,14,0.85)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              boxShadow: GLASS_NAV_SHADOW,
            }}
          >
            <ul className="flex flex-col gap-1 pt-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all rounded-xl px-4 py-3 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/book-a-call"
              className="mt-4 flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-black hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
