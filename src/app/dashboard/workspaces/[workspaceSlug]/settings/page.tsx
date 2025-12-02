import { SecurityPolicyEditor } from '@/features/workspaces/components/security-policy-editor';
import { saveSecurityRules } from '@/features/workspaces/contracts/save-security-rules';
import { prisma } from '@/shared/lib/prisma';
import { notFound } from 'next/navigation';

interface WorkspaceSettingsPageProps {
  params: Promise<{ workspaceSlug: string }>;
}

export default async function WorkspaceSettingsPage({
  params,
}: WorkspaceSettingsPageProps) {
  const { workspaceSlug } = await params;

  const workspace = await prisma.workspace.findFirst({
    where: { slug: workspaceSlug },
    include: {
      securityRules: true,
    },
  });

  if (!workspace) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Workspace Settings</h1>
        <p className="text-zinc-400">
          Manage your workspace configuration and security policies.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
        <SecurityPolicyEditor
          workspaceId={workspace.id}
          initialRules={workspace.securityRules}
          onSave={saveSecurityRules}
        />
      </div>
    </div>
  );
}
