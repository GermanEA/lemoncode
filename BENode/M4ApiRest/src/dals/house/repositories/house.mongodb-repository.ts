import { ObjectId } from 'mongodb';
import { getPagination } from '#common/helpers/index.js';
import { HouseRepository } from './house.repository.js';
import { Review } from '../house.model.js';
import { getHouseContext } from '../house.context.js';
import { LAST_REVIEWS_COUNT } from '../house.constants.js';

export const mongoDBRepository: HouseRepository = {
  getHouseList: async (country?: string, page?: number, pageSize?: number) => {
    const { skip, limit } = getPagination(page, pageSize);
    return await getHouseContext()
      .find(country ? { 'address.country': country } : {}, {
        projection: {
          name: 1,
          'images.picture_url': 1,
          price: 1,
        },
      })
      .skip(skip)
      .limit(limit)
      .toArray();
  },
  getHouse: async (id: string) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    return await getHouseContext().findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
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
      }
    );
  },
  insertReview: async (houseId: string, review: Review) => {
    if (!ObjectId.isValid(houseId)) {
      return null;
    }

    const { matchedCount } = await getHouseContext().updateOne(
      { _id: new ObjectId(houseId) },
      { $push: { reviews: review } }
    );
    return matchedCount === 1 ? review : null;
  },
};
