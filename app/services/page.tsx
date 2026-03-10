"use client";

import { Footer } from "@/components/footer";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const servicesTopRow = [
  {
    title: "SEO",
    fullTitle: "Search Engine Optimization",
    points: [
      "Improve search rankings and visibility.",
      "Drive high-quality organic traffic.",
      "Generate consistent long-term leads.",
    ],
    variant: "dark" as const,
    image: "/images/services/seo.png",
  },
  {
    title: "Social Media",
    fullTitle: "Social Media Marketing",
    points: [
      "Build strong brand presence online.",
      "Engage and grow your audience.",
      "Turn followers into customers.",
    ],
    variant: "amber" as const,
    image: "/images/services/social.png",
  },
  {
    title: "Web Dev",
    fullTitle: "Web Development & Design",
    points: [
      "Create modern, responsive websites.",
      "Optimize for UX and conversions.",
      "Build scalable digital platforms.",
    ],
    variant: "dark" as const,
    image: "/images/services/web.png",
  },
  {
    title: "PPC Ads",
    fullTitle: "Pay-Per-Click Advertising",
    points: [
      "Target ready-to-buy customers.",
      "Maximize ROI with optimized ads.",
      "Scale campaigns profitably.",
    ],
    variant: "amber" as const,
    image: "/images/services/ppc.png",
  },
];

const servicesBottomRow = [
  {
    title: "Content",
    fullTitle: "Content Marketing",
    points: [
      "Create valuable, engaging content.",
      "Build authority in your niche.",
      "Drive traffic and conversions.",
    ],
    variant: "dark" as const,
    image: "/images/services/content.png",
  },
  {
    title: "Email",
    fullTitle: "Email Marketing",
    points: [
      "Automate lead nurturing.",
      "Increase customer retention.",
      "Boost repeat sales.",
    ],
    variant: "amber" as const,
    image: "/images/services/email.png",
  },
  {
    title: "Branding",
    fullTitle: "Branding & Creative Services",
    points: [
      "Develop strong brand identity.",
      "Create consistent visual messaging.",
      "Stand out in competitive markets.",
    ],
    variant: "dark" as const,
    image: "/images/services/web.png", // Fallback
  },
  {
    title: "Analytics",
    fullTitle: "Analytics & Reporting",
    points: [
      "Track key performance metrics.",
      "Make data-driven decisions.",
      "Improve marketing efficiency.",
    ],
    variant: "amber" as const,
    image: "/images/services/seo.png", // Fallback
  },
];

function ServiceCard({
  title,
  fullTitle,
  points,
  variant,
  image,
  className,
  swipeDirection,
}: {
  title: string;
  fullTitle: string;
  points: string[];
  variant: "dark" | "amber";
  image?: string;
  className?: string;
  swipeDirection: "left" | "right";
}) {
  const isDark = variant === "dark";

  return (
    <div
      data-swipe={swipeDirection}
      className={`group relative aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl bg-white border border-black/5 ${className || ""}`}
    >
      {/* Background/Center Image */}
      <div className="card-image absolute inset-0 p-8 flex items-center justify-center transition-all duration-700 md:group-hover:scale-90 md:group-hover:opacity-20">
        {image && (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Default State: Bottom Label */}
      <div className="card-label absolute bottom-6 left-0 right-0 flex justify-center transition-all duration-500 md:group-hover:opacity-0 md:group-hover:translate-y-4">
        <div className="px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-black/5">
          <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground">
            {title}
          </span>
        </div>
      </div>

      {/* Desktop hover (slide from bottom) + Mobile scroll (GSAP handles X) */}
      <div
        className={`card-overlay absolute inset-0 bg-foreground/95 backdrop-blur-sm flex flex-col justify-center p-8
          transition-all duration-500 ease-out
          pointer-events-none md:pointer-events-auto
          opacity-0 translate-y-full
          md:group-hover:opacity-100 md:group-hover:translate-y-0
          rounded-[2rem] border-t-4 border-[#F5A623]
          ${swipeDirection === "left" ? "max-md:-translate-x-full" : "max-md:translate-x-full"} md:translate-x-0`}
      >
        <h3 className="text-xl sm:text-2xl font-black text-background mb-6 leading-tight flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#F5A623]" />
          {fullTitle}
        </h3>
        <ul className="space-y-4">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm sm:text-base text-background/70 leading-relaxed group/item"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F5A623] shrink-0 transition-transform duration-300 group-hover/item:scale-150" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Link/Arrow Indicator */}
        <div className="mt-8 flex items-center gap-2 text-[#F5A623] font-bold text-sm uppercase tracking-widest">
          Read More
          <svg className="w-4 h-4 transition-transform duration-300 md:group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const allServices = [...servicesTopRow, ...servicesBottomRow];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero text animation on load
      const tl = gsap.timeline();
      tl.fromTo(".services-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      ).fromTo(".services-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Card entrance animation (desktop & mobile)
      gsap.fromTo(".service-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Mobile Scroll-triggered Overlay Animation
      // Only run on mobile (screens < 768px)
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");

        cards.forEach((card) => {
          const overlay = card.querySelector(".card-overlay");
          const image = card.querySelector(".card-image");
          const label = card.querySelector(".card-label");
          const direction = card.getAttribute("data-swipe");

          // Explicitly set starting position for GSAP to have full control
          gsap.set(overlay, {
            x: direction === "left" ? "-100%" : "100%",
            opacity: 0,
          });

          // Animate overlay swipe
          gsap.to(overlay, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 30%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            }
          });

          // Fade/scale image behind
          gsap.to(image, {
            scale: 0.85,
            opacity: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 30%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            }
          });

          // Hide label
          gsap.to(label, {
            opacity: 0,
            y: 10,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 30%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            }
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      {/* Services Hero Section */}
      <section ref={heroRef} className="px-5 pt-32 pb-16 sm:px-8 sm:pb-20 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16 sm:mb-24">
            <p className="services-badge text-[#F5A623] font-black uppercase tracking-[0.4em] text-xs sm:text-sm mb-6">
              OUR EXPERTISE
            </p>
            <h1 className="services-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[1] max-w-5xl mx-auto tracking-tighter">
              Performance driven <span className="text-[#F5A623]">creative</span> strategies.
            </h1>
          </div>

          <div ref={cardsRef} className="space-y-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {allServices.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                fullTitle={service.fullTitle}
                points={service.points}
                variant={service.variant}
                image={service.image}
                swipeDirection={i % 2 === 0 ? "left" : "right"}
                className="service-card"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
