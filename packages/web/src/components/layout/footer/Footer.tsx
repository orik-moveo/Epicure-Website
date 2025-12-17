'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import FooterWeb from './Footer.web';
import FooterMobile from './Footer.mobile';

export default function Footer() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return isMobile ? <FooterMobile /> : <FooterWeb />;
}
