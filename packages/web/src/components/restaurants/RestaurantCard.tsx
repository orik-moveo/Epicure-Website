'use client';

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
  isMobile?: boolean;
}

export default function RestaurantCard({
  image,
  name,
  chefName,
  rating,
  isMobile = false,
}: RestaurantCardProps) {
  if (!image?.url && !isMobile) {
    console.error('RestaurantCard: image.url is missing', image);
    return null;
  }

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
    <div className={isMobile ? styles.mobileCard : styles.card}>
      <div
        className={
          isMobile ? styles.mobileImageContainer : styles.imageContainer
        }
      >
        {image?.url && (
          <img src={image.url} alt={name} className={styles.image} />
        )}
      </div>
      <div
        className={isMobile ? styles.mobileBottomSection : styles.bottomSection}
      >
        <div className={styles.nameChefContainer}>
          <h3 className={styles.restaurantName}>{name}</h3>
          <p className={styles.chefName}>{chefName}</p>
        </div>
        {!isMobile && (
          <div className={styles.starsContainer}>{renderStars()}</div>
        )}
      </div>
    </div>
  );
}
