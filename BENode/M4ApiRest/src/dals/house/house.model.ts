import { ObjectId, Decimal128 } from 'mongodb';

// https://www.mongodb.com/docs/atlas/sample-data/sample-airbnb/

export interface House {
  _id: ObjectId;
  name: string;
  description: string;
  images: Images;
  address: Address;
  bedrooms: number;
  beds: number;
  bathrooms: Decimal128;
  price: Decimal128;
  reviews: Review[];
}

export interface Images {
  picture_url: string;
}

export interface Address {
  street: string;
  country: string;
}

export interface Review {
  _id: string;
  date: Date;
  listing_id?: string;
  reviewer_id?: string;
  reviewer_name: string;
  comments: string;
}
