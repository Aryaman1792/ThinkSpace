"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Bookmark, Grid } from "lucide-react";

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
    const tabs = [
        { id: "sparks", label: "My Sparks", icon: Zap },
        { id: "saved", label: "Saved Thoughts", icon: Bookmark },
        { id: "spaces", label: "Spaces", icon: Grid },
    ];

    return (
        <div className="flex items-center justify-center md:justify-start border-b border-indigo-100 mb-8">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-4 flex items-center gap-2 transition-colors ${
                            isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        <tab.icon size={20} />
                        <span className="font-medium">{tab.label}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ProfileTabs;
