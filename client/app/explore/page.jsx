"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, TrendingUp, Sparkles, Compass } from "lucide-react";

import { videoUrls, imageUrls } from "@/lib/content";

export default function Explore() {
    const [trendingPosts, setTrendingPosts] = useState(
        Array.from({ length: 30 }).map((_, i) => ({
            _id: `${i + 1}`,
            content: `This is trending post #${i + 1}. Exploring the beauty of ${i % 2 === 0 ? 'nature' : 'technology'} and creativity. #explore #life`,
            user: {
                name: `User ${i + 1}`,
                avatar: `https://ui-avatars.com/api/?name=User+${i + 1}&background=random`
            },
            likes: Math.floor(Math.random() * 500),
            createdAt: new Date().toISOString(),
            image: imageUrls[i % imageUrls.length]
        }))
    );
    const [recentSparks, setRecentSparks] = useState(
        Array.from({ length: 20 }).map((_, i) => ({
            _id: `${i + 1}`,
            description: `Fresh Spark #${i + 1} - Watch this!`,
            thumbnailUrl: imageUrls[(i + 10) % imageUrls.length], // Offset to be different from posts
            user: { name: `Sparker ${i + 1}` }
        }))
    );
    const [categories, setCategories] = useState([
        { id: "digital-art", name: "Digital Art", image: imageUrls[0] },
        { id: "tech", name: "Technology", image: imageUrls[1] },
        { id: "design", name: "Design", image: imageUrls[2] },
        { id: "music", name: "Music", image: imageUrls[3] },
        { id: "photography", name: "Photography", image: imageUrls[4] },
    ]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Enhanced search logic: Filter categories AND users from trending posts
    const suggestions = [
        ...categories.map(c => ({ type: 'category', ...c })),
        ...trendingPosts.map(p => ({ type: 'user', id: p.user.name, name: p.user.name, image: p.user.avatar, link: `/explore/post/${p._id}` }))
    ].filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/explore");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                // Robust image handling: Enforce fallbacks if API data is missing images
                if (data.trendingPosts?.length) {
                    setTrendingPosts(data.trendingPosts.map((post, i) => ({
                        ...post,
                        image: post.image || imageUrls[i % imageUrls.length],
                        user: {
                            ...post.user,
                            avatar: post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.name || 'User'}&background=random`
                        }
                    })));
                }
                if (data.recentSparks?.length) {
                    setRecentSparks(data.recentSparks.map((spark, i) => ({
                        ...spark,
                        thumbnailUrl: spark.thumbnailUrl || imageUrls[(i + 10) % imageUrls.length]
                    })));
                }
                if (data.categories?.length) {
                    setCategories(data.categories.map((cat, i) => ({
                        ...cat,
                        image: cat.image || imageUrls[i % imageUrls.length]
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch explore content, using fallbacks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 mb-4">
                        Explore the Universe
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover trending ideas, creative sparks, and communities that match your vibe.
                    </p>

                    {/* Google-like Search Bar */}
                    <div className="mt-8 max-w-2xl mx-auto relative z-50">
                        <div className={`relative flex items-center w-full bg-white rounded-full shadow-lg border transition-all duration-300 ${showSuggestions && searchQuery ? 'rounded-b-none rounded-t-3xl border-slate-200 shadow-xl' : 'border-transparent hover:shadow-xl'}`}>
                            <div className="pl-6 text-slate-400">
                                <Search className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search topics, users, or sparks..."
                                className="w-full py-4 px-4 bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 text-lg"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="p-2 mr-2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <span className="sr-only">Clear</span>
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && searchQuery && (
                            <div className="absolute top-full left-0 right-0 bg-white rounded-b-3xl shadow-xl border-t-0 border border-slate-200 overflow-hidden">
                                {suggestions.length > 0 ? (
                                    suggestions.map((suggestion, index) => (
                                        <Link
                                            key={`${suggestion.type}-${index}`}
                                            href={suggestion.type === 'category' ? `/explore/${suggestion.id}` : suggestion.link}
                                            className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                <img src={suggestion.image} alt="" className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                                                    {suggestion.name}
                                                </span>
                                                <span className="text-xs text-slate-400 capitalize">
                                                    {suggestion.type}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-6 py-4 text-slate-500 text-center">
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-16"
                    >
                        {/* Categories Grid */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Compass className="h-6 w-6 text-indigo-600" />
                                <h2 className="text-2xl font-bold text-slate-800">Browse Categories</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {categories.map((category) => (
                                    <motion.div key={category.id} variants={item}>
                                        <Link href={`/explore/${category.id}`}>
                                            <GlassCard className="h-40 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-white/40">
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors" />
                                                <h3 className="text-xl font-bold text-slate-700 group-hover:scale-110 transition-transform duration-300">
                                                    {category.name}
                                                </h3>
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Trending Posts */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="h-6 w-6 text-rose-500" />
                                <h2 className="text-2xl font-bold text-slate-800">Trending Now</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trendingPosts.map((post) => (
                                    <motion.div key={post._id} variants={item}>
                                        <Link href={`/explore/post/${post._id}`}>
                                            <GlassCard className="h-full hover:shadow-lg transition-all duration-300 border-white/40 cursor-pointer group">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                                                        {post.user?.avatar && <img src={post.user.avatar} alt={post.user.name} className="h-full w-full object-cover" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{post.user?.name || "Anonymous"}</p>
                                                        <p className="text-xs text-slate-500">{new Date(post.createdAt || Date.now()).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 line-clamp-3 mb-4">{post.content}</p>
                                                {post.image && (
                                                    <div className="mb-4 rounded-xl overflow-hidden h-40">
                                                        <img src={post.image} alt="Post content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between text-sm text-slate-500">
                                                    <span>{post.likes} Likes</span>
                                                    <span className="text-indigo-500 font-medium">Read more →</span>
                                                </div>
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Sparks */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="h-6 w-6 text-amber-500" />
                                <h2 className="text-2xl font-bold text-slate-800">Fresh Sparks</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {recentSparks.map((spark) => (
                                    <motion.div key={spark._id} variants={item}>
                                        <Link href="/sparks">
                                            <div className="aspect-[9/16] rounded-2xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                                                <img
                                                    src={spark.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80"}
                                                    alt="Spark thumbnail"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                                    <p className="text-white font-medium text-sm line-clamp-2">{spark.description}</p>
                                                </div>
                                                <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm rounded-full p-1.5">
                                                    <Sparkles className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
}

// Initialized explore structure
// Fixed trending photos
// Fixed fresh sparks photos
// Added search autocomplete
// Enhanced search UI
// Initialized explore structure
// Fixed trending photos
// Fixed fresh sparks photos
// Added search autocomplete
// Enhanced search UI