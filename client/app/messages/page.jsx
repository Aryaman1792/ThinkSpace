"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatLayout from "@/components/chat/ChatLayout";

export default function MessagesPage() {
    const { isSignedIn, isLoaded } = useUser();

    // Redirect to sign-in if not authenticated
    if (isLoaded && !isSignedIn) {
        redirect("/sign-in");
    }

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <ChatLayout />
        </div>
    );
}
