import { notFound } from 'next/navigation';
import { prisma } from '@/shared/lib/prisma';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';

interface PageProps {
  params: Promise<{
    username: string;
    workspace: string;
  }>;
}

export default async function WorkspacePage({ params }: PageProps) {
  const { username, workspace: workspaceSlug } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    notFound();
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      userId: user.id,
      slug: workspaceSlug,
    },
    include: {
      user: true,
      contributors: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!workspace) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <a
              href={`/${username}`}
              className="hover:text-zinc-200 transition-colors"
            >
              @{username}
            </a>
            <span>/</span>
            <span className="text-zinc-200">{workspace.name}</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-2">
            {workspace.name}
          </h1>
          {workspace.description && (
            <p className="text-zinc-400 text-lg">{workspace.description}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-zinc-200">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Visibility:</span>
                <span className="text-zinc-200 capitalize">
                  {workspace.visibility}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Created:</span>
                <span className="text-zinc-200">
                  {new Date(workspace.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Owner:</span>
                <span className="text-zinc-200">
                  @{workspace.user.username}
                </span>
              </div>
            </CardContent>
          </Card>

          {workspace.contributors.length > 0 && (
            <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-zinc-200">Contributors</CardTitle>
                <CardDescription className="text-zinc-400">
                  {workspace.contributors.length} contributor(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workspace.contributors.map((contributor) => (
                    <div
                      key={contributor.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      {contributor.user.image && (
                        <img
                          src={contributor.user.image}
                          alt={contributor.user.name}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="text-zinc-200">
                        {contributor.user.name}
                      </span>
                      <span className="text-zinc-500">
                        @{contributor.user.username}
                      </span>
                      <span className="ml-auto text-zinc-400 text-xs capitalize">
                        {contributor.role}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800/50">
          <CardHeader>
            <CardTitle className="text-zinc-200">Workspace Content</CardTitle>
            <CardDescription className="text-zinc-400">
              This is where your workspace content will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">
              Add your workspace content here - prompts, conversations, reports,
              etc.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
