'use client';

import { useTranslations } from 'next-intl';

export function useTranslation(namespace: string) {
  const t = useTranslations(namespace);

  return new Proxy({} as Record<string, string>, {
    get(target, prop: string) {
      return t(prop);
    }
  });
}
