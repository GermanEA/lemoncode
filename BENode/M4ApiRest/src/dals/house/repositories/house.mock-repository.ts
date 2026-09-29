import { paginateList } from '#common/helpers/index.js';
import { HouseRepository } from './house.repository.js';
import { House, Review } from '../house.model.js';
import { LAST_REVIEWS_COUNT } from '../house.constants.js';
import { getLastReviews } from '../house.helpers.js';
import { db } from '../../mock-data.js';

const findHouse = (id: string): House =>
  db.houses.find((h) => h._id.toHexString() === id);

const insertReview = (houseId: string, review: Review): Review => {
  const house = findHouse(houseId);
  if (!house) {
    return null;
  }

  db.houses = db.houses.map((h) =>
    h._id.toHexString() === houseId
      ? { ...h, reviews: [...h.reviews, review] }
      : h
  );
  return review;
};

// Only updates the house detail fields
const updateHouse = (house: House): boolean => {
  const id = house._id.toHexString();
  if (!findHouse(id)) {
    return false;
  }

  db.houses = db.houses.map((h) =>
    h._id.toHexString() === id
      ? {
          ...h,
          name: house.name,
          description: house.description,
          images: { ...h.images, picture_url: house.images?.picture_url },
          address: { ...h.address, street: house.address?.street },
          bedrooms: house.bedrooms,
          beds: house.beds,
          bathrooms: house.bathrooms,
        }
      : h
  );
  return true;
};

export const mockRepository: HouseRepository = {
  getHouseList: async (country?: string, page?: number, pageSize?: number) =>
    paginateList(
      country
        ? db.houses.filter((h) => h.address.country === country)
        : db.houses,
      page,
      pageSize
    ),
  getHouse: async (id: string) => {
    const house = findHouse(id);
    return house
      ? {
          ...house,
          reviews: getLastReviews(house.reviews, LAST_REVIEWS_COUNT),
        }
      : null;
  },
  insertReview: async (houseId: string, review: Review) =>
    insertReview(houseId, review),
  updateHouse: async (house: House) => updateHouse(house),
};
