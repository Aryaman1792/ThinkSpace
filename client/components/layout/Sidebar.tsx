"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Zap, Compass, ShoppingBag, User, Settings, LogOut, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";

const Sidebar = () => {
    const pathname = usePathname();
    const { isSignedIn, user } = useUser();

    const navItems = [
        { id: "/", icon: Home, label: "Home" },
        { id: "/sparks", icon: Zap, label: "Spark Feed" },
        { id: "/explore", icon: Compass, label: "Explore" },
        { id: "/market", icon: ShoppingBag, label: "Marketplace" },
        { id: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <aside className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col z-50">
            <motion.div
                className="glass-panel rounded-3xl p-4 flex flex-col gap-2 min-w-[240px]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="px-4 py-4 mb-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        ThinkSpace
                    </h1>
                </div>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.id;
                        return (
                            <Link key={item.id} href={item.id}>
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                    isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                                )}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full"
                                        />
                                    )}
                                    <item.icon size={22} className={cn("relative z-10", isActive && "fill-current")} />
                                    <span className="font-medium relative z-10">{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-4 pt-4 border-t border-indigo-100/50 flex flex-col gap-1">
                    {isSignedIn ? (
                        <>
                            <Link href="/settings">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-slate-800 hover:bg-white/40 transition-all">
                                    <Settings size={22} />
                                    <span className="font-medium">Settings</span>
                                </div>
                            </Link>

                            <SignOutButton>
                                <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all w-full text-left">
                                    <LogOut size={22} />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                    <LogIn size={22} />
                                    <span className="font-medium">Sign In</span>
                                </div>
                            </Link>

                            <Link href="/sign-up">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-all">
                                    <UserPlus size={22} />
                                    <span className="font-medium">Sign Up</span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>
        </aside>
    );
};

export default Sidebar;
