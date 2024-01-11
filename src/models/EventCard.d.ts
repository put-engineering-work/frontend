declare interface EventCard {
  address: string;
  description: string;
  endDate: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  startDate: string;
  eventImages: any;
}

declare interface EventDetails {
  address: string;
  categories: [];
  description: string;
  endDate: string;
  eventImages: [];
  latitude: number;
  longitude: number;
  name: string;
  startDate: string;
  numberOfMembers: number;
  host: {
    id: string;
    lastname: string;
    name: string;
  };
}

declare interface EventFilters {
  latitude: number?;
  longitude: number?;
  radius: number;
  startDate: string?;
  selectedCategories: []?;
  name?: string?;
}
