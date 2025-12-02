"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const StoryViewer = ({ story, onClose, onNext, onPrev }) => {
    const [progress, setProgress] = useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    onNext();
                    return 0;
                }
                return prev + 2;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white">
                <X className="h-8 w-8" />
            </button>

            <div className="absolute top-4 left-4 right-4 flex gap-1 z-40">
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="absolute top-12 left-4 flex items-center gap-3 z-40">
                <img src={story.user.avatar} alt={story.user.name} className="w-10 h-10 rounded-full border-2 border-white" />
                <span className="text-white font-medium">{story.user.name}</span>
                <span className="text-white/70 text-sm">{story.time}</span>
            </div>

            <div className="relative w-full max-w-md h-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <img src={story.image} alt="Story" className="w-full h-full object-contain" />
            </div>

            <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl">‹</button>
            <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl">›</button>
        </motion.div>
    );
};

const Stories = () => {
    const { user } = useUser();
    const [selectedStory, setSelectedStory] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [userStories, setUserStories] = useState([]);

    const defaultStories = [
        {
            id: 2,
            user: { name: "Alex Chen", avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random" },
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
            time: "3h ago",
        },
        {
            id: 3,
            user: { name: "Sarah Kim", avatar: "https://ui-avatars.com/api/?name=Sarah+Kim&background=random" },
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
            time: "5h ago",
        },
        {
            id: 4,
            user: { name: "Mike Ross", avatar: "https://ui-avatars.com/api/?name=Mike+Ross&background=random" },
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
            time: "8h ago",
        },
    ];

    const stories = userStories.length > 0 ? [userStories[userStories.length - 1], ...defaultStories] : defaultStories;

    const handleNext = () => {
        const currentIndex = stories.findIndex((s) => s.id === selectedStory?.id);
        if (currentIndex < stories.length - 1) {
            setSelectedStory(stories[currentIndex + 1]);
        } else {
            setSelectedStory(null);
        }
    };

    const handlePrev = () => {
        const currentIndex = stories.findIndex((s) => s.id === selectedStory?.id);
        if (currentIndex > 0) {
            setSelectedStory(stories[currentIndex - 1]);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleShareStory = () => {
        if (uploadedImage) {
            const newStory = {
                id: Date.now(),
                user: { 
                    name: user?.fullName || "You", 
                    avatar: user?.imageUrl || "https://ui-avatars.com/api/?name=You" 
                },
                image: uploadedImage,
                time: "Just now",
                isOwn: true,
            };
            setUserStories([...userStories, newStory]);
            setUploadedImage(null);
            setShowUpload(false);
        }
    };

    return (
        <>
            <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-2">
                    {userStories.length > 0 ? (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() => setSelectedStory(userStories[userStories.length - 1])}
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#72B7BF] via-[#5da3ab] to-[#72B7BF] p-[3px]">
                                <div className="w-full h-full rounded-full bg-white p-[2px]">
                                    <img src={user?.imageUrl || "https://ui-avatars.com/api/?name=You"} alt="Your story" className="w-full h-full rounded-full object-cover" />
                                </div>
                            </div>
                            <p className="text-xs text-center mt-2 text-slate-600 font-medium">Your Story</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() => setShowUpload(true)}
                        >
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#72B7BF] to-[#5da3ab] p-[3px]">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                        <img src={user?.imageUrl || "https://ui-avatars.com/api/?name=You"} alt="Your story" className="w-full h-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#72B7BF] rounded-full flex items-center justify-center border-2 border-white">
                                    <Plus className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-center mt-2 text-slate-600 font-medium">Your Story</p>
                        </motion.div>
                    )}

                    {defaultStories.map((story) => (
                        <motion.div
                            key={story.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() => setSelectedStory(story)}
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#72B7BF] via-[#5da3ab] to-[#72B7BF] p-[3px]">
                                <div className="w-full h-full rounded-full bg-white p-[2px]">
                                    <img src={story.user.avatar} alt={story.user.name} className="w-full h-full rounded-full object-cover" />
                                </div>
                            </div>
                            <p className="text-xs text-center mt-2 text-slate-600 font-medium truncate w-20">{story.user.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedStory && (
                    <StoryViewer
                        story={selectedStory}
                        onClose={() => setSelectedStory(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showUpload && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                        onClick={() => setShowUpload(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-slate-800">Add to Story</h3>
                                <button onClick={() => { setShowUpload(false); setUploadedImage(null); }}>
                                    <X className="h-6 w-6 text-slate-600" />
                                </button>
                            </div>
                            
                            {uploadedImage ? (
                                <div className="relative rounded-xl overflow-hidden mb-4">
                                    <img src={uploadedImage} alt="Preview" className="w-full h-64 object-cover" />
                                    <button 
                                        onClick={() => setUploadedImage(null)}
                                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                                    >
                                        <X className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-[#72B7BF] transition-colors cursor-pointer block">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <Plus className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                                    <p className="text-slate-600">Click to upload image</p>
                                    <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
                                </label>
                            )}
                            
                            <button 
                                onClick={handleShareStory}
                                disabled={!uploadedImage}
                                className="w-full mt-4 py-3 bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Share Story
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Stories;
