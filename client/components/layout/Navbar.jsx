"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Zap, Compass, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { id: "/", icon: Home, label: "Home" },
        { id: "/sparks", icon: Zap, label: "Spark Feed" },
        { id: "/explore", icon: Compass, label: "Explore" },
        { id: "/market", icon: ShoppingBag, label: "Marketplace" },
        { id: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 md:hidden p-4">
                <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        ThinkSpace
                    </h1>

                    <div className="flex items-center gap-4">
                        <UserButton afterSignOutUrl="/sign-in" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full hover:bg-white/50 transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/90 backdrop-blur-3xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.id;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.id}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-4 p-4 rounded-2xl transition-all",
                                            isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-500"
                                        )}>
                                            <item.icon size={24} />
                                            <span className="text-lg font-medium">{item.label}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
