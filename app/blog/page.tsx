"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Footer } from "@/components/footer";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(data => setBlogPosts(data))
      .catch(err => console.error("Failed to fetch blogs:", err));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate header text on load
      const tl = gsap.timeline();
      tl.fromTo(".blog-header-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      ).fromTo(".blog-header-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      ).fromTo(".blog-nav-btn",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
        "-=0.4"
      );

      // Animate blog cards staggering in
      gsap.fromTo(".blog-card",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });

    return () => ctx.revert();
  }, [blogPosts]); // Re-run animations when posts load

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative w-full bg-background py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Header */}
          <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
            <div>
              <span className="blog-header-badge block text-[#F5A623] font-bold uppercase tracking-[0.2em] text-sm md:text-base">
                OUR BLOG
              </span>
              <h1 className="blog-header-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mt-2">
                Fresh Ideas
                <br />
                for digital minds.
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-6 md:mt-0">
              <button
                onClick={() => scroll("left")}
                className="blog-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-[#333333] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="blog-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-[#333333] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Blog Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className={`blog-card ${post.bgColor} rounded-2xl md:rounded-3xl flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] overflow-hidden snap-start flex flex-col`}
              >
                {/* Card Content */}
                <div className="p-5 md:p-6 flex-1">
                  <h2
                    className={`text-2xl sm:text-3xl md:text-[2rem] font-bold ${post.textColor} leading-tight`}
                  >
                    {post.title.split(" ").map((word: string, i: number) => (
                      <span key={i}>
                        {word}
                        {i < post.title.split(" ").length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  <p
                    className={`${post.textColor} italic text-base md:text-lg mt-2 opacity-90`}
                  >
                    {post.subtitle}
                  </p>
                  <p
                    className={`${post.textColor} text-sm md:text-[0.9rem] mt-3 leading-relaxed opacity-80`}
                  >
                    {post.description}
                  </p>
                </div>

                {/* Card Image */}
                <div className="relative h-44 sm:h-48 md:h-52 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* READ MORE overlay */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="absolute bottom-4 left-4 md:bottom-5 md:left-5 flex items-center gap-2 text-white font-semibold text-sm md:text-base hover:underline"
                  >
                    READ MORE
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
