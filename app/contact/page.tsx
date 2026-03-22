"use client";

import { useRef, useEffect } from "react";
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Header Animation
            tl.fromTo(".contact-header-badge",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
            ).fromTo(".contact-header-title",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            ).fromTo(".contact-header-desc",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );

            // Info Cards Animation
            gsap.fromTo(".info-card",
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: ".info-grid",
                        start: "top 85%",
                    }
                }
            );

            // Form Section Animation
            gsap.fromTo(".form-section",
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".form-section",
                        start: "top 80%",
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const contactInfos = [
        {
            icon: <Phone className="w-6 h-6" />,
            label: "Call Us",
            value: "+91 81782 96841",
            href: "tel:+918178296841",
            color: "bg-[#F5A623]/10 text-[#F5A623]"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email Us",
            value: "hello@growthedgedigital.in",
            href: "mailto:hello@growthedgedigital.in",
            color: "bg-blue-500/10 text-blue-500"
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            label: "WhatsApp",
            value: "Chat with an Expert",
            href: "https://wa.me/918178296841",
            color: "bg-green-500/10 text-green-500"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            label: "Working Hours",
            value: "Mon - Sat: 9AM - 7PM",
            href: "#",
            color: "bg-purple-500/10 text-purple-500"
        }
    ];

    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
                    <span className="contact-header-badge inline-block py-1.5 px-4 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-6">
                        Contact Us
                    </span>
                    <h1 className="contact-header-title text-5xl md:text-7xl font-black leading-[1.05] mb-8">
                        Let's build your <br />
                        <span className="text-foreground/40">Growth Edge.</span>
                    </h1>
                    <p className="contact-header-desc text-xl text-foreground/60 leading-relaxed max-w-xl">
                        Ready to scale your business? Whether you have a specific question
                        or need a full audit, we're here to help you dominate your market.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="info-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {contactInfos.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    target={info.href.startsWith('http') ? "_blank" : undefined}
                                    rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className="info-card group flex items-center gap-6 p-6 rounded-3xl bg-[#FFF8E7] border border-black/5 hover:border-[#F5A623]/30 hover:shadow-xl hover:shadow-[#F5A623]/5 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${info.color}`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 block mb-1">
                                            {info.label}
                                        </span>
                                        <span className="text-[1.1rem] font-bold text-foreground break-all">
                                            {info.value}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Additional Branding/Text */}
                        <div className="p-10 rounded-[2.5rem] bg-[#1a1a1a] text-white relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl" />
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Global Reach</h3>
                            <p className="text-white/60 leading-relaxed relative z-10">
                                Headquartered in India, serving ambitious brands worldwide.
                                Distance is never a barrier to high-performance marketing.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form Section */}
                    <div className="lg:col-span-7 form-section">
                        <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                            {/* Form decorative glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="mb-10 relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Request a Free Audit</h2>
                                <p className="text-white/50 text-lg">
                                    Fill out the form below and our strategy team will analyze
                                    your current digital presence within 24 hours.
                                </p>
                            </div>

                            <div className="relative z-10">
                                <LeadForm />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom map-like visual placeholder */}
                <div className="mt-32 rounded-[3.5rem] overflow-hidden bg-[#FFF8E7] h-64 flex items-center justify-center border border-black/5 relative grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <Globe className="w-12 h-12 text-[#F5A623] animate-pulse" />
                        <span className="text-foreground/40 font-bold uppercase tracking-[0.3em]">Connecting Brands to Growth</span>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
