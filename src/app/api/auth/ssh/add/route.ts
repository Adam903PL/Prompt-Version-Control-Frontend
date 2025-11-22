import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import crypto from 'crypto';
import { auth } from '@/shared/lib/auth';

export async function POST(req: Request) {
  try {
    // Pobierz sesję z nagłówków Next.js
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const { publicKey, name } = await req.json();

    if (!publicKey || typeof publicKey !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid publicKey' },
        { status: 400 },
      );
    }

    if (!publicKey.startsWith('ssh-')) {
      return NextResponse.json(
        { error: 'Invalid SSH public key format' },
        { status: 400 },
      );
    }

    // Ucinamy komentarz (spójne z CLI, GitHub itd.)
    const clean = publicKey.split(' ').slice(0, 2).join(' ');

    // Fingerprint = SHA256(clean)
    const fingerprint = crypto
      .createHash('sha256')
      .update(clean)
      .digest('base64');

    // sprawdź duplikat
    const existing = await prisma.sshKey.findUnique({
      where: { fingerprint },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'SSH key already exists' },
        { status: 409 },
      );
    }

    // Zapis do DB
    const key = await prisma.sshKey.create({
      data: {
        userId,
        publicKey: publicKey.trim(),
        name: name || null,
        fingerprint,
      },
    });

    return NextResponse.json({ ok: true, key }, { status: 201 });
  } catch (err) {
    console.error('Error in /api/ssh/add:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
