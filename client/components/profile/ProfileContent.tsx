"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { Zap, Users, UserPlus, Settings, Edit3 } from "lucide-react";
import ProfileTabs from "./ProfileTabs";
import PostGrid from "./PostGrid";

interface ProfileContentProps {
    user: {
        fullName: string | null;
        username: string | null;
        imageUrl: string;
        firstName: string | null;
    };
}

const ProfileContent = ({ user }: ProfileContentProps) => {
    const [activeTab, setActiveTab] = useState("sparks");

    return (
        <MainLayout>
            {/* Profile Header */}
            <div className="relative mb-8">
                {/* Cover Image */}
                <div className="h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg shadow-indigo-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400" />
                    <img
                        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80"
                        alt="Cover"
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                    />
                </div>

                {/* Profile Info Section */}
                <div className="px-6 md:px-12 relative">
                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 md:-mt-20 mb-6">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="p-1.5 bg-white/30 backdrop-blur-xl rounded-full">
                                <img
                                    src={user.imageUrl}
                                    alt={user.fullName || "User"}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover"
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full border-2 border-white shadow-md flex items-center gap-1.5">
                                <Zap size={12} className="fill-current" />
                                Thinker
                            </div>
                        </div>

                        {/* Stats - Now on the right side for desktop */}
                        <div className="hidden md:flex flex-1 justify-end items-end mb-4">
                            <div className="flex gap-12">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-slate-800">5.4k</span>
                                    <span className="text-sm text-slate-500 font-medium">Sparks</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-slate-800">1.2k</span>
                                    <span className="text-sm text-slate-500 font-medium">Thoughts</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-slate-800">3.5k</span>
                                    <span className="text-sm text-slate-500 font-medium">Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Details & Bio */}
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{user.fullName}</h1>
                                {/* Verified Badge */}
                                <svg className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 font-medium mb-4">@{user.username || user.firstName?.toLowerCase()}</p>
                            <p className="text-slate-700 max-w-lg leading-relaxed text-base">
                                Digital explorer & creator. Loving the anti-gravity vibes! ☁️✨
                                <br />
                                Building the future of thought sharing.
                            </p>

                            <div className="flex gap-4 mt-4 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
                                    <Zap size={16} /> 2 spaces
                                </span>
                                <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
                                    <Users size={16} /> 7 thinkers
                                </span>
                            </div>
                        </div>

                        {/* Mobile Stats */}
                        <div className="flex md:hidden justify-between border-t border-b border-indigo-100 py-4">
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

            {/* Content Area */}
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
