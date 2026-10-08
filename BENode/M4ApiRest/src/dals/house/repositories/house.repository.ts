import { House, Review } from '../house.model.js';

export interface HouseRepository {
  getHouseList: (
    country?: string,
    page?: number,
    pageSize?: number
  ) => Promise<House[]>;
  getHouse: (id: string) => Promise<House>;
  insertReview: (houseId: string, review: Review) => Promise<Review>;
}
