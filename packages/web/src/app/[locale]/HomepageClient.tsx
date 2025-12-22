'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { setHomepage } from '../../lib/slices/homepageSlice';
import Hero from '../../components/homepage/hero/Hero';

interface HomepageClientProps {
  data: any;
}

export default function HomepageClient({ data }: HomepageClientProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHomepage(data));
  }, [data, dispatch]);

  const hero = data?.data?.hero || null;

  if (!hero) {
    return null;
  }

  return (
    <>
      <Hero {...hero} />
    </>
  );
}
