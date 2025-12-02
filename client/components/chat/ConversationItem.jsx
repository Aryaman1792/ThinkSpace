"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const ConversationItem = ({ conversation, isActive, onClick, currentUserId }) => {
    // Get other participant
    const otherParticipantId = conversation.participants?.find(
        (p) => p !== currentUserId
    );

    const lastMessageTime = conversation.lastMessageAt
        ? formatDistanceToNow(new Date(conversation.lastMessageAt), {
            addSuffix: false,
        })
        : "";

    // Check if there are unread messages
    const hasUnread = conversation.lastMessage?.readBy &&
        !conversation.lastMessage.readBy.includes(currentUserId);

    return (
        <motion.div
            whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)" }}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-4",
                isActive
                    ? "bg-[#72B7BF]/20 border-[#72B7BF]"
                    : "border-transparent hover:border-slate-200"
            )}
        >
            <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#72B7BF] flex items-center justify-center text-white font-semibold text-lg">
                    {`U${otherParticipantId?.slice(-2)}` || "U"}
                </div>
                {hasUnread && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-[#72B7BF] border-2 border-white rounded-full"></div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h4
                        className={cn(
                            "font-semibold truncate",
                            hasUnread ? "text-slate-900" : "text-slate-700"
                        )}
                    >
                        User {otherParticipantId?.slice(-4)}
                    </h4>
                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                        {lastMessageTime}
                    </span>
                </div>
                <p
                    className={cn(
                        "text-sm truncate",
                        hasUnread ? "text-slate-700 font-medium" : "text-slate-500"
                    )}
                >
                    {conversation.lastMessage?.content || "Start a conversation"}
                </p>
            </div>
        </motion.div>
    );
};

export default ConversationItem;
