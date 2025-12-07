/*
  Warnings:

  - You are about to drop the `ProjectContributor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectContributor" DROP CONSTRAINT "ProjectContributor_userId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_userId_fkey";

-- DropTable
DROP TABLE "ProjectContributor";

-- DropTable
DROP TABLE "project";

-- CreateTable
CREATE TABLE "WorkspaceContributor" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'contributor',
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkspaceContributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT NOT NULL DEFAULT 'workspace',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceContributor_workspaceId_userId_key" ON "WorkspaceContributor"("workspaceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_userId_slug_key" ON "workspace"("userId", "slug");

-- AddForeignKey
ALTER TABLE "WorkspaceContributor" ADD CONSTRAINT "WorkspaceContributor_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceContributor" ADD CONSTRAINT "WorkspaceContributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
