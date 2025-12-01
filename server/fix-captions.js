
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './src/models/Post.js';

dotenv.config();

const englishCaptions = [
    "Just another day in paradise! 🌴",
    "Chasing sunsets and dreams. 🌅",
    "Coffee first, schemes later. ☕",
    "Coding my way through the weekend. 💻",
    "Nature never goes out of style. 🍃",
    "Minimalism is not a lack of something, it's simply the perfect amount of something.",
    "Design is intelligence made visible.",
    "Exploring the unknown. 🚀",
    "Good vibes only.",
    "Simplicity is the ultimate sophistication.",
    "Lost in the right direction.",
    "Creating something new today.",
    "The details are not the details. They make the design.",
    "Life is short, make it sweet.",
    "Architecture is frozen music.",
    "Art washes away from the soul the dust of everyday life.",
    "Music is the shorthand of emotion.",
    "Travel is the only thing you buy that makes you richer.",
    "Stay hungry, stay foolish.",
    "Do what you love, love what you do."
];

const englishThoughts = [
    "Just shipped a new feature! The feeling of seeing your code in production is unmatched. 🚀",
    "Hot take: The best code is the code you don't have to write. Embrace simplicity!",
    "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
    "Taking a break from coding to enjoy nature. Sometimes the best debugging happens away from the screen. 🌲",
    "Reading 'Clean Code' again. Every time I read it, I find something new to improve in my work.",
    "Coffee + Code + Music = Perfect morning vibes ☕💻🎵",
    "Refactored 200 lines into 50. Feels like a personal victory! Less is more.",
    "Stuck on a bug for 3 hours. Took a walk. Solved it in 5 minutes. Never underestimate the power of stepping away.",
    "Started learning Rust today. The compiler is tough but fair. Excited for this journey!",
    "Pair programming session was incredibly productive today. Two heads are definitely better than one!",
    "Working out keeps my mind sharp for coding. Physical health = Mental health = Better code.",
    "TypeScript has changed how I write JavaScript. Type safety is a game changer!",
    "Deployed to prod on a Friday. Living dangerously! (Don't do this at home 😅)",
    "Documentation is love. Documentation is life. Future me will thank present me.",
    "Imposter syndrome is real, but so is your progress. Keep pushing forward! 💪",
    "The sunset today was absolutely stunning. Sometimes we need to look up from our screens. 🌅",
    "Code review feedback isn't personal. It's about making the product better. Grateful for good teammates!",
    "Automated tests saved me from a critical bug today. Write those tests, folks!",
    "Learning in public is intimidating but rewarding. Sharing my journey and loving the community support!",
    "Side project Sunday! Working on something exciting. Can't wait to share it with you all. 🎨",
    "The best way to predict the future is to invent it.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "Java is to JavaScript what car is to Carpet.",
    "Knowledge is power.",
    "Creativity is intelligence having fun.",
    "It always seems impossible until it's done.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there."
];

const fixCaptions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const posts = await Post.find({});
        console.log(`Found ${posts.length} posts to update`);

        for (const post of posts) {
            // Infer type if missing
            if (!post.type) {
                post.type = post.image ? 'visual' : 'thought';
            }

            if (post.type === 'visual') {
                post.caption = englishCaptions[Math.floor(Math.random() * englishCaptions.length)];
                // Ensure content is cleared or synced if needed, but caption is key for visual
            } else {
                post.content = englishThoughts[Math.floor(Math.random() * englishThoughts.length)];
            }
            await post.save();
        }

        console.log('All posts updated with English captions/content');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing captions:', error);
        process.exit(1);
    }
};

fixCaptions();
