"use client";

import React from "react";
import { Heart, MessageCircle, Share2, Music2 } from "lucide-react";

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

const VideoCard = ({ video }: { video: VideoProps }) => {
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
                        <ActionButton icon={Heart} count={video.likes} />
                        <ActionButton icon={MessageCircle} count={124} />
                        <ActionButton icon={Share2} count="Share" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, count }: { icon: any, count: number | string }) => (
    <button className="flex flex-col items-center gap-1 group">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-full group-hover:bg-white/40 transition-colors border border-white/20">
            <Icon size={28} className="text-white" />
        </div>
        <span className="text-xs font-medium text-white">{count}</span>
    </button>
);

export default VideoCard;
