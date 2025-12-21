'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { profileSchema } from '../schemas/profile-schema';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updateProfile(values: unknown) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: 'Unauthorized' };
  }

  const result = profileSchema.safeParse(values);
  if (!result.success) {
    return { error: 'Invalid data', details: result.error.flatten() };
  }

  const { name, username, image, description, links } = result.data;

  try {
    // Check if username is taken (if changed)
    if (username && username !== session.user.username) {
      const existing = await prisma.user.findUnique({
        where: { username },
      });
      if (existing) {
        return { error: 'Username is already taken' };
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        username,
        image,
        description,
        links: links ?? undefined,
      },
    });

    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    return { error: 'Failed to update profile' };
  }
}
