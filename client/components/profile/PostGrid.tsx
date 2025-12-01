import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Zap, CloudRain, Brain, CornerUpRight } from "lucide-react";
import PostDetailModal from "./PostDetailModal";
import InteractionBar from "@/components/ui/InteractionBar";

import { usePostList } from "@/hooks/usePostList";

const PostGrid = () => {
    const { posts, selectedPost, setSelectedPost, updatePostStats, incrementThoughts } = usePostList([
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
            title: "The Future of Digital Art",
            user: "PixelMind",
            userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
            stats: { spark: 1200, dim: 50, thoughts: 3, spread: 89 },
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
            title: "Why I'm Bullish on AI Art",
            user: "PixelMind",
            userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
            stats: { spark: 850, dim: 12, thoughts: 15, spread: 45 },
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
            title: "Exploring the Metaverse",
            user: "PixelMind",
            userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
            stats: { spark: 2300, dim: 8, thoughts: 42, spread: 156 },
        }
    ]);

    const handleCommentAdd = () => {
        if (!selectedPost) return;
        incrementThoughts(selectedPost.id);
    };

    const handleInteraction = (postId: number, type: string, value: number) => {
        updatePostStats(postId, type, value);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <GlassCard
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="group relative aspect-[4/3] overflow-hidden cursor-pointer rounded-3xl border-0 shadow-md"
                    >
                        <img
                            src={post.image}
                            alt="Post"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-center gap-2 mb-2 opacity-80">
                                <img src={post.userImage} alt={post.user} className="w-6 h-6 rounded-full border border-white/50" />
                                <span className="text-xs font-medium">{post.user}</span>
                            </div>
                            <h3 className="text-lg font-bold leading-tight mb-3">{post.title}</h3>

                            <div className="flex items-center gap-4 text-sm opacity-80">
                                <div className="flex items-center gap-1.5">
                                    <Zap size={16} className="fill-white/20" />
                                    <span>{post.stats.spark}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CloudRain size={16} className="fill-white/20" />
                                    <span>{post.stats.dim}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Brain size={16} className="fill-white/20" />
                                    <span>{post.stats.thoughts}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CornerUpRight size={16} className="fill-white/20" />
                                    <span>{post.stats.spread}</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <PostDetailModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                onCommentAdd={handleCommentAdd}
                onInteraction={(type, value) => selectedPost && handleInteraction(selectedPost.id, type, value)}
            />
        </>
    );
};

export default PostGrid;
