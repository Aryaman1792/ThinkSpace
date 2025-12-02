"use client";

import React, { useState } from 'react';
import { Send, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const maxChars = 500;
    const charCount = content.length;
    const charPercentage = (charCount / maxChars) * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsLoading(true);
        try {
            const postsRes = await fetch('http://localhost:5001/api/posts');
            const postsData = await postsRes.json();
            const userId = postsData.posts[0]?.user?._id;

            if (!userId) {
                throw new Error('No user found to post as');
            }

            const res = await fetch('http://localhost:5001/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    userId,
                    type: 'thought'
                }),
            });

            if (!res.ok) throw new Error('Failed to create post');

            const newPost = await res.json();
            const postWithUser = {
                ...newPost,
                user: postsData.posts[0].user
            };

            onPostCreated(postWithUser);
            setContent('');
            setIsExpanded(false);

            // Show success animation
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="mb-8 transition-all duration-300">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <motion.textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                            placeholder="Share your thoughts..."
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 resize-none transition-all duration-300"
                            animate={{
                                height: isExpanded ? 128 : 48,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="mt-4 pt-4 border-t border-[#72B7BF]/30"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <motion.button
                                        type="button"
                                        className="p-2 text-slate-400 hover:text-[#72B7BF] transition-colors rounded-full hover:bg-[#72B7BF]/10"
                                        whileHover={{ scale: 1.1, rotate: 15 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ImageIcon size={20} />
                                    </motion.button>

                                    {/* Character count */}
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="relative w-8 h-8"
                                            animate={{
                                                scale: charPercentage > 90 ? [1, 1.1, 1] : 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: charPercentage > 90 ? Infinity : 0,
                                            }}
                                        >
                                            <svg className="w-8 h-8 transform -rotate-90">
                                                <circle
                                                    cx="16"
                                                    cy="16"
                                                    r="14"
                                                    stroke="#e2e8f0"
                                                    strokeWidth="2"
                                                    fill="none"
                                                />
                                                <motion.circle
                                                    cx="16"
                                                    cy="16"
                                                    r="14"
                                                    stroke={charPercentage > 90 ? "#ef4444" : "#72B7BF"}
                                                    strokeWidth="2"
                                                    fill="none"
                                                    strokeDasharray={87.96}
                                                    initial={{ strokeDashoffset: 87.96 }}
                                                    animate={{
                                                        strokeDashoffset: 87.96 - (87.96 * charPercentage / 100)
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </svg>
                                            <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${charPercentage > 90 ? 'text-red-500' : 'text-slate-500'}`}>
                                                {maxChars - charCount}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading || !content.trim() || charCount > maxChars}
                                    className="flex items-center gap-2 px-6 py-2 bg-[#72B7BF] text-white rounded-full font-medium hover:bg-[#5da3ab] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-200 relative overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={!isLoading && content.trim() ? {
                                        boxShadow: [
                                            "0 4px 6px -1px rgba(114, 183, 191, 0.1)",
                                            "0 10px 15px -3px rgba(114, 183, 191, 0.3)",
                                            "0 4px 6px -1px rgba(114, 183, 191, 0.1)",
                                        ]
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <Loader2 size={18} className="animate-spin" />
                                            </motion.div>
                                        ) : showSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <CheckCircle size={18} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="default"
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <span>Post</span>
                                                <Send size={18} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </GlassCard>
    );
}
