export interface OpeningHours {
  day:
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';
  open: string; // פורמט: "HH:mm"
  close: string; // פורמט: "HH:mm"
}

export interface Location {
  title: string;
  city: string;
  lat: number;
  lng: number;
}

export interface Restaurant {
  image: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  name: string;
  chef: {
    name: string;
  };
  rating: number;
  openingHours?: OpeningHours[];
  location?: Location;
  isPopular?: boolean;
  createdAt?: string;
}
