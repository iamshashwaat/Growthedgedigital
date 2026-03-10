import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface BlogPost {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    bgColor: string;
    textColor: string;
    slug: string;
    content: string;
    createdAt?: string;
}

export function getDb() {
    if (!fs.existsSync(DB_PATH)) {
        return { posts: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

export function saveDb(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export function getAllPosts(): BlogPost[] {
    const db = getDb();
    return db.posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    const posts = getAllPosts();
    return posts.find((p) => p.slug === slug);
}

export function addPost(post: Omit<BlogPost, 'id'>) {
    const db = getDb();
    const newPost = {
        ...post,
        id: db.posts.length > 0 ? Math.max(...db.posts.map((p: any) => p.id)) + 1 : 1,
        createdAt: new Date().toISOString()
    };
    db.posts.push(newPost);
    saveDb(db);
    return newPost;
}

export function updatePost(id: number, updates: Partial<BlogPost>) {
    const db = getDb();
    const index = db.posts.findIndex((p: any) => p.id === id);
    if (index !== -1) {
        db.posts[index] = { ...db.posts[index], ...updates };
        saveDb(db);
        return db.posts[index];
    }
    return null;
}

export function deletePost(id: number) {
    const db = getDb();
    db.posts = db.posts.filter((p: any) => p.id !== id);
    saveDb(db);
}
