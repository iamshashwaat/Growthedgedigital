import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load env variables
dotenv.config({ path: '.env.local' });

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_uri_here') {
    console.error('❌ Error: MONGODB_URI is not set in .env.local');
    process.exit(1);
}

const migrate = async () => {
    if (!fs.existsSync(DB_PATH)) {
        console.log('⚠️ No db.json found. Skipping blog migration.');
        process.exit(0);
    }

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db('growthedge');
        const collection = db.collection('posts');

        const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        const posts = dbData.posts || [];

        if (posts.length === 0) {
            console.log('ℹ️ No posts found in db.json');
            return;
        }

        console.log(`🚀 Migrating ${posts.length} posts...`);

        for (const post of posts) {
            // Check if post already exists to avoid duplicates
            const existing = await collection.findOne({ id: post.id });
            if (!existing) {
                await collection.insertOne(post);
                console.log(`   + Migrated: ${post.title}`);
            } else {
                console.log(`   ~ Skipped (already exists): ${post.title}`);
            }
        }

        console.log('✨ Migration complete!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await client.close();
    }
};

migrate();
