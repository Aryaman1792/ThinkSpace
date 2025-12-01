"use client";

import React, { useEffect } from "react";
import { Zap, CloudRain, Brain, Share2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import InteractionBar from "@/components/ui/InteractionBar";
import PostDetailModal from "@/components/profile/PostDetailModal";
import { usePostList } from "@/hooks/usePostList";
import CreatePost from "./CreatePost";

interface PostProps {
    _id: string;
    type: 'thought' | 'visual';
    user: {
        name: string;
        image: string;
    };
    content?: string;
    image?: string;
    caption?: string;
    likes: number;
    dim?: number;
    thoughts?: number;
    spread?: number;
    createdAt: string;
    onInteraction?: (type: string, value: number) => void;
}

const ThoughtCard = ({ post, onInteraction, onThoughtsClick }: { post: PostProps, onInteraction: any, onThoughtsClick: () => void }) => (
    <GlassCard className="mb-6 hover:bg-white/40 transition-all duration-300 border-l-4 border-l-indigo-400">
        <div className="flex items-start gap-4">
            <img src={post.user.image} alt={post.user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-slate-800">{post.user.name}</h3>
                        <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString('en-US')}</p>
                    </div>
                </div>
                <p
                    className="mt-2 text-slate-700 leading-relaxed text-lg cursor-pointer hover:text-indigo-900 transition-colors"
                    onClick={onThoughtsClick}
                >
                    {post.content}
                </p>

                <div className="mt-4 pt-4 border-t border-indigo-50">
                    <InteractionBar
                        initialCounts={{
                            spark: post.likes,
                            dim: post.dim || 0,
                            thoughts: post.thoughts || 0,
                            spread: post.spread || 0
                        }}
                        onInteraction={(type, value) => onInteraction(post._id, type, value)}
                        onThoughtsClick={onThoughtsClick}
                        shareUrl={`/explore/post/${post._id}`}
                        shareTitle={`Check out this thought by ${post.user.name} on ThinkSpace`}
                    />
                </div>
            </div>
        </div>
    </GlassCard>
);

const VisualCard = ({ post, onInteraction, onThoughtsClick }: { post: PostProps, onInteraction: any, onThoughtsClick: () => void }) => (
    <GlassCard className="mb-6 overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
        <div className="relative aspect-video w-full overflow-hidden">
            <img src={post.image} alt="Visual" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                <img src={post.user.image} alt={post.user.name} className="w-6 h-6 rounded-full border border-white" />
                <span className="text-white text-sm font-medium">{post.user.name}</span>
            </div>
        </div>
        <div className="p-5">
            <p
                className="text-slate-700 mb-4 font-medium cursor-pointer hover:text-indigo-900 transition-colors"
                onClick={onThoughtsClick}
            >
                {post.caption}
            </p>
            <InteractionBar
                initialCounts={{
                    spark: post.likes,
                    dim: post.dim || 0,
                    thoughts: post.thoughts || 0,
                    spread: post.spread || 0
                }}
                onInteraction={(type, value) => onInteraction(post._id, type, value)}
                onThoughtsClick={onThoughtsClick}
                shareUrl={`/explore/post/${post._id}`}
                shareTitle={`Check out this visual by ${post.user.name} on ThinkSpace`}
            />
        </div>
    </GlassCard>
);


export default function Feed({ initialPosts }: { initialPosts: any[] }) {
    const { posts, setPosts, selectedPost, setSelectedPost, updatePostStats, incrementThoughts } = usePostList(initialPosts);

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const handlePostCreated = (newPost: any) => {
        setPosts(prev => [newPost, ...prev]);
    };

    const handleCommentAdd = () => {
        if (!selectedPost) return;
        incrementThoughts(selectedPost._id);
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <CreatePost onPostCreated={handlePostCreated} />
            {posts?.map((post) => (
                <div key={post._id}>
                    {post.type === 'thought' ?
                        <ThoughtCard
                            post={post}
                            onInteraction={updatePostStats}
                            onThoughtsClick={() => setSelectedPost(post)}
                        /> :
                        <VisualCard
                            post={post}
                            onInteraction={updatePostStats}
                            onThoughtsClick={() => setSelectedPost(post)}
                        />
                    }
                </div>
            ))}

            <PostDetailModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                onCommentAdd={handleCommentAdd}
                onInteraction={(type, value) => selectedPost && updatePostStats(selectedPost._id, type, value)}
            />
        </div>
    );
}
