'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { DialogProvider } from '@/providers/dialogProvider';
import { AuthProvider } from '@/providers/authProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
      <DialogProvider>
        {children}
      </DialogProvider>
      </AuthProvider>
    </Provider>
  );
}
