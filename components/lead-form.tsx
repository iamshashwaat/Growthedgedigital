"use client";

import { useState } from "react";

// 👇 Paste your Google Apps Script Web App URL here after deployment
//const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxor3Ec9F4ZDb0KhVENFTlJxGKVXpWRdsjUwGdqPST81VaH6QtKNo2x4R2sqYzXTGy_/exec";

const NEEDS = [
    "Social Media Management",
    "Website Design & Development",
    "SEO & Content Marketing",
    "Brand Identity & Design",
    "Paid Ads (Meta/Google)",
    "Video & Reels Production",
    "Other",
];

export function LeadForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        need: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!APPS_SCRIPT_URL) {
            console.warn("NEXT_PUBLIC_APPS_SCRIPT_URL is not set.");
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            // Using 'no-cors' is the most reliable way for Google Apps Script
            // It bypasses CORS issues, though we can't read the response body.
            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    ...form,
                    timestamp: new Date().toISOString(),
                }),
            });

            // Since 'no-cors' always succeeds at the network level unless it times out
            setStatus("success");
            setForm({ name: "", email: "", phone: "", need: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <div className="w-full">
            {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                        <div className="text-4xl text-emerald-500">✓</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-white/60 max-w-[280px] mx-auto text-[15px] leading-relaxed">
                        Thanks for reaching out! We'll craft your custom strategy and get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm text-[#F5A623] font-medium border-b border-[#F5A623]/30 hover:border-[#F5A623] transition-all"
                    >
                        Send another inquiry
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative group">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className="peer w-full bg-white/[0.05] border border-white/[0.1] rounded-xl md:rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623]/50 focus:bg-white/[0.08] transition-all duration-300"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="peer w-full bg-white/[0.05] border border-white/[0.1] rounded-xl md:rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623]/50 focus:bg-white/[0.08] transition-all duration-300"
                            />
                        </div>
                    </div>

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Work Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl md:rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623]/50 focus:bg-white/[0.08] transition-all duration-300"
                    />

                    <div className="relative">
                        <select
                            name="need"
                            required
                            value={form.need}
                            onChange={handleChange}
                            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl md:rounded-2xl px-5 py-4 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623]/50 focus:bg-white/[0.08] transition-all duration-300 appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-white/30 bg-[#111]">Service You're Interested In</option>
                            {NEEDS.map((n) => (
                                <option key={n} value={n} className="bg-[#1a1a1a] text-white py-2">{n}</option>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group relative overflow-hidden bg-[#F5A623] text-black font-bold py-4 px-8 rounded-xl md:rounded-2xl shadow-lg shadow-[#F5A623]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#F5A623]/30 active:scale-[0.98] disabled:opacity-50"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                            {status === "loading" ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Get Started Now
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </>
                            )}
                        </span>
                    </button>

                    {status === "error" && (
                        <p className="text-red-500 text-sm text-center font-bold">Something went wrong. Please check your connection.</p>
                    )}
                </form>
            )}
        </div>
    );
}
