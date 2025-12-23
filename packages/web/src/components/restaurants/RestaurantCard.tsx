'use client';

import Card from '../Card/Card';
import { renderStars } from './restaurants.utils';
import styles from './RestaurantCard.module.scss';

interface RestaurantCardProps {
  image: {
    url: string;
    width?: number;
    height?: number;
  };
  name: string;
  chefName: string;
  rating: number;
}

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
      bottomContent={
        <div className={styles.starsContainer}>
          {renderStars({ rating, starClassName: styles.star })}
        </div>
      }
    />
  );
}
