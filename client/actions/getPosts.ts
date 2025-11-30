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
    await dbConnect();

    const dummyPosts = [
        {
            _id: "1",
            type: "thought",
            user: { name: "Sarah Wilson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
            content: "Just finished working on the new design system! 🎨✨ The glassmorphism effects are coming together beautifully. What do you think about the new color palette?",
            likes: 234,
            createdAt: new Date().toISOString(),
        },
        {
            _id: "2",
            type: "visual",
            user: { name: "Mike Chen", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop" },
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
            caption: "Exploring the mountains this weekend. The view from the top was absolutely breathtaking! 🏔️",
            likes: 892,
            createdAt: new Date().toISOString(),
        },
        {
            _id: "3",
            type: "thought",
            user: { name: "Jessica Lee", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" },
            content: "Minimalism isn't about having less. It's about making room for more of what matters.",
            likes: 567,
            createdAt: new Date().toISOString(),
        }
    ];

    try {
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
