import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create base64 representation to avoid Vercel Read-only File System errors
        const base64Str = buffer.toString('base64');
        const mimeType = file.type || 'image/jpeg';
        const publicUrl = `data:${mimeType};base64,${base64Str}`;

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}
