"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const footerLinks = [
  { label: "Our Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1PD2edK3An/", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/growthedgedigi", label: "X (Twitter)" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/growthedgedigital1", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/growthedgedigital.in/", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" }, // Placeholder for later
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade up the main footer columns staggered
      gsap.fromTo(".footer-col",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Fade in the bottom bar
      gsap.fromTo(".footer-bottom",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#111111] pt-20">
      {/* Decorative Stacking Layer for Depth - positioned to accent the transition */}
      <div className="absolute top-[20px] left-[5%] right-[5%] h-24 bg-[#fde9c7] rounded-t-[3rem] md:rounded-t-[4rem] -z-10 opacity-30 blur-[4px]" />

      {/* Main footer area */}
      <div className="relative bg-[#FFF8E7] pt-16 sm:pt-24 md:pt-28 pb-10 sm:pb-12 px-6 sm:px-8 md:px-10 lg:px-20 rounded-t-[3rem] sm:rounded-t-[4rem] md:rounded-t-[6rem] shadow-[0_-30px_70px_-20px_rgba(0,0,0,0.08)] border-t border-white/60 overflow-hidden">

        {/* Organic Mesh Gradient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F5A623]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F5A623]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-blue-400/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Upper Footer: Logo + Links + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 md:gap-12 mb-10 sm:mb-12 lg:mb-16">
            {/* Column 1: Brand */}
            <div className="footer-col flex flex-col gap-6 sm:gap-8 lg:col-span-1">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="GrowthEdge Digital"
                  width={220}
                  height={75}
                  className="w-40 sm:w-48 md:w-56 h-auto object-contain relative z-10"
                />
                <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed max-w-[320px] font-medium">
                Empowering brands with <span className="text-foreground">cutting-edge digital strategies</span> and high-performance creative execution.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-1 sm:mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center text-foreground/40 hover:text-[#F5A623] hover:border-[#F5A623]/30 hover:-translate-y-1 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="footer-col lg:pl-12">
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-[#F5A623] mb-6 sm:mb-8 lg:mb-10">Navigation</h4>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-6">
                  {footerLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-foreground/70 hover:text-[#F5A623] transition-all hover:translate-x-1.5 flex items-center gap-2 group"
                      >
                        <span className="h-[1px] w-0 bg-[#F5A623] group-hover:w-4 transition-all duration-300" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Contact */}
            <div className="footer-col">
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-[#F5A623] mb-6 sm:mb-8 lg:mb-10">Get In Touch</h4>
              <div className="flex flex-col gap-6 sm:gap-8">
                <a
                  href="tel:+919532073896"
                  className="group flex items-center gap-4 sm:gap-5 text-foreground/80 hover:text-[#F5A623] transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] flex items-center justify-center border border-black/5 group-hover:bg-[#F5A623] group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                    <Phone className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-foreground/30">Quick Call</span>
                    <span className="text-base sm:text-lg font-bold">+91 95320 73896</span>
                  </div>
                </a>
                <a
                  href="mailto:Growthedgedigital.co@gmail.com"
                  className="group flex items-center gap-4 sm:gap-5 text-foreground/80 hover:text-[#F5A623] transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] flex items-center justify-center border border-black/5 group-hover:bg-[#F5A623] group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                    <Mail className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-foreground/30">Send Email</span>
                    <span className="text-base sm:text-lg font-bold break-all">Growthedgedigital.co@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 4: CTA Card */}
            <div className="footer-col lg:col-span-1">
              <div className="p-7 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-foreground text-background shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#F5A623]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#F5A623]/30 transition-colors duration-700" />
                <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 leading-tight relative z-10">Scale your brand.</h4>
                <p className="text-background/50 text-sm sm:text-base mb-6 sm:mb-8 relative z-10 font-medium">Get a custom strategy audit from our senior team.</p>
                <Link
                  href="/book-a-call"
                  className="w-full py-4.5 bg-[#F5A623] text-black font-black rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative z-10 shadow-lg shadow-[#F5A623]/20 flex items-center justify-center"
                >
                  Request Audit
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright and Mini Text */}
      <div className="footer-bottom bg-foreground py-8 px-6 md:px-10 lg:px-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-background/40">© 2025 GrowthEdge Digital. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-sm font-medium text-background/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-medium text-background/40 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
