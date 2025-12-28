'use client';

import Card from '../Card/Card';
import { CardVariant } from '../Card/Card.types';
import { Restaurant } from '../../app/types/restaurants.types';
import { renderStars } from './restaurants.utils';
import styles from './RestaurantCard.module.scss';

type RestaurantCardProps = Omit<Restaurant, 'image' | 'chef'> & {
  image: Restaurant['image'][0];
  chefName: Restaurant['chef']['name'];
};

export default function RestaurantCard({
  image,
  name,
  chefName,
  rating,
}: RestaurantCardProps) {
  return (
    <Card
      image={image}
      title={name}
      subtitle={chefName}
      variant={CardVariant.Restaurant}
      bottomContent={
        <div className={styles.starsContainer}>
          {renderStars({ rating, starClassName: styles.star })}
        </div>
      }
    />
  );
}
