import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = true, ...props }: GlassCardProps) => {
    return (
        <motion.div
            className={cn("glass-panel rounded-3xl p-6", className)}
            whileHover={hoverEffect ? { y: -4, boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.15)" } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
