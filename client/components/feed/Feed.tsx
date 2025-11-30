"use client";

import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostProps {
    post: any;
}

const ThoughtCard = ({ post }: PostProps) => (
    <GlassCard className="mb-6">
        <div className="flex items-center gap-3 mb-4">
            <img src={post.user.image} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <h3 className="font-semibold text-slate-800">{post.user.name}</h3>
                <p className="text-xs text-slate-500">2h ago</p>
            </div>
        </div>
        <p className="text-lg text-slate-700 leading-relaxed mb-4 font-serif">
            {post.content}
        </p>
        <PostActions likes={post.likes} />
    </GlassCard>
);

const VisualCard = ({ post }: PostProps) => (
    <GlassCard className="mb-6 p-0 overflow-hidden">
        <div className="p-4 flex items-center gap-3">
            <img src={post.user.image} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <h3 className="font-semibold text-slate-800">{post.user.name}</h3>
                <p className="text-xs text-slate-500">4h ago</p>
            </div>
        </div>
        <div className="relative w-full aspect-[4/3] bg-slate-100">
            <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
            <p className="text-slate-700 mb-4">{post.caption}</p>
            <PostActions likes={post.likes} />
        </div>
    </GlassCard>
);

const PostActions = ({ likes }: { likes: number }) => (
    <div className="flex items-center gap-6 pt-2 border-t border-indigo-50">
        <button className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition-colors group">
            <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                <Heart size={20} className="group-hover:fill-current" />
            </div>
            <span className="text-sm font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors group">
            <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                <MessageCircle size={20} />
            </div>
            <span className="text-sm font-medium">45</span>
        </button>
        <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors group">
            <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                <Share2 size={20} />
            </div>
        </button>
    </div>
);

const Feed = ({ posts }: { posts: any[] }) => {
    return (
        <div className="max-w-xl mx-auto pb-20">
            {posts.map((post) => (
                <React.Fragment key={post._id}>
                    {post.type === 'thought' ? <ThoughtCard post={post} /> : <VisualCard post={post} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Feed;
