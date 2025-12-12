import { TwoFactorSetup } from '@/features/auth/components/two-factor-setup';
import { EmailVerificationSettings } from '@/features/auth/components/email-verification-settings';
import { PasskeySettings } from '@/features/auth/components/passkey-settings';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

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
