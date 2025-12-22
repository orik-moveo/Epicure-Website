'use client';

import Card from '../Card/Card';
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
  // Render star rating (1-5)
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <img
            key={i}
            src="/assets/icons/star-full.svg"
            alt="Full star"
            className={styles.star}
          />
        );
      } else {
        stars.push(
          <img
            key={i}
            src="/assets/icons/star-empty.svg"
            alt="Empty star"
            className={styles.star}
          />
        );
      }
    }

    return stars;
  };

  return (
    <Card
      image={image}
      title={name}
      subtitle={chefName}
      bottomContent={renderStars()}
    />
  );
}
