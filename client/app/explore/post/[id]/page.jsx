"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar, User } from "lucide-react";
import Link from "next/link";

export default function PostDetailPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/posts/${id}`);
                if (!res.ok) throw new Error("Post not found");
                const data = await res.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </MainLayout>
        );
    }

    if (error || !post) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Post not found</h1>
                    <Link href="/explore" className="text-indigo-600 hover:underline">
                        Return to Explore
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/explore" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Explore
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <GlassCard className="overflow-hidden">
                        {post.image && (
                            <div className="w-full h-96 relative mb-6 rounded-xl overflow-hidden">
                                <img
                                    src={post.image}
                                    alt="Post content"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                                {post.user?.avatar && (
                                    <img src={post.user.avatar} alt={post.user.name} className="h-full w-full object-cover" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">{post.user?.name || "Anonymous"}</h2>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    {post.category && (
                                        <>
                                            <span>•</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium capitalize">
                                                {post.category}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none mb-8">
                            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </p>
                        </div>

                        <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                            <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors">
                                <Heart className="h-6 w-6" />
                                <span className="font-medium">{post.likes || 0} Likes</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
                                <MessageCircle className="h-6 w-6" />
                                <span className="font-medium">{post.comments?.length || 0} Comments</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors ml-auto">
                                <Share2 className="h-6 w-6" />
                                <span className="font-medium">Share</span>
                            </button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </MainLayout>
    );
}
