import { ObjectId } from 'mongodb';
import {
  mapDecimalToNumber,
  mapNumberToDecimal,
} from '#common/helpers/index.js';
import * as model from '#dals/index.js';
import * as apiModel from './house.api-model.js';

export const mapHouseListItemFromModelToApi = (
  house: model.House
): apiModel.HouseListItem => ({
  id: house._id.toHexString(),
  title: house.name,
  image: house.images?.picture_url,
  price: mapDecimalToNumber(house.price),
});

export const mapHouseListFromModelToApi = (
  houseList: model.House[]
): apiModel.HouseListItem[] =>
  Array.isArray(houseList) ? houseList.map(mapHouseListItemFromModelToApi) : [];

export const mapReviewFromModelToApi = (
  review: model.Review
): apiModel.Review => ({
  name: review.reviewer_name,
  comment: review.comments,
  date: review.date?.toISOString(),
});

export const mapReviewListFromModelToApi = (
  reviewList: model.Review[]
): apiModel.Review[] =>
  Array.isArray(reviewList) ? reviewList.map(mapReviewFromModelToApi) : [];

export const mapHouseFromModelToApi = (house: model.House): apiModel.House => ({
  id: house._id.toHexString(),
  title: house.name,
  image: house.images?.picture_url,
  description: house.description,
  address: house.address?.street,
  bedrooms: house.bedrooms,
  beds: house.beds,
  bathrooms: mapDecimalToNumber(house.bathrooms),
  reviews: mapReviewListFromModelToApi(house.reviews),
});

// The review date is calculated in backend when the user inserts it
export const mapReviewFromApiToModel = (
  review: apiModel.Review
): model.Review => ({
  _id: new ObjectId().toHexString(),
  date: new Date(),
  reviewer_name: review.name,
  comments: review.comment,
});

// Only the house detail fields can be updated (reviews are not updated)
export const mapHouseFromApiToModel = (house: apiModel.House): model.House => ({
  _id: new ObjectId(house.id),
  name: house.title,
  description: house.description,
  images: {
    picture_url: house.image,
  },
  address: {
    street: house.address,
    country: undefined,
  },
  bedrooms: house.bedrooms,
  beds: house.beds,
  bathrooms: mapNumberToDecimal(house.bathrooms),
  price: undefined,
  reviews: undefined,
});
