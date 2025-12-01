"use client";

import React, { useState } from 'react';
import { Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface CreatePostProps {
    onPostCreated: (post: any) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsLoading(true);
        try {
            // TODO: Get real user ID. For now, we'll fetch a random user or hardcode.
            // We'll fetch the first user from the API to use as the author.
            const usersRes = await fetch('http://localhost:5000/api/users'); // We might need to create this route or use existing
            // Wait, we don't have a specific users route listed in the file list earlier, let's check.
            // server/src/routes/userRoutes.js exists.

            // Assuming we can get a user. If not, we'll fail gracefully.
            // For this demo, let's try to get a user, or use a hardcoded fallback if we can't find one easily without auth.
            // Actually, let's just send a request and let the backend handle it or we need a userId.
            // The backend requires userId.

            // Let's fetch users first.
            // If we can't, we'll use a placeholder ID (which will likely fail validation if not real).
            // So we really need a real ID.

            // Temporary solution: Fetch all posts, take the user ID from the first post.
            const postsRes = await fetch('http://localhost:5000/api/posts');
            const postsData = await postsRes.json();
            const userId = postsData.posts[0]?.user?._id;

            if (!userId) {
                throw new Error('No user found to post as');
            }

            const res = await fetch('http://localhost:5000/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    userId,
                    type: 'thought' // Default to thought for text
                }),
            });

            if (!res.ok) throw new Error('Failed to create post');

            const newPost = await res.json();
            // The backend returns the post. We need to populate the user for the frontend to render it immediately.
            // The backend create route might not populate user.
            // We can manually construct the post object with the user details we have.

            const postWithUser = {
                ...newPost,
                user: postsData.posts[0].user // Re-use the user object
            };

            onPostCreated(postWithUser);
            setContent('');
            setIsExpanded(false);
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
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                            placeholder="Share your thoughts..."
                            className={`w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 resize-none transition-all duration-300 ${isExpanded ? 'h-32' : 'h-12'}`}
                        />
                    </div>
                </div>

                {isExpanded && (
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-indigo-50/30">
                        <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-full hover:bg-indigo-50/50"
                        >
                            <ImageIcon size={20} />
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading || !content.trim()}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    <span>Post</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </form>
        </GlassCard>
    );
}
