"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Link as LinkIcon, Github, Plus, Image as ImageIcon, Video } from "lucide-react";

function ProjectEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        images: [] as string[],
        videos: [] as string[],
        category: "",
        link: "",
        github: "",
    });
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");

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
            if (project) {
                setForm({
                    ...project,
                    images: project.images || [],
                    videos: project.videos || [],
                });
            }
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
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
                setForm({ ...form, images: [...form.images, data.url] });
            }
        } catch (error) {
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const addImageUrl = () => {
        if (newImageUrl.trim()) {
            setForm({ ...form, images: [...form.images, newImageUrl.trim()] });
            setNewImageUrl("");
        }
    };

    const removeImage = (index: number) => {
        setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
    };

    const addVideoUrl = () => {
        if (newVideoUrl.trim()) {
            setForm({ ...form, videos: [...form.videos, newVideoUrl.trim()] });
            setNewVideoUrl("");
        }
    };

    const removeVideo = (index: number) => {
        setForm({ ...form, videos: form.videos.filter((_, i) => i !== index) });
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
            <div className="max-w-5xl mx-auto">
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

                <form onSubmit={handleSubmit} className="space-y-10">
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
                                        <span className="text-sm font-bold">Upload Cover Image</span>
                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                )}
                            </div>
                            <p className="text-[10px] text-white/30 text-center">Note: Cover image shown in project listings</p>
                        </div>
                    </div>

                    {/* Gallery Images Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623] flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> Gallery Images
                            </span>
                            <label className="flex items-center gap-2 px-3 py-1.5 bg-[#F5A623] text-black text-xs font-bold rounded-lg cursor-pointer hover:opacity-90 transition-all">
                                <Plus className="w-3 h-3" />
                                Upload
                                <input type="file" className="hidden" onChange={handleGalleryImageUpload} accept="image/*" />
                            </label>
                        </div>

                        {/* Add URL input */}
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                placeholder="Paste image URL..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5A623]/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={addImageUrl}
                                className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all"
                            >
                                Add URL
                            </button>
                        </div>

                        {/* Image Previews */}
                        {form.images.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                                {form.images.map((img, idx) => (
                                    <div key={idx} className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 p-1 bg-black/60 rounded-full hover:bg-red-500 transition-all"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {form.images.length === 0 && (
                            <p className="text-white/30 text-sm text-center py-4">No gallery images added yet</p>
                        )}
                    </div>

                    {/* Videos Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623] flex items-center gap-2">
                            <Video className="w-4 h-4" /> Video URLs (YouTube, Vimeo)
                        </span>

                        {/* Add URL input */}
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newVideoUrl}
                                onChange={(e) => setNewVideoUrl(e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5A623]/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={addVideoUrl}
                                className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all"
                            >
                                Add Video
                            </button>
                        </div>

                        {/* Video List */}
                        {form.videos.length > 0 && (
                            <div className="space-y-2">
                                {form.videos.map((vid, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                                        <Video className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                                        <span className="text-sm truncate flex-1">{vid}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeVideo(idx)}
                                            className="p-1 hover:bg-red-500/20 rounded transition-all flex-shrink-0"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {form.videos.length === 0 && (
                            <p className="text-white/30 text-sm text-center py-4">No videos added yet</p>
                        )}
                    </div>

                    <label className="block">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">Project Description</span>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                            rows={5}
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
