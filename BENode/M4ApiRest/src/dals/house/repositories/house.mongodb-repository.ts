import { ObjectId } from 'mongodb';
import { getPagination } from '#common/helpers/index.js';
import { HouseRepository } from './house.repository.js';
import { House, Review } from '../house.model.js';
import { houseContext } from '../house.context.js';
import { LAST_REVIEWS_COUNT } from '../house.constants.js';

export const mongoDBRepository: HouseRepository = {
  getHouseList: async (country?: string, page?: number, pageSize?: number) => {
    const { skip, limit } = getPagination(page, pageSize);
    return await houseContext
      .find(country ? { 'address.country': country } : {}, {
        name: 1,
        'images.picture_url': 1,
        price: 1,
      })
      .skip(skip)
      .limit(limit)
      .lean();
  },
  getHouse: async (id: string) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const [house] = await houseContext.aggregate<House>([
      { $match: { _id: new ObjectId(id) } },
      {
        $project: {
          name: 1,
          description: 1,
          'images.picture_url': 1,
          'address.street': 1,
          bedrooms: 1,
          beds: 1,
          bathrooms: 1,
          reviews: {
            $slice: [
              { $sortArray: { input: '$reviews', sortBy: { date: -1 } } },
              LAST_REVIEWS_COUNT,
            ],
          },
        },
      },
    ]);
    return house ?? null;
  },
  insertReview: async (houseId: string, review: Review) => {
    if (!ObjectId.isValid(houseId)) {
      return null;
    }

    const { matchedCount } = await houseContext.updateOne(
      { _id: new ObjectId(houseId) },
      { $push: { reviews: review } }
    );
    return matchedCount === 1 ? review : null;
  },
  // Only updates the house detail fields
  updateHouse: async (house: House) => {
    const { matchedCount } = await houseContext.updateOne(
      { _id: house._id },
      {
        $set: {
          name: house.name,
          description: house.description,
          'images.picture_url': house.images?.picture_url,
          'address.street': house.address?.street,
          bedrooms: house.bedrooms,
          beds: house.beds,
          bathrooms: house.bathrooms,
        },
      }
    );
    return matchedCount === 1;
  },
};
