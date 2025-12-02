"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { ShoppingBag, Search, Heart, Star, TrendingUp, Sparkles, Tag } from "lucide-react";

export default function MarketPlace() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = ["all", "books", "tech", "art", "courses", "services"];

    const products = [
        {
            id: 1,
            title: "Web Development Course",
            price: 49.99,
            category: "courses",
            seller: "John Doe",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
        },
        {
            id: 2,
            title: "Digital Art Pack",
            price: 29.99,
            category: "art",
            seller: "Jane Smith",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
        },
        {
            id: 3,
            title: "Programming Book Bundle",
            price: 39.99,
            category: "books",
            seller: "Tech Books Co",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
        },
        {
            id: 4,
            title: "UI/UX Design Service",
            price: 199.99,
            category: "services",
            seller: "Design Studio",
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=500&q=80",
        },
        {
            id: 5,
            title: "Mechanical Keyboard",
            price: 129.99,
            category: "tech",
            seller: "Tech Gear",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
        },
        {
            id: 6,
            title: "Photography Course",
            price: 59.99,
            category: "courses",
            seller: "Photo Pro",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&q=80",
        },
    ];

    const filteredProducts = products.filter(
        (product) =>
            (selectedCategory === "all" || product.category === selectedCategory) &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#72B7BF]/10 via-transparent to-[#72B7BF]/10 blur-3xl -z-10" />
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <ShoppingBag className="h-10 w-10 text-[#72B7BF]" />
                        </motion.div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#72B7BF] via-[#5da3ab] to-[#72B7BF] bg-clip-text text-transparent">
                            MarketPlace
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
                        Discover and trade knowledge, services, and creative works
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#72B7BF] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-slate-200 focus:border-[#72B7BF] focus:ring-4 focus:ring-[#72B7BF]/20 transition-all shadow-sm hover:shadow-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap relative overflow-hidden ${
                                    selectedCategory === cat
                                        ? "bg-[#72B7BF] text-white shadow-lg shadow-[#72B7BF]/30"
                                        : "bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200 hover:border-[#72B7BF]/30"
                                }`}
                            >
                                {selectedCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-[#72B7BF] to-[#5da3ab]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProducts.map((product, idx) => (
                        <motion.div 
                            key={product.id} 
                            variants={item}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <GlassCard className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden border-2 border-white/40 hover:border-[#72B7BF]/30">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#72B7BF]/0 to-[#72B7BF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative h-52 rounded-xl overflow-hidden mb-4">
                                    <motion.img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
                                    >
                                        <Heart className="h-5 w-5 text-slate-600 hover:text-red-500 transition-colors" />
                                    </motion.button>
                                    
                                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#72B7BF] text-white text-xs font-bold rounded-full shadow-lg">
                                        <Tag className="h-3 w-3 inline mr-1" />
                                        {product.category}
                                    </div>
                                </div>
                                
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#72B7BF] transition-colors line-clamp-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" />
                                        by {product.seller}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            <span className="text-sm font-bold text-amber-600">{product.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>Trending</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Price</p>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] bg-clip-text text-transparent">
                                                ${product.price}
                                            </span>
                                        </div>
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2.5 bg-gradient-to-r from-[#72B7BF] to-[#5da3ab] text-white rounded-xl hover:shadow-lg hover:shadow-[#72B7BF]/30 transition-all font-medium"
                                        >
                                            Buy Now
                                        </motion.button>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-block p-6 bg-slate-50 rounded-full mb-4">
                            <Search className="h-12 w-12 text-slate-400" />
                        </div>
                        <p className="text-slate-500 text-xl font-medium">No products found</p>
                        <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
}
