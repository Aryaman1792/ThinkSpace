"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { fetchConversations } from "@/lib/chatApi";

const ChatLayout = () => {
    const { user } = useUser();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (user?.id) {
            loadConversations();
            // Poll for new conversations every 5 seconds
            const interval = setInterval(loadConversations, 5000);
            return () => clearInterval(interval);
        }
    }, [user?.id]);

    const loadConversations = async () => {
        try {
            const data = await fetchConversations(user.id);
            setConversations(data);
        } catch (error) {
            console.error("Failed to load conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
        setShowChat(true);
    };

    const handleBack = () => {
        setShowChat(false);
        setSelectedConversation(null);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Conversation List - Hidden on mobile when chat is open */}
            <div className={`${showChat ? "hidden md:flex" : "flex"} flex-shrink-0`}>
                <ConversationList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={handleSelectConversation}
                    loading={loading}
                />
            </div>

            {/* Chat Window - Hidden on mobile when no conversation selected */}
            <div className={`${showChat ? "flex" : "hidden md:flex"} flex-1`}>
                <ChatWindow
                    conversation={selectedConversation}
                    onBack={handleBack}
                />
            </div>
        </div>
    );
};

export default ChatLayout;
