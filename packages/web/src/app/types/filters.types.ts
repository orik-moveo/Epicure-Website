export type FilterOption =
  | 'all'
  | 'new'
  | 'mostPopular'
  | 'openNow'
  | 'mapView';

export const primaryFilterOptions: FilterOption[] = [
  'all',
  'new',
  'mostPopular',
  'openNow',
  'mapView',
];

export function isValidFilterOption(
  value: string | string[] | undefined
): value is FilterOption {
  if (typeof value !== 'string') {
    return false;
  }
  return primaryFilterOptions.includes(value as FilterOption);
}
