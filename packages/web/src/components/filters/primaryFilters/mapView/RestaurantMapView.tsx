'use client';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { RestaurantLocation } from '../../../../app/types/restaurants.types';
import CustomMapMarker from './CustomMapMarker';
import {
  TEL_AVIV_CENTER,
  MAP_OPTIONS,
  MAP_ZOOM_LEVEL,
  getGoogleMapsApiKey,
} from '../../../../components/restaurants/restaurants.utils';
import styles from './RestaurantMapView.module.scss';

interface RestaurantMapViewProps {
  locations: RestaurantLocation[];
}

export default function RestaurantMapView({
  locations,
}: RestaurantMapViewProps) {
  const apiKey = getGoogleMapsApiKey();

  if (!apiKey) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Google Maps API key is undefined</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={TEL_AVIV_CENTER}
          zoom={MAP_ZOOM_LEVEL}
          options={MAP_OPTIONS}
        >
          {locations.map((restaurant) => (
            <CustomMapMarker
              key={restaurant.id}
              position={{
                lat: restaurant.location.lat,
                lng: restaurant.location.lng,
              }}
              name={restaurant.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
