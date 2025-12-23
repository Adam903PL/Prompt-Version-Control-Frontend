'use server';

import { prisma } from '@/shared/lib/prisma';
import { Resend } from 'resend';
import { InvitationEmailTemplate } from '@/shared/components/mail/invitation-email-template';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function inviteContributor(
  workspaceId: string,
  inviterId: string,
  usernameToInvite: string,
  role: string,
) {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace) throw new Error('Workspace not found');

    const inviter = await prisma.user.findUnique({
      where: { id: inviterId },
      select: { name: true, username: true },
    });

    const inviterName = inviter?.name || inviter?.username || 'Someone';

    const userToInvite = await prisma.user.findUnique({
      where: { username: usernameToInvite },
      select: { id: true, email: true },
    });

    if (!userToInvite || !userToInvite.email) {
      throw new Error('User not found or has no email');
    }

    // Check if already a contributor
    const existingContributor = await prisma.workspaceContributor.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: workspace.id,
          userId: userToInvite.id,
        },
      },
    });

    if (existingContributor) {
      throw new Error('User is already a contributor');
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.workspaceInvitation.create({
      data: {
        token,
        workspaceId: workspace.id,
        inviteeId: userToInvite.id,
        inviterId: inviterId,
        role: role,
        status: 'PENDING',
        expiresAt,
      },
    });

    const joinLink = `${process.env.NEXT_PUBLIC_APP_URL}/workspaces/join?token=${token}`;

    await resend.emails.send({
      from: 'PVC <noreply@mail.adampukaluk.pl>',
      to: userToInvite.email,
      subject: `Invitation to join ${workspace.name}`,
      react: InvitationEmailTemplate({
        inviterName,
        workspaceName: workspace.name || 'Workspace',
        joinLink,
      }) as React.ReactElement,
    });

    revalidatePath(`/dashboard/workspaces/${workspace.slug}/settings`);
    return { success: true };
  } catch (error) {
    console.error('Error inviting contributor:', error);
    throw error;
  }
}
