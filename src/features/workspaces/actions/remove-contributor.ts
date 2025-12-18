'use server';

import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function removeContributor(
  workspaceId: string,
  contributorId: string,
) {
  try {
    // contributorId here is the ID of the WorkspaceContributor record, or the User ID?
    // Ideally we pass the WorkspaceContributor ID for precision, or UserId and WorkspaceId.
    // Let's assume we pass the UserId to be removed from the Workspace.

    // 1. Check if user is owner (cannot remove owner usually, but let's just delete the contribution entry)
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { userId: true, slug: true },
    });

    if (!workspace) throw new Error('Workspace not found');
    if (workspace.userId === contributorId) {
      throw new Error('Cannot remove the owner of the workspace');
    }

    await prisma.workspaceContributor.deleteMany({
      where: {
        workspaceId: workspaceId,
        userId: contributorId,
      },
    });

    revalidatePath(`/dashboard/workspaces/${workspace.slug}/settings`);
    return { success: true };
  } catch (error) {
    console.error('Error removing contributor:', error);
    throw new Error('Failed to remove contributor');
  }
}
