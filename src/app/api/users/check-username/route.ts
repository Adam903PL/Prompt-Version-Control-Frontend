import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { available: false, error: 'Username is required' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    return NextResponse.json({
      available: !existingUser,
      username,
    });
  } catch (error) {
    console.error('❌ Error checking username:', error);
    return NextResponse.json(
      { error: 'Failed to check username availability' },
      { status: 500 },
    );
  }
}
