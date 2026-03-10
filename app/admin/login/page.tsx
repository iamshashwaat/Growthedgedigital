"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "chummadedo") {
            // Set a simple cookie (not production grade, but fits local use)
            document.cookie = "admin_auth=true; path=/; max-age=86400"; // 24 hours
            router.push("/admin");
        } else {
            setError("Invalid password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-[#F5A623]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-10 h-10 text-[#F5A623]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-white/40">Enter your secret password to continue.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm pl-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Access Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <p className="mt-8 text-center text-white/20 text-xs uppercase tracking-widest font-bold">
                    GrowthEdge Digital Management
                </p>
            </div>
        </div>
    );
}
