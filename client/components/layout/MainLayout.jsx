"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F0F9FF] relative">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl" />
            </div>

            <Sidebar />
            <Navbar />

            <main className="relative z-10 md:pl-[300px] min-h-screen pt-24 md:pt-0">
                <div className="max-w-7xl mx-auto p-6 md:p-8">
                    <div className="hidden md:flex justify-end mb-8">
                        <div className="glass-panel p-2 rounded-full">
                            <UserButton afterSignOutUrl="/sign-in" />
                        </div>
                    </div>

                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
