import express from 'express';
import crypto from 'crypto';
import Post from '../models/Post.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user').sort({ createdAt: -1 });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a post
router.post('/create', async (req, res) => {
    const { content, image, userId } = req.body;
    try {
        let postImage = image;
        if (!postImage) {
            postImage = `https://picsum.photos/seed/${crypto.randomUUID()}/800/600`;
        }
        const newPost = new Post({ content, image: postImage, user: userId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Spark (Like) a post
router.post('/:id/spark', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.likes += 1;
        await post.save();

        res.json({ stats: { likes: post.likes } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
