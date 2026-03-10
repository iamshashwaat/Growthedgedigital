"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BookACallPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(".badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
            tl.fromTo(".title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
            tl.fromTo(".desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
            tl.fromTo(".form-container", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8");
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-[#FFF8E7]">
            <div className="relative pt-32 pb-20 px-6 md:px-10 lg:px-20 overflow-hidden" ref={containerRef}>
                {/* Organic Mesh Gradient Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F5A623]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F5A623]/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
                        <div className="lg:col-span-2">
                            <span className="badge inline-block py-2 px-5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-[11px] font-black uppercase tracking-[0.3em] mb-8">
                                Direct Access
                            </span>
                            <h1 className="title text-5xl md:text-7xl font-black text-foreground leading-[1.1] mb-10 tracking-tight">
                                Let's craft your <span className="text-[#F5A623]">edge.</span>
                            </h1>
                            <p className="desc text-foreground/50 text-xl leading-relaxed max-w-sm font-medium">
                                Direct inquiry line to our strategy leads. Expected response time:{" "}
                                <span className="text-foreground font-bold underline decoration-[#F5A623]/30">
                                    &lt; 4 hours.
                                </span>
                            </p>
                        </div>

                        <div className="lg:col-span-3 relative form-container">
                            {/* Decorative depth elements for the form */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-[#F5A623] to-orange-600 rounded-[3.5rem] blur-sm opacity-10" />

                            <div className="relative bg-[#0d0d0d] p-10 md:p-14 rounded-[3.5rem] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden">
                                {/* Floating mesh blobb inside form for glass effect */}
                                <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-[100px] pointer-events-none" />
                                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                                <div className="relative z-10">
                                    <LeadForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
