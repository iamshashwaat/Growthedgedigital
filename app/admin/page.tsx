"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Home, LogOut } from "lucide-react";

export default function AdminDashboard() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setPosts(posts.filter((p) => p.id !== id));
            }
        } catch (error) {
            alert("Failed to delete post.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-6 md:px-12 md:pt-32">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-white/50">Manage your blog posts and content.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                        >
                            <Home className="w-4 h-4" />
                            Site Home
                        </Link>
                        <Link
                            href="/admin/editor"
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#F5A623] text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            New Post
                        </Link>
                        <button
                            onClick={() => {
                                document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                                window.location.href = "/admin/login";
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-8 w-8 border-4 border-[#F5A623] border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#F5A623]/30 transition-all"
                            >
                                <div className="relative h-40 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623] mb-2 block">
                                        {post.slug}
                                    </span>
                                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{post.title}</h3>
                                    <p className="text-white/40 text-sm line-clamp-2 mb-6">{post.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <Link
                                            href={`/admin/editor?id=${post.id}`}
                                            className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="flex items-center gap-2 text-sm font-medium text-red-500/70 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                <p className="text-white/30">No posts found. Start by creating one!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
