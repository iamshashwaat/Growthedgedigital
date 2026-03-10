"use client";

import { useRef } from "react";
import { LightbulbIcon } from "./lightbulb-icon";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "1",
    title: "Understanding your Business",
    items: [
      "What you sell",
      "Who your target audience is",
      "Your competitors",
      "Your current marketing efforts",
      "Your revenue goals",
    ],
  },
  {
    number: "2",
    title: "Research and Planning",
    items: [
      "Research your industry & competitors",
      "Identify your ideal customer profile",
      "Define clear goals (leads, sales, brand awareness)",
      "Decide the right platforms (Instagram, X, LinkedIn)",
      "Create a monthly strategy & content plan",
    ],
  },
  {
    number: "3",
    title: "Content & Campaign Creation",
    items: [
      "Design creatives (posts, ads, reels, graphics)",
      "Write captions & ad copies",
      "Build landing pages if needed",
      "Set up ad campaigns with proper targeting",
      "Install tracking tools",
    ],
  },
  {
    number: "4",
    title: "Launch, Monitor & Optimize",
    items: [
      "Monitor daily performance",
      "Track leads, clicks, conversions",
      "Test different creatives & audiences",
      "Improve ads based on real data",
    ],
  },
  {
    number: "5",
    title: "Reporting & Growth Review",
    items: [
      "Clear performance reports",
      "Insights on what worked & what didn't",
      "Recommendations for next steps",
      "Growth plan for the upcoming month",
    ],
  },
  {
    number: "6",
    title: "Communication & transparency",
    items: [
      "Regular Updates",
      "Quick Responses",
      "Full transparency on performance and spending",
    ],
  },
];

