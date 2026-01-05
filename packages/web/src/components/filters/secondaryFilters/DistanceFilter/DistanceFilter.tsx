'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useUserLocation } from '../../../../hooks/useUserLocation';
import RangeFilter from '../RangeFilter/RangeFilter';

export default function DistanceFilter() {
  const translations = useTranslation('restaurants.secondaryFilters');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { location, isLoading, error, requestLocation } = useUserLocation();
  const lastDistanceParamRef = useRef<string | null>(null);
  const hasRequestedRef = useRef(false);

  const MIN = 0;
  const MAX = 5;

  useEffect(() => {
    const distanceParam = searchParams.get('distance');
    const distanceParamChanged = distanceParam !== lastDistanceParamRef.current;
    lastDistanceParamRef.current = distanceParam;

    if (distanceParamChanged) {
      hasRequestedRef.current = false;
    }

    if (
      distanceParam &&
      !location &&
      !error &&
      !isLoading &&
      !hasRequestedRef.current
    ) {
      hasRequestedRef.current = true;
      requestLocation();
    }
  }, [searchParams.toString(), location, isLoading, error, requestLocation]);

  // Sync location params with URL: remove when no distance, update when location available
  useEffect(() => {
    const distanceParam = searchParams.get('distance');
    const params = new URLSearchParams(searchParams.toString());
    const currentLat = params.get('userLat');
    const currentLng = params.get('userLng');

    if (!distanceParam) {
      // Remove location params if distance param is removed
      if (currentLat || currentLng) {
        params.delete('userLat');
        params.delete('userLng');
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl);
      }
    } else if (location) {
      // Update location params if they don't match current location
      if (
        currentLat !== location.lat.toString() ||
        currentLng !== location.lng.toString()
      ) {
        params.set('userLat', location.lat.toString());
        params.set('userLng', location.lng.toString());
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl);
      }
    }
  }, [location, searchParams.toString(), pathname, router]);

  const handleRetryLocation = () => {
    hasRequestedRef.current = false;
    requestLocation();
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('distance');
    params.delete('userLat');
    params.delete('userLng');
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl);
  };

  return (
    <RangeFilter
      label={translations.distance || 'Distance'}
      queryParam="distance"
      min={MIN}
      max={MAX}
      initialValue={[MIN, MAX]}
      formatValue={(v) => `${v} km`}
      titleKey={translations.distanceSelected || 'Distance Selected'}
      stepSize={1}
      singleHandle={true}
      leftLabel={translations.myLocation || 'my location'}
      hideSubtitle={true}
      error={error && !location ? translations.locationRequired : undefined}
      onRetryLocation={error && !location ? handleRetryLocation : undefined}
      isLoadingLocation={isLoading}
      onClear={handleClear}
    />
  );
}
