'use client';

import Hero from '../../components/homepage/hero/Hero';
import PopularRestaurants from '../../components/homepage/popularRestaurants/PopularRestaurants';
import PopularDishes from '../../components/homepage/popularDishes/PopularDishes';
import IconLegend from '../../components/homepage/iconLegend/IconLegend';
import ChefOfWeek from '../../components/homepage/chefOfWeek/ChefOfWeek';
import AboutUs from '../../components/homepage/aboutUs/AboutUs';

interface HomepageClientProps {
  data: any;
}

export default function HomepageClient({ data }: HomepageClientProps) {

  const { hero, popularRestaurants, popularDishes, chefOfWeek, about } = data;

  return (
    <>
      {hero && <Hero {...hero} />}
      {popularRestaurants && <PopularRestaurants {...popularRestaurants} />}
      {popularDishes && <PopularDishes {...popularDishes} />}
      <IconLegend />
      {chefOfWeek && <ChefOfWeek {...chefOfWeek} />}
      {about && <AboutUs title={about.title} description={about.body} />}
    </>
  );
}
