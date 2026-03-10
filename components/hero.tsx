"use client";

import Image from "next/image";
import { EyeIcon } from "./eye-icon";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function InteractiveText({ text, className = "", hoverColor = "hover:text-[#F5A623]" }: { text: string, className?: string, hoverColor?: string }) {
  return (
    <span className={`flex gap-[0.05em] ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`hover-char inline-block transition-transform duration-200 hover:scale-125 ${hoverColor} cursor-default`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate background watermark
    tl.fromTo(".hero-watermark",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
      0
    );

    // Animate text elements sliding in from the right
    tl.fromTo(
      ".hero-text-anim",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.2 },
      0.2
    );

    // Animate pencil sliding in from the left
    tl.fromTo(
      ".pencil-anim",
      { x: -250, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2 },
      0.2
    );

    // Animate subtitle and tags
    tl.fromTo(".hero-subtitle, .expertise-tag",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "-=0.6"
    );

    // Infinite blink every 2 seconds: close/open quickly, then wait
    const blinkTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      delay: 1.5
    });
    blinkTl.to(".eye-anim", { scaleY: 0, transformOrigin: "center", duration: 0.1, ease: "power2.inOut" })
      .to(".eye-anim", { scaleY: 1, transformOrigin: "center", duration: 0.1, ease: "power2.inOut" });

    // Animate scroll indicator
    tl.fromTo(".scroll-indicator",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "+=0.5"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-background flex flex-col justify-center px-4 pt-28 pb-12 md:px-10 md:py-16 lg:px-16 lg:py-24">
      {/* Background Watermark */}
      <div className="hero-watermark absolute bottom-[-10%] left-[-5%] w-full pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="text-stroke text-[25vw] font-black leading-none opacity-0">
          GROWTH
        </h2>
      </div>

      {/* Floating Expertise Tags */}
      <div className="absolute top-[20%] right-[10%] z-20 hidden md:block">
        <div className="expertise-tag animate-float opacity-0 bg-[#F5A623]/5 border border-[#F5A623]/20 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">SEO Specialist</span>
        </div>
      </div>
      <div className="absolute bottom-[30%] left-[5%] z-20 hidden md:block" style={{ animationDelay: '-2s' }}>
        <div className="expertise-tag animate-float opacity-0 bg-blue-500/5 border border-blue-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Automation Hub</span>
        </div>
      </div>
      <div className="absolute top-[40%] left-[15%] z-20 hidden md:block" style={{ animationDelay: '-4s' }}>
        <div className="expertise-tag animate-float opacity-0 bg-purple-500/5 border border-purple-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-500">Fast Web Dev</span>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* Line 1: YOUR VISION + Eye Icon */}
        <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-0">
          <h1 className="hero-text hero-text-anim text-foreground whitespace-nowrap opacity-0 leading-tight flex items-center gap-[0.3em]">
            <InteractiveText text="YOUR" />
            <InteractiveText text="VISION" className="text-[#F5A623]" hoverColor="hover:text-foreground" />
          </h1>
          <EyeIcon className="eye-anim w-[clamp(2rem,10vw,8rem)] h-auto shrink-0 -mt-[0.2em]" />
        </div>

        {/* Line 2: OUR CRAFT - centered/right aligned */}
        <div className="flex justify-start sm:justify-center md:pl-[15%] mb-2 md:mb-0">
          <div className="hero-text hero-text-anim text-foreground opacity-0 leading-tight flex gap-[0.3em]">
            <InteractiveText text="OUR" />
            <InteractiveText text="CRAFT" />
          </div>
        </div>

        {/* Line 3: REAL with pencil overlaying */}
        <div className="relative mt-2 md:mt-0 mb-4 md:mb-6">
          {/* Pencil image - spans across the section diagonally */}
          <div className="pencil-anim absolute left-[-5%] sm:left-[-20%] md:left-[-15%] top-[45%] md:top-1/2 -translate-y-1/2 w-[65%] sm:w-[100%] md:w-[85%] z-10 pointer-events-none opacity-0 drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]">
            <Image
              src="/images/pencil.png"
              alt=""
              width={1600}
              height={300}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <div className="flex justify-end pr-4 sm:pr-0">
            <div className="hero-text hero-text-anim text-foreground opacity-0 leading-tight">
              <InteractiveText text="REAL" />
            </div>
          </div>
        </div>

        {/* Line 4: GROWTH */}
        <div className="relative z-0 mb-12">
          <div className="hero-text hero-text-anim text-foreground opacity-0 leading-tight">
            <InteractiveText text="GROWTH" />
          </div>
        </div>

        {/* Subtitle / High Impact text */}
        <div className="hero-subtitle opacity-0 max-w-xl md:ml-[10%]">
          <p className="text-lg md:text-2xl font-bold text-foreground/70 leading-relaxed mb-8">
            High-performance marketing & automation systems built for
            <span className="text-foreground"> bold, modern brands.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="h-0.5 w-12 bg-[#F5A623] self-center" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">Dominate your market</span>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">Scroll</span>
        <div className="animate-bounce-subtle">
          <ChevronDown className="w-5 h-5 text-foreground/20" />
        </div>
      </div>
    </section>
  );
}
