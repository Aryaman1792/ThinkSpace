"use server";

import dbConnect from "@/lib/db";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    user: {
        name: String,
        image: String,
    },
    type: { type: String, enum: ['thought', 'visual'], required: true },
    content: { type: String },
    image: { type: String },
    caption: { type: String },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export async function getPosts() {
    const dummyPosts = [
        {
            _id: "1",
            type: "thought",
            user: { name: "Sarah Wilson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
            content: "Just finished working on the new design system! 🎨✨ The glassmorphism effects are coming together beautifully. What do you think about the new color palette?",
            likes: 42,
            dim: 5,
            thoughts: 3,
            spread: 12,
            createdAt: new Date().toISOString(),
        },
        {
            _id: '2',
            user: {
                name: 'Sarah Chen',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
            },
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
            caption: 'Just finished this digital piece! 🎨 #digitalart #creative',
            likes: 128,
            dim: 2,
            thoughts: 3,
            spread: 45,
            type: 'visual',
            createdAt: new Date().toISOString(),
        },
        {
            _id: '3',
            user: {
                name: 'Marcus Rodriguez',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
            },
            content: 'The best way to predict the future is to create it.',
            likes: 89,
            dim: 8,
            thoughts: 3,
            spread: 23,
            type: 'thought',
            createdAt: new Date().toISOString(),
        }
    ];

    try {
        await dbConnect();
        const posts = await Post.find().sort({ createdAt: -1 }).lean();
        if (posts.length > 0) {
            return JSON.parse(JSON.stringify(posts));
        }
        return dummyPosts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return dummyPosts;
    }
}
