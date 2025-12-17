'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import HeaderWeb from './Header.web';
import HeaderMobile from './Header.mobile';

export default function Header() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return isMobile ? <HeaderMobile /> : <HeaderWeb />;
}
