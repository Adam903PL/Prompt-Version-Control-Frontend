'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Fingerprint, Plus } from 'lucide-react';
import { authClient } from '@/shared/lib/auth-client';
import { toast } from 'sonner';

export function PasskeySettings() {
  const [isLoading, setIsLoading] = useState(false);

  // Note: better-auth might not expose listPasskeys directly in the client yet in v1.0
  // but it usually does. If not, we might need to fetch it via API or check docs.
  // For now assuming we can list them or at least add them.
  // Actually better-auth passkey client has .listPasskeys() usually.

  const handleAddPasskey = async () => {
    setIsLoading(true);
    try {
      const res = await authClient.passkey.addPasskey({
        name: `Passkey ${new Date().toLocaleDateString()}`,
      });
      if (res?.error) {
        toast.error(res.error.message || 'Failed to add passkey');
      } else {
        toast.success('Passkey added successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate passkey setup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-zinc-400" />
              Windows Hello / Passkeys
            </CardTitle>
            <CardDescription>
              Sign in securely using your face, fingerprint, or device PIN
              (Windows Hello, TouchID, FaceID).
            </CardDescription>
          </div>
          <Button
            onClick={handleAddPasskey}
            disabled={isLoading}
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Passkey
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/*
          Since better-auth client might not have a direct 'listPasskeys' hook exposed simply yet
          without custom implementation, we will just show the add button and a placeholder list
          if we had one.
        */}
        <div className="text-sm text-zinc-500 italic">
          Passkeys allow you to sign in without a password. Click &apos;Add
          Passkey&apos; to register this device.
        </div>
      </CardContent>
    </Card>
  );
}
