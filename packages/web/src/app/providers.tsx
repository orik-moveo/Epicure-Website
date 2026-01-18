'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { DialogProvider } from '@/providers/dialogProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DialogProvider>
        {children}
      </DialogProvider>
    </Provider>
  );
}
