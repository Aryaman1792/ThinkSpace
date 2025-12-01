"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from "lucide-react";
import Link from "next/link";
import { imageUrls } from "@/lib/content";

export default function PostPage() {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<any[]>([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        // Simulate fetching post data
        const timer = setTimeout(() => {
            // Deterministic mock data based on ID
            const index = Math.max(0, (parseInt(id) || 1) - 1);
            const mockPost = {
                _id: id,
                content: `This is the detailed view of post #${id}. It explores the fascinating intersection of technology, art, and human connection. We are diving deep into what makes this topic so compelling. #explore #deepdive #insight`,
                user: {
                    name: `Creator ${id}`,
                    avatar: `https://ui-avatars.com/api/?name=Creator+${id}&background=random`
                },
                image: imageUrls[index % imageUrls.length],
                likes: Math.floor(Math.random() * 1000) + 50,
                createdAt: new Date().toISOString()
            };
            setPost(mockPost);
            setLikeCount(mockPost.likes);
            setComments([
                { id: 1, user: "Alice", text: "This is amazing!", avatar: "https://ui-avatars.com/api/?name=Alice&background=random" },
                { id: 2, user: "Bob", text: "Totally agree, great perspective.", avatar: "https://ui-avatars.com/api/?name=Bob&background=random" }
            ]);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [id]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: "You",
            text: commentText,
            avatar: "https://ui-avatars.com/api/?name=You&background=random"
        };

        setComments([...comments, newComment]);
        setCommentText("");
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/explore" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Explore
                </Link>

                {loading ? (
                    <div className="h-96 bg-slate-200 rounded-3xl animate-pulse" />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard className="overflow-hidden border-white/40">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={post.user.avatar} alt={post.user.name} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">{post.user.name}</h1>
                                    <p className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                                {post.content}
                            </p>

                            {/* Image */}
                            {post.image && (
                                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                                    <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-6 py-4 border-t border-slate-100 mb-6">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 ${isLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'} transition-colors`}
                                >
                                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                                    <span className="font-medium">{likeCount}</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
                                    <MessageCircle className="h-6 w-6" />
                                    <span className="font-medium">{comments.length}</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors ml-auto">
                                    <Share2 className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Comments Section */}
                            <div className="bg-slate-50/50 rounded-xl p-6">
                                <h3 className="font-bold text-slate-800 mb-4">Comments</h3>

                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                    {comments.map((comment: any) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                                                <img src={comment.avatar} alt={comment.user} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex-grow">
                                                <p className="text-xs font-bold text-slate-700 mb-1">{comment.user}</p>
                                                <p className="text-sm text-slate-600">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleCommentSubmit} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        className="w-full pl-4 pr-12 py-3 rounded-xl border-0 bg-white shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!commentText.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </form>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
}

