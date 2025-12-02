import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category && category !== 'all') {
            // Case-insensitive regex for category matching
            query.category = { $regex: new RegExp(category, 'i') };
        }

        // Fetch trending posts: sorted by likes, limit to 10
        const trendingPosts = await Post.find(query)
            .sort({ likes: -1 })
            .limit(10)
            .populate('user', 'name avatar'); // Populate user details

        // Mock data for recentSparks (since Spark model might not be fully ready or populated)
        const recentSparks = [
            { _id: 's1', description: 'The future of AI is agentic.', thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80', user: { name: 'Alice' } },
            { _id: 's2', description: 'Minimalism in design.', thumbnailUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&q=80', user: { name: 'Bob' } },
            { _id: 's3', description: 'Coding late at night.', thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80', user: { name: 'Charlie' } },
            { _id: 's4', description: 'Nature walks are healing.', thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80', user: { name: 'Diana' } }
        ];

        // Mock data for categories
        const categories = [
            { id: "digital-art", name: "Digital Art", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80" },
            { id: "technology", name: "Technology", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
            { id: "design", name: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80" },
            { id: "music", name: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80" },
            { id: "photography", name: "Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
        ];

        res.json({
            trendingPosts,
            recentSparks,
            categories
        });
    } catch (error) {
        console.error("Error in explore route:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get posts by category
router.get('/:category', async (req, res) => {
    try {
        const { category } = req.params;
        // Simple mapping or regex for category matching
        const posts = await Post.find({
            category: { $regex: new RegExp(category, 'i') }
        })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('user', 'name avatar');

        res.json({ posts });
    } catch (error) {
        console.error("Error fetching category posts:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
