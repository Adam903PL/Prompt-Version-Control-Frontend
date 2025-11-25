import { NextRequest, NextResponse } from 'next/server';
import { createNewWorkspace } from '@/features/workspaces/services/create-new-workspace';
import type { CreateWorkspaceInput } from '@/features/workspaces/types';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { createWorkspaceFolder } from '@/features/workspaces/services/setup-folder-aws';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    });

    if (!user?.username) {
      return NextResponse.json(
        { error: 'Please set your username first' },
        { status: 400 },
      );
    }

    const body = await request.json();

    const workspaceData: CreateWorkspaceInput = {
      name: body.name,
      description: body.description,
      visibility: body.visibility,
      userId: session.user.id,
      contributors: body.contributors,
    };

    const workspace = await createNewWorkspace(workspaceData);

    // Create S3 folder for the workspace
    try {
      await createWorkspaceFolder(session.user.id, workspace.id);
      console.log('✅ S3 folder created for workspace:', workspace.id);
    } catch (s3Error) {
      console.error('⚠️ Failed to create S3 folder:', s3Error);
    }

    return NextResponse.json(
      {
        ...workspace,
        username: user.username,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('❌ Error creating workspace:', error);
    return NextResponse.json(
      { error: 'Failed to create workspace' },
      { status: 500 },
    );
  }
}
