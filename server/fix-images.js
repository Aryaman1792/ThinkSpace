
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Post from './src/models/Post.js';

dotenv.config();

const fixImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find posts with missing or empty images
        const postsToFix = await Post.find({
            $or: [
                { image: { $exists: false } },
                { image: null },
                { image: "" }
            ]
        });

        console.log(`Found ${postsToFix.length} posts to fix`);

        for (const post of postsToFix) {
            post.image = `https://picsum.photos/seed/${crypto.randomUUID()}/800/600`;
            await post.save();
            console.log(`Fixed post ${post._id}`);
        }

        console.log('All posts fixed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing images:', error);
        process.exit(1);
    }
};

fixImages();
