"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Hash, Compass, Sparkles, Heart, Music, Camera, Monitor, Palette } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
    const params = useParams();
    // Handle potential URL encoding or array (though [category] usually gives string)
    const category = Array.isArray(params.category) ? params.category[0] : params.category;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Specific data for each category
    const categoryData = {
        "digital-art": {
            title: "Digital Art",
            description: "Immerse yourself in the world of pixels, vectors, and digital masterpieces.",
            icon: <Palette className="h-8 w-8" />,
            gradient: "from-pink-500 to-rose-500"
        },
        "technology": {
            title: "Technology",
            description: "Discover the latest innovations, gadgets, and tech trends shaping our future.",
            icon: <Monitor className="h-8 w-8" />,
            gradient: "from-blue-500 to-cyan-500"
        },
        "design": {
            title: "Design",
            description: "Explore the principles of aesthetics, functionality, and creative problem-solving.",
            icon: <Compass className="h-8 w-8" />,
            gradient: "from-purple-500 to-indigo-500"
        },
        "music": {
            title: "Music",
            description: "Feel the rhythm and discover new sounds from artists around the globe.",
            icon: <Music className="h-8 w-8" />,
            gradient: "from-amber-500 to-orange-500"
        },
        "photography": {
            title: "Photography",
            description: "See the world through a different lens with stunning captures and visual stories.",
            icon: <Camera className="h-8 w-8" />,
            gradient: "from-emerald-500 to-teal-500"
        }
    };

    const currentCategory = categoryData[category] || {
        title: category?.replace(/-/g, " "),
        description: `Dive into the latest discussions, artwork, and sparks related to ${category?.replace(/-/g, " ")}.`,
        icon: <Hash className="h-8 w-8" />,
        gradient: "from-slate-500 to-slate-700"
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/explore/${category}`);
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();
                setPosts(data.posts || []);
            } catch (error) {
                console.error("Error fetching category posts:", error);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchPosts();
        }
    }, [category]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/explore" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Explore
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${currentCategory.gradient} text-white shadow-lg`}>
                            {currentCategory.icon}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-slate-800 capitalize">
                                {currentCategory.title}
                            </h1>
                            <p className="text-lg text-slate-600 mt-1">
                                {currentCategory.description}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-80 bg-slate-200 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <motion.div key={post._id} variants={item}>
                                    <Link href={`/explore/post/${post._id}`}>
                                        <GlassCard className="h-full hover:shadow-lg transition-all duration-300 border-white/40 flex flex-col group cursor-pointer">
                                            <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-slate-100">
                                                {post.image ? (
                                                    <img
                                                        src={post.image}
                                                        alt="Post content"
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                        <Hash className="h-12 w-12 opacity-20" />
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full capitalize">
                                                    {post.category || currentCategory.title}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                                                    {post.user?.avatar && (
                                                        <img src={post.user.avatar} alt={post.user.name} className="h-full w-full object-cover" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-slate-800">{post.user?.name || "Anonymous"}</p>
                                                    <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            <p className="text-slate-600 mb-4 text-sm line-clamp-3 flex-grow">{post.content}</p>

                                            <div className="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
                                                <div className="flex items-center gap-1">
                                                    <Heart className="h-4 w-4" />
                                                    <span>{post.likes || 0}</span>
                                                </div>
                                                <span className="text-indigo-600 font-medium group-hover:underline">Read more</span>
                                            </div>
                                        </GlassCard>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                No posts found in this category yet. Be the first to post!
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
}
