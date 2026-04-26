"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Share2, Clock, Calendar, User } from "lucide-react";
import gsap from "gsap";
import { marked } from "marked";
import { Footer } from "@/components/footer";

export default function BlogPostPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog")
            .then(res => res.json())
            .then(data => {
                const found = data.find((p: any) => p.slug === slug);
                if (found) {
                    setPost(found);
                } else {
                    router.push("/blog");
                }
            })
            .catch(err => console.error("Failed to fetch post:", err))
            .finally(() => setLoading(false));
    }, [slug, router]);

    useEffect(() => {
        if (!post) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(".post-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            ).fromTo(".post-content",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
                "-=0.4"
            ).fromTo(".post-sidebar",
                { x: 20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );
        });

        return () => ctx.revert();
    }, [post]);

    if (loading) return <div className="min-h-screen bg-background" />;
    if (!post) return null;

    // Convert markdown to HTML safely using 'marked'
    const htmlContent = marked.parse(post.content || "");

    return (
        <main className="min-h-screen text-foreground">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                <Image
                    src={post.image || "/images/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${post.bgColor || 'bg-[#111]'} via-${post.bgColor ? post.bgColor+'/40' : 'black/40'} to-transparent`} />

                {/* Back Button */}
                <Link
                    href="/blog"
                    className="absolute top-10 left-6 md:left-12 flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-all z-20"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </Link>
            </div>

            <div className={`${post.bgColor || 'bg-[#111]'} min-h-screen`}>
            <div className={`max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Main Article Content */}
                    <article className={`lg:col-span-8 ${post.bgColor || 'bg-[#111]'} rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl`}>
                        <header className="post-header mb-12">
                            <span className={`inline-block px-4 py-1.5 rounded-full bg-black/10 ${post.textColor || 'text-white'} text-sm font-bold uppercase tracking-widest mb-6`}>
                                {post.subtitle}
                            </span>
                            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 ${post.textColor || 'text-white'}`}>
                                {post.title}
                            </h1>

                            <div className={`flex flex-wrap gap-6 text-sm font-medium border-y border-black/10 py-6 ${post.textColor ? post.textColor.replace('text-', 'text-') + '/60' : 'text-white/60'}`}>
                                <div className="flex items-center gap-2">
                                    <User className={`w-4 h-4 ${post.bgColor ? 'text-black/60' : 'text-[#F5A623]'}`} />
                                    {post.author || "Marketing Strategist"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className={`w-4 h-4 ${post.bgColor ? 'text-black/60' : 'text-[#F5A623]'}`} />
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "March 5, 2026"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className={`w-4 h-4 ${post.bgColor ? 'text-black/60' : 'text-[#F5A623]'}`} />
                                    {post.readTime || "6 min read"}
                                </div>
                            </div>
                        </header>

                        <div
                            className={`post-content prose prose-lg md:prose-xl max-w-none leading-relaxed
              prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-10
              prose-p:opacity-90 prose-li:opacity-90
              prose-blockquote:border-black/30 prose-blockquote:bg-black/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
              ${post.textColor ? post.textColor.replace('text-', ' prose-headings:text-').replace('text-', ' prose-p:text-').replace('text-', ' prose-li:text-') : 'prose-invert'}
              `}
                            style={post.textColor ? {
                                ['--tw-prose-body' as string]: post.textColor,
                                ['--tw-prose-headings' as string]: post.textColor,
                                ['--tw-prose-links' as string]: post.textColor,
                            } : undefined}
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />

                        <div className="mt-16 pt-10 border-t border-black/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity ${post.textColor || 'text-white'}`}>
                                    <Share2 className="w-5 h-5" />
                                    Share Article
                                </button>
                            </div>
                            <div className="flex gap-4">
                                {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                                    <button key={platform} className={`text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity ${post.textColor || 'text-white'}`} style={{ opacity: 0.4 }}>
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar / CTA */}
                    <aside className="lg:col-span-4 space-y-10">
                        <div className="bg-[#FFF8E7] rounded-3xl p-8 sticky top-32 border border-black/5 shadow-xl">
                            <h3 className="text-2xl font-black mb-4 leading-tight text-black">
                                Want to grow your business like this?
                            </h3>
                            <p className="text-black/70 mb-8 leading-relaxed">
                                We've helped dozens of brands achieve similar results through
                                sophisticated marketing and automation systems.
                            </p>
                            <Link
                                href="/#footer-form"
                                className="block w-full text-center bg-[#F5A623] text-black font-extrabold py-4 rounded-2xl hover:bg-[#e09520] transition-colors transition-transform active:scale-95"
                            >
                                Get a Free Audit
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
            </div>

            <Footer />
        </main>
    );
}