export function HowWeWork() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",   // Start drawing when the section hits the center
        end: "bottom center",  // Finish drawing when section ends hit center
        scrub: 0.5,            // Smoothly tie rect height to scroll progress
      },
    });

    // 1. Mask animation (0 to 100 duration)
    tl.fromTo(
      ".scroll-draw-mask-rect",
      { height: "0%" },
      { height: "100%", ease: "none", duration: 100 },
      0
    );

    // 2. Continuous moving arrow
    // Segment 1
    tl.fromTo(".moving-arrow", { left: "35%", top: "8%" }, { left: "65%", top: "25%", ease: "none", duration: 17 }, 8);
    // Segment 2
    tl.fromTo(".moving-arrow", { left: "65%", top: "25%" }, { left: "35%", top: "42%", ease: "none", duration: 17 }, 25);
    // Segment 3
    tl.fromTo(".moving-arrow", { left: "35%", top: "42%" }, { left: "65%", top: "59%", ease: "none", duration: 17 }, 42);
    // Segment 4
    tl.fromTo(".moving-arrow", { left: "65%", top: "59%" }, { left: "35%", top: "76%", ease: "none", duration: 17 }, 59);
    // Segment 5
    tl.fromTo(".moving-arrow", { left: "35%", top: "76%" }, { left: "65%", top: "93%", ease: "none", duration: 17 }, 76);

    // Fade in/out
    tl.fromTo(".moving-arrow", { opacity: 0 }, { opacity: 1, duration: 1 }, 7);
    tl.to(".moving-arrow", { opacity: 0, duration: 2 }, 93);

    // Set Rotations continuously at breakpoints
    tl.set(".moving-arrow", { rotation: "var(--angle1)" }, 8);
    tl.set(".moving-arrow", { rotation: "var(--angle2)" }, 25);
    tl.set(".moving-arrow", { rotation: "var(--angle1)" }, 42);
    tl.set(".moving-arrow", { rotation: "var(--angle2)" }, 59);
    tl.set(".moving-arrow", { rotation: "var(--angle1)" }, 76);

    // Auto-calculate rotation based on screen size
    const updateAngles = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;

      const dx1 = (65 - 35) / 100 * w;
      const dy1 = (25 - 8) / 100 * h;
      const angle1 = (Math.atan2(dy1, dx1) * (180 / Math.PI)) - 90;

      const dx2 = (35 - 65) / 100 * w;
      const dy2 = (42 - 25) / 100 * h;
      const angle2 = (Math.atan2(dy2, dx2) * (180 / Math.PI)) - 90;

      containerRef.current.style.setProperty('--angle1', `${angle1}deg`);
      containerRef.current.style.setProperty('--angle2', `${angle2}deg`);
    };

    updateAngles();
    window.addEventListener('resize', updateAngles);
    return () => window.removeEventListener('resize', updateAngles);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#111111] text-white overflow-hidden">
      <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
        {/* Header area */}
        <div className="relative mb-12 md:mb-16">
          <h2
            className="font-marker text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-wide"
            style={{ fontFamily: "var(--font-marker)" }}
          >
            HOW WE WORK <span className="text-[#F5A623]">?</span>
          </h2>

          {/* Lightbulb positioned top-right */}
          <div className="absolute -top-4 right-0 sm:-top-8 md:-top-12 md:right-4 lg:-top-10 lg:right-8">
            <LightbulbIcon className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44" />
          </div>

          <p className="mt-4 text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed">
            Growth requires clarity, discipline, and a commitment to outcomes.
          </p>
        </div>

        {/* Steps zigzag layout */}
        <div className="relative">
          {/* SVG dashed connecting line with mask reveal */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="how-we-work-scroll-mask">
                {/* 
                  This white rectangle acts as a window revealing the elements.
                  It starts with height 0 and animating to height 100% reveals from top to bottom.
                */}
                <rect
                  className="scroll-draw-mask-rect"
                  x="0"
                  y="0"
                  width="100%"
                  height="0%"
                  fill="white"
                />
              </mask>
            </defs>

            {/* Everything inside this group gets masked and drawn sequentially */}
            <g mask="url(#how-we-work-scroll-mask)">
              <line
                x1="35%"
                y1="8%"
                x2="65%"
                y2="25%"
                stroke="#888"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <line
                x1="65%"
                y1="25%"
                x2="35%"
                y2="42%"
                stroke="#888"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <line
                x1="35%"
                y1="42%"
                x2="65%"
                y2="59%"
                stroke="#888"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <line
                x1="65%"
                y1="59%"
                x2="35%"
                y2="76%"
                stroke="#888"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <line
                x1="35%"
                y1="76%"
                x2="65%"
                y2="93%"
                stroke="#888"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              {/* Dots at connection points */}
              <circle cx="35%" cy="8%" r="5" fill="#999" />
              <circle cx="65%" cy="25%" r="5" fill="#999" />
              <circle cx="35%" cy="42%" r="5" fill="#999" />
              <circle cx="65%" cy="59%" r="5" fill="#999" />
              <circle cx="35%" cy="76%" r="5" fill="#999" />
              <circle cx="65%" cy="93%" r="5" fill="#999" />
            </g>
          </svg>

          {/* Moving Arrow that animates along the path */}
          <div
            className="moving-arrow absolute hidden md:flex items-center justify-center w-8 h-8 -ml-4 -mt-4 z-20 pointer-events-none text-[#F5A623] will-change-transform"
            style={{ left: "35%", top: "8%", opacity: 0 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
              <path d="M12 2L12 22M12 22L5 15M12 22L19 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Steps grid */}
          <div className="relative z-10 flex flex-col gap-10 md:gap-14 lg:gap-16">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"
                    }`}
                >
                  <div
                    className={`flex gap-3 md:gap-4 max-w-xl ${isLeft ? "md:ml-8 lg:ml-16" : "md:mr-8 lg:mr-16"
                      }`}
                  >
                    {/* Big number */}
                    <span className="text-5xl md:text-6xl lg:text-7xl font-black text-[#F5A623] leading-none shrink-0 -mt-1">
                      {step.number}
                    </span>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <ul className="flex flex-col gap-1">
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm md:text-base text-white/75"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-white/75 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
