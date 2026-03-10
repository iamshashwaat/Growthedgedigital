"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        bgColor: "bg-[#F5A623]",
        textColor: "text-[#111111]",
        slug: "",
        content: "",
    });

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        const res = await fetch("/api/blog");
        const posts = await res.json();
        const post = posts.find((p: any) => p.id === Number(id));
        if (post) setForm(post);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setForm({ ...form, image: data.url });
            }
        } catch (error) {
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/blog", {
                method: id ? "PUT" : "POST",
                body: JSON.stringify(id ? { ...form, id: Number(id) } : form),
            });

            if (res.ok) {
                router.push("/admin");
            }
        } catch (error) {
            alert("Failed to save");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-6 md:px-12 md:pt-32">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">{id ? "Edit Post" : "Create New Post"}</h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Title</span>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Subtitle</span>
                                <input
                                    type="text"
                                    value={form.subtitle}
                                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Slug</span>
                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    required
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                />
                            </label>
                        </div>

                        <div className="space-y-4">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Cover Image</span>
                            <div className="relative mt-2 aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden flex items-center justify-center group">
                                {form.image ? (
                                    <>
                                        <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, image: "" })}
                                            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-all">
                                        <Upload className="w-8 h-8" />
                                        <span className="text-sm font-bold">Upload Image</span>
                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    <label className="block">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Description</span>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                            rows={3}
                            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                        />
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <label className="block">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Background Tailwind (e.g. bg-[#111])</span>
                            <input
                                type="text"
                                value={form.bgColor}
                                onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Text Color Tailwind (e.g. text-white)</span>
                            <input
                                type="text"
                                value={form.textColor}
                                onChange={(e) => setForm({ ...form, textColor: e.target.value })}
                                className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Markdown Content</span>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            required
                            rows={15}
                            placeholder="# Use Markdown here..."
                            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all font-mono"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Blog Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function BlogEditor() {
    return (
        <Suspense fallback={<div>Loading Editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}
