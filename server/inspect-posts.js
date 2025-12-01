
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './src/models/Post.js';

dotenv.config();

const inspectPosts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const posts = await Post.find({}).limit(5);
        console.log('Inspecting 5 posts:');
        posts.forEach(p => {
            console.log(`ID: ${p._id}, Type: ${p.type}`);
            console.log(`Content: ${p.content}`);
            console.log(`Caption: ${p.caption}`);
            console.log('---');
        });

        process.exit(0);
    } catch (error) {
        console.error('Error inspecting posts:', error);
        process.exit(1);
    }
};

inspectPosts();
