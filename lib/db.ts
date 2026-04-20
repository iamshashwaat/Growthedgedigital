import clientPromise from './mongodb';

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

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    link?: string;
    github?: string;
    createdAt?: string;
}

async function getCollection(name: string) {
    const client = await clientPromise;
    const db = client.db('growthedge');
    return db.collection(name);
}

// --- BLOG POSTS ---

export async function getAllPosts(): Promise<BlogPost[]> {
    const collection = await getCollection('posts');
    const posts = await collection.find({}).toArray();
    return posts.map(p => {
        const { _id, ...rest } = p;
        return rest as BlogPost;
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const collection = await getCollection('posts');
    const post = await collection.findOne({ slug });
    if (!post) return undefined;
    const { _id, ...rest } = post;
    return rest as BlogPost;
}

export async function addPost(post: Omit<BlogPost, 'id'>) {
    const collection = await getCollection('posts');
    const lastPost = await collection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastPost.length > 0 ? lastPost[0].id + 1 : 1;
    
    const newPost = {
        ...post,
        id: newId,
        createdAt: new Date().toISOString()
    };
    await collection.insertOne(newPost);
    return newPost;
}

export async function updatePost(id: number, updates: Partial<BlogPost>) {
    const collection = await getCollection('posts');
    const result = await collection.findOneAndUpdate(
        { id },
        { $set: updates },
        { returnDocument: 'after' }
    );
    if (!result) return null;
    const { _id, ...rest } = result;
    return rest as BlogPost;
}

export async function deletePost(id: number) {
    const collection = await getCollection('posts');
    await collection.deleteOne({ id });
}

// --- PROJECTS ---

export async function getAllProjects(): Promise<Project[]> {
    const collection = await getCollection('projects');
    const projects = await collection.find({}).toArray();
    return projects.map(p => {
        const { _id, ...rest } = p;
        return rest as Project;
    });
}

export async function addProject(project: Omit<Project, 'id'>) {
    const collection = await getCollection('projects');
    const lastProject = await collection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastProject.length > 0 ? lastProject[0].id + 1 : 1;
    
    const newProject = {
        ...project,
        id: newId,
        createdAt: new Date().toISOString()
    };
    await collection.insertOne(newProject);
    return newProject;
}

export async function updateProject(id: number, updates: Partial<Project>) {
    const collection = await getCollection('projects');
    const result = await collection.findOneAndUpdate(
        { id },
        { $set: updates },
        { returnDocument: 'after' }
    );
    if (!result) return null;
    const { _id, ...rest } = result;
    return rest as Project;
}

export async function deleteProject(id: number) {
    const collection = await getCollection('projects');
    await collection.deleteOne({ id });
}
