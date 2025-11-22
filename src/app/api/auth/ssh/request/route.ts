import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { pubkey } = await req.json();

    if (!pubkey) {
      return NextResponse.json({ error: 'Missing pubkey' }, { status: 400 });
    }

    // fingerprint (this must match SshKey.fingerprint)
    const clean = pubkey.split(' ').slice(0, 2).join(' '); // TAK SAMO JAK W LOGIN
    const fingerprint = crypto
      .createHash('sha256')
      .update(clean)
      .digest('base64');

    console.log('CLI pubkey:', pubkey);
    console.log('CLI clean:', clean);
    console.log('CLI fingerprint:', fingerprint);

    const all = await prisma.sshKey.findMany();
    console.log('DB keys:', all);

    const sshKey = await prisma.sshKey.findUnique({
      where: { fingerprint },
    });

    if (!sshKey) {
      return NextResponse.json({ error: 'SSH key not found' }, { status: 404 });
    }

    // challenge
    const challenge = crypto.randomBytes(32).toString('base64');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // CHECK IF EXISTS (NO UPSERT)
    const existing = await prisma.verification.findFirst({
      where: { identifier: `ssh-${fingerprint}` },
    });

    if (existing) {
      await prisma.verification.update({
        where: { id: existing.id },
        data: {
          value: challenge,
          expiresAt,
        },
      });
    } else {
      await prisma.verification.create({
        data: {
          id: crypto.randomUUID(),
          identifier: `ssh-${fingerprint}`,
          value: challenge,
          expiresAt,
        },
      });
    }

    return NextResponse.json({ challenge });
  } catch (err) {
    console.error('SSH request error:', err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
