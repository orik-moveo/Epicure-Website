'use client';

import { OverlayView } from '@react-google-maps/api';
import styles from './RestaurantMapView.module.scss';

interface CustomMapMarkerProps {
  position: { lat: number; lng: number };
  name: string;
}

export default function CustomMapMarker({
  position,
  name,
}: CustomMapMarkerProps) {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className={styles.customMarker}>
        <span className={styles.markerText}>{name}</span>
      </div>
    </OverlayView>
  );
}
