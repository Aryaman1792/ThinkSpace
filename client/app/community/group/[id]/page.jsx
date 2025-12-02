"use client";

import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Users, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function GroupChatPage() {
    const { id } = useParams();
    const { user } = useUser();
    const [messages, setMessages] = useState([
        { id: 1, user: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random", text: "Welcome to the group!", time: "10:30 AM" },
        { id: 2, user: "Jane Smith", avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random", text: "Hey everyone! Excited to be here", time: "10:32 AM" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const groupNames = {
        1: "Tech Enthusiasts",
        2: "Design Lovers",
        3: "Photography Club",
        4: "Music Makers",
    };

    const groupName = groupNames[id] || `Group ${id}`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                user: user?.fullName || "You",
                avatar: user?.imageUrl || "https://ui-avatars.com/api/?name=You&background=random",
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true,
            };
            setMessages([...messages, message]);
            setNewMessage("");
        }
    };

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-100px)]">
                <div className="flex flex-col h-full">
                    <div className="mb-4">
                        <Link href="/community" className="inline-flex items-center text-slate-500 hover:text-[#72B7BF] transition-colors mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Community
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-[#72B7BF] to-[#5da3ab] rounded-2xl">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">{groupName}</h1>
                                <p className="text-sm text-slate-500">1,234 members online</p>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                                >
                                    <img src={message.avatar} alt={message.user} className="h-10 w-10 rounded-full flex-shrink-0" />
                                    <div className={`flex flex-col ${message.isOwn ? 'items-end' : ''}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-slate-700">{message.user}</span>
                                            <span className="text-xs text-slate-400">{message.time}</span>
                                        </div>
                                        <div className={`px-4 py-2 rounded-2xl max-w-md ${
                                            message.isOwn 
                                                ? 'bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] text-white' 
                                                : 'bg-slate-100 text-slate-800'
                                        }`}>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                                >
                                    <ImageIcon className="h-5 w-5 text-slate-600" />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#72B7BF] focus:ring-2 focus:ring-[#72B7BF]/20 transition-all"
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] text-white rounded-xl hover:shadow-lg transition-all"
                                >
                                    <Send className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </form>
                    </GlassCard>
                </div>
            </div>
        </MainLayout>
    );
}
