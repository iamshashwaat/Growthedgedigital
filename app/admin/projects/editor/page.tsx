"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Link as LinkIcon, Github } from "lucide-react";

function ProjectEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        category: "",
        link: "",
        github: "",
    });

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/projects");
            const projects = await res.json();
            const project = projects.find((p: any) => p.id === Number(id));
            if (project) setForm(project);
        } catch (error) {
            console.error("Failed to fetch project:", error);
        } finally {
            setLoading(false);
        }
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
            alert("Upload failed. Note: Uploads might not persist in production yet.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/projects", {
                method: id ? "PUT" : "POST",
                body: JSON.stringify(id ? { ...form, id: Number(id) } : form),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                alert("Failed to save project.");
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
                    <h1 className="text-2xl font-bold">{id ? "Edit Project" : "Create New Project"}</h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <label className="block">
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Project Title</span>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Category (e.g. Web Design)</span>
                                <input
                                    type="text"
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    required
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                />
                            </label>

                            <div className="grid grid-cols-1 gap-4">
                                <label className="block">
                                    <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623] flex items-center gap-2">
                                        <LinkIcon className="w-3 h-3" /> Live Link
                                    </span>
                                    <input
                                        type="url"
                                        value={form.link}
                                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623] flex items-center gap-2">
                                        <Github className="w-3 h-3" /> GitHub Link
                                    </span>
                                    <input
                                        type="url"
                                        value={form.github}
                                        onChange={(e) => setForm({ ...form, github: e.target.value })}
                                        placeholder="https://github.com/..."
                                        className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Project Cover</span>
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
                                        <span className="text-sm font-bold">Upload Showcase Image</span>
                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                )}
                            </div>
                            <p className="text-[10px] text-white/30 text-center">Note: Recommended aspect ratio 16:9</p>
                        </div>
                    </div>

                    <label className="block">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Project Description</span>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                            rows={6}
                            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623]/50 transition-all"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5A623] text-black font-bold rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Project"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function ProjectEditor() {
    return (
        <Suspense fallback={<div>Loading Editor...</div>}>
            <ProjectEditorContent />
        </Suspense>
    );
}
