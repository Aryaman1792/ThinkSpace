"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#FFFFC5] relative">
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
