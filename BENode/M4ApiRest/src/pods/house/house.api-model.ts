export interface HouseListItem {
  id: string;
  title: string;
  image: string;
  price: number;
}

export interface House {
  id: string;
  title: string;
  image: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Review[];
}

export interface Review {
  name: string;
  comment: string;
  date: string;
}
