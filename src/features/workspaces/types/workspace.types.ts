export type WorkspaceVisibility = 'private' | 'public';

export interface WorkspaceContributorInput {
  name: string;
}

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
  visibility: WorkspaceVisibility;
  userId: string;
  contributors?: WorkspaceContributorInput[];
}

export interface CreateWorkspaceResponse {
  id: string;
  name: string | null;
  slug: string;
  description: string | null;
  visibility: string;
  createdAt: Date;
  userId: string;
}
