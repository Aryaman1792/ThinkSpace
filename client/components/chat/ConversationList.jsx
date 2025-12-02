"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Search, Edit, Loader2, MessageSquare } from "lucide-react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({
    conversations,
    selectedConversation,
    onSelectConversation,
    loading,
}) => {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConversations = conversations.filter((conv) => {
        // For now, just return all conversations
        // In the future, we can filter by participant name
        return true;
    });

    return (
        <div className="w-full md:w-96 border-r border-slate-200 bg-white flex flex-col">
            {/* Header */}
            <div className="px-4 py-5 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">Messages</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                    >
                        <Edit size={20} />
                    </motion.button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#72B7BF]/20 transition-all"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-[#72B7BF]" size={32} />
                    </div>
                ) : filteredConversations.length === 0 ? (
                    <div className="flex items-center justify-center h-full px-6">
                        <div className="text-center">
                            <MessageSquare size={48} className="mx-auto text-slate-300 mb-3" />
                            <h3 className="font-semibold text-slate-600 mb-1">
                                No conversations yet
                            </h3>
                            <p className="text-sm text-slate-500">
                                Start a new conversation to get started
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredConversations.map((conversation) => (
                            <ConversationItem
                                key={conversation._id}
                                conversation={conversation}
                                isActive={selectedConversation?._id === conversation._id}
                                onClick={() => onSelectConversation(conversation)}
                                currentUserId={user?.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationList;
