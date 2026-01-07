'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Card from '../../Card/Card';
import { CardVariant, CardSize } from '../../Card/Card.types';
import CardsCarousel from '../../CardsCarousel/CardsCarousel';
import { Restaurant } from '../../../app/types/restaurants.types';
import styles from './ChefOfWeek.module.scss';

interface ChefOfWeekProps {
  title: string;
  chef: {
    name: string;
    image: {
      url: string;
      width?: number;
      height?: number;
    };
    description: any;
    restaurants: Restaurant[];
  };
}

export default function ChefOfWeek({ title, chef }: ChefOfWeekProps) {
  const chefOfWeek = useTranslation('chefOfWeek');

  if (!chef || !chef.restaurants || chef.restaurants.length === 0) {
    return null;
  }

  const firstName = chef.name.split(' ')[0];

  return (
    <section className={styles.section}>
      <div className={styles.upperSection}>
        <h2 className={styles.title}>{chefOfWeek.title}</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <img
              src={chef.image?.url}
              alt={chef.name}
              className={styles.chefImage}
            />
            <div className={styles.nameOverlay}>
              <span className={styles.chefFullName}>{chef.name}</span>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            {chef.description && (
              <div className={styles.description}>
                <BlocksRenderer content={chef.description} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.lowerSection}>
        <h3 className={styles.restaurantsTitle}>
          {firstName}'s {chefOfWeek.restaurants}
        </h3>
        <div className={styles.cardsContainer}>
          <CardsCarousel>
            {chef.restaurants.map((restaurant, index) => (
              <Card
                key={index}
                variant={CardVariant.Restaurant}
                image={restaurant.image[0]}
                title={restaurant.name}
                chefName={chef.name}
                rating={restaurant.rating}
                size={CardSize.XSmall}
              />
            ))}
          </CardsCarousel>
        </div>
      </div>
    </section>
  );
}
