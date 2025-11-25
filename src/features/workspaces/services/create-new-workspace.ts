import { prisma } from '@/shared/lib/prisma';
import type {
  CreateWorkspaceInput,
  CreateWorkspaceResponse,
} from '../types/workspace.types';
import { generateSlug, ensureUniqueSlug } from '@/shared/utils/slug';

export async function createNewWorkspace(
  workspaceData: CreateWorkspaceInput,
): Promise<CreateWorkspaceResponse> {
  try {
    // Generate slug from workspace name
    const baseSlug = generateSlug(workspaceData.name);

    // Get existing slugs for this user to ensure uniqueness
    const existingWorkspaces = await prisma.workspace.findMany({
      where: { userId: workspaceData.userId },
      select: { slug: true },
    });

    const existingSlugs = existingWorkspaces.map((w) => w.slug);
    const uniqueSlug = ensureUniqueSlug(baseSlug, existingSlugs);

    const workspace = await prisma.workspace.create({
      data: {
        name: workspaceData.name,
        slug: uniqueSlug,
        description: workspaceData.description,
        visibility: workspaceData.visibility,
        userId: workspaceData.userId,
        contributors: {
          create: workspaceData.contributors
            ?.filter((c) => c.name.trim() !== '')
            .map((c) => ({
              user: {
                connect: { username: c.name },
              },
              role: 'contributor',
            })),
        },
      },
    });

    return workspace;
  } catch (error) {
    console.error('❌ Error creating workspace:', error);
    throw error;
  }
}
