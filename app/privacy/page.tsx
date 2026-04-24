"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Footer } from "@/components/footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
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
        <main className="min-h-screen bg-background pt-32">
            <div ref={containerRef} className="max-w-4xl mx-auto px-6 pb-20">

                {/* Header */}
                <div className="legal-header mb-20 text-center">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-6">
                        <Shield className="w-4 h-4" />
                        Legal Transparency
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6">Privacy Policy</h1>
                    <p className="text-lg text-foreground/50">Last Updated: March 8, 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none space-y-16">

                    <section className="legal-section">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] flex items-center justify-center text-[#F5A623] border border-black/5">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold m-0">Information We Collect</h2>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                            At GrowthEdge Digital, we collect information that helps us deliver high-performance marketing results.
                            This includes technical data like IP addresses and browsing behavior, as well as personal details you
                            voluntarily provide via our lead forms, such as your name, email address, and business details.
                        </p>
                    </section>

                    <section className="legal-section">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] flex items-center justify-center text-[#F5A623] border border-black/5">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold m-0">How We Use Your Data</h2>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                            {[
                                "Personalizing your marketing strategy audit.",
                                "Improving our website performance and UX.",
                                "Communicating expert insights and service updates.",
                                "Ensuring the security of our digital platforms."
                            ].map((item, i) => (
                                <li key={i} className="bg-[#FFF8E7] p-4 rounded-2xl border border-black/5 text-foreground/80 font-medium">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="legal-section">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] flex items-center justify-center text-[#F5A623] border border-black/5">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold m-0">Data Security & Protection</h2>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                            We implement industry-leading security measures to protect your information. Your data is stored on
                            secure servers and is only accessible by authorized personnel involved in delivering your services.
                            We never sell your personal information to third parties.
                        </p>
                    </section>

                    <section className="legal-section p-10 rounded-[2.5rem] bg-[#1a1a1a] text-white relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl" />
                        <h3 className="text-2xl font-bold mb-4 relative z-10 m-0">Your Privacy Rights</h3>
                        <p className="text-white/60 leading-relaxed relative z-10 m-0">
                            You have the right to access, update, or delete your data at any time. Simply reach out to our privacy
                            team at <span className="text-[#F5A623] font-bold">hello@growthedgedigital.in</span> and we will process
                            your request within 48 hours.
                        </p> section
                    </section>

                </div>
            </div>
            <Footer />
        </main>
    );
}
