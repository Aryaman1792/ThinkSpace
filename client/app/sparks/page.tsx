import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VideoCard from "@/components/spark/VideoPlayer";

export default function SparkFeed() {
    const videos = [
        {
            id: "1",
            url: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
            user: {
                name: "Ocean Vibes",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
            },
            description: "Peaceful waves 🌊 #nature #relax",
            likes: 1200
        },
        {
            id: "2",
            url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
            user: {
                name: "Nature Lover",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
            },
            description: "Spring is here! 🌸 #flowers #spring",
            likes: 850
        }
    ];

    return (
        <MainLayout>
            <div className="fixed inset-0 z-50 bg-black md:static md:bg-transparent md:h-[calc(100vh-4rem)] md:rounded-3xl overflow-hidden">
                <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
