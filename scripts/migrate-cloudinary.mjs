import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_uri_here') {
  console.error('❌ Error: MONGODB_URI is not set in .env.local');
  process.exit(1);
}

if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
  console.error('❌ Error: CLOUDINARY_CLOUD_NAME is not set in .env.local');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isBase64Image(str) {
  return typeof str === 'string' && str.startsWith('data:image/');
}

async function uploadBase64ToCloudinary(base64Str, folder, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      base64Str,
      {
        folder,
        public_id: publicId,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
  });
}

async function migrateField(item, field, folder, label) {
  if (!item[field]) return null;
  const val = item[field];
  if (isBase64Image(val)) {
    const publicId = `${item.id || Date.now()}-${field}-${Date.now()}`;
    try {
      const url = await uploadBase64ToCloudinary(val, folder, publicId);
      console.log(`   ✅ Migrated ${label} for "${item.title || item.id}"`);
      return url;
    } catch (err) {
      console.error(`   ❌ Failed to migrate ${label} for "${item.title || item.id}":`, err.message);
      return null;
    }
  }
  return null;
}

async function migrateArrayField(item, field, folder, label) {
  if (!Array.isArray(item[field]) || item[field].length === 0) return null;
  const migrated = [];
  let changed = false;
  for (let i = 0; i < item[field].length; i++) {
    const val = item[field][i];
    if (isBase64Image(val)) {
      const publicId = `${item.id || Date.now()}-${field}-${i}-${Date.now()}`;
      try {
        const url = await uploadBase64ToCloudinary(val, folder, publicId);
        migrated.push(url);
        changed = true;
        console.log(`   ✅ Migrated ${label}[${i}] for "${item.title || item.id}"`);
      } catch (err) {
        console.error(`   ❌ Failed to migrate ${label}[${i}] for "${item.title || item.id}":`, err.message);
        migrated.push(val);
      }
    } else {
      migrated.push(val);
    }
  }
  return changed ? migrated : null;
}

async function migrateCollection(collection, folder) {
  const items = await collection.find({}).toArray();
  let migrated = 0;
  let skipped = 0;

  for (const item of items) {
    const updates = {};
    let hasChanges = false;

    // Migrate cover image
    const newImage = await migrateField(item, 'image', folder, 'cover image');
    if (newImage) {
      updates.image = newImage;
      hasChanges = true;
    } else if (item.image && !isBase64Image(item.image)) {
      skipped++;
    }

    // Migrate gallery images (projects only)
    const newImages = await migrateArrayField(item, 'images', folder, 'gallery image');
    if (newImages) {
      updates.images = newImages;
      hasChanges = true;
    }

    if (hasChanges) {
      await collection.updateOne({ _id: item._id }, { $set: updates });
      migrated++;
      console.log(`   💾 Updated document "${item.title || item.id}" in MongoDB`);
    }
  }

  return { migrated, skipped };
}

const migrate = async () => {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db('growthedge');
    const projectsCollection = db.collection('projects');
    const postsCollection = db.collection('posts');

    // --- Migrate Projects ---
    console.log('📁 Migrating Projects...');
    const projectCount = await projectsCollection.countDocuments();
    console.log(`   Found ${projectCount} projects\n`);
    const projectResult = await migrateCollection(projectsCollection, 'growthedge/projects');
    console.log(`\n   Projects: ${projectResult.migrated} migrated, ${projectResult.skipped} already on CDN\n`);

    // --- Migrate Blog Posts ---
    console.log('📝 Migrating Blog Posts...');
    const postCount = await postsCollection.countDocuments();
    console.log(`   Found ${postCount} posts\n`);
    const postResult = await migrateCollection(postsCollection, 'growthedge/blog');
    console.log(`\n   Posts: ${postResult.migrated} migrated, ${postResult.skipped} already on CDN\n`);

    console.log('✨ Migration complete!');
    console.log(`   Total updated: ${projectResult.migrated + postResult.migrated} documents`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
};

migrate();
