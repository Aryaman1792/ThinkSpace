import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const GlassCard = ({ children, className, hoverEffect = true, ...props }) => {
    return (
        <motion.div
            className={cn(
                "glass-panel rounded-3xl p-6 relative overflow-hidden border border-white/20 shadow-xl backdrop-blur-xl bg-white/10",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
                className
            )}
            whileHover={hoverEffect ? {
                y: -4,
                boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.2)",
                scale: 1.01
            } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
