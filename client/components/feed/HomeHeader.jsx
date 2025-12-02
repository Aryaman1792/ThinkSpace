"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const HomeHeader = () => {
    return (
        <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3 mb-2">
                <motion.div
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                    }}
                >
                    <div className="p-2 bg-indigo-100 rounded-xl">
                        <Sparkles className="text-indigo-600 w-6 h-6" />
                    </div>
                </motion.div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                    Home Feed
                </h1>
            </div>
            <p className="text-slate-500 ml-1">Your daily dose of inspiration and thoughts.</p>

            <motion.div
                className="absolute -z-10 top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

export default HomeHeader;
