import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { auth } from '@/shared/lib/auth';

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

    const { username } = await request.json();

    // Validate username format
    if (!username || username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { error: 'Username must be between 3 and 30 characters' },
        { status: 400 },
      );
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json(
        {
          error:
            'Username can only contain letters, numbers, dashes, and underscores',
        },
        { status: 400 },
      );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 409 },
      );
    }

    // Update user's username
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    return NextResponse.json({
      success: true,
      username: updatedUser.username,
    });
  } catch (error) {
    console.error('❌ Error setting username:', error);
    return NextResponse.json(
      { error: 'Failed to set username' },
      { status: 500 },
    );
  }
}
