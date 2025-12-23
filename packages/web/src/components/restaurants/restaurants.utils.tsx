import React from 'react';

interface RenderStarsOptions {
  rating: number;
  starClassName: string;
}

export function renderStars({
  rating,
  starClassName,
}: RenderStarsOptions): React.ReactNode[] {
  const stars: React.ReactNode[] = [];
  const fullStars = Math.floor(rating);

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <img
          key={i}
          src="/assets/icons/star-full.svg"
          alt="Full star"
          className={starClassName}
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src="/assets/icons/star-empty.svg"
          alt="Empty star"
          className={starClassName}
        />
      );
    }
  }

  return stars;
}
