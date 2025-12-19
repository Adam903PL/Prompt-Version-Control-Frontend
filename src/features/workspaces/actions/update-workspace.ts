'use server';

import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';
import { generateSlug, ensureUniqueSlug } from '@/shared/utils/slug';

interface UpdateWorkspaceInput {
  workspaceId: string;
  name?: string;
  description?: string;
  image?: string;
}

export async function updateWorkspace(input: UpdateWorkspaceInput) {
  try {
    const { workspaceId, name, description, image } = input;

    const currentWorkspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!currentWorkspace) {
      throw new Error('Workspace not found');
    }

    const dataToUpdate: {
      description?: string;
      image?: string;
      name?: string;
      slug?: string;
    } = {
      description,
      image,
    };

    if (name && name !== currentWorkspace.name) {
      dataToUpdate.name = name;
      // Also update slug if name changes?
      // Usually dangerous to change slug as it breaks URLs.
      // Let's keep slug stable for now unless explicitly requested,
      // but user said "zmienienie nazwy" (change name).
      // Usually changing name expects slug change in early-stage apps.
      // I will UPDATE slug but ensure uniqueness.
      const baseSlug = generateSlug(name);

      const existingWorkspaces = await prisma.workspace.findMany({
        where: { userId: currentWorkspace.userId },
        select: { slug: true },
      });
      const existingSlugs = existingWorkspaces
        .map((w) => w.slug)
        .filter((s) => s !== currentWorkspace.slug); // Exclude self

      dataToUpdate.slug = ensureUniqueSlug(baseSlug, existingSlugs);
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: dataToUpdate,
    });

    revalidatePath(`/dashboard/workspaces/${updatedWorkspace.slug}`);
    revalidatePath(`/dashboard/workspaces/${updatedWorkspace.slug}/settings`);

    return { success: true, workspace: updatedWorkspace };
  } catch (error) {
    console.error('Error updating workspace:', error);
    throw new Error('Failed to update workspace');
  }
}
