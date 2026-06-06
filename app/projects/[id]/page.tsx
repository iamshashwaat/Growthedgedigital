"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X, Play, Calendar } from "lucide-react";
import gsap from "gsap";
import { Footer } from "@/components/footer";

export default function ProjectDetailPage() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!project) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(".project-detail-header > *",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 }
            );
            tl.fromTo(".project-detail-body > *",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
                "-=0.4"
            );
        });
        return () => ctx.revert();
    }, [project]);

    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowRight') setLightboxIndex(p => (p + 1) % (project?.images?.length || 1));
            if (e.key === 'ArrowLeft') setLightboxIndex(p => (p - 1 + (project?.images?.length || 1)) % (project?.images?.length || 1));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, project]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0a0a] pt-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 w-32 bg-white/5 rounded-full" />
                        <div className="h-16 w-3/4 bg-white/5 rounded-2xl" />
                        <div className="aspect-video bg-white/5 rounded-[2.5rem]" />
                        <div className="h-40 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="min-h-screen bg-[#0a0a0a] text-white pt-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center py-32">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-white/50 mb-8">This project doesn't exist or has been removed.</p>
                    <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.02] transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </div>
            </main>
        );
    }

    const allImages = project.images || [];
    const hasGallery = allImages.length > 0;
    const hasVideos = project.videos?.length > 0;

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
            {lightboxOpen && hasGallery && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-10">
                        <X className="w-6 h-6" />
                    </button>
                    <button onClick={() => setLightboxIndex(p => (p - 1 + allImages.length) % allImages.length)} className="absolute left-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-10">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={() => setLightboxIndex(p => (p + 1) % allImages.length)} className="absolute right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-10">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="relative max-w-5xl w-full mx-4">
                        <img src={allImages[lightboxIndex]} alt={`${project.title} ${lightboxIndex + 1}`} className="w-full max-h-[80vh] object-contain rounded-2xl" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {allImages.map((_: string, i: number) => (
                                <button key={i} onClick={() => setLightboxIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex ? 'bg-[#F5A623] w-6' : 'bg-white/30'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-24 md:pt-32 pb-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div ref={headerRef} className="project-detail-header mb-12">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-xs font-black uppercase tracking-widest mb-4">
                                    {project.category}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05]">
                                    {project.title}
                                </h1>
                                {project.createdAt && (
                                    <p className="flex items-center gap-2 text-white/30 text-sm mt-4">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3 shrink-0">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        <ExternalLink className="w-4 h-4" />
                                        Live Site
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                                        <Github className="w-4 h-4" />
                                        Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    {project.image && (
                        <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
                            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                    )}

                    <div ref={contentRef} className="project-detail-body grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Description */}
                        <div className="lg:col-span-8">
                            <div className="bg-[#111111] rounded-[2.5rem] p-8 md:p-12 border border-white/5">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-[#F5A623]" />
                                    About This Project
                                </h2>
                                <p className="text-white/70 text-lg leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>

                            {/* Gallery Grid */}
                            {hasGallery && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-[#F5A623]" />
                                        Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {allImages.map((img: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                                                className="relative aspect-video rounded-2xl overflow-hidden group border border-white/5 hover:border-[#F5A623]/30 transition-all"
                                            >
                                                <Image src={img} alt={`${project.title} ${idx + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm">View</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Quick Info */}
                            <div className="bg-[#111111] rounded-[2.5rem] p-8 border border-white/5">
                                <h3 className="text-lg font-bold mb-6">Quick Info</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-widest text-white/30">Category</span>
                                        <p className="text-white font-semibold mt-1">{project.category}</p>
                                    </div>
                                    {project.createdAt && (
                                        <div>
                                            <span className="text-xs font-black uppercase tracking-widest text-white/30">Completed</span>
                                            <p className="text-white font-semibold mt-1">{new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</p>
                                        </div>
                                    )}
                                    {project.link && (
                                        <div>
                                            <span className="text-xs font-black uppercase tracking-widest text-white/30">Live URL</span>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#F5A623] font-semibold mt-1 block hover:underline truncate">
                                                {project.link.replace(/^https?:\/\//, '')}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-[#F5A623]/20 to-transparent rounded-[2.5rem] p-8 border border-[#F5A623]/10">
                                <h3 className="text-2xl font-black mb-4 leading-tight">Need something like this?</h3>
                                <p className="text-white/60 mb-8 leading-relaxed">Let's build your next digital success story.</p>
                                <Link href="/book-a-call"
                                    className="block w-full text-center bg-[#F5A623] text-black font-extrabold py-4 rounded-2xl hover:bg-[#e09520] transition-all active:scale-95">
                                    Get a Free Audit
                                </Link>
                            </div>

                            {/* Videos */}
                            {hasVideos && (
                                <div className="bg-[#111111] rounded-[2.5rem] p-8 border border-white/5">
                                    <h3 className="text-lg font-bold mb-6">Videos</h3>
                                    <div className="space-y-4">
                                        {project.videos.map((vid: string, idx: number) => {
                                            const thumb = getVideoThumbnail(vid);
                                            return (
                                                <a key={idx} href={vid} target="_blank" rel="noopener noreferrer"
                                                    className="relative aspect-video rounded-2xl overflow-hidden group block border border-white/5">
                                                    {thumb ? (
                                                        <Image src={thumb} alt={`Video ${idx + 1}`} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-white/5" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                                                        <div className="w-14 h-14 rounded-full bg-[#F5A623] flex items-center justify-center">
                                                            <Play className="w-6 h-6 text-black ml-0.5" />
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
