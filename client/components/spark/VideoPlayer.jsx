"use client";

import React from "react";
import { Zap, CloudRain, Brain, CornerUpRight, Music2 } from "lucide-react";

interface VideoProps {
    id: string;
    url: string;
    user: {
        name: string;
        image: string;
    };
    description: string;
    likes: number;
}

import PostDetailModal from "@/components/profile/PostDetailModal";
import { useState } from "react";

import { useInteractionLogic } from "@/hooks/useInteractionLogic";

const VideoCard = ({ video }: { video: VideoProps }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { counts, active, handleInteraction, setCounts } = useInteractionLogic({
        initialCounts: {
            spark: video.likes,
            dim: 12,
            thoughts: 124,
            spread: 89
        }
    });

    return (
        <div className="h-full w-full snap-start relative flex items-center justify-center bg-black">
            <video
                src={video.url}
                className="h-full w-full object-cover opacity-90"
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 flex flex-col justify-end p-6 md:p-8">
                <div className="flex items-end justify-between max-w-2xl mx-auto w-full">
                    <div className="mb-12 md:mb-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={video.user.image}
                                alt={video.user.name}
                                className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <h3 className="font-bold text-lg">{video.user.name}</h3>
                        </div>
                        <p className="text-lg font-medium mb-4 leading-relaxed max-w-md">{video.description}</p>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <Music2 size={16} />
                            <span>Original Audio - {video.user.name}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mb-20 md:mb-8">
                        <ActionButton
                            icon={Zap}
                            count={counts.spark}
                            label="Spark"
                            color="text-cyan-400"
                            isActive={active.spark}
                            onClick={() => handleInteraction("spark")}
                        />
                        <ActionButton
                            icon={CloudRain}
                            count={counts.dim}
                            label="Dim"
                            color="text-blue-400"
                            isActive={active.dim}
                            onClick={() => handleInteraction("dim")}
                        />
                        <ActionButton
                            icon={Brain}
                            count={counts.thoughts}
                            label="Thoughts"
                            color="text-pink-500"
                            onClick={() => handleInteraction("thoughts", () => setIsModalOpen(true))}
                        />
                        <ActionButton
                            icon={CornerUpRight}
                            count={counts.spread}
                            label="Spread"
                            color="text-green-400"
                            onClick={() => handleInteraction("spread")}
                        />
                    </div>
                </div>
            </div>

            <PostDetailModal
                post={{
                    ...video,
                    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", // Placeholder image for modal as video modal might be different, but using same modal for consistency
                    userImage: video.user.image,
                    user: video.user,
                    title: video.description,
                    stats: counts
                }}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCommentAdd={() => setCounts(prev => ({ ...prev, thoughts: prev.thoughts + 1 }))}
                onInteraction={(type, value) => {
                    setCounts(prev => ({ ...prev, [type]: value }));
                }}
            />
        </div>
    );
};

const ActionButton = ({ icon: Icon, count, label, color, onClick, isActive }: { icon: any, count: number | string, label: string, color: string, onClick?: () => void, isActive?: boolean }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 group"
    >
        <div className={`p-3 bg-white/10 backdrop-blur-md rounded-full transition-all duration-300 border border-white/10 ${isActive ? `bg-white/30 scale-110 ${color}` : 'group-hover:bg-white/20'}`}>
            <Icon size={28} className={`transition-colors ${isActive ? 'fill-current' : 'opacity-90'} ${isActive ? color : 'text-white'}`} />
        </div>
        <span className="text-xs font-bold text-white">{count}</span>
    </button>
);

export default VideoCard;
