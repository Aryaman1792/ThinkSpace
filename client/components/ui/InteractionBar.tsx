"use client";

import React from "react";
import { Zap, CloudRain, Brain, CornerUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInteractionLogic } from "@/hooks/useInteractionLogic";

interface InteractionBarProps {
    initialCounts: {
        spark: number;
        dim: number;
        thoughts: number;
        spread: number;
    };
    onInteraction?: (type: string, value: number) => void;
    onThoughtsClick?: () => void;
    className?: string;
    variant?: "default" | "minimal";
}

const InteractionBar = ({
    initialCounts,
    onInteraction,
    onThoughtsClick,
    className,
    variant = "default"
}: InteractionBarProps) => {

    const { counts, active, handleInteraction } = useInteractionLogic({
        initialCounts,
        onInteraction
    });

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

    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {buttons.map((btn) => {
                // @ts-ignore
                const isActive = active[btn.id];
                // @ts-ignore
                const count = counts[btn.id];

                return (
                    <button
                        key={btn.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleInteraction(btn.id, btn.onClick);
                        }}
                        className={cn(
                            "flex items-center gap-1.5 transition-colors duration-200 group p-1.5 rounded-full",
                            btn.bgHover
                        )}
                    >
                        <btn.icon
                            size={variant === "minimal" ? 18 : 20}
                            className={cn(
                                "transition-all duration-300",
                                isActive ? btn.activeColor : "text-slate-400 group-hover:text-slate-600"
                            )}
                        />
                        <span className={cn(
                            "text-xs font-medium transition-colors",
                            isActive ? btn.color : "text-slate-500"
                        )}>
                            {count || 0}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default InteractionBar;
