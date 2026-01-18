'use client';

import { useContext } from 'react';
import { DialogContext } from '../providers/dialogProvider';
import { DialogContextType } from '../app/types/dialog.types';

export function useDialog(): DialogContextType {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }
  return context;
}
