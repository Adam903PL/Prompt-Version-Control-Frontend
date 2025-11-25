/*
  Warnings:

  - A unique constraint covering the columns `[userId,slug]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT 'project';

-- CreateIndex
CREATE UNIQUE INDEX "project_userId_slug_key" ON "project"("userId", "slug");
