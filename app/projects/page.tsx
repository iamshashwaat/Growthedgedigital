"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, LayoutGrid, Play, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/footer";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState<string[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!loading && projects.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(".projects-header > *",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
                );

                gsap.fromTo(".project-card",
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".projects-grid",
                            start: "top 85%",
                        }
                    }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [loading, projects]);

    const openLightbox = (images: string[], index: number) => {
        setLightboxImages(images);
        setLightboxIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    };

    const nextImage = () => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
    const prevImage = () => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);

    const getYoutubeId = (url: string) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const getVimeoId = (url: string) => {
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
    };

    const getVideoThumbnail = (url: string) => {
        const ytId = getYoutubeId(url);
        if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
        return null;
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                    <button onClick={prevImage} className="absolute left-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="absolute right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="relative max-w-5xl w-full mx-4">
                        <img src={lightboxImages[lightboxIndex]} alt="Gallery" className="w-full max-h-[80vh] object-contain rounded-2xl" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {lightboxImages.map((_, i) => (
                                <button key={i} onClick={() => setLightboxIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex ? 'bg-[#F5A623] w-6' : 'bg-white/30'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 md:px-12">
                <div ref={containerRef} className="max-w-7xl mx-auto">
                    <div className="projects-header max-w-3xl mb-16 md:mb-24">
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
                            here's how we help our partners gain their Growth Edge.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-[450px] bg-white/5 rounded-[2.5rem] animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="project-card group relative bg-[#111111] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-[#F5A623]/30 transition-all duration-500 flex flex-col"
                                >
                                    {/* Main Image with Gallery Overlay */}
                                    <div className="relative h-[280px] w-full overflow-hidden">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <LayoutGrid className="w-12 h-12 text-white/10" />
                                            </div>
                                        )}

                                        {/* Gallery indicator */}
                                        {(project.images?.length > 0 || project.videos?.length > 0) && (
                                            <div className="absolute bottom-4 left-4 flex gap-2">
                                                {project.images?.length > 0 && (
                                                    <button
                                                        onClick={() => openLightbox(project.images, 0)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-bold hover:bg-black/80 transition-all"
                                                    >
                                                        <Maximize2 className="w-3 h-3" />
                                                        {project.images.length} Images
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* Overlay with links */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-full bg-[#F5A623] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Gallery Scroll Strip */}
                                    {project.images?.length > 0 && (
                                        <div className="relative border-t border-white/5">
                                            <div className="flex gap-1 p-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                                {project.images.slice(0, 4).map((img: string, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => openLightbox(project.images, idx)}
                                                        className="relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden hover:opacity-80 transition-opacity border border-white/5"
                                                    >
                                                        <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                                                    </button>
                                                ))}
                                                {project.images.length > 4 && (
                                                    <button
                                                        onClick={() => openLightbox(project.images, 0)}
                                                        className="flex-shrink-0 w-20 h-16 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold hover:bg-white/10 transition-all"
                                                    >
                                                        +{project.images.length - 4}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Thumbnails */}
                                    {project.videos?.length > 0 && (
                                        <div className="px-4 pb-3 -mt-1">
                                            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                                {project.videos.slice(0, 2).map((vid: string, idx: number) => {
                                                    const thumb = getVideoThumbnail(vid);
                                                    return (
                                                        <a
                                                            key={idx}
                                                            href={vid}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden group/video"
                                                        >
                                                            {thumb ? (
                                                                <Image src={thumb} alt="Video" fill className="object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full bg-white/10" />
                                                            )}
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/video:bg-black/20 transition-all">
                                                                <Play className="w-6 h-6 text-white" />
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                                {project.videos.length > 2 && (
                                                    <a
                                                        href={project.videos[2]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-shrink-0 w-28 h-16 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold hover:bg-white/10 transition-all"
                                                    >
                                                        +{project.videos.length - 2} Videos
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F5A623] mb-4">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                        <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">
                                                {project.createdAt ? new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'Recent Project'}
                                            </span>
                                            {project.link && (
                                                <Link
                                                    href={project.link}
                                                    target="_blank"
                                                    className="flex items-center gap-2 text-sm font-bold text-[#F5A623] hover:underline"
                                                >
                                                    View Details
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && projects.length === 0 && (
                        <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                            <p className="text-white/30 text-xl">Our portfolio is being updated. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
