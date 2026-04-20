import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, addProject, updateProject, deleteProject } from '@/lib/db';

export async function GET() {
    try {
        const projects = await getAllProjects();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newProject = await addProject(data);
        return NextResponse.json(newProject);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const { id, ...updates } = data;
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const updated = await updateProject(Number(id), updates);
        if (!updated) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await deleteProject(Number(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
