"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const MessageBubble = ({ message, isOwn, senderName }) => {
    const formattedTime = formatDistanceToNow(new Date(message.createdAt), {
        addSuffix: true,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex mb-4 group",
                isOwn ? "justify-end" : "justify-start"
            )}
        >
            <div className={cn("max-w-[70%]", isOwn ? "items-end" : "items-start")}>
                {!isOwn && (
                    <p className="text-xs text-slate-500 mb-1 px-3">{senderName}</p>
                )}
                <div
                    className={cn(
                        "px-4 py-2.5 rounded-3xl break-words",
                        isOwn
                            ? "bg-[#72B7BF] text-white rounded-br-md"
                            : "bg-slate-100 text-slate-800 rounded-bl-md"
                    )}
                >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p
                    className={cn(
                        "text-xs text-slate-400 mt-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity",
                        isOwn ? "text-right" : "text-left"
                    )}
                >
                    {formattedTime}
                </p>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
