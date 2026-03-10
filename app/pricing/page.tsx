"use client";


import { Footer } from "@/components/footer";
import { LightbulbIcon } from "@/components/lightbulb-icon";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Social Media pricing plans
const socialMediaPlans = [
  {
    title: "Influencer Marketing",
    price: "₹999/month",
    features: [
      "Influencer Collaboration Setup",
      "Micro Influencer Promotions",
      "UGC (User Generated Content) Videos",
      "Trending Reels for Your Business",
      "Target Audience Recommendations",
      "Brand Script & Caption Writing",
      "Engagement & Performance Tracking",
      "Perfect for offline Business",
    ],
  },
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    price: "₹1999/month",
    features: [
      "12 Professionally Designed Posts",
      "4 Trend-Based Reels",
      "Profile Optimization",
      "Growth Strategy Plan",
      "Meta Ads Support",
      "Digital Visiting Card (QR)",
      "Monthly Analytics Report",
      "Influencer Marketing Support",
      "Reels Script + Caption Writing",
      "Free Sample Post",
    ],
  },
  {
    title: "SOCIAL MEDIA BRANDING",
    price: "₹2999/month",
    features: [
      "Expert Monthly Management Start From 1999/-",
      "Instagram Posts",
      "Canva Designs",
      "CapCut Reels Editing",
      "Social Media Management",
      "Meta Ads Management",
      "Logo & Branding",
      "Video Design",
      "QR Digital Visiting Card",
      "Get a free sample post",
    ],
  },
];

// Web Designing pricing plan
const webDesigningPlan = {
  title: "WEBSITE DEVELOPMENT",
  price: "₹15999/month",
  features: [
    "Free Consultation",
    "Logo Designing",
    "UI Designing",
    "SEO & Website Ranking",
    "Automation Tools Setup",
    "Animation & Motion Graphics",
    "Content Optimization",
    "Domain & Hosting Setup",
    "Landing Page Design",
    "Social Media Integration",
    "Google Analytics Setup",
    "Lead Generation Setup",
    "Website Maintenance & Support",
  ],
};

export default function PricingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLElement>(null);
  const webRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();
      tl.fromTo(".pricing-hero-bulb",
        { y: -50, opacity: 0, rotation: 15 },
        { y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" }
      ).fromTo(".pricing-hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      ).fromTo(".pricing-hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Social Media Section Animation
      gsap.fromTo(".social-badge",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.fromTo(".social-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Web Designing Section Animation
      gsap.fromTo(".web-badge",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: webRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.fromTo(".web-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: webRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.fromTo(".web-bulb",
        { x: 50, opacity: 0, rotation: -15 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: webRef.current,
            start: "top 60%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background">


      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-[#111111] pt-28 pb-8 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Lightbulb positioned top-right */}
        <div className="pricing-hero-bulb absolute top-4 right-4 sm:top-8 sm:right-8 md:top-10 md:right-10 lg:top-8 lg:right-16">
          <LightbulbIcon className="w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="pricing-hero-title text-4xl sm:text-5xl md:text-6xl font-bold text-white italic mb-3">
            Pricing plans
          </h1>
          <p className="pricing-hero-subtitle text-white/70 text-base sm:text-lg mb-10">
            Choose the right plan for your needs
          </p>
        </div>
      </section>

      {/* Social Media Section */}
      <section ref={socialRef} className="relative bg-[#111111] pb-16 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          {/* Section Badge */}
          <div className="social-badge flex justify-center mb-10">
            <div className="bg-[#F5A623] rounded-xl sm:rounded-2xl px-8 sm:px-12 md:px-16 py-3 sm:py-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-wide">
                SOCIAL MEDIA
              </h2>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {socialMediaPlans.map((plan, index) => (
              <div
                key={index}
                className="social-card bg-white border-2 border-[#111111] rounded-2xl p-5 sm:p-6 flex flex-col"
              >
                {/* Card Header */}
                <div className="border-b-2 border-[#111111] pb-4 mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111111] leading-tight mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#111111]">
                    Starts from <span className="font-semibold">{plan.price}</span>
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 sm:space-y-3 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                      <span className="text-sm sm:text-base text-[#111111]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Designing Section */}
      <section ref={webRef} className="relative bg-[#111111] pb-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Lightbulb positioned top-right */}
        <div className="web-bulb absolute top-0 right-4 sm:right-8 md:right-10 lg:right-16">
          <LightbulbIcon className="w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Section Badge */}
          <div className="web-badge flex justify-center mb-10">
            <div className="bg-[#F5A623] rounded-xl sm:rounded-2xl px-8 sm:px-12 md:px-16 py-3 sm:py-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-wide">
                WEB DESIGNING
              </h2>
            </div>
          </div>

          {/* Single Centered Pricing Card */}
          <div className="flex justify-center">
            <div className="web-card bg-white border-2 border-[#111111] rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-md">
              {/* Card Header */}
              <div className="border-b-2 border-[#111111] pb-4 mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] leading-tight mb-2">
                  {webDesigningPlan.title}
                </h3>
                <p className="text-sm sm:text-base text-[#111111]">
                  Starts from <span className="font-semibold">{webDesigningPlan.price}</span>
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-2 sm:space-y-3">
                {webDesigningPlan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                    <span className="text-sm sm:text-base text-[#111111]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
