"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Footer } from "@/components/footer";
import { Scale, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

export default function TermsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".legal-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
            gsap.fromTo(".legal-section",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div ref={containerRef} className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="legal-header mb-20 text-center">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-6">
                        <Scale className="w-4 h-4" />
                        Service Agreement
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6">Terms of Service</h1>
                    <p className="text-lg text-foreground/50">Last Updated: March 8, 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none space-y-16">

                    <section className="legal-section">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] flex items-center justify-center text-[#F5A623] border border-black/5">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold m-0">Acceptance of Terms</h2>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                            By accessing or using GrowthEdge Digital's website and services, you agree to be bound by these Terms of Service.
                            Our services are designed for businesses seeking high-performance digital growth. If you do not agree with any part
                            of these terms, you should immediately discontinue use of our site.
                        </p>
                    </section>

                    <section className="legal-section">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] flex items-center justify-center text-[#F5A623] border border-black/5">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold m-0">Service Delivery & Audits</h2>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                            While we strive for excellence, digital marketing results depend on various market factors. Any strategy audit
                            provided is based on current market data and does not guarantee specific revenue outcomes. Service delivery
                            timelines for paid clients are outlined in individual project agreements.
                        </p>
                    </section>

                    <section className="legal-section">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] flex items-center justify-center text-[#F5A623] border border-black/5">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold m-0">Intellectual Property</h2>
                        </div>
                        <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                            All content, graphics, and proprietary strategy frameworks displayed on this website are the intellectual
                            property of GrowthEdge Digital. Unauthorized reproduction or distribution of our materials is strictly prohibited.
                        </p>
                    </section>

                    <section className="legal-section p-10 rounded-[2.5rem] bg-[#1a1a1a] text-white relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl" />
                        <h3 className="text-2xl font-bold mb-4 relative z-10 m-0">Governing Law</h3>
                        <p className="text-white/60 leading-relaxed relative z-10 m-0">
                            These terms are governed by the laws of India. Any disputes arising from the use of our services will be subject
                            to the exclusive jurisdiction of the courts in Uttar Pradesh, India.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
