// app/actions/setup-user.ts
'use server';

import { createUserFolder } from './user-file-structure-service';
export async function setupUserFolder(userId: string) {
  try {
    if (!userId) {
      return { success: false, error: 'userId is required' };
    }

    const result = await createUserFolder(userId);

    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Error in setupUserFolder:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Setup failed',
    };
  }
}
