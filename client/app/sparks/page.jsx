"use client";

// import { useState, useEffect } from "react";
// import MainLayout from "@/components/MainLayout";
import { useState, useEffect } from "react";
// import MainLayout from "@/components/MainLayout";
import MainLayout from "@/components/layout/MainLayout";
import { Zap, CloudRain, Brain } from "lucide-react";
import SparkCommentModal from "@/components/feed/SparkCommentModal";
export default function SparkFeed() {
    const uniqueMessages = [
        "Just shipped a new feature! The feeling of seeing your code in production is unmatched. 🚀",
        "Hot take: The best code is the code you don't have to write. Embrace simplicity!",
        "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
        "Taking a break from coding to enjoy nature. Sometimes the best debugging happens away from the screen. 🌲",
        "Reading 'Clean Code' again. Every time I read it, I find something new to improve in my work.",
        "Coffee + Code + Music = Perfect morning vibes ☕💻🎵",
        "Refactored 200 lines into 50. Feels like a personal victory! Less is more.",
        "Stuck on a bug for 3 hours. Took a walk. Solved it in 5 minutes. Never underestimate the power of stepping away.",
        "Started learning Rust today. The compiler is tough but fair. Excited for this journey!",
        "Pair programming session was incredibly productive today. Two heads are definitely better than one!",
        "Working out keeps my mind sharp for coding. Physical health = Mental health = Better code.",
        "TypeScript has changed how I write JavaScript. Type safety is a game changer!",
        "Deployed to prod on a Friday. Living dangerously! (Don't do this at home 😅)",
        "Documentation is love. Documentation is life. Future me will thank present me.",
        "Imposter syndrome is real, but so is your progress. Keep pushing forward! 💪",
        "The sunset today was absolutely stunning. Sometimes we need to look up from our screens. 🌅",
        "Code review feedback isn't personal. It's about making the product better. Grateful for good teammates!",
        "Automated tests saved me from a critical bug today. Write those tests, folks!",
        "Learning in public is intimidating but rewarding. Sharing my journey and loving the community support!",
        "Side project Sunday! Working on something exciting. Can't wait to share it with you all. 🎨"
    ];

    const [sparks, setSparks] = useState(
        Array.from({ length: 200 }).map((_, i) => ({
            _id: `${i + 1}`,
            user: {
                name: `User ${i + 1}`,
                handle: `@user${i + 1}`,
                avatar: `https://ui-avatars.com/api/?name=User+${i + 1}&background=random`
            },
            content: uniqueMessages[i % uniqueMessages.length],
            likes: Math.floor(Math.random() * 500),
            comments: Math.floor(Math.random() * 50),
            shares: Math.floor(Math.random() * 20),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
        }))
    );
    const [loading, setLoading] = useState(true);
    const [newSparkContent, setNewSparkContent] = useState("");
    const [selectedSpark, setSelectedSpark] = useState(null);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handlePostSpark = () => {
        if (!newSparkContent.trim()) return;

        const newSpark = {
            _id: `new-${Date.now()}`,
            user: {
                name: "You",
                handle: "@you",
                avatar: "https://ui-avatars.com/api/?name=You&background=random"
            },
            content: newSparkContent,
            likes: 0,
            comments: 0,
            shares: 0,
            createdAt: new Date().toISOString()
        };

        setSparks([newSpark, ...sparks]);
        setNewSparkContent("");
    };

    const handleInteraction = (id, type) => {
        if (type === 'comments') {
            const spark = sparks.find(s => s._id === id);
            if (spark) setSelectedSpark(spark);
            return;
        }

        setSparks(prevSparks => prevSparks.map(spark => {
            if (spark._id === id) {
                return { ...spark, [type]: spark[type] + 1 };
            }
            return spark;
        }));
    };

    const handleCommentSubmit = (sparkId) => {
        setSparks(prevSparks => prevSparks.map(spark => {
            if (spark._id === sparkId) {
                return { ...spark, comments: spark.comments + 1 };
            }
            return spark;
        }));
        setSelectedSpark(null);
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Sparks</h1>
                    <p className="text-slate-500">See what's happening right now.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 bg-slate-200 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/4" />
                                        <div className="h-4 bg-slate-200 rounded w-full" />
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=You&background=random" alt="You" className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="What's sparking?"
                                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-400"
                                        value={newSparkContent}
                                        onChange={(e) => setNewSparkContent(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handlePostSpark();
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                                        <div className="flex gap-2 text-indigo-500"></div>
                                        <button
                                            onClick={handlePostSpark}
                                            disabled={!newSparkContent.trim()}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Spark
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {sparks.map((spark) => (
                            <div key={spark._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                                        <img src={spark.user.avatar} alt={spark.user.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-slate-900">{spark.user.name}</span>
                                            <span className="text-slate-500">{spark.user.handle}</span>
                                        </div>
                                        <p className="text-slate-700 mb-4 leading-relaxed">{spark.content}</p>
                                        <div className="flex gap-6 text-slate-500">
                                            <button
                                                onClick={() => handleInteraction(spark._id, 'likes')}
                                                className="flex items-center gap-2 hover:text-yellow-500 transition-colors"
                                            >
                                                <Zap size={20} className="fill-current" />
                                                <span>{spark.likes}</span>
                                            </button>
                                            <button
                                                onClick={() => handleInteraction(spark._id, 'shares')}
                                                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                                            >
                                                <CloudRain size={20} />
                                                <span>{spark.shares}</span>
                                            </button>
                                            <button
                                                onClick={() => handleInteraction(spark._id, 'comments')}
                                                className="flex items-center gap-2 hover:text-indigo-500 transition-colors"
                                            >
                                                <Brain size={20} />
                                                <span>{spark.comments}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <SparkCommentModal
                spark={selectedSpark}
                isOpen={!!selectedSpark}
                onClose={() => setSelectedSpark(null)}
                onCommentSubmit={handleCommentSubmit}
            />
        </MainLayout>
    );
}
