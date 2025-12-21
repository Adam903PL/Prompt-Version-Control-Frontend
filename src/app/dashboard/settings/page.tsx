import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { TwoFactorSetup } from '@/features/auth/components/two-factor-setup';
import { EmailVerificationSettings } from '@/features/auth/components/email-verification-settings';
import { PasskeySettings } from '@/features/auth/components/passkey-settings';
import { UserProfileSettings } from '@/features/users/components/user-profile-settings';

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <UserProfileSettings user={user} />

      <div className="h-px bg-zinc-800 my-8" />

      <h2 className="text-xl font-semibold text-white mb-4">Security</h2>

      <EmailVerificationSettings />

      <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
        <TwoFactorSetup />
      </div>

      <div className="pt-6">
        <PasskeySettings />
      </div>
    </div>
  );
}
