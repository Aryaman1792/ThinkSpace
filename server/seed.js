
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from './src/models/User.js';
import Post from './src/models/Post.js';

dotenv.config();

const NUM_USERS = 50;
const NUM_POSTS = 500;

// Curated list of high-quality Unsplash images for visual posts
const visualImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1501854140884-074cf2b2c3af?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop"
];

const categories = ["Design", "Tech", "Nature", "Architecture", "Art", "Life", "Philosophy", "Coding", "Music", "Travel"];

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

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});
        console.log('Cleared existing data');

        // Generate Users
        const users = [];
        for (let i = 0; i < NUM_USERS; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const name = `${firstName} ${lastName}`;
            const handle = `@${firstName.toLowerCase()}${lastName.toLowerCase().substring(0, 3)}_${faker.number.int({ min: 1, max: 99 })}`;

            users.push({
                name: name,
                handle: handle,
                email: faker.internet.email({ firstName, lastName }),
                image: faker.image.avatar(),
                sparks: faker.number.int({ min: 0, max: 5000 }),
                followers: faker.number.int({ min: 0, max: 2000 })
            });
        }

        const createdUsers = await User.insertMany(users);
        console.log(`Created ${createdUsers.length} users`);

        // Generate Posts
        const posts = [];
        for (let i = 0; i < NUM_POSTS; i++) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            const isVisual = Math.random() > 0.6; // 40% visual posts
            const category = categories[Math.floor(Math.random() * categories.length)];

            const post = {
                user: randomUser._id,
                likes: faker.number.int({ min: 0, max: 500 }),
                category: category,
                createdAt: faker.date.recent({ days: 30 }) // Posts from last 30 days
            };

            if (isVisual) {
                post.type = 'visual';
                // Use Picsum with a random seed to ensure unique images
                post.image = `https://picsum.photos/seed/${faker.string.uuid()}/800/600`;
                post.caption = englishCaptions[Math.floor(Math.random() * englishCaptions.length)];
            } else {
                post.type = 'thought';
                post.content = englishThoughts[Math.floor(Math.random() * englishThoughts.length)];
            }

            posts.push(post);
        }

        await Post.insertMany(posts);
        console.log(`Created ${posts.length} posts`);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
