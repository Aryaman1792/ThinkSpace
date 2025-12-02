"use client";

import React, { useState, useEffect } from "react";
import { Zap, CloudRain, Brain, CornerUpRight } from "lucide-react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInteractionLogic } from "@/hooks/useInteractionLogic";

const AnimatedCounter = ({ value, color }) => {
    const spring = useSpring(value, { stiffness: 300, damping: 30 });
    const display = useTransform(spring, (latest) => Math.round(latest));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <motion.span
            className={cn("text-xs font-medium transition-colors", color)}
            key={value}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
            {display}
        </motion.span>
    );
};

const RippleEffect = ({ x, y }) => (
    <motion.span
        className="absolute rounded-full bg-current opacity-30"
        style={{ left: x, top: y }}
        initial={{ width: 0, height: 0, x: "-50%", y: "-50%" }}
        animate={{ width: 100, height: 100, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    />
);

const InteractionBar = ({
    initialCounts,
    onInteraction,
    onThoughtsClick,
    className,
    variant = "default",
    shareUrl,
    shareTitle
}) => {

    const { counts, active, handleInteraction } = useInteractionLogic({
        initialCounts,
        onInteraction,
        shareUrl,
        shareTitle
    });

    const [ripples, setRipples] = useState([]);

    const buttons = [
        {
            id: "spark",
            icon: Zap,
            label: "Spark",
            color: "text-cyan-400",
            activeColor: "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
            bgHover: "hover:bg-cyan-400/10"
        },
        {
            id: "dim",
            icon: CloudRain,
            label: "Dim",
            color: "text-blue-400",
            activeColor: "fill-blue-400 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]",
            bgHover: "hover:bg-blue-400/10"
        },
        {
            id: "thoughts",
            icon: Brain,
            label: "Thoughts",
            color: "text-pink-500",
            activeColor: "fill-pink-500 text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]",
            bgHover: "hover:bg-pink-500/10",
            onClick: onThoughtsClick
        },
        {
            id: "spread",
            icon: CornerUpRight,
            label: "Spread",
            color: "text-green-400",
            activeColor: "fill-green-400 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]",
            bgHover: "hover:bg-green-400/10"
        },
    ];

    const createRipple = (e, btnId) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { id: Date.now(), x, y, btnId };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
    };

    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {buttons.map((btn) => {
                const isActive = active[btn.id];
                const count = counts[btn.id];

                return (
                    <motion.button
                        key={btn.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            createRipple(e, btn.id);
                            handleInteraction(btn.id, btn.onClick);
                        }}
                        className={cn(
                            "flex items-center gap-1.5 transition-colors duration-200 group p-1.5 rounded-full relative overflow-hidden",
                            btn.bgHover
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence>
                            {ripples.filter(r => r.btnId === btn.id).map(ripple => (
                                <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
                            ))}
                        </AnimatePresence>

                        <motion.div
                            animate={isActive ? {
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.2, 1],
                            } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <btn.icon
                                size={variant === "minimal" ? 18 : 20}
                                className={cn(
                                    "transition-all duration-300",
                                    isActive ? btn.activeColor : "text-slate-400 group-hover:text-slate-600 group-hover:rotate-12"
                                )}
                            />
                        </motion.div>

                        <AnimatedCounter
                            value={count || 0}
                            color={isActive ? btn.color : "text-slate-500"}
                        />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default InteractionBar;
