"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/footer";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(projects.map((p: any) => p.category));
        return ["All", ...Array.from(cats)] as string[];
    }, [projects]);

    const filtered = useMemo(() => {
        if (activeCategory === "All") return projects;
        return projects.filter((p: any) => p.category === activeCategory);
    }, [projects, activeCategory]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (loading) return;
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const ctx = gsap.context(() => {
            gsap.fromTo(".projects-header > *",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );
            gsap.fromTo(".project-card",
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: { trigger: ".projects-grid", start: "top 85%" }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [loading]);

    const getYoutubeId = (url: string) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const getVideoThumbnail = (url: string) => {
        const ytId = getYoutubeId(url);
        return ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <section className="pt-32 pb-20 px-6 md:px-12">
                <div ref={containerRef} className="max-w-7xl mx-auto">
                    <div className="projects-header max-w-3xl mb-12 md:mb-16">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-bold uppercase tracking-widest mb-6">
                            <LayoutGrid className="w-4 h-4" />
                            Our Portfolio
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8">
                            Showcasing our <br />
                            <span className="text-[#F5A623]">Digital Excellence.</span>
                        </h1>
                        <p className="text-xl text-white/50 leading-relaxed max-w-xl">
                            From high-converting landing pages to complex digital strategies,
                            here&apos;s how we help our partners gain their Growth Edge.
                        </p>
                    </div>

                    {/* Category Filters */}
                    {!loading && categories.length > 1 && (
                        <div className="flex flex-wrap gap-2 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                                        activeCategory === cat
                                            ? "bg-[#F5A623] text-black"
                                            : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="rounded-[2.5rem] overflow-hidden bg-[#111111] animate-pulse">
                                    <div className="h-[260px] bg-white/5" />
                                    <div className="p-8 space-y-4">
                                        <div className="h-3 w-20 bg-white/5 rounded-full" />
                                        <div className="h-6 w-3/4 bg-white/5 rounded-xl" />
                                        <div className="h-4 w-full bg-white/5 rounded-lg" />
                                        <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
                                        <div className="h-px w-full bg-white/5 my-4" />
                                        <div className="flex justify-between">
                                            <div className="h-3 w-24 bg-white/5 rounded-full" />
                                            <div className="h-3 w-20 bg-white/5 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((project: any) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="project-card group relative bg-[#111111] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-[#F5A623]/30 hover:shadow-2xl hover:shadow-[#F5A623]/5 transition-all duration-500 flex flex-col"
                                >
                                    <div className="relative h-[260px] w-full overflow-hidden">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <LayoutGrid className="w-12 h-12 text-white/10" />
                                            </div>
                                        )}

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Bottom gradient for readability */}
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
                                    </div>

                                    {/* Gallery thumbnails strip */}
                                    {project.images?.length > 0 && (
                                        <div className="relative -mt-12 z-10 px-4">
                                            <div className="flex gap-1.5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                                                {project.images.slice(0, 4).map((img: string, idx: number) => (
                                                    <div key={idx} className="relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                                                        <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                                                    </div>
                                                ))}
                                                {project.images.length > 4 && (
                                                    <div className="flex-shrink-0 w-16 h-11 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold border border-white/10">
                                                        +{project.images.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {project.videos?.length > 0 && !project.images?.length && (
                                        <div className="relative -mt-12 z-10 px-4">
                                            <div className="flex gap-1.5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                                                {project.videos.slice(0, 2).map((vid: string, idx: number) => {
                                                    const thumb = getVideoThumbnail(vid);
                                                    return (
                                                        <div key={idx} className="relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                                                            {thumb ? <Image src={thumb} alt="" fill className="object-cover" sizes="64px" /> : <div className="w-full h-full bg-white/10" />}
                                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                                <Play className="w-3 h-3 text-white" />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-8 flex-1 flex flex-col">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5A623] mb-3">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#F5A623] transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-6">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">
                                                {project.createdAt
                                                    ? new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
                                                    : 'Recent Project'}
                                            </span>
                                            <span className="flex items-center gap-2 text-sm font-bold text-[#F5A623] group-hover:gap-3 transition-all">
                                                View Project
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!loading && filtered.length === 0 && (
                        <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                            <LayoutGrid className="w-16 h-16 text-white/10 mx-auto mb-6" />
                            <p className="text-white/30 text-xl font-medium">{activeCategory === "All" ? "Our portfolio is being updated. Check back soon!" : `No projects in "${activeCategory}" yet.`}</p>
                            {activeCategory !== "All" && (
                                <button onClick={() => setActiveCategory("All")} className="mt-6 px-6 py-3 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.02] transition-all">
                                    View All Projects
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
