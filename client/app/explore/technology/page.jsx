"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Heart } from "lucide-react";
import Link from "next/link";
import { imageUrls } from "@/lib/content";

export default function TechnologyPage() {
    const [posts] = useState(
        Array.from({ length: 12 }).map((_, i) => ({
            _id: `tech-${i}`,
            content: `Latest tech innovations and breakthrough discoveries #${i + 1}`,
            user: { name: `Tech Expert ${i + 1}`, avatar: `https://ui-avatars.com/api/?name=Tech+${i + 1}&background=random` },
            image: imageUrls[(i + 3) % imageUrls.length],
            likes: Math.floor(Math.random() * 800),
        }))
    );

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/explore" className="inline-flex items-center text-slate-500 hover:text-[#72B7BF] transition-colors mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Explore
                </Link>

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#72B7BF] to-[#5da3ab] text-white shadow-lg">
                            <Cpu className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-slate-800">Technology</h1>
                            <p className="text-lg text-slate-600">Discover the latest tech trends and innovations</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, idx) => (
                        <motion.div key={post._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                            <GlassCard className="h-full hover:shadow-xl transition-all cursor-pointer group">
                                <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                                    <img src={post.image} alt="Tech" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={post.user.avatar} alt={post.user.name} className="h-8 w-8 rounded-full" />
                                    <p className="font-semibold text-sm text-slate-800">{post.user.name}</p>
                                </div>
                                <p className="text-slate-600 mb-4 text-sm">{post.content}</p>
                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                    <Heart className="h-4 w-4" />
                                    <span>{post.likes}</span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
