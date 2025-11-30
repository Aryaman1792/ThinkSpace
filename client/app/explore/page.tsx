"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

const categories = [
    { id: "digital-art", name: "Digital Art", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80", size: "col-span-2 row-span-2" },
    { id: "tech", name: "Technology", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", size: "col-span-1 row-span-1" },
    { id: "design", name: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", size: "col-span-1 row-span-2" },
    { id: "music", name: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80", size: "col-span-1 row-span-1" },
    { id: "photography", name: "Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", size: "col-span-2 row-span-1" },
];

export default function Explore() {
    return (
        <MainLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Explore</h1>
                <p className="text-slate-500">Discover new ideas and communities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/explore/${category.id}`}
                        className={category.size}
                    >
                        <GlassCard
                            className="h-full w-full p-0 overflow-hidden relative group cursor-pointer border-0"
                            hoverEffect={false}
                        >
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10" />
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 p-6 z-20">
                                <h3 className="text-2xl font-bold text-white drop-shadow-md">{category.name}</h3>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </MainLayout>
    );
}
