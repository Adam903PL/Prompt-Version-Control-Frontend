import { TwoFactorSetup } from '@/features/auth/components/two-factor-setup';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
        <TwoFactorSetup />
      </div>
    </div>
  );
}
