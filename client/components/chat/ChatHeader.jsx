"use client";

import React from "react";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { motion } from "framer-motion";

const ChatHeader = ({ conversation, otherParticipant, onBack }) => {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-4">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#72B7BF] flex items-center justify-center text-white font-semibold">
                            {otherParticipant?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-800">
                            {otherParticipant?.name || "User"}
                        </h3>
                        <p className="text-xs text-slate-500">Active now</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                >
                    <Phone size={20} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                >
                    <Video size={20} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                >
                    <MoreVertical size={20} />
                </motion.button>
            </div>
        </div>
    );
};

export default ChatHeader;
