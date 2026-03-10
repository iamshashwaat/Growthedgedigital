"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const leftCards = [
  "We don\u2019t do cookie-cutter strategies. Every plan is custom-built for your business.",
  "We don\u2019t measure success by how viral your post went. We measure success by how much your business grows.",
  "We don\u2019t measure success by how viral your post went. We measure success by how much your business grows.",
];

const rightStatements = [
  "We treat your business like our own, Your wins are our wins",
  "We\u2019re not just service providers, We\u2019re your growth partners",
];

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const kingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left column reveal (Heading, subtitle, cards)
      const leftElements = gsap.utils.toArray([
        ".why-us-heading",
        ".why-us-subtitle",
        ".why-us-card"
      ]);

      gsap.fromTo(leftElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // King piece subtle parallax/reveal
      gsap.fromTo(kingRef.current,
        { x: -50, opacity: 0, rotation: -10 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: kingRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Right column reveal (Heading, statements)
      const rightElements = gsap.utils.toArray([
        ".right-heading",
        ".right-statement"
      ]);

      gsap.fromTo(rightElements,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#111111] overflow-hidden">
      <div
        className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16 lg:py-20"
        style={{ '--padding-x': '1rem' } as React.CSSProperties}
      >
        {/* Two-column grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* ---- LEFT COLUMN ---- */}
          <div ref={leftColRef} className="flex flex-col">
            {/* WHY US ? marker heading */}
            <h2
              className="why-us-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-wider"
              style={{ fontFamily: "var(--font-marker)" }}
            >
              WHY US ?
            </h2>

            {/* Subtitle */}
            <p className="why-us-subtitle mt-4 text-base md:text-lg lg:text-xl text-white/90 italic">
              {"Why "}
              <span className="font-semibold text-white not-italic">
                @growthedge__digital
              </span>
              {" ?"}
            </p>

            {/* Three white pill cards */}
            <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5 lg:gap-6 z-10 relative">
              {leftCards.map((text, i) => (
                <div
                  key={i}
                  className="why-us-card bg-white rounded-r-full sm:rounded-full px-5 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 w-[95%] sm:max-w-md shadow-lg"
                  style={{
                    marginLeft: "-1rem", // pull it to the screen edge smoothly
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0"
                  }}
                >
                  <p className="text-sm sm:text-[0.95rem] md:text-base text-[#111111] text-left sm:text-center font-medium leading-[1.6]">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Chess king image at bottom-left */}
            {/* Enlarged as requested */}
            <div ref={kingRef} className="relative mt-8 sm:mt-12 h-64 sm:h-80 md:h-96 lg:h-[28rem] w-[18rem] sm:w-[24rem] md:w-[32rem] lg:w-[40rem] z-0" style={{ marginLeft: "calc(-1 * var(--padding-x, 2rem))" }}>
              <Image
                src="/images/chess-king.png"
                alt="White chess king piece lying on its side"
                fill
                className="object-contain object-left-bottom drop-shadow-2xl"
              />
            </div>
          </div>

          {/* ---- RIGHT COLUMN ---- */}
          <div ref={rightColRef} className="flex flex-col mt-10 lg:mt-0 lg:justify-between">
            {/* Large amber heading - fully justified/stacked */}
            <div className="lg:pt-2 mt-12 lg:mt-0">
              <h3 className="right-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold text-[#F5A623] leading-[1] tracking-tight text-center lg:text-right flex flex-col">
                <span>A DIFFERENT</span>
                <span className="lg:pr-8">KIND OF</span>
                <span>PARTNERSHIP</span>
              </h3>
            </div>

            {/* Two white horizontal statement bars */}
            <div className="mt-12 sm:mt-16 lg:mt-auto flex flex-col gap-4 sm:gap-6 z-10 relative">
              {rightStatements.map((text, i) => (
                <div
                  key={i}
                  className="right-statement bg-white rounded-l-full sm:rounded-full px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8 w-[95%] ml-auto sm:w-full shadow-lg"
                  style={{
                    marginRight: "-1rem", // pull to the right screen edge
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0"
                  }}
                >
                  <p className="text-sm sm:text-base md:text-lg text-[#111111] text-left sm:text-center leading-relaxed font-semibold">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
