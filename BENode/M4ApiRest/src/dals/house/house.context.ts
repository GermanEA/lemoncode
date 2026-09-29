import { model, Schema } from 'mongoose';
import { House, Review } from './house.model.js';

const reviewSchema = new Schema<Review>({
  _id: { type: Schema.Types.String, required: true },
  date: { type: Schema.Types.Date, required: true },
  listing_id: { type: Schema.Types.String },
  reviewer_id: { type: Schema.Types.String },
  reviewer_name: { type: Schema.Types.String, required: true },
  comments: { type: Schema.Types.String, required: true },
});

const houseSchema = new Schema<House>(
  {
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    images: {
      picture_url: { type: Schema.Types.String },
    },
    address: {
      street: { type: Schema.Types.String },
      country: { type: Schema.Types.String },
    },
    bedrooms: { type: Schema.Types.Number },
    beds: { type: Schema.Types.Number },
    bathrooms: { type: Schema.Types.Decimal128 },
    price: { type: Schema.Types.Decimal128 },
    reviews: [reviewSchema],
  },
  { collection: 'listingsAndReviews' }
);

export const houseContext = model<House>('House', houseSchema);
