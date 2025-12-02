"use client";

import React, { useState } from "react";
import { Send, Smile } from "lucide-react";
import { motion } from "framer-motion";

const MessageInput = ({ onSend, disabled = false }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200">
            <div className="flex items-end gap-3">
                <button
                    type="button"
                    className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
                >
                    <Smile size={22} />
                </button>

                <div className="flex-1 relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message..."
                        disabled={disabled}
                        rows={1}
                        className="w-full px-4 py-2.5 bg-slate-100 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-[#72B7BF]/20 transition-all max-h-32 text-sm"
                        style={{
                            minHeight: "44px",
                            height: "auto",
                        }}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
                        }}
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 rounded-full transition-all ${message.trim() && !disabled
                        ? "bg-[#72B7BF] text-white hover:bg-[#5da3ab]"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    <Send size={20} />
                </motion.button>
            </div>
        </form>
    );
};

export default MessageInput;
