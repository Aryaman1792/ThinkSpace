"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { imageUrls } from "@/lib/content";

export default function ExplorePage() {
    const [trendingPosts, setTrendingPosts] = useState<any[]>(
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
    const [recentSparks, setRecentSparks] = useState<any[]>(
        Array.from({ length: 20 }).map((_, i) => ({
            _id: `${i + 1}`,
            description: `Fresh Spark #${i + 1} - Watch this!`,
            thumbnailUrl: imageUrls[(i + 10) % imageUrls.length],
            user: { name: `Sparker ${i + 1}` }
        }))
    );
    const [categories, setCategories] = useState<any[]>([
        { id: "digital-art", name: "Digital Art", image: imageUrls[0] },
        { id: "tech", name: "Technology", image: imageUrls[1] },
        { id: "design", name: "Design", image: imageUrls[2] },
        { id: "music", name: "Music", image: imageUrls[3] },
        { id: "photography", name: "Photography", image: imageUrls[4] },
    ]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = [
        ...categories.map(c => ({ type: 'category', ...c })),
        ...trendingPosts.map(p => ({ type: 'user', id: p.user.name, name: p.user.name, image: p.user.avatar, link: `/explore/post/${p._id}` }))
    ].filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/explore");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                if (data.trendingPosts?.length) {
                    setTrendingPosts(data.trendingPosts.map((post: any, i: number) => ({
                        ...post,
                        image: post.image || imageUrls[i % imageUrls.length],
                        user: {
                            ...post.user,
                            avatar: post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.name || 'User'}&background=random`
                        }
                    })));
                }
                if (data.recentSparks?.length) {
                    setRecentSparks(data.recentSparks.map((spark: any, i: number) => ({
                        ...spark,
                        thumbnailUrl: spark.thumbnailUrl || imageUrls[(i + 10) % imageUrls.length]
                    })));
                }
                if (data.categories?.length) {
                    setCategories(data.categories.map((cat: any, i: number) => ({
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
                    <div className="space-y-12">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="space-y-6">
                                <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-16">
                        <motion.section variants={container} initial="hidden" animate="show">
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="h-6 w-6 text-indigo-600" />
                                <h2 className="text-2xl font-bold text-slate-800">Browse Categories</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <motion.div key={category.id} variants={item}>
                                        <Link href={`/explore/${category.id}`}>
                                            <GlassCard className="relative h-48 overflow-hidden cursor-pointer group">
                                                <div className="absolute inset-0">
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                </div>
                                                <div className="relative h-full flex items-end p-6">
                                                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                                                </div>
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section variants={container} initial="hidden" animate="show">
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="h-6 w-6 text-pink-600" />
                                <h2 className="text-2xl font-bold text-slate-800">Trending Now</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trendingPosts.slice(0, 6).map((post) => (
                                    <motion.div key={post._id} variants={item}>
                                        <Link href={`/explore/post/${post._id}`}>
                                            <GlassCard className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow">
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={post.image}
                                                        alt=""
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <img src={post.user.avatar} alt="" className="h-8 w-8 rounded-full" />
                                                        <span className="font-medium text-slate-700">{post.user.name}</span>
                                                    </div>
                                                    <p className="text-slate-600 line-clamp-2">{post.content}</p>
                                                </div>
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section variants={container} initial="hidden" animate="show">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="h-6 w-6 text-amber-500" />
                                <h2 className="text-2xl font-bold text-slate-800">Fresh Sparks</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {recentSparks.slice(0, 8).map((spark) => (
                                    <motion.div key={spark._id} variants={item}>
                                        <Link href={`/sparks`}>
                                            <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative">
                                                <img
                                                    src={spark.thumbnailUrl}
                                                    alt=""
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
