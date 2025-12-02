"use client";

import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { Zap, Users, Settings } from "lucide-react";
import ProfileTabs from "./ProfileTabs";
import PostGrid from "./PostGrid";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const AnimatedCounter = ({ value, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseFloat(value);
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(value.includes('k') ? `${(start / 1000).toFixed(1)}k` : Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
            <motion.span
                className="block text-2xl font-bold text-slate-800"
                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {displayValue}
            </motion.span>
            <span className="text-sm text-slate-500 font-medium">{label}</span>
        </motion.div>
    );
};

const ProfileContent = ({ user }) => {
    const [activeTab, setActiveTab] = useState("sparks");
    const coverRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    return (
        <MainLayout>
            <div className="relative mb-8">
                <motion.div
                    ref={coverRef}
                    className="h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg shadow-teal-100 relative"
                    style={{ y, opacity }}
                >
                    <div className="absolute inset-0 bg-[#72B7BF]" />
                    <motion.img
                        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80"
                        alt="Cover"
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                        style={{ y: useTransform(scrollY, [0, 300], [0, -50]) }}
                    />
                </motion.div>

                <div className="px-6 md:px-12 relative">
                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 md:-mt-20 mb-6">
                        <motion.div
                            className="relative shrink-0"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        >
                            <motion.div
                                className="p-1.5 bg-white/30 backdrop-blur-xl rounded-full"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <img src={user.imageUrl} alt={user.fullName || "User"} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover" />
                            </motion.div>
                            <motion.div
                                className="absolute bottom-2 right-2 bg-[#72B7BF] text-white text-xs font-bold px-3 py-1.5 rounded-full border-2 border-white shadow-md flex items-center gap-1.5 overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                                animate={{
                                    boxShadow: [
                                        "0 4px 6px rgba(114, 183, 191, 0.3)",
                                        "0 8px 12px rgba(114, 183, 191, 0.5)",
                                        "0 4px 6px rgba(114, 183, 191, 0.3)",
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Zap size={12} className="fill-current" />
                                </motion.div>
                                Thinker
                            </motion.div>
                        </motion.div>

                        <div className="hidden md:flex flex-1 justify-end items-end mb-4">
                            <div className="flex gap-12">
                                <AnimatedCounter value="5.4k" label="Sparks" />
                                <AnimatedCounter value="1.2k" label="Thoughts" />
                                <AnimatedCounter value="3.5k" label="Followers" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{user.fullName}</h1>
                                <Zap size={20} className="text-blue-500 fill-current" />
                            </div>
                            <p className="text-slate-500 font-medium mb-4">@{user.username || user.firstName?.toLowerCase()}</p>
                            <p className="text-slate-700 max-w-lg leading-relaxed text-base">
                                Digital explorer & creator. Loving the anti-gravity vibes! ☁️✨<br />Building the future of thought sharing.
                            </p>

                            <div className="flex gap-4 mt-4 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1 hover:text-[#72B7BF] cursor-pointer transition-colors"><Zap size={16} /> 2 spaces</span>
                                <span className="flex items-center gap-1 hover:text-[#72B7BF] cursor-pointer transition-colors"><Users size={16} /> 7 thinkers</span>
                            </div>
                        </div>

                        <div className="flex md:hidden justify-between border-t border-b border-[#72B7BF]/20 py-4">
                            <div className="text-center">
                                <span className="block text-xl font-bold text-slate-800">5.4k</span>
                                <span className="text-sm text-slate-500 font-medium">Sparks</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl font-bold text-slate-800">1.2k</span>
                                <span className="text-sm text-slate-500 font-medium">Thoughts</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl font-bold text-slate-800">3.5k</span>
                                <span className="text-sm text-slate-500 font-medium">Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "sparks" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h2 className="text-xl font-bold text-slate-800">Latest posts</h2>
                        </div>
                        <PostGrid />
                    </div>
                )}

                {activeTab === "saved" && (
                    <div className="text-center py-20 text-slate-400 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Settings size={24} className="text-slate-400" />
                        </div>
                        <p>No saved thoughts yet.</p>
                    </div>
                )}

                {activeTab === "spaces" && (
                    <div className="text-center py-20 text-slate-400 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Settings size={24} className="text-slate-400" />
                        </div>
                        <p>No spaces created yet.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default ProfileContent;
