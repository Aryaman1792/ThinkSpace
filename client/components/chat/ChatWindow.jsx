"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Loader2, MessageSquare } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { fetchMessages, sendMessage, markConversationAsRead } from "@/lib/chatApi";

const ChatWindow = ({ conversation, onBack }) => {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // Get other participant
    const otherParticipantId = conversation?.participants?.find(
        (p) => p !== user?.id
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (conversation?._id && user?.id) {
            loadMessages();
            // Mark conversation as read
            markConversationAsRead(conversation._id, user.id).catch(console.error);
        }
    }, [conversation?._id, user?.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async () => {
        try {
            setLoading(true);
            const data = await fetchMessages(conversation._id, user.id);
            setMessages(data);
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (content) => {
        if (!content.trim() || !user?.id) return;

        try {
            setSending(true);
            const newMessage = await sendMessage(
                conversation._id,
                user.id,
                content
            );
            setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setSending(false);
        }
    };

    if (!conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <MessageSquare size={64} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">
                        Your Messages
                    </h3>
                    <p className="text-slate-500">
                        Select a conversation to start chatting
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            <ChatHeader
                conversation={conversation}
                otherParticipant={{ name: `User ${otherParticipantId?.slice(-4)}` }}
                onBack={onBack}
            />

            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50"
            >
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-indigo-500" size={32} />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <MessageSquare size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500">No messages yet</p>
                            <p className="text-sm text-slate-400">
                                Send a message to start the conversation
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageBubble
                                key={message._id}
                                message={message}
                                isOwn={message.senderId === user?.id}
                                senderName={
                                    message.senderId === user?.id
                                        ? "You"
                                        : `User ${message.senderId?.slice(-4)}`
                                }
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <MessageInput onSend={handleSendMessage} disabled={sending} />
        </div>
    );
};

export default ChatWindow;
