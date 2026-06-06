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
            <main className="min-h-screen bg-[#FDFCF8] pt-28 md:pt-32">
                <div className="max-w-7xl mx-auto px-5 md:px-12">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 w-32 bg-foreground/5 rounded-full" />
                        <div className="h-16 w-3/4 bg-foreground/5 rounded-2xl" />
                        <div className="aspect-video bg-foreground/5 rounded-[2rem]" />
                        <div className="h-40 bg-foreground/5 rounded-2xl" />
                    </div>
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="min-h-screen bg-[#FDFCF8] text-foreground pt-28 md:pt-32">
                <div className="max-w-7xl mx-auto px-5 md:px-12 text-center py-32">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-foreground/50 mb-8">This project doesn't exist or has been removed.</p>
                    <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-[#F5A623]/20">
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
        <main className="min-h-screen bg-[#FDFCF8] text-foreground">
            {/* Lightbox */}
            {lightboxOpen && hasGallery && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-10"
                        aria-label="Close lightbox"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>
                    <button
                        onClick={() => setLightboxIndex(p => (p - 1 + allImages.length) % allImages.length)}
                        className="absolute left-3 md:left-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-10"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>
                    <button
                        onClick={() => setLightboxIndex(p => (p + 1) % allImages.length)}
                        className="absolute right-3 md:right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-10"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>
                    <div className="relative max-w-5xl w-full mx-4">
                        <img
                            src={allImages[lightboxIndex]}
                            alt={`${project.title} ${lightboxIndex + 1}`}
                            className="w-full max-h-[80vh] object-contain rounded-2xl"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {allImages.map((_: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setLightboxIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex ? 'bg-[#F5A623] w-6' : 'bg-white/30'}`}
                                    aria-label={`Go to image ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-24 md:pt-32 pb-16 md:pb-20 px-5 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div ref={headerRef} className="project-detail-header mb-10 md:mb-12">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors mb-6 md:mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="min-w-0">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-xs font-black uppercase tracking-widest mb-3 md:mb-4">
                                    {project.category}
                                </span>
                                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] break-words">
                                    {project.title}
                                </h1>
                                {project.createdAt && (
                                    <p className="flex items-center gap-2 text-foreground/40 text-sm mt-3 md:mt-4">
                                        <Calendar className="w-4 h-4 shrink-0" />
                                        {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3 shrink-0 flex-wrap">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 md:px-6 py-3 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#F5A623]/20"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span className="text-sm md:text-base">Live Site</span>
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 md:px-6 py-3 bg-white text-foreground font-bold rounded-2xl border border-black/5 hover:border-black/10 hover:shadow-md transition-all"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span className="text-sm md:text-base">Source</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    {project.image && (
                        <div className="relative aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-12 md:mb-16 shadow-lg border border-black/5">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                    )}

                    {/* Main Content + Sidebar */}
                    <div ref={contentRef} className="project-detail-body grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
                        {/* Description */}
                        <div className="lg:col-span-8 space-y-8 md:space-y-12">
                            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-black/5 shadow-sm">
                                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-[#F5A623]" />
                                    About This Project
                                </h2>
                                <p className="text-foreground/70 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>

                            {/* Gallery Grid */}
                            {hasGallery && (
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-[#F5A623]" />
                                        Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                        {allImages.map((img: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                                                className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden group border border-black/5 hover:border-[#F5A623]/30 transition-all bg-white shadow-sm"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} ${idx + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                                        View
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-6 md:space-y-8">
                            {/* Quick Info */}
                            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-black/5 shadow-sm">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                                    <span className="w-6 h-[2px] bg-[#F5A623]" />
                                    Quick Info
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-widest text-foreground/40">Category</span>
                                        <p className="text-foreground font-semibold mt-1">{project.category}</p>
                                    </div>
                                    {project.createdAt && (
                                        <div>
                                            <span className="text-xs font-black uppercase tracking-widest text-foreground/40">Completed</span>
                                            <p className="text-foreground font-semibold mt-1">
                                                {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                                            </p>
                                        </div>
                                    )}
                                    {project.link && (
                                        <div>
                                            <span className="text-xs font-black uppercase tracking-widest text-foreground/40">Live URL</span>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#F5A623] font-semibold mt-1 block hover:underline truncate"
                                            >
                                                {project.link.replace(/^https?:\/\//, '')}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-[#F5A623]/10 to-[#F5A623]/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-[#F5A623]/10">
                                <h3 className="text-xl md:text-2xl font-black mb-4 leading-tight text-foreground">
                                    Need something like this?
                                </h3>
                                <p className="text-foreground/60 mb-6 md:mb-8 leading-relaxed">
                                    Let's build your next digital success story.
                                </p>
                                <Link
                                    href="/book-a-call"
                                    className="block w-full text-center bg-[#F5A623] text-black font-extrabold py-4 rounded-2xl hover:bg-[#e09520] transition-all active:scale-95 shadow-lg shadow-[#F5A623]/20"
                                >
                                    Get a Free Audit
                                </Link>
                            </div>

                            {/* Videos */}
                            {hasVideos && (
                                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-black/5 shadow-sm">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                                        <span className="w-6 h-[2px] bg-[#F5A623]" />
                                        Videos
                                    </h3>
                                    <div className="space-y-4">
                                        {project.videos.map((vid: string, idx: number) => {
                                            const thumb = getVideoThumbnail(vid);
                                            return (
                                                <a
                                                    key={idx}
                                                    href={vid}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden group block border border-black/5 bg-white shadow-sm"
                                                >
                                                    {thumb ? (
                                                        <Image src={thumb} alt={`Video ${idx + 1}`} fill className="object-cover" unoptimized />
                                                    ) : (
                                                        <div className="w-full h-full bg-foreground/5" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-all">
                                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F5A623] flex items-center justify-center shadow-lg">
                                                            <Play className="w-5 h-5 md:w-6 md:h-6 text-black ml-0.5" />
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
