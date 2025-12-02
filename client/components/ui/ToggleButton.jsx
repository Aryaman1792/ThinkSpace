"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Toggle Button Component
 * 
 * @param {boolean} enabled - Current toggle state
 * @param {function} onChange - Callback when toggle changes
 * @param {string} size - Size variant: 'sm', 'md', 'lg'
 * @param {string} label - Optional label text
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
const ToggleButton = ({
    enabled = false,
    onChange,
    size = "md",
    label,
    disabled = false,
    className
}) => {
    const sizes = {
        sm: {
            track: "w-10 h-5",
            thumb: "w-4 h-4",
            translate: 20,
        },
        md: {
            track: "w-14 h-7",
            thumb: "w-6 h-6",
            translate: 28,
        },
        lg: {
            track: "w-20 h-10",
            thumb: "w-8 h-8",
            translate: 40,
        },
    };

    const currentSize = sizes[size];

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {label && (
                <span className={cn(
                    "font-medium transition-colors",
                    enabled ? "text-[#72B7BF]" : "text-slate-500",
                    disabled && "opacity-50"
                )}>
                    {label}
                </span>
            )}

            <button
                type="button"
                onClick={() => !disabled && onChange?.(!enabled)}
                disabled={disabled}
                className={cn(
                    "relative rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#72B7BF]/50 focus:ring-offset-2",
                    currentSize.track,
                    enabled ? "bg-[#72B7BF]" : "bg-slate-300",
                    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-lg",
                    enabled && !disabled && "shadow-[0_0_15px_rgba(114,183,191,0.4)]"
                )}
                aria-checked={enabled}
                role="switch"
            >
                {/* Animated background glow */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={enabled ? {
                        boxShadow: [
                            "0 0 0px rgba(114, 183, 191, 0)",
                            "0 0 10px rgba(114, 183, 191, 0.6)",
                            "0 0 0px rgba(114, 183, 191, 0)",
                        ]
                    } : {}}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                />

                {/* Toggle thumb */}
                <motion.div
                    className={cn(
                        "absolute top-0.5 left-0.5 bg-white rounded-full shadow-md flex items-center justify-center",
                        currentSize.thumb
                    )}
                    layout
                    animate={{
                        x: enabled ? currentSize.translate : 0,
                    }}
                    transition={spring}
                >
                    {/* Inner dot indicator */}
                    <motion.div
                        className="rounded-full"
                        animate={{
                            backgroundColor: enabled ? "#72B7BF" : "#94a3b8",
                            scale: enabled ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        style={{
                            width: size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px',
                            height: size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px',
                        }}
                    />
                </motion.div>

                {/* Track icons (optional) */}
                <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: enabled ? 0 : 0.5,
                            scale: enabled ? 0.5 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={false}
                        animate={{
                            opacity: enabled ? 0.8 : 0,
                            scale: enabled ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </motion.div>
                </div>
            </button>
        </div>
    );
};

export default ToggleButton;
