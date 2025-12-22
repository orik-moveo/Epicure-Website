'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { setHomepage } from '../../lib/slices/homepageSlice';
import Hero from '../../components/homepage/hero/Hero';
import PopularRestaurants from '../../components/homepage/popularRestaurants/PopularRestaurants';

interface HomepageClientProps {
  data: any;
}

export default function HomepageClient({ data }: HomepageClientProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHomepage(data));
  }, [data, dispatch]);

  const hero = data?.data?.hero || null;
  const popularRestaurants = data?.data?.popularRestaurants || null;

  return (
    <>
      {hero && <Hero {...hero} />}
      {popularRestaurants && <PopularRestaurants {...popularRestaurants} />}
    </>
  );
}
