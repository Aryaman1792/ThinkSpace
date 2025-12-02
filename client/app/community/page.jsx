"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Users, Plus, Search, TrendingUp, MessageCircle, User as UserIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommunityPage() {
    const { user } = useUser();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("groups");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const [groups, setGroups] = useState([
        { id: 1, name: "Tech Enthusiasts", members: 1234, posts: 567, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80" },
        { id: 2, name: "Design Lovers", members: 892, posts: 423, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80" },
        { id: 3, name: "Photography Club", members: 2341, posts: 1234, image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&q=80" },
        { id: 4, name: "Music Makers", members: 567, posts: 234, image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80" },
    ]);

    const topics = [
        { id: 1, title: "Best practices for React development", author: "John Doe", replies: 45, likes: 123 },
        { id: 2, title: "How to improve UI/UX design skills", author: "Jane Smith", replies: 32, likes: 89 },
        { id: 3, title: "Photography tips for beginners", author: "Mike Ross", replies: 67, likes: 234 },
        { id: 4, title: "Music production software recommendations", author: "Sarah Kim", replies: 28, likes: 76 },
    ];

    const handleCreateGroup = () => {
        if (groupName && groupDescription) {
            const newGroup = {
                id: Date.now(),
                name: groupName,
                members: 1,
                posts: 0,
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80",
            };
            setGroups([newGroup, ...groups]);
            setShowCreateModal(false);
            setGroupName("");
            setGroupDescription("");
            router.push(`/community/group/${newGroup.id}`);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-[#72B7BF] to-[#5da3ab] rounded-2xl">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-slate-800">Community</h1>
                                <p className="text-lg text-slate-600">Connect, share, and grow together</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            Create Group
                        </motion.button>
                    </div>
                </motion.div>

                <div className="mb-6 flex gap-4">
                    <button
                        onClick={() => setActiveTab("groups")}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            activeTab === "groups"
                                ? "bg-[#72B7BF] text-white shadow-lg"
                                : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        Groups
                    </button>
                    <button
                        onClick={() => setActiveTab("topics")}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            activeTab === "topics"
                                ? "bg-[#72B7BF] text-white shadow-lg"
                                : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        Topics
                    </button>
                </div>

                {activeTab === "groups" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group, idx) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <GlassCard className="hover:shadow-xl transition-all cursor-pointer group">
                                    <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                                        <img src={group.image} alt={group.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <h3 className="absolute bottom-3 left-3 text-white font-bold text-xl">{group.name}</h3>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                                        <div className="flex items-center gap-1">
                                            <UserIcon className="h-4 w-4" />
                                            <span>{group.members} members</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{group.posts} posts</span>
                                        </div>
                                    </div>
                                    <Link href={`/community/group/${group.id}`}>
                                        <button className="w-full py-2 bg-[#72B7BF] text-white rounded-xl hover:bg-[#5da3ab] transition-colors font-medium">
                                            Join Group
                                        </button>
                                    </Link>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {topics.map((topic, idx) => (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <GlassCard className="hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#72B7BF] transition-colors">
                                                {topic.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mb-3">by {topic.author}</p>
                                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle className="h-4 w-4" />
                                                    <span>{topic.replies} replies</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <TrendingUp className="h-4 w-4" />
                                                    <span>{topic.likes} likes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}

                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Create New Group</h3>
                            <input
                                type="text"
                                placeholder="Group Name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#72B7BF] focus:ring-2 focus:ring-[#72B7BF]/20 transition-all mb-4"
                            />
                            <textarea
                                placeholder="Group Description"
                                value={groupDescription}
                                onChange={(e) => setGroupDescription(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#72B7BF] focus:ring-2 focus:ring-[#72B7BF]/20 transition-all mb-4 h-32 resize-none"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateGroup}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                >
                                    Create
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
}
