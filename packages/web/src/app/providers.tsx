'use client';

import { DialogProvider } from '@/providers/dialogProvider';
import { AuthProvider } from '@/providers/authProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <AuthProvider>
      <DialogProvider>
        {children}
      </DialogProvider>
      </AuthProvider>
  );
}
