"use client";

import React, { useState } from "react";
import { X, MoreHorizontal, Send } from "lucide-react";
import InteractionBar from "@/components/ui/InteractionBar";

interface PostDetailModalProps {
    post: any;
    isOpen: boolean;
    onClose: () => void;
    onCommentAdd?: () => void;
    onInteraction?: (type: string, value: number) => void;
}

const PostDetailModal = ({ post, isOpen, onClose, onCommentAdd, onInteraction }: PostDetailModalProps) => {
    const [comment, setComment] = useState("");

    // Dummy comments
    const [comments, setComments] = useState([
        { id: 1, user: "art_lover", text: "This is absolutely stunning! 🎨", time: "2h" }
    ]);

    if (!isOpen || !post) return null;

    const handleSendComment = () => {
        if (!comment.trim()) return;
        setComments([...comments, { id: Date.now(), user: "you", text: comment, time: "now" }]);
        setComment("");
        if (onCommentAdd) onCommentAdd();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors md:hidden"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section (Left) */}
                        <div className="w-full md:w-[60%] h-[40vh] md:h-full bg-black flex items-center justify-center relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Details Section (Right) */}
                        <div className="w-full md:w-[40%] flex flex-col h-full bg-white">
                            {/* Header */}
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={post.userImage}
                                        alt={post.user}
                                        className="w-10 h-10 rounded-full border border-slate-200"
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-900">{post.user.name || post.user}</h3>
                                        <p className="text-xs text-slate-500">Original Spark</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-500">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Comments List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {/* Caption */}
                                <div className="flex gap-3 mb-6">
                                    <img
                                        src={post.userImage}
                                        alt={post.user}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm text-slate-800">
                                            <span className="font-bold mr-2">{post.user.name || post.user}</span>
                                            {post.title}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">2d ago</p>
                                    </div>
                                </div>

                                {/* Comments */}
                                {comments.map((c) => (
                                    <div key={c.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate-800">
                                                <span className="font-bold mr-2">{c.user}</span>
                                                {c.text}
                                            </p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-xs text-slate-400">{c.time}</span>
                                                <button className="text-xs text-slate-500 font-medium hover:text-slate-800">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-slate-100 bg-white">
                                <InteractionBar
                                    initialCounts={{
                                        spark: post.stats?.spark ?? post.likes ?? 0,
                                        dim: post.stats?.dim ?? post.dim ?? 0,
                                        thoughts: comments.length,
                                        spread: post.stats?.spread ?? post.spread ?? 0
                                    }}
                                    onInteraction={onInteraction}
                                />

                                <div className="mt-4 text-xs text-slate-400 font-medium uppercase tracking-wide">
                                    {post.likes} likes
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1">
                                    FEBRUARY 28
                                </div>

                                {/* Comment Input */}
                                <div className="mt-4 flex items-center gap-3 relative">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
                                        className="w-full bg-slate-50 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-1 focus:ring-indigo-200"
                                    />
                                    <button
                                        onClick={handleSendComment}
                                        className="absolute right-2 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostDetailModal;
