'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { setHomepage } from '../../lib/slices/homepageSlice';
import Hero from '../../components/homepage/hero/Hero';
import PopularRestaurants from '../../components/homepage/popularRestaurants/PopularRestaurants';
import PopularDishes from '../../components/homepage/popularDishes/PopularDishes';
import IconLegend from '../../components/homepage/iconLegend/IconLegend';
import ChefOfWeek from '../../components/homepage/chefOfWeek/ChefOfWeek';

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
  const popularDishes = data?.data?.popularDishes || null;
  const chefOfWeek = data?.data?.chefOfWeek || null;

  return (
    <>
      {hero && <Hero {...hero} />}
      {popularRestaurants && <PopularRestaurants {...popularRestaurants} />}
      {popularDishes && <PopularDishes {...popularDishes} />}
      <IconLegend />
      {chefOfWeek && <ChefOfWeek {...chefOfWeek} />}
    </>
  );
}
