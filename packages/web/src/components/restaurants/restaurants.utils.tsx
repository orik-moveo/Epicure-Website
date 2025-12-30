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

export const TEL_AVIV_CENTER = {
  lat: 32.0853,
  lng: 34.7818,
} as const;

export const MAP_OPTIONS = {
  disableDefaultUI: false, // Keep default UI
  zoomControl: true, // Show zoom controls
  streetViewControl: false, // Hide street view control
  mapTypeControl: false, // Hide map type control (satellite/terrain)
  fullscreenControl: false, // Hide fullscreen control
} as const;

export const MAP_ZOOM_LEVEL = 13;

export function getGoogleMapsApiKey(): string | null {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || null;
}
